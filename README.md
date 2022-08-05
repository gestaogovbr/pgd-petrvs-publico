# Petrvs

## Clone: 

```
https://gitlab.com/petrvs.app/Petrvs.git
```

## Procedimento para instalação

- Para instalar a versão de desenvolvimento utilizando o Docker, utilize as instruções contidas [aqui](resources/README.md)
- Para instalar a versão produção sem utilizar o Docker, consultar documentação aqui (PAGINA EM DESENVOLVIMENTO) 

## Procedimento para deploy:

- Antes de iniciar o desenvolvimento, dar obrigatoriamente um pull (para cada funcionalidade implementada, cada ticket um commit)
- Faz o desenvolvimento do ticket
- build no front da aplicação (transpilar o front-end para a pasta public do back-end: npm run build)
- commit (obrigatório para permitir o pull)
- pull
- resolver os conflitos no back e front, resolver os .maps com HEAD, e quando tiver conflito, perguntar a pessoa do arquivo que deu conflito
- se for pra gerar uma nova versão precisa alterar o arquivo app.json na propriedade "version"
- npm run build
- commmit
- push