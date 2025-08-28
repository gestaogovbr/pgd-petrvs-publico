<?php

use App\Traits\Version;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use Version;
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->version("2.6.2");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->version("2.6.1");
    }
};
