<?php

namespace App\Services;

use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Services\CalendarioService;
use App\Services\UtilService;
use App\Exceptions\ServerException;
use App\Models\Documento;
use Illuminate\Support\Facades\DB;
use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Support\Facades\Auth;
use App\Models\Programa;
use App\Models\ProgramaParticipante;
use App\Models\DocumentoAssinatura;
use App\Models\PlanoEntregaEntrega;
use App\Models\TipoModalidade;
use Carbon\Carbon;
use DateTime;
use Throwable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Builder;

class PlanoTrabalhoService extends ServiceBase
{
    public $documentoId;

    /**
     * Retorna todos os Planos de Trabalho de um determinado usuário, que ainda se encontram dentro da vigência
     *
     * @param string $usuario_id
     * @return  Illuminate\Database\Eloquent\Collection
     */
    public function planosAtivos($usuario_id): Collection
    {
        return PlanoTrabalho::where("usuario_id", $usuario_id)->where("data_inicio", "<=", now())->where("data_fim", ">=", now())->get();
        // adicionar no gitlab para considerar o fuso horário
    }

    /**
     * Retorna um array com todos os Planos de Trabalho de um determinado Usuário, cuja vigência encontra-se dentro do período estabelecido.
     *
     * @param string $data_inicial Data inicial do período.
     * @param string $data_final Data final do período.
     * @param string $usuario_id O ID do Usuário.
     * @return  Illuminate\Database\Eloquent\Collection
     */
    public function planosAtivosPorData($data_inicial, $data_final, $usuario_id): Collection
    {
        return PlanoTrabalho::where("usuario_id", $usuario_id)
            ->where("data_inicio", "<=", $data_final)
            ->where("data_fim", ">=", $data_inicial)->get();
    }

    public function proxySearch($query, &$data, &$text)
    {
        $query->with(["usuario"]);
    }

    public function proxyQuery($query, &$data)
    {
        $where = [];
        // (RI_PTR_C) Garante que, se não houver um interesse específico na data de arquivamento, só retornarão os planos de trabalho não arquivados.
        $arquivados = $this->extractWhere($data, "incluir_arquivados");
        $subordinadas = $this->extractWhere($data, "incluir_subordinadas");
        // (RN_PTR_I) Quando a Unidade Executora não for a unidade de lotação do servidor, seu gestor imediato e seus substitutos devem ter acesso ao seu Plano de Trabalho (e à sua execução);
        $lotadosMinhaUnidade = $this->extractWhere($data, "lotados_minha_unidade");
        if (empty($arquivados) || !$arquivados[2])
            $data["where"][] = ["data_arquivamento", "==", null];
        $unidadeId = $this->extractWhere($data, "unidade_id");
        if (is_array($unidadeId) && isset($unidadeId[2])) {
            $ids[] = $unidadeId[2];
            $data["where"][] = ['unidade_id', 'in', array_unique($ids)];

        }
        if (isset($subordinadas[2])) { // Verifica se o índice existe
            $unidadeService = new UnidadeService();

            // Define $uId corretamente, verificando a existência do índice
            if (empty($unidadeId)) {
                $uId = isset($unidades_vinculadas[2]) ? $unidades_vinculadas[2] : null;
            } else {
                $uId = isset($unidadeId[2]) ? $unidadeId[2] : null;
            }

            // Só continua se $uId não for nulo
            if ($uId) {
                $unidadesSubordinadas = $unidadeService->subordinadas($uId);
                $subordinadasIds = $unidadesSubordinadas->pluck('id')->toArray();
                $ids = array_merge($ids, $subordinadasIds);

                if (!empty($ids)) {
                    $data["where"][] = ["unidade_id", "in", $ids];
                }
            }

            // **Processo para unificar os filtros de unidade_id**
            $unidadeIds = [];

            foreach ($data["where"] as $key => $where) {
                if ($where[0] === 'unidade_id') {
                    if ($where[1] === '==') {
                        $unidadeIds[] = $where[2]; // Adiciona o valor único
                        unset($data["where"][$key]); // Remove a condição original
                    } elseif ($where[1] === 'in') {
                        $unidadeIds = array_merge($unidadeIds, $where[2]); // Mescla os valores existentes
                        unset($data["where"][$key]); // Remove a condição original
                    }
                }
            }

            // Se houver IDs, adiciona a condição unificada
            if (!empty($unidadeIds)) {
                // Filtra somente os elementos que são arrays (evita strings perdidas)
                $arraysSomente = array_filter($unidadeIds, 'is_array');

                if (!empty($arraysSomente)) {
                    // Achata apenas os arrays válidos
                    $unidadeIds = array_merge(...$arraysSomente);
                }

                // Agora $unidadeIds pode conter valores de strings soltas + os mesclados
                // Então garantimos que tudo seja um array plano e único
                $unidadeIds = array_unique(
                    array_merge(
                        is_array($unidadeIds) ? $unidadeIds : [$unidadeIds]
                    )
                );

                $data["where"][] = ['unidade_id', 'in', array_values($unidadeIds)];
            }



        }
        foreach ($data["where"] as $condition) {
            if (is_array($condition) && $condition[0] == "data_filtro") {
                $dataInicio = $this->getFilterValue($data["where"], "data_filtro_inicio");
                $dataFim = $this->getFilterValue($data["where"], "data_filtro_fim");
                switch ($condition[2]) {
                    case "VIGENTE":
                        $where[] = ["data_inicio", "<=", $dataFim];
                        $where[] = ["data_fim", ">=", $dataInicio];
                        break;
                    case "NAOVIGENTE":
                        ;
                        $where[] = ["OR", ["data_inicio", ">", $dataFim], ["data_fim", "<", $dataInicio]];
                        break;
                    case "INICIAM":
                        ;
                        $where[] = ["data_inicio", ">=", $dataInicio];
                        $where[] = ["data_inicio", "<=", $dataFim];
                        break;
                    case "FINALIZAM":
                        ;
                        $where[] = ["data_fim", ">=", $dataInicio];
                        $where[] = ["data_fim", "<=", $dataFim];
                        break;
                }
            } else if (!(is_array($condition) && in_array($condition[0], ["data_filtro_inicio", "data_filtro_fim"]))) {
                array_push($where, $condition);
            }
        }
        if (!empty($lotadosMinhaUnidade)) {
            $unidadesComChefia = array_filter(array_merge([$this->loggedUser()->gerenciaTitular?->unidade_id], $this->loggedUser()->gerenciasSubstitutas?->map(fn($x) => $x->unidade_id)->toArray()));
            $usuariosLotados = [];
            foreach ($unidadesComChefia as $unidadeId) {
                //$usuariosLotados = array_merge($usuariosLotados, array_map(fn($x) => $x->id, $this->unidadeService->lotados($unidadeId)));
                $usuariosLotados = array_merge(
                    $usuariosLotados,
                    array_map(fn($x) => $x?->id, $this->unidadeService->lotados($unidadeId)) // Usa `?->id` para evitar erro em null
                );
            }
            $where = ["or", ["usuario_id", "in", $usuariosLotados], $where];
        }


        $data["where"] = $where;
    }

    public function proxyStore($plano, $unidade, $action)
    {
        $plano["criacao_usuario_id"] = parent::loggedUser()->id;
        $this->documentoId = $plano["documento_id"];
        $plano["documento_id"] = null;
        return $plano;
    }

    public function validateStore($data, $unidade, $action)
    {
        $usuario = Usuario::with("areasTrabalho")->find($data["usuario_id"]);
        $tipoModalidade = TipoModalidade::find($data["tipo_modalidade_id"]);
        $programa = Programa::find($data["programa_id"]);
        $condicoes = $this->buscaCondicoes($data);
        /* Resumo da PTR:TABELA_1 para Inclusão e Alteração:
        Usuario do Plano          Usuario Logado
        PT do Chefe.............: CF?,CF+,CS+
        PT do Chefe Sub.........: CF,CS?,CF+,CS+
        PT do Delegado..........: CF,CS,DL?
        PT do Lotado/Colaborador: CF,CS,DL,LC? */
        $validoTabela1 = false;
        if ($condicoes['usuarioEhParticipantePlano']) { /* Plano do próprio usuário logado */
            $validoTabela1 = $condicoes['usuarioEhParticipanteHabilitado'];
        } else {
            $validoTabela1 = $condicoes["gestorUnidadeExecutora"] || $condicoes['logadoEhChefe'];
        }
        /* (RN_PTR_AA) Um Plano de Trabalho não pode ser incluído/alterado se apresentar período conflitante com outro Plano de Trabalho já existente para a mesma unidade/servidor, a menos que o usuário logado possua a capacidade MOD_PTR_INTSC_DATA; */
        $conflito = PlanoTrabalho::
            where("usuario_id", $data["usuario_id"])->
            where("unidade_id", $data["unidade_id"])->
            where("data_inicio", "<=", $data["data_fim"])->
            where("data_fim", ">=", $data["data_inicio"])->
            where("status", "!=", "CANCELADO")->
            where("id", "!=", UtilService::valueOrNull($data, "id"))->
            first();
        if (!empty($conflito)) {
            throw new ServerException("ValidatePlanoTrabalho", "Este participante já possui plano de trabalho cadastrado para o período");
        }
        /* Validar documento_id */
        if (empty($data["documento_id"])) {
            throw new ServerException("ValidatePlanoTrabalho", "TCR não foi gerado.");
        }

        // Validar Modalidade
        if (!empty($tipoModalidade) && $tipoModalidade->exige_pedagio && !empty($usuario->pedagio)) {
            if (empty($usuario->data_inicial_pedagio) || empty($usuario->data_final_pedagio)) {
                throw new ServerException(
                    "ValidateUsuario",
                    "Dados de pedágio incompletos para o participante. Verifique as datas de início e fim do pedágio."
                );
            }
            // Verificar sobreposição de datasAdd commentMore actions
            $inicioPedagio = Carbon::parse($usuario->data_inicial_pedagio);
            $fimPedagio = Carbon::parse($usuario->data_final_pedagio);

            $inicioPlano = Carbon::parse($data["data_inicio"]);
            $fimPlano = Carbon::parse($data["data_fim"]);

            $sobrepoe = !(
                $fimPlano < $inicioPedagio || $inicioPlano > $fimPedagio
            );
            if ($sobrepoe) {
                throw new ServerException(
                    "ValidatePlanoTrabalho",
                    "Modalidade Teletrabalho indisponível para o participante de " .
                    Carbon::parse($usuario->data_inicial_pedagio)->format('d/m/Y') .
                    " até " .
                    Carbon::parse($usuario->data_final_pedagio)->format('d/m/Y')
                );
            }
        }
        if ($action == ServiceBase::ACTION_INSERT) {
            /*
            (RN_PTR_V) Condições para que um Plano de Trabalho possa ser criado:
              - o usuário logado precisa possuir a capacidade "MOD_PTR_INCL", e:
                - o usuário logado precisa ser um participante do PGD, habilitado, ou atender aos critérios da TABELA_1; [RN_PTR_B]; e
                - o participante do plano precisa ser LOTADO/COLABORADOR na unidade do plano, ou este deve possuir a capacidade MOD_PTR_USERS_INCL (RN_PTR_Y); e
                - o novo Plano de Trabalho não pode apresentar período conflitante com outro plano já existente para a mesma Unidade Executora e mesmo participante, ou o usuário logado possuir a capacidade MOD_PTR_INTSC_DATA (RN_PTR_AA)
            */
            /* (RN_PTR_B) O Plano de Trabalho pode ser incluído pelo próprio servidor, se ele for "participante do programa" habilitado, ou pelas condições da TABELA_1 */
            if (!$validoTabela1)
                throw new ServerException("ValidatePlanoTrabalho", "Usuário não foi selecionado para participar do regramento. Solicite à chefia para fazer a seleção de participante na aba de planejamento");
            /* (RN_PTR_Y) Para incluir um Plano de Trabalho para um participante, é necessário que este esteja LOTADO/COLABORADOR na unidade executora, a menos que este possua a capacidade MOD_PTR_USERS_INCL; */
            if (!parent::loggedUser()->hasPermissionTo('MOD_PTR_USERS_INCL') && !$condicoes["participanteColaboradorUnidadeExecutora"] && !$condicoes["participanteLotadoUnidadeExecutora"]) {
                throw new ServerException("ValidatePlanoTrabalho", "Participante do plano não é LOTADO ou COLABORADOR na unidade executora. (MOD_PTR_USERS_INCL)\n[ver RN_PTR_Y]");
            }

            $entregasValidas = $this->validarClone($data);
            if ($entregasValidas) {
                throw new ServerException("ValidatePlanoTrabalho", $entregasValidas);
            }
        } else if ($action == ServiceBase::ACTION_EDIT) {
            /*
            (RN_PTR_M) Condições para que um Plano de Trabalho possa ser alterado:
            O usuário logado precisa possuir a capacidade "MOD_PTR_EDT", o Plano de Trabalho precisa ser válido (ou seja, nem deletado, nem arquivado, nem estar no status CANCELADO), e:
              - estando com o status 'INCLUIDO' ou 'AGUARDANDO_ASSINATURA', o usuário logado precisa atender os critérios da ação Alterar da TABELA_1;
              - estando com o status 'ATIVO', o usuário precisa possuir a capacidade MOD_PTR_EDT_ATV e atender os critérios da ação Alterar da TABELA_1;
            Após alterado, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
            A alteração não pode apresentar período conflitante com outro plano já existente para a mesma Unidade Executora e mesmo participante, ou o usuário logado possuir a capacidade MOD_PTR_INTSC_DATA (RN_PTR_AA)
            */
            if (!$condicoes['planoValido'])
                throw new ServerException("ValidatePlanoTrabalho", "O plano de trabalho não é válido, ou seja, foi apagado, cancelado ou arquivado.\n[ver RN_PTR_M]");
            if (($condicoes['planoIncluido'] || $condicoes['planoAguardandoAssinatura']) && !$validoTabela1)
                throw new ServerException("ValidateUsuario", "Para alterar um plano de trabalho no status INCLUIDO ou AGUARDANDO_ASSINATURA, o usuário logado precisa atender os critérios da ação Alterar da [PTR:TABELA_1].\n[ver RN_PTR_M]");
            if ($condicoes['planoAtivo'] && (!$validoTabela1 || !$usuario->hasPermissionTo('MOD_PTR_EDT_ATV')))
                throw new ServerException("ValidateUsuario", "Para alterar um plano de trabalho no status ATIVO, o usuário logado precisa atender os critérios da ação Alterar da TABELA_1 e possuir a capacidade específica (MOD_PTR_EDT_ATV).\n[ver RN_PTR_M]");
            $plano = PlanoTrabalho::find($data["id"]);
            /*
            (RN_PTR_AD) Após criado um plano de trabalho, a sua unidade e programa não podem mais ser alterados.
            (RN_PTR_AE) Após criado um plano de trabalho, o usuário do plano não poderá mais ser alterado.
            */
            if ($data["unidade_id"] != $plano->unidade_id)
                throw new ServerException("ValidatePlanoTrabalho", "Depois de criado um Plano de Trabalho, não é possível alterar a sua Unidade.\n[ver RN_PTR_AD]");
            if ($data["programa_id"] != $plano->programa_id)
                throw new ServerException("ValidatePlanoTrabalho", "Depois de criado um Plano de Trabalho, não é possível alterar o seu Programa.\n[ver RN_PTR_AD]");
            if ($data["usuario_id"] != $plano->usuario_id)
                throw new ServerException("ValidatePlanoTrabalho", "Depois de criado um Plano de Trabalho, não é possível alterar o Usuário.\n[ver RN_PTR_AE]");
            /* (RN_CSLD_2)
                O plano de trabalho somente poderá ser alterado: se a nova data de início não for superior a algum período já CONCLUIDO ou AVALIADO, ou até o limite da primeira atividade já lançados;
                e se a nova data de final não for inferior a algum período já CONCLUIDO ou AVALIADO, ou até o limite da última atividade já lançados;
            */
            $maxInicio = $this->dataInicialMaximaConsolidacao($plano, $data["data_fim"]);
            $minFim = $this->dataFinalMinimaConsolidacao($plano, $data["data_inicio"]);
            $dataInicioVigencia = date("Y-m-d", strtotime($data["data_inicio"])); /* Transforma de datetime para date */
            $dataFimVigencia = date("Y-m-d", strtotime($data["data_fim"])); /* Transforma de datetime para date */
            if (strtotime($dataInicioVigencia) > strtotime($maxInicio)) {
                throw new ServerException("ValidatePlanoTrabalho", "Data de início do plano é maior que a da primeira consolidação avaliada; ou com atividades.\n[ver RN_CSLD_2]");
            }
            if (strtotime($dataFimVigencia) < strtotime($minFim)) {
                throw new ServerException("ValidatePlanoTrabalho", "Data final do plano é menor que a da última consolidação avaliada; ou com atividades.\n[ver RN_CSLD_2]");
            }

        }
        if (!$this->programaService->programaVigente($programa))
            throw new ServerException("ValidatePlanoTrabalho", "O regramento não está vigente.");
    }

    public function repactuar($planoId, $forcarGeracaoTcr = false)
    {
        $plano = PlanoTrabalho::find($planoId);
        if ($plano->programa->termo_obrigatorio) {
            $exigeAssinaturas = $plano->programa->plano_trabalho_assinatura_participante || $plano->programa->plano_trabalho_assinatura_gestor_unidade || $plano->programa->plano_trabalho_assinatura_gestor_lotacao || $plano->programa->plano_trabalho_assinatura_gestor_entidade;
            $haAssinaturas = DocumentoAssinatura::where("documento_id", $plano->documento_id)->count() > 0;
            $template = $plano->programa->templateTcr->conteudo ?? "";
            $dataset = $this->templateDatasetService->getDataset("PLANO_TRABALHO", true);
            $datasource = $this->templateService->getDatasource("PLANO_TRABALHO", $plano);
            if ($exigeAssinaturas)
                $this->statusService->atualizaStatus($plano, 'INCLUIDO', 'Plano de Trabalho repactuado');
            if (!empty($plano->documento_id) && !$haAssinaturas) {
                $documento = Documento::find($plano->documento_id);
                $documento->template = $template;
                $documento->dataset = $dataset;
                $documento->datasource = $datasource;
                $documento->save();
            } else if (empty($plano->documento_id) || $forcarGeracaoTcr || $haAssinaturas || ($plano->status == "ATIVO" && $this->haAssinaturasExigidas($plano->toArray()))) {
                $documento = new Documento([
                    "tipo" => "HTML",
                    "especie" => "TCR",
                    "titulo" => "Termo de Ciência e Responsabilidade",
                    "conteudo" => $this->templateService->renderTemplate($template, $datasource),
                    "status" => "GERADO",
                    "template" => $template,
                    "dataset" => $dataset,
                    "datasource" => $datasource,
                    "entidade_id" => $this->entidade()->id,
                    "plano_trabalho_id" => $plano->id,
                    "template_id" => $plano->programa->template_tcr_id
                ]);
                $documento->save();
                $plano->documento_id = $documento->id;
                $plano->save();
            }
        }
    }

    public function extraStore($plano, $unidade, $action)
    {
        // (RN_PTR_A) Quando um Plano de Trabalho é criado adquire automaticamente o status INCLUIDO;
        if ($action == ServiceBase::ACTION_INSERT)
            $this->statusService->atualizaStatus($plano, 'INCLUIDO', 'O Plano de Trabalho foi criado nesta data.');
        /* (RN_CSLD_1) Inclui ou atualiza as consolidações com base no período do plano de trabalho */
        $this->atualizaConsolidacoes($plano);
        /* Restaura o documento_id */
        if (!empty($this->documentoId) && !empty(Documento::find($this->documentoId))) {
            $plano->documento_id = $this->documentoId;
            $plano->save();
        }
        if ($action == ServiceBase::ACTION_EDIT) {
            /*
            (RN_PTR_M) ...
              - Após alterado, e no caso se exija assinaturas no TCR, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
            */
            $this->repactuar($plano->id, false);
        }
        if ($action == ServiceBase::ACTION_INSERT) {
            /* (RN_PTR_AC) Quando um participante tiver um plano de trabalho criado, ele se tornará automaticamente um COLABORADOR da sua unidade executora; */
            if (!$this->usuarioService->isIntegrante("COLABORADOR", $plano->unidade_id, $plano->usuario_id)) {
                $this->unidadeIntegranteAtribuicaoService->store([
                    'unidade_integrante_id' => UnidadeIntegrante::firstOrCreate(['unidade_id' => $plano->unidade_id, 'usuario_id' => $plano->usuario_id])->id,
                    'atribuicao' => 'COLABORADOR'
                ], $unidade, false);
            }
            /* (RN_PTR_C) Quando o gestor da Unidade Executora criar o primeiro Plano de Trabalho para um servidor, este tornar-se-á automaticamente um participante habilitado; */
            $participante = ProgramaParticipante::where('programa_id', $plano->programa_id)->where('usuario_id', $plano->usuario_id)->first() ?? new ProgramaParticipante(['usuario_id' => $plano->usuario_id, 'programa_id' => $plano->programa_id]);
            $participante->habilitado = true;
            $participante->save();
        }
    }

    public function assinaturaTcr($documento, $usuario)
    {
        /*
        (RN_PTR_H) Segundo as configurações do Programa de Gestão, no TCR poderá ser exigida a assinatura dos seguintes atores: participante, gestor da Unidade Executora, gestor da Unidade de Lotação e gestor da Unidade Instituidora, repeitado o definido na TABELA_3; entretanto, ainda segundo o Programa de Gestão, o TCR pode ser dispensável e, nesse caso, obviamente nenhuma assinatura será exigida;
        (RN_PTR_O) Condições para que um Plano de Trabalho possa ser assinado:
          - estar no status INCLUIDO ou AGUARDANDO_ASSINATURA, e
            - o plano precisa possuir ao menos uma entrega, e
            - o usuário logado precisa atender os critérios da ação Assinar da TABELA_1, e
            - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, respeitando a TABELA_3, e ele não ter ainda assinado;
          - Enquanto faltar assinatura no TCR, o plano vai para o (ou permanece no) status de 'AGUARDANDO_ASSINATURA'. Quando o último assinar o TCR, o plano vai para o status 'ATIVO';
        */
        $status = $this->haAssinaturasFaltantes($documento->planoTrabalho) ? 'AGUARDANDO_ASSINATURA' : 'ATIVO';
        $this->statusService->atualizaStatus($documento->planoTrabalho, $status, 'Registrada a assinatura do servidor: ' . $usuario->nome . ' - CPF ' . $usuario->cpf . '.');
    }

    public function checkAssinarTcr($documentoId)
    {
        /*
        (RN_PTR_O) Condições para que um Plano de Trabalho possa ser assinado:
        - estar no status INCLUIDO ou AGUARDANDO_ASSINATURA, e
            - o plano precisa possuir ao menos uma entrega, e
            - o usuário logado precisa atender os critérios da ação Assinar da TABELA_1, e
            - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, respeitando a TABELA_3, e ele não ter ainda assinado;
        - Enquanto faltar assinatura no TCR, o plano vai para o (ou permanece no) status de 'AGUARDANDO_ASSINATURA'. Quando o último assinar o TCR, o plano vai para o status 'ATIVO';
        */
        $condicoes = $this->buscaCondicoes(['id' => Documento::find($documentoId)->plano_trabalho_id]);
        $condition1 = $condicoes["planoIncluido"];
        $condition2 = $condicoes["planoAguardandoAssinatura"];
        $condition3 = $condicoes["assinaturaUsuarioExigida"];
        $condition4 = $condicoes["usuarioFaltaAssinar"];
        $condition5 = $condicoes["nrEntregas"] > 0;
        if (!$condition1 && !$condition2)
            throw new ServerException("ValidatePlanoTrabalho", "O TCR não pode ser assinado porque o plano de trabalho não está no status INCLUIDO nem AGUARDANDO ASSINATURA. [ver RN_PTR_O]");
        if (!$condition3)
            throw new ServerException("ValidatePlanoTrabalho", "O TCR não pode ser assinado porque a assinatura do usuário logado não é exigida pelo programa, ou o usuários não atende aos critérios das [PTR:TABELA_1] e [PTR:TABELA_3]. [ver RN_PTR_O]");
        if (!$condition4)
            throw new ServerException("ValidatePlanoTrabalho", "O TCR não pode ser assinado porque a assinatura do usuário logado não é exigida pelo programa ou ele já assinou o Termo. [ver RN_PTR_O]");
        if (!$condition5)
            throw new ServerException("ValidatePlanoTrabalho", "O TCR não pode ser assinado porque o plano precisa possuir ao menos uma entrega. [ver RN_PTR_O]");
    }

    /* Será a data_inicio, ou a data_fim do último período CONCLUIDO ou AVALIADO. O que for maior. */
    public function dataFinalMinimaConsolidacao($plano, $novoInicio)
    {
        $result = $this->utilService->asTimestamp($novoInicio);
        foreach ($plano->consolidacoes as $consolidacao) {
            $data = $this->utilService->asTimestamp($consolidacao->status != "INCLUIDO" ? $consolidacao->data_fim : $result);
            $result = max($result, $data);
        }
        return date('Y-m-d', $result);
    }

    /* Será a data_fim, ou a data_inicio do primeiro período CONCLUIDO ou AVALIADO. O que for menor. */
    public function dataInicialMaximaConsolidacao($plano, $novoFim)
    {
        $result = $this->utilService->asTimestamp($novoFim);
        foreach ($plano->consolidacoes as $consolidacao) {
            $data = $this->utilService->asTimestamp($consolidacao->status != "INCLUIDO" ? $consolidacao->data_inicio : $result);
            $result = min($result, $data);
        }
        return date('Y-m-d', $result);
    }

    public function proxDataConsolidacao($data, $programa)
    {
        $dayWeek = date('w', strtotime($data));
        $incMonth = 0;
        switch ($programa->periodicidade_consolidacao) {
            case 'DIAS':
                return date("Y-m-d", strtotime($data . " + " . $programa->periodicidade_valor . " days"));
                break;
            case 'SEMANAL':
                return date("Y-m-d", strtotime($data . " + " . ($dayWeek < $programa->periodicidade_valor ? $programa->periodicidade_valor - $dayWeek : 6 - $dayWeek + $programa->periodicidade_valor) . " days"));
                break;
            case 'QUINZENAL':
                return date("Y-m-d", strtotime($data . " + " . ($dayWeek < $programa->periodicidade_valor ? 7 + $programa->periodicidade_valor - $dayWeek : 7 + 6 - $dayWeek + $programa->periodicidade_valor) . " days"));
                break;
            case 'MENSAL':
                $incMonth = 0;
            case 'BIMESTRAL':
                $incMonth = 1;
            case 'TRIMESTRAL':
                $incMonth = 2;
            case 'SEMESTRAL':
                $incMonth = 5;
            default:
                $incMonth = 0;
        }
        /* Calulo para MENSAL, BIMESTRAL, TRIMESTRAL e SEMANAL */
        $ano = date('Y', strtotime($data)); /* 20xx */
        $mes = date('m', strtotime($data)); /* 01 - 12 */
        $dia = date('d', strtotime($data)); /* 01 - 12 */
        if ($dia >= $programa->periodicidade_valor)
            $incMonth++;
        $anoMesDia = date("Y-m-d", strtotime($ano . "-" . $mes . "-01 + " . $incMonth . " month"));
        $days = min(date('t', strtotime($anoMesDia)), $programa->periodicidade_valor) - 1;
        return date("Y-m-d", strtotime($anoMesDia . " + " . $days . " days"));
    }

    /**
     * (RN_CSLD_1) Após criado ou alterado um plano de trabalho, os períodos de consolidação são automaticamente gerados ou recriados com base na periodicidade configurada no programa;
     * @param string $usuario_id
     * @return  Illuminate\Database\Eloquent\Collection
     */
    public function atualizaConsolidacoes($plano)
    {
        $existentes = $plano->consolidacoes->all();
        $merged = [];
        $dataInicioVigencia = date("Y-m-d", strtotime($plano->data_inicio)); /* Transforma de datetime para date */
        $dataFimVigencia = date("Y-m-d", strtotime($plano->data_fim)); /* Transforma de datetime para date */
        $dataInicio = $dataInicioVigencia;
        while (strtotime($dataInicio) <= strtotime($dataFimVigencia)) {
            $dataFim = date("Y-m-d", min(strtotime($this->proxDataConsolidacao($dataInicio, $plano->programa)), strtotime($dataFimVigencia)));
            $igual = array_filter($existentes, fn($c) => $c->data_inicio == $dataInicio && $c->data_fim == $dataFim)[0] ?? null;
            $intersecao = array_filter($existentes, fn($c) => $c->status != "INCLUIDO" && strtotime($dataInicio) <= strtotime($c->data_fim) && strtotime($dataFim) >= strtotime($c->data_inicio))[0] ?? null;
            if (!empty($igual)) { /* (RN_CSLD_4) Caso exista períodos iguais, o período existente será mantido (para este perído nada será feito, manterá a mesma ID) */
                $merged[] = $igual;
                $existentes = array_filter($existentes, fn($e) => $e->id !== $igual->id);
                $dataInicio = date("Y-m-d", strtotime($igual->data_fim . ' + 1 days'));
            } else if (!empty($intersecao)) { /* Se houver intersecção do período gerado com um existente que esteja com status CONCLUIDO ou AVALIADO */
                $existentes = array_filter($existentes, fn($e) => $e->id !== $intersecao->id);
                if ($intersecao->data_inicio == $dataInicio) { /* (RN_CSLD_5) Se as datas de início forem iguais o periodo existente será mantido */
                    $dataInicio = date("Y-m-d", strtotime($intersecao->data_fim . ' + 1 days'));
                } else { /* (RN_CSLD_6) Se as datas de início forem diferente, então será criado um novo perído entre o novo início e o início do período CONCLUIDO/AVALIADO, e o período CONCLUIDO/AVALIADO será mantido */
                    $novo = new PlanoTrabalhoConsolidacao([
                        'data_inicio' => $dataInicio,
                        'data_fim' => date("Y-m-d", strtotime($intersecao->data_inicio . ' - 1 days')),
                        'plano_trabalho_id' => $plano->id,
                        'status' => 'INCLUIDO'
                    ]);
                    $novo->save();
                    $merged[] = $novo;
                    $dataInicio = $intersecao->data_inicio;
                }
            } else { /* Novo período */
                $novo = new PlanoTrabalhoConsolidacao([
                    'data_inicio' => $dataInicio,
                    'data_fim' => $dataFim,
                    'plano_trabalho_id' => $plano->id,
                    'status' => 'INCLUIDO'
                ]);
                $novo->save();
                $merged[] = $novo;
                $dataInicio = date("Y-m-d", strtotime($dataFim . ' + 1 days'));
            }
        }
        foreach ($existentes as $anterior) {
            /* Remove o registro da consolidação completamente vazio */
            $anterior->delete();
        }
        /* Refaz todas as datas finais das consolidações considerando sempre data_inicio da próxima - 1 dia */
        $this->atualizaDataFimConsolidacoes($plano->id);
    }

    /* Refaz todas as datas finais das consolidações considerando sempre data_inicio da próxima - 1 dia */
    public function atualizaDataFimConsolidacoes($planoId)
    {
        $plano = PlanoTrabalho::find($planoId);
        $consolidacoes = $plano?->consolidacoes?->all() ?? [];
        for ($i = 1; $i < count($consolidacoes); $i++) {
            if (strtotime($consolidacoes[$i - 1]->data_fim) != strtotime($consolidacoes[$i]->data_inicio . " -1 days")) {
                $consolidacoes[$i - 1]->data_fim = date("Y-m-d", strtotime($consolidacoes[$i]->data_inicio . " -1 days"));
                $consolidacoes[$i - 1]->save();
            }
        }
    }

    /**
     * Retorna os planos de trabalho de um usuário (validando se ele tem acesso a esse plano)
     *
     * @param string $usuario_id O ID do Usuário
     * @param string $arquivadas Se o resultado deve incluir os planos arquivados
     * @return  array
     */
    public function getByUsuario($usuarioId, $arquivados, $planoTrabalhoId)
    {
        // TODO: validar permissoes
        $query = PlanoTrabalho::with([
            "unidade:id,sigla,nome",
            "unidade.gestor:id,unidade_id,usuario_id",
            "unidade.gestoresSubstitutos:id,unidade_id,usuario_id",
            "tipoModalidade:id,nome",
            "consolidacoes.avaliacao.tipoAvaliacao.notas",
            "consolidacoes.avaliacoes",
            "usuario:id,nome,apelido,url_foto"
        ])->where("usuario_id", $usuarioId)->orderBy('numero', 'desc');
        if (!$arquivados)
            $query->whereNull("data_arquivamento");
        if (!empty($planoTrabalhoId))
            $query->where("id", $planoTrabalhoId);
        $planos = $query->get()->all();
        /* Adiciona metadados dos planos */
        foreach ($planos as $planoTrabalho) {
            $gestoresUnidadeSuperior = $this->unidadeService->gestoresUnidadeSuperior($planoTrabalho->unidade_id);
            $logado = parent::loggedUser();
            $planoTrabalho->_metadata = [
                'gestorLogado' => $this->usuarioService->atribuicoesGestor($planoTrabalho->unidade_id),
                'gestorUnidadeSuperior' => [
                    'gestor' => $gestoresUnidadeSuperior["gestor"]?->id == $logado->id,
                    'gestorSubstituto' => count(array_filter(
                        $gestoresUnidadeSuperior["gestoresSubstitutos"],
                        fn($value) => $value !== null && isset($value["id"]) && $value["id"] == $logado->id
                    )) > 0,
                    'gestorDelegado' => count(array_filter(
                        $gestoresUnidadeSuperior["gestoresDelegados"] ?? [],
                        fn($value) => $value !== null && isset($value["id"]) && $value["id"] == $logado->id
                    )) > 0
                ],
                'gestorParticipante' => $this->usuarioService->atribuicoesGestor($planoTrabalho->unidade_id, $planoTrabalho->usuario_id)
            ];
        }
        /* Programas dos planos */
        $programasIds = array_unique(array_map(fn($v) => $v["programa_id"], $planos));
        $programas = Programa::with(["tipoAvaliacaoPlanoTrabalho.notas.justificativas"])->whereIn("id", $programasIds)->get()->all();
        return [
            "planos" => $planos,
            "programas" => $programas
        ];
    }

    /**
     * Retorna um array com os dados de um Plano de Trabalho. Método criado para atender ao Relatório de Força de Trabalho - Servidor.
     * Os cálculos das horas levam em consideração sempre os tempos pactuados - uma alteração conceitual introduzida nos Relatórios de Força de Trabalho.
     *
     * @param string $plano_id O ID do Plano de Trabalho.
     * @param string $inicioPeriodo Data inicial do período de pesquisa.
     * @param string $fimPeriodo Data final do período de pesquisa.
     * @return  array
     */
    public function metadadosPlano($plano_id, $inicioPeriodo = null, $fimPeriodo = null): array
    {
        $plano = PlanoTrabalho::where('id', $plano_id)->with(['atividades', 'tipoModalidade'])->first()->toArray();
        $result = [
            "concluido" => true,
            "atividadesNaoIniciadas" => $this->atividadesNaoIniciadas($plano, null, null), //array_filter($plano['atividades'], fn($atividade) => $atividade['data_inicio'] == null),
            "atividadesEmAndamento" => $this->atividadesEmAndamento($plano, null, null), //array_filter($plano['atividades'], fn($atividade) => $atividade['data_inicio'] != null && $atividade['data_entrega'] == null),
            "atividadesConcluidas" => $this->atividadesSoConcluidas($plano, null, null),
            "horasAfastamentoDecorridas" => 0,
            "horasAtividadesNaoIniciadas" => 0,
            "horasAtividadesEmAndamento" => 0,
            "horasAtividadesConcluidas" => 0,
            "horasTotaisAlocadas" => 0,
            "horasUteisAfastamento" => 0,
            "horasUteisDecorridas" => 0,
            "horasUteisTotais" => $plano['tempo_total'],
            "modalidade" => $plano['tipo_modalidade']['nome'],
            "percentualHorasNaoIniciadas" => 0,
            "usuario_id" => $plano['usuario_id'],
            "noPeriodo" => [
                "atividadesDistribuidas" => [],
                "atividadesNaoIniciadas" => [],
                "atividadesEmAndamento" => [],
                "horasUteisDisponiveisServidor" => 0,
                "tempoTotalRealizadoNoPeriodo" => 0,
                "tempoTotalAlocado" => 0,
                "tempoTotalNaoIniciadas" => 0,
                "tempoTotalEmAndamento" => 0,
                "tempoPrevistoNaoIniciadasNoPeriodo" => 0,
                "tempoPrevistoEmAndamentoNoPeriodo" => 0,
                "tempoTotalPrevistoNoPeriodo" => 0,
            ]
        ];
        $inicioPlano = new DateTime($plano['data_inicio']);
        $fimPlano = new DateTime($plano['data_fim'], $inicioPlano->getTimezone());
        $unidadePlano = Unidade::find($plano['unidade_id'])->first();
        $afastamentosUsuario = Afastamento::where('usuario_id', $plano['usuario_id'])->get()->toArray();
        // Cálculo das horas úteis totais de afastamento
        $result["horasUteisAfastamento"] = CalendarioService::calculaDataTempoUnidade($inicioPlano, $fimPlano, $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->horasAfastamento;
        // Cálculo das horas úteis decorridas do plano e das horas úteis decorridas dos afastamentos
        $result["horasUteisDecorridas"] = new DateTime() < $inicioPlano ? 0 : CalendarioService::calculaDataTempoUnidade($inicioPlano, new DateTime() > $fimPlano ? $fimPlano : new DateTime(), $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS")->tempoUtil;
        $result["horasAfastamentoDecorridas"] = new DateTime() < $inicioPlano ? 0 : CalendarioService::calculaDataTempoUnidade($inicioPlano, new DateTime() > $fimPlano ? $fimPlano : new DateTime(), $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->horasAfastamento;
        /*  Definição se o Plano de Trabalho foi concluído ou não. O plano será considerado CONCLUÍDO se não possuir nenhuma atividade OU quando todas as suas atividades forem CUMPRIDAS. Uma atividade é considerada cumprida quando
            seu tempo homologado não for mais nulo. */
        if (count($plano['atividades']) == 0)
            $result['concluido'] = true;
        else {
            foreach ($plano['atividades'] as $atividade) {
                //if ($atividade['tempo_homologado'] == null) $result['concluido'] = false;
                if ($atividade['progresso'] < 100)
                    $result['concluido'] = false;
            }
        }
        /* Soma dos tempos pactuados das atividades */
        $result['horasAtividadesNaoIniciadas'] = $this->somaTemposPactuados($result['atividadesNaoIniciadas']);
        $result['horasAtividadesEmAndamento'] = $this->somaTemposPactuados($result['atividadesEmAndamento']);
        $result['horasAtividadesConcluidas'] = $this->somaTemposPactuados($result['atividadesConcluidas']);
        $result['horasTotaisAlocadas'] = $result['horasAtividadesNaoIniciadas'] + $result['horasAtividadesEmAndamento'] + $result['horasAtividadesConcluidas'] + $result['horasAtividadesAvaliadas'];
        if ($inicioPeriodo) { // se for solicitada a análise de um determinado período, obrigatoriamente serão fornecidos as datas inicial e final desse período
            $result['noPeriodo']['atividadesDistribuidas'] = $this->atividadesDistribuidas($plano, $inicioPeriodo, $fimPeriodo);
            $result['noPeriodo']['atividadesNaoIniciadas'] = $this->atividadesNaoIniciadas($plano, $inicioPeriodo, $fimPeriodo);
            $result['noPeriodo']['atividadesEmAndamento'] = $this->atividadesEmAndamento($plano, $inicioPeriodo, $fimPeriodo);
            $result['noPeriodo']['horasUteisDisponiveisServidor'] = CalendarioService::calculaDataTempoUnidade(new DateTime($inicioPeriodo), new DateTime($fimPeriodo), $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
            $result['noPeriodo']['tempoTotalAlocado'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesDistribuidas']);
            $result['noPeriodo']['tempoTotalNaoIniciadas'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesNaoIniciadas']);
            $result['noPeriodo']['tempoTotalEmAndamento'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesEmAndamento']);
            $result['noPeriodo']['tempoPrevistoNaoIniciadasNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesNaoIniciadas'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
            $result['noPeriodo']['tempoPrevistoEmAndamentoNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesEmAndamento'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
            $result['noPeriodo']['tempoTotalPrevistoNoPeriodo'] = $result['noPeriodo']['tempoPrevistoNaoIniciadasNoPeriodo'] + $result['noPeriodo']['tempoPrevistoEmAndamentoNoPeriodo'] + $result['noPeriodo']['tempoPrevistoSoConcluidasNoPeriodo'] +
                $result['noPeriodo']['tempoPrevistoReprovadasNoPeriodo'] + $result['noPeriodo']['tempoPrevistoAprovadasNoPeriodo'];
        }
        return $result;
    }

    /**
     * Retorna um array com todas as atividades de um determinado Plano de Trabalho, cujas datas de distribuição ou de data_estipulada_entrega estejam
     * dentro do período estabelecido.
     *
     * @param Plano $plano Plano de Trabalho a ser pesquisado.
     * @param string $inicioPeriodo Data inicial do período.
     * @param string $fimPeriodo Data final do período.
     * @return  array
     */
    public function atividadesDistribuidas($plano, $inicioPeriodo, $fimPeriodo): array
    {
        $result = [];
        foreach ($plano['atividades'] as $atividade) {
            if ($this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo))
                array_push($result, $atividade);
        }
        return $result;
    }

    /**
     * Retorna um array com todas as atividades de um determinado Plano de Trabalho, ainda não iniciadas pelo servidor, cujas datas de início ou de entrega estejam
     * dentro do período estabelecido. Uma atividade é considerada não iniciada se o seu campo data_inicio é nulo.
     *
     * @param Plano $plano Plano de Trabalho a ser pesquisado.
     * @param string $inicioPeriodo Data inicial do período.
     * @param string $fimPeriodo Data final do período.
     * @return  array
     */
    public function atividadesNaoIniciadas($plano, $inicioPeriodo, $fimPeriodo): array
    {
        $result = [];
        foreach ($plano['atividades'] as $atividade) {
            if (!$this->atividadeService->isIniciada($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo))
                array_push($result, $atividade);
        }
        return $result;
    }

    /**
     * Retorna um array com todas as atividades em andamento de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
     * dentro do período estabelecido. Uma atividade é considerada em andamento se o seu campo data_inicio não é nulo e seu campo data_entrega é nulo.
     *
     * @param Plano $plano Plano de Trabalho a ser pesquisado.
     * @param string $inicioPeriodo Data inicial do período.
     * @param string $fimPeriodo Data final do período.
     * @return  array
     */
    public function atividadesEmAndamento($plano, $inicioPeriodo, $fimPeriodo): array
    {
        $result = [];
        foreach ($plano['atividades'] as $atividade) {
            if ($this->atividadeService->isIniciada($atividade) && !$this->atividadeService->isConcluida($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo))
                array_push($result, $atividade);
        }
        return $result;
    }

    /**
     * Define se um Plano de Trabalho é considerado um Plano de Gestão ou não, ou seja, se existe ou não um normativo definindo como Programa de Gestão
     * o Programa ao qual ele está vinculado.
     *
     * @param Plano $plano O ID do Plano de Trabalho.
     * @return  bool
     */
    public function isPlanoGestao($plano): bool
    {
        return !$plano['programa']['normativa'] == null;
    }

    public function proxyGetAllIdsExtra($result, $data)
    {
        $tipoModalidades = [];
        $usuarios = [];
        $unidades = [];
        foreach ($result["rows"] as $plano) {
            $tipoModalidades[$plano->tipo_modalidade_id] = $plano->tipoModalidade;
            $usuarios[$plano->usuario_id] = $plano->usuario;
            $unidades[$plano->unidade_id] = $plano->unidade;
        }
        return [
            "merge" => [
                "tipo_modalidade" => $tipoModalidades,
                "usuario" => $usuarios,
                "unidade" => $unidades
            ]
        ];
    }

    public function validateCancelamento($planoId)
    {
        /*
        (RN_PTR_R) Condições para que um Plano de Trabalho possa ser cancelado:
        - o usuário logado precisa possuir a capacidade "MOD_PTR_CNC", e
            - o plano precisa estar em um dos seguintes status: INCLUIDO, AGUARDANDO_ASSINATURA, ATIVO; e
            - não possuir nenhuma atividade lançada e não possuir nenhuma consolidação CONCLUIDO/AVALIADO; [RN_PTR_K]
            - o usuário logado precisa ser gestor da Unidade Executora;
        */
        if (!$this->loggedUser()->hasPermissionTo('MOD_PTR_CNC'))
            return "O usuário logado não tem permissão para cancelar planos de trabalho (MOD_PTR_CNC).\n[ver RN_PTR_R]";
        $condicoes = $this->buscaCondicoes(['id' => $planoId]);
        $condition1 = !$condicoes['planoDeletado'] && in_array($condicoes['planoStatus'], ['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO']);
        $condition2 = $condicoes['gestorUnidadeExecutora'];
        if (!$condition1)
            return "O plano de trabalho não pode ser cancelado porque foi deletado ou não está em nenhum dos seguintes status: INCLUIDO, AGUARDANDO ASSINATURA ou ATIVO.\n[ver RN_PTR_R]";
        if (!$condition2)
            return "O plano de trabalho não pode ser cancelado porque o usuário logado não é um dos gestores da sua unidade executora.\n[ver RN_PTR_R]";
        /* (RN_PTR_K) O Plano de Trabalho somente poderá ser cancelado se não houver nenhuma atividade e nenhum periodo consolidado. Os afastamentos e ocorrências continuam válidas no sistema, somente removendo o vinculo com a consolidação; */
        $planoTrabalho = PlanoTrabalho::find($planoId);
        foreach ($planoTrabalho->entregas as $entrega) {
            $atividades = $entrega->atividades->map(fn($x) => "#" . $x->numero)->toArray();
            if (count($atividades) > 0)
                return "Somente é possível cancelar plano de trabalho que não tenha atividade lançada. Atividade(s): " . implode(", ", $atividades);
        }
        foreach ($planoTrabalho->consolidacoes as $consolidacao) {
            if ($consolidacao->status != "INCLUIDO")
                return "Somente é possível cancelar plano de trabalho que não tenha período de consolidação concluído.";
        }
        return null;
    }

    public function proxyRows($rows)
    {
        foreach ($rows as $row) {
            $unidade = Unidade::find($row->unidade_id);
            $row->_metadata = [
                'assinaturasExigidas' => $this->assinaturasExigidas($row),
                'quantidadeAssinaturasExigidas' => $this->quantidadeAssinaturasExigidas($row),
                'jaAssinaramTCR' => $this->jaAssinaramTCR($row->id),
                'podeCancelar' => empty($this->validateCancelamento($row->id)),
                'atribuicoesParticipante' => $this->usuarioService->atribuicoesGestor($row->unidade_id, $row->usuario_id),
                'atribuicoesLogado' => $this->usuarioService->atribuicoesGestor($row->unidade_id),
                'atribuicoesLogadoUnidadeSuperior' => empty($unidade->unidade_pai_id) ? ["gestor" => false, "gestorSubstituto" => false, "gestorDelegado" => false] : $this->usuarioService->atribuicoesGestor($unidade->unidade_pai_id),
                'usuarioEhParticipanteHabilitado' => $this->usuario->isParticipanteHabilitado(null, $row->programa_id)
            ];
        }
        return $rows;
    }

    /**
     * Retorna um array com várias informações sobre o plano recebido como parâmetro que serão auxiliares na definição das permissões para as diversas operações possíveis com um Plano de Trabalho.
     * Se o plano recebido como parâmetro possuir ID, as informações devolvidas serão baseadas nos dados armazenados no banco. Caso contrário, as informações devolvidas serão baseadas nos dados
     * recebidos na chamada do método.
     * @param array $entity Um array com os dados de um plano já existente ou que esteja sendo criado.
     * @return array
     */
    public function buscaCondicoes(array $entity): array
    {
        if ($this->hasBuffer("buscaCondicoes", $entity["id"])) {
            return $this->getBuffer("buscaCondicoes", $entity["id"]);
        } else {
            $planoTrabalho = !empty($entity['id']) ? PlanoTrabalho::withTrashed()->with('entregas')->find($entity['id'])->toArray() : $entity;
            $planoTrabalho['unidade'] = !empty($planoTrabalho['unidade_id']) ? Unidade::find($planoTrabalho['unidade_id'])->toArray() : null;
            $logado = parent::loggedUser();
            $result = [];
            $result["logadoEhChefe"] = $logado->gerenciaTitular()->exists() || $logado->gerenciasSubstitutas()->exists() || $logado->gerenciasDelegadas()->exists();
            $result["assinaturasExigidas"] = $this->assinaturasExigidas($planoTrabalho);
            $result["haAssinaturasExigidas"] = $this->haAssinaturasExigidas($planoTrabalho);
            $result["assinaturasFaltantes"] = $this->assinaturasFaltantes($planoTrabalho);
            $result["haAssinaturasFaltantes"] = $this->haAssinaturasFaltantes($planoTrabalho);
            $result["usuarioFaltaAssinar"] = $this->usuarioFaltaAssinar(null, $planoTrabalho);
            $result["assinaturaUsuarioExigida"] = $this->assinaturaUsuarioExigida(null, $planoTrabalho);
            $result["atribuicoesGestorUsuarioLogado"] = $this->usuarioService->atribuicoesGestor($planoTrabalho['unidade_id']);
            $result["atribuicoesGestorUsuario"] = $this->usuarioService->atribuicoesGestor($planoTrabalho['unidade_id'], $planoTrabalho['usuario_id']);
            $result["gestorUnidadeExecutora"] = $this->usuarioService->isGestorUnidade($planoTrabalho['unidade_id']);
            $result["gestoresUnidadeSuperior"] = $this->unidadeService->gestoresUnidadeSuperior($planoTrabalho['unidade_id']);
            $result["gestorUnidadeSuperior"] = $result["gestoresUnidadeSuperior"]["gestor"]?->id == $logado->id || count(array_filter($result["gestoresUnidadeSuperior"]["gestoresSubstitutos"], fn($value) => $value && $value["id"] == $logado->id)) > 0;
            $result["nrEntregas"] = empty($planoTrabalho['entregas']) ? 0 : count($planoTrabalho['entregas']);
            $result["participanteLotadoAreaTrabalho"] = parent::loggedUser()->areasTrabalho->find(fn($at) => $this->usuarioService->isLotacao($planoTrabalho["usuario_id"], $at->unidade->id)) != null;
            $result["participanteColaboradorUnidadeExecutora"] = $this->usuarioService->isIntegrante("COLABORADOR", $planoTrabalho["unidade_id"], $planoTrabalho["usuario_id"]);
            $result["participanteLotadoUnidadeExecutora"] = $this->usuarioService->isLotacao($planoTrabalho["usuario_id"], $planoTrabalho["unidade_id"]);
            $result["planoAguardandoAssinatura"] = $this->isPlano("AGUARDANDO_ASSINATURA", $planoTrabalho);
            $result["planoArquivado"] = empty($planoTrabalho['id']) ? false : PlanoTrabalho::withTrashed()->find($planoTrabalho['id'])->data_arquivamento != null;
            $result["planoAtivo"] = $this->isPlano("ATIVO", $planoTrabalho);
            $result["planoConcluido"] = $this->isPlano("CONCLUIDO", $planoTrabalho);
            $result["planoCancelado"] = $planoTrabalho['status'] == "CANCELADO";
            $result["planoDeletado"] = !empty($planoTrabalho['deleted_at']);
            $result["planoIncluido"] = $this->isPlano("INCLUIDO", $planoTrabalho);
            $result["planoStatus"] = empty($planoTrabalho['id']) ? null : PlanoTrabalho::withTrashed()->find($planoTrabalho['id'])->status;
            $result["planoSuspenso"] = $this->isPlano("SUSPENSO", $planoTrabalho);
            $result["planoValido"] = $this->isPlanoTrabalhoValido($planoTrabalho);
            $result["naoPossuiPeriodoConflitanteOutroPlano"] = count(PlanoTrabalho::withTrashed()->where("unidade_id", $planoTrabalho['unidade_id'])->where("usuario_id", $planoTrabalho['usuario_id'])->where("id", "!=", $planoTrabalho["id"])->get()
                ->filter(fn($p) => $this->util->intersection([
                    ['start' => UtilService::asDateTime($p->data_inicio), 'end' => UtilService::asDateTime($p->data_fim)],
                    ['start' => UtilService::asDateTime($planoTrabalho["data_inicio"]), 'end' => UtilService::asDateTime($planoTrabalho["data_fim"])]
                ]) != null)) == 0;
            $result["unidadePlanoEhLotacao"] = $this->usuarioService->isLotacao(null, $planoTrabalho['unidade_id']);
            $result["usuarioEhParticipanteHabilitado"] = $this->usuarioService->isParticipanteHabilitado(null, $planoTrabalho["programa_id"]);
            $result["usuarioEhParticipantePlano"] = parent::loggedUser()->id == $planoTrabalho["usuario_id"];
            $result["usuarioJaAssinouTCR"] = !$this->usuarioFaltaAssinar(null, $planoTrabalho);
            return $this->setBuffer("buscaCondicoes", $entity["id"], $result);
        }
    }

    /**
     * Informa se o plano de trabalho recebido como parâmetro é um plano válido.
     * Um Plano de Trabalho é válido se não foi deletado, nem arquivado e não está no status de cancelado.
     * @param array $planoTrabalho
     */
    public function isPlanoTrabalhoValido($plano): bool
    {
        $planoTrabalho = !empty($plano['id']) ? PlanoTrabalho::withTrashed()->where('id', $plano['id'])->first() : $plano;
        return empty($plano['id']) ? false : (!$planoTrabalho->trashed() && !$plano['data_arquivamento'] && $planoTrabalho->status != 'CANCELADO');
    }

    /**
     * Informa o status do plano de trabalho recebido como parâmetro.
     * O Plano de Trabalho precisa ser VÁLIDO.
     * @param string $status
     * @param array $planoTrabalho
     */
    public function isPlano($status, $plano): bool
    {
        $planoTrabalho = !empty($plano['id']) ? PlanoTrabalho::withTrashed()->find($plano['id']) : $plano;
        return empty($plano['id']) ? false : ($this->isPlanoTrabalhoValido($plano) && $planoTrabalho->status == $status);
    }

    public function arquivar($data, $unidade)
    { //ou desarquivar
        try {
            DB::beginTransaction();
            $planoTrabalho = PlanoTrabalho::find($data["id"]);
            if (!empty($planoTrabalho)) {
                $this->update([
                    "id" => $planoTrabalho->id,
                    "data_arquivamento" => $data['arquivar'] ? $this->dataHora() : null
                ], $unidade, false);
            } else {
                throw new ServerException("ValidatePlanoTrabalho", "Plano de Trabalho não encontrado!");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function ativar($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoTrabalho = PlanoTrabalho::find($data["id"]);
            $this->statusService->atualizaStatus($planoTrabalho, 'ATIVO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarAssinatura($data, $unidade)
    {
        try {
            DB::beginTransaction();
            /*
            (RN_PTR_Q) ...
            - Após o cancelamento da assinatura do usuário logado, se existir assinatura(s) de outro(s) usuário(s), o plano permanece no status 'AGUARDANDO_ASSINATURA'.
              Caso contrário, retrocessará para o status 'INCLUIDO';
            */
            $planoTrabalho = PlanoTrabalho::find($data["id"]);
            DocumentoAssinatura::where("usuario_id", parent::loggedUser()->id)->where("documento_id", $planoTrabalho->documento_id)->first()->delete();
            $this->statusService->atualizaStatus($planoTrabalho, $this->alguemAssinou($planoTrabalho) ? 'AGUARDANDO_ASSINATURA' : 'INCLUIDO', 'CANCELAMENTO DA ASSINATURA DO USUÁRIO: ' . parent::loggedUser()->nome . ' JUSTIFICATIVA: ' . $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarPlano($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoTrabalho = PlanoTrabalho::find($data["id"]);
            if (!empty($planoTrabalho)) {
                $this->statusService->atualizaStatus($planoTrabalho, 'CANCELADO', $data["justificativa"]);
                /* Remove o vinculo da ocorrência com o plano de trabalho, para atender a (RN_PTR_K) */
                foreach ($planoTrabalho->ocorrencias as $ocorrencia) {
                    $ocorrencia->plano_trabalho_id = null;
                    $ocorrencia->save();
                }
                $this->arquivar($data, $unidade);
            } else {
                throw new ServerException("ValidatePlanoTrabalho", "Plano de Trabalho não encontrado!");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function enviarParaAssinatura($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoTrabalho = PlanoTrabalho::find($data["id"]);
            // FALTA IMPLEMENTAR. o plano vai para o status 'AGUARDANDO_ASSINATURA';
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function reativar($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoTrabalho = PlanoTrabalho::find($data["id"]);
            $this->statusService->atualizaStatus($planoTrabalho, 'ATIVO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function suspender($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoTrabalho = PlanoTrabalho::find($data["id"]);
            $this->statusService->atualizaStatus($planoTrabalho, 'SUSPENSO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    /**
     *  Recebe um Plano de Trabalho (novo ou não) e retorna um array com as assinaturas exigidas no TCR pelo seu Programa de Gestão, no seguinte formato:
     *  [ "participante" => [id], "gestores_unidade_executora" => [...ids], "gestores_unidade_lotacao" => [...ids], "gestores_entidade" => [...ids] ].
     *  Os gestores são calculados segundo a tabela [PTR:TABELA_3]
     *  Os campos "programa_id", "usuario_id" e "unidade_id" são obrigatórios no Plano de Trabalho.
     */
    public function assinaturasExigidas($planoTrabalho): array
    {
        $ids = [
            "participante" => [],
            "gestores_unidade_executora" => [],
            "gestores_unidade_lotacao" => [],
            "gestores_entidade" => [],
            "erros" => []
        ];

        $this->validarPlanoTrabalho($planoTrabalho);

        $keys = [$planoTrabalho["id"], $planoTrabalho["programa_id"], $planoTrabalho["usuario_id"], $planoTrabalho["unidade_id"]];
        if ($this->hasBuffer("assinaturasExigidas", $keys)) {
            return $this->getBuffer("assinaturasExigidas", $keys);
        }

        [$programa, $participante, $unidade] = $this->buscarEntidadesRelacionadas($planoTrabalho);
        if (!$programa || !$participante || !$unidade) {
            $ids["erros"] = [
                "programa_id" => $planoTrabalho["programa_id"],
                "programa" => $programa,
                "usuario_id" => $planoTrabalho["usuario_id"],
                "participante" => $participante,
                "unidade_id" => $planoTrabalho["unidade_id"],
                "unidade" => $unidade
            ];
            return $ids;
        }

        $lotacao = $participante->lotacao?->unidade;
        $entidade = $unidade->entidade;

        if ($programa->plano_trabalho_assinatura_participante) {
            $ids["participante"][] = $participante->id;
        }

        if ($programa->plano_trabalho_assinatura_gestor_entidade && $entidade) {
            $ids["gestores_entidade"] = array_values(array_filter([
                $entidade->gestor_id,
                $entidade->gestor_substituto_id
            ]));
        }

        if ($programa->plano_trabalho_assinatura_gestor_unidade) {
            $ids["gestores_unidade_executora"] = $this->unidadeService->getGestoresPorUnidade(
                $unidade,
                $planoTrabalho['usuario_id'],
                $participante->id
            );
        }

        if ($programa->plano_trabalho_assinatura_gestor_lotacao && $lotacao) {
            $ids["gestores_unidade_lotacao"] = $this->unidadeService->getGestoresPorUnidade(
                $lotacao,
                $planoTrabalho['usuario_id'],
                $participante->id
            );
        }

        $this->setBuffer("assinaturasExigidas", $keys, $ids);
        return $ids;
    }

    /**
     *  Recebe um Plano de Trabalho (novo ou não) e retorna um booleano informando se o seu Programa de Gestão exige alguma assinatura no TCR,
     *  seja ela do participante ou de algum gestor. Os campos "programa_id", "usuario_id" e "unidade_id" são obrigatórios no Plano de Trabalho.
     */
    public function haAssinaturasExigidas($planoTrabalho): bool
    {
        $exigidas = $this->assinaturasExigidas($planoTrabalho);
        return !empty($exigidas["participante"]) || !empty($exigidas["gestores_unidade_executora"]) || !empty($exigidas["gestores_unidade_lotacao"]) || !empty($exigidas["gestores_entidade"]);
    }

    /** Recebe um Plano de Trabalho (novo ou não) e retorna um array com as assinaturas que ainda faltam no TCR, em comparação com as exigidas pelo seu Programa de Gestão, no seguinte formato:
     *  [ "participante" => [id], "gestores_unidade_executora" => [...ids], "gestores_unidade_lotacao" => [...ids], "gestores_entidade" => [...ids] ]. Quando um dos gestores de uma Unidade
     *  (titular, substituto ou delegado) assina o TCR, a exigência de assinatura para essa Unidade é satisfeita.
     *  Os campos "programa_id", "usuario_id" e "unidade_id" são obrigatórios no Plano de Trabalho.
     */
    public function assinaturasFaltantes($planoTrabalho): array
    {
        $exigidas = $this->assinaturasExigidas($planoTrabalho);
        if (empty($planoTrabalho["id"]))
            return $exigidas;
        $assinaram = $this->jaAssinaramTCR($planoTrabalho["id"]);
        return [
            "participante" => array_diff($exigidas["participante"], $assinaram["participante"]),
            "gestores_unidade_executora" => empty($exigidas["gestores_unidade_executora"]) ? [] : (empty($this->util->intersecao($exigidas["gestores_unidade_executora"], $assinaram["gestores_unidade_executora"])) ? $exigidas["gestores_unidade_executora"] : []),
            "gestores_unidade_lotacao" => empty($exigidas["gestores_unidade_lotacao"]) ? [] : (empty($this->util->intersecao($exigidas["gestores_unidade_lotacao"], $assinaram["gestores_unidade_lotacao"])) ? $exigidas["gestores_unidade_lotacao"] : []),
            "gestores_entidade" => empty($exigidas["gestores_entidade"]) ? [] : (empty($this->util->intersecao($exigidas["gestores_entidade"], $assinaram["gestores_entidade"])) ? $exigidas["gestores_entidade"] : []),
        ];
    }

    /**
     *  Recebe um Plano de Trabalho (novo ou não) e retorna um booleano informando se ainda falta alguma assinatura no TCR, em comparação com as assinaturas exigidas pelo seu Programa de Gestão,
     *  seja ela do participante ou de algum gestor. Quando um dos gestores de uma Unidade (titular, substituto ou delegado) assina o TCR, a exigência de assinatura para essa Unidade é satisfeita.
     *  Os campos "programa_id", "usuario_id" e "unidade_id" são obrigatórios no Plano de Trabalho.
     */
    public function haAssinaturasFaltantes($planoTrabalho): bool
    {
        $faltantes = $this->assinaturasFaltantes($planoTrabalho);
        return !empty($faltantes["participante"]) || !empty($faltantes["gestores_unidade_executora"]) || !empty($faltantes["gestores_unidade_lotacao"]) || !empty($faltantes["gestores_entidade"]);
    }

    /**
     *  Recebe o ID de um usuário e um Plano de Trabalho (novo ou não), e retorna um booleano informando se esse usuário ainda falta assinar o TCR.
     *  Se o ID do usuário não for fornecido, o ID do usuário logado será utilizado. Se o usuário for um dos gestores da Unidade, será retornado FALSE
     *  se qualquer um dos demais gestores já tiver assinado o TCR. Os campos "programa_id", "usuario_id" e "unidade_id" são obrigatórios no Plano de Trabalho.
     */
    public function usuarioFaltaAssinar(string|null $idUsuario, $planoTrabalho): bool
    {
        $idUsuario = $idUsuario ?? parent::loggedUser()->id;
        $assinaturasFaltantes = $this->assinaturasFaltantes($planoTrabalho);
        return in_array($idUsuario, [...$assinaturasFaltantes["participante"], ...$assinaturasFaltantes["gestores_unidade_executora"], ...$assinaturasFaltantes["gestores_unidade_lotacao"], ...$assinaturasFaltantes["gestores_entidade"]]);
    }

    /**
     *  Recebe o ID de um usuário e um Plano de Trabalho (novo ou não), e retorna um booleano informando se a assinatura desse usuário no TCR é exigida pelo Programa de Gestão.
     *  Se o ID do usuário não for fornecido, o ID do usuário logado será utilizado. Os campos "programa_id", "usuario_id" e "unidade_id" são obrigatórios no Plano de Trabalho.
     */
    public function assinaturaUsuarioExigida(string|null $idUsuario, $planoTrabalho): bool
    {
        $idUsuario = $idUsuario ?? parent::loggedUser()->id;
        $exigidas = $this->assinaturasExigidas($planoTrabalho);
        return in_array($idUsuario, [...$exigidas["participante"], ...$exigidas["gestores_unidade_executora"], ...$exigidas["gestores_unidade_lotacao"], ...$exigidas["gestores_entidade"]]);
    }

    /**
     *  Recebe um Plano de Trabalho (novo ou não) e retorna um booleano informando se alguém já assinou o TCR, dentre as assinaturas exigidas pelo seu Programa de Gestão.
     *  Os campos "programa_id", "usuario_id" e "unidade_id" são obrigatórios no Plano de Trabalho.
     */
    public function alguemAssinou($planoTrabalho): bool
    {
        $exigidas = $this->assinaturasExigidas($planoTrabalho);
        $assinaram = empty($planoTrabalho["id"]) ? [] : $this->jaAssinaramTCR($planoTrabalho["id"]);
        return in_array($exigidas["participante"], $assinaram["participante"]) ||
            !empty($this->util->intersecao($exigidas["gestores_unidade_executora"], $assinaram["gestores_unidade_executora"])) ||
            !empty($this->util->intersecao($exigidas["gestores_unidade_lotacao"], $assinaram["gestores_unidade_lotacao"])) ||
            !empty($this->util->intersecao($exigidas["gestores_entidade"], $assinaram["gestores_entidade"]));
    }

    /**
     *  Recebe o ID de um Plano de Trabalho e retorna um array com os IDs dos usuários que já assinaram o seu TCR, no seguinte formato:
     *  [ "participante" => [id], "gestores_unidade_executora" => [...ids], "gestores_unidade_lotacao" => [...ids], "gestores_entidade" => [...ids] ]. Quando um dos gestores de uma Unidade
     */
    public function jaAssinaramTCR(string $plano_trabalho_id): array
    {
        $result = ["participante" => [], "gestores_unidade_executora" => [], "gestores_unidade_lotacao" => [], "gestores_entidade" => []];
        if ($this->hasBuffer("jaAssinaramTCR", $plano_trabalho_id)) {
            $result = $this->getBuffer("jaAssinaramTCR", $plano_trabalho_id);
        } else {
            $planoTrabalho = PlanoTrabalho::withTrashed()->find($plano_trabalho_id);
            $assinaturasExigidas = $this->assinaturasExigidas($planoTrabalho);
            if ($planoTrabalho && $planoTrabalho->documento_id && $planoTrabalho->documento) {
                $ids_assinaturas = $planoTrabalho->documento->assinaturas->map(fn($a) => $a->usuario_id)->toArray();
                $result["participante"] = UtilService::intersecao($assinaturasExigidas["participante"], $ids_assinaturas);
                $result["gestores_unidade_executora"] = array_values(UtilService::intersecao($assinaturasExigidas["gestores_unidade_executora"], $ids_assinaturas));
                $result["gestores_unidade_lotacao"] = array_values(UtilService::intersecao($assinaturasExigidas["gestores_unidade_lotacao"], $ids_assinaturas));
                $result["gestores_entidade"] = array_values(UtilService::intersecao($assinaturasExigidas["gestores_entidade"], $ids_assinaturas));
            }
            $this->setBuffer("jaAssinaramTCR", $plano_trabalho_id, $result);
        }
        return $result;
    }

    public function validarClone($planoTrabalho)
    {
        if ($this->hasBuffer("validarClone", $planoTrabalho["id"])) {
            return $this->getBuffer("validarClone", $planoTrabalho["id"]);
        } else {

            // percorrer entregas que tem plano_entrega_entrega_id e validar se o plano de entrega está ativo
            foreach ($planoTrabalho['entregas'] as $entrega) {
                if ($entrega['plano_entrega_entrega_id']) {
                    $planoEntregaEntrega = PlanoEntregaEntrega::find($entrega['plano_entrega_entrega_id']);
                    $status = $planoEntregaEntrega->planoEntrega->status;
                    // verifica se o plano de entrega está ativo    
                    if ($planoEntregaEntrega !== null && !in_array($planoEntregaEntrega->planoEntrega->status, ["ATIVO", "AVALIADO", "CONCLUIDO"])) {
                        return "O plano de trabalho não pode ser clonado porque o plano de entrega da entrega:" . $entrega['descricao'] . " não está ativo.";
                    }
                }
            }

            return null;
        }
    }

    private function validarPlanoTrabalho($planoTrabalho): void
    {
        if (empty($planoTrabalho["programa_id"]) || empty($planoTrabalho["usuario_id"]) || empty($planoTrabalho["unidade_id"])) {
            throw new ServerException("ValidatePlanoTrabalho", "Plano de Trabalho inconsistente (programa/usuário/unidade)!");
        }
    }

    private function buscarEntidadesRelacionadas($planoTrabalho): array
    {
        return [
            Programa::find($planoTrabalho["programa_id"]),
            Usuario::with("lotacao")->find($planoTrabalho["usuario_id"]),
            Unidade::find($planoTrabalho["unidade_id"])
        ];
    }

    private function quantidadeAssinaturasExigidas($planoTrabalho): int
    {
        $usuarioId = $planoTrabalho['usuario_id'];
        $unidadeId = $planoTrabalho['unidade_id'];
        
        // Verifica as atribuições do usuário na unidade do plano
        $unidade = Unidade::find($unidadeId);
        $atribuicoes = $this->usuarioService->atribuicoesGestor($unidade->unidade_pai_id, $usuarioId);
        
        // Se o usuário for gestor substituto da unidade superior: 1 assinatura
        if ($atribuicoes['gestorSubstituto']) {
            return 1;
        }
        
        // Se o usuário não for lotado na unidade: 3 assinaturas
        if (!$this->usuarioService->isLotacao($usuarioId, $unidadeId) ) {
            return 3;
        }
        
        // Caso contrário: 2 assinaturas (padrão)
        return 2;
    }
}
