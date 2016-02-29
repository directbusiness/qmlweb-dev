import QtQuick 2.5
import QtQuick.Window 2.0
Loader{
    source: "../" + script
    Component.onCompleted: {
        console.log("completed")
        console.log(script)
        timer.start()

    }

    function grab(){

        var path = source.toString()
            .replace(".qml", ".png")
            .replace("file://", "")
        console.log("grab" + path)
        shorty.shootFull(path)
    }
    Timer{
        id: timer
        interval: 10
        onTriggered: {
          grab()
          Qt.quit()
        }
    }
}


