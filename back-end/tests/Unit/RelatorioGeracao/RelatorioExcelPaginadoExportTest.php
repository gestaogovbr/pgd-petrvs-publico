<?php

use App\Exports\RelatorioExcelPaginadoExport;
use App\Exports\RelatorioPlanoTrabalhoExport;
use Illuminate\Support\Collection;

test('export paginado percorre as páginas e mapeia cada linha', function () {
    $pages = [
        1 => [
            'count' => 3,
            'rows' => collect([
                (object) ['id' => 'a'],
                (object) ['id' => 'b'],
            ]),
        ],
        2 => [
            'count' => 3,
            'rows' => collect([
                (object) ['id' => 'c'],
            ]),
        ],
    ];

    $export = new class {
        public int $totalRows = 0;
        public function setTotalRows(int $totalRows): self
        {
            $this->totalRows = $totalRows;
            return $this;
        }
        public function map($row): array
        {
            return [$row->id];
        }
        public function headings(): array
        {
            return ['ID'];
        }
    };

    $calls = [];
    $paginado = new RelatorioExcelPaginadoExport(
        $export,
        function (int $page, int $limit) use ($pages, &$calls) {
            $calls[] = [$page, $limit];
            return $pages[$page] ?? ['count' => 3, 'rows' => collect()];
        },
        2
    );

    $ids = [];
    foreach ($paginado->generator() as $row) {
        $ids[] = $row->id;
    }

    expect($ids)->toBe(['a', 'b', 'c'])
        ->and($calls)->toBe([[1, 2], [2, 2]])
        ->and($export->totalRows)->toBe(3)
        ->and($paginado->map((object) ['id' => 'x']))->toBe(['x'])
        ->and($paginado->headings())->toBe(['ID']);
});

test('export paginado informa o progresso pelas linhas geradas', function () {
    $progresso = [];
    $paginado = new RelatorioExcelPaginadoExport(
        new class {
            public function setTotalRows(int $totalRows): void {}
            public function map($row): array { return []; }
            public function headings(): array { return []; }
        },
        function (int $page): array {
            return match ($page) {
                1 => ['count' => 3, 'rows' => collect([1, 2])],
                default => ['count' => 3, 'rows' => collect([3])],
            };
        },
        2,
        function (int $processadas, ?int $total) use (&$progresso): void {
            $progresso[] = [$processadas, $total];
        }
    );

    iterator_to_array($paginado->generator());

    expect($progresso)->toBe([[2, 3], [3, 3]]);
});

test('export paginado não conta página extra quando o total é múltiplo do tamanho', function () {
    $progresso = [];
    $chamadas = 0;
    $paginado = new RelatorioExcelPaginadoExport(
        new class {
            public function setTotalRows(int $totalRows): void {}
            public function map($row): array { return []; }
            public function headings(): array { return []; }
        },
        function (int $page) use (&$chamadas): array {
            $chamadas++;
            return match ($page) {
                1 => ['count' => 4, 'rows' => collect([1, 2])],
                2 => ['count' => 4, 'rows' => collect([3, 4])],
                default => ['count' => 4, 'rows' => collect()],
            };
        },
        2,
        function (int $processadas, ?int $total) use (&$progresso): void {
            $progresso[] = [$processadas, $total];
        }
    );

    iterator_to_array($paginado->generator());

    expect($chamadas)->toBe(2)
        ->and($progresso)->toBe([[2, 4], [4, 4]]);
});

test('export paginado define total de linhas no export de PT', function () {
    $inner = new RelatorioPlanoTrabalhoExport(new Collection());
    $paginado = new RelatorioExcelPaginadoExport(
        $inner,
        fn () => ['count' => 12, 'rows' => collect()],
        500
    );

    iterator_to_array($paginado->generator());

    $reflection = new ReflectionClass($inner);
    $property = $reflection->getProperty('totalRows');
    $property->setAccessible(true);

    expect($property->getValue($inner))->toBe(12);
});
