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
    $csv_reader = new BulkSeeder($file, ";");

    $timenow = now();

    foreach ($csv_reader->csvToArray($bulk = 5000) as $data) {
      // Preprocessamento do array
      foreach ($data as $key => $entry) {
        $data[$key]['nome'] = mb_convert_encoding(
          $data[$key]['nome'],
          "UTF-8",
          "ISO-8859-1"
        );
        $data[$key]['descricao'] = mb_convert_encoding(
          $data[$key]['descricao'],
          "UTF-8",
          "ISO-8859-1"
        );

        $data[$key]['deleted_at'] = NULL;
        $data[$key]['created_at'] = $timenow;
        $data[$key]['updated_at'] = $timenow;
      }
      Cargo::upsert($data, "id");
    }
  }
}
