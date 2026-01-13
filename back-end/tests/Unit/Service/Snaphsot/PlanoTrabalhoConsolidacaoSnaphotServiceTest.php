<?php

use App\Services\Snapshot\PlanoTrabalhoConsolidacaoSnapshotService;
use App\Services\Snapshot\SnapshotCreatorInterface;

uses(Tests\TestCase::class);

beforeEach(function () {
    $this->mockCreator = Mockery::mock(SnapshotCreatorInterface::class);
    $this->consolidacaoId = 'test-consolidacao-id';
    $this->dataConclusao = new DateTime('2026-01-01');
});

test('cria snapshots para atividades quando dados fornecidos', function () {
    $dados = [
        'atividades' => [
            ['id' => 'atividade-1'],
            ['id' => 'atividade-2']
        ]
    ];

    // Mock do creator para atividades
    $mockCreator = Mockery::mock(SnapshotCreatorInterface::class);
    $mockCreator->shouldReceive('create')
        ->with('atividade-1', $this->consolidacaoId, $this->dataConclusao)
        ->once();
    $mockCreator->shouldReceive('create')
        ->with('atividade-2', $this->consolidacaoId, $this->dataConclusao)
        ->once();

    // Inject mock creator
    $service = new class($mockCreator) extends PlanoTrabalhoConsolidacaoSnapshotService {
        public function __construct($mockCreator) {
            $this->creators = ['atividades' => $mockCreator];
        }
    };

    $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);
});

test('cria snapshots para afastamentos quando dados fornecidos', function () {
    $dados = [
        'afastamentos' => [
            ['id' => 'afastamento-1']
        ]
    ];

    $mockCreator = Mockery::mock(SnapshotCreatorInterface::class);
    $mockCreator->shouldReceive('create')
        ->with('afastamento-1', $this->consolidacaoId, $this->dataConclusao)
        ->once();

    $service = new class($mockCreator) extends PlanoTrabalhoConsolidacaoSnapshotService {
        public function __construct($mockCreator) {
            $this->creators = ['afastamentos' => $mockCreator];
        }
    };

    $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);
});

test('cria snapshots para ocorrencias quando dados fornecidos', function () {
    $dados = [
        'ocorrencias' => [
            ['id' => 'ocorrencia-1']
        ]
    ];

    $mockCreator = Mockery::mock(SnapshotCreatorInterface::class);
    $mockCreator->shouldReceive('create')
        ->with('ocorrencia-1', $this->consolidacaoId, $this->dataConclusao)
        ->once();

    $service = new class($mockCreator) extends PlanoTrabalhoConsolidacaoSnapshotService {
        public function __construct($mockCreator) {
            $this->creators = ['ocorrencias' => $mockCreator];
        }
    };

    $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);
});

test('não cria snapshots quando dados não fornecidos', function () {
    $dados = [];

    $mockCreator = Mockery::mock(SnapshotCreatorInterface::class);
    $mockCreator->shouldNotReceive('create');

    $service = new class($mockCreator) extends PlanoTrabalhoConsolidacaoSnapshotService {
        public function __construct($mockCreator) {
            $this->creators = ['atividades' => $mockCreator];
        }
    };

    $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);
});

test('processa múltiplos tipos de dados simultaneamente', function () {
    $dados = [
        'atividades' => [['id' => 'atividade-1']],
        'afastamentos' => [['id' => 'afastamento-1']],
        'ocorrencias' => [['id' => 'ocorrencia-1']]
    ];

    $mockAtividade = Mockery::mock(SnapshotCreatorInterface::class);
    $mockAfastamento = Mockery::mock(SnapshotCreatorInterface::class);
    $mockOcorrencia = Mockery::mock(SnapshotCreatorInterface::class);

    $mockAtividade->shouldReceive('create')->once();
    $mockAfastamento->shouldReceive('create')->once();
    $mockOcorrencia->shouldReceive('create')->once();

    $service = new class($mockAtividade, $mockAfastamento, $mockOcorrencia) extends PlanoTrabalhoConsolidacaoSnapshotService {
        public function __construct($mockAtividade, $mockAfastamento, $mockOcorrencia) {
            $this->creators = [
                'atividades' => $mockAtividade,
                'afastamentos' => $mockAfastamento,
                'ocorrencias' => $mockOcorrencia
            ];
        }
    };

    $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);
});
