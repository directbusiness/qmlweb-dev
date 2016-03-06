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

    function testScreenshot(tag, next){
        var path = source.toString()
            .replace(".qml", "")
            .replace("file://", "")
        if(tag)
          path = path + "-" + tag
        console.log("grab" + path + ".png")
        shorty.shootFull(path+ ".png")
        next()
    }
    function testDone(){
      Qt.quit()
    }
    function testYield()
    {
    }
    onLoaded: {
      console.log("load")
      timer.start()
    }

    Timer{
        id: timer
        interval: 10
        onTriggered: {
          item.test()
        }
    }
}
