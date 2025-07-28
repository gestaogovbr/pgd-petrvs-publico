<?php
namespace App\Services\Siape;

class Erros {

    CONST faultcode = '0002';

    CONST faultstring = [
        'Erro de conexão com o mainframe.',
        'Não existem dados para consulta',
    ];


    public static function getFaultStringNaoExistemDados(): string
    {
        return self::faultstring[1];
    }


}