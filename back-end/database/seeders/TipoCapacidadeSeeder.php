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
        $perfilDesenvolvedor = Perfil::where([['nome', 'Desenvolvedor']])->first();
        if(!$perfilDesenvolvedor){
            $perfilDesenvolvedor = new Perfil();
            $perfilDesenvolvedor->fill([
                'id' => $utilService->uuid("Desenvolvedor"),
                'nivel' => 0,
                'nome' => 'Desenvolvedor',
                'descricao' => 'Perfil de Desenvolvedor - Todas as permissões',
            ]);
            $perfilDesenvolvedor->save();
        };

        $developerId = $perfilDesenvolvedor->id;

        // carrega os tipos de capacidades do vetor declarado no serviço TipoCapacidadeService
        $dadosModulosCapacidades = $tiposCapacidadesService->tiposCapacidades;
        $dadosTiposCapacidades = array_map(fn ($capacidade) => array_merge([$utilService->uuid($capacidade['codigo'])], $capacidade), $dadosModulosCapacidades);
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
                    'perfil_id' => $developerId,
                    'tipo_capacidade_id' => $registro[0]
                ]);
                $capacidade->save();
            }
        }

        // exclui as capacidades que não existem mais no vetor declarado no serviço TipoCapacidadeService 
        foreach ($dadosModulosCapacidades as $modulo) {
            $arrayCapacidades = array_map(fn($z) => $z[0], $modulo['capacidades']);
            $tiposCapacidadesNulos = TipoCapacidade::where('grupo_id', $utilService->uuid($modulo['codigo']))
                                                    ->whereNotIn('codigo',$arrayCapacidades)->get();        // representa todos os tipos de capacidade existentes na tabela, filhos do módulo, que não existem mais
            foreach ($tiposCapacidadesNulos as $tipoNulo) {
                // $tipoNulo->deleteCascade();
                foreach($tipoNulo->capacidades as $capacidadeNula) { 
                    $capacidadeNula->delete(); 
                }
/*                     $cap = Capacidade::where('tipo_capacidade_id',$tipoNulo->id)->first();
                    $cap->delete();
                } */
                if ($tipoNulo->grupo_id) $tipoNulo->delete();
            }
        }

        // falta apagar os tipos de capacidades referentes aos próprios módulos que não contêm mais tipos filhos
    }
}
