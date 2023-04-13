// all_pages
$(function () {
    //console.log("Carregado ALL-PAGES");
    const webBrowser = (chrome || browser);
    var methods = {};
    const proxy = new AppProxy(methods, "all_pages");
    
    /* Devolve os dados do documento obtidos atraves da consulta pelo número Sei do documento
    @param string numeroDocumento  Número do documento
    @return undefined | {
        processo: {
            id_processo: number,
            tipo_processo: string,
            numero_processo: string,
            assuntos: {[key: string]: string},
            interessados: {[key: string]: string},
            numero: string,
            descricao: string,
            observacoes: string,
            nivel_acesso: string,
            hipotese_legal: string
        },
        documento: {
            id_documento: number,
            numero_documento: number,
            titulo_documento: string,
            tipo_documento: string
            assunto_documento: string,
            prazo_documento: string,
            assinatura_documento: string,
            versao_documento: string,
            data_documento: string
        }
    }*/
    methods.getDadosDocumento = (numeroDocumento) => {
        //console.log("Executando getDadosDocumento");    
        return new Promise((resolve, reject) => {
            ajaxPesquisaNumero(numeroDocumento).then(data => {
                if(data) {
                    var $html = $(data);
                    var urlArvore = $html.find('#ifrArvore').attr('src');
                    ajaxArvoreProcesso(urlArvore).then(tree => {
                        const consultaProcesso = tree.hrefConsultaProcesso ? ajaxConsultaProcesso(tree.hrefConsultaProcesso) : Promise.resolve(undefined);
                        //const consultaDocumento = tree.hrefConsultarDocumento ? ajaxConsultarDocumento(tree.hrefConsultarDocumento) : Promise.resolve(undefined);
                        const visualizarDocumento = tree.hrefVisualizarDocumento ? ajaxVisualizarDocumento(tree.hrefVisualizarDocumento) : Promise.resolve(undefined);
                        Promise.all([consultaProcesso, visualizarDocumento]).then(dados => {
                            if(dados[1]) dados[1].numero_documento = dados[1].numero_documento || numeroDocumento; 
                            const processo = dados[0] ? {
                                id_processo: tree.id_processo,
                                numero_processo: tree.numero_processo,
                                ...dados[0]
                            } : undefined;
                            const documento = dados[1] ? {
                                id_documento: tree.id_documento,
                                ...dados[1]
                            } : undefined; 
                            resolve(processo && documento ? {processo, documento} : undefined);
                        }).catch(reject);
                    }).catch(reject);
                }
            });
        });
    }

    /* Devolve os dados do documento obtidos atraves da consulta pelo número Sei do documento
    @param number idProcesso  ID do processo
    @param number idDocumento  ID do documento
    @return undefined | {
        processo: {
            id_processo: number,
            tipo_processo: string,
            numero_processo: string,
            assuntos: {[key: string]: string},
            interessados: {[key: string]: string},
            numero: string,
            descricao: string,
            observacoes: string,
            nivel_acesso: string,
            hipotese_legal: string
        },
        documento: {
            id_documento: number,
            numero_documento: number,
            titulo_documento: string,
            tipo_documento: string
            assunto_documento: string,
            prazo_documento: string,
            assinatura_documento: string,
            versao_documento: string,
            data_documento: string
        }
    }*
    methods.getDadosDocumentoPorIds = (idProcesso, idDocumento) => {
        console.log("Executando getDadosDocumentoPorIds");    
        return new Promise((resolve, reject) => {
            ajaxPesquisaIds(idProcesso, idDocumento).then(data => {
                if(data) {
                    var $html = $(data);
                    var urlArvore = $html.find('#ifrArvore').attr('src');
                    ajaxArvoreProcesso(urlArvore).then(tree => {
                        const consultaProcesso = tree.hrefConsultaProcesso ? ajaxConsultaProcesso(tree.hrefConsultaProcesso) : Promise.resolve(undefined);
                        //const consultaDocumento = tree.hrefConsultarDocumento ? ajaxConsultarDocumento(tree.hrefConsultarDocumento) : Promise.resolve(undefined);
                        const visualizarDocumento = tree.hrefVisualizarDocumento ? ajaxVisualizarDocumento(tree.hrefVisualizarDocumento) : Promise.resolve(undefined);
                        Promise.all([consultaProcesso, visualizarDocumento]).then(dados => {
                            if(dados[1]) dados[1].numero_documento = dados[1].numero_documento || numeroDocumento; 
                            const processo = dados[0] ? {
                                id_processo: tree.id_processo,
                                numero_processo: tree.numero_processo,
                                ...dados[0]
                            } : undefined;
                            const documento = dados[1] ? {
                                id_documento: tree.id_documento,
                                ...dados[1]
                            } : undefined; 
                            resolve(processo && documento ? {processo, documento} : undefined);
                        }).catch(reject);
                    }).catch(reject);
                }
            });
        });
    }*/

    /* Devolve os dados do processo obtidos atraves da consulta pelo número do processo no Sei
    @param string numeroProcesso  Número do processo
    @return undefined | {
        processo: {
            id_processo: number,
            tipo_processo: string,
            numero_processo: string,
            assuntos: {[key: string]: string},
            interessados: {[key: string]: string},
            numero: string,
            descricao: string,
            observacoes: string,
            nivel_acesso: string,
            hipotese_legal: string
        } | undefined
    }*/
    methods.getDadosProcesso = (numeroProcesso) => {
        //console.log("Executando getDadosProcesso");    
        return new Promise((resolve, reject) => {
            ajaxPesquisaNumero(numeroProcesso).then(data => {
                if(data) {
                    var $html = $(data);
                    var urlArvore = $html.find('#ifrArvore').attr('src');
                    ajaxArvoreProcesso(urlArvore).then(tree => {
                        const consultaProcesso = tree.hrefConsultaProcesso ? ajaxConsultaProcesso(tree.hrefConsultaProcesso) : Promise.resolve(undefined);
                        consultaProcesso.then(dados => {
                            const processo = dados ? {
                                id_processo: tree.id_processo,
                                numero_processo: tree.numero_processo,
                                ...dados
                            } : undefined;
                            resolve(processo ? {processo} : undefined);
                        }).catch(reject);
                    }).catch(reject);
                }
            });
        });
    }

    /* Devolve a lista de Tipos de Processos
    (Não funciona, será utilizado diretamente ao acessar a pagina com um botão no toolbar)
    @param string numeroDocumento  Número do documento
    @return {codigo: string, nome: string}[]
    */
    methods.getTiposProcessos = () => {
        //console.log("Executando getTiposProcessos");
        return new Promise((resolve, reject) => {
            ajaxBotaoInserirProcesso().then(data => {
                if(data) {
                    var $html = $(data);
                    var href = $html.find('#frmIniciarProcessoEscolhaTipo').attr('action');
                    var dados = {
                        hdnInfraNroItens: $html.find("#hdnInfraNroItens").attr("value"),
                        hdnInfraItemId: $html.find("#hdnInfraItemId").attr("value"),
                        hdnInfraItens: $html.find("#hdnInfraItens").attr("value"),
                        hdnInfraItensHash: $html.find("#hdnInfraItensHash").attr("value"),
                        hdnInfraItensSelecionados: $html.find("#hdnInfraItensSelecionados").attr("value"),
                        hdnInfraSelecoes: $html.find("#hdnInfraSelecoes").attr("value"),
                        hdnFiltroTipoProcedimento: "T"
                    };
                    ajaxProcedimentoEscolherTipo(href, dados).then(data => {
                        var $html = $(data);
                        var items = $html.find('#chkInfraItem');
                        resolve(items);
                    });
                }
            }).catch(reject);
        });
    }

    /* Obtem o conteudo armazenado temporariamente em memório do novo documento gerado (DESCONTINUADO/OBSOLETO)
    @param number idDocumento  Id do documento
    @return {section: number, html: string}[]
    * /
    methods.getDocumentoContent = (idDocumento) => {
        return Promise.resolve(documento_content["ID" + idDocumento]);
    }*/

    /* ocultar menu lateral Sei 
    @param boolean visivel  Se o menu deve ficar visível
    @return void
    */
    methods.visibilidadeMenuSei = (visivel) => {
        infraMenuSistemaEsquema(visivel, visivel ? 'Exibir' : 'Ocultar');
    }
});

function ajaxBotaoInserirProcesso() {
    return new Promise((resolve, reject) => {
        const $aIniciarProcesso = $("a:contains('Iniciar Processo')");
        const aIniciarProcesso = $aIniciarProcesso && $aIniciarProcesso.length ? $aIniciarProcesso[0] : undefined;
        const hrefIniciarProcesso = aIniciarProcesso ? aIniciarProcesso.href : undefined;
        const xhr = new XMLHttpRequest();
        if(hrefIniciarProcesso) {
            $.ajax({ 
                method: 'GET',
                url: hrefIniciarProcesso,
                xhr: () => xhr,
                success: resolve,
                fail: reject
            });
        } else {
            reject({"error": "Href iniciar processo não encontrado"});
        };
    });
}

function ajaxProcedimentoEscolherTipo(href, dados) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        $.ajax({ 
            method: 'POST',
            data: dados,
            url: href,
            xhr: () => xhr,
            success: resolve,
            fail: reject
        });
    });
}

function ajaxPesquisaNumero(numeroDocumento) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const href = $('#frmProtocoloPesquisaRapida').attr('action');
        $.ajax({ 
            method: 'POST',
            data: { txtPesquisaRapida: numeroDocumento },
            url: href,
            xhr: () => xhr,
            success: function(data) { 
                var result = getParamsUrl(xhr.responseURL);
                if (result.id_protocolo) {
                    resolve(data);
                } else {
                    reject(undefined);
                }
            },
            fail: function(error) {
                reject(error);
            }
        });
    });
}

/*function ajaxPesquisaIds(idProcesso, idDocumento) {
    "sei/controlador.php?acao=procedimento_trabalhar&id_procedimento=" + id_processo + "&id_documento=" + id_documento
}*/

function ajaxArvoreProcesso(urlArvore) {
    return new Promise((resolve, reject) => {
        $.ajax({ url: urlArvore }).done(html => {
            var $tree = $(html)
            var paraUrl = getParamsUrl(urlArvore);
            var hrefConsultaProcesso = undefined;
            var hrefConsultaDocumento = undefined;
            var hrefVisualizarDocumento = undefined;
            $tree.filter("script").not('[src*="js"]').each(function(index, value){
                if ($(this).text().indexOf('var objArvore = null;') !== -1) {
                    $.each($(this).text().split('\n'), function(ind, val){
                        const linkConsultarProcesso = 'controlador.php?acao=procedimento_consultar&acao_origem=arvore_visualizar&acao_retorno=arvore_visualizar&id_procedimento='+paraUrl.id_procedimento;
                        const linkAlterarProcesso = 'controlador.php?acao=procedimento_alterar&acao_origem=arvore_visualizar&acao_retorno=arvore_visualizar&id_procedimento='+paraUrl.id_procedimento;
                        const linkConsultarDocumento = 'controlador.php?acao=documento_consultar&acao_origem=arvore_visualizar&acao_retorno=arvore_visualizar&id_procedimento='+paraUrl.id_procedimento+'&id_documento='+paraUrl.id_documento;
                        const linkAlterarDocumento = 'controlador.php?acao=documento_alterar&acao_origem=arvore_visualizar&acao_retorno=arvore_visualizar&id_procedimento='+paraUrl.id_procedimento+'&id_documento='+paraUrl.id_documento;
                        const linkVisualizarDocumento = 'controlador.php?acao=documento_visualizar&acao_origem=procedimento_visualizar&id_documento='+paraUrl.id_documento;
                        if (val.includes(linkConsultarProcesso) || val.includes(linkAlterarProcesso)) {
                            hrefConsultaProcesso =  val.split('"').filter(v => v.includes(linkConsultarProcesso) || v.includes(linkAlterarProcesso))[0];
                        }
                        if (val.includes(linkConsultarDocumento) || val.includes(linkAlterarDocumento)) {
                            hrefConsultaDocumento =  val.split('"').filter(v => v.includes(linkConsultarDocumento) || v.includes(linkAlterarDocumento))[0];
                        }
                        if (val.indexOf(linkVisualizarDocumento) !== -1) {
                            hrefVisualizarDocumento = val.split("'").filter(v => v.includes(linkVisualizarDocumento))[0];
                        }
                    });
                }
            });
            var regExProcesso = /new\sinfraArvoreNo\(\"PROCESSO\"[^\n]+?,"([0-9\.\/-]+)"\);/gm.exec(html);
            var numeroProcesso = regExProcesso && regExProcesso.length ? regExProcesso[1] : undefined;
            resolve({
                hrefConsultaProcesso: hrefConsultaProcesso,
                hrefConsultaDocumento: hrefConsultaDocumento,
                hrefVisualizarDocumento: hrefVisualizarDocumento,
                id_documento: parseInt(paraUrl.id_documento),
                id_processo: parseInt(paraUrl.id_procedimento),
                numero_processo: numeroProcesso
            });
        }).fail(reject);
    });
}

function ajaxConsultaProcesso(hrefConsulta) {
    return new Promise((resolve, reject) => {
        $.ajax({ url: hrefConsulta }).done(html => {
            var $htmlConsulta = $(html);
            var paramProc = {};
            paramProc['tipo_processo'] = $htmlConsulta.find('#selTipoProcedimento').val();
            paramProc['assuntos'] = $htmlConsulta.find('#selAssuntos option').map(function(){ return {key: $(this).val(), value: $(this).text()}; }).get() || [];
            paramProc['interessados'] = $htmlConsulta.find('#selInteressados option').map(function(){ return {key: $(this).val(), value: $(this).text()}; }).get() || [];
            paramProc['numero'] = $htmlConsulta.find('#txtNumero').val();
            paramProc['descricao'] = $htmlConsulta.find('#txtDescricao').val();
            paramProc['observacoes'] = $htmlConsulta.find('#txaObservacoes').val();
            //paramProc['numero_processo'] = undefined; /* Será obtido na arvore */
            paramProc['nivel_acesso'] = $htmlConsulta.find('input[name="rdoNivelAcesso"]:checked').val();
            paramProc['hipotese_legal'] = $htmlConsulta.find('#selHipoteseLegal').val();
            //console.log(paramProc);
            resolve(paramProc);
        }).fail(reject);
    });
}

function ajaxVisualizarDocumento(hrefConsulta) {
    return new Promise((resolve, reject) => {
        $.ajax({ url: hrefConsulta }).done(html => {
            var $htmlConsulta = $(html);
            var txtConsulta = ($htmlConsulta.text() != '') ? $htmlConsulta.text().trim() : '';
            var paramDoc = {};
            paramDoc['numero_documento'] = ($htmlConsulta.filter('title').length && $htmlConsulta.filter('title').text().indexOf('-') !== -1) ? $htmlConsulta.filter('title').text().split('-')[1].trim() : undefined;
            paramDoc['tipo_documento'] = ($htmlConsulta.filter('title').length && $htmlConsulta.filter('title').text().indexOf('-') !== -1) ? $htmlConsulta.filter('title').text().split('-')[2].trim() : undefined;
            paramDoc['assunto_doc'] = ($htmlConsulta.filter('p').length) ? 
                $htmlConsulta.filter('p').map(function() {
                    var reg = new RegExp('assunto:', "igm");
                    return reg.test($(this).text()) ? $(this).text().replace(reg, '').trim().replace(/[\u200B]/g, '') : undefined;
                }).get(0) : undefined;
            paramDoc['prazo_documento'] = ($htmlConsulta.filter('p').length) ? 
                $htmlConsulta.filter('p').map(function() {
                    var txt = $(this).text();
                    var reg = new RegExp('prazo', "i");
                    var p = false;
                    if (reg.test(txt)) { 
                        p = txt.substr(txt.indexOf('prazo')+5).trim();
                        p = p.match(/^\d+|\d+\b|\d+(?=\w)/g);
                        return (p !== null) ? parseInt(p[0]) : false; 
                    } else {
                        return undefined;
                    }
                }).get(0) : undefined;
            var regAssinado = new RegExp('documento assinado eletronicamente', "i");
            var assinatura_doc = false;
            if (regAssinado.test(txtConsulta)) { 
                var dateAssinado = txtConsulta.match(/(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}/img);
                var timeAssinado = txtConsulta.match(/(\d{1,2}:\d{2})/img);
                assinatura_doc = (dateAssinado !== null && timeAssinado !== null) ? dateAssinado[0]+' '+timeAssinado[0] : false; 
            }
            paramDoc['assinatura_documento'] = assinatura_doc;
            paramDoc['titulo_documento'] = ($htmlConsulta.filter('p').length) ? 
                $htmlConsulta.filter('p').map(function () {
                    var reg = new RegExp(removeAcentos(paramDoc['tipo_documento']), "igm");
                    return reg.test(removeAcentos($(this).text())) ? removeAcentos($(this).text()).replace(reg, '').replace(/[\u200B]/g, '').replace(/n[\u00BA]/g, '').trim() : undefined;
                }).get(0) : undefined;
            var txtVersao = ($htmlConsulta.text() != '') ? $htmlConsulta.text().trim() : '';
            txtVersao = txtVersao.substr(txtVersao.lastIndexOf("\n")+1);
            var dateVersao = txtVersao.match(/(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}/img);
            var timeVersao = txtVersao.match(/(\d{1,2}:\d{2})/img);
            versao_doc = (dateVersao !== null && timeVersao !== null) ? dateVersao[0]+' '+timeVersao[0] : false; 
            paramDoc['versao_documento'] = versao_doc;
            paramDoc['data_documento'] = (assinatura_doc) ? assinatura_doc : versao_doc;
            resolve(paramDoc);
        }).fail(reject);
    });
}

/* Inclusão de documento */

var url_host = window.location.href.split('?')[0];

function openWindowEditor(urlEditor, idUser) {
    var id_documento = getParamsUrl(urlEditor).id_documento;
    var janelaEditor = infraAbrirJanela('', 'janelaEditor_'+idUser+'_'+id_documento, parent.infraClientWidth(), parent.infraClientHeight(), 'location=0,status=0,resizable=1,scrollbars=1', false);
    if (janelaEditor.location=='about:blank') {
        janelaEditor.location.href = urlEditor;
    }
    janelaEditor.focus();
}

function ifrArvoreReload(urlReload){
    var ifrArvore = $('#ifrArvore');
    if (ifrArvore.length) {
        if (urlReload) {
            ifrArvore.attr('src', urlReload);
        } else {
            ifrArvore[0].contentWindow.location.reload(true);
        }
    }
}

function addDocumento(id_procedimento, id_tipo_documento) {
    return new Promise((resolve, reject) => {
        var href = url_host.replace('controlador.php','')+'controlador.php?acao=procedimento_trabalhar&id_procedimento='+String(id_procedimento);
        $.ajax({ url: href }).done(function (html) {
            let $html = $(html);
            var urlArvore = $html.find("#ifrArvore").attr('src');
            $.ajax({ url: urlArvore }).done(function (htmlArvore) {
                var $htmlArvore = $(htmlArvore);
                var regExProcesso = /new\sinfraArvoreNo\(\"PROCESSO\"[^\n]+?,"([0-9\.\/-]+)"\);/gm.exec(htmlArvore);
                var numeroProcesso = regExProcesso && regExProcesso.length ? regExProcesso[1] : undefined;
                var textLink = $htmlArvore.filter('script').not('[src*="js"]').text();
                var arrayLinksArvoreDoc = getLinksInText(textLink);
                var urlNewDoc = arrayLinksArvoreDoc.filter(function(v){ return v.indexOf('acao=documento_escolher_tipo') !== -1 });
                if (urlNewDoc) {
                    $.ajax({ url: urlNewDoc }).done(function (htmlNewDoc) {
                        let $htmlNewDoc = $(htmlNewDoc);
                        var urlDoc = $htmlNewDoc.find('a[href*="&id_serie='+id_tipo_documento+'"]').attr('href');
                        //console.log(urlDoc, id_tipo_documento);
                        if (typeof urlDoc !== 'undefined') {
                            $.ajax({ url: urlDoc }).done(function (htmlDoc) {
                                var $htmlDoc = $(htmlDoc);
                                var form = $htmlDoc.find('#frmDocumentoCadastro');
                                var hrefForm = form.attr('action');
                                var param = {};
                                form.find("input[type=hidden]").each(function () {
                                    if ( $(this).attr('name') && $(this).attr('id').indexOf('hdn') !== -1) {
                                        param[$(this).attr('name')] = $(this).val(); 
                                    }
                                });
                                form.find('input[type=text]').each(function () { 
                                    if ( $(this).attr('id') && $(this).attr('id').indexOf('txt') !== -1) {
                                        param[$(this).attr('id')] = $(this).val();
                                    }
                                });
                                form.find('select').each(function () { 
                                    if ( $(this).attr('id') && $(this).attr('id').indexOf('sel') !== -1) {
                                        param[$(this).attr('id')] = $(this).val();
                                    }
                                });
                                form.find('input[type=radio]').each(function () { 
                                    if ( $(this).attr('name') && $(this).attr('name').indexOf('rdo') !== -1) {
                                        param[$(this).attr('name')] = $(this).val();
                                    }
                                });
                                param.rdoNivelAcesso = '0';
                                param.hdnFlagDocumentoCadastro = '2';
                                param.txaObservacoes = '';
                                param.txtDescricao = '';
                                var postData = '';
                                for (var k in param) {
                                    if (postData !== '') postData = postData + '&';
                                    var valor = (k=='hdnAssuntos') ? param[k] : escapeComponent(param[k]);
                                    valor = (k=='txtDataElaboracao') ? param[k] : escapeComponent(param[k]);
                                    valor = (k=='hdnInteressados') ? param[k] : valor;
                                    valor = (k=='txtDescricao') ? parent.encodeURI_toHex(param[k].normalize('NFC')) : valor;
                                    valor = (k=='txtNumero') ? escapeComponent(param[k]) : valor;
                                    postData = postData + k + '=' + valor;
                                }
                                var xhr = new XMLHttpRequest();
                                $.ajax({
                                    method: 'POST',
                                    // data: param,
                                    data: postData,
                                    url: hrefForm,
                                    contentType: 'application/x-www-form-urlencoded; charset=ISO-8859-1',
                                    xhr: function() {
                                        return xhr;
                                    },
                                }).done(function (htmlResult) {
                                    var status = (xhr.responseURL.indexOf('controlador.php?acao=arvore_visualizar&acao_origem=documento_gerar') !== -1) ? true : false;
                                    var result = null;
                                    if (status) {
                                        //console.log('Documento gerado com sucesso');
                                        var $htmlResult = $(htmlResult);
                                        var urlEditor = [];
                                        var idUser = false;
                                        $.each($htmlResult.text().split('\n'), function(i, v){
                                            if (v.indexOf("atualizarArvore('") !== -1) {
                                                urlReload = v.split("'")[1];
                                            }
                                            if (v.indexOf("acao=editor_montar") !== -1) {
                                                urlEditor.push(v.split("'")[1]);
                                            }
                                            if (v.indexOf("janelaEditor_") !== -1) {
                                                idUser = v.split("_")[1];
                                            }
                                        });
                                        if (urlEditor.length > 0 && idUser) {
                                            var params = getParamsUrl(urlEditor[0]);
                                            result = {
                                                id_processo: parseInt(params.id_procedimento),
                                                id_documento: parseInt(params.id_documento),
                                                numero_processo: numeroProcesso,
                                                urlEditor: urlEditor[0],
                                                idUser: idUser,
                                                urlReload: urlReload
                                            };
                                            //documento_content["ID" + params.id_documento] = contents;
                                            //openLinkNewTab(href);
                                            //openWindowEditor(urlEditor[0], idUser);
                                            resolve(result);
                                        } else {
                                            reject('Erro ao obter dados do documento gerado.');
                                        }
                                        //resolve(result);
                                    } else {
                                        reject('Erro ao gerar o documento.');
                                    }
                                });
                            });
                        } else {
                            reject('Erro ao selecionar o tipo de documento. Verifique se o tipo est\u00E1 dispon\u00EDvel no sistema e tente novamente');
                        }
                    });
                } else {
                    reject('Erro ao localizar o link de inserir documento. Verifique se o processo encontra-se aberto em sua unidade!')
                }
            });
        });
    });
}

function addProcesso(id_tipo_procedimento, id_tipo_documento) {
var urlInitProc = $('#main-menu a[href*="acao=procedimento_escolher_tipo"]').attr('href');
    if (urlInitProc !== null) {
        $.ajax({ url: urlInitProc }).done(function (htmlInitProc) {
            var $htmlInitProc = $(htmlInitProc);
            var form = $htmlInitProc.find('#frmIniciarProcessoEscolhaTipo');
            var hrefForm = form.attr('action');
            var param = {};
            form.find("input[type=hidden]").each(function () {
                if ( $(this).attr('name') && $(this).attr('id').indexOf('hdn') !== -1) {
                    param[$(this).attr('name')] = $(this).val(); 
                }
            });
            param.hdnFiltroTipoProcedimento = 'T';
            $.ajax({
                method: 'POST',
                data: param,
                url: hrefForm
            }).done(function (htmlFullList) {
                let $htmlFullList = $(htmlFullList);
                var urlProc = $htmlFullList.find('a[href*="procedimento_escolher_tipo&id_tipo_procedimento='+id_tipo_procedimento+'"]').attr('href');
                if (urlProc !== null) {
                    $.ajax({ url: urlProc }).done(function (htmlFormProc) {
                        var $htmlFormProc = $(htmlFormProc);
                        var form = $htmlFormProc.find('#frmProcedimentoCadastro');
                        var hrefForm = form.attr('action');
                        var param = {};
                        form.find("input[type=hidden]").each(function () {
                            if ( $(this).attr('name') && $(this).attr('id').indexOf('hdn') !== -1) {
                                param[$(this).attr('name')] = $(this).val(); 
                            }
                        });
                        form.find('input[type=text]').each(function () { 
                            if ( $(this).attr('id') && $(this).attr('id').indexOf('txt') !== -1) {
                                param[$(this).attr('id')] = $(this).val();
                            }
                        });
                        form.find('select').each(function () { 
                            if ( $(this).attr('id') && $(this).attr('id').indexOf('sel') !== -1) {
                                param[$(this).attr('id')] = $(this).val();
                            }
                        });
                        form.find('input[type=radio]').each(function () { 
                            if ( $(this).attr('name') && $(this).attr('name').indexOf('rdo') !== -1) {
                                param[$(this).attr('name')] = $(this).val();
                            }
                        });
                        param.rdoNivelAcesso = '0';
                        param.hdnFlagProcedimentoCadastro = '2';
                        param.rdoProtocolo = 'M';
                        param.txaObservacoes = '';
                        param.hdnAssuntos = ($htmlFormProc.find('#selAssuntos option').length == 0) ? [] : $htmlFormProc.find('#selAssuntos option').map(function(){ return $(this).val()+'\u00B1'+$(this).text() }).get().join('\u00A5').replaceAll(' ','+');
                        param.hdnInteressados = $htmlFormProc.find('#selInteressados option').map(function(){ return $(this).val()+'\u00B1'+$(this).text() }).get().join('\u00A5').replaceAll(' ','+');

                        var postData = '';
                        for (var k in param) {
                            if (postData !== '') postData = postData + '&';
                            var valor = (k=='hdnNomeTipoProcedimento') ? escapeComponent(param[k]) : param[k];
                                valor = (k=='hdnAssuntos') ? escapeComponent(param[k])  : valor;
                                postData = postData + k + '=' + valor;
                        }
                        //console.log(param, postData);

                        var xhr = new XMLHttpRequest();
                        $.ajax({
                            method: 'POST',
                            // data: param,
                            data: postData,
                            url: hrefForm,
                            contentType: 'application/x-www-form-urlencoded; charset=ISO-8859-1',
                            xhr: function() {
                                return xhr;
                            },
                        }).done(function (htmlResult) {
                            var status = (xhr.responseURL.indexOf('controlador.php?acao=procedimento_trabalhar&acao_origem=procedimento_gerar') !== -1) ? true : false;
                            if (status) {
                                var $htmlResult = $(htmlResult);
                                var linkProc = $htmlResult.find('#ifrArvore').attr('src');
                                var id_procedimento = (linkProc !== null) ? getParamsUrl(linkProc).id_procedimento : false;
                                    id_procedimento = (typeof id_procedimento !== 'undefined') ? id_procedimento : false;
                                var href = url_host.replace('controlador.php','')+'controlador.php?acao=procedimento_trabalhar&id_procedimento='+String(id_procedimento);
                                if (id_procedimento && href) {
                                    setNewDoc(id_procedimento, id_tipo_documento);
                                } else {
                                    console.log('N\u00E3o foi poss\u00EDvel abrir o processo gerado. Verifique na caixa de entrada de sua unidade');
                                }
                            }
                        });
                    });
                } else { 
                    console.log('Erro ao selecionar o tipo de processo. Verifique se o tipo est\u00E1 dispon\u00EDvel no sistema e tente novamente');
                }
            });
            
        });
    } else {
        console.log('Erro ao iniciar a cria\u00E7\u00E3o do processo');
    }
}

function setCKEDITOR_instances() {
    for(var id in CKEDITOR.instances) {
        CKEDITOR.instances[id].on('focus', function(e) {
            // Fill some global var here
            idEditor = e.editor.name;
            oEditor = CKEDITOR.instances[idEditor];
            iframeEditor = ($('#frmEditor').length > 0) ? $('iframe[title*="'+idEditor+'"]').contents() : $(txaEditor);
            if(!$('#idEditor').length) { $('#divComandos').append('<input style="display:none" type="hidden" id="idEditor">'); }
            $('#idEditor').val(idEditor);
            if(iframeEditor.find('body').attr('contenteditable') == 'true' || $('#frmEditor').length == 0) {
                $('#cke_'+idEditor).find('.cke_iconPro').removeClass('cke_button_disabled');
            }
        });
    }
}

function enableSalvar(id) {
    if ($('#frmEditor').length > 0) {
        var idEditor = id || $('#idEditor').val();
        $('div#cke_'+idEditor).find('.cke_button__save').removeClass('cke_button_disabled').addClass('cke_button_off').removeAttr('aria-disabled').css('background-color','');
        CKEDITOR.instances[idEditor].commands.save.state = undefined;
        if (CKEDITOR.dialog.getCurrent() != null ) {
            CKEDITOR.dialog.getCurrent().hide();
        }
    }
}

function setDocumento(segmento, conteudo) {
    return new Promise((resolve, reject) => {
        setCKEDITOR_instances();
        var numero_documento = $(document).find("title").text().split('-')[1].trim();
        var elemIframe = $('iframe').filter(function(){ return $(this).contents().find('body').attr('contenteditable') == 'true' }).eq(segmento);
        if (elemIframe.length > 0) {
            var iframe = elemIframe.contents();
            if (elemIframe.attr('title').indexOf(',') !== -1) {
                var idEditor = elemIframe.attr('title').split(',')[1].trim();
                $('#idEditor').val(idEditor);
                oEditor = CKEDITOR.instances[idEditor];
                if (typeof oEditor !== 'undefined') {
                    oEditor.focus();
                    oEditor.fire('saveSnapshot');
                    iframe.find('body').html(conteudo);
                    enableSalvar(idEditor);                
                    var $form = oEditor.element.$.form;
                    if ($form) $form.submit();
                    resolve(numero_documento);
                } else {
                    reject(false);
                }
            } else {
                reject(false);
            }
        } else {
            reject(false);
        }
    });
        /* INSERE O TEXTO NO IFRAME DE MAIOR TAMANHO
        var maxIframeHeight = {value: 0, index: -1}
        $('iframe.cke_wysiwyg_frame').each(function(index){
            if ( $(this).contents().find('body').attr('contenteditable') == 'true' ) {
                var height = $(this).height();
                if (height > maxIframeHeight.value) { 
                    maxIframeHeight = {value: height, index: index};
                }
            }
        });
        if (maxIframeHeight.index != -1) {
            var elemIframe = $('iframe').eq(maxIframeHeight.index);
            var iframe = elemIframe.contents();
            if (elemIframe.attr('title').indexOf(',') !== -1) {
                var idEditor = elemIframe.attr('title').split(',')[1].trim();
                $('#idEditor').val(idEditor);
                oEditor = CKEDITOR.instances[idEditor];
                if (typeof oEditor !== 'undefined') {
                    oEditor.focus();
                    oEditor.fire('saveSnapshot');
                    iframe.find('body').html(modeloHtml);
                    enableButtonSavePro();
                    
                    var $form = oEditor.element.$.form;
                    if ($form) $form.submit();
                }
            }
        }
        */
    //}
}