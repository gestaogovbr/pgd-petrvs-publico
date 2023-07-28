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
        $dadosTiposCapacidades = array_map(fn ($capacidade) => array_merge([$utilService->uuid($capacidade['codigo'])], $capacidade), $tiposCapacidadesService->tiposCapacidades);
        foreach ($dadosTiposCapacidades as $registro) {
            //insere no banco ou atualiza todos os tipos de capacidade constantes do vetor
            $tipocapacidade = TipoCapacidade::where('id', $registro[0])->first() ?? new TipoCapacidade();
            $tipocapacidade->fill([
                'id' => $registro[0],
                'codigo' => $registro['codigo'],
                'descricao' => $registro['descricao'],
                'grupo_id' => NULL
            ]);
            $tipocapacidade->save();
            $dadosCapacidadesFilhas = array_map(fn ($capacidadeFilha) => array_merge([$utilService->uuid($capacidadeFilha[0])], $capacidadeFilha), $registro['capacidades']);
            foreach ($dadosCapacidadesFilhas as $registroFilha) {
                $tipocapacidadeFilha = TipoCapacidade::where('id', $registroFilha[0])->first() ?? new TipoCapacidade();
                $tipocapacidadeFilha->fill([
                    'id' => $registroFilha[0],
                    'codigo' => $registroFilha[1],
                    'descricao' => $registroFilha[2],
                    'grupo_id' => $registro[0]
                ]);
                $tipocapacidadeFilha->save();
                //garante que o perfil de Desenvolvedor tenha todos os tipos de capacidades filhas
                if (!Capacidade::where([['perfil_id', $developerId], ['tipo_capacidade_id', $registroFilha[0]]])->exists()) {
                    $capacidade = new Capacidade();
                    $capacidade->fill([
                        'id' => $utilService->uuid(),
                        'data_inicio' => date("Y-m-d H:i:s"),
                        'data_fim' => null,
                        'perfil_id' => $developerId,
                        'tipo_capacidade_id' => $registroFilha[0]
                    ]);
                    $capacidade->save();
            }
            }
            //garante que o perfil de Desenvolvedor tenha todos os tipos de permissão
            if (!Capacidade::where([['perfil_id', $developerId], ['tipo_capacidade_id', $registro[0]]])->exists()) {
                $capacidade = new Capacidade();
                $capacidade->fill([
                    'id' => $utilService->uuid(),
                    'data_inicio' => date("Y-m-d H:i:s"),
                    'data_fim' => null,
                    'perfil_id' => $developerId,
                    'tipo_capacidade_id' => $registro[0]
                ]);
                $capacidade->save();
            }
        }

        // exclui as capacidades que não existem mais no vetor declarado no serviço TipoCapacidadeService
        $dadosModulosCapacidades = array_map(fn($x) => $x,$tiposCapacidadesService->tiposCapacidades);
        
        foreach ($dadosModulosCapacidades as $modulo) {
            //foreach ($modulo['capacidades'] as $dadosModulosCapacidadesFilhas) {
            $arrayCapacidades = array_map(fn($z) => $z[0], $modulo['capacidades']);
            $tiposCapacidadesNulos = TipoCapacidade::where('grupo_id', $utilService->uuid($modulo['codigo']))
                                                    ->whereNotIn('codigo',array_map(fn($z) => $z[0], $modulo['capacidades']))->get();
            $i = 1;
            foreach (TipoCapacidade::where('grupo_id', $utilService->uuid($modulo['codigo']))
                                    ->whereNotIn('codigo',array_map(fn($z) => $z[0], $modulo['capacidades']))->get() as $tipo) {
                foreach($tipo->capacidades as $tipoCap) {
                    $cap = Capacidade::where('tipo_capacidade_id',$tipo->id)->first();
                    $cap->delete();               
                }
                if ($tipo->grupo_id) $tipo->delete();
                $i++;
            }
        }
    }
}