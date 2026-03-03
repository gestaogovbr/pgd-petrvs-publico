<?php

use App\Repository\TipoModalidadeRepository;
use App\Models\TipoModalidade;
use Illuminate\Support\Facades\DB;

test('pode obter o ID padrao da modalidade', function () {
    $id = 'modalidade-teste-' . uniqid();
    
    DB::table('tipos_modalidades')->insert([
        'id' => $id,
        'nome' => 'Modalidade Teste',
        'exige_pedagio' => 0,
        'plano_trabalho_calcula_horas' => 1,
        'atividade_tempo_despendido' => 1,
        'atividade_esforco' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $repository = app(TipoModalidadeRepository::class);
    
    $result = $repository->getDefaultId();
    
    expect($result)->not->toBeNull();
});

test('retorna null se nao houver modalidades', function () {
    DB::table('tipos_modalidades')->delete();
    
    $repository = app(TipoModalidadeRepository::class);
    
    expect($repository->getDefaultId())->toBeNull();
});
