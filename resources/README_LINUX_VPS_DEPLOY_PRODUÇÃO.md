# resources
Resources (assets, configs, helpers)

## OBS: Antes de iniciar a instalação, certifique-se de que o DNS está configurado. Caso não esteja, edite o arquivo /etc/resolv.conf e adicione o DNS.

## Instalação em VPS (Google Cloud) com Ubuntu 22.04.2 LTS (Jammy) (minimal - x86_x64)

###  Instalando aplicativos padrões e recursos adicionais
-> sudo apt install apache2 php libapache2-mod-php php-mysql openssl git iputils-ping dnsutils nano apt-transport-https ca-certificates curl software-properties-common -y

### Bibliotecas PHP para Laravel
-> sudo apt install php-cli php-common php-fpm php-bcmath php-curl php-json php-mbstring php-mysql php-tokenizer php-xml php-zip php-soap php-mysqli -y 

### Bibliotecas Linux
-> sudo apt install git zlib1g-dev libzip-dev unzip curl openssl libssl-dev libxml2-dev -y

### Certbot - LetsEncrypt
-> sudo apt install certbot python3-certbot-apache -y
-> fonte: https://www.digitalocean.com/community/tutorials/how-to-use-certbot-standalone-mode-to-retrieve-let-s-encrypt-ssl-certificates-on-ubuntu-20-04

#### Verificar virtual host inicial do apache2
~~~shell
sudo nano /etc/apache2/sites-available/000-default.conf
~~~

Adicionar tag ServerName com respectivo domínio e alias que será usado pelo PETRVS
-> ServerName pgd.senappen.seg.br
-> Alias www.pgd.senappen.seg.br pgd.senappen.seg.br

##### Ao terminar edição do arquivo 000-default.conf, executar este comando para verificar se está tudo certo com apache2
~~~
sudo apache2ctl configtest
~~~

##### Tudo certo!? Executar reload no apache2 para assumir nova configuração:
~~~
sudo systemctl reload apache2
~~~

##### Agora vamos solicitar o certificado SSL da LetsEncrypt e prosseguir:
~~~shell
sudo certbot --apache
~~~
##### Reiniciar apache para assumir novas configurações (tirar qualquer dúvida):
~~~shell
sudo systemctl reload apache2
~~~

##### Verificar se ocorrerá renovação automática do certificado.
sudo systemctl status certbot.timer

### 3 - Instalar Git e GitHub CLI
~~~shell
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

sudo apt update
sudo apt install -y git gh
gh --version
~~~

Comando **gh --version** deve retornar resposta como: 
_gh version 2.14.3 (2022-07-26)
https://github.com/cli/cli/releases/tag/v2.14.3"_


### 4 - Autenticar no Git usando o GitHub Cli
- Executar comando abaixo, selecionar opção GitHub.com e seguir orientações de login. 
~~~shell
gh auth login
~~~

- Ao terminar, confirmar que está logado usando o seguinte comando:
~~~shell
gh auth status
~~~

### 5 - Baixar e configurar pasta do projeto Petrvs
~~~shell
cd ~
git clone https://gitlab.com/petrvs.app/Petrvs.git petrvs
chmod 777 ~/petrvs/back-end/storage -R
cp ~/petrvs/resources/docker/backend_env_local_template ~/petrvs/back-end/.env
~~~

### 6 - Rodar imagem docker e prosseguir com configurações e instação do Petrvs
- **Abrir novo terminal e rodar comandos**. 
~~~shell
sudo service docker start
cd ~/petrvs/resources/docker
docker-compose up
~~~
**Deixar comando docket-compose up rodando e voltar ao primeiro terminal**

- No primeiro terminal (é preciso ter dois rodando) e executar os seguintes comandos 
~~~shell
bash ~/petrvs/back-end/php_sh.bat
composer install
~~~

- Clonar o repositório em um diretório: https://gitlab.com/petrvs.app/Petrvs.git
- Pelo cmd (ou powershell) ir até a pasta do projeto, acessar a pasta resources/docker (cd /PASTA_DO_PETRVS/resources/docker)
- Executar o comando: docker compose up (será criado 3 imagens e será carregado 3 containers docker: db; php; e node. Respectivamente um serviço MySQL, um serviço PHP e um serviço NodeJS)
- Abrir o projeto back-end no vscode, no terminal executar os comandos (somente na primeira vez, depois a aplicaçao continuará sendo servida na porta 80): 

~~~shell
1) .\php_sh.bat
2) composer install
~~~

- Será necessário criar o arquivo .end na pasta /PASTA_DO_PETRVS/back-end (utilize o arquivo .env.template para facilitar). Para utilizar o serviço do mysql criado pelo docker, utilize a seguinte configuração no .env (existe tambem um usuário petrvs com mesma senha do root, e por questões de simplificação o database para logs será o mesmo que está sendo utilizado para os dados. No ambiente de produção deverá ser utilizado um database para cada finalidade):

~~~shell
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=petrvs
DB_USERNAME=root
DB_PASSWORD=PsEeTnRhVaS

LOG_CONNECTION=log
LOG_HOST=db
LOG_PORT=3306
LOG_DATABASE=petrvs
LOG_USERNAME=root
LOG_PASSWORD=PsEeTnRhVaS
~~~

- Caso não possua o banco de dados e seja a primeira instalação, deverá ser executado os comando abaixo para criação do banco e povoamento inicial:
~~~shell
php artisan migrate
php artisan db:seed
~~~

- Abrir o projeto front-end no vscode, no terminal executar os comandos (após a primeira execução, será necessário somente o comando 3 toda vez que iniciar o docker, o angular será servidor na porta 4200): 
~~~shell
1) .\node_sh.bat
2) npm install --force
3) npm start
~~~
- Para a primeira execução com o npm start (que build a aplicação em memória e serve na pora 4200), será necessário fazer a copia do arquivo environment.template.ts para o arquivo environment.ts dentro da pasta /PASTA_DO_PETRVS/front-end/src/environments. O arquivo copiado poderá ser editado convenientemente já que ele consta no .gitignore e não será comitado.

## Debug (X-debug no back-end)

- No vscode será necessário instalar a extensão PHP Debug (XDebug), bastando apenas acessar a area de extensões do vscode e pesquisar por PHP Debug. A configuração para realizar o debug já consta na pasta .vscode (dentro do repositório na pasta back-end). Ao clicar em "Run > Start debbuging", será executado o script para iniciar o XDebug no docker, e após a pausa será executado o script para desligar o x-debug. Lembrando que o vscode ao executar os scripts de habilitar ou desabilitar o xdebug solicita que o usuário precione qualquer tecla para fechar o pront shell que é aberto. 

## Criando um docker temporário para executar comandos
~~~shell
docker run --rm -it --entrypoint bash php:8.1-apache
~~~
