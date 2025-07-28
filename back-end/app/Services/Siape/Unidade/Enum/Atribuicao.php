<?php
namespace App\Services\Siape\Unidade\Enum;

enum Atribuicao: string
{
    case AVALIADOR_PLANO_ENTREGA = 'AVALIADOR_PLANO_ENTREGA';
    case AVALIADOR_PLANO_TRABALHO = 'AVALIADOR_PLANO_TRABALHO';
    case HOMOLOGADOR_PLANO_ENTREGA = 'HOMOLOGADOR_PLANO_ENTREGA';
    case COLABORADOR = 'COLABORADOR';
    case GESTOR = 'GESTOR';
    case GESTOR_SUBSTITUTO = 'GESTOR_SUBSTITUTO';
    case GESTOR_DELEGADO = 'GESTOR_DELEGADO';
    case LOTADO = 'LOTADO';
    case CURADOR = 'CURADOR';


    public static function getValues(): array
    {
        return array_map(fn($atrib) => $atrib->value, Atribuicao::cases());
    }
}

?>
