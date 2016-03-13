TARGET=qtqmltest

DESTDIR=../bin

QT += quick

SOURCES += \
    main.cpp \
    screenshot.cpp

CONFIG -= app_bundle
CONFIG += console

HEADERS += \
    screenshot.h

