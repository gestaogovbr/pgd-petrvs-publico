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