/* procedimento_trabalhar */
$(function () {
    var methods = {};
    const proxy = new AppProxy(methods, "procedimento_trabalhar");

    //console.log("Register onInit CallBack");
    proxy.onInit(async () => {
        const $iframe = $("#ifrVisualizacao");
        //console.log("Register load", $iframe, $iframe[0].readyState);
        if($iframe.length) {
            const iframeDocument = $iframe[0].contentDocument || $iframe[0].contentWindow.documen;
            const iframeVisualizacaoInit = async () => {
                //console.log("EVENT: LOAD iframe");
                var buttons = [];
                const baseUrl = typeof EXTENSION_BASE_URL !== "undefined" ? EXTENSION_BASE_URL : typeof PETRVS_BASE_URL != "undefined" ? PETRVS_BASE_URL : "";
                loadFontLibraries(baseUrl, true, $iframe.contents().find("head"));
                /* Se for um documento */
                if(isDocumento()) buttons.push("demandas", "incluir", "concluir", "entrega", "concluir_entrega");
                /* Se for processo */
                if(isProcesso()) buttons.push("plano", "demandas", "incluir", "entrega", "concluir_entrega");
                /* Se for a inclusão de um documento adiciona o botão de atualiza os tipos de documento na toolbar */
                if(isGerarDocumento()) buttons.push("atualizar");
                //console.log("executeAfterInit");
                proxy.executeAfterInit("loadToolbarButtons", [buttons]);
            }            
            $iframe.on('load', iframeVisualizacaoInit);
            /* Força execução casa o iFrame já esteja carregado */
            if(iframeDocument.readyState  == 'complete') { 
                iframeVisualizacaoInit();
            }            
        }
    });

    methods.getProcessoKeys = () => {
        try {
            const aDocumment = $("#ifrArvore").contents()[0];
            const processo = $("#topmenu", aDocumment).find("span")[0];
            const processoId = parseInt(processo.id.replace("span", ""));
            const processoNumero = processo.innerHTML.trim();
            if(!processoNumero.length) throw new Error("Impossível capturar os dados do processo!");
            return {
                id_processo: processoId,
                numero_processo: processoNumero
            }
        } catch (e) {
            alert(e.message);
            return null;
        }
    }

    methods.getSeiKeys = () => {
        return isDocumento() ? methods.getDocumentKeys() : methods.getProcessoKeys();
    }
    
    methods.getDocumentKeys = () => {
        try {
            if(isDocumento()) {
                const aDocumment = $("#ifrArvore").contents()[0];
                const $selecionado = $(".infraArvoreNoSelecionado", aDocumment);
                const documentoId = parseInt($selecionado[0].id.replace("span", ""));
                const documentoNumero = /\d+\)?\s*$/g.exec($selecionado[0].title)[0].replace(")", "").trim();
                const processo = $("#topmenu", aDocumment).find("span")[0];
                const processoId = parseInt(processo.id.replace("span", ""));
                const processoNumero = processo.innerHTML.trim();
                if(!documentoNumero.length || !processoNumero.length) throw new Error("Impossível capturar os dados do documento!");
                return {
                    id_processo: processoId,
                    numero_processo: processoNumero,
                    id_documento: documentoId,
                    numero_documento: documentoNumero
                }
            } else {
                throw new Error("Obrigatório usar essa opção somente dentro de um Documento no Sei");
            }
        } catch (e) {
            alert(e.message);
            return null;
        }
    }

    /* chama a tela de inclusão de demanda passando os dados do documento e do processo */
    methods.incluirDemandaProcessual = async (idProcesso, numeroProcesso, idDocumento, numeroDocumento) => {
        return proxy.execute("incluirDemandaProcessual", [idProcesso, numeroProcesso, idDocumento, numeroDocumento]);
    }

    methods.getTiposDocumentos = () => {
        try {
            var tipos = [];
            const aDocumment = $("#ifrVisualizacao").contents()[0];
            for(var input of $('input[type=checkbox]', aDocumment)) {
                if(input.name.startsWith("chkInfraItem")) tipos.push({codigo: input.value, nome: input.title});
            }
            return tipos;
        } catch (e) {
            alert(e.message);
            return null;
        }
    }

    /* Insere um novo documento dentro de um processo no Sei
    @param number is_procedimento  ID do processo Sei
    @param number is_tipo_documento  ID do tipo de documento desejado para o novo documento
    @return {
        id_processo: number,
        id_documento: number,
        urlEditor: string,
        idUser: string,
        urlReload: string
    }
    */
    methods.incluirDocumento = (id_procedimento, id_tipo_documento) => {
        return addDocumento(id_procedimento, id_tipo_documento); 
    }

    methods.recarregarArvore = (urlReload) => {
        return new Promise((resolve, reject) => {
            ifrArvoreReload(urlReload);
            resolve();
        });
    }

    /* Abre o editor de documento do Sei
    @param string urlEditor  Url contendo o numero do documento para editar
    @param string idUser  ID para utlizar no editor
    @return void
    */
    methods.abrirEditor = (urlEditor, idUser) => {
        return new Promise((resolve, reject) => {
            openWindowEditor(urlEditor, idUser);
            resolve();
        });
    }
});

function isDocumento() {
    try {
        const aDocumment = $("#ifrArvore").contents()[0];
        return $(".infraArvoreNoSelecionado", aDocumment).parent()[0].href.includes("id_documento");
    } catch (error) {
        return false;
    }
}

function isProcesso() {
    try {
        const aDocumment = $("#ifrArvore").contents()[0];
        const href = $(".infraArvoreNoSelecionado", aDocumment).parent()[0].href;
        return href.includes("id_procedimento") && !href.includes("id_documento");
    } catch (error) {
        return false;
    }
}

function isGerarDocumento() {
    try {
        const aDocumment = $("#ifrVisualizacao").contents()[0];
        return $("#frmDocumentoEscolherTipo", aDocumment).length && $("#imgExibirSeries", aDocumment)[0].src.includes("menos.");
    } catch (error) {
        return false;        
    }
}