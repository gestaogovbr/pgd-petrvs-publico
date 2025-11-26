<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::table('entidades')->get()->each(function ($entidade) {
            $nomenclatura = json_decode($entidade->nomenclatura, true) ?? [];
            
            foreach ($nomenclatura as &$item) {
                if ($item['nome'] === 'unidade') {
                    $item['singular'] = 'unidade';
                    $item['plural'] = 'unidades';
                    break;
                }
            }
            
            DB::table('entidades')
                ->where('id', $entidade->id)
                ->update(['nomenclatura' => json_encode($nomenclatura)]);
        });
    }

    public function down()
    {
        DB::table('entidades')->get()->each(function ($entidade) {
            $nomenclatura = json_decode($entidade->nomenclatura, true) ?? [];
            
            foreach ($nomenclatura as &$item) {
                if ($item['nome'] === 'unidade') {
                    $item['singular'] = 'unidade executora';
                    $item['plural'] = 'unidades executoras';
                    break;
                }
            }
            
            DB::table('entidades')
                ->where('id', $entidade->id)
                ->update(['nomenclatura' => json_encode($nomenclatura)]);
        });
    }
};