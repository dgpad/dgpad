#!/bin/bash

# Mise en variable du chemin absolu de ce script :
# DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# php -S 127.0.0.1:8282 -t "$DIR"  |  google-chrome-stable "http://127.0.0.1:8282/dgpad.html"  |  wmctrl -a "DGPad - Google Chrome"
# php -S 192.168.1.99:8282 -t "$DIR"  |  google-chrome-stable "http://192.168.1.99:8282/dgpad.html"  |  wmctrl -a "Google Chrome"
php -S erichake-imac.local:8282 -t "$DIR"  |  google-chrome-stable "http://erichake-imac.local:8282/dgpad.html"  |  wmctrl -a "Google Chrome"

