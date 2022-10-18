<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoCapacidade;
use App\Models\Capacidade;
use Ramsey\Uuid\Uuid;
use App\Services\TipoCapacidadeService;

class TipoCapacidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TipoCapacidade::whereIn('codigo',['MOD_LOGS_CONS','MOD_LOGS_EDT','MOD_LOGS_EXCL'])->delete(); //apaga capacidades inseridas indevidamente
        $tiposCapacidadesService = new TipoCapacidadeService();
        // carrega os tipos de capacidades do vetor declarado no serviço TipoCapacidadeService
         $dadosTiposCapacidades = $tiposCapacidadesService->tiposCapacidades;
         foreach($dadosTiposCapacidades as $linha)
         {
             $registro = $linha;
             $tipocapacidade = TipoCapacidade::where('id', $registro[0])->first() ?? new TipoCapacidade();
             $tipocapacidade->fill([
                 'id' => $registro[0],
                 'codigo' => $registro[1],
                 'descricao' => $registro[2]
             ]);
             $tipocapacidade->save();
             if(!Capacidade::where([['perfil_id','77001b4b-6e25-4aab-9abc-8872c6c1029a'],['tipo_capacidade_id',$registro[0]]])->exists()) {
                $capacidade = new Capacidade();
                $capacidade->fill([
                   'id' => Uuid::uuid4(),
                   'data_inicio' => date("Y-m-d H:i:s"),
                   'data_fim' => null,
                   'perfil_id' => "77001b4b-6e25-4aab-9abc-8872c6c1029a", // ID do Perfil DESENVOLVEDOR
                   'tipo_capacidade_id' => $registro[0]
                ]);
                $capacidade->save();
             }
         }
    }
}
