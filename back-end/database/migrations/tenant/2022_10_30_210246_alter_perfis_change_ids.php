<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Services\UtilService;
use Illuminate\Support\Facades\DB;

class AlterPerfisChangeIds extends Migration
{
    /* Todas os perfis até 30/10/2022 */
    public $perfis = [
        ["77001b4b-6e25-4aab-9abc-8872c6c1029a", 0, "Desenvolvedor", "Perfil de Desenvolvedor - Todas as permissões", "2022-04-19 11:26:22", NULL],
        ["74051a4a-6e25-4aab-9abc-8872c6c1029a", 1, "Administrador", "Perfil de Administrador", "2022-02-15 18:13:39", NULL],
        ["f219a1f5-bb60-11ec-a5bb-0050569c64a0", 2, "Usuário Nível 5", "Nível 5 - Todas as permissões de todas unidades, sem restrições", "2022-04-13 16:35:59", NULL],
        ["f212872c-bb60-11ec-a5bb-0050569c64a0", 3, "Usuário Nível 4", "Nível 4 - Todas as permissões somente de sua unidade e unidades filhas, com as restrições da tabela", "2022-04-13 16:35:59", NULL],
        ["f20b8b2f-bb60-11ec-a5bb-0050569c64a0", 4, "Usuário Nível 3", "Nível 3 - Demandas, Gestão, Configurações pessoais e Inclusão de Demandas e restrições tabela, e as opções somente de sua unidade", "2022-04-13 16:35:59", NULL],
        ["f2049673-bb60-11ec-a5bb-0050569c64a0", 5, "Usuário Nível 2", "Nível 2 - Demandas, Gestão, Configurações pessoais, Inclusão de Demandas e Acesso á Cadastro somente na primeira parte, e as opções somente de sua unidade", "2022-04-13 16:35:59", NULL],
        ["66399e46-c0a3-4db5-ba94-05ff517752f6", 6, "Usuário Nível 1", "Nível 1 - Demandas, Gestão e Configurações pessoais", "2022-04-06 11:22:10", NULL]
    ];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $util = new UtilService();
        DB::beginTransaction();
        /* Remove capacidade que estava em duplicidade */ 
        foreach($this->perfis as $perfil) {
            DB::update("UPDATE perfis SET id = :novo WHERE id = :antigo", [":novo" => $util->uuid($perfil[2]), ":antigo" => $perfil[0]]);
        }
        DB::commit();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $util = new UtilService();
        DB::beginTransaction();
        /* Remove capacidade que estava em duplicidade */ 
        foreach($this->perfis as $perfil) {
            DB::update("UPDATE perfis SET id = :novo WHERE id = :antigo", [":novo" => $perfil[0], ":antigo" => $util->uuid($perfil[2])]);
        }
        DB::commit();
    }
}
