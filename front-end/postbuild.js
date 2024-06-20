const fs = require('fs');
const path = require('path');

console.log("POST-BUILD:");

// Cria o angular.blade.php e edita o app.json para colocar os arquivos com hash do build angular
if (fs.existsSync("../back-end/public/index.html")) {
  // Copia o arquivo index.html para a pasta pages (Para carregar o options da extensão)
  fs.copyFileSync("../back-end/public/index.html", "../back-end/public/pages/index.html");
  // Obtem lista de arquivos gerados no deploy
  let $index = fs.readFileSync("../back-end/public/index.html", { encoding: "utf8" });
  let $files = [];
  let $changed = $index.replace('<base href="/">', '<base href="{{ $host }}">');
  fs.writeFileSync("../back-end/public/index.html", $changed);
  $files = preg_match_all(/src="(\w+\.\w+\.js)/i, $index);
  if ($files.length) {
    let $appJson = JSON.parse(fs.readFileSync("../back-end/public/app.json", { encoding: "utf8" }));
    $appJson.angularFiles = $files[1];
    fs.writeFileSync("../back-end/public/app.json", JSON.stringify($appJson));
  } else {
    console.log("Não foi possível encontrar lista de arquivos buildados do angular");
  }
  // Move o template modificado para carregar a aplicação no Laravel baseado no HTML da aplicação angula e evitar que seja chamado pelo servidor web
  fs.renameSync("../back-end/public/index.html", "../back-end/resources/views/angular.blade.php");
  console.log("FIM");
} else {
  console.log("Arquivo index.html não encontrado");
}

// Documentação
const origem = '../resources/documentacao/';
const destinoFrontEnd = '../front-end/src/assets/documentacao/';
const destinoBackEnd = '../back-end/public/assets/documentacao/';

copiarDiretorio(origem, destinoFrontEnd);
copiarDiretorio(origem, destinoBackEnd);

function preg_match_all(regex, str) {
  return [...str.matchAll(new RegExp(regex, 'g'))].reduce((acc, group) => {
    group.filter((element) => typeof element === 'string').forEach((element, i) => {
      if (!acc[i]) acc[i] = [];
      acc[i].push(element);
    });
    return acc;
  }, []);
}

function copiarDiretorio(origem, destino) {
  if (!fs.existsSync(origem)) {
    console.error(`O diretório de origem '${origem}' não existe.`);
    return;
  }
  try {
    if (!fs.existsSync(destino)) {
      fs.mkdirSync(destino, { recursive: true });
    }
    const arquivosDiretorios = fs.readdirSync(origem);
    for (const item of arquivosDiretorios) {
      const origemItem = path.join(origem, item);
      const destinoItem = path.join(destino, item);
      const ehDiretorio = fs.statSync(origemItem).isDirectory();
      if (ehDiretorio) {
        copiarDiretorio(origemItem, destinoItem);
      } else {
        fs.copyFileSync(origemItem, destinoItem);
        console.log(`Arquivo '${origemItem}' copiado para '${destinoItem}'.`);
      }
    }
    console.log(`Diretório '${origem}' copiado para '${destino}' com sucesso!`);
  } catch (error) {
    console.error(`Erro ao copiar '${origem}' para '${destino}': ${error.message}`);
  }
}

// Geração do build-info.json
const buildInfo = {
  build_date: new Date().toISOString(),
  build_number: Date.now()
};

const buildInfoPath = path.join(__dirname, '../back-end/public/assets/build-info.json');
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
console.log('Build info generated:', buildInfo);