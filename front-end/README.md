### Recomendações
- Para executar o código localmente em desenvolvimento utilizar o comando:
``` 
npm start
```
- Para buildar a aplicação deve-se utilizar o comando (observando sempre que a pasta back-end e front-end devem estar no mesmo local):
``` 
npm run build
```

### Dicionário de dados

## Sintax

# TypeScript
```
- Classes:
  * A ordem dentro da classe deve ser:
    + @ViewChild, @Input, @Output, e tudo que começar com @ e for do angular
    + public
    + private, iniciando sempre com _
    + construtor
    + métodos do nosso framework
    + outros métodos  
- DAO:
  * Nome em singular
  * Nome da tabela sempre em PascalCase
  * Actions que representam uma ação ficarão no infinitivo do verbo, trazem lista fica no plural. 
- Models:
  * Herdar sempre de Base
  * Os objetos de relacionamento devem ficar no tipo da classe, sempre snake_case
  * Os propriedades devem sempre ser snake_case;
  * Propriedades que no banco de dados podem ser nullabel, devem ficar na model com o tipo null. Ex.: public prioridade: number | null = null; /* Nível de prioridade */
  * Sempre que for necessário informações extra, usar obrigatoriamente a propriedade _metadata. As models devem ter somente os campos do banco!
  * Sempre usar o construtor: public constructor(data?: any) { super(); this.initialization(data); }
  * Propriedades enumerativas obrigatoriamente devem ser tipadas. (Na maioria dos casos, deverá ter seu lookup definido também);
- Modules:
  * Cada módulo no sistema tem um module associado. Janelas que são globais devem ficar no módulo Uteis. 
  * Os components devem herdar obrigatoriamente de alguma das classes base: page-base, page-form-base, page-frame-base, page-list-base;
  * A estrutura básica de um módulo geralmente segue o padrão para nome de componentes (mod é o nome do módulo separado por "-"):
    + mod-form
    + mod-list
    + mod-routing.module.ts
    + mod.module.ts
- Rotas:
  * as rotas são sempre snake_case (exceto pelo nome do controller que é PascalCase e é exatamente o nome da tabela definido no DAO)
- Services:
  * Todos as Keys de LookupItem (quando não for um UUID), devem obrigatoriamente serem maiusculas e separadas por "_";
  * as nomenclaturas devem sempre ser definidas em LexicalService antes de serem utilizadas;
- Indentação de 2 espaços;
- Constantes são sempre maiusculas separadas por "_";
- Campos de model com nome composto sempre usar "_" (não pode haver letras maiúsculas);
- Propriedades de classes são sempre camelcase (exceto se for referente a campo de banco);
- Funções são SEMPRE camelcase;
- Parametros de Funções são SEMPRE camelcase;
- Tudo que for framework (seja nossa criação ou não) é em inglês. Para todo o resto em português;
```

# ASSETS
```
- os diretorios e arquivos devem ser sempre snake_case;
```

# HTML
```
- Indentação de 2 espaços
- Configurar no VSCode HTML > Format: Wrip Line Length = 0
- ids do angular sempre #camelCase
```

# SCSS
```
- indentação de 2 espaços
- Classes separadas por "-" e tudo minúsculo
```

# Documentação
```
- As tags CAPACIDADES, REGRAS DE NEGÓCIO e REGRAS DE INTERFACE são obrigatórias.
- As tabelas são definidas na form (COD:TABELA_N), onde COD é o código do módulo e N o número da tabela. As tabelas devem ser referenciadas com [COD:TABELA_N]
- As regras de negócio são definidas na forma (RN_COD_?), onde COD é o código do módulo e ? é a letra sequencial do alfabeto. As RN devem ser referenciadas com [RN_COD_?]
- As mensagem de erro devem possuir o código da regra que estão validando na forma [RN_COD_?] (preferencialmente no final da mensagem)
- Os trechos de código onde a regra for implementada deverá ter obrigatoriamente o código da regra.
```