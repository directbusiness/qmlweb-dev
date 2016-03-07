import QtQuick 2.5
import QtQuick.Window 2.0
Loader{
    source: "../" + script
    Component.onCompleted: {
        console.log("completed")
        console.log(script)
        //timer.start()
        //Qt.quit()
    }

//    function testScreenshot(tag, next){
//        var path = source.toString()
//            .replace(".qml", "")
//            .replace("file://", "")
//        if(tag)
//          path = path + "-" + tag
//        console.log("grab" + path + ".png")
//        shorty.shootFull(path+ ".png")
//        next()
//    }
//    function testDone(){
//      Qt.quit()
//    }
//    function testYield()
//    {
//    }
    onLoaded: {
        console.log("load")
        item.start()
        for(var i in item.data){
          var child = item.data[i]
          if(child.toString().indexOf("Describe") === 0){
              child.compareRender = function(tag, callback){
                  var path = source.toString()
                      .replace(".qml", "")
                      .replace("file://", "")
                  if(tag)
                    path = path + "-" + tag
                  console.log("grab" + path + ".png")
                  shorty.shootFull(path+ ".png")

                  callback(true) //doesnt compare in qt only generate
              }
              child.start()
          }
        }

    }
    function compareRender2(tag, callback){
        var path = source.toString()
            .replace(".qml", "")
            .replace("file://", "")
        if(tag)
          path = path + "-" + tag
        console.log("grab" + path + ".png")
        shorty.shootFull(path+ ".png")

        callback(true) //doesnt compare in qt only generate
    }

}
