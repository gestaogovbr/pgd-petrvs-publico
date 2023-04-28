/* Constantes globais */
var PETRVS_IS_SUPER_MODULE = true;
/* 
Variável config será carregada utilizando variáveis globais definidas no módulo MultiagenciaPetrvsIntegracao e 
pelo arquivo app.json do endereço configurado no parâmetro MD_MULTIAGENCIA_PETRVS_URL do SUPER.
Descrição dos Arquivos: 
    "https://apis.google.com/js/platform.js" - Biblioteca gpai
    "functions.js" -  Arquivo de funções gerais que podem ser utilizadas pela extensão
    "app-proxy.js" -  Arquivo que cria o proxy entre a aplicação e o Sei
    "all-pages.js" -  Arquivo carregado para todas as páginas do Sei (global)
    "scripts.js" -  Scrips listados em angular.json > projects/petrvs/architect/build/options/scripts
    "runtime.js" -  runtime do Angular (inicializa o Angular)
    "polyfills.js" -  polyfill (fornece compatibilidade com versões antigas)
    "vendor.js" -  Bibliotecas da aplicação (node_module)
    "main.js" -  Arquivo main da aplicação (Agnular bootstrap)
Formato da propriedade match:
    [{
        "regex": string de RegExp para match da url atual (atenção aos escapes),
        "load": se carrega a aplicação (opcional, desfault=true)
        "route": rota inicial para carregar a aplicação angular Petrvs, deixar em branco caso queira ir para o home ou usar histórico
        "toolbar": se é apenas toolbar ou se carrega a app inteira (opcional, default=true)
        "logged": se quequer que o usuário esteja logado para carregar o "route" (opcional, default=false),
        "before": elemento onde a app deve ser renderizada antes dela (usar # para ids, ex.: #divInfraAreaTelaD),
        "prepend": elemento onde a app deve ser renderizada (usar # para ids, ex.: #divInfraAreaTelaD),
        "append": elemento onde a app deve ser renderizada depois dela (usar # para ids, ex.: #divInfraAreaTelaD),
        "files": vetor de string dos arquivos que devem ser carregados    
    }, ...]
*/
let config = {
    baseUrl: MD_MULTIAGENCIA_PETRVS_URL.replace(/\/$/, "") + "/", // Url base que será utilizado para carregar todos os arquivos
    servidorUrl: MD_MULTIAGENCIA_PETRVS_URL.replace(/\/$/, ""), // Url do servidor que irá responder as requisições de API
    versao: "", // Versão da aplicação que está sendo usada (versão do servidor)
    externalLibs: [], // Arquivos a JavaScript externos a aplicação a serem carregados
    preloadFiles: [], // Arquivos que será carregados inicialmente
    extraFiles: [], // Arquivos extra (complementam os arquivos carregados pelo match)
    angularFiles: [], // Arquivos da aplicação Angular
    cssFiles: [], // Arquivos CSS a serem carregados
    match: [] // Arquivo usado para carregar arquivos baseado na Url (expressão regular)
};

/* Após a página estar pronta, inicia o bootstrap dos arquivos */
$(function () {
    /* Carrega arquivo app.json e executa o bootstrap */
    $.getJSON(config.baseUrl + "app.json").done(values => {
        /* Alimenta variável global com o arquivo de app.json */
        config = Object.assign(config, values);
        /* Bootstrap da aplicação e arquivos */
        bootstrap();
    });
});

/* Retorna o valor em formato string */
function stringify(value) {
    return typeof value == "undefined" ? "undefined" : JSON.stringify(value); 
} 

/* Faz o bootstrap da aplicação */
function bootstrap() {
    /* Configurações para a URL atual (baseado no app.json) */
    const matched = config.match.find(x => (new RegExp(x.regex)).test(document.location.href));
    if(matched && matched.load !== false) {
        /* Configura variáveis de ambiente */
        const environment = 
            "<script type='text/javascript'>\n" +
                "var PETRVS_IS_SUPER_MODULE = true;\n" +
                "var PETRVS_TOOLBAR = " + stringify(!!matched.toolbar) + ";\n" +
                "var PETRVS_ROUTE = " + stringify(matched.route) + ";\n" +
                "var PETRVS_VERSION = " + stringify(config.versao) + ";\n" +
                "var PETRVS_LOGGED = " + stringify(!!matched.logged) + ";\n" +
                "var PETRVS_BASE_URL = " + stringify(config.baseUrl) + ";\n" +
                "var PETRVS_SERVIDOR_URL = " + stringify(config.servidorUrl) + ";\n" +
                "__webpack_public_path__ = PETRVS_BASE_URL;\n" +
            "</script>";
        $(environment).appendTo('head');
        /* Carrega arquivos de fontes do bootstrap e font-awesome */
        loadFontLibraries(config.baseUrl);
        /* Adiciona tag <app-root> a página baseado no elemento prepend, append ou before do matched */
        let appRoot = document.createElement("app-root");
        let container = document.createElement("div");
        container.style.width = "100%";
        container.appendChild(appRoot);
        if(matched.prepend) $(matched.prepend).prepend(container);
        if(matched.append) $(matched.append).append(container);
        if(matched.before) $(matched.before).before(container);
        //console.log("Files to load", matched.files);
        /* Bootstrap dos arquivos e bibliotecas */
        bootstrapJsFiles(config.preloadFiles.map(x => config.baseUrl + x)).then(() => {
            bootstrapJsFiles([
                ...config.externalLibs,
                ...config.extraFiles.map(x => config.baseUrl + x),
                ...matched.files.map(x => config.baseUrl + x),
                ...config.angularFiles.map(x => config.baseUrl + x)
            ]).then(() => {
                bootstrapCssFiles(config.cssFiles.map(x => config.baseUrl + x));
                document.dispatchEvent(new Event('bootstrapAppModule'));
            });
        });
    }
}

/* Carrega arquivos CSS na página */
function bootstrapCssFiles(files) {
    for(css of files) {
        cssLink = "<link rel='stylesheet' href='" + css + "'></link>";
        $(cssLink).appendTo('head');
    }
} 

/* Carrega arquivos JS na página */
async function bootstrapJsFiles(files) {
    const load = (file) => {
        return new Promise((resolve, reject) => {
            var script = document.createElement('script'); 
            script.src = file;
            script.charset = "utf-8";
            script.onload = function (event) {
                resolve();
            };
            script.onerror = function (event) {
                reject("Erro ao carregar o arquivo " + file);
            };
            document.head.appendChild(script);
        });
    };
    await Promise.all(files.map(file => load(file)));
}