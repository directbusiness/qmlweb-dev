#include <QtCore/QtCore>
#include <QtGui/QtGui>
#include <QtQuick/QtQuick>
#include <QtQml/QtQml>
#include <QQuickWindow>
#include "screenshot.h"

int main(int argc, char** argv)
{
    QGuiApplication app(argc, argv);
        if(app.arguments().count() < 2) {
            qFatal("no qml script provided");
        }
    QString loader = app.arguments().at(1);
    QQmlApplicationEngine engine;


    if(app.arguments().count() > 2){
        QString script = app.arguments().at(2);
        engine.rootContext()->setContextProperty(QLatin1String("script"), script);
    }
    engine.load(QUrl::fromLocalFile(loader));

    Screenshot *screenshot = new Screenshot();
    engine.rootContext()->setContextProperty(QLatin1String("screenshot"), screenshot);


    return app.exec();

}
