# resources
Resources (assets, configs, helpers)

## Instalação via Docker (no Windows):

#### 1. Etapa inicial - Levantando os serviços APACHE2+PHP, MYSQL e NODEJS
- Instalar o GIT no computador (https://git-scm.com/downloads)
- [Opcional] Instalar um gerenciador git de sua preferência (sugerido o tortoiseGit: https://tortoisegit.org/download/)
- [Opcional] Instalar editor de sua preferencia (sugerido o vsCode: https://code.visualstudio.com/download)
- Instalar o Docker Descktop (https://docs.docker.com/desktop/install/windows-install/)
- Clonar o repositório em um diretório: https://gitlab.com/petrvs.app/Petrvs.git
- Pelo **cmd** (ou powershell) ir até a pasta do projeto, acessar a pasta resources/docker (**cd /PASTA_DO_PETRVS/resources/docker**) e executar: 
```
docker compose up
```
> Dessa forma, são criadas três imagens e carregados os respectivos containers docker: **db**, **php** e **node**. Um serviço MYSQL, Um serviço apache2 com php e um serviço NodeJS.

#### 2. Configurando back-end

- Abrir o projeto back-end no vscode. No terminal, executar os comandos (somente na primeira vez, depois o back-end continuará rodando na porta 80): 
```
1) .\php_sh.bat
2) composer install
```

- Será necessário criar o arquivo **.env** na pasta /PASTA_DO_PETRVS/back-end (utilize o arquivo **/PASTA_DO_PETRVS/back-end/.env.template** para facilitar). Para utilizar o serviço do mysql criado pelo docker, utilize a seguinte configuração no .env (existe tambem um usuário petrvs com mesma senha do root e por questões de simplificação, o database para logs será o mesmo que está sendo utilizado para os dados. No ambiente de produção deverá ser utilizado um database para cada finalidade):
```
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
```

- Caso não possua o banco de dados e/ou seja a primeira instalação, deverá ser executado os comando abaixo para criar banco de dados, estruturar e efetuar povoamento inicial:

>No prompt de comando, entrar na pasta /PASTA_DO_PETRVS/back-end e executar:
```
docker exec -it db /bin/sh
```
>Digitar os comandos abaixo (quando solicitado, utilizar a senha padrão configurada no /PASTA_DO_PETRVS/back-end/.env - **PsEeTnRhVaS**):
```
mysql -u root -p
create database petrvs;
exit
```
>Agora, efetuar migração e população do banco de dados.
```
php artisan migrate
php artisan db:seed
```

#### 3. Configurando front-end
- Na pasta **/PASTA_DO_PETRVS/front-end/src/environments/**, criar arquivo **environment.ts** utilizando como exemplo o **environment.template.ts** (só efetuar uma cópia simples). O arquivo poderá ser editado convenientemente já que está no .gitignore e não será comitado.

- Abrir o projeto front-end no vscode. No terminal, executar os seguintes comandos: 
*(Obs.: Após a primeira execução, será necessário somente executar* ***.\node_sh.bat*** e depois ***npm start*** *toda vez que iniciar o docker. O Angular rodará na porta 4200)*:
```
1) .\node_sh.bat
2) npm install --force
3) npm start
```

## Debug (X-debug no back-end)

- No vscode será necessário instalar a extensão PHP Debug (XDebug), bastando apenas acessar a area de extensões do vscode e pesquisar por PHP Debug. A configuração para realizar o debug já consta na pasta .vscode (dentro do repositório na pasta back-end). Ao clicar em "Run > Start debbuging", será executado o script para iniciar o XDebug no docker, e após a pausa será executado o script para desligar o x-debug. Lembrando que o vscode ao executar os scripts de habilitar ou desabilitar o xdebug solicita que o usuário precione qualquer tecla para fechar o pront shell que é aberto. 

## Cadeia de certificados para o curl do PHP
```
https://curl.se/docs/caextract.html
```

## Criando um docker temporário para executar comandos
```
docker run --rm -it --entrypoint bash php:8.1-apache
```
