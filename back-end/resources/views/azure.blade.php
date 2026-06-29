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
</head>
<body onload="loginFinished()">
    Redirecionando . . .
</body>
</html>
