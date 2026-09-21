<?php

namespace Tests\IntegrationTenant\Services\ProgramaService;

use App\Models\Entidade;
use App\Models\Programa;
use App\Models\Unidade;
use App\Services\ProgramaService;
use App\Services\ServiceBase;
use Illuminate\Support\Str;

beforeEach(function () {
    $this->service = new ProgramaService();

    $entidade = new Entidade();
    $entidade->id = Str::uuid();
    $entidade->fill([
        'sigla' => 'ENT_PER',
        'nome' => 'Entidade Periodicidade',
        'abrangencia' => 'NACIONAL',
        'layout_formulario_atividade' => 'COMPLETO',
    ]);
    $entidade->save();

    $this->unidade = new Unidade();
    $this->unidade->id = Str::uuid();
    $this->unidade->fill([
        'sigla' => 'UNI_PER',
        'nome' => 'Unidade Instituidora Periodicidade',
        'entidade_id' => $entidade->id,
        'codigo' => '99999',
        'instituidora' => 1,
    ]);
    $this->unidade->save();
});

/**
 * Monta o array de dados aceito por validateStore, com datas válidas e sem id.
 */
function dadosProgramaPeriodicidade(Unidade $unidade, string $periodicidade, ?string $id = null): array
{
    return [
        'id' => $id,
        'unidade_id' => $unidade->id,
        'periodicidade_consolidacao' => $periodicidade,
        'data_inicio' => '2030-01-01',
        'data_fim' => '2030-12-31',
    ];
}

describe('ProgramaService::validateStore - periodicidades descontinuadas', function () {
    test('bloqueia INSERT com periodicidade descontinuada (BIMESTRAL)', function () {
        $data = dadosProgramaPeriodicidade($this->unidade, 'BIMESTRAL');

        expect(fn () => $this->service->validateStore($data, $this->unidade, ServiceBase::ACTION_INSERT))
            ->toThrow(\Exception::class, 'A periodicidade de consolidação selecionada foi descontinuada.');
    });

    test('permite INSERT com periodicidade MENSAL', function () {
        $data = dadosProgramaPeriodicidade($this->unidade, 'MENSAL');

        $this->service->validateStore($data, $this->unidade, ServiceBase::ACTION_INSERT);

        expect(true)->toBeTrue();
    });

    test('permite EDIT mantendo periodicidade descontinuada já persistida', function () {
        $programa = Programa::factory()->create([
            'unidade_id' => $this->unidade->id,
            'periodicidade_consolidacao' => 'BIMESTRAL',
            'data_inicio' => '2030-01-01',
            'data_fim' => '2030-12-31',
        ]);

        $data = dadosProgramaPeriodicidade($this->unidade, 'BIMESTRAL', $programa->id);

        $this->service->validateStore($data, $this->unidade, ServiceBase::ACTION_EDIT);

        expect(true)->toBeTrue();
    });

    test('bloqueia EDIT trocando de uma periodicidade descontinuada para outra descontinuada', function () {
        $programa = Programa::factory()->create([
            'unidade_id' => $this->unidade->id,
            'periodicidade_consolidacao' => 'BIMESTRAL',
            'data_inicio' => '2030-01-01',
            'data_fim' => '2030-12-31',
        ]);

        $data = dadosProgramaPeriodicidade($this->unidade, 'TRIMESTRAL', $programa->id);

        expect(fn () => $this->service->validateStore($data, $this->unidade, ServiceBase::ACTION_EDIT))
            ->toThrow(\Exception::class, 'A periodicidade de consolidação selecionada foi descontinuada.');
    });

    test('permite EDIT trocando de periodicidade descontinuada para MENSAL', function () {
        $programa = Programa::factory()->create([
            'unidade_id' => $this->unidade->id,
            'periodicidade_consolidacao' => 'BIMESTRAL',
            'data_inicio' => '2030-01-01',
            'data_fim' => '2030-12-31',
        ]);

        $data = dadosProgramaPeriodicidade($this->unidade, 'MENSAL', $programa->id);

        $this->service->validateStore($data, $this->unidade, ServiceBase::ACTION_EDIT);

        expect(true)->toBeTrue();
    });
});
