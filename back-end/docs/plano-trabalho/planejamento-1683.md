---
alwaysApply: false
description: Quando a conversa envolver o ticket #1683 ou plano de trabalho V2
---
# Planejamento #1683

## Princípios gerais:

- O controller terá apenas lógica da conexão. Ex.: quais campos são aceitos? Que tipo de dado pode vir a partir destes campos?
- A regra de negócio deve estar contida em alto nível no `Service`, ela será o orquestrador das regras de negócio
- Penso em começar a utilizar uma estrutura mais próximo da linguagem de negócios, demonstrando mais claramente a hierarquia. Por exemplo:
	```
	Os nomes são placeholders, mas a ideia é deixar os contextos de negócio mais próximos uns dos outros. Não segregando por funcionalidade dentro do sistema, mas por caso de uso:

	v2/
	L plano-trabalho/
	| L entrega/
	| 	L Controller.php
	| 	L Service.php
	| 	L Validacoes.php
	L CalculadoraPeriodosAvaliativos.php
	L Controller.php
	L Service.php
	L Validacoes.php
	```
- Abolir o uso de `ServiceBase`
- Coverage 100%

## Organização hierárquica (AS-IS)

Os PTs atualmente estão disposto da seguinte forma dentro do BD:

`planos_trabalhos`:
-  `planos_trabalhos_entregas` (1..\*): entregas ligadas ao PE por `plano_entrega_entrega_id`
	<details>
	<summary>Exemplo</summary>

	o PE tem uma entrega _"Acessibilidade da biblioteca"_. Poderia ser criado um PT detalhando que será adicionada uma rampa e piso tátil. `planos_trabalhos_entregas` seria ligado pela entrega do PE `plano_entrega_entrega_id` = `<acessibilidade_uuid>` com a descrição _"contrução da rampa e instalação do piso tátil"_

	</details>
- `planos_trabalhos_consolidacoes` (1..\*): no front antigo são as abas que contêm os REs
	- `atividades` (1..\*): ligada a todas as 3 tabelas `planos_trabalhos*` citadas acima. São os registros do que foi feito e do progresso em si. Atualmente ficam dentro do menu sanduíche das entregas dos REs.

<details>
	<summary>Explicação gráfica</summary>

![Explicação Gráfica](screenshot-REs-v2.9.18.png)

</details>

### Regramento `programas`

#### **Cardinalidade**

`progamas` N:1 `unidades`

#### **Prioridade**

- Se a unidade tem ao menos um regramento próprio `programas WHERE unidade_id = :unidade_id`, deve ser dada a priodade ao regramento dela
- Se uma unidade não tem um regramento próprio, a prioridade deve ser dada ao regramento da unidade ascendente mais próxima

#### **Listagem**

- Todos os regramentos das unidades ascendentes devem ser listados
- Os regramentos de unidades da hierarquia lateral ou descendente **NÃO** devem ser listados


## Rotas:

**Legenda**

	^[campo] = dependência de um campo principal. Se o campo principal não for passado, ignora-se o campo dependente. Consequentemente, suas validações também
	§ = Indisponível para perfil participante ou hierarquicamente inferior
	* = Obrigatório

_Não necessariamente o tratamento dos campos `§` será feito no controller_

---

### Plano de trabalho

#### `GET /api/v2/plano-trabalho` `3.*`

- Body:
	- include_arquivados`§`(bool) `RN01,04,06,07`
	- include_from_unidades_subordinadas`§`(bool) `RN01-03`
	- unidade_ids`§^[include_from_unidades_subordinadas]`(array) `RN01-03,12`
		- unidade atual do usuário que está criando o PT. Se for possível identificá-la via back-end, remover esse campo
	- only_vigentes(bool) `RN01,06,07`
	- only_meus_planos(bool) `RN01,05`

#### `GET /api/v2/plano-trabalho/:id` `4.7`

Não há nada que deixe explícito no ticket a partir da qual o PT é consequentemente consultável individualmente. No entanto, [baseado no print](screenshot-get-pt-id.png), esterei presumindo que já a partir do passo 1, contemplado no end-point `POST /api/v2/plano-trabalho`, o PT será salvo, tendo uma uuid que poderá ser passada como parâmetro deste end-pont.

Quanto ao status, poderia ser feito um processamento no back-end para verificar a existência de entregas e consolidações. E, caso ainda esteja na fase inicial, sem nada de consolidação/RE, retorna o status como rascunho, ou um `is_rascunho = true`

O fluxo base que estou visualizando (happy-path) para chegar até aqui da primeira vez é o seguinte:

<details>
<summary>Diagrama Get by ID</summary>

![Diagrama happy path](fluxo-1683.drawio.png)
</details>

#### `POST /api/v2/plano-trabalho` `4.2-4.4`

- Quem: qualquer perfil `4.2`
  - Participante só pode cadastrar para si mesmo `RN18.i`
  - Colaborador não pode ser o agente público do PT `RN18.iv`
  - Demais perfis podem cadastrar para qualquer agente público lotado/vinculado nas suas unidades e subordinadas `RN18.ii,iii`
  - Agente público deve estar habilitado no SIAPE `RN25`

- Body:
	- usuario_id`*^[perfil!=COLABORADOR]`(uuid) `RN18`
	- unidade_id`*`(uuid) `RN19`
	- programa_id`*`(uuid) `RN20`
	- data_inicio`*`(date) `RN21,22,23`
	- data_fim`*`(date) `RN21,22,23`
	- modalidade_id`*`(uuid) `RN24`
	- justificativa`*^[modalidade]`(string(500)) `RN24`

#### `PUT /api/v2/plano-trabalho/:id` `4.9`

- Quem: usuário que cadastrou o PT; participante dono do PT; chefia titular/substituta do participante; Adm Negocial (unidade instituidora >= unidade do PT); Adm Master `4.9`
- Guard: PT `INCLUIDO` ou `AGUARDANDO_ASSINATURA` `4.9`
- Ação: apaga entregas do bloco Planejamento; se `AGUARDANDO_ASSINATURA`, reverte para `INCLUIDO` `4.9`

Body: mesmo do POST

#### `DELETE /api/v2/plano-trabalho/:id` `4.11`

- Quem: usuário que cadastrou o PT; participante dono do PT; chefia titular/substituta do participante; Adm Negocial (unidade instituidora >= unidade do PT); Adm Master
- Guard: PT sem nenhuma assinatura

### Assinatura do Plano de Trabalho

A assinatura segue o fluxo de dupla assinatura (participante + chefia). O endpoint identifica automaticamente se é o 1º ou 2º signatário.

#### `POST /api/v2/plano-trabalho/:id/assinar` `4.10`

- Quem: participante dono do PT (1º signatário); chefia titular/substituta da unidade (2º signatário)
- Guard: ao menos uma entrega cadastrada com informações válidas no bloco Planejamento

#### `PATCH /api/v2/plano-trabalho/:id/cancelar-assinatura` `4.12`

- Quem: exclusivamente o 1º signatário
- Guard: PT `AGUARDANDO_ASSINATURA`

_(onde ficaria a lógica de buscar quantas assinaturas ainda são necessárias?)_

### Transições de status do Plano de Trabalho

Cada transição é um endpoint próprio, evitando um service monolítico. Todos seguem o mesmo fluxo: validar transição (máquina de estados) -> guards -> ações em transaction.

#### `PATCH /api/v2/plano-trabalho/:id/cancelar` `4.22`

- Quem: participante dono do PT; chefia titular/substituta da unidade; Adm Negocial (unidade instituidora >= unidade do PT); Adm Master
- Guard: PT `ATIVO`; nenhum período avaliativo com registro finalizado
- Body:
  - justificativa`*`(string(500)) `4.22`

#### `PATCH /api/v2/plano-trabalho/:id/encerrar` `4.23`

- Quem: participante dono do PT; chefia titular/substituta da unidade; Adm Negocial (unidade instituidora >= unidade do PT); Adm Master
- Guard: PT `ATIVO`
- Body:
  - justificativa`*`(string(500)) `4.23`

#### `PATCH /api/v2/plano-trabalho/:id/arquivar` `4.25`

- Quem: participante dono do PT; chefia titular/substituta/delegado da unidade; Adm Negocial (unidade instituidora >= unidade do PT); Adm Master; Colaborador com vinculação à unidade ou superior
- Guard: PT `CONCLUIDO`, `CANCELADO` ou `ENCERRADO`; sem pendências de avaliação/recurso (30 dias corridos após avaliação)

#### `PATCH /api/v2/plano-trabalho/:id/cancelar-assinatura` `4.12`

- Quem: exclusivamente o 1º signatário
- Guard: PT `AGUARDANDO_ASSINATURA`

#### `DELETE /api/v2/plano-trabalho/:id` `4.11`

- Quem: usuário que cadastrou o PT; participante dono do PT; chefia titular/substituta do participante; Adm Negocial (unidade instituidora >= unidade do PT); Adm Master
- Guard: PT sem nenhuma assinatura

### Entregas do Plano de Trabalho

#### `POST /api/v2/plano-trabalho/:id/entrega` `4.5`

- Quem: quem está cadastrando o plano `4.5,4.7`
- Guard: PT `INCLUIDO` ou `AGUARDANDO_ASSINATURA` `RN28`
- Body:
	- entregas(array)`RN26,29-32`
		- array:
			- unidade_id(uuid)
			- plano_entrega_entrega_id(uuid)`RN31,32`
			- forca_trabalho(decimal)`RN29,30`
			- descricao(string(1000))	
			- justificativa`^[SOMA(forca_trabalho!=100.0)]`(string)`RN29,30` _não encontrei nenhuma coluna que seja dedicada à explicação de divergências da %CHD, (o mais próximo seria `texto_complementar_plano`). Será que valeria a pena criar um `justificativa_carga_horaria_disponivel`?_

#### `PUT /api/v2/plano-trabalho/:id/entrega/:entrega_id` `RN27`

- Quem: quem está cadastrando o plano `4.5,4.7`
- Guard: PT `INCLUIDO` ou `AGUARDANDO_ASSINATURA` `RN28`
- Body:
	- entrega_id`*`(uuid) - uuid do `planos_trabalhos_entregas`
	- unidade_id(uuid)
	- plano_entrega_entrega_id(uuid)`RN31,32`
	- forca_trabalho(decimal)`RN29,30`
	- descricao(string(1000))

#### `DELETE /api/v2/plano-trabalho/:id/entrega/:entrega_id` `RN27`

- Quem: quem está cadastrando o plano `4.5,4.7`
- Guard: PT `INCLUIDO` ou `AGUARDANDO_ASSINATURA` `RN28`

### Períodos avaliativos (consolidações)

Os períodos avaliativos (`planos_trabalhos_consolidacoes`) são gerados automaticamente a partir da vigência do PT e da configuração do regramento (programa). Cada consolidação representa um intervalo de tempo dentro do PT.

#### Criação do objeto `planos_trabalhos_consolidacoes` (TO-BE)

Os períodos avaliativos devem ser gerados **somente após a aprovação do PT** (2ª assinatura, transição para `ATIVO`), e não durante o cadastro ou edição `4.13`.

Atualmente, `PlanoTrabalhoService::atualizaConsolidacoes` recalcula os períodos a cada edição do PT. Isso já causou inconsistências de `data_inicio` e `data_fim` nas consolidações quando as datas do PT eram alteradas, exigindo recalculo e gerando dados corrompidos.

Ao postergar a criação para o momento da aprovação:
- As datas do PT já estão definitivas (não podem mais ser editadas após assinatura)
- Elimina a necessidade de recalcular períodos a cada edição
- Remove a fonte de inconsistências do `atualizaConsolidacoes`
- Reduz operações de banco: sem INSERT/UPDATE/DELETE de consolidações a cada criação ou edição de PT

#### Máquina de estados

```php
// planos_trabalhos_consolidacoes.status (enum: INCLUIDO, CONCLUIDO, AVALIADO)
const TRANSITIONS = [
    'INCLUIDO'  => ['CONCLUIDO'],
    'CONCLUIDO' => ['INCLUIDO', 'AVALIADO'],
    'AVALIADO'  => ['CONCLUIDO'],
];
```

Estados derivados (não são valores do enum, são inferidos pela leitura dos dados):
- **Aguardando registro**: consolidação `INCLUIDO` sem atividades associadas
- **Aguardando avaliação**: consolidação `CONCLUIDO` sem nenhuma avaliação
- **Aguardando reavaliação**: consolidação `CONCLUIDO` com 1 avaliação que possui recurso, sem 2ª avaliação
- **Reavaliado**: consolidação `AVALIADO` com 2 avaliações (original + reavaliação)

Status derivados do PT (cascata):
- `CANCELADO` - quando o PT é cancelado (4.22), todos os períodos passam para este status
- `ENCERRADO` - quando o PT é encerrado antecipadamente (4.23), períodos futuros ganham este status

### Períodos avaliativos (consolidações) - transições de status

As transições operam sobre os 3 status reais (`INCLUIDO`, `CONCLUIDO`, `AVALIADO`). Os estados intermediários são inferidos pelos dados (ver máquina de estados acima).

#### `PATCH /api/v2/plano-trabalho/:id/consolidacao/:consolidacao_id/concluir` `4.17` (`INCLUIDO → CONCLUIDO`)

- Quem: participante dono do PT; chefia/substituta da unidade `4.17`
- Guard: PT `ATIVO`; consolidação `INCLUIDO` com atividades; `RN35` (Trabalho Executado preenchido para cada entrega) `4.17`
- Body:
  - justificativa(string(500))

#### `PATCH /api/v2/plano-trabalho/:id/consolidacao/:consolidacao_id/reabrir` `4.18` (`CONCLUIDO → INCLUIDO`)

- Quem: participante dono do PT; chefia/substituta da unidade `4.18`
- Guard: PT `ATIVO`; consolidação `CONCLUIDO` sem avaliação (estado derivado: aguardando avaliação) `4.18`
- Body:
  - justificativa`*`(string(500)) `4.18`

#### `PATCH /api/v2/plano-trabalho/:id/consolidacao/:consolidacao_id/recurso` `4.20` (`AVALIADO → CONCLUIDO`)

- Quem: exclusivamente o participante dono do PT `4.20`
- Guard: consolidação `AVALIADO` com exatamente 1 avaliação; nota IV ou V; prazo de 10 dias corridos `4.20`
- Ação: reverte status para `CONCLUIDO`; estado derivado passa a ser "aguardando reavaliação"
- Body:
  - justificativa`*`(string(500)) `4.20`

### Registros de execução (atividades)

Os registros de execução são as `atividades` vinculadas a um período avaliativo (`plano_trabalho_consolidacao_id`), a uma entrega (`plano_trabalho_entrega_id`) e ao PT (`plano_trabalho_id`).

#### `POST /api/v2/plano-trabalho/:id/consolidacao/:consolidacao_id/atividade` `4.16`

- Quem: participante dono do PT; chefia/substituta da unidade `4.16`
- Guard: PT `ATIVO`; consolidação `INCLUIDO` `4.16`
- Body:
  - plano_trabalho_entrega_id`*`(uuid) `RN33,34`
  - descricao`*`(text(1500)) `RN35` - Trabalho Executado

#### `PUT /api/v2/plano-trabalho/:id/consolidacao/:consolidacao_id/atividade/:atividade_id` `4.16, RN37`

- Quem: participante dono do PT; chefia/substituta da unidade `4.16`
- Guard: PT `ATIVO`; consolidação `INCLUIDO` `4.16`
- Body:
  - descricao(text(1500))
  - plano_trabalho_entrega_id(uuid)

#### `DELETE /api/v2/plano-trabalho/:id/consolidacao/:consolidacao_id/atividade/:atividade_id` `4.16, RN37`

- Quem: participante dono do PT; chefia/substituta da unidade `4.16`
- Guard: PT `ATIVO`; consolidação `INCLUIDO` `4.16`

### Avaliação

A avaliação é um contexto próprio, operando sobre um período avaliativo (consolidação) já concluído. Os registros são persistidos na tabela `avaliacoes`. Uma consolidação pode ter no máximo 2 avaliações: a avaliação original e, caso haja recurso, a reavaliação (um novo registro em `avaliacoes`).

#### `POST /api/v2/plano-trabalho/:id/consolidacao/:consolidacao_id/avaliacao` `4.19, 4.21`

Usado tanto para a avaliação original quanto para a reavaliação. Sempre cria um novo registro.

- Quem: chefia/substituta atual da unidade onde o PT foi pactuado `4.19, 4.21`
- Guard (avaliação): PT `ATIVO`; consolidação `CONCLUIDO` sem avaliação `4.19`
- Guard (reavaliação): PT `ATIVO`; consolidação `CONCLUIDO` com exatamente 1 avaliação que possui recurso `4.21`
- Body:
  - nota`*`(uuid) - `tipo_avaliacao_nota_id`
  - justificativa`*^[nota IN (I, IV, V)]`(string(500)) `4.19, 4.21`


## Componentes:

1 - Breadcrumbs
- Seguir o padrão do gov.br
	- Breadcrumbs dentro de um <nav> com aria-label
	- Partir da página inicial, representada com o ícone de uma casa, mas com um texto oculto explicitando que é a Página inicial
	- Ao longo da navegação do site ir adicionando à direita o "rastro" do usuário
	- As páginas anteriores devem ter links apontando para elas mas a página atual não, e ficará em destaque com negrito
	
	Ex.:

	[🏠(aria: "Página inicial")](/home) > [Página avó](/home/avo) > [Página pai](/home/avo/pai) > **Página atual**

2 - Toggle

Ex.:
```
+-------------------+  +-------------------+
|Título Centralizado|  |Título Centralizado|
|      (( )0)		|  |  	  (1( ))	   |
+-------------------+  +-------------------+
```