/**
 * Created by henrikrudstrom on 29.02.16.
 */
var fs = require('fs');
var exec = require("child_process").execFileSync;
var execAsync = require("child_process").execFile;
var glob = require("glob");

var devPath = __dirname.split("/").pop();
var loader = "tests/qtloader.qml";
var paths = [
  "tests/Tests/TestCase.qml",
  "tests/Tests/SimpleRenderTest.qml"
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

paths.forEach(function(path) {
//  glob(path, function(er, files) {
  //  console.log(path)
    render(path);
  //});
  // glob("tests/**/*.qml", function(er, files) {
  //   files.forEach(function(file) {
  //     isRenderTest(file, function() { render(file); });
  //   });
  // });
});


function render(path) {
  //console.log(path);
  var png = path.replace(".qml", ".png");
  execRender(devPath + "/bin/shorty", loader, path);
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
  //console.log(shorty, loader, file)
  //shorty = shorty.replace("/", "\\");
  //loader = loader.replace("/", "\\");
  //file = file.replace("/", "\\");
  console.log(shorty, loader, file)
  exec(shorty, [loader, file]);
}
