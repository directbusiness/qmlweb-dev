/*
 * Shorty - a QML screenshot utility
 * Copyright (C) 2012-14 Johan Thelin <e8johan@gmail.com>
 *                   and Juergen Bocklage-Ryannel <juergen@ryannel.org>
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 */

#include "screenshot.h"

#include <QtCore/QtCore>
#include <QtQuick/QtQuick>
#include <QFileInfo>

Screenshot::Screenshot(QObject *parent)
    : QObject(parent)

{
}
bool fileExists(QString path) {
    QFileInfo checkFile(path);
    // check if file exists and if yes: Is it really a file and no directory?
    if (checkFile.exists() && checkFile.isFile()) {
        return true;
    } else {
        return false;
    }
}
void Screenshot::shootFull(const QString &name, QQuickWindow *view)
{

    qDebug() << "Shoot: " << name;
    //if(fileExists(name)) return;
    QImage image = view->grabWindow();
    image.save(name);
}

void Screenshot::shoot(const QString &name, QQuickWindow *view)
{

    qDebug() << "Shoot: " << name;
    if(fileExists(name)) return;
    QImage image = view->grabWindow();
    QImage scaledImage = image.scaled(QSize(96,96), Qt::KeepAspectRatioByExpanding);
    scaledImage.save(name);
}

void Screenshot::sendKeyPress(int key, QQuickWindow *view)
{
    qDebug() << "Sending keypress for" << key;
    qApp->postEvent(view, new QKeyEvent(QEvent::KeyPress, key, Qt::NoModifier));
    qApp->postEvent(view, new QKeyEvent(QEvent::KeyRelease, key, Qt::NoModifier));
}

void Screenshot::sendMouseClick(int x, int y, QQuickWindow *view)
{
    qDebug() << "Sending mouse click at " << x << "," << y;
    qApp->postEvent(view, new QMouseEvent(QEvent::MouseButtonPress, QPoint(x,y), Qt::LeftButton, Qt::NoButton, Qt::NoModifier));
    qApp->postEvent(view, new QMouseEvent(QEvent::MouseButtonRelease, QPoint(x,y), Qt::LeftButton, Qt::NoButton, Qt::NoModifier));
}
