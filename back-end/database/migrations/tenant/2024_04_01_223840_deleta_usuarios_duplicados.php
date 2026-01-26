<?php
declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();

        $resultado = DB::table('usuarios')
        ->selectRaw('COUNT(1) AS qtd_cpf, cpf')
        ->groupBy('cpf')
        ->havingRaw('COUNT(1) > 1')
        ->get();

        $resultado->each(function($item){
            $usuarios = DB::table('usuarios')->where('cpf', $item->cpf)->orderBy('created_at','asc')->get();
            $usuarios->pop();
            foreach($usuarios as $usuario){
                $this->deletaUsuario($usuario->id);
            }
        });

        Schema::enableForeignKeyConstraints();
    }


    private function deletaUsuario(string $id){
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
        DB::table('unidades_integrantes')->where('usuario_id', $id)->delete();
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

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
};