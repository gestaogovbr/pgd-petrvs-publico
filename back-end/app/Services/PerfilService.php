<?php

namespace App\Services;

use App\Services\RawWhere;
use App\Services\ServiceBase;

class PerfilService extends ServiceBase {

    public $perfis = [ /* Nivel, Nome, Descrição */
        [0, "Desenvolvedor", "Perfil de Desenvolvedor - Todas as permissões"],
        [1, "Administrador", "Perfil de Administrador"],
        [2, "Usuário Nível 5", "Nível 5 - Todas as permissões de todas unidades, sem restrições"],
        [3, "Usuário Nível 4", "Nível 4 - Todas as permissões somente de sua unidade e unidades filhas, com as restrições da tabela"],
        [4, "Usuário Nível 3", "Nível 3 - Atividades, Gestão, Configurações pessoais e Inclusão de Atividades e restrições tabela, e as opções somente de sua unidade"],
        [5, "Usuário Nível 2", "Nível 2 - Atividades, Gestão, Configurações pessoais, Inclusão de Atividades e Acesso a Cadastro somente na primeira parte, e as opções somente de sua unidade"],
        [6, "Usuário Nível 1", "Nível 1 - Atividades, Gestão e Configurações pessoais"],

        // Seeder IN24_2023
        [3, "Chefe de Unidade Executora", "Usuário Chefe de Unidade Executora e Gestores Similares"],
        [5, "Participante", "Participante do PGD"],
    ];

    /**
     * Estes usuários terão seus perfis automaticamente definidos como Desenvolvedor, se já estiverem cadastrados na tabela Usuários
     */
    public $developers = [
        ["25941933304", "Ricardo Farias"],
        ["67703011053", "Edson Marian"],
        ["07408707425", "Genisson Albuquerque"]
    ];

    public function proxySearch($query, &$data, &$text) {
        $data["where"][] = RawWhere::raw("(deleted_at is null or deleted_at > NOW()) and nivel >= " . parent::loggedUser()->Perfil->nivel);
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
}

