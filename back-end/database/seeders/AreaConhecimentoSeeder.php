<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaConhecimento;

class AreaConhecimentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $array_areas = [
            ['id'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Ciências Humanas'],
            ['id'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Ciências Exatas e da Terra'],
            ['id'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Linguística, Letras e Artes'],
            ['id'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Ciências Agrárias'],
            ['id'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Ciências da Saúde'],
            ['id'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Engenharias'],
            ['id'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Ciências Sociais Aplicadas'],
            ['id'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Institucional'],
            ['id'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Ciências Humanas'],
              
         ];
              
        foreach($array_areas as $area) {

            $areaI = new AreaConhecimento();
            $areaI->fill([
                'id' => $area['id'],
                'nome'=> $area['nome']
            ]);
            $areaI->save();
            
        }
        //
    }
}

