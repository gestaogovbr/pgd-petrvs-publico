# Resources
 Deploy produção

###### Obs.: Antes de iniciar a instalação, certifique-se de que o DNS está configurado. Caso não esteja, edite o arquivo /etc/resolv.conf e adicione o DNS.

###### Obs.: Guia simples presumo existência de outra máquina com banco de dados mysql >=8.

---

<center>Deploy modo produção em VPS (Google Cloud) com Ubuntu 22.04.2 LTS (Jammy) (minimal - x86_x64)</center>
<br>
<p>(Passo 1) Instalando aplicativos padrões e recursos adicionais:</p>

~~~shell
sudo apt install apache2 php libapache2-mod-php php-mysql openssl git iputils-ping dnsutils nano apt-transport-https ca-certificates curl software-properties-common -y
~~~

<br>
<p>(Passo 2) Bibliotecas PHP para Laravel:</p>

~~~shell
 sudo apt install php-cli php-common php-fpm php-bcmath php-curl php-json php-mbstring php-mysql php-tokenizer php-xml php-zip php-soap php-mysqli -y
~~~

<br>
<p>(Passo 3) Bibliotecas Linux:</p>

~~~shell 
sudo apt install git zlib1g-dev libzip-dev unzip curl openssl libssl-dev libxml2-dev -y
~~~

<br>
<p>(Passo 4) Certbot - LetsEncrypt</p>

~~~shell 
sudo apt install certbot python3-certbot-apache -y
~~~

<p><font size='1'><i>fonte: https://www.digitalocean.com/community/tutorials/how-to-use-certbot-standalone-mode-to-retrieve-let-s-encrypt-ssl-certificates-on-ubuntu-20-04
</i></font></p>

<br>
<p>(Passo 5) Verificar virtual host inicial do apache2</p>

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
        Alias www.pgd.senappen.seg.br pgd.senappen.server.br**

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
Verificar se ocorrerá renovação automática do certificado.
</p>

~~~shel
sudo systemctl status certbot.timer
~~~

</ol>


(Passo 6) - Baixar e configurar pasta do projeto Petrvs

De alguma forma entregar a pasta backend do projeto no diretório home do usuário (upload via winscp, por ex.) e depois rodar os comandos:

~~~shell
cd ~/petrvs
chmod 777 ~/petrvs/storage -R
cp ~/.env.template ~/petrvs/.env
composer install
composer update
~~~

#### No ambiente de produção deverá ser utilizado um database para cada finalidade). Cadastrar senha correspondente:

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
LOG_DATABASE=petrvs
LOG_USERNAME=root
LOG_PASSWORD=PsEeTnRhVaS
~~~

Caso não possua os bancos de dados e seja a primeira instalação, deverá ser executado os comando abaixo para criação das tabelas dos bancos de dados e seeder inicial:

~~~shell
php artisan migrate
php artisan db:seed
~~~
