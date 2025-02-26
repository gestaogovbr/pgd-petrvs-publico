<?php

namespace App\Services;

use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Models\TipoCapacidade;
use App\Models\Perfil;
use Illuminate\Support\Facades\DB;

class PerfilService extends ServiceBase {

    public $perfis = [ 
        [0, "Perfil Desenvolvedor", "Perfil de Desenvolvedor - todas as permissões"],
        [1, "Perfil Administrador Master", "Representantes da unidade autorizadora"],
        [2, "Perfil Administrador Negocial", "Perfil destinado ao(s) administrador(es) do sistema"],
        [3, "Perfil Unidade", "Nível de acesso ao sistema destinado à(s) equipe(s) de chefia das unidades executoras"],        
        [5, "Perfil Participante", "Participante do PGD"],
        [6, "Perfil Colaborador", "Agente públicos não selecionáveis para o PGD (ex: estagiários, terceirizados, etc)"],
    ];

    /**
     * Estes usuários terão seus perfis automaticamente definidos como Desenvolvedor, se já estiverem cadastrados na tabela Usuários
     */
    public $developers = [];

    public function proxySearch($query, &$data, &$text) {
        $data["where"][] = RawWhere::raw("(deleted_at is null or deleted_at > NOW()) and nivel >= " . parent::loggedUser()->Perfil->nivel);
        $data["orderBy"][] = ["nivel", "asc"];
    }

    public function proxyStore(&$data, $unidade, $action){
        if($action == self::ACTION_EDIT && !empty($data['capacidades'])){
            foreach($data['capacidades'] as &$c){
                if (empty($c['id'])){
                    $capacidadeCodigo = TipoCapacidade::find($c['tipo_capacidade_id'])->codigo;
                    $perfilNivel = Perfil::find($c['perfil_id'])->nivel;
                    $c['id'] = $this->utilService->uuid($perfilNivel . $capacidadeCodigo);
                }
            }
        };
        return $data;
    }

    public function differentDev(&$data) {
        if(!$this->isLoggedUserADeveloper()){
            if(isset($data['where']) && count($data['where']) > 0) {
                if(gettype($data['where'][0]) == "string") {
                    $data['where'] = [["nivel", "!=", 0], $data['where']];
                } else {
                    $data['where'][] = ["nivel", "!=", 0];
                }
            } else {
                $data['where'] = [["nivel", "!=", 0]];
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

    public function alteraPerfilUsuario(string $idUsuario, string $perfilId) : void
    {
        $values = [
            ':perfil_id' => $perfilId,
            ':id' => $idUsuario
        ];
        $sqlPerfilUpdate = "UPDATE usuarios SET perfil_id = :perfil_id WHERE id = :id";
        DB::update($sqlPerfilUpdate, $values);
    }
}

