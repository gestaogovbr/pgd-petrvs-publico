<?php

namespace App\Services;

use App\Models\Perfil;
use App\Services\RawWhere;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;

class PerfilService extends ServiceBase {

    public $perfis = [ /* Nivel, Nome, Descrição */
        [0, "Desenvolvedor", "Perfil de Desenvolvedor - Todas as permissões"],
        [1, "Administrador", "Perfil de Administrador"],
        [2, "Usuário Nível 5", "Nível 5 - Todas as permissões de todas unidades, sem restrições"],
        [3, "Usuário Nível 4", "Nível 4 - Todas as permissões somente de sua unidade e unidades filhas, com as restrições da tabela"],
        [4, "Usuário Nível 3", "Nível 3 - Demandas, Gestão, Configurações pessoais e Inclusão de Demandas e restrições tabela, e as opções somente de sua unidade"],
        [5, "Usuário Nível 2", "Nível 2 - Demandas, Gestão, Configurações pessoais, Inclusão de Demandas e Acesso á Cadastro somente na primeira parte, e as opções somente de sua unidade"],
        [6, "Usuário Nível 1", "Nível 1 - Demandas, Gestão e Configurações pessoais"],
    ];

    /**
     * Estes usuários terão seus perfis automaticamente definidos como Desenvolvedor, se já estiverem cadastrados na tabela Usuários
     */
    public $developers = [
        ["25941933304", "Ricardo Farias"],
        ["07408707425", "Genisson Albuquerque"]
    ];

    public function proxySearch($query, &$data, &$text) {
        $data["where"][] = RawWhere::raw("(data_fim is null or data_fim > NOW()) and nivel >= " . parent::loggedUser()->Perfil->nivel);
        $data["orderBy"][] = ["nivel", "asc"];
    }

    public function differentDev(&$data) {
        if(!$this->isLoggedUserADeveloper()){
            if(isset($data['where']) && count($data['where']) > 0) {
                if(gettype($data['where'][0]) == "string") {
                    $data['where'] = [["nome", "!=", "Desenvolvedor"], $data['where']];
                } else {
                    $data['where'][] = ["nome", "!=", "Desenvolvedor"];
                }
            } else {
                $data['where'] = [["nome", "!=", "Desenvolvedor"]];
            }
        }
    }

    public function searchText($data) {
        $this->differentDev($data);
        return parent::searchText($data);
    }

    public function query($data) {
        $this->differentDev($data);
        return parent::query($data);
    }

    /* existe uma incoerência entre o nivel e a importância dele.  A inclusão de perfis intermediários quebra a lógica.
    perfil              atual   proposto
    desenvolvedor       0       70
    administrador       1       60
    nível 5             2       50
    nivel 4             3       40
    nivel 3             4       30
    nivel 2             5       20
    nivel 1             6       10

    */



}

