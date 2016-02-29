/**
 * Created by henrik on 29.02.16.
 */
var exec = require("child_process").execFileSync
var glob = require("glob")

var devPath = __dirname.split("/").pop()

var paths = [
  "tests/Render/Simple/*.qml"
]

paths.forEach(function(path){
  glob(path, function (er, files) {
    files.forEach(render)
  })
})

function render(path){
  console.log(path)
  exec(devPath + "/bin/shorty", [devPath + "/simple_screenshot.qml", path])
}
