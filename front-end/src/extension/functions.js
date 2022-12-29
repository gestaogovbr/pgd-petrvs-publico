/* Funções gerais que podem ser acessadas pela extenção */

/* 
Adiciona botão a barra do sei 
@param Button button  Configuração do botão
@type Button {
    id: string,
    dataUrl: string | undefined,
    img: string | undefined,
    label: string,
    prepend: string | jQuery | HTMLElement | undefined,
    append: string | jQuery | HTMLElement | undefined,
    before: string | jQuery | HTMLElement | undefined,
    click: () => void
}  
*/
function addSeiToolbarButton(button) {
    var $container = $(button.prepend || button.append || button.before);
    var $aContainer = $("<a href='#' " + ((button.id || "").length ? "id='" + button.id + "'" : "") + " tabindex='452' class='botaoSEI' style='position:relative;display:inline-block;'></a>");
    if(button.img || button.dataUrl) {
        const $image = $("<img class='infraCorBarraSistema' tabindex='452' src='" + (button.img ? absoluteUrl(button.img) : button.dataUrl) + "' alt='" + escapeQuoted(button.label) + "' title='" + escapeQuoted(button.label) + "'>")
        $aContainer.append($image);
    }
    if(button.icon) {
        const $image = $("<img class='infraCorBarraSistema' src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='>");
        const $iconContainer = $("<span class='newIconPro' style='position:absolute;width:40px;margin:1px 2px;text-align:center;height:32px;padding-top:8px;background:transparent;left:0;user-select:none;pointer-events:none;'></span>");
        const $icon = $("<i class='" + button.icon + "' style='font-size:17pt;color:#fff;'></i>");
        $aContainer.append($image);
        $iconContainer.append($icon);
        $aContainer.append($iconContainer);
    }
    $aContainer.on("click", button.click);
    if(button.prepend) $container.prepend($aContainer);
    if(button.append) $container.append($aContainer);
    if(button.before) $container.before($aContainer);
}

/*
Converte path relativo em absoluto considerando o PETRVS_BASE_URL 
@param string url  Path relativo
@return string
*/
function absoluteUrl(url) {
    const baseUrl = typeof EXTENSION_BASE_URL !== "undefined" ? EXTENSION_BASE_URL : typeof PETRVS_BASE_URL != "undefined" ? PETRVS_BASE_URL : "";
    return baseUrl + url.substring(url.startsWith("/") ? 1 : 0);
}

/*
Escapa aspas simples 
@param string simpleQuoted
@return string
*/
function escapeQuoted(simpleQuoted) {
    return simpleQuoted.replace("'", "\\'"); 
}

/*
Carrega as bibliotecas de icones em um iframe 
@param string baseUrl  Dominio para compor o path absoluto
@param boolean loadCss  Se carrega tambem o arquivo CSS vinculado a biblioteca
@param jQuery $head  Referencia ao head que se deseja carregar a biblioteca
*/
function loadFontLibraries(baseUrl, loadCss = false, $head = null) {
    const extraStyle = 
        "<style type='text/css'>\n" +
            "@font-face {\n" +
                "font-family: 'bootstrap-icons';\n" +
                "src: url('" + baseUrl + "bootstrap-icons.woff2') format('woff2'),\n" +
                "url('" + baseUrl + "bootstrap-icons.woff') format('woff');\n" +
            "}\n" +
            "@font-face {\n" +
                "font-family: 'Font Awesome 5 Brands';\n" +
                "font-style: normal;\n" +
                "font-weight: 400;\n" +
                "font-display: block;\n" +
                "src: url(" + baseUrl + "/webfonts/fa-brands-400.eot);\n" +
                "src: url(" + baseUrl + "/webfonts/fa-brands-400.eot?#iefix) format('embedded-opentype'),\n" +
                "url(" + baseUrl + "/webfonts/fa-brands-400.woff2) format('woff2'),\n" +
                "url(" + baseUrl + "/webfonts/fa-brands-400.woff) format('woff'),\n" +
                "url(" + baseUrl + "/webfonts/fa-brands-400.ttf) format('truetype'),\n" +
                "url(" + baseUrl + "/webfonts/fa-brands-400.svg#fontawesome) format('svg');\n" +
            "}\n" +
            "@font-face {\n" +
                "font-family: 'Font Awesome 5 Free';\n" +
                "font-style: normal;\n" +
                "font-weight: 900;\n" +
                "font-display: block;\n" +
                "src: url(" + baseUrl + "webfonts/fa-solid-900.eot);\n" +
                "src: url(" + baseUrl + "webfonts/fa-solid-900.eot?#iefix) format('embedded-opentype'),\n" +
                "url(" + baseUrl + "webfonts/fa-solid-900.woff2) format('woff2'),\n" +
                "url(" + baseUrl + "webfonts/fa-solid-900.woff) format('woff'),\n" +
                "url(" + baseUrl + "webfonts/fa-solid-900.ttf) format('truetype'),\n" +
                "url(" + baseUrl + "webfonts/fa-solid-900.svg#fontawesome) format('svg')\n" +
            "}\n" +
            "@font-face {\n" +
                "font-family: 'Font Awesome 5 Free';\n" +
                "font-style: normal;\n" +
                "font-weight: 400;\n" +
                "font-display: block;\n" +
                "src: url(" + baseUrl + "webfonts/fa-regular-400.eot);\n" +
                "src: url(" + baseUrl + "webfonts/fa-regular-400.eot?#iefix) format('embedded-opentype'),\n" +
                "url(" + baseUrl + "webfonts/fa-regular-400.woff2) format('woff2'),\n" +
                "url(" + baseUrl + "webfonts/fa-regular-400.woff) format('woff'),\n" +
                "url(" + baseUrl + "webfonts/fa-regular-400.ttf) format('truetype'),\n" +
                "url(" + baseUrl + "webfonts/fa-regular-400.svg#fontawesome) format('svg')\n" +
            "}\n" +
        "</style>";
    if(loadCss) {
        bootstrapLink = "<link rel='stylesheet' href='" + baseUrl + "assets/css/all.min.css'></link>";
        fontawesomeLink = "<link rel='stylesheet' href='" + baseUrl + "assets/css/bootstrap-icons.css'></link>";
        $(bootstrapLink).appendTo($head || 'head');
        $(fontawesomeLink).appendTo($head || 'head');
    }
    $(extraStyle).appendTo($head || 'head');
}

/*
Obetem os parâmetros de uma Url
@param string url  Url contendo os parametros codificados (query string)
@return Object | undefined
*/
function getParamsUrl(url) {
    var params = undefined;
    if (typeof url !== 'undefined' && url.includes('?') && url.includes('&')) {
        var vars = url.split('?')[1].split('&');
        params = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    }
    return params;
}

/*
Remove caracteres acentuados
@param string str  String de entrada
@return string
*/
function removeAcentos(str) {
    return (typeof str !== 'undefined' && str !== null) ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';
}

/*
Carregar link em nova janela
@param string url  Endereço da janela
@return void
*/
function openLinkNewTab(url) {
    var win = window.open(url, '_blank');
    if (win) {
        win.focus();
    } else {
        alert('Por favor, permita popups para essa p\u00E1gina');
    }
}

/*
Escape da RegExp 
@param string text  String para escape
@return string
*/
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/*
Escape de Component  
@param string str  String do componente
@return string
*/
function escapeComponent(str) {  
    return escape(str).replace(/\+/g, '%2B');
}

/*
Encode URI para Hex
@param string str  URI
@return string
*/
function encodeURI_toHex(str){
    var hex, i;
    var result = "";
    for (i=0; i<str.length; i++) {
        var test = removeAcentos(str.charAt(i));
        if (str.charAt(i) == ' ') {
            result += '+';
        } else if (str.charAt(i) != test && str.charAt(i) != '') {
            hex = str.charCodeAt(i).toString(16);
            result += ("%"+hex).slice(-4).toUpperCase();
        } else {
            result += str.charAt(i);
        }
    }
    return result;
}

/*
Obter lista de links
@param string text  Texto com os links
@return string
*/
function getLinksInText(text) {
    var array = [];
    text.split("'").filter(function(el) { return el.indexOf('controlador.php') !== -1 }).map(function(v){
        if (v.indexOf('\"') !== -1) {
            v.split('"').filter(function(i){ return i.indexOf('controlador.php') !== -1}).map(function(j){
                var link = j.replace(/[\\"]/g, '');
                array.push(link);
            });
            return false;
        } else {
            var link = v.replace(/[\\"]/g, '');
            array.push(link);
            return false;
        }
    });
    array = (array.length > 0) 
        ?   array.sort().filter(function(item, pos, ary) {
                return !pos || item != ary[pos - 1];
            }) 
        : [];
    return array;
}
