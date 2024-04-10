<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersPanelTenantsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('users_panel_tenants', function (Blueprint $table) {
      $table->id();
      $table->string('tenant_id');
      $table->bigInteger('users_panel_id')->unsigned();

      $table->timestamps();
      $table->foreign('tenant_id')->references('id')->on('tenants')->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('users_panel_id')->references('id')->on('users_panel')->onUpdate('cascade')->onDelete('cascade');
    });

    Schema::table('users_panel', function (Blueprint $table) {
      $table->unsignedInteger('nivel')->after('cpf')->default(1)->comment('Nível do usuário');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('users_panel_tenants');

    Schema::table('users_panel', function (Blueprint $table) {
      $table->dropColumn('nivel');
    });

  }
}
