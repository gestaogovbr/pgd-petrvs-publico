## 2.3.3 18/12/2024
### Adicionado
 - Adição da Unidade Autorizadora no Painel
 - Adição de Job para envio individual de Tenant
 - Consulta Audit no Painel
### Corrigido
- Envio da Matrícula SIAPE para a API PGD
- Comando para enviar manualmente para API PGD
### Modificado
 - Remoção da Unidade Autorizadora dos Regimentos
 - Modificada Unidade Autorizadora no Envio para API PGD
 - Melhorias de uso de memória no Envio para a API PGD
 - Busca do codigo UORG feito a partir da requisição do SIAPE
### Removido
 - Remoção das configurações do painel de integração:
    Auto-incluir
    Codigo unidade raiz
    Upag
    Codigo UORG
## 2.3.2 03/12/2024
### Adicionado
 - Fragmentado dados inseridos no banco pelo SIAPE
 - Adição de Logs de processamento da API PGD
 - URL da API PGD nos Tenants
 - Consulta aos logs do Envio da API PGD
 - Envio para a API PGD dividido em jobs menores
### Corrigido
 - Texto do participante no TCR
 - Servidores temporários não conseguiam assinar planos de trabalho
 - Alteração na busca da lotação de servidores temporários
 - Removido duplicação de jobs ao editar o tenant
 - Carga de Tipos de Motivo de Afastamento não carregavam corretamente no Seeder
 - Regramento padrão nos planos de trabalho, entrega e seleção de participantes carregava unidade errada
### Modificado
 - Desabilitado edição do TCR compilado em plano de trabalho
 - Retirado opção do texto complementar da unidade executora no formulário do plano de trabalho
 - Configurações do supervisor para envio da API PGD
 - Removidos menus de Tipos de Meta, Tipos de Avaliação, Tipos de Modalidade, Tipos de Motivos de Afastamento
## 2.3.1 23/10/2024 (Hotfixes)
### Adicionado
 - Migrate para agendar os JOBS do SIAPE automaticamente
### Corrigido
 - Ajuste da fila de JOBS
### Modificado
 - Adicionado validação na tela de execução do SIAPE
### Removido
 - Módulo dump do tenant no painel
 - Retirado código de integração da chefia substituta
 - Arquivos obsoletos
### Obsoleto
 - LogChanges 
## 2.3.0 - 18/10/2024
### Modificado
 - Modificação da busca dos dados do SIAPE, com tabelas auxiliares
 - Alteração no processamento dos dados do SIAPE, alterando das requisições e passando para os dados da tabelas auxiliares
 - Aumento no timeout do processamento SIAPE e processamento em fila diferente
 - Envio para a API PGD em conformidade com a versão 3.2.1
### Adicionado
 - Adicionado botão no painel dos tenantes para forçar uma atualização completa de dados do SIAPE
 - Adição do Telescope para monitoramento das consultas e logs
 - Adição do Horizon para monitoramento dos Jobs
 - Adicionado módulo dump do tenant no painel
 - Adicionado módulo central_domains no painel
### Corrigido
 - Consulta na busca das cidades no SIAPE 
 - Correção do tamanho do campo fundamentos/objetivo.
 - Correção ao editar um tenant.
 - Correção ao editar unidade.
## 2.2.0 - 04/10/2024 (Hotfixes)
### Segurança 
- Adicionado validações para usuários do painel.
- Adicionado validações para manipulação dos dados do tenant.
### Corrigido
- Correção para associar o perfil do usuário baseado na informação de chefia.
### Removido
- Remoção de arquivos não usados.
## 2.1.3 - 03/10/2024
### Corrigido
- Correção no SIAPE falha de processamento servidores dos dados para banco de dados

## 2.1.2 - 30/09/2024
### Corrigido
- URL de redirecionamento do login único (GovBR).
- CPF do Desenvolvedor, aceitar somente números (Tenant).
- Atualizar usuário ao atualizar dados do tenant.
### Adicionado
- Opção para o usuário do painel alterar a senha.
## 2.1.1 - 18/09/2024 (Hotfixes)
### Corrigido
- Validação de Planos de Entrega.
- Seleção automática do regramento.
- Não permitir o uso da atribuição "Lotado" (somente SIAPE).
- Permissão para Administrador negocial editar o template do TCR.
- Permissão para Administrador negocial não visualizar o menu cadastros.
## 2.1.0 - 06/09/2024
### Adicionado
- Campo para informar a unidade autorizadora no regramento.
- Opção para clonar Planos de Trabalho e Planos de Entrega.
- Adicionado nível de "Configurador" do tenant
- Adiciona Auditoria do Sistema
- Adição de campos para informar usuário e senha da API PGD nos Tenants
### Corrigido
- Correção para refletir afastamentos nos registros de execução.
- Correção para incluir Planos de Trabalho no mesmo dia de início do regramento.
- Correção na regra para bloquear Planos de Trabalho com datas sobrepostas
- Correção do cadastro do tenant
- Correção no login da Azure(Microsoft)
### Removido
- Arquivos de documentação. Documentação oficial será no site do PGD
- Acesso direto ao SIAPE
### Modificado
- Remoção do caracter '#' dos endereços (URL) do sistema
- Modificação no acesso aos dados do SIAPE, alterando de conexão direta ao SIAPE para o conectaGov, no painel do administrador deverá ser alterado a rota e inserido a chave e senha.
- Alterado a forma que é definição de chefia e chefia substituta no sistema, se baseando nos campos advindos do SIAPE
### Segurança 
### Obsoleto 
### Não Publicado
- Exportação de dados para o Programa de Gestão - PGD
