<?php

use App\Cache\GestorHierarquiaCache;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    Cache::flush();
});

describe('GestorHierarquiaCache: isolamento de chaves', function () {

    test('filhas diretas e subordinadas recursivas não colidem para a mesma unidade', function () {
        $unidadeId = 'unidade-x';

        $diretas = GestorHierarquiaCache::getSubordinadasDiretas($unidadeId, fn () => ['filha-direta']);
        $recursivas = GestorHierarquiaCache::getSubordinadasRecursivas($unidadeId, fn () => ['filha-direta', 'neta', 'bisneta']);

        // Cada caso de uso mantém seu próprio valor — a chave de um não sobrescreve a do outro.
        expect($diretas)->toBe(['filha-direta']);
        expect($recursivas)->toBe(['filha-direta', 'neta', 'bisneta']);

        // Releitura pós-cache confirma que ambos persistem separadamente.
        $diretasCache = GestorHierarquiaCache::getSubordinadasDiretas($unidadeId, fn () => ['NAO_CHAMAR']);
        $recursivasCache = GestorHierarquiaCache::getSubordinadasRecursivas($unidadeId, fn () => ['NAO_CHAMAR']);

        expect($diretasCache)->toBe(['filha-direta']);
        expect($recursivasCache)->toBe(['filha-direta', 'neta', 'bisneta']);
    });

    test('cachear as recursivas primeiro não contamina as filhas diretas', function () {
        $unidadeId = 'unidade-y';

        GestorHierarquiaCache::getSubordinadasRecursivas($unidadeId, fn () => ['a', 'b', 'c']);

        // O loader das diretas DEVE ser executado (chave distinta, não veio da recursiva).
        $diretas = GestorHierarquiaCache::getSubordinadasDiretas($unidadeId, fn () => ['a']);

        expect($diretas)->toBe(['a']);
    });
});
