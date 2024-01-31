# Integração do PETRVS com o SEI

## Instalação
O conteúdo do diretório "sei-module" (Disponibilizado no pacote do sistema) deverá ser colocado dentro do diretório:
´´´
[SEI_PATH]\src\sei\web\modulos\multiagencia\petrvs
´´´
Descomentar, ou adicionar caso não exista, a referencia ao módulo Petrvs na lista de módulo (ConfiguracaoSEI > getArrConfiguracoes > SEI > Modulos) a serem carregados no arquivo de configuração do Sei (SEI_PATH\src\sei\config\ConfiguracaoSEI.php):
´´´
'Modulos' => array(
    'MultiagenciaPetrvsIntegracao' => 'multiagencia/petrvs',
´´´

## Configuração
Toda configuração do módulo é feita em três partes: 

### Configuração no painel SaaS do Petrvs
Ao entrar no formulário de edição da entidade no painel SaaS, existe a aba "Módulo SEI". É necessário habilitar o módulo e gerar as chaves de comunicação.
A requisição de autenticação realizada no SEI irá enviar uma informação criptografada (utilizando a chave pública) para o endpoint do Petrvs (que irá descriptografas com a chave privada).
Deste modo o sigilo dessas chaves são fundamentais. Ao clicar no botão "Gerar", o Petrvs automaticamente gera um par dessas chaves, mas o usuário tem a opção de gerar um par manualmente utilizando
outro programa, como o OpenSSL por exemplo. Será necessário ainda copiar a chave pública para configurar no SEI (utilize o botão "Copiar").

### Configuração no SIP

Inicialmente é necessário acessar o sistema SIP (com usuário que tenha privilégios) e incluir um novo recurso. Para isso acesse (Recursos > Novo Recurso), então preencha com os dados abaixo:
´´´
Sistema: SEI
Nome: md_multiagencia_petrvs
Descrição: PETRVS - Plataforma Eletrônica de Trabalho e Visão Sistêmica
Caminho: controlador.php?acao=md_multiagencia_petrvs
´´´
Ainda no SIP, será necessário adicionar um perfil (Perfis > Novo) com os seguintes dados:
´´´
Sistema: SEI
Nome: MD_MULTIAGENCIA_PETRVS
Descrição: Perfil responsável por permitir o carregamento do módulo PETRVS
´´´
Após a inclusão do perfil será necessário incluir o recurso no perfil, para isso clique em "Montar Perfil" (ícone "M" no grid dos perfis). Digite "md_multiagencia_petrvs" em Recurso e mande pesquisar, ao aparecer o recurso (que haviamos cadastrado a pouco), marque o checkbox e clique em Salvar.
Após isso deverá ser adicionado o perfil MD_MULTIAGENCIA_PETRVS aos usuários que deverão fazer uso do sistema.

### Configuração no SEI

Ao acessar o SEI (com usuário que tenha privilégios), será necessário cadastrar os parametros para o funcionamento do módulo (Infra > Parametros). Inclua os seguntes parametros:
´´´
Nome: MD_MULTIAGENCIA_PETRVS_API_PUBLIC_KEY
Valor: {Colocar aqui o copiado do painel SaaS do Petrvs (chave pública)}

Nome: MD_MULTIAGENCIA_PETRVS_ENTIDADE
Valor: {Por aqui a SIGLA do orgão cadastrada no painel SaaS}

Nome: MD_MULTIAGENCIA_PETRVS_URL
Valor: {Por aqui o DOMÍNIO do orgão cadastrada no painel SaaS, incluindo o "https://", a porta apenas caso diferente de 80 ou 443, e sem a barra "/" no final. Representa o acesso ao front-end do Petrvs}

Nome: MD_MULTIAGENCIA_PETRVS_URL_B2B_API
Valor: {Por aqui o endereço do endpoint (API) do Petrvs para o orgão cadastrada no painel SaaS, incluindo o "https://", a porta apenas caso diferente de 80 ou 443, e sem a barra "/" no final. Representa o back-end do Petrvs. Na ausência desse parâmetro o MD_MULTIAGENCIA_PETRVS_URL será utilizado em seu lugar. Esse parâmetro é útil quando a comunicação B2B SERVIDOR-SEI <-> SERVIDOR-PETRVS utilizar uma rota diferente (Ex.: http://localhost)}

Nome: MD_MULTIAGENCIA_PETRVS_BACKEND
Valor: {Por aqui o endereço do endpoint (API) do Petrvs. Parâmetro opicional, utilizado somente se o back-end for servido por endereço diferente do front-end. Difere do MD_MULTIAGENCIA_PETRVS_URL_B2B_API pois nesse caso a requisição será feita pelo borwser através do front-end ao invés de ser uma comunicação B2B}

´´´
Um Exemplo dessa configuração é visto abaixo para o ambiente local (onde está sendo executado uma instância docker do Sei e outra instância docker como Petrvs em modo desenvolvimento):
´´´
MD_MULTIAGENCIA_PETRVS_API_PUBLIC_KEY: MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApTdtPJYz7Do...

MD_MULTIAGENCIA_PETRVS_ENTIDADE: PRF

MD_MULTIAGENCIA_PETRVS_URL: http://localhost

MD_MULTIAGENCIA_PETRVS_URL_B2B_API: http://host.docker.internal
´´´