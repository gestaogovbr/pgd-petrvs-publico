# Módulos v2 — Guia de arquitetura front-end

Este documento define o template e as convenções para módulos do front-end v2. Todo módulo novo deve seguir este guia; módulos existentes convergem para ele conforme forem migrados.

Módulo piloto: `plano-trabalho-v2`. Próximo a migrar: `plano-entrega-v2`.

---

## 1. Estrutura de pastas

Todo módulo v2 mora em `front-end/src/app/modules/<area>/<modulo>-v2/` e segue:

```
<modulo>-v2/
├── domain/                    # Tipos e modelos do domínio (sem Angular)
│   └── types.ts
├── application/               # Orquestração e regras de negócio
│   ├── *.usecase.ts
│   ├── *.facade.ts
│   └── *.policy.ts
├── infra/                     # Adapters externos (HTTP, storage, etc.)
│   ├── *.client.ts
│   └── http/                  # Tokens e interceptors específicos, se houver
├── ui/                        # Pages e componentes Angular
│   ├── *.page.ts / .html
│   └── components/
├── routes.ts                  # Rotas + providers do módulo
└── public-api.ts              # O que outros módulos podem consumir
```

**Regra de ouro das dependências:** `ui` → `application` → `infra`. `ui` nunca importa de `infra` direto. `domain` não depende de ninguém.

---

## 2. Convenções de nomes

| Sufixo | Papel | Ex. |
|---|---|---|
| `.page.ts` | Componente raiz de uma rota | `list.page.ts`, `edit.page.ts` |
| `.component.ts` | Componente reutilizável dentro do módulo | `avaliacao-form.component.ts` |
| `.client.ts` | Adapter HTTP (infra) | `plano-api.client.ts` |
| `.usecase.ts` | Ação única do domínio | `listar-planos.usecase.ts` |
| `.facade.ts` | Orquestração + estado (signals) | `consolidacao.facade.ts` |
| `.policy.ts` | Regras puras de negócio/permissão | `plano-trabalho.policy.ts` |
| `.types.ts` | Tipos de domínio | `domain/types.ts` |

**Proibido** usar `*-api.service.ts` para adapters HTTP em módulos v2 — é `*.client.ts`.

---

## 3. Camadas: responsabilidades

### `domain/`
Tipos TypeScript puros. Pode re-exportar modelos v1 como aliases para isolar a semântica do módulo (ex.: `export type PlanoTrabalho = PlanoTrabalhoModel`). Não importa Angular, nem RxJS, nem `infra/`.

### `application/`

- **Use case** (`.usecase.ts`): representa uma ação única (listar, arquivar, clonar, etc.). **Mantém-se 1:1 com chamadas do client mesmo quando fino** — a uniformidade é o ganho. Quando a lógica cresce, cresce aqui, sem mudar o ponto de chamada.
- **Facade** (`.facade.ts`): orquestração com estado. Expõe signals para a UI, coordena múltiplos use cases, trata loading/erro. É o ponto de entrada preferencial para pages complexas.
- **Policy** (`.policy.ts`): funções puras de regra de negócio (podeArquivar? statusValido? quaisCamposEditaveis?). **Obrigatoriamente stateless**. Fácil de testar.

### `infra/`
Adapters para o mundo externo. Todo `.client.ts` herda de `V2ApiClient` (ver §6). Tokens HTTP customizados e interceptors específicos do módulo moram em `infra/http/`.

### `ui/`
Pages (rotas) e componentes visuais. Consome **somente** `application/*` e `domain/*`. Nunca importa de `infra/` nem de services legados v1 diretamente (use a facade v2 correspondente).

---

## 4. Public API por módulo

Todo módulo v2 expõe `public-api.ts` como único ponto de consumo externo:

```ts
// plano-entrega-v2/public-api.ts
export { PlanoEntregaFacade } from './application/plano-entrega.facade';
export type { PlanoEntrega, PlanoEntregaItem } from './domain/types';
```

**Regra:** imports cross-module **só** via `public-api.ts` do módulo-alvo. Nunca importar de `application/*`, `infra/*` ou `ui/*` de outro módulo.

Exemplo correto (PT consumindo PE):
```ts
import { PlanoEntregaFacade, PlanoEntregaItem } from 'src/app/modules/gestao/plano-entrega-v2/public-api';
```

---

## 5. Injeção de dependência (`providedIn`)

| Tipo de serviço | Escopo |
|---|---|
| Cross-cutting stateless (usado por múltiplos módulos) | `providedIn: 'root'` |
| Próprio do módulo (client, usecase, facade, policy) | Declarado em `routes.ts` do módulo |
| Próprio de uma única página ou feature interna | `providers: []` no componente |

Services de módulo **não** devem usar `providedIn: 'root'` — isso os transforma em globais implícitos e quebra o encapsulamento.

---

## 6. Base class `V2ApiClient`

Toda comunicação HTTP em módulos v2 herda de uma base compartilhada. Localização: `src/app/v2/infra/v2-api.client.ts`.

Responsabilidades da base:
- Injetar `HttpClient` e `GlobalsService` (para `servidorURL`).
- Expor `base: string` (URL base do recurso).
- Helper `unwrapData<T>(obs)` que normaliza respostas `{ success, data }` para `T`.
- Interceptação de erros padronizada (quando for consolidada).

Filhos concretos só declaram `base` e os métodos específicos:

```ts
@Injectable()
export class PlanoApiClient extends V2ApiClient {
  protected override readonly base = '/api/v2/plano-trabalho';
  query(params: QueryParams) { return this.unwrapData<Page<PlanoTrabalho>>(this.http.get(...)); }
}
```

---

## 7. Tipos compartilhados

Tipos usados por múltiplos módulos vivem em `src/app/v2/domain/`:

- `shared.types.ts`: `Page<T>`, `QueryParams`, e demais tipos de paginação/ordenação.
- Outros domínios transversais conforme surgirem.

Não deixar `Page`/`QueryParams` dentro do `domain/` de um módulo específico — o primeiro que precisou acaba forçando o segundo a importar cross-module só para obter o tipo.

---

## 8. Shell, Auth e integração com v1 (Opção 2 — isolacionista)

Módulos v2 **não** importam `AuthService`, `GlobalsService`, `NavigateService` ou `NotificacaoService` v1 diretamente.

Em vez disso, `src/app/v2/application/` expõe facades v2 que encapsulam o legado internamente:

- `auth.facade.ts` — dados do usuário logado, capacidades, unidade atual.
- `session.facade.ts` — contexto, tenant, configuração de sessão.
- `navigation.facade.ts` — navegação (substitui usos de `NavigateService`).
- `notification.facade.ts` — mensagens de sistema.

Consumo:
```ts
private readonly auth = inject(AuthFacadeV2);
this.auth.usuario();  // signal do usuário logado
```

**Por quê:** quando v1 for desativado, a troca acontece **dentro** das facades, sem tocar nos módulos v2. Isso isola a migração.

**Custo assumido:** um pouco mais de boilerplate agora. Compensa quando o segundo módulo precisar das mesmas abstrações.

---

## 9. Lazy-loading

Todo módulo v2 é carregado por `loadChildren` a partir do `routes.ts` global (ou de um array de rotas v2 dedicado):

```ts
{
  path: 'plano-entrega',
  loadChildren: () => import('./modules/gestao/plano-entrega-v2/routes')
                         .then(m => m.PLANO_ENTREGA_V2_ROUTES),
}
```

O `routes.ts` do módulo exporta as rotas e declara os providers locais (clients, use cases, facades, policies).

---

## 10. GovBR Design System — wrappers incrementais

Não criar wrappers para tudo de uma vez. Regra:

- Uso único em um módulo → consumir `<br-*>` direto via `WebcomponentsAngularModule`.
- Uso em **≥2 módulos** ou integração com Reactive Forms ficando ruim → extrair wrapper em `src/app/v2/components/form/`.

Exemplos já extraídos: `MessageService` (encapsula `<br-message>`).

Candidatos prováveis conforme PE for migrado: `<petrvs-select>`, `<petrvs-input>`, `<petrvs-datepicker>`.

---

## 11. Testes

Mínimos obrigatórios por módulo:

- **`.policy.ts`** → sempre tem `.policy.spec.ts`. Regras são puras, o custo é baixo e documenta o comportamento.
- **`.facade.ts`** com orquestração não-trivial → tem `.facade.spec.ts`.
- **`.usecase.ts`** puramente 1:1 → dispensável (o cliente HTTP cobre). Quando ganhar orquestração, ganha teste.
- **`.client.ts`** → testes de contrato HTTP quando houver lógica de mapeamento não-óbvia.

Pages/components: teste de integração quando o valor justificar; não é obrigatório por arquivo.

---

## 12. Ordem de migração

1. **`plano-trabalho-v2`** — piloto, em andamento (branch `feature/#1683-reestruturacao-modulo-pt`).
2. **`plano-entrega-v2`** — próximo. Vai validar o template com um segundo módulo real.
3. Demais módulos (ocorrência, afastamento, etc.) conforme prioridade de negócio.

Antes de iniciar PE, os itens de infraestrutura compartilhada (§6 base class, §7 tipos compartilhados, §8 facades v1→v2) precisam estar prontos — caso contrário, PE repete os atalhos do PT.

---

## 13. Checklist para criar um novo módulo

1. Criar pasta `modules/<area>/<modulo>-v2/` com subpastas `domain/`, `application/`, `infra/`, `ui/`.
2. `domain/types.ts` — modelar ou re-exportar do v1.
3. `infra/<nome>.client.ts` — herdar de `V2ApiClient`, definir `base`.
4. `application/` — criar use cases 1:1 com endpoints; facade se houver estado; policy se houver regras.
5. `ui/` — pages e componentes. Importar só `application/*` e `domain/*`.
6. `routes.ts` — rotas lazy + providers do módulo.
7. `public-api.ts` — expor facade e tipos consumíveis por outros módulos.
8. Registrar lazy route no `routes.ts` global.
9. Testes mínimos: todas as policies, facades não-triviais.
10. Se criar um componente reutilizável de UI, avaliar wrapper GovBR (§10).

---

## 14. Débito técnico consciente

Itens que este documento exige mas ainda não existem no repo. Precisam ser criados antes ou junto da próxima migração:

- `src/app/v2/infra/v2-api.client.ts` — base class.
- `src/app/v2/domain/shared.types.ts` — mover `Page`/`QueryParams` do PT para cá.
- `src/app/v2/application/auth.facade.ts`, `session.facade.ts`, `navigation.facade.ts`, `notification.facade.ts`.
- Lazy-loading do `plano-trabalho-v2` (hoje carrega eager).
- Testes das policies do PT (`plano-trabalho.policy.ts`, `consolidacao.policy.ts`).

Pontos aceitos como pragmatismo do piloto (não re-trabalhar no PT, mas não repetir nos novos módulos):

- `edit.page.ts` do PT com 672 linhas concentrando dois formulários.
- `PlanoEntregaApiService` em `v2/services/` em vez de módulo próprio — resolvido na migração do PE.
