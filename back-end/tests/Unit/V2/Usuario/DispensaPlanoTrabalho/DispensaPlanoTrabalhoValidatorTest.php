<?php

use App\V2\Usuario\DispensaPlanoTrabalho\DispensaPlanoTrabalhoValidator;
use App\Exceptions\ValidateException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('DispensaPlanoTrabalhoValidator', function () {

    test('exige data de início e ciência', function () {
        $validator = new DispensaPlanoTrabalhoValidator();
        $request = Request::create('/', 'POST', [
            'data_inicio' => null,
            'ciencia' => false,
        ]);

        expect(fn () => $validator->validarFormalizar($request))
            ->toThrow(ValidationException::class);
    });

    test('rejeita data fim anterior à data início', function () {
        $validator = new DispensaPlanoTrabalhoValidator();
        $request = Request::create('/', 'POST', [
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-04-01',
            'ciencia' => true,
        ]);

        expect(fn () => $validator->validarFormalizar($request))
            ->toThrow(ValidateException::class, 'A data de fim da dispensa não pode ser anterior à data de início.');
    });

    test('aceita formalização com data fim nula', function () {
        $validator = new DispensaPlanoTrabalhoValidator();
        $request = Request::create('/', 'POST', [
            'data_inicio' => '2026-01-15',
            'ciencia' => '1',
        ]);

        $dados = $validator->validarFormalizar($request);

        expect($dados['data_inicio'])->toBe('2026-01-15')
            ->and($dados['data_fim'])->toBeNull()
            ->and($dados['ciencia'])->toBeTrue();
    });

    test('exige ciência para encerrar', function () {
        $validator = new DispensaPlanoTrabalhoValidator();
        $request = Request::create('/', 'POST', ['ciencia' => false]);

        expect(fn () => $validator->validarEncerrar($request))
            ->toThrow(ValidationException::class);
    });
});

describe('DispensaPlanoTrabalho::isVigente', function () {

    test('vigente quando início passou e fim é nulo', function () {
        $dispensa = new \App\Models\DispensaPlanoTrabalho();
        $dispensa->data_inicio = '2026-01-01';
        $dispensa->data_fim = null;

        expect($dispensa->isVigente(\Carbon\Carbon::parse('2026-08-24')))->toBeTrue();
    });

    test('não vigente antes da data de início', function () {
        $dispensa = new \App\Models\DispensaPlanoTrabalho();
        $dispensa->data_inicio = '2026-09-01';
        $dispensa->data_fim = null;

        expect($dispensa->isVigente(\Carbon\Carbon::parse('2026-08-24')))->toBeFalse();
    });

    test('vigente no dia da data_fim inclusive', function () {
        $dispensa = new \App\Models\DispensaPlanoTrabalho();
        $dispensa->data_inicio = '2026-01-01';
        $dispensa->data_fim = '2026-08-24';

        expect($dispensa->isVigente(\Carbon\Carbon::parse('2026-08-24')))->toBeTrue()
            ->and($dispensa->isVigente(\Carbon\Carbon::parse('2026-08-25')))->toBeFalse();
    });
});

describe('Usuario::dispensa_pt_vigente', function () {

    test('não consulta o banco quando a relação não está carregada', function () {
        $usuario = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $usuario->shouldReceive('relationLoaded')->with('dispensaPlanoTrabalho')->andReturn(false);
        $usuario->shouldReceive('dispensaPlanoTrabalho')->never();

        expect($usuario->dispensa_pt_vigente)->toBeFalse();
    });

    test('avalia vigência quando a relação está carregada', function () {
        $dispensa = new \App\Models\DispensaPlanoTrabalho();
        $dispensa->data_inicio = '2026-01-01';
        $dispensa->data_fim = null;

        $usuario = new \App\Models\Usuario();
        $usuario->setRelation('dispensaPlanoTrabalho', $dispensa);

        expect($usuario->dispensa_pt_vigente)->toBeTrue();
    });
});
