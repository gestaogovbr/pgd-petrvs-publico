# Resources
 Deploy produção
 <br>

 (Manual em processo de construção - 03/09/2023 12h e 49m)

###### Obs.: Antes de iniciar a instalação, certifique-se de que o DNS está configurado. Caso não esteja, edite o arquivo /etc/resolv.conf e adicione o DNS.

###### Obs.: Guia simples presume existência de outra máquina com SGBD MySQL versão >=8, usuário petrvs com acesso total ao banco de dados petrvs e petrvs_logs;
---

<br>

<center>Deploy modo produção em VPS (Google Cloud) com Ubuntu 22.04.2 LTS (Jammy) (minimal - x86_x64)</center>
<br>
<p>(Passo 1) Instalando aplicativos necessários e recursos adicionais:</p>

~~~shell
sudo apt update -y
sudo apt install apache2 php libapache2-mod-php php-mysql openssl git iputils-ping dnsutils nano vim apt-transport-https ca-certificates curl software-properties-common chrony -y
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

Habilitar módulos necessários no apache2:
~~~shell
sudo a2enmod ssl
sudo a2enmod rewrite
sudo a2enmod headers
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

**(Passo 6)** - Melhorias básicas quanto segurança dos serviços rodando no Linux.

timezone
~~~shell
sudo timedatectl set-timezone 'America/Bahia'
~~~

apache2
~~~shell
sudo nano /etc/apache2/conf-available/security.conf
~~~

~~~shell
ServerTokens Prod
ServerSignature Off
~~~
#
php (v8.1) - https://www.php.net/manual/en/ini.core.php:
~~~shell
sudo nano /etc/php/apache2/php.ini
~~~
~~~
[PHP]
engine = On
short_open_tag = Off
precision = 14
output_buffering = 4096
zlib.output_compression = Off
implicit_flush = Off
unserialize_callback_func =
serialize_precision = -1
disable_functions =
disable_classes =
zend.enable_gc = On
zend.exception_ignore_args = On
zend.exception_string_param_max_len = 0
expose_php = Off
max_execution_time = 30
max_input_time = 60
memory_limit = 256M
error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT
display_errors = Off
display_startup_errors = Off
log_errors = On
ignore_repeated_errors = Off
report_memleaks = On
variables_order = "GPCS"
request_order = "GP"
register_argc_argv = Off
auto_globals_jit = On
post_max_size = 8M
auto_prepend_file =
auto_append_file =
default_mimetype = "text/html"
default_charset = "UTF-8"
doc_root =
user_dir =
enable_dl = Off
file_uploads = On
upload_max_filesize = 4M
max_file_uploads = 20
allow_url_fopen = On
allow_url_include = Off
default_socket_timeout = 60
extension=curl

[CLI Server]
cli_server.color = On

[Date]
date.timezone = 'America/Bahia'

[Pdo_mysql]
pdo_mysql.default_socket=

[mail function]
SMTP = localhost
smtp_port = 25
mail.add_x_header = Off

[ODBC]
odbc.allow_persistent = On
odbc.check_persistent = On
odbc.max_persistent = -1
odbc.max_links = -1
odbc.defaultlrl = 4096
odbc.defaultbinmode = 1

[MySQLi]
mysqli.max_persistent = -1
mysqli.allow_persistent = On
mysqli.max_links = -1
mysqli.default_port = 3306
mysqli.default_socket =
mysqli.default_host =
mysqli.default_user =
mysqli.default_pw =
mysqli.reconnect = Off

[mysqlnd]
mysqlnd.collect_statistics = On
mysqlnd.collect_memory_statistics = On

[PostgreSQL]
pgsql.allow_persistent = On
pgsql.auto_reset_persistent = Off
pgsql.max_persistent = -1
pgsql.max_links = -1
pgsql.ignore_notice = 0
pgsql.log_notice = 0

[bcmath]
bcmath.scale = 0

[Session]
session.save_handler = files
session.use_strict_mode = 0
session.use_cookies = 1
session.use_only_cookies = 1
session.name = PHPSESSID
session.auto_start = 0
session.cookie_lifetime = 0
session.cookie_path = /
session.cookie_domain =
session.cookie_httponly =
session.cookie_samesite =
session.serialize_handler = php
session.gc_probability = 1
session.gc_divisor = 1000
session.gc_maxlifetime = 1440
session.referer_check =
session.cache_limiter = nocache
session.cache_expire = 180
session.use_trans_sid = 0
session.sid_length = 26
session.trans_sid_tags = "a=href,area=href,frame=src,form="
session.sid_bits_per_character = 5

[Assertion]
zend.assertions = -1

[Tidy]
tidy.clean_output = Off

[soap]
soap.wsdl_cache_enabled=1
soap.wsdl_cache_dir="/tmp"
soap.wsdl_cache_ttl=86400
soap.wsdl_cache_limit = 5

[ldap]
ldap.max_links = -1
~~~

~~~shell
sudo service apache2 restart
~~~

#

Chrony (servidor NTP):
~~~shell
sudo nano /etc/chrony/chrony.conf
~~~

~~~shell
server a.st1.ntp.br iburst nts
server b.st1.ntp.br iburst nts
server c.st1.ntp.br iburst nts
server d.st1.ntp.br iburst nts
server gps.ntp.br iburst nts

driftfile /var/lib/chrony/chrony.drift
ntsdumpdir /var/lib/chrony
maxupdateskew 100.0
rtcsync
makestep 1 3
leapsectz right/UTC
~~~

~~~shell
sudo service chrony restart
~~~

#

**(Passo 7) - Baixar e configurar pasta do projeto Petrvs**

De alguma forma entregar a pasta backend do projeto no diretório home do usuário (upload via winscp, por ex.) e depois rodar os comandos abaixo. 

Por fim, configurar o arquivo .env de acordo com o local de hospedagem (domínio, login e senha de banco de dados e etc.):

~~~shell
cd ~/petrvs
chmod 777 ~/petrvs/storage -R
cp ~/petrvs/.env.production.template ~/petrvs/.env
composer install --optimize-autoloader --no-dev

sudo rm -rf ~/petrvs/.env.dev.template
sudo rm -rf ~/petrvs/.env.production.template
sudo rm -rf ~/petrvs/README.md
sudo rm -rf ~/petrvs/.vscode

sudo rm -rf /var/www/html
sudo cp -R . /var/www/
cd /var/www
sudo chown www-data. /var/www/public
sudo chown www-data. /var/www/storage
sudo chmod 700 /var/www/storage -R
sudo chmod 700 /var/www/public
~~~

Ratifico necessidade de abrir o arquivo modelo .env e efetuar as configurações básicas (em especial, verificar domínio web). No ambiente de produção deverá ser utilizado um database para cada finalidade:

~~~shell
sudo nano /var/www/.env
~~~

~~~shell
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=petrvs
DB_USERNAME=petrvs
DB_PASSWORD=PsEeTnRhVaS

LOG_CONNECTION=log
LOG_HOST=localhost
LOG_PORT=3306
LOG_DATABASE=petrvs_logs
LOG_USERNAME=petrvs
LOG_PASSWORD=PsEeTnRhVaS
~~~

Editar arquivo para ajustar domínio quanto ao Tenant:

~~~shell
sudo nano /var/www/config/tenancy.php
~~~

~~~shel
        'central_domains' => [
           '127.0.0.1',
           'localhost',
           'pgd.senappen.seg.br',
        ],
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
cd /var/www
php artisan key:generate
php artisan event:cache
php artisan view:cache
~~~
_fonte: https://laravel.com/docs/10.x/deployment_

Por fim, configurar os dois arquivos do virtualhost para rodar o projeto (observar domínios e pasta padrão do projeto que é **public**)

**Muito cuidado!!!**

**DocumentRoot** deve informar a pasta **public** e não a pasta do projeto completo.

~~~shell
sudo nano /etc/apache2/sites-available/000-default.conf
~~~

~~~shell
<VirtualHost *:80>
        ServerName pgd.senappen.seg.br
        Alias www.pgd.senappen.seg.br pgd.senappen.seg.br

        ServerAdmin edson.franca@mj.gov.br
        DocumentRoot /var/www/public

        <Directory /var/www/public>
            Options -Indexes
            AllowOverride All
            Require all granted
            DirectoryIndex index.php
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        RewriteEngine on
        RewriteCond %{SERVER_NAME} =pgd.senappen.seg.br
        RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
</details>
~~~

~~~shell
sudo nano /etc/apache2/sites-available/000-default-le-ssl.conf
~~~

~~~shell
<IfModule mod_ssl.c>
    <VirtualHost *:443>
        ServerName pgd.senappen.seg.br
        Alias www.pgd.senappen.seg.br pgd.senappen.seg.br

        ServerAdmin edson.franca@mj.gov.br
        DocumentRoot /var/www/public

        <Directory /var/www/public>
            Options -Indexes
            AllowOverride All
            Require all granted
            DirectoryIndex index.php
        </Directory>

        #Header always set X-Frame-Options SAMEORIGIN
        Header always set X-Content-Type-Options nosniff
        Header always set X-XSS-Protection "1; mode=block"

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

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

**Se tudo ocorreu bem, sistema já deve tá funcionando.**

Caso tenha alguma dificuldade, entrar em contato com à Equipe PRF.
