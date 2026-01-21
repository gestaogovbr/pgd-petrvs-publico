<?php

use App\Services\Snapshot\Creator\PlanoTrabalhoConsolidacaoSnapshotCreatorService;
use App\Services\Snapshot\Creator\SnapshotCreatorInterface;

uses(Tests\TestCase::class);

class ValidSnapshotCreator implements SnapshotCreatorInterface
{
    public $createdIds = [];

    public function create(string $entityId, string $consolidacaoId, $dataConclusao): void
    {
        $this->createdIds[] = $entityId;
    }
}

class InvalidSnapshotCreator
{
    public function create(string $entityId, string $consolidacaoId, $dataConclusao): void
    {
        // Implementação inválida
    }
}


describe('implementação genérica', function () {
    beforeEach(function () {
        $this->consolidacaoId = 'test-consolidacao-id';
        $this->dataConclusao = new \DateTime('2026-01-01');
    });

    test('aceita creators que implementam a interface', function () {
        $validCreator = new ValidSnapshotCreator();
        $creators = ['atividades' => $validCreator];

        $service = new PlanoTrabalhoConsolidacaoSnapshotCreatorService($creators);

        expect($service)->toBeInstanceOf(PlanoTrabalhoConsolidacaoSnapshotCreatorService::class);
    });

    test('lança TypeError para creators que não implementam a interface', function () {
        $invalidCreator = new InvalidSnapshotCreator();
        $creators = ['atividades' => $invalidCreator];

        expect(fn() => new PlanoTrabalhoConsolidacaoSnapshotCreatorService($creators))
            ->toThrow(\TypeError::class);
    });

    test('passa corretamente os IDs dos dados para o método create', function () {
        $validCreator = new ValidSnapshotCreator();
        $creators = ['atividades' => $validCreator];

        $service = new PlanoTrabalhoConsolidacaoSnapshotCreatorService($creators);

        $dados = [
            'atividades' => [
                ['id' => 'atividade-1', 'nome' => 'Atividade 1'],
                ['id' => 'atividade-2', 'nome' => 'Atividade 2'],
                ['id' => 'atividade-3', 'nome' => 'Atividade 3']
            ]
        ];

        $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);

        expect($validCreator->createdIds)->toHaveCount(3);
        expect($validCreator->createdIds)->toContain('atividade-1');
        expect($validCreator->createdIds)->toContain('atividade-2');
        expect($validCreator->createdIds)->toContain('atividade-3');
    });

    test('processa múltiplos tipos de dados e passa IDs corretos', function () {
        $atividadeCreator = new ValidSnapshotCreator();
        $afastamentoCreator = new ValidSnapshotCreator();

        $creators = [
            'atividades' => $atividadeCreator,
            'afastamentos' => $afastamentoCreator
        ];

        $service = new PlanoTrabalhoConsolidacaoSnapshotCreatorService($creators);

        $dados = [
            'atividades' => [
                ['id' => 'atividade-1'],
                ['id' => 'atividade-2']
            ],
            'afastamentos' => [
                ['id' => 'afastamento-1']
            ]
        ];

        $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);

        expect($atividadeCreator->createdIds)->toHaveCount(2);
        expect($atividadeCreator->createdIds)->toContain('atividade-1');
        expect($atividadeCreator->createdIds)->toContain('atividade-2');

        expect($afastamentoCreator->createdIds)->toHaveCount(1);
        expect($afastamentoCreator->createdIds)->toContain('afastamento-1');
    });

    test('ignora chaves de dados que não têm creator correspondente', function () {
        $atividadeCreator = new ValidSnapshotCreator();
        $creators = ['atividades' => $atividadeCreator];

        $service = new PlanoTrabalhoConsolidacaoSnapshotCreatorService($creators);

        $dados = [
            'atividades' => [['id' => 'atividade-1']],
            'inexistente' => [['id' => 'inexistente-1']] // Esta chave será ignorada
        ];

        $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);

        expect($atividadeCreator->createdIds)->toHaveCount(1);
        expect($atividadeCreator->createdIds)->toContain('atividade-1');
    });

    test('lança TypeError quando dados não são array', function () {
        $validCreator = new ValidSnapshotCreator();
        $creators = ['atividades' => $validCreator];

        $service = new PlanoTrabalhoConsolidacaoSnapshotCreatorService($creators);

        $dados = [
            'atividades' => 'string-instead-of-array'
        ];

        expect(fn() => $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao))
            ->toThrow(\TypeError::class);
    });
});

describe('simulação do fluxo existente em PlanoTrabalhoConsolidacaoService#concluir', function () {
    class AtividadeSnapshotCreator implements SnapshotCreatorInterface
    {
        public $createdSnapshots = [];

        public function create(string $entityId, string $consolidacaoId, $dataConclusao): void
        {
            $this->createdSnapshots[] = [
                'type' => 'atividade',
                'entity_id' => $entityId,
                'consolidacao_id' => $consolidacaoId,
                'data_conclusao' => $dataConclusao
            ];
        }
    }

    class AfastamentoSnapshotCreator implements SnapshotCreatorInterface
    {
        public $createdSnapshots = [];

        public function create(string $entityId, string $consolidacaoId, $dataConclusao): void
        {
            $this->createdSnapshots[] = [
                'type' => 'afastamento',
                'entity_id' => $entityId,
                'consolidacao_id' => $consolidacaoId,
                'data_conclusao' => $dataConclusao
            ];
        }
    }

    class OcorrenciaSnapshotCreator implements SnapshotCreatorInterface
    {
        public $createdSnapshots = [];

        public function create(string $entityId, string $consolidacaoId, $dataConclusao): void
        {
            $this->createdSnapshots[] = [
                'type' => 'ocorrencia',
                'entity_id' => $entityId,
                'consolidacao_id' => $consolidacaoId,
                'data_conclusao' => $dataConclusao
            ];
        }
    }

    beforeEach(function () {
        $this->consolidacaoId = 'consolidacao-123';
        $this->dataConclusao = new \DateTime('2026-01-15 10:00:00');
    });

    test('estrutura real de creators funciona corretamente', function () {
        // Imita exatamente a estrutura do PlanoTrabalhoConsolidacaoService
        $snapshotCreators = [
            'atividades' => new AtividadeSnapshotCreator(),
            'afastamentos' => new AfastamentoSnapshotCreator(),
            'ocorrencias' => new OcorrenciaSnapshotCreator()
        ];

        $service = new PlanoTrabalhoConsolidacaoSnapshotCreatorService($snapshotCreators);

        expect($service)->toBeInstanceOf(PlanoTrabalhoConsolidacaoSnapshotCreatorService::class);
    });

    test('processa dados reais de consolidação com estrutura completa', function () {
        $atividadeCreator = new AtividadeSnapshotCreator();
        $afastamentoCreator = new AfastamentoSnapshotCreator();
        $ocorrenciaCreator = new OcorrenciaSnapshotCreator();

        $snapshotCreators = [
            'atividades' => $atividadeCreator,
            'afastamentos' => $afastamentoCreator,
            'ocorrencias' => $ocorrenciaCreator
        ];

        $service = new PlanoTrabalhoConsolidacaoSnapshotCreatorService($snapshotCreators);

        // Dados que imitam a estrutura real do $dados do PlanoTrabalhoConsolidacaoService
        $dados = [
            'atividades' => [
                ['id' => 'atividade-1', 'descricao' => 'Atividade 1', 'tempo_planejado' => 120],
                ['id' => 'atividade-2', 'descricao' => 'Atividade 2', 'tempo_planejado' => 180]
            ],
            'afastamentos' => [
                ['id' => 'afastamento-1', 'data_inicio' => '2026-01-01', 'data_fim' => '2026-01-05']
            ],
            'ocorrencias' => [
                ['id' => 'ocorrencia-1', 'descricao' => 'Ocorrência teste', 'data_inicio' => '2026-01-10']
            ]
        ];

        $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);

        expect($atividadeCreator->createdSnapshots)->toHaveCount(2);
        expect($atividadeCreator->createdSnapshots[0]['entity_id'])->toBe('atividade-1');
        expect($atividadeCreator->createdSnapshots[1]['entity_id'])->toBe('atividade-2');
        expect($atividadeCreator->createdSnapshots[0]['consolidacao_id'])->toBe($this->consolidacaoId);

        expect($afastamentoCreator->createdSnapshots)->toHaveCount(1);
        expect($afastamentoCreator->createdSnapshots[0]['entity_id'])->toBe('afastamento-1');
        expect($afastamentoCreator->createdSnapshots[0]['type'])->toBe('afastamento');

        expect($ocorrenciaCreator->createdSnapshots)->toHaveCount(1);
        expect($ocorrenciaCreator->createdSnapshots[0]['entity_id'])->toBe('ocorrencia-1');
        expect($ocorrenciaCreator->createdSnapshots[0]['type'])->toBe('ocorrencia');
    });

    test('funciona com dados parciais como no cenário real', function () {
        $atividadeCreator = new AtividadeSnapshotCreator();
        $afastamentoCreator = new AfastamentoSnapshotCreator();
        $ocorrenciaCreator = new OcorrenciaSnapshotCreator();

        $snapshotCreators = [
            'atividades' => $atividadeCreator,
            'afastamentos' => $afastamentoCreator,
            'ocorrencias' => $ocorrenciaCreator
        ];

        $service = new PlanoTrabalhoConsolidacaoSnapshotCreatorService($snapshotCreators);

        // Cenário onde só há atividades (comum no sistema real)
        $dados = [
            'atividades' => [
                ['id' => 'atividade-1'],
                ['id' => 'atividade-2'],
                ['id' => 'atividade-3']
            ]
            // afastamentos e ocorrencias podem estar vazios ou ausentes
        ];

        $service->createSnapshots($dados, $this->consolidacaoId, $this->dataConclusao);

        expect($atividadeCreator->createdSnapshots)->toHaveCount(3);
        expect($afastamentoCreator->createdSnapshots)->toHaveCount(0);
        expect($ocorrenciaCreator->createdSnapshots)->toHaveCount(0);
    });

    test('integração com estrutura exata do PlanoTrabalhoConsolidacaoService', function () {
        // Simula exatamente como é usado no método concluir()
        $snapshotCreators = [
            'atividades' => new AtividadeSnapshotCreator(),
            'afastamentos' => new AfastamentoSnapshotCreator(),
            'ocorrencias' => new OcorrenciaSnapshotCreator()
        ];

        $service = new PlanoTrabalhoConsolidacaoSnapshotCreatorService($snapshotCreators);

        $dados = [
            'programa' => (object)['id' => 'programa-1'],
            'planoTrabalho' => (object)['id' => 'plano-1', 'unidade_id' => 'unidade-1'],
            'atividades' => [
                ['id' => 'atividade-1', 'plano_trabalho_entrega_id' => 'entrega-1'],
                ['id' => 'atividade-2', 'plano_trabalho_entrega_id' => 'entrega-2']
            ],
            'afastamentos' => [
                ['id' => 'afastamento-1', 'usuario_id' => 'usuario-1']
            ],
            'ocorrencias' => [
                ['id' => 'ocorrencia-1', 'plano_trabalho_id' => 'plano-1']
            ],
            'status' => 'INCLUIDO',
            'justificativa_conclusao' => null
        ];

        $dataConclusao = new \DateTime();
        $consolidacaoId = 'real-consolidacao-id';

        $service->createSnapshots($dados, $consolidacaoId, $dataConclusao);

        // Verifica que todos os IDs foram processados corretamente
        $atividadeCreator = $snapshotCreators['atividades'];
        $afastamentoCreator = $snapshotCreators['afastamentos'];
        $ocorrenciaCreator = $snapshotCreators['ocorrencias'];

        expect($atividadeCreator->createdSnapshots)->toHaveCount(2);
        expect($afastamentoCreator->createdSnapshots)->toHaveCount(1);
        expect($ocorrenciaCreator->createdSnapshots)->toHaveCount(1);

        // Verifica que os parâmetros corretos foram passados
        expect($atividadeCreator->createdSnapshots[0]['consolidacao_id'])->toBe($consolidacaoId);
        expect($atividadeCreator->createdSnapshots[0]['data_conclusao'])->toBe($dataConclusao);
    });
});