<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Funcao;

class FuncaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $funcoes = [
                ['nome'=> 'Chefe de Delegacia','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'Chefe de Divisão','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'Chefe de Núcleo','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'NPF','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'Chefe de Seção','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'Chefe de Setor','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'Superintendente','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'Coordenador','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'Coordenador Geral','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'Diretor','nivel'=> '','descricao'=>'','codigo'=>''],
                ['nome'=> 'Diretor Geral','nivel'=> '','descricao'=>'','codigo'=>''],
        ];        
        foreach($funcoes as $f) {
            $funcao = new Funcao();
            $funcao->fill([
                'nome'=> $f['nome'],
                'nivel'=>  $f['nivel'],
                'descricao'=> $f['descricao'],
                'codigo'=>  $f['codigo'],
            ]);
            $funcao->save();
        }
    }
}
