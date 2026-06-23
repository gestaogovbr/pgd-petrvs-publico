# Fluxo de Assinatura do TCR

## O que é o TCR

O **Termo de Ciência e Responsabilidade (TCR)** é o documento que oficializa o Plano de Trabalho entre o participante e a organização. Ele é gerado automaticamente pelo sistema a partir das informações do plano — como participante, unidade, modalidade e entregas pactuadas — e segue o modelo definido no regramento da instituição.

## Pré-condições

Para que o TCR possa ser gerado e assinado, o Plano de Trabalho deve:

1. Possuir ao menos uma **entrega cadastrada**
2. Estar na fase de **rascunho** ou **aguardando assinatura**

## Quem participa

O acesso ao TCR é restrito a duas figuras:

- O **participante** — servidor que é dono do Plano de Trabalho
- A **chefia** — gestor (titular, substituto ou delegado) da unidade onde o plano foi pactuado

Qualquer outro usuário não consegue gerar, visualizar ou assinar o TCR.

## Como funciona a assinatura

O TCR segue um modelo de **dupla assinatura**, configurável pelo regramento da instituição. O regramento define quais assinaturas são necessárias — por exemplo, apenas a do participante, ou a do participante e a da chefia.

### Passo a passo

#### 1. Gerar o TCR

O participante ou a chefia solicita a geração do documento. O sistema monta o TCR com os dados atuais do plano e o disponibiliza para assinatura. Se o documento já foi gerado anteriormente, o sistema retorna o existente.

#### 2. Assinar

Cada signatário assina individualmente. **Não há ordem obrigatória** — tanto o participante quanto a chefia podem ser o primeiro a assinar. O sistema verifica, a cada assinatura, se todas as assinaturas exigidas pelo regramento já foram coletadas.

Exemplos:

- O participante assina primeiro, depois a chefia completa → plano **ativado**
- A chefia assina primeiro, depois o participante completa → plano **ativado**
- Apenas um dos dois assina quando ambos são exigidos → plano permanece **aguardando assinatura**

Ao assinar:

- Se ainda faltam assinaturas de outros signatários, o plano passa para o status **Aguardando Assinatura**
- Se todas as assinaturas exigidas foram coletadas, o plano é **ativado**

#### 3. Cancelar a assinatura

Apenas o **participante** pode cancelar sua própria assinatura, e somente enquanto o plano estiver aguardando assinatura.

Ao cancelar:

- Se ainda restam assinaturas de outros signatários, o plano permanece **aguardando assinatura**
- Se não resta nenhuma assinatura, o plano volta ao status de **rascunho**

#### 4. Consultar o TCR

A qualquer momento, o participante ou a chefia podem consultar o TCR vigente do plano, visualizando o número do documento, o título e o conteúdo completo.

## Ciclo de reassinatura

O sistema permite que o participante assine, cancele e assine novamente quantas vezes forem necessárias. O histórico de todas as assinaturas e cancelamentos é mantido.

## Resumo do fluxo

```
Rascunho ──[assinar]──► Aguardando Assinatura ──[assinar]──► Ativo
                              │
                              ◄──────[cancelar assinatura]
                              │
                              ▼
                           Rascunho (quando nenhuma assinatura restar)
```
