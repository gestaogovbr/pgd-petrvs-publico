<?php

use App\Models\Entidade;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $entidade = Entidade::where('sigla', 'FUNASA')->first();

        if (!$entidade) {
            return;
        }

         Schema::disableForeignKeyConstraints();

        DB::transaction(function () {
            $usuariosAposentados = DB::table('usuarios')
                ->where('situacao_funcional', 'APOSENTADO')
                ->pluck('usuarios.id');

            if (empty($usuariosAposentados)) return;

            DB::table('unidades_integrantes_atribuicoes')
                ->whereIn('unidade_integrante_id', function ($query) use ($usuariosAposentados) {
                    $query->select('id')
                        ->from('unidades_integrantes')
                        ->whereIn('usuario_id', $usuariosAposentados);
                })->delete();

            DB::table('unidades_integrantes')
                ->whereIn('usuario_id', $usuariosAposentados)
                ->delete();


            foreach ($usuariosAposentados as $usuarioId) {
                $this->deletaUsuario($usuarioId);
            }


            DB::table('usuarios')->whereIn('id', $usuariosAposentados)->delete();
        });

         Schema::enableForeignKeyConstraints();
    }

    private function deletaUsuario(string $id)
    {
        DB::table('atividades')->where('demandante_id', $id)->delete();
        DB::table('atividades')->where('usuario_id', $id)->delete();
        DB::table('documentos')->where('usuario_id', $id)->delete();
        DB::table('planos_trabalhos')->where('criacao_usuario_id', $id)->delete();
        DB::table('planos_trabalhos')->where('usuario_id', $id)->delete();
        DB::table('projetos_recursos')->where('usuario_id', $id)->delete();
        DB::table('projetos_tarefas')->where('usuario_id', $id)->delete();
        DB::table('documentos_assinaturas')->where('usuario_id', $id)->delete();
        DB::table('questionarios_preenchimentos')->where('usuario_id', $id)->delete();
        DB::table('entidades')->where('gestor_id', $id)->delete();
        DB::table('entidades')->where('gestor_substituto_id', $id)->delete();
        DB::table('avaliacoes')->where('avaliador_id', $id)->delete();
        DB::table('comentarios')->where('usuario_id', $id)->delete();
        DB::table('anexos')->where('usuario_id', $id)->delete();
        DB::table('ocorrencias')->where('usuario_id', $id)->delete();
        DB::table('planos_entregas_entregas_progressos')->where('usuario_id', $id)->delete();
        DB::table('projetos')->where('usuario_id', $id)->delete();
        DB::table('notificacoes')->where('remetente_id', $id)->delete();
        DB::table('integracoes')->where('usuario_id', $id)->delete();
        DB::table('planos_entregas')->where('criacao_usuario_id', $id)->delete();
        DB::table('afastamentos')->where('usuario_id', $id)->delete();
        DB::table('projetos_historicos')->where('usuario_id', $id)->delete();
        DB::table('reacoes')->where('usuario_id', $id)->delete();
        DB::table('status_justificativas')->where('usuario_id', $id)->delete();
        DB::table('programas_participantes')->where('usuario_id', $id)->delete();
        DB::table('curriculuns')->where('usuario_id', $id)->delete();
        DB::table('notificacoes_whatsapp')->where('usuario_id', $id)->delete();
        DB::table('notificacoes_destinatarios')->where('usuario_id', $id)->delete();
        DB::table('atividades_tarefas')->where('usuario_id', $id)->delete();
        DB::table('favoritos')->where('usuario_id', $id)->delete();
        DB::table('usuarios')->where('id', $id)->delete();
    }

    public function down(): void
    {
    }
};
