/* 
Envia mensagem para carregar o Angular (Modo compatibilidade aplicação web X extenção)
*/

window.onload = function() {
    document.dispatchEvent(new Event('bootstrapAppModule'));
};
