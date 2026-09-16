<?php

use App\Enums\RelatorioGeracaoStatus;
use App\Jobs\GerarRelatorioExcelJob;

test('status da geração possui os rótulos da listagem', function () {
    expect(RelatorioGeracaoStatus::PROCESSANDO->label())->toBe('Em processamento')
        ->and(RelatorioGeracaoStatus::CONCLUIDA->label())->toBe('Concluída')
        ->and(RelatorioGeracaoStatus::ERRO->label())->toBe('Erro')
        ->and(RelatorioGeracaoStatus::values())->toBe(['PROCESSANDO', 'CONCLUIDA', 'ERRO']);
});

test('job de geração usa fila própria com timeout de 30 minutos', function () {
    $job = new GerarRelatorioExcelJob('geracao-1', 'tenant-1');

    expect($job->geracaoId)->toBe('geracao-1')
        ->and($job->tenantId)->toBe('tenant-1')
        ->and($job->timeout)->toBe(1800)
        ->and($job->timeout)->toBe(GerarRelatorioExcelJob::TIMEOUT_SECONDS)
        ->and($job->tries)->toBe(1)
        ->and($job->connection)->toBe(GerarRelatorioExcelJob::CONNECTION)
        ->and($job->queue)->toBe(GerarRelatorioExcelJob::QUEUE)
        ->and($job->queue)->not->toBe('pgd_queue')
        ->and($job->queue)->not->toBe('default');
});

test('timeout da geração usa mensagem de erro amigável', function () {
    expect(GerarRelatorioExcelJob::mensagemErro(new Illuminate\Queue\TimeoutExceededException('has timed out')))
        ->toBe(GerarRelatorioExcelJob::MENSAGEM_ERRO_TIMEOUT)
        ->and(GerarRelatorioExcelJob::mensagemErro(new RuntimeException('falha interna')))
        ->toBe('falha interna')
        ->and(GerarRelatorioExcelJob::mensagemErro(null))
        ->toBe('Não foi possível gerar o relatório. Tente novamente.');
});
