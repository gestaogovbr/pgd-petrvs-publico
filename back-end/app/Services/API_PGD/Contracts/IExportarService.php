<?php
namespace App\Services\API_PGD\Contracts;

interface IExportarService
{
    public function enviar($token, $dados) : void;
    public function getBody($dados) : array;
    public function getBodyMock($dados) : array;
}