<?php

namespace App\Services;

use App\Models\Perfil;
use App\Services\RawWhere;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;

class PerfilService extends ServiceBase {

    public $perfis = [
        ["74051a4a-6e25-4aab-9abc-8872c6c1029a", 1, "Administrador", "Perfil de Administrador", "2022-02-15 18:13:39", NULL],
        ["f219a1f5-bb60-11ec-a5bb-0050569c64a0", 2, "Usuário Nível 5", "Nível 5 - Todas as permissões de todas unidades, sem restrições", "2022-04-13 16:35:59", NULL],
        ["f212872c-bb60-11ec-a5bb-0050569c64a0", 3, "Usuário Nível 4", "Nível 4 - Todas as permissões somente de sua unidade e unidades filhas, com as restrições da tabela", "2022-04-13 16:35:59", NULL],
        ["f20b8b2f-bb60-11ec-a5bb-0050569c64a0", 4, "Usuário Nível 3", "Nível 3 - Demandas, Gestão, Configurações pessoais e Inclusão de Demandas e restrições tabela, e as opções somente de sua unidade", "2022-04-13 16:35:59", NULL],
        ["f2049673-bb60-11ec-a5bb-0050569c64a0", 5, "Usuário Nível 2", "Nível 2 - Demandas, Gestão, Configurações pessoais, Inclusão de Demandas e Acesso á Cadastro somente na primeira parte, e as opções somente de sua unidade", "2022-04-13 16:35:59", NULL],
        ["66399e46-c0a3-4db5-ba94-05ff517752f6", 6, "Usuário Nível 1", "Nível 1 - Demandas, Gestão e Configurações pessoais", "2022-04-06 11:22:10", NULL]
    ];

    public function proxySearch($query, &$data, &$text) {
        $data["where"][] = RawWhere::raw("(data_fim is null or data_fim > NOW()) and nivel >= " . Auth::user()->Perfil->nivel);
        $data["orderBy"][] = ["nivel", "asc"];
    }

}
