<?php

use App\Models\Unidade;
use App\Services\UnidadeService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

describe('UnidadeService (Integration)', function () {

    beforeEach(function () {
        config(['database.default' => 'tenant']);
        DB::setDefaultConnection('tenant');
        $this->entidadeId = Str::uuid()->toString();

        try {
            DB::connection('tenant')->table('entidades')->insert([
                'id' => $this->entidadeId,
                'sigla' => 'ENT',
                'nome' => 'Entidade Teste',
                'abrangencia' => 'NACIONAL',
                'carga_horaria_padrao' => 8,
                'gravar_historico_processo' => 0,
                'layout_formulario_atividade' => 'COMPLETO',
                'forma_contagem_carga_horaria' => 'DIA',
                'expediente' => json_encode(['domingo'=>[],'segunda'=>[],'terca'=>[],'quarta'=>[],'quinta'=>[],'sexta'=>[],'sabado'=>[],'especial'=>[]]),
                'habilitar_relatos_siape' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    });

    test('unidadesFilhas retorna descendentes corretamente usando unidade_pai_id', function () {
        $service = new UnidadeService();

        // Helper to create unit
        $createUnit = function($name, $parentId = null) {
            $u = new Unidade();
            $u->setConnection('tenant');
            $u->forceFill([
                'id' => Str::uuid()->toString(),
                'nome' => $name,
                'codigo' => strtoupper($name),
                'sigla' => strtoupper($name),
                'instituidora' => 0,
                'atividades_arquivamento_automatico' => 0,
                'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
                'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
                'executora' => true,
                'informal' => 0,
                'entidade_id' => $this->entidadeId,
                'unidade_pai_id' => $parentId
            ])->save();
            return $u;
        };

        $root = $createUnit('Root');
        $child = $createUnit('Child', $root->id);
        $grandchild = $createUnit('Grandchild', $child->id);

        // Test unidadesFilhas(Root) -> should return [Child, Grandchild]
        $filhas = $service->unidadesFilhas($root->id);
        expect($filhas)->toContain($child->id);
        expect($filhas)->toContain($grandchild->id);
        expect($filhas)->not->toContain($root->id);

        // Test unidadesFilhas(Child) -> should return [Grandchild]
        $filhasChild = $service->unidadesFilhas($child->id);
        expect($filhasChild)->toContain($grandchild->id);
        expect($filhasChild)->not->toContain($child->id);
        expect($filhasChild)->not->toContain($root->id);

        // Test unidadesFilhas(Grandchild) -> should return []
        $filhasGrandchild = $service->unidadesFilhas($grandchild->id);
        expect($filhasGrandchild)->toBeEmpty();
    });

    test('linhaAscendente retorna caminho até a raiz', function () {
        $service = new UnidadeService();

        // Helper to create unit
        $createUnit = function($name, $parentId = null) {
            $u = new Unidade();
            $u->setConnection('tenant');
            $u->forceFill([
                'id' => Str::uuid()->toString(),
                'nome' => $name,
                'codigo' => strtoupper($name),
                'sigla' => strtoupper($name),
                'instituidora' => 0,
                'atividades_arquivamento_automatico' => 0,
                'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
                'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
                'executora' => true,
                'informal' => 0,
                'entidade_id' => $this->entidadeId,
                'unidade_pai_id' => $parentId
            ])->save();
            return $u;
        };

        $root = $createUnit('Root');
        $child = $createUnit('Child', $root->id);
        $grandchild = $createUnit('Grandchild', $child->id);

        // Test linhaAscendente(Grandchild) -> should return [Root, Child, Grandchild]
        $linha = $service->linhaAscendente($grandchild->id);
        
        // Note: linhaAscendente returns [Root, Child, Grandchild] based on array_reverse
        expect($linha)->toBe([$root->id, $child->id, $grandchild->id]);

        // Test linhaAscendente(Root) -> should return [Root]
        $linhaRoot = $service->linhaAscendente($root->id);
        expect($linhaRoot)->toBe([$root->id]);
    });

});
