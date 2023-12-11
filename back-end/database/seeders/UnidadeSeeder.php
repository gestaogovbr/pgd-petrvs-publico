<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Unidade;
use App\Models\Cidade;

class UnidadeSeeder extends Seeder
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
        $unidade_raiz = array(
          array(
            "id" => "4f705d83-5808-4240-8b92-39ca88139076",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            #"codigo" => "1",
            "codigo" => "3037",
            #"sigla" => "MGI",
            "sigla" => "SENAPPEN",
            #"nome" => "Ministério da Gestão e da Inovação em Serviços Públicos",
            "nome" => "Secretaria Nacional de Políticas Penais",
            "instituidora" => 1,
            "path" => NULL,
            "texto_complementar_plano" => NULL,
            "atividades_arquivamento_automatico" => 0,
            "atividades_avaliacao_automatico" => 0,
            "planos_prazo_comparecimento" => 10,
            "planos_tipo_prazo_comparecimento" => "DIAS",
            "data_inativacao" => NULL,
            "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
            "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
            "autoedicao_subordinadas" => 1,
            "etiquetas" => NULL,
            "checklist" => NULL,
            "notificacoes" => NULL,
            "expediente" => NULL,
            "cidade_id" => $this->brasilia->id,
            "unidade_pai_id" => NULL,
            "entidade_id" => "52d78c7d-e0c1-422b-b094-2ca5958d5ac1",
          ),
        );

        foreach($unidade_raiz as $u){
            Unidade::insert($u);
        }

    }
}
