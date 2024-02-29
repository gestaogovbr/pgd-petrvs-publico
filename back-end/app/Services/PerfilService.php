<?php

namespace App\Services;

use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Models\TipoCapacidade;
use App\Models\Perfil;

class PerfilService extends ServiceBase {

    public $perfis = [ /* Nivel, Nome, Descrição */

        //["c2129e55-bef9-510a-1b49-6d94e874d071",
        [0, "Desenvolvedor", "Perfil de Desenvolvedor - todas as permissões"],

        //["2a2e9a58-1027-84ca-18e2-605a4e727b5f",
        [1, "Administrador Negocial", "Perfil destinado ao(s) administrador(es) do sistema"],

        //["e24195d1-3c9c-9a76-b1c1-56b6b690b81b",
        // [2, "Usuário Nível 5", "Nível 5 - Todas as permissões de todas unidades, sem restrições"],

        //["aed7777c-77bf-ec57-7094-43593a70fbcf",
        // [3, "Usuário Nível 4", "Nível 4 - Todas as permissões somente de sua unidade e unidades filhas, com as restrições da tabela"],

        //["a4a74685-193b-6e1f-1c3e-12cd936bda77",
        // [4, "Usuário Nível 3", "Nível 3 - Atividades, Gestão, Configurações pessoais e Inclusão de Atividades e restrições tabela, e as opções somente de sua unidade"],

        //["d899e756-0ceb-de8c-2f68-97b4c38823fd",
        // [5, "Usuário Nível 2", "Nível 2 - Atividades, Gestão, Configurações pessoais, Inclusão de Atividades e Acesso a Cadastro somente na primeira parte, e as opções somente de sua unidade"],

        //["4158ce58-b8c7-4725-4708-b93903a853e7",
        // [6, "Usuário Nível 1", "Nível 1 - Atividades, Gestão e Configurações pessoais"],

        // Seeder IN24_2023 //
        //["4bb1a4b5-b0f1-4a39-9ff1-0ce7e853d84d", b684857b-48f3-8e0a-d496-66b0fbcee684 (gerado automaticamente)
        [3, "Chefia de Unidade Executora", "Nível de acesso ao sistema destinado à(s) equipe(s) de chefia das unidades executoras"],

        //["1dc7c3ac-4888-4f5a-b181-ac14c07cc152", 0d8771a5-7210-b879-0779-55d46948a2b3 (gerado automaticamente)
        [5, "Participante", "Participante do PGD"],
    ];

    /**
     * Estes usuários terão seus perfis automaticamente definidos como Desenvolvedor, se já estiverem cadastrados na tabela Usuários
     */
    public $developers = [
        ["25941933304", "Ricardo Farias"],
        ["67703011053", "Edson Marian"],
        ["07408707425", "Genisson Albuquerque"],
        ["01380127416", "Edson França"],
    ];

    public function proxySearch($query, &$data, &$text) {
        $data["where"][] = RawWhere::raw("(deleted_at is null or deleted_at > NOW()) and nivel >= " . parent::loggedUser()->Perfil->nivel);
        $data["orderBy"][] = ["nivel", "asc"];
    }

    public function proxyStore(&$data, $unidade, $action){
        if($action == self::ACTION_EDIT && !empty($data['capacidades'])){
            foreach($data['capacidades'] as &$c){
                if (empty($c['id'])){
                    $capacidadeCodigo = TipoCapacidade::find($c['tipo_capacidade_id'])->codigo;
                    $perfilNome = Perfil::find($c['perfil_id'])->nome;
                    $c['id'] = $this->utilService->uuid($perfilNome . $capacidadeCodigo);
                }
            }
        };
        return $data;
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

