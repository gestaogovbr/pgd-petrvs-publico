<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoCapacidade;
use App\Models\Capacidade;
use App\Models\Perfil;
use App\Services\TipoCapacidadeService;
use App\Services\UtilService;

class TipoCapacidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tiposCapacidadesService = new TipoCapacidadeService();
        $utilService = new UtilService();

        //garantir que existe o Perfil Desenvolvedor
        $perfil = Perfil::where([['nome', 'Desenvolvedor']])->first();
        if(!$perfil){
            $perfil = new Perfil();
            $perfil->fill([
                'id' => $utilService->uuid("Desenvolvedor"),   
                'nivel' => 0,         
                'nome' => 'Desenvolvedor',
                'descricao' => 'Perfil de Desenvolvedor - Todas as permissões',
            ]);
            $perfil->save();
        };

        $developerId = $perfil->id;

        // carrega os tipos de capacidades do vetor declarado no serviço TipoCapacidadeService
        $dadosTiposCapacidades = array_map(fn ($capacidade) => array_merge([$utilService->uuid($capacidade[0])], $capacidade), $tiposCapacidadesService->tiposCapacidades);
        foreach ($dadosTiposCapacidades as $registro) {
            //insere no banco ou atualiza todos os tipos de capacidade constantes do vetor
            $tipocapacidade = TipoCapacidade::where('id', $registro[0])->first() ?? new TipoCapacidade();
            $tipocapacidade->fill([
                'id' => $registro[0],
                'codigo' => $registro[1],
                'descricao' => $registro[2]
            ]);
            $tipocapacidade->save();
            //garante que o perfil de Desenvolver tenha todos os tipos de permissão
            if (!Capacidade::where([['perfil_id', $developerId], ['tipo_capacidade_id', $registro[0]]])->exists()) {
                $capacidade = new Capacidade();
                $capacidade->fill([
                    'id' => $utilService->uuid(),
                    'perfil_id' => $developerId,
                    'tipo_capacidade_id' => $registro[0]
                ]);
                $capacidade->save();
            }
        }

        // exclui as capacidades que não existem mais no vetor declarado no serviço TipoCapacidadeService
        foreach (TipoCapacidade::whereNotIn('codigo',array_map(fn($x) => $x[0],$tiposCapacidadesService->tiposCapacidades))->get() as $tipo) {
            if(count($tipo->capacidades) > 0) Capacidade::where('tipo_capacidade_id',$tipo->id)->delete();
            $tipo->delete();
        }

    }
}