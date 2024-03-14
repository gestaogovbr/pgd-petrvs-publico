# MÓDULO: Programas de gestão/Regramentos De Instituição do Pgd

## CAPACIDADES

~~~text
    MOD_PRGT_EDT = Permite editar programas de gestão
    MOD_PRGT_EXCL = Permite excluir programas de gestão
    MOD_PRGT_INCL Permite incluir programas de gestão
    MOD_PRGT_EXT = Permite visualizar todos os programas, independente da hierarquia de unidades
~~~

## REGRAS DE NEGÓCIO APLICADAS

1. (RN_PRGT_1) Regra de Visualização de Programas 

### Objetivo
Garantir que apenas os programas associados à **primeira unidade instituidora identificada** sejam exibidos na listagem padrão.
### Detalhes

- **Listagem Padrão:** Usuários visualizarão apenas os programas vinculados à primeira unidade instituidora encontrada. Isso visa a uma apresentação organizada e evita a sobrecarga de informações.
- **Exceção de Acesso:** Acesso ampliado para visualizar todos os programas é concedido aos usuários com a permissão `MOD_PRGT_EXT`. Destinado a perfis que necessitam de uma visão completa para gestão ou análise detalhada.
