<?php

use App\Models\Ocorrencia;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use App\Services\UtilService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach (PlanoTrabalhoConsolidacaoOcorrencia::with('consolidacao.planoTrabalho')->get() as $ocorrencia) {
            Ocorrencia::create([
                'data_inicio' => $ocorrencia->data_inicio,
                'data_fim' => $ocorrencia->data_fim,
                'descricao' => $ocorrencia->descricao,
                'plano_trabalho_id' => $ocorrencia->consolidacao->planoTrabalho->id,
                'usuario_id' => $ocorrencia->consolidacao->planoTrabalho->usuario_id
            ])->save();
        }
        PlanoTrabalhoConsolidacaoOcorrencia::truncate();
        Schema::table('planos_trabalhos_consolidacoes_ocorrencias', function (Blueprint $table) {
            $table->json('snapshot')->comment("Snapshot do registro de atividades");
            $table->dateTime('data_conclusao')->comment("Data e hora da conclusao");
            $table->foreignUuid('ocorrencia_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Ocorrência");
            $table->dropColumn('data_inicio');
            $table->dropColumn('data_fim');
            $table->dropColumn('descricao');
        });
        foreach (Ocorrencia::with('planoTrabalho.consolidacoes')->get() as $ocorrencia) {
            $inicio = UtilService::asTimestamp($ocorrencia->data_inicio);
            $fim = UtilService::asTimestamp($ocorrencia->data_fim);
            foreach ($ocorrencia->planoTrabalho->consolidacoes as $consolidacao) {
                $consolidacaoInicio = UtilService::asTimestamp($consolidacao->data_inicio);
                $consolidacaoFim = UtilService::asTimestamp($consolidacao->data_fim);
                if(in_array($consolidacao->status, ['CONCLUIDO', 'AVALIADO']) && ($inicio <= $consolidacaoFim) && ($fim >= $consolidacaoInicio)) {
                    PlanoTrabalhoConsolidacaoOcorrencia::create([
                        'plano_trabalho_consolidacao_id' => $consolidacao->id,
                        'data_conclusao' => $consolidacao->data_conclusao,
                        'ocorrencia_id' => $ocorrencia->id,
                        'snapshot' => Ocorrencia::find($ocorrencia->id)->toArray(),
                    ])->save();
                }             
            }
        }
    }

    public function down()
    {
        PlanoTrabalhoConsolidacaoOcorrencia::truncate();
        Schema::table('planos_trabalhos_consolidacoes_ocorrencias', function (Blueprint $table) {
            $table->dropColumn('snapshot');
            $table->dropColumn('data_conclusao');
            $table->dropForeign('ocorrencia_id');
            $table->dropColumn('ocorrencia_id');
            $table->dateTime('data_inicio')->comment("Data inicial da consolidacão");
            $table->dateTime('data_fim')->comment("Data final da consolidação");
            $table->text('descricao')->comment("Descrição da ocorrência");
        });
    }
};
