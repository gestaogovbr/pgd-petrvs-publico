groupadd -g 1000 genisson
useradd genisson -u 1000 -g 1000 -m -s /bin/bash
sudo chown -R genisson:genisson Petrvs
sudo chmod -R 777 Petrvs