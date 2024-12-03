<!DOCTYPE html>
<html>
    <body>
        <p><i>Prezado(a) colaborador(a),<br/>
        Foi registrado, no PGD Petrvs, um possível erro de lotação de agente público no SIAPE. 
        Favor verificar de acordo com as seguinte informações:
        </i></p>

        <i>
        <ul>
            <li>AGENTE PÚBLICO COM PROBLEMA NA LOTAÇÃO: <b>{{ $relato->nome }}</b></li>
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
        <p>Após a realização dos ajustes no SIAPE, para confirmar, <a href='mailto:{{ $remetente->email }}?subject=Solicita%C3%A7%C3%A3o%20de%20ajuste%20de%20lota%C3%A7%C3%A3o%20no%20Siape%20atendida&body=Sua%20solicita%C3%A7%C3%A3o%20de%20ajuste%20de%20lota%C3%A7%C3%A3o%20de%20{{ $nome }}%20no%20Siape%20foi%20atendida%2C%20favor%20verificar.'>clique aqui</a>.</p>
        <br/>
        <p><i>Atenciosamente,<br/>
            <b>{{ $remetente->nome }}</b><br/>
            Matrícula SIAPE {{ $remetente->matricula }}<br/>
            @if ($remetente->lotacao)
            {{ $remetente->lotacao->unidade->nome }}<br/>
            @endif
            {{ $remetente->ultimaParticipacaoPrograma?->programa->unidade->nome }}
            </i>
        </p>
    </body>
</html>