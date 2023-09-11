#!/bin/bash
cp -R ../../back-end petrvs
cd petrvs

rm -rf .env
rm -rf .env.dev.template
rm -rf README.md
rm -rf .vscode
rm -rf php_sh.bat
rm -rf petrvs_php.sh
rm -rf create_group_user.sh

chmod -R 777 storage
cd ..
rm -rf petrvs.tgz
tar -zcf petrvs.tgz petrvs/
rm -rf petrvs
