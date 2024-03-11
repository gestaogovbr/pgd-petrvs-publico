<?php

use Illuminate\Database\Migrations\Migration;
use App\Traits\Version;

class Version2012 extends Migration
{
    use Version;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->version("2.0.12");
    }

    /**
     * Reverse the migrations. 
     *
     * @return void
     */
    public function down()
    {
        throw new Exception("Impossível retornar para versões já atualizadas");
    }
}
