<?php
namespace App\Services\Siape;

class Erros {

    CONST faultcode = '0002';

    CONST faultstring = [
        'Erro de conexão com o mainframe.',
        'Não existem dados para consulta',
        'Consulta não retornou dados.',
        'Consulta n&amp;#xE3;o retornou dados.',
    ];


    public static function getFaultStringNaoExistemDados(): array
    {
        return [
            self::faultstring[1],
            self::faultstring[2],
            self::faultstring[3],
        ];
    }


}