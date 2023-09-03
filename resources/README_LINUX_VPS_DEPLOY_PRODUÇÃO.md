# Resources
 Deploy produção

###### Obs.: Antes de iniciar a instalação, certifique-se de que o DNS está configurado. Caso não esteja, edite o arquivo /etc/resolv.conf e adicione o DNS.

###### Obs.: Guia simples presume existência de outra máquina, preferencialmente, com banco de dados mysql >=8.
---
<br>

<center>Deploy modo produção em VPS (Google Cloud) com Ubuntu 22.04.2 LTS (Jammy) (minimal - x86_x64)</center>
<br>
<p>(Passo 1) Instalando aplicativos necessários e recursos adicionais:</p>

~~~shell
sudo apt update -y
sudo apt install apache2 php libapache2-mod-php php-mysql openssl git iputils-ping dnsutils nano vim apt-transport-https ca-certificates curl software-properties-common -y
~~~

<br>
<p>(Passo 2) Bibliotecas PHP para Laravel:</p>

~~~shell
sudo apt update -y
sudo apt install php-cli php-common php-fpm php-bcmath php-curl php-json php-mbstring php-mysql php-tokenizer php-xml php-zip php-soap php-mysqli -y
~~~

<br>
<p>(Passo 3) Bibliotecas Linux:</p>

~~~shell
sudo apt-update -y
sudo apt install git zlib1g-dev libzip-dev unzip curl openssl libssl-dev libxml2-dev -y
~~~

Instalar composer:
~~~shell
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
~~~

<br>
<p>(Passo 4) Certbot - LetsEncrypt:</p>

~~~shell 
sudo apt-update -y
sudo apt install certbot python3-certbot-apache -y
~~~

<p><font size='1'><i>fonte: https://www.digitalocean.com/community/tutorials/how-to-use-certbot-standalone-mode-to-retrieve-let-s-encrypt-ssl-certificates-on-ubuntu-20-04
</i></font></p>

<br>
<p>(Passo 5) Verificar virtual host inicial do apache2:</p>

~~~shell
sudo nano /etc/apache2/sites-available/000-default.conf
~~~

<p> Adicionar ou verificar existências das tags <b>ServerName</b> e <b>Alias</b> com respectivos domínios que serão usados pelo PETRVS</p>

>ServerName pgd.senappen.seg.br
>
>Alias www.pgd.senappen.seg.br pgd.senappen.seg.br


<p>Conforme texto abaixo:</p>
<p>

        <VirtualHost *:80>

        ServerName pgd.senappen.seg.br
        Alias www.pgd.senappen.seg.br pgd.senappen.server.br

        ServerAdmin edson.franca@mj.gov.br
        DocumentRoot /var/www/html


        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
       
        RewriteEngine on
        RewriteCond %{SERVER_NAME} =pgd.senappen.seg.br
        RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
        </VirtualHost>
</p>


<p>Ao terminar edição do arquivo 000-default.conf, executar este comando para verificar se está tudo certo com apache2
</p>

~~~
sudo apache2ctl configtest
~~~

<p>Tudo certo!? Executar reload no apache2 para assumir nova configuração:</p>

~~~
sudo systemctl reload apache2
~~~

<p>Agora vamos solicitar o certificado SSL da LetsEncrypt e prosseguir:
</p>

~~~shell
sudo certbot --apache
~~~

<p>Reiniciar apache para assumir novas configurações (tirar qualquer dúvida):
</p>

~~~shell
sudo systemctl reload apache2
~~~

<p>
Verificar se ocorrerá renovação automática do certificado (tem que está sem erro):
</p>

~~~shel
sudo systemctl status certbot.timer
~~~

</ol>

**(Passo 6) - Baixar e configurar pasta do projeto Petrvs**

De alguma forma entregar a pasta backend do projeto no diretório home do usuário (upload via winscp, por ex.) e depois rodar os comandos abaixo. 

Por fim, configurar o arquivo .env de acordo com o local de hospedagem (domínio, login e senha de banco de dados e etc.):

~~~shell
cd ~/petrvs
chmod 777 ~/petrvs/storage -R
cp ~/petrvs/.env.production.template ~/petrvs/.env
composer install --optimize-autoloader --no-dev
~~~

Ratifico necessidade de abrir o arquivo modelo .env e efetuar as configurações básicas. No ambiente de produção deverá ser utilizado um database para cada finalidade:

`sudo nano ~/petrvs/.env`
~~~shell
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=petrvs
DB_USERNAME=root
DB_PASSWORD=PsEeTnRhVaS

LOG_CONNECTION=log
LOG_HOST=localhost
LOG_PORT=3306
LOG_DATABASE=petrvs_logs
LOG_USERNAME=root
LOG_PASSWORD=PsEeTnRhVaS
~~~

Logo após, caso não possua os bancos de dados e seja a primeira instalação, deverá ser executado os comando abaixo para criar banco de dados e criar tabelas:

~~~shell
php artisan make:database
php artisan migrate
~~~

Em prosseguimento, conceder permissão para que o Apache2 use certificado SSL no virtual host do PETRVS

~~~shell
chown root.www-data /etc/letsencrypt/live
chmod 750 /etc/letsencrypt/live
~~~

Alterar APP_KEY do app Laravel e efetuar algumas otimizações conforme manual:

~~~shell
cd ~/petrvs
php artisan key:generate
php artisan event:cache
php artisan view:cache
~~~
_fonte: https://laravel.com/docs/10.x/deployment_

Por fim, configurar os dois arquivos do virtualhost para rodar o projeto (observar domínios e pasta padrão do projeto que é **public**)

**Muito cuidado!!!**

**DocumentRoot** deve informar a pasta **public** e não a pasta do projeto completo.

`sudo nano /etc/apache2/sites-available/000-default.conf`
~~~shell
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com


        ServerName pgd.senappen.seg.br
        Alias www.pgd.senappen.seg.br pgd.senappen.seg.br

        ServerAdmin edson.franca@mj.gov.br
        DocumentRoot /home/edson_dario/petrvs/public

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
        RewriteEngine on
        RewriteCond %{SERVER_NAME} =pgd.senappen.seg.br
        RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
~~~


`sudo nano /etc/apache2/sites-available/000-default-le-ssl.conf` 

~~~shell                                                                                                        
<IfModule mod_ssl.c>
<VirtualHost *:443>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerName pgd.senappen.seg.br
        Alias www.pgd.senappen.seg.br pgd.senappen.seg.br

        ServerAdmin edson.franca@mj.gov.br

        DocumentRoot /home/edson_dario/petrvs/public

        #Header always set X-Frame-Options SAMEORIGIN
        Header always set X-Content-Type-Options nosniff
        Header always set X-XSS-Protection "1; mode=block"

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf

        SSLCertificateFile /etc/letsencrypt/live/pgd.senappen.seg.br/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/pgd.senappen.seg.br/privkey.pem
        Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>
~~~

No último passo, agora sim, rs, reiniciar o apache2:
~~~shell
sudo service apache2 restart
~~~

Caso tenha alguma dificuldade, entrar em contato com à EQUIPE PRF.
