<?php

use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\Modalidades\DataProviders\ModalidadesPorUnidadeDataProvider;

beforeEach(function () {
    $this->provider = app(ModalidadesPorUnidadeDataProvider::class);

    $this->unidadePai = Unidade::factory()->create();
    $this->filha1 = Unidade::factory()->create(['unidade_pai_id' => $this->unidadePai->id]);
    $this->filha2 = Unidade::factory()->create(['unidade_pai_id' => $this->unidadePai->id]);

    $this->filtros = new FiltrosPainelDTO(
        tipoConsulta: 'situacao_atual',
        unidadeId: $this->unidadePai->id,
        dataInicio: null,
        dataFim: null,
    );
});

describe('ModalidadesPorUnidadeDataProvider - segmentos', function () {

    test('retorna segmentos correspondentes às modalidades PGD', function () {
        $resultado = $this->provider->getData($this->filtros);

        expect($resultado->segmentos)->toBe([
            'Presencial',
            'Teletrabalho Parcial',
            'Teletrabalho Integral',
            'Teletrabalho no Exterior (Substituição- VIII, art. 12, D. 11.072/22)',
            'Teletrabalho no Exterior (Discricionária- §7º, art. 12, D. 11.072/22)',
        ]);
    });
});

describe('ModalidadesPorUnidadeDataProvider - distribuição', function () {

    test('retorna distribuição zerada quando não há usuários', function () {
        $resultado = $this->provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->unidadeId)->toBe($this->unidadePai->id);
        expect($principal->valores)->toBe([0, 0, 0, 0, 0]);
        expect($principal->total)->toBe(0);
    });

    test('conta usuários por modalidade corretamente', function () {
        $u1 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        $u2 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        $u3 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'parcial']);

        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u1->id, $this->unidadePai->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u2->id, $this->unidadePai->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u3->id, $this->unidadePai->id)->create();

        $resultado = $this->provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->valores[0])->toBe(2); // presencial
        expect($principal->valores[1])->toBe(1); // parcial
        expect($principal->total)->toBe(3);
    });

    test('inclui usuários com qualquer atribuição na unidade', function () {
        $lotado = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        $colaborador = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'parcial']);
        $gestor = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'integral']);

        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($lotado->id, $this->unidadePai->id)->create();
        UnidadeIntegranteAtribuicao::factory()->colaborador()->paraUsuarioUnidade($colaborador->id, $this->unidadePai->id)->create();
        UnidadeIntegranteAtribuicao::factory()->gestor()->paraUsuarioUnidade($gestor->id, $this->unidadePai->id)->create();

        $resultado = $this->provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->total)->toBe(3);
    });

    test('exclui usuários com participa_pgd não', function () {
        $participante = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        $naoParticipante = Usuario::factory()->create(['participa_pgd' => 'não', 'modalidade_pgd' => 'presencial']);

        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($participante->id, $this->unidadePai->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($naoParticipante->id, $this->unidadePai->id)->create();

        $resultado = $this->provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->total)->toBe(1);
        expect($principal->valores[0])->toBe(1); // presencial
    });

    test('exclui usuários soft-deleted', function () {
        $ativo = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        $deletado = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);

        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($ativo->id, $this->unidadePai->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($deletado->id, $this->unidadePai->id)->create();

        $deletado->delete();

        $resultado = $this->provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->total)->toBe(1);
    });

    test('consolida subordinadas recursivas na contagem da unidade pai', function () {
        $neta = Unidade::factory()->create(['unidade_pai_id' => $this->filha1->id]);

        $u1 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        $u2 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'parcial']);
        $u3 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'integral']);

        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u1->id, $this->unidadePai->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u2->id, $this->filha1->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u3->id, $neta->id)->create();

        $resultado = $this->provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->total)->toBe(3);
        expect($principal->valores[0])->toBe(1); // presencial
        expect($principal->valores[1])->toBe(1); // parcial
        expect($principal->valores[2])->toBe(1); // integral
    });

    test('gera distribuição individual para cada filha direta', function () {
        $u1 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        $u2 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'parcial']);

        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u1->id, $this->filha1->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u2->id, $this->filha2->id)->create();

        $resultado = $this->provider->getData($this->filtros);

        expect($resultado->distribuicoes)->toHaveCount(3);

        $distFilha1 = collect($resultado->distribuicoes)->first(fn ($d) => $d->unidadeId === $this->filha1->id);
        $distFilha2 = collect($resultado->distribuicoes)->first(fn ($d) => $d->unidadeId === $this->filha2->id);

        expect($distFilha1->valores[0])->toBe(1); // presencial
        expect($distFilha1->total)->toBe(1);
        expect($distFilha2->valores[1])->toBe(1); // parcial
        expect($distFilha2->total)->toBe(1);
    });

    test('ordena subordinadas por total decrescente mantendo a principal fixa', function () {
        $u1 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        $u2 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        $u3 = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);

        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u1->id, $this->filha1->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u2->id, $this->filha2->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($u3->id, $this->filha2->id)->create();

        $resultado = $this->provider->getData($this->filtros);

        expect($resultado->distribuicoes[0]->unidadeId)->toBe($this->unidadePai->id);
        expect($resultado->distribuicoes[1]->total)->toBeGreaterThanOrEqual($resultado->distribuicoes[2]->total);
    });

    test('não conta usuário sem atribuição em nenhuma unidade', function () {
        $semVinculo = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        // Sem criar UnidadeIntegranteAtribuicao

        $resultado = $this->provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->total)->toBe(0);
    });
});
