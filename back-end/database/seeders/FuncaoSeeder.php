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
                ['nome'=> 'Chefe de Delegacia','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'Chefe de Divisão','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'Chefe de Núcleo','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'NPF','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'Chefe de Seção','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'Chefe de Setor','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'Superintendente','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'Coordenador','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'Coordenador Geral','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'Diretor','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
                ['nome'=> 'Diretor Geral','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','ativo'=>1],
        ];        
        foreach($funcoes as $f) {
            $funcao = new Funcao();
            $funcao->fill([
                'nome'=> $f['nome'],
                'nivel'=>  $f['nivel'],
                'descricao'=> $f['descricao'],
                'siape'=>  $f['siape'],
                'cbo'=>  $f['cbo'],
                'ativo'=>  $f['ativo'],
            ]);
            $funcao->save();
        }
    }
}
