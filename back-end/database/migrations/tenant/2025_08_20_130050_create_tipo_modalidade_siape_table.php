<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tipos_modalidades_siape', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tipo_modalidade_id')->nullable();
            $table->string('nome', 255);
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('tipo_modalidade_id')->references('id')->on('tipos_modalidades');
            $table->index(['nome']);
        });
        
        // Inserir registros iniciais
        $timenow = now();
        $mapeamento = [
            'presencial' => 'Presencial',
            'integral' => 'Teletrabalho (Integral)',
            'no exterior substituicao' => 'Teletrabalho com residência no exterior (hipóteses de substituição da Lei 8.112/90, inciso VIII do art. 12 do Decreto n. 11.072/2022)',
            'no exterior' => 'Teletrabalho com residência no exterior (autorização discricionária, §7º do art. 12 do Decreto n. 11.072/2022)',
            'parcial' => 'Teletrabalho (Parcial)'
        ];
        
        $tipos = [];
        foreach ($mapeamento as $nomeSiape => $nomeTipoModalidade) {
            $tipoModalidadeId = DB::table('tipos_modalidades')
                ->where('nome', $nomeTipoModalidade)
                ->whereNull('deleted_at')
                ->value('id');
                
            $tipos[] = [
                'id' => Str::uuid(),
                'tipo_modalidade_id' => $tipoModalidadeId,
                'nome' => $nomeSiape,
                'created_at' => $timenow,
                'updated_at' => $timenow,
                'deleted_at' => null
            ];
        }
        
        DB::table('tipos_modalidades_siape')->insert($tipos);
    }

    public function down()
    {
        Schema::dropIfExists('tipos_modalidades_siape');
    }
};