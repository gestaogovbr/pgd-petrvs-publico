# Petrvs

## Clone: 

```
https://gitlab.com/petrvs.app/Petrvs.git
```

## Procedimento para instalação

- Para instalar a versão de desenvolvimento utilizando o Docker, utilize as instruções contidas [AQUI](resources/README.md)
- Para instalar a versão produção sem utilizar o Docker, consultar documentação [AQUI](resources/README_LINUX_VPS_DEPLOY_PRODUCAO.md)

## Procedimento para deploy:

- Fetch (para trazer o repositório develop atualizado)
- Caso seja produção, adicionar todos os tickets do gitlab no milestone da versão que será liberado
- Merge com o branch remote/develop
- Alterar a versão ({Major}.{Minor}.{Release}.{Build}) no arquivo front-end/src/app.json com a seguinte regra:
  * Deploy para ambiente desenvolvimento: Incrementar o último número (build da versão)
  * Deploy para ambiente de produção: Incrementar o penúltimo número (release da versão) e zerar o último número
- npm install
- build do front-end (verificar se a documentação da pasta resources/documentacao foi enviado para a pasta back-end/public/assets/documentacao)
- add e commit
- push (pra sua branch)
- merge request (da sua branch para develop)
- resolver os conflitos no back e front, resolver os .maps com HEAD, e quando tiver conflito, perguntar a pessoa do arquivo que deu conflito
- Se for para produção:
  * merge request de develop para main
  * Fazer a revisão do código do merge request antes de aprovar, verificando no mínimo:
    + Indentação
    + Case de variáveis, parametros, funções, constantes, privados...
    + Case de campos do banco de dados
    + Verificar se todas as models estão corretas (front-end e back-end). Devem conter todos os campos e os relacionamentos
    + Migrations (Down e o Up, nome da classe e do arquivos), realizar a execução forward e rollback para verificar se está tudo OK
    + Verificar as regras do dicionário de dados do front-end e back-end
    + Verificar a versãon no arquivo app.json
    + Verificar se a documentação foi atualizada com o que foi desenvolvido
    + Verificar se foi criado a migration para adicionar a versão no banco de dados (O nome da migration deverá ser AAAA_MM_DD_999999_version_9_9_9_9.php)
    + Atualizar/Criar os testes automatizados para a funcionalidade criada
  * Fazer a aprovação se estiver tudo OK ou reprovar e solicitar alterações
- Enviar para os ambientes adequados (Caso seja MGI):
  Desenvolvimento: merge request develop para dataprev_dsv
  Homologação: merge request develop para dataprev_hmg
  Produção: merge request main para dataprev_prod
- Acessar o painel (caso seja produção), para executar as migrations

## Documentação

- A documentação do sistema é feita na pasta ./resources/documentacao e pode ser acessada [AQUI](./resources/documentacao/manual.md)
- O dicionário de dados (apenas para os desenvolvedores) está localizado na sua respectiva pasta:
  - [Front-end](./front-end/README.md)
  - [Back-end](./back-end/README.md)

## Extensões recomendadas para o VS Code

- Dev Containers (Microsoft)
- Numbered Bookmarks (Alessandro Fragnani)
- PHP Debug (Xdebug)
- PHP Intelephense (Ben Mewburn)
- PHP Sniffer & Beautifier (Samuel Hilson)
- stack-tabs (Kyle Paulsen)