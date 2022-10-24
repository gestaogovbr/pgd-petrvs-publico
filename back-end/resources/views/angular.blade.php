<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Petrvs</title>
  <base href="{{ $host }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="assets/css/bootstrap-load-fonts.css" rel="stylesheet" type="text/css"> 
  <link href="assets/css/fontawesome-load-fonts.css" rel="stylesheet" type="text/css"> 
  <script>
    /* 
    JavaScript contendo variáveis de ambiente para a aplicação de front-end. 
    Caso não seja possível carregar a configuração, então será carregada pelo environment-config
    */
    var PETRVS_GLOBAL_CONFIG_STR = `{!! $config !!}`;
    var PETRVS_GLOBAL_CONFIG = undefined;
    try {
      PETRVS_GLOBAL_CONFIG = JSON.parse(PETRVS_GLOBAL_CONFIG_STR);
    } catch (e) {
      console.log("A configuração será carregada pelo environment-config");
    }     
  </script>
  <script src="environment-config"></script>
  <script src="assets/js/bootstrap-angular.js"></script>
<link rel="stylesheet" href="styles.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.js" defer></script><script src="polyfills.js" defer></script><script src="scripts.js" defer></script><script src="vendor.js" defer></script><script src="main.js" defer></script></body>
</html>
