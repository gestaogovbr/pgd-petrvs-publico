<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Entidade;
use App\Models\Cidade;
use App\Models\TipoModalidade;

class EntidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public $timenow;
    public $brasilia;
    public $juiz_fora;
    public $cuiaba;

    public function __construct(){
        $this->timenow = now();
        $this->brasilia = Cidade::where('codigo_ibge', '5300108')->sole();
        $this->juiz_fora = Cidade::where('codigo_ibge', '3136702')->sole();
        $this->cuiaba = Cidade::where('codigo_ibge', '5103403')->sole();
    }

    public function run()
    {
        $entidades = array(
          array(
            "id" => "52d78c7d-e0c1-422b-b094-2ca5958d5ac1",
            "created_at" => $this->timenow,
            "updated_at" => $this->timenow,
            "deleted_at" => NULL,
            "sigla" => "PRF",
            "nome" => "Polícia Rodoviária Federal",
            "abrangencia" => "NACIONAL",
            "codigo_ibge" => $this->brasilia->codigo_ibge,
            "uf" => $this->brasilia->uf,
            "carga_horaria_padrao" => 8,
            "gravar_historico_processo" => 0,
            "layout_formulario_atividade" => "COMPLETO",
            "campos_ocultos_atividade" => NULL,
            "nomenclatura" => NULL,
            "url_sei" => "https://sei.prf.gov.br/",
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
          array(
            "id" => "1eec6bcb-28c9-4b2e-ad37-250a10439647",
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
        Entidade::insertOrIgnore($entidades);

        /*
        //cria a entidade PRF
        $ent1 = new Entidade();
        $ent1->fill([
            'id' => "52d78c7d-e0c1-422b-b094-2ca5958d5ac1",
            'sigla' => 'PRF',
            'nome' => 'Polícia Rodoviária Federal',
            'codigo_ibge' => '5300108',
            'uf' => 'DF',
            'abrangencia' => 'NACIONAL',
            'cidade_id' => $brasilia->id
        ]);
        $ent1->save();

        $tipo1 = new TipoModalidade();
        $tipo1->fill([
            'nome' => 'Modalidade 1',
        ]);
        $tipo1->save();
        $tipo1->entidades()->save($ent1);

        /cria a entidade ANTAQ
        $ent2 = new Entidade();
        $ent2->fill([
            'sigla' => 'ANTAQ',
            'nome' => 'Agência Nacional de Transportes Aquaviários',
            'abrangencia' => 'NACIONAL',
            'layout_formulario_demanda' => 'COMPLETO',
            'campos_ocultos_demanda' => [],
            'nomenclatura' => [],
            'cidade_id' => $brasilia->id
        ]);

        $tipo2 = new TipoModalidade();
        $tipo2->fill([
            'nome' => 'Modalidade 2',
        ]);
        $tipo2->save();
        $tipo2->entidades()->save($ent2);

        //cria a entidade UFJF
        $ent3 = new Entidade();
        $ent3->fill([
            'sigla' => 'UFJF',
            'nome' => 'Universidade Federal de Juiz de Fora',
            'abrangencia' => 'ESTADUAL',
            'layout_formulario_demanda' => 'COMPLETO',
            'campos_ocultos_demanda' => [],
            'nomenclatura' => [],
            'cidade_id' => $juiz_fora->id
        ]);
        */

        // Cria a entidade SENAPPEN
        /*
        $ent4 = new Entidade();
        $ent4->fill([
            'id' => "821cbe85-6382-4eb0-b4ca-704957de6b07",
            'sigla' => 'SENAPPEN',
            'nome' => 'Secretaria Nacional de Políticas Penais',
            'codigo_ibge' => '5300108',
            'uf' => 'DF',
            'abrangencia' => 'NACIONAL',
            'cidade_id' => $brasilia->id
        ]);
        $ent4->save();

        $tipo4 = new TipoModalidade();
        $tipo4->fill([
            'nome' => 'Modalidade 1',
        ]);
        $tipo4->save();
        $tipo4->entidades()->save($ent4);

        //cria a entidade UFMT
        $ent5 = new Entidade();
        $ent5->fill([
            'sigla' => 'UFMT',
            'nome' => 'Universidade Federal do Mato Grosso',
            'abrangencia' => 'NACIONAL',
            'layout_formulario_demanda' => 'COMPLETO',
            'campos_ocultos_demanda' => [],
            'nomenclatura' => [],
            'cidade_id' => $cuiaba->id
        ]);

        $tipo5 = new TipoModalidade();
        $tipo5->fill([
            'nome' => 'Modalidade 2',
        ]);
        $tipo5->save();
        $tipo5->entidades()->save($ent5);

        //cria a entidade ME
        $ent6 = new Entidade();
        $ent6->fill([
            'sigla' => 'ME',
            'nome' => 'Ministério da Economia',
            'abrangencia' => 'NACIONAL',
            'layout_formulario_demanda' => 'COMPLETO',
            'campos_ocultos_demanda' => [],
            'nomenclatura' => [],
            'cidade_id' => $brasilia->id
        ]);

        $tipo6 = new TipoModalidade();
        $tipo6->fill([
            'nome' => 'Modalidade 2',
        ]);
        $tipo6->save();
        $tipo6->entidades()->save($ent6);*/
    }
}
