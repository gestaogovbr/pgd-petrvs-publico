<?php

use App\Exceptions\ErrorDataSiapeException;
use App\Exceptions\ErrorDataSiapeFaultCodeException;
use App\Services\Siape\MensagemConsultaServidorSiape;
use App\Services\SiapeIndividualServidorService;

test('issue 2684 - ausencia funcional e reconhecida pela causa tipada sem depender do texto', function (): void {
    $causa = new ErrorDataSiapeFaultCodeException('Texto de diagnóstico');
    $erro = new ErrorDataSiapeException('Mensagem intermediária', 0, $causa);

    expect(MensagemConsultaServidorSiape::falhaFuncional($erro))
        ->toBe(MensagemConsultaServidorSiape::DADOS_FUNCIONAIS_AUSENTES);
    expect(MensagemConsultaServidorSiape::falhaFuncional(new RuntimeException('Não existem dados para consulta')))
        ->toBe(MensagemConsultaServidorSiape::DADOS_FUNCIONAIS_INVALIDOS);
});

test('issue 2684 - aviso de dados PGD incompletos respeita matricula e nao altera status', function (array $campos, bool $avisa): void {
    $reflection = new ReflectionClass(SiapeIndividualServidorService::class);
    $service = $reflection->newInstanceWithoutConstructor();
    $resumo = [
        ['matricula' => '2684001', 'status' => 'sucesso', 'mensagem' => 'Processamento concluído'],
        ['matricula' => '2684002', 'status' => 'parcial', 'mensagem' => 'Orientação anterior'],
    ];
    $reflection->getProperty('resumo')->setValue($service, $resumo);
    $reflection->getMethod('orientarDadosPgdAusentes')->invoke($service, [
        ['matriculaSiape' => '2684001'] + $campos,
        ['matriculaSiape' => '2684002', 'participaPGD' => 'sim', 'modalidadePGD' => 'parcial'],
    ]);

    $resultado = $service->getResumo();
    expect($resultado[0]['mensagem'])->toBe('Processamento concluído' . ($avisa ? ' ' . MensagemConsultaServidorSiape::DADOS_PGD_AUSENTES : ''))
        ->and($resultado[0]['status'])->toBe('sucesso')
        ->and($resultado[1])->toBe($resumo[1]);
})->with([
    'campos presentes' => [['participaPGD' => 'sim', 'modalidadePGD' => 'parcial'], false],
    'sem modalidade' => [['participaPGD' => 'S'], true],
    'sem participacao' => [['modalidadePGD' => 'parcial'], true],
    'campos vazios do XML' => [['participaPGD' => [], 'modalidadePGD' => []], true],
    'nao participante sem modalidade' => [['participaPGD' => 'não'], false],
]);
