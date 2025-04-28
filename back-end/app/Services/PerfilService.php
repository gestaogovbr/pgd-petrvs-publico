<?php

namespace App\Services;

use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Models\TipoCapacidade;
use App\Models\Perfil;
use Illuminate\Support\Facades\DB;

class PerfilService extends ServiceBase {

    public $perfis = [
        [0, "Perfil Desenvolvedor", "Representantes do órgão Central do Siorg"],
        [1, "Perfil Administrador Master", "Representantes da unidade autorizadora"],
        [2, "Perfil Administrador Negocial", "Representantes de unidades instituidoras"],
        [3, "Perfil Unidade", "Representantes de unidades executoras"],
        [5, "Perfil Participante", "Agentes públicos selecionáveis para o PGD"],
        [6, "Perfil Colaborador", "Agente públicos não selecionáveis para o PGD (ex: Terceirizados)"],
    ];

    /**
     * Estes usuários terão seus perfis automaticamente definidos como Desenvolvedor, se já estiverem cadastrados na tabela Usuários
     */
    public $developers = [];

    public function proxySearch($query, &$data, &$text) {
        $nivelLogado = parent::loggedUser()->Perfil->nivel;
        $nivelCondicao = $nivelLogado == 6 ? "nivel > 1" : "nivel >= ?";
        $data["where"][] = RawWhere::raw("(deleted_at IS NULL OR deleted_at > NOW()) AND $nivelCondicao", $nivelLogado == 6 ? [] : [$nivelLogado]);
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

