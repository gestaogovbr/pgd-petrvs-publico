<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoCapacidade;
use App\Models\Capacidade;
use App\Models\Perfil;
use Ramsey\Uuid\Uuid;
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
        //TipoCapacidade::whereIn('codigo',['MOD_LOGS_CONS','MOD_LOGS_EDT','MOD_LOGS_EXCL'])->delete(); //apaga capacidades inseridas indevidamente
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
        foreach ($dadosTiposCapacidades as $linha) {
            $registro = $linha;
            $tipocapacidade = TipoCapacidade::where('id', $registro[0])->first() ?? new TipoCapacidade();
            $tipocapacidade->fill([
                'id' => $registro[0],
                'codigo' => $registro[1],
                'descricao' => $registro[2]
            ]);
            $tipocapacidade->save();
            if (!Capacidade::where([['perfil_id', $developerId], ['tipo_capacidade_id', $registro[0]]])->exists()) {
                $capacidade = new Capacidade();
                $capacidade->fill([
                    'id' => $utilService->uuid(),
                    'data_inicio' => date("Y-m-d H:i:s"),
                    'data_fim' => null,
                    'perfil_id' => $developerId, // ID do Perfil DESENVOLVEDOR
                    'tipo_capacidade_id' => $registro[0]
                ]);
                $capacidade->save();
            }
        }
    }
}