<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Petrvs</title>
    <script type="text/javascript">
        function loginFinished() {
            const winRef = window.opener;
            winRef.postMessage("COMPLETAR_LOGIN", "*");
            setTimeout(() => window.close(), 1000);
        }
    </script>
    <link rel="stylesheet" href="styles.css">
</head>
<body onload="loginFinished()">
    Redirecionando . . .
</body>
</html>
