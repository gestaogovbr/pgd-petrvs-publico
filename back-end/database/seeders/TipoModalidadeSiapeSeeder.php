<?php

namespace Database\Seeders;

use App\Models\TipoModalidadeSiape;
use App\Models\TipoModalidade;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class TipoModalidadeSiapeSeeder extends Seeder
{
    public function run(): void
    {
        $timenow = now();
        
        $mapeamento = [
            'presencial' => 'Presencial',
            'integral' => 'Teletrabalho (Integral)',
            'no exterior substituicao' => 'Teletrabalho com residência no exterior (hipóteses de substituição da Lei 8.112/90, inciso VIII do art. 12 do Decreto n. 11.072/2022)',
            'no exterior' => 'Teletrabalho com residência no exterior (autorização discricionária, §7º do art. 12 do Decreto n. 11.072/2022)',
            'parcial' => 'Teletrabalho (Parcial)'
        ];
        
        $tipos = [];
        
        $i = 0;
        foreach ($mapeamento as $nomeSiape => $nomeTipoModalidade) {
            $tipoModalidade = TipoModalidade::where('nome', $nomeTipoModalidade)->first();
            
            $tipos[] = [
                'id' => Str::uuid(),
                'tipo_modalidade_id' => $tipoModalidade?->id,
                'nome' => $nomeSiape,
                'created_at' => $timenow,
                'updated_at' => $timenow,
                'deleted_at' => null
            ];
            $i++;
        }
        
        TipoModalidadeSiape::upsert($tipos, 'id');
    }
}