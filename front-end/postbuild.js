const fs = require('fs');
const path = require('path');

console.log("POST-BUILD:");

// Cria o angular.blade.php e edita o app.json para colocar os arquivos com hash do build angular
const indexHtmlPath = path.resolve(__dirname, '../back-end/public/pages/index.html');
const appJsonPath = path.resolve(__dirname, '../back-end/public/app.json');
const angularBladePath = path.resolve(__dirname, '../back-end/resources/views/angular.blade.php');


if (fs.existsSync(indexHtmlPath)) {
  try {


    // Obtem lista de arquivos gerados no deploy
    let indexContent = fs.readFileSync(indexHtmlPath, { encoding: "utf8" });
    let angularFiles = [];
    indexContent = indexContent.replace('<base href="/">', '<base href="{{ $host }}">');

    // Extrai os nomes dos arquivos JavaScript usando expressão regular
    const regex = /src="([^"]+\.js)"/gi;
    let match;
    while ((match = regex.exec(indexContent)) !== null) {
      angularFiles.push(match[1]);
    }

    if (angularFiles.length > 0) {
      let appJson = JSON.parse(fs.readFileSync(appJsonPath, { encoding: "utf8" }));
      appJson.angularFiles = angularFiles;
      fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
      console.log("Arquivos do Angular adicionados ao app.json:", angularFiles);
    } else {
      console.log("Não foi possível encontrar lista de arquivos buildados do Angular");
    }

    // Verifica se angular.blade.php já existe e o remove
    if (fs.existsSync(angularBladePath)) {
      fs.unlinkSync(angularBladePath);
      console.log("Arquivo angular.blade.php existente removido.");
    }

    // Move o template modificado para carregar a aplicação no Laravel
    fs.renameSync(indexHtmlPath, angularBladePath);
    console.log("Arquivo index.html movido para angular.blade.php com sucesso.");

  } catch (error) {
    console.error("Erro ao processar index.html e app.json:", error);
  }
} else {
  console.log("Arquivo index.html não encontrado em", indexHtmlPath);
}

// Documentação
const origem = path.resolve(__dirname, '../resources/documentacao/');
const destinoFrontEnd = path.resolve(__dirname, '../front-end/src/assets/documentacao/');
const destinoBackEnd = path.resolve(__dirname, '../back-end/public/assets/documentacao/');

copiarDiretorio(origem, destinoFrontEnd);
copiarDiretorio(origem, destinoBackEnd);

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

const buildInfoPath = path.resolve(__dirname, '../back-end/public/assets/build-info.json');
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
console.log('Build info gerado:', buildInfo);