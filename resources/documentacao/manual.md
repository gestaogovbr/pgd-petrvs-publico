# Petrvs

## Visão geral do sistema

- Planejamento Institucional
  - Objetivos
- Cadeia de Valor
  - Processos
- Programa
  - Plano de Entregas
    - Entregas
    - Plano de Trabalho
	  - Atividades
	    - Tarefas
- Projetos  

## Módulos

* [Planejamento Institucional](./Gestao/planejamento_institucional.md)
* [Plano de Entrega](./Gestao/plano_entrega.md)
* [Plano de Trabalho](./Gestao/plano_trabalho.md)

## Regra geral do sistema

1) O usuário deve possuir no mínimo uma lotação para poder utilizar o sistema

## Passo-a-passo para a instalação da versão 2.0 nas máquinas dos desenvolvedores

1. criar o banco, com o comando: php artisan make:database
2. executar as migrations para o banco central, com o comando: php artisan migrate
3. levantar a aplicação, com o comando: npm start
4. fazer a chamada ao painel e criar a entidade, através da URL: localhost:4200/#/panel
5. rodar as primeiras seeds, com o comando: php artisan tenant:seed --class=DatabaseSeeder