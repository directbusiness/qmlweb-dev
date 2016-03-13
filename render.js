/**
 * Created by henrikrudstrom on 29.02.16.
 */
var fs = require('fs');
var execFile = require("child_process").execFileSync;
var exec = require("child_process").execSync;
var glob = require("glob");

var devPath = __dirname.split("/").pop();
var loader = "dev/loader.qml";

var paths = [
  "tests/Tests/qml/*.qml",
  //"tests/Tests/SimpleRenderTest.qml"
];

function isRenderTest(file, callback) {
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(file)
  });

  lineReader.on('line', function(line) {
    if (line.indexOf("@Render") != -1) {
      callback();
    }
    lineReader.close();
  });

}

if(process.argv.length == 2){
  paths.forEach(function(paths) {
    glob(paths, function(er, files) {

      files.forEach(function(file) {
        console.log("Rendering " + file)
        render(file);
      });
    });
    // glob("tests/**/*.qml", function(er, files) {
    //   files.forEach(function(file) {
    //     isRenderTest(file, function() { render(file); });
    //   });
    // });
  });
} else if (process.argv.length == 3){
  render(process.argv[2])
}

function render(path) {
  //console.log(path);
  var png = path.replace(".qml", ".png");
  execRender(devPath + "/bin/qtqmltest", loader, path);
  exec("sleep 1")
  // try {
  //   fs.accessSync(png, fs.F_OK);
  // } catch (e) {
  //   exec(devPath + "/bin/shorty", [devPath + "/simple_screenshot.qml", path]);
  // }
  // console.log(cwd)
  // console.log(devPath + "/bin/shorty")
  //
  // var files = [devPath + loader , devPath + path.replace("/", "\\")]
  // console.log(files)
  // execAsync(devPath + "\\bin\\shorty", files, function(err, stdout, stderr){
  //   console.log(err);
  //   console.log(stdout);
  //   console.log(stderr);
  // });
  //console.log(output.toString('ascii'))
}

function execRender(shorty, loader, file){
  console.log(shorty, loader, file)
  execFile(shorty, [loader, file]);
}
