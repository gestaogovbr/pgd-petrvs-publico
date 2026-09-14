<?php

use App\Jobs\MarcarUnidadesAntigasJob;
use App\Models\Unidade;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
function configurarCodigoOrgaoTeste(string $codigo): void
{
    tenant()->integracao_siape_codorgao = $codigo;
    tenant()->save();
    config()->set('integracao.siape.codOrgao', $codigo);
}

it('permite o mesmo código de unidade em órgãos diferentes', function () {
    configurarCodigoOrgaoTeste('20000');
    $legada = Unidade::factory()->create(['codigo' => '1234']);

    configurarCodigoOrgaoTeste('30212');
    $atual = Unidade::factory()->create(['codigo' => '1234']);

    expect($legada->id)->not->toBe($atual->id)
        ->and($legada->codigo_orgao)->toBe('20000')
        ->and($atual->codigo_orgao)->toBe('30212');
});

it('rejeita duplicidade da chave composta', function () {
    configurarCodigoOrgaoTeste('30212');
    Unidade::factory()->create(['codigo' => '5678']);

    Unidade::factory()->create(['codigo' => '5678']);
})->throws(QueryException::class);

it('não aceita código do órgão nulo', function () {
    $unidade = Unidade::factory()->create(['codigo' => '9012']);

    DB::table('unidades')->where('id', $unidade->id)->update(['codigo_orgao' => null]);
})->throws(QueryException::class);

it('marca somente unidades do código anterior e é idempotente', function () {
    configurarCodigoOrgaoTeste('20000');
    $legada = Unidade::factory()->create(['codigo' => '100']);

    configurarCodigoOrgaoTeste('30212');
    $atual = Unidade::factory()->create(['codigo' => '100']);

    $job = new MarcarUnidadesAntigasJob((string) tenant('id'), '20000', '30212');
    $job->handle();
    $job->handle();

    expect((bool) DB::table('unidades')->where('id', $legada->id)->value('unidade_antiga'))->toBeTrue()
        ->and((bool) DB::table('unidades')->where('id', $atual->id)->value('unidade_antiga'))->toBeFalse();
});
