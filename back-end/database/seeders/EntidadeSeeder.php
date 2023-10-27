<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Entidade;
use App\Models\Cidade;

class EntidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public $timenow;
    public $brasilia;

    public function __construct(){
        $this->timenow = now();
        $this->brasilia = Cidade::where('codigo_ibge', '5300108')->sole();
    }

    public function run()
    {
        $entidade = array(
          array(
            "id" => "52d78c7d-e0c1-422b-b094-2ca5958d5ac1",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "sigla" => "MGI",
            "nome" => "Ministério da Gestão e da Inovação em Serviços Públicos",
            "abrangencia" => "NACIONAL",
            "codigo_ibge" => $this->brasilia->codigo_ibge,
            "uf" => $this->brasilia->uf,
            "carga_horaria_padrao" => 8,
            "gravar_historico_processo" => 0,
            "layout_formulario_atividade" => "COMPLETO",
            "campos_ocultos_atividade" => NULL,
            "nomenclatura" => NULL,
            "url_sei" => "https://sei.economia.gov.br/",
            "notificacoes" => "{\"enviar_email\": true, \"enviar_petrvs\": true, \"nao_notificar\": [], \"enviar_whatsapp\": true}",
            "forma_contagem_carga_horaria" => "DIA",
            "api_public_key" => NULL,
            "api_private_key" => NULL,
            "expediente" => "{\"sexta\": [], \"terca\": [], \"quarta\": [], \"quinta\": [], \"sabado\": [], \"domingo\": [], \"segunda\": [], \"especial\": []}",
            "tipo_modalidade_id" => NULL,
            "cidade_id" => $this->brasilia->id,
            "gestor_id" => NULL,
            "gestor_substituto_id" => NULL,
          ),
        );

        Entidade::insertOrIgnore($entidade);
    }
}
