<!DOCTYPE html>
<html>
    <body>
        <p><i>Prezado(a) colaborador(a),<br/>
        Foi registrado, no PGD Petrvs, um possível erro de lotação de agente público no SIAPE. 
        Favor verificar de acordo com as seguinte informações:
        </i></p>

        <i>
        <ul>
            <li>AGENTE PÚBLICO: <b>{{ $relato->nome }}</b></li>
            <li>Nº SIAPE: <b>{{ $relato->matricula }}</b></li>
            <li>Nº CPF: <b>{{ $relato->cpf }}</b></li>
            @if ($relato->unidade)
            <li>UNIDADE: <b>{{ $relato->unidade->nome }}</b></li>
            @endif
            <li>TIPO: <b>{{ $relato->opcao }}</b></li>
            @if ($relato->descricao)
            <li>DESCRIÇÃO: {{ $relato->descricao }}</li>
            @endif
        </ul>
        </i>

        <br/>    
        <p>Após a realização dos ajustes no SIAPE, para confirmar, <a href='#'>clique aqui</a>.</p>
        <br/>
        <p><i>Atenciosamente,<br/>
            <b>Suporte PGD Petrvs</b><br/>
            CGPGD/DINOV/SEGES/MGI<br/>
            <a href="mailto:pgd@gestao.gov.br">pgd@gestao.gov.br</a>
            </i>
        </p>
    </body>
</html>