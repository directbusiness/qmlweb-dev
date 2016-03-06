/**
 * Created by henrikrudstrom on 29.02.16.
 */
var fs = require('fs');
var exec = require("child_process").execFileSync;
var glob = require("glob");

var devPath = __dirname.split("/").pop();
var paths = [
  "tests/Render/Simple/*.qml"
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
  glob(path, function(er, files) {
    files.forEach(render);
  });
  glob("tests/**/*.qml", function(er, files) {
    files.forEach(function(file) {
      isRenderTest(file, function() { render(file); });
    });
  });
});

function render(path) {
  console.log(path);
  var png = path.replace(".qml", ".png");
  try {
    fs.accessSync(png, fs.F_OK);
  } catch (e) {
    exec(devPath + "/bin/shorty", [devPath + "/simple_screenshot.qml", path]);
  }

}
