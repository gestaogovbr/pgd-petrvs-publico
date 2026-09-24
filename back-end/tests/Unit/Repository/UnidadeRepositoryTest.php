<?php

namespace Tests\Unit\Repository;

use App\Models\Unidade;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;
use App\Repository\UnidadeRepository;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('UnidadeRepository - findBySigla', function () {
    it('delegates to read repository', function () {
        $read = Mockery::mock(UnidadeReadRepositoryContract::class);
        $write = Mockery::mock(UnidadeWriteRepositoryContract::class);

        $unidade = new Unidade();
        $unidade->id = 'u-1';
        $unidade->sigla = 'ABC';

        $read->shouldReceive('findBySigla')->once()->with('ABC')->andReturn($unidade);

        $repo = new UnidadeRepository($read, $write);
        $result = $repo->findBySigla('ABC');

        expect($result)->toBe($unidade);
    });
});

describe('UnidadeRepository - idsNaHierarquiaDe', function () {
    it('delegates to read repository', function () {
        $read = Mockery::mock(UnidadeReadRepositoryContract::class);
        $write = Mockery::mock(UnidadeWriteRepositoryContract::class);

        $read->shouldReceive('idsNaHierarquiaDe')
            ->once()
            ->with(['u-1'])
            ->andReturn(['u-1', 'u-2']);

        $repo = new UnidadeRepository($read, $write);

        expect($repo->idsNaHierarquiaDe(['u-1']))->toBe(['u-1', 'u-2']);
    });
});

