<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameJobAgendamentosToJobsSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      if (Schema::hasTable('job_agendamentos')) {
        Schema::rename('job_agendamentos','jobs_schedules');
      }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      if (Schema::hasTable('jobs_schedules')) {
        Schema::rename('jobs_schedules','job_agendamentos');
      }
    }
}
