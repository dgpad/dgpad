#!/bin/bash

# Mise en variable du chemin absolu de ce script :
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# création de Main_all.js :
node "$DIR/pack_dgpad.js" "$DIR/scripts"

cd "$DIR"

# création de Main_compressed.js :
uglifyjs "scripts/Main_all.js" -o "scripts/Main_compressed.js"
# création de Main_packed.js :
packer -i "scripts/Main_compressed.js" -o "scripts/Main_packed.js" -b

# un peu de ménage :
rm "scripts/NotPacked/scripts.zip"
rm -R "scripts/NotPacked/scripts"
rm "/tmp/scripts.zip"
# rm -R "/tmp/scripts"

# création éventuelle du dossier DGPad Backups :
mkdir "/Users/erichake/Desktop/DGPad Backups"
currentDate=$(date '+%Y_%m_%d_%H_%M_%S')

# on écrit la version dans le dossier scripts :
echo "$currentDate" > "scripts/version.txt"

# copie du dossier script actuel :
cp -R "scripts/" "/Users/erichake/Desktop/DGPad Backups/scripts_$currentDate"

# copie de ce qui faut dans /tmp/scripts :
mkdir "/tmp/scripts"
# cp -R "scripts/NotPacked/" "/tmp/scripts/NotPacked"
rsync -av --delete "scripts/NotPacked" "/tmp/scripts/"
cp "scripts/DGPad.js" "/tmp/scripts/DGPad.js"
cp "scripts/Main_packed.js" "/tmp/scripts/Main.js"
cp "scripts/version.txt" "/tmp/scripts/version.txt"


cd "/tmp/scripts"
# zip de l'archive necessaire à ibook author :
zip -r "$DIR/scripts/NotPacked/scripts.zip" *
# copie de cette archive dans tmp:
cp "$DIR/scripts/NotPacked/scripts.zip" "/tmp/scripts/NotPacked/scripts.zip"

# copie dans l'appli OS X :
rm -R "/Users/erichake/Dropbox/Public/macOSDGPad/www/scripts"
cp -R "/tmp/scripts/" "/Users/erichake/Dropbox/Public/macOSDGPad/www/scripts"

# copie dans l'appli Linux :
rm -R "/Users/erichake/Dropbox/Public/DGPad/deb/dgpad/usr/share/dgpad/scripts"
cp -R "/tmp/scripts/" "/Users/erichake/Dropbox/Public/DGPad/deb/dgpad/usr/share/dgpad/scripts"

# copie dans l'appli iOS :
rm -R "/Users/erichake/Dropbox/Public/iOSDGPad/www/scripts"
cp -R "/tmp/scripts/" "/Users/erichake/Dropbox/Public/iOSDGPad/www/scripts"

# copie dans l'appli Android :
rm -R "/Users/erichake/Dropbox/Public/andDGPad/assets/scripts"
cp -R "/tmp/scripts/" "/Users/erichake/Dropbox/Public/andDGPad/assets/scripts"

 

# ouverture du dossier /tmp/scripts dans le finder, qui contient
# normalement tout ce qui doit être uploadé en ftp :
open "/tmp/scripts"

