<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaAtividadeExterna;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class JobAgendamentoSeeder  extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('jobs_schedules')->insert([
      [
        'nome_do_job' => 'PGDCarregarDadosFila',
        'diario' => true,
        'horario' => '02:00:00',
        'expressao_cron' => null,
        'ativo' => true,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ]
    ]);
  }
}
