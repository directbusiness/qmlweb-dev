git submodule init
git submodule update
rm -rf build
mkdir build
cd build
qmake ../qtqmltest
make
