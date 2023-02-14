const fs = require('fs');
console.log("POST-BUILD:");
/* Cria o angular.blade.php e edita o app.json para colocar os arquivos com hash do build angular */ 
if(fs.existsSync("../back-end/public/index.html")) {
    /* Copia o arquivo index.html para a pasta pages (Para carregar o options da extensão) */ 
    fs.copyFileSync("../back-end/public/index.html", "../back-end/public/pages/index.html");
    /* Obtem lista de arquivos gerados no deploy */
    $index = fs.readFileSync("../back-end/public/index.html", {encoding: "utf8"});
    $files = [];
    $changed = $index.replace('<base href="/">', '<base href="{{ $host }}">');
    fs.writeFileSync("../back-end/public/index.html", $changed);
    $files = preg_match_all(/src="(\w+\.\w+\.js)/i, $index);
    if($files.length) {
        $appJson = JSON.parse(fs.readFileSync("../back-end/public/app.json", {encoding: "utf8"}));
        $appJson.angularFiles = $files[1];
        fs.writeFileSync("../back-end/public/app.json", JSON.stringify($appJson));
    } else {
        console.log("Não foi possível encontrar lista de arquivos buildados do angular");
    }
    /* Move o template modificado para carregar a aplicação no Laravel baseado no HTML da aplicação angula e evitar que seja chamado pelo servidor web */
    fs.renameSync("../back-end/public/index.html", "../back-end/resources/views/angular.blade.php");
    console.log("FIM");
} else {
    console.log("Arquivo index.html não encontrado");
}

function preg_match_all(regex, str) {
    return [...str.matchAll(new RegExp(regex, 'g'))].reduce((acc, group) => {
        group.filter((element) => typeof element === 'string').forEach((element, i) => {
        if (!acc[i]) acc[i] = [];
            acc[i].push(element);
        });
        return acc;
    }, []);
}
