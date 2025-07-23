<?php

use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Traits\Version;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    use Version;

    public function up(): void
    {
        DB::statement("CREATE TABLE IF NOT EXISTS unidades_integrantes_old LIKE unidades_integrantes");
        DB::statement("INSERT INTO unidades_integrantes_old SELECT * FROM unidades_integrantes");

        DB::statement("CREATE TABLE IF NOT EXISTS unidades_integrantes_atribuicoes_old LIKE unidades_integrantes_atribuicoes");
        DB::statement("INSERT INTO unidades_integrantes_atribuicoes_old SELECT * FROM unidades_integrantes_atribuicoes");

        DB::statement("DELETE FROM unidades_integrantes_atribuicoes WHERE deleted_at IS NOT NULL");
        DB::statement("DELETE FROM unidades_integrantes WHERE deleted_at IS NOT NULL");
        
        $duplicates = DB::select(
            "SELECT *
            FROM unidades_integrantes ui
            WHERE (usuario_id, unidade_id) IN (
                SELECT usuario_id, unidade_id
                FROM unidades_integrantes
                where deleted_at IS NULL 
                GROUP BY usuario_id, unidade_id
                HAVING COUNT(*) > 1
            )
            ORDER BY updated_at DESC
            "
        );

        $maintain = [];
        $remove = [];
        foreach ($duplicates as $duplicate) {
            if (!isset($maintain[$duplicate->usuario_id . "-" . $duplicate->unidade_id])) {
                $maintain[$duplicate->usuario_id . "-" . $duplicate->unidade_id] = $duplicate;
                continue;
            }
            $remove[] = $duplicate;
        }

        foreach ($remove as $key => $duplicate) {
            $unidadeIntegrante = UnidadeIntegrante::find($duplicate->id);
            $atribuicoes = array_column($unidadeIntegrante->atribuicoes->toArray(), 'atribuicao');
            Log::alert("Unidade Integrante Duplicada: ", [
                'id' => $duplicate->id,
                'usuario_id' => $duplicate->usuario_id,
                'unidade_id' => $duplicate->unidade_id,
                'atribuicoes' => $atribuicoes
            ]);


            DB::table('unidades_integrantes_atribuicoes')
                ->where('unidade_integrante_id', $duplicate->id)
                ->delete();

            DB::table('unidades_integrantes')
                ->where('id', $duplicate->id)
                ->delete();

            $this->lotar(
                $duplicate->unidade_id,
                $duplicate->usuario_id,
                $atribuicoes
            );
        }
    }

    private function lotar($unidadeId, $usuarioId, array $atribuicoes = []): UnidadeIntegrante
    {
        $integranteNovoOuExistente = UnidadeIntegrante::firstOrCreate(['unidade_id' => $unidadeId, 'usuario_id' => $usuarioId]);
        if (!empty($atribuicoes)) {
            foreach ($atribuicoes as $atribuicao) {
                UnidadeIntegranteAtribuicao::firstOrCreate([
                    'unidade_integrante_id' => $integranteNovoOuExistente->id,
                    'atribuicao' => $atribuicao
                ]);
            }
        }
        return $integranteNovoOuExistente;
    }


    public function down(): void {}
};
