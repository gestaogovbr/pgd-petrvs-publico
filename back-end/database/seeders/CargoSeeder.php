<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cargo;
use Illuminate\Support\Str;

class CargoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Inserção em massa partindo do CSV
        $file = database_path('seeders/arquivos_csv/cargos.csv');
        $csv_reader = new BulkSeeeder($file, ";");
    
        $timenow = now();

        foreach($csv_reader->csvToArray($bulk = 1000) as $data){
          // Preprocessamento do array
            foreach($data as $key => $entry){
                $data[$key]['nome'] = mb_convert_encoding($data[$key]['nome'],
                    "UTF-8", 
                    "ISO-8859-1"
                );
                $data[$key]['descricao'] = mb_convert_encoding($data[$key]['descricao'],
                    "UTF-8", 
                    "ISO-8859-1"
                );

                $data[$key]['created_at'] = $timenow;
                $data[$key]['updated_at'] = $timenow;
            }
            Cargo::insertOrIgnore($data);
        }

        // Seeder - Inicial da PRF
        $cargos_prf = [
          ['id' => 'b1544ba3-9489-429e-9a63-1e7e28a9500a', 'nome'=> 'PRF','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','efetivo'=>1,'ativo'=>1],
          ['id' => 'd49c7d69-8e66-438e-97c7-b17113a50b11', 'nome'=> 'Agente Administrativo','nivel'=> '','descricao'=>'','siape'=>'','cbo'=>'','efetivo'=>1,'ativo'=>1],
        ];
        Cargo::insertOrIgnore($cargos_prf);
    }
}

// Códigos modelos

        // Leitura de arquivo original do SIAPE
        /*
        foreach($csv_reader->csvToArray($bulk = 1000) as $data){
            // Preprocessamento do array
            foreach($data as $key => $entry){
                // Inserindo dados faltantes uma vez que método insert
                // insertOrIgnore não o faz.
                $data[$key]['id'] = Str::uuid();
                $data[$key]['nome'] = mb_convert_encoding($data[$key]['DESCRICAO'],
                    "UTF-8", 
                    "ISO-8859-1"
                );

                // nivel já existe

                $data[$key]['descricao'] = mb_convert_encoding($data[$key]['DESCRICAO'],
                    "UTF-8", 
                    "ISO-8859-1"
                );

                $data[$key]['cbo'] = $data[$key]["CBO"];
                $data[$key]['nivel'] = $data[$key]["NIVEL"];
                //$data[$key]['siape'] = $data[$key]["﻿CODIGO"];
                $data[$key]['siape'] = $data[$key]["CODIGO"];

                // CBO já existe
                $data[$key]['efetivo'] = 1;
                $data[$key]['ativo'] = 1;
                $data[$key]['created_at'] = $timenow;
                $data[$key]['updated_at'] = $timenow;

                unset($data[$key]["CODIGO"]);
                unset($data[$key]["DESCRICAO"]);
                unset($data[$key]["CBO"]);
                unset($data[$key]["NIVEL"]);
                unset($data[$key]["SUBSIDIO"]);
            }
            Cargo::insertOrIgnore($data);
        }
        */

        // modelo de inclusão unitaria seeder 
        /*
        foreach($cargos_prf as $c) {
            $cargo = new Cargo();
            $cargo->fill([
              'id'=> $c['id'],
              'nome'=> $c['nome'],
              'nivel'=>  $c['nivel'],
              'descricao'=> $c['descricao'],
              'siape'=>  $c['siape'],
              'cbo'=>  $c['cbo'],
              'efetivo'=>  $c['efetivo'],
              'ativo'=>  $c['ativo'],
            ]);
            $cargo->save();
        };
        */

//