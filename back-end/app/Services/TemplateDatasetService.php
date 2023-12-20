<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Services\PlanoTrabalhoService;
use App\Services\PlanoEntregaEntregaService;

class TemplateDatasetService extends ServiceBase
{
	public $dataset = [];
	public function __construct() {
		/*
			Definição dos datasets do sistema, deverá seguir a seguinte estrutura:
			[
				"context" => function ($params) => any  // Função que prepara o objeto para fazer a leitura doa campos na geração do datasource
				"fields" => [
					"field" => string // Nome do campo
					"label" => string // Descrição do campo (para auxiliar o usuário na criação dos templates)
					"type"? => 'ARRAY' | 'OBJECT' | 'VALUE' | 'DATE' | 'DATETIME' | 'TEMPLATE' // Tipo do campo
					"lookup"? => string // Código do lookup que deverá ser utilizado na renderização
				]
			]
		*/		
		// "PLANO_TRABALHO"
		$this->dataset = [
			"REPORT#PLAN_INSTITUCIONAL" => [
				"context" => function ($params) {	return $this->planejamentoService->getById($params);	},
				"fields" => "PLANEJAMENTO"
			],
			"REPORT#PTR_LISTA_ENTREGAS" => [
				"context" => function ($params) {	return $this->planoTrabalhoService->getById($params);	},
				"fields" => "PLANO_TRABALHO"
			],
			"REPORT#PTR_LISTA" => [
				"context" => function ($params) {	return (object) ["planos_trabalhos" => $params]; },
				"fields" => $this->reportFields([["field" => "planos_trabalhos", "label" => "Planos de trabalho", "fields" => "PLANO_TRABALHO", "type" => "ARRAY", "value" => function ($contexto) { return $this->planoTrabalhoService->query($contexto->planos_trabalhos)["rows"]; }]])
			],
			"CIDADE" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->cidadeService->getById($params) : $params; },
				"fields" => [
					["field" => "codigo_ibge", "label" => "Código"],
					["field" => "nome", "label" => "Nome"],
					["field" => "uf", "label" => "UF"],
				]
			],
			"ENTIDADE" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->entidadeService->getById($params) : $params; },
				"fields" => [
					["field" => "sigla", "label" => "Sigla"],
					["field" => "nome", "label" => "Nome"],
					["field" => "gestor", "label" => "Gestor", "fields" => 'USUARIO', "type" => "OBJECT", "value" => function ($contexto) { return $contexto->gestor;}],
					["field" => "gestor_substituto", "label" => "Gestor substituto", "fields" => 'USUARIO', "type" => "OBJECT", "value" => function ($contexto) { return $contexto->gestorSubstituto;}],
					["field" => "cidade", "label" => "Cidade", "fields" => 'CIDADE', "type" => "OBJECT", "value" => function ($contexto) { return $contexto->cidade;}]
				]
			],
			"OBJETIVO" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->planejamentoObjetivoService->getById($params) : $params; },
				"fields" => [
					["field" => "nome", "label" => "Nome"],
					["field" => "fundamentacao", "label" => "Fundamentação"],
					//["field" => "objetivos_filhos", "label" => "Objetivos Filhos", "fields" => "OBJETIVO", "type" => "ARRAY", "value" => function ($contexto) { return $contexto->objetivosFilhos; }],
				]
			],
			"PLANEJAMENTO" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->planejamentoService->getById($params) : $params; },
				"fields" => [
					["field" => "nome", "label" => "Nome"],
					["field" => "missao", "label" => "Missão"],
					["field" => "visao", "label" => "Visão"],
					["field" => "data_inicio", "label" => "Data início", "type" => "DATE"],
					["field" => "data_fim", "label" => "Data término", "type" => "DATE"],
				//	["field" => "valores", "label" => "Valores", "type" => "ARRAY", "fields" => "KEY_VALUE", "value" => function ($contexto) { return $contexto->valores; }],
				//	["field" => "resultados_institucionais", "label" => "Resultados Institucionais", "type" => "ARRAY", "fields" => "KEY_VALUE", "value" => function ($contexto) { return $contexto->resultados_institucionais; }],
					["field" => "objetivos", "label" => "Objetivos", "fields" => "OBJETIVO", "type" => "ARRAY", "value" => function ($contexto) { return $contexto->objetivos; }],
				]
			],
			"PLANO_TRABALHO" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->planoTrabalhoService->getById($params) : $params; },
				"fields" => [
					["field" => "carga_horaria", "label" => "Carga horária diária"],
					["field" => "tempo_total", "label" => "Tempo total do plano"],
					["field" => "tempo_proporcional", "label" => "Tempo proporcional (descontando afastamentos)"],
					["field" => "status", "label" => "Status do plano"],
					["field" => "data_inicio", "label" => "Data inicial do plano", "type" => "DATETIME"],
					["field" => "data_fim", "label" => "Data final do plano", "type" => "DATETIME"],
					["field" => "tipo_modalidade", "label" => "Tipo de modalidade", "fields" => "TIPO_MODALIDADE", "type" => "OBJECT", "value" => function ($contexto) { return $contexto->tipoModalidade; }],
					["field" => "usuario", "label" => "Usuário", "fields" => "USUARIO", "type" => "OBJECT", "value" => function ($contexto) { return $contexto->usuario; }],
					["field" => "unidade", "label" => "Unidade", "fields" => "UNIDADE", "type" => "OBJECT", "value" => function ($contexto) { return $contexto->unidade; }],
					["field" => "programa", "label" => "Programa", "fields" => "PROGRAMA", "type" => "OBJECT", "value" => function ($contexto) { return $contexto->programa; }],
					["field" => "entregas", "label" => "Entregas", "fields" => "PLANO_TRABALHO_ENTREGAS", "type" => "ARRAY", "value" => function ($contexto) { return $contexto->entregas; }],
				],
			],
			"PLANO_TRABALHO_ENTREGAS" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->planoTrabalhoEntregaService->getById($params) : $params; },
				"fields" => [
					["field" => "descricao", "label" => "Descrição da entrega"],
					["field" => "forca_trabalho", "label" => "Percentual da força de trabalho"],
					["field" => "orgao", "label" => "Órgão externo vinculado à entrega"],
					["field" => "meta", "label" => "Meta estipulada para a entrega"],
					["field" => "entrega", "label" => "Entrega do plano de entrega", "fields" => 'PROGRAMA_ENTREGA_ENTREGA', "type" => "OBJECT", "value" => function ($contexto) { return $contexto->entrega;	}],
				],
			],
			"PROGRAMA" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->programaService->getById($params) : $params; },
				"fields" => [
					["field" => "nome", "label" => "Nome"],
					["field" => "normativa", "label" => "Normativa"],
					["field" => "data_inicio", "label" => "Data início", "type" => "DATETIME"],
					["field" => "data_fim", "label" => "Data término", "type" => "DATETIME"]
				]
			],
			"PROGRAMA_ENTREGA_ENTREGA" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->planoEntregaEntregaService->getById($params) : $params; },
				"fields" => [
					["field" => "descricao", "label" => "Descrição da entrega"],
					["field" => "data_inicio", "label" => "Data de início", "type" => "DATETIME"],
					["field" => "data_fim", "label" => "Data de término", "type" => "DATETIME"],
					["field" => "homologado", "label" => "Se a entrega já foi homologada"],
					["field" => "progresso_esperado", "label" => "Percentual de progresso esperado da entrega"],
					["field" => "progresso_realizado", "label" => "Percentual de progresso realizado da entrega"],
					["field" => "destinatario", "label" => "Destinatário da entrega" ]
				],
			],
			"UNIDADE" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->unidadeService->getById($params) : $params; },
				"fields" => [
					["field" => "codigo", "label" => "Código"],
					["field" => "sigla", "label" => "Sigla"],
					["field" => "nome", "label" => "Nome"],
					["field" => "gestor", "label" => "Gestor", "fields" => 'USUARIO', "type" => "OBJECT", "value" => function ($contexto) { return $contexto->gestor;}],
					["field" => "gestor_substituto", "label" => "Gestor substituto", "fields" => 'USUARIO', "type" => "OBJECT", "value" => function ($contexto) { return $contexto->gestorSubstituto;}],
					["field" => "entidade", "label" => "Entidade", "fields" => 'ENTIDADE', "type" => "OBJECT", "value" => function ($contexto) { return $contexto->entidade;}],
					["field" => "cidade", "label" => "Cidade", "fields" => 'CIDADE', "type" => "OBJECT", "value" => function ($contexto) { return $contexto->cidade;}],
					["field" => "texto_complementar_plano", "label" => "Mensagem do Plano de trabalho", "type" => "TEMPLATE"]
				],
			],
			"USUARIO" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->usuarioService->getById($params) : $params; },
				"fields" => [
					["field" => "nome", "label" => "Nome"],
					["field" => "email", "label" => "E-mail"],
					["field" => "cpf", "label" => "CPF"],
					["field" => "matricula", "label" => "Matrícula"],
					["field" => "apelido", "label" => "Apelido"],
					["field" => "telefone", "label" => "Telefone"],
					["field" => "sexo", "label" => "Sexo", "lookup" => "SEXO"],
					["field" => "situacao_funcional", "label" => "Situação Funcional", "lookup" => "USUARIO_SITUACAO_FUNCIONAL"],
					["field" => "texto_complementar_plano", "label" => "Mensagem do Plano de trabalho", "type" => "TEMPLATE"]
				],
			],			
			"TIPO_MODALIDADE" => [
				"context" => function ($params) {	return gettype($params) == "string" ? $this->planoModalidadeService->getById($params) : $params; },
				"fields" => [
					["field" => "nome", "label" => "Nome"]
				],
			],
			"KEY_VALUE" => [
				"context" => function ($params) {	return $params; },
				"fields" => [
					["field" => "key", "label" => "Chave"],
					["field" => "value", "label" => "Valor"]
				],
			],
		];
	}

	public function reportFields($fields) {
		return $fields;
	}

	public function getFullDataset($key) {
		$result = [];
		if(array_key_exists($key, $this->dataset)) {
			$fields = is_array($this->dataset[$key]["fields"]) ? $this->dataset[$key]["fields"] : $this->getFullDataset($this->dataset[$key]["fields"]);
			foreach($fields as $field) {
				$type = array_key_exists("type", $field) ? $field["type"] : "VALUE";
				if(in_array($type, ["ARRAY", "OBJECT"])) {
					$result[] = [
						"field" => $field["field"],
						"label" => $field["label"],
						"type" => $field["type"],
						"fields" => is_array($field["fields"]) ? $field["fields"] : $this->getFullDataset($field["fields"])
					];
				} else {
					$item = [
						"field" => $field["field"],
						"label" => $field["label"],
						"type" => array_key_exists("type", $field) ? $field["type"] : "VALUE",
					];
					if(array_key_exists("lookup", $field)) $item["lookup"] = $field;
					$result[] = $item;
				}
			}
			return $result;
		} else {
			return null;
		}
	}

	public function getDataset() {
		return $this->dataset;
	}

}
