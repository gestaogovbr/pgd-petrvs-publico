/* procedimento_trabalhar */
$(function () {
    var methods = {};
    const proxy = new AppProxy(methods, "procedimento_escolher_tipo");

    proxy.onInit(async () => {
        if($('#imgExibirTiposProcedimento')[0].src.includes("menos.gif")) {
            proxy.executeAfterInit("loadToolbarButtons", []);
        }
    });

    methods.getTiposProcessos = () => {
        try {
            var tipos = [];
            for(var input of $('input[name=chkInfraItem]')) {
                if(input.value) tipos.push({codigo: input.value, nome: input.title});
            }
            return tipos;
        } catch (e) {
            alert(e.message);
            return null;
        }
    }
});

