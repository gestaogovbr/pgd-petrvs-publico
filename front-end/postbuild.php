<?php

echo "POST-BUILD:\n";
/* Cria o angular.blade.php e edita o app.json para colocar os arquivos com hash do build angular */ 
if(file_exists("../back-end/public/index.html")) {
    /* Copia o arquivo index.html para a pasta pages (Para carregar o options da extensão) */ 
    copy("../back-end/public/index.html", "../back-end/public/pages/index.html");
    /* Obtem lista de arquivos gerados no deploy */
    $index = file_get_contents("../back-end/public/index.html");
    $files = [];
    $changed = str_replace('<base href="/">', '<base href="{{ $host }}">', $index);
    file_put_contents("../back-end/public/index.html", $changed);
    if(preg_match_all("/src=\"(\w+\.\w+\.js)/i", $index, $files)) {
        $appJson = json_decode(file_get_contents("../back-end/public/app.json"));
        $appJson->angularFiles = $files;
        file_put_contents("../back-end/public/app.json", json_encode($appJson, JSON_PRETTY_PRINT));
    } else {
        echo "Não foi possível encontrar lista de arquivos buildados do angular\n";
    }
    /* Move o template modificado para carregar a aplicação no Laravel baseado no HTML da aplicação angula e evitar que seja chamado pelo servidor web */
    rename("../back-end/public/index.html", "../back-end/resources/views/angular.blade.php");
    echo "FIM\n";
} else {
    echo "Arquivo index.html não encontrado\n";
}