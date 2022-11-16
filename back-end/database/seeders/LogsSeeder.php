<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lotacao;
use App\Models\Usuario;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\DB;
use DateTime;

class LogsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $usuarios = ['9465b95b-bc67-46a4-a2a5-4c81effdfb2d', 'c09bda44-247e-4d06-a250-a54166393254', 
                    'c79526f0-e673-492b-9aa2-af319cf9ec3d', '503192d6-4a47-4cc6-a556-176a892ebcd3'];
        $tipos = ['ADD', 'DELETE', 'EDIT'];
        $tabelas = [
        ['usuarios','023e58d8-cecc-46e6-8c85-c7b11a449e17', '9465b95b-bc67-46a4-a2a5-4c81effdfb2d', 'c79526f0-e673-492b-9aa2-af319cf9ec3d'],
        ['cidades','001763f3-5eef-4159-98c4-bca15b7a7650', '00357482-2772-42fc-9fc4-9713fec99fb4', '008fffca-0915-4316-a46c-bc0958d4bee9'],
        ['feriados','2278f6c7-600b-4f61-8c66-95cd8a608150', 'aac988a4-fd8e-437d-b5cd-acd053be953c', 'c01d1fb0-f362-4729-b68f-59e75ad09733'],
        ['demandas', '', '', ''],
        ['tipos_avaliacoes_justificativas','03deb2fa-50bd-466b-a61d-8675b4c18aa8', '04bf6704-5774-4a63-b9aa-13f96694e015', '0c1a1e2d-ceae-4bba-a554-3a2eec53e522']
       ];

        // timestamp(01/01/2022) = strtotime('2022-01-01') = 1641006000
        // timestamp(30/10/2022) = strtotime('2022-10-30') = 1667098800
        for($i = 0, $i < 20, $i++){
            $x = random_int(0, 4)
            $change = new Change();
            $change->fill([
                'id' => Uuid::uuid4(),
                'date_time' => new DateTime(date('Y-m-d H:i:s',random_int(1641006000, 1667098800))),
                'user_id' => $usuarios[random_int(0, 3)], //usuario que realizou a modificação
                'table_name' => $tabelas[$x][0],
                'row_id' => $tabelas[$x][random_int(1, 3)],
                'type' => $tipos[random_int(0, 2)],
                'delta' => json_encode($tipos)
            ]);
            $change->save();
        };
    }
}
