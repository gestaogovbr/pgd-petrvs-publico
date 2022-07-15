/* desabilita o patch do XMLHTTPrequest pelo Zone.js */
var __Zone_disable_XHR = true;
/* editor_montar */
$(function () {
    var methods = {};
    const proxy = new AppProxy(methods, "editor-montar");

    proxy.onInit(async () => {
        var params = getParamsUrl(window.location.href);
        proxy.executeAfterInit("documentoPendenteSei", [parseInt(params.id_documento)]);
        /*var contents = await proxy.execute("getDocumentoContent", [params.id_documento], "extension");
        for(var content of (contents || [])) {
            console.log(content.html);
        }*/
    });

    /* Insere conteúdo em um documento Sei em um segmento específico
    @param number segmento  Segmento que se deseja adicionar o conteúdo (inicia em 0)
    @param string conteudo  Conteúdo em formato HTML para inserir dentro do documento
    @return boolean
    */
    methods.setConteudoDocumento = (segmento, conteudo) => {
        return setDocumento(segmento, conteudo);
    }
});
