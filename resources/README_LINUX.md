# resources
Resources (assets, configs, helpers)

## Instalação via Docker (Ubuntu 20.04 - WSL):

### 1 - Instalação Docker (serviço)
~~~shell
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt install docker-ce
sudo service docker start
~~~

> Fonte: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt

### 1.1 - Configurar resolução de DNS do serviço DOCKER
~~~shell
sudo nano /etc/default/docker
descomentar DOCKER_OPTS="--dns 8.8.8.8 --dns 8.8.4.4"
sudo service docker restart
~~~

### 2 - Atualizando docker-composer
Acessar o site https://github.com/docker/compose/releases, procurar última versão (hoje é 2.9.0) e copiar o link do arquivo do respectivo linux. 
> Fonte: https://github.com/docker/compose/releases/download/v2.9.0/docker-compose-linux-x86_64_

~~~shell
sudo curl -L https://github.com/docker/compose/releases/download/v2.9.0/docker-compose-linux-x86_64 -o /usr/bin/docker-compose
sudo chmod 755 /usr/bin/docker-compose
~~~

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
