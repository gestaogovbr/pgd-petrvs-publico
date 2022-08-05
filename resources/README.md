# resources
Resources (assets, configs, helpers)

- Instalação via Docker (no Windows):

	* Instalar o GIT no computador (https://git-scm.com/downloads)
	* [Opcional] Instalar um gerenciador git de sua preferência (sugerido o tortoiseGit: https://tortoisegit.org/download/)
	* [Opcional] Instalar editor de sua preferencia (sugerido o vsCode: https://code.visualstudio.com/download)
	* Instalar o Docker Descktop (https://docs.docker.com/desktop/install/windows-install/)
	* Clonar o repositório em um diretório: https://gitlab.com/petrvs.app/Petrvs.git
	* Pelo cmd (ou powershell) ir até a pasta do projeto, acessar a pasta resources/docker (cd /PASTA_DO_PETRVS/resources/docker)
	* Executar o comando: docker compose up (será criado 3 imagens e será carregado 3 containers docker: db; php; e node. Respectivamente um serviço MySQL, um serviço PHP e um serviço NodeJS)
	* Abrir o projeto back-end no vscode, no terminal executar os comandos (somente na primeira vez, depois a aplicaçao continuará sendo servida na porta 80): 
```
1) .\php_sh.bat
2) composer install
```
	* Será necessário criar o arquivo .end na pasta /PASTA_DO_PETRVS/back-end (utilize o arquivo .env.template para facilitar). Para utilizar o serviço do mysql criado pelo docker, utilize a seguinte configuração no .env (existe tambem um usuário petrvs com mesma senha do root, e por questões de simplificação o database para logs será o mesmo que está sendo utilizado para os dados. No ambiente de produção deverá ser utilizado um database para cada finalidade):
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
	* Caso não possua o banco de dados e seja a primeira instalação, deverá ser executado os comando abaixo para criação do banco e povoamento inicial:
```
php artisan migrate
php artisan db:seed
```
	* Abrir o projeto front-end no vscode, no terminal executar os comandos (após a primeira execução, será necessário somente o comando 3 toda vez que iniciar o docker, o angular será servidor na porta 4200): 
```
1) .\node_sh.bat
2) npm install --force
3) npm start
```
	* Para a primeira execução com o npm start (que build a aplicação em memória e serve na pora 4200), será necessário fazer a copia do arquivo environment.template.ts para o arquivo environment.ts dentro da pasta /PASTA_DO_PETRVS/front-end/src/environments. O arquivo copiado poderá ser editado convenientemente já que ele consta no .gitignore e não será comitado.