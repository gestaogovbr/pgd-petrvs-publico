## 2.3.0 - 18/10/2024
### Modificado
 - modificação da busca dos dados do SIAPE, com tabelas auxiliares
 - alteração no processamento dos dados do SIAPE, alterando das requisições e passando para os dados da tabelas auxiliares
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
