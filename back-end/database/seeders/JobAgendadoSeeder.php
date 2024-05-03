<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobAgendado;

class JobAgendadoSeeder extends Seeder
{
  public function run()
  {
    $jobs = [
      [
        'nome_do_job' => 'LogJob',
        'diario' => true,
        'horario' => '10:31:00',
        'ativo' => true
      ],
      [
          'nome_do_job' => 'LogJob',
          'diario' => true,
          'horario' => '11:31:00',
          'ativo' => true
      ],
      [
        'nome_do_job' => 'LogJob',
        'diario' => true,
        'horario' => '13:01:00',
        'ativo' => true
      ]
    ];

    foreach ($jobs as $jobData) {
          JobAgendado::firstOrCreate([
            'nome_do_job' => $jobData['nome_do_job'],
            'horario' => $jobData['horario']
        ], $jobData);
    }

  }
}
