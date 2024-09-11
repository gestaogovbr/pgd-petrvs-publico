<!DOCTYPE html>
<html>
    <body>
        @if(($relato->opcao == 1) || ($relato->opcao == 2))
            <p>Agente público: <b>{{ $relato->usuario->nome }}</b></p>
            @if($relato->opcao == 1)
            <p>Onde o agente público DEVERIA ESTAR lotado: <b>{{ $relato->unidade->nome }}</b></p>
            @endif
        @else
            <p>Nome: <b>{{ $relato->nome }}</b></p>
            <p>CPF: <b>{{ $relato->cpf }}</b></p>
            <p>Matricula: <b>{{ $relato->matricula }}</b></p>
        @endif

        @if(($relato->opcao == 1) || ($relato->opcao == 4))
         <p>{{ $relato->descricao }}</p>
        @endif
    </body>
</html>