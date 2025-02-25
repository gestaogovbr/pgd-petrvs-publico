<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Unidade;

class CorrigeFunartSeeder extends Seeder {
  public function run() {
    $unidade_id = '88d9b9d0-f5f5-4f13-9b3c-bec59193b054';
    $unidade = Unidade::withTrashed()->find($unidade_id);
    if ($unidade) {
      $unidade->restore();
    }
  }
}