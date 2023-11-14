# Módulo: Usuários

## CAPACIDADES  

~~~text
    MOD_USER - Permite consultar usuário
    MOD_USER_EDT - Permite alterar usuário
    MOD_USER_EXCL - Permite excluir usuário
    MOD_USER_INCL - Permite incluir usuário
    MOD_USER_TUDO - Permite consultar qualquer usuário independente de lotação
    MOD_USER_ATRIB - Permite gerenciar atribuições de usuário
~~~

## BANCO DE DADOS

~~~text
Tabela: usuarios

Campos obrigatórios:
    email
    nome
    cpf
    apelido
    situacao_funcional
~~~

## REGRAS DE NEGÓCIO

- (RN_USER_A) É obrigatória a definição da unidade de lotação do usuário
- (RN_USER_B) Qualquer alteração no cadastro do usuário deve garantir que sua unidade de lotação continua válida
- (RN_USER_C) Um usuário pode possuir as seguintes atribuições junto a uma unidade: 'AVALIADOR_PLANO_ENTREGA', 'AVALIADOR_PLANO_TRABALHO', 'HOMOLOGADOR_PLANO_ENTREGA', 'LOTADO', 'COLABORADOR', 'GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'
- (RN_USER_D) Um usuário só pode ser gestor de uma única unidade, mas pode ser gestor substituto ou gestor delegado de mais de uma
- (RN_USER_E) As atribuições de gestor, gestor substituto e gestor delegado, são mutuamente exclusivas para um mesmo servidor/mesma unidade
- (RN_USER_F) Um usuário não pode ser excluído
- (RN_USER_)
- (RN_USER_)
- (RN_USER_)
- (RN_USER_)
- (RN_USER_)

## REGRAS DE INTERFACE
