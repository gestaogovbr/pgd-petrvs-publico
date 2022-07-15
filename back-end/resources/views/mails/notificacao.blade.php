<html>
    <body>
        {{ $mensagem }}
        <br><br>
        {!! str_starts_with($signature, '<') ? $signature : (file_exists($signature) ? "<img src='" . $message->embed($signature) . "'>" : htmlentities($signature)) !!}
    </body>
</html>