<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    // Atualiza os planos de trabalho com status ATIVO para CONCLUIDO
    // Condição: Todos os registros de execução (consolidações) precisam estar concluidos e avaliados (status AVALIADO)
    try {
      DB::table('planos_trabalhos')
        ->where('status', 'ATIVO')
        ->whereNull('deleted_at')
        // Garante que o plano tenha pelo menos uma consolidação (evita fechar planos vazios/novos sem consolidação)
        ->whereExists(function ($query) {
          $query->select(DB::raw(1))
            ->from('planos_trabalhos_consolidacoes')
            ->whereColumn('planos_trabalhos_consolidacoes.plano_trabalho_id', 'planos_trabalhos.id')
            ->whereNull('planos_trabalhos_consolidacoes.deleted_at');
        })
        // Garante que NÃO exista nenhuma consolidação com status diferente de AVALIADO
        ->whereNotExists(function ($query) {
          $query->select(DB::raw(1))
            ->from('planos_trabalhos_consolidacoes')
            ->whereColumn('planos_trabalhos_consolidacoes.plano_trabalho_id', 'planos_trabalhos.id')
            ->where('planos_trabalhos_consolidacoes.status', '!=', 'AVALIADO')
            ->whereNull('planos_trabalhos_consolidacoes.deleted_at');
        })
        ->update(['status' => 'CONCLUIDO']);
    } catch (\Throwable $e) {
      \Illuminate\Support\Facades\Log::error('Erro ao atualizar planos de trabalho: ' . $e->getMessage());
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    // Não é possível reverter com precisão pois não sabemos quais estavam ATIVO antes.
    // Se necessário, poderia ser feito um log ou tabela temporária, mas para update de status geralmente não se reverte
    // a menos que tenhamos o estado anterior salvo.
  }
};
