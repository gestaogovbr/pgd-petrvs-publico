<?php

/*
Aquivo responsável por fornecer a base da URL para a execução via extenção
baseando-se na URL da página hospedeira. Direciona para o respectivo servidor
que irá responder as requisições da aplicação. Utilizado somente pela extensão.
Este script deverá ser mantido no servidor master da aplicação, que é um servidor
centralizador do projeto, onde a extensão irá para buscar informações.
*/

/* CORS */
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : (isset($http_origin) ? $http_origin : "");
header("Access-Control-Allow-Origin: $origin"); 
header("Access-Control-Allow-Headers: Content-Type, origin");
if($_SERVER['REQUEST_METHOD'] == "OPTIONS") return;
header('Content-type: application/json');

/* Roteamentos */
$roteador = [
    'producao' => [
    	'sei.prf.gov.br' => [
    		'host' => 'https://petrvs-dsv.prf.gov.br',
    		'enabled' => true
    	],
    	'sei.antaq.gov.br' => [
    		'host' => 'https://petrvs.antaq.gov.br',
    		'enabled' => true
    	]
    ],
    'homologacao' => [
    	'sei.prf.gov.br' => [
    		'host' => 'https://petrvs-hmg.prf.gov.br',
    		'enabled' => true
    	],
    	'sei.antaq.gov.br' => [
    		'host' => 'https://petrvs.antaq.gov.br',
    		'enabled' => true
    	]
    ]
];

$url = !empty($_GET["url"]) ? $_GET["url"] : "";
$ambiente = !empty($_GET["ambiente"]) && $_GET["ambiente"] == "homologacao" ? "homologacao" : "producao";
if(array_key_exists($url, $roteador[$ambiente]) && $roteador[$ambiente][$url]['enabled']) {
	echo json_encode($roteador[$ambiente][$url]);
} else {
	echo json_encode(["error" => "Url da entidade não encontrada na base de dados."]);
}