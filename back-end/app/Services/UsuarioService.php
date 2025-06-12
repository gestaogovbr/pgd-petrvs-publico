<?php

namespace App\Services;

use Exception;
use Throwable;
use SimpleXMLElement;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\Programa;
use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Models\UnidadeIntegrante;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;
use App\Exceptions\ValidateException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;
use App\Services\Siape\DadosExternosSiape;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Services\Siape\Consulta\Resources\DadosPessoaisResource;
use App\Services\Siape\Consulta\Resources\DadosFuncionaisResource;
use App\Services\Siape\Consulta\SiapeDadosPessoaisService;
use App\Services\Siape\Consulta\SiapeDadosFuncionaisService;
use App\Models\SiapeDadosUORG;
use App\Services\Siape\Consulta\Resources\UnidadeResource;
use App\Services\Siape\Consulta\Resources\UnidadesResource;
use App\Services\Siape\Consulta\SiapeUnidadeService;
use App\Services\Siape\Consulta\SiapeUnidadesService;
use Carbon\Carbon;


class UsuarioService extends ServiceBase
{

  use DadosExternosSiape;

  const LOGIN_GOOGLE = "GOOGLE";
  const LOGIN_MICROSOFT = "AZURE";
  const LOGIN_FIREBASE = "FIREBASE";



  public function atualizarFotoPerfil($tipo, &$usuario, $url)
  {
    $mudou = ($tipo == UsuarioService::LOGIN_GOOGLE ? $usuario->foto_google != $url : ($tipo == UsuarioService::LOGIN_MICROSOFT ? $usuario->foto_microsoft != $url : ($tipo == UsuarioService::LOGIN_FIREBASE ? $usuario->foto_firebase != $url : false)));
    if (!empty($url) && !empty($usuario) && $mudou) {
      $downloaded = $this->downloadImgProfile($url, "usuarios/" . $usuario->id);
      if (!empty($downloaded)) {
        $usuario->foto_perfil = $downloaded;
        switch ($tipo) {
          case UsuarioService::LOGIN_GOOGLE:
            $usuario->foto_google = $url;
            break;
          case UsuarioService::LOGIN_MICROSOFT:
            $usuario->foto_microsoft = $url;
            break;
          case UsuarioService::LOGIN_FIREBASE:
            $usuario->foto_firebase = $url;
            break;
        }
        $usuario->save();
      }
    }
  }

  public function downloadImgProfile($url, $path)
  {
    if (!Storage::exists($path)) {
      Storage::makeDirectory($path, 0755, true);
    }
    try {
      $contents = file_get_contents($url);
    } catch (Throwable $e) {
    }
    if (!empty($contents)) {
      $name = $path . "/profile_" . md5($contents) . ".jpg";
      if (!Storage::exists($name))
        Storage::put($name, $contents);
      return $name;
    } else {
      return "";
    }
  }

  public function extraStore($entity, $unidade, $action)
  {

    foreach ($this->buffer["integrantes"] as &$integrante) {
      $integrante["usuario_id"] = $entity->id;
    }
    $this->UnidadeIntegranteService->salvarIntegrantes($this->buffer["integrantes"]);
    if ($action != ServiceBase::ACTION_INSERT)
      $this->unidadeIntegranteAtribuicaoService->checkLotacoes($entity->id);
  }

  public function hasLotacao($id, $usuario = null, $subordinadas = true)
  {
    return Unidade::where("id", $id)->whereRaw($this->areasTrabalhoWhere($subordinadas, $usuario, ""))->count() > 0;
  }

  /**
   * Informa quais atribuições de gestor o usuário logado possui na unidade recebida como parâmetro.
   * @param string $unidade_id
   */
  public function atribuicoesGestor(string $unidadeId, ?string $usuarioId = null)
  {
    $result = ["gestor" => false, "gestorSubstituto" => false, "gestorDelegado" => false];
    $key = [$unidadeId, $usuarioId];
    if ($this->hasBuffer("atribuicoesGestor", $key)) {
      $result = $this->getBuffer("atribuicoesGestor", $key);
    } else {
      $result = $this->setBuffer("atribuicoesGestor", $key, [
        "gestor" => $this->isIntegrante('GESTOR', $unidadeId, $usuarioId),
        "gestorSubstituto" => $this->isIntegrante('GESTOR_SUBSTITUTO', $unidadeId, $usuarioId),
        "gestorDelegado" => $this->isIntegrante('GESTOR_DELEGADO', $unidadeId, $usuarioId)
      ]);
    }
    return $result;
  }

  /**
   * Informa se o usuário logado é gestor(titular ou substituto) da unidade recebida como parâmetro.
   * @param string $unidade_id
   */
  public function isGestorUnidade(string $unidadeId, $incluiDelegado = true): bool
  {
    if ($this->hasBuffer("isGestorUnidade", $unidadeId)) {
      return $this->getBuffer("isGestorUnidade", $unidadeId);
    } else {
      return $this->setBuffer("isGestorUnidade", $unidadeId, $this->isIntegrante('GESTOR', $unidadeId) || $this->isIntegrante('GESTOR_SUBSTITUTO', $unidadeId) || ($incluiDelegado && $this->isIntegrante('GESTOR_DELEGADO', $unidadeId)));
    }
  }

  /**
   * Informa se o usuário logado é participante do plano de trabalho recebido como parâmetro.
   * @param string $unidade_id
   */
  public function isParticipante($planoTrabalho)
  {
    return $planoTrabalho['usuario_id'] == self::loggedUser()->id;
  }

  /**
   * Recebe os IDs de um usuário e de um programa, e informa se o usuário é participante habilitado do Programa.
   * Se o usuário não for informado, será utilizado o usuário logado.
   * @param string $usuario_id
   * @param string $pgd_id
   * @return bool
   */
  public function isParticipanteHabilitado(string|null $usuarioId = null, string $programaId): bool
  {
    $key = [$usuarioId, $programaId];
    if ($this->hasBuffer("isParticipanteHabilitado", $key)) {
      return $this->getBuffer("isParticipanteHabilitado", $key);
    } else {
      $usuarioId = $usuarioId ?? parent::loggedUser()->id;
      $programa = Programa::withTrashed()->find($programaId);
      $participante = $programa->participantes->where("usuario_id", $usuarioId)->first();
      return $this->setBuffer("isParticipanteHabilitado", $key, $participante ? $participante->habilitado : false);
    }
  }

  /**
   * Informa se existe determinada atribuição entre o usuário e a unidade informados. Caso não seja informado um usuário, a
   * verificação será feita com base no usuário logado.
   * @param string $atribuicao
   * @param string $unidade_id
   * @param string $usuario_id
   */
  public function isIntegrante(string $atribuicao, string $unidadeId, string|null $usuarioId = null): bool
  {
    $result = false;
    $key = [$atribuicao, $unidadeId, $usuarioId];
    if ($this->hasBuffer("isIntegrante", $key)) {
      $result = $this->getBuffer("isIntegrante", $key);
    } else {
      $unidadesIntegrantesIds = UnidadeIntegrante::select('id')->where("unidade_id", $unidadeId)->where("usuario_id", isset($usuarioId) ? $usuarioId : parent::loggedUser()->id)->get()->map(fn($x) => $x->id);
      $result = $this->setBuffer("isIntegrante", $key, count($unidadesIntegrantesIds) > 0 && UnidadeIntegranteAtribuicao::where("atribuicao", $atribuicao)->whereIn("unidade_integrante_id", $unidadesIntegrantesIds)->exists());
    }
    return $result;
  }

  /**
   * Recebe os IDs de um usuário e de uma unidade, e informa se a unidade é a lotação do usuário.
   * Se o usuário não for informado, será utilizado o usuário logado.
   * @param string $unidade_id
   */
    public function isLotacao(string|null $usuario_id = null, string $unidade_id): bool
    {
        $usuario = isset($usuario_id) ? Usuario::find($usuario_id) : parent::loggedUser();

        if (!$usuario) {
            return false; // Retorna falso se o usuário não for encontrado
        }

        return $usuario->lotacao !== null && $usuario->lotacao->unidade_id == $unidade_id;
    }


  /**
   * Informa se o usuário logado tem como lotação alguma das unidades pertencentes à linha hierárquica ascendente da unidade
   * recebida como parâmetro.
   * @param string $unidade_id
   * @returns
   */
  public function isLotadoNaLinhaAscendente(string|null $unidadeId): bool
  {
    $result = false;
    if ($unidadeId == null)
      return $result;
    if ($this->hasBuffer("isLotadoNaLinhaAscendente", $unidadeId)) {
      $result = $this->getBuffer("isLotadoNaLinhaAscendente", $unidadeId);
    } else {
      $linhaAscendente = $this->unidadeService->linhaAscendente($unidadeId);
      foreach ($linhaAscendente as $unidadeId) {
        if ($this->isIntegrante('LOTADO', $unidadeId))
          $result = true;
      }
      ;
      $this->setBuffer("isLotadoNaLinhaAscendente", $unidadeId, $result);
    }
    return $result;
  }

  public function areasTrabalhoWhere($subordinadas, $usuario = null, $prefix = "")
  {
    $where = [];
    $prefix = empty($prefix) ? "" : $prefix . ".";
    $usuario = $usuario ?? parent::loggedUser();
    foreach ($usuario->areasTrabalho as $lotacao) {
      $where[] = $prefix . "id = '" . $lotacao->unidade_id . "'";
      if ($subordinadas)
        $where[] = $prefix . "path like '%" . $lotacao->unidade_id . "%'";
    }
    $result = implode(" OR ", $where);
    return empty($result) ? "false" : "(" . $result . ")";
  }

  public function proxyQuery($query, &$data)
  {
    $usuario = parent::loggedUser();
    $where = [];
    $subordinadas = true;
    $programa = $this->extractWhere($data, "programa_id");
    $lotacao = [];
    foreach ($data["where"] as $condition) {
      if (is_array($condition) && $condition[0] == "lotacao") {
        $lotacao = $condition;
        $query->whereHas('areasTrabalho', function (Builder $query) use ($condition) {
          $query->where('unidade_id', $condition[2]);
        });
      } else if (is_array($condition) && $condition[0] == "habilitado") {
        if ($condition[2] == true) {
          $query->whereHas('participacoesProgramas', function (Builder $query) use ($programa) {
            $query->where('habilitado', 1);
          });
        } else {
          if ($condition[2] != null) {
            $query->whereHas('participacoesProgramas', function (Builder $query) use ($programa) {
              $query->where('habilitado', 0);
            });
          }

        }
      } else if (is_array($condition) && $condition[0] == "subordinadas") {
        $subordinadas = $condition[2];
      } else if (is_array($condition) && $condition[0] == "atribuicoes") {
        $query->whereHas('unidadesIntegranteAtribuicoes', function (Builder $query) use ($condition) {
          $query->whereIn('atribuicao', $condition[2]);
        });
      }
      else {
        array_push($where, $condition);
      }
    }
    if (!$usuario->hasPermissionTo("MOD_USER_TUDO")) {
      $areasTrabalhoWhere = $this->areasTrabalhoWhere($subordinadas, null, "where_unidades");
      array_push($where, new RawWhere("EXISTS(SELECT where_lotacoes.id FROM lotacoes where_lotacoes LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id) WHERE where_lotacoes.usuario_id = usuarios.id AND ($areasTrabalhoWhere))", []));
    }
    $data["where"] = $where;
    return $data;
  }

  public function proxySearch($query, &$data, &$text)
  {
    $data["where"][] = ["subordinadas", "==", true];
    return $this->proxyQuery($query, $data);
  }

  public function proxyStore(&$data, $unidade, $action)
  {
    $data["with"] = [];
    $data['cpf'] = $this->UtilService->onlyNumbers($data['cpf']);

    unset($data['pedagio']);

    if (!empty($data['telefone']))
      $data['telefone'] = $this->UtilService->onlyNumbers($data['telefone']);
    /* Armazena as informações que serão necessárias no extraStore */
    $this->buffer = ["integrantes" => $this->UtilService->getNested($data, "integrantes")];
    $this->validarPerfil($data);
    $this->validarColaborador($data);
    return $data;
  }

  /**
   * Este método impede que um usuário, com perfil diferente de Desenvolvedor, tenha seu perfil alterado para este último.
   */
  public function proxyUpdate($data, $unidade)
  {
    $data["with"] = [];
    unset($data['pedagio']);
    $this->validarPerfil($data);
    $this->validarColaborador($data);
    return $data;
  }

  /**
   * Este método impede que um usuário seja inserido com e-mail/CPF já existentes no Banco de Dados, bem como
   * impede também a inserção de um usuário com o perfil de Desenvolvedor. Usuários com esse perfil só podem ser inseridos
   * através do próprio código da aplicação.
   */
  public function validateStore(&$data, $unidade, $action)
  {
    if($action == ServiceBase::ACTION_EDIT){
      if(!empty($data['matricula']) && strlen($data['matricula']) > 50)
        throw new ValidateException("O campo de matrícula deve ter no máximo 50 caracteres", 422);
    if (empty($data["integrantes"][0]))
        throw new ValidateException("Selecione uma unidade!", 422);
    }
    if ($action == ServiceBase::ACTION_INSERT) {
      if (empty($data["email"]))
         throw new ValidateException("O campo de e-mail é obrigatório", 422);
      if (empty($data["cpf"]))
         throw new ValidateException("O campo de CPF é obrigatório", 422);
      if (empty($data["integrantes"][0]))
        throw new ValidateException("Selecione uma unidade!", 422);
      $query1 = Usuario::where("id", "!=", $data["id"])->where(function ($query) use ($data) {
        return $query->where("cpf", UtilService::onlyNumbers($data["cpf"]))->orWhere("email", $data["email"]);
      });
      $query2 = Usuario::where("id", "!=", $data["id"])->whereNotNull("deleted_at")->where(function ($query) use ($data) {
        return $query->where("cpf", UtilService::onlyNumbers($data["cpf"]))->orWhere("email", $data["email"]);
      });
      $alreadyHas = $query1->first() ?? $query2->first();
      if (!empty($alreadyHas)) {
        if ($alreadyHas->deleted_at) { // Caso o usuário exista, mas esteja excluído, reabilita o usuário deletando todos os seus vínculos anteriores e recuperando seus dados sensíveis (cpf, e-mail funcional, matricula, nome, apelido, data_nascimento)
          $this->removerVinculosUsuario($alreadyHas);
          $data["id"] = $alreadyHas->id;
          $data["cpf"] = $alreadyHas->cpf;
          $data["email"] = $alreadyHas->email;

            if (is_null($data['matricula'] ?? null)) {
                $data['matricula'] = $alreadyHas->matricula;
            }

          $data["nome"] = $alreadyHas->nome;
          $data["apelido"] = $alreadyHas->apelido;
          $data["data_nascimento"] = $alreadyHas->data_nascimento;
          $alreadyHas->deleted_at = null;
          return $alreadyHas;
        } else {
          throw new ValidateException("Já existe um usuário com mesmo e-mail ou CPF no sistema", 422);
        }
      }
      $this->validarPerfil($data);
      $this->validarColaborador($data);
    }
  }

  public function removerVinculosUsuario(&$usuario)
  {
    if (!empty($usuario)) {
      foreach ($usuario->unidadesIntegrantes as $vinculo) {
        $vinculo->deleteCascade();
      }
      $usuario->fresh();
    }
  }

  public function validarPerfil($data) : void
  {
    $perfilAutenticado = $this::loggedUser()->perfil;
    if(!isset($data['perfil_id'])){
      return;
    }
    $perfilNovo = Perfil::find($data['perfil_id']);
    $perfilAtual = !empty($data['id']) ? $this->getById($data)["perfil_id"] : null;

    $this->nivelAcessoService = new NivelAcessoService();
    $developer = $this->nivelAcessoService->getPerfilDesenvolvedor();
    if (empty($developer))
      throw new ServerException("ValidateUsuario", "Perfil de Desenvolvedor não encontrado no banco de dados");

      $developerId = $developer->id;
    if ($data['perfil_id'] != $perfilAtual) {
      if (($perfilNovo->nivel < $perfilAutenticado->nivel) && $perfilAutenticado->nivel != 6)
        throw new ServerException("ValidateUsuario", "Não é possível atribuir perfil superior ao do usuário logado.");
      if ($data["perfil_id"] == $developerId && !$this->isLoggedUserADeveloper())
        throw new ServerException("ValidateUsuario", "Tentativa de alterar o perfil de/para um Desenvolvedor");
      if ($perfilAtual == $developerId && !$this->isLoggedUserADeveloper())
        throw new ServerException("ValidateUsuario", "Tentativa de alterar o perfil de um Desenvolvedor");
    }
  }

  public function validarColaborador($data) : void
  {
      // Se é um usuário externo não pode ter outro perfil com nível < 6
      $usuarioExterno = $data['usuario_externo'] ?? null;
      if ($usuarioExterno === null) {
          return;
      }

      // Garantir que perfil_id está definido antes de buscar no banco
      if (!isset($data['perfil_id'])) {
          throw new ServerException("ValidateUsuario", "ID do perfil não foi informado.");
      }

      $perfil = Perfil::find($data['perfil_id']);
      if (!$perfil) {
          throw new ServerException("ValidateUsuario", "Perfil não encontrado.");
      }

      if ($perfil->nivel < 6 && $usuarioExterno == 1) {
          throw new ServerException("ValidateUsuario", "Usuário externo não pode ter o nível de acesso: " . $perfil->nome);
      } elseif ($perfil->nivel == 6 && $usuarioExterno == 0) {
          throw new ServerException("ValidateUsuario", "Usuário não pode ter o nível de acesso: " . $perfil->nome);
      }
    }

    

  public function searchText($data)
  {
      if (!in_array('usuario_externo', $data['fields'])) {
          $data['fields'][] = 'usuario_externo';
      }
      $text = "%" . str_replace(" ", "%", $data['query']) . "%";
      $model = App($this->collection);
      $table = $model->getTable();


      // Garante que os campos tenham o nome da tabela
      $data["select"] = array_map(fn ($field) => str_contains($field, ".") ? $field : $table . "." . $field, array_merge(['id'], $data['fields']));


      // Usa Eloquent query() em vez de DB::table()
      $query = $model->query();

      if (method_exists($this, 'proxySearch')) {
          $this->proxySearch($query, $data, $text);
      }

      // Adiciona condição LIKE para busca nos campos informados
      $likes = ["or"];
      foreach ($data['fields'] as $field) {
          array_push($likes, [$field, 'like', $text]);
      }

      // Garante que deleted_at seja tratado corretamente
      $condicaoDeletados = array_filter($data['where'], fn ($w) => is_array($w) && $w[0] == "deleted_at");
      if (empty($condicaoDeletados)) {
          array_push($data['where'], ['deleted_at', '=', null]);
      }

      $where = [$likes, $data['where']];
      $this->applyWhere($query, $where, $data);
      $this->applyOrderBy($query, $data);

      // Busca apenas os campos informados
      $query->select($data["select"]);
      // Obtém os resultados
      $rows = $query->get();

      $values = [];

      $data['fields'] = array_filter($data['fields'], fn($field) => $field !== 'usuario_externo');

      foreach ($rows as $row) {
          // Ajusta os campos para ordenação
          $orderFields = array_map(fn ($order) => str_replace(".", "_", $order[0]), $data['orderBy'] ?? []);
          $orderValues = array_map(fn ($field) => $row->$field ?? null, $orderFields);

          array_push($values, [
              $row->id,
              array_map(fn ($field) => $row->$field ?? null, $data['fields']),
              $orderValues
          ]);
      }
      return $values;
  }

  public function consultaCpfSiapeXml(string $cpf): array
  {
    return $this->buscaServidor($cpf);
  }
  /**
   *
   * @param string $cpf
   * @return SimpleXMLElement[]
   */
  public function consultaCPFSiape(string $cpf): array{

    $dadosPessoaisService = new SiapeDadosPessoaisService();
    $dadosFuncionaisService = new SiapeDadosFuncionaisService();

    $dadosPessoaisXml = $dadosPessoaisService->buscarCPF($cpf);
    $dadosFuncionaisXml = $dadosFuncionaisService->buscarCPF($cpf);

    $dadosPessoais = new DadosPessoaisResource($dadosPessoaisXml);
    $dadosFuncionais = new DadosFuncionaisResource($dadosFuncionaisXml);

    $dadosFuncionaisArray = $dadosFuncionais->toArray();

    $dadosFuncionaisArray = array_map(function($item) {
      $unidade = Unidade::where('codigo', $item['codUorgExercicio'])->first();
      $item['unidadeSigla'] = $unidade?->sigla;
      return $item;
    }, $dadosFuncionaisArray);

    //$unidade = new UnidadeResource($unidadeXml);
    
    return [
      'pessoais'    => $dadosPessoais->toArray(),
      'funcionais'  => $dadosFuncionaisArray,
    ];
  }
    public function atualizaPedagio($data)
    {
        $usuario = Usuario::find($data['usuario_id']);
        if (empty($usuario)) {
            throw new ValidateException("Usuário não encontrado", 422);
        }


        $usuario->data_inicial_pedagio = Carbon::parse($data['data_inicial_pedagio']);
        $usuario->data_final_pedagio = Carbon::parse($data['data_final_pedagio']);
        $usuario->tipo_pedagio = $data['tipo_pedagio'];
        $usuario->save();
        return $usuario;
    }

    public function removePedagio($data)
    {
        $usuario = Usuario::find($data['usuario_id']);
        if (empty($usuario)) {
            throw new ValidateException("Usuário não encontrado", 422);
        }
        $usuario->data_inicial_pedagio = null;
        $usuario->data_final_pedagio = null;
        $usuario->tipo_pedagio = null;
        $usuario->save();
        return $usuario;
    }

}
