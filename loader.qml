import QtQuick 2.5
import QtQuick.Window 2.0
Window {
    id: window
    visible: true
    minimumWidth: 0
    minimumHeight: 0
    maximumHeight: 5000
    maximumWidth: 10000
    flags: Qt.FramelessWindowHint

    Timer{
        //Qt.quit cannot be called onLoaded/Completed
        id: quitTimer
        interval: 10
        onTriggered: {
            Qt.quit();
        }
    }

    property bool loaded: false


    Loader{
        anchors.centerIn: parent
        id: loader
        source: "../" + script
        onLoaded: {
            window.height = item.height
            window.width = item.width
            if(item.hasOwnProperty("start"))
                item.start()

            //Find tests
            var tests = []
            for(var i in item.data){
                var child = item.data[i]
                if(child.hasOwnProperty("__isTest")){
                  child.compareRender = compare
                  tests.push(child)
                }
            }
            tests.reverse();
            runTest(tests);
        }

        //pops one test of the stack and runs it, passes a callback for the next test
        function runTest(tests){
            console.log(tests)
            if(tests.length <= 0){
                quitTimer.start()
                return
            }
            var test = tests.pop()
            console.log("TESTNAME: "+ test.name)
            test.start(function(){
                console.log("TESTDONE: "+ test.name)
               runTest(tests)
            });
        }

        function compare(tag, render, callback){
            console.log("compare; ", tag, render, callback)
            if(typeof render === "function")
                callback = render;
            if(render === undefined)
                render = true;

            //todo: ugly
            var path = source.toString()
                .replace("/qml/", "/png/")
                .replace(".qml", "")
                //.replace("file:///", "") //only on windows
                .replace("file://", "")
            if(tag)
                path = path + "-" + tag

            if(!render){
                console.log("LOG: skip render" + path)
                callback(true)
                return
            }


            console.log("LOG: render " + path)
            screenshot.shootFull(path+ ".png", window)
            callback(true) //doesnt compare in qt only generate image
        }
    }
}
