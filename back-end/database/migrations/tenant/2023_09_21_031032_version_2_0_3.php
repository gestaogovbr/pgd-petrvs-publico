<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Tenant;
use Illuminate\Support\Facades\DB;

class Version203 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /* Deverá ser executado somente para a Tenant atual, o código abaixo não faz nenhum sentido */
        /*$tenants = Tenant::all();
    
        foreach ($tenants as $tenant) {
            DB::connection('mysql')->getPdo()->exec("UPDATE tenants SET version = '2.0.3' where id = $tenant->id");
        }*/
    }

    /**
     * Reverse the migrations. 
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
