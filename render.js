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

paths.forEach(function(path) {
  glob(path, function(er, files) {
    files.forEach(render);
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
