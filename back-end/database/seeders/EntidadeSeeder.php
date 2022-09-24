<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Entidade;
use App\Models\Cidade;
use App\Models\TipoModalidade;
use Carbon\Carbon;

class EntidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $brasilia = Cidade::where('codigo_ibge', '5300108')->sole();
        $juiz_fora = Cidade::where('codigo_ibge', '3136702')->sole();

        //cria a entidade PRF
        $ent1 = new Entidade();
        $ent1->fill([
            'id' => "52d78c7d-e0c1-422b-b094-2ca5958d5ac1",
            'sigla' => 'PRF',
            'nome' => 'Polícia Rodoviária Federal',
            'abrangencia' => 'NACIONAL',
            'layout_formulario_demanda' => 'COMPLETO',
            'campos_ocultos_demanda' => [],
            'nomenclatura' => [],
            'cidade_id' => $brasilia->id
        ]);

        $tipo1 = new TipoModalidade();
        $tipo1->fill([
            'nome' => 'Modalidade 1',
            'config' => null,
            'data_inicio' => Carbon::now()
        ]);
        $tipo1->save();
        $tipo1->entidades()->save($ent1);

        //cria a entidade ANTAQ
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
            'config' => null,
            'data_inicio' => Carbon::now()
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

        //cria a entidade MJSP/DEPEN
        $ent4 = new Entidade();
        $ent4->fill([
            'id' => '821cbe85-6382-4eb0-b4ca-704957de6b07'
            'sigla' => 'MJSP/DEPEN',
            'nome' => 'Departamento Penitenciário Nacional',
            'abrangencia' => 'NACIONAL',
            'layout_formulario_demanda' => 'COMPLETO',
            'campos_ocultos_demanda' => [],
            'nomenclatura' => [],
            'cidade_id' => $brasilia->id
        ]);

        $tipo4 = new TipoModalidade();
        $tipo4->fill([
            'nome' => 'Modalidade 1',
            'config' => null,
            'data_inicio' => Carbon::now()
        ]);
        $tipo4->save();
        $tipo4->entidades()->save($ent4);
    }
}
