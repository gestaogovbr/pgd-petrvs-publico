<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /* Função não adicionada devido a necessidade de ter privilégios adicionais no bando de dados
        DB::statement(<<<EOD
            CREATE FUNCTION GETUUID(origem text) RETURNS text DETERMINISTIC
            BEGIN
                DECLARE result text;
                DECLARE md5origem TEXT;
                SELECT MD5(origem) INTO md5origem;
                SELECT CONCAT(SUBSTR(md5origem, 1, 8), "-", SUBSTR(md5origem, 9, 4), "-", SUBSTR(md5origem, 13, 4), "-", SUBSTR(md5origem, 17, 4), "-", SUBSTR(md5origem, 21)) INTO result;
                RETURN result;
            END
        EOD);*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /* DB::statement("DROP FUNCTION IF EXISTS GETUUID"); */
    }
};
