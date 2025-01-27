<?php
namespace App\DTOs;

use App\Models\Unidade;
use App\Models\Usuario;

class RelatoErroLotacaoDTO
{
    public $opcao;
    public $usuario_id;
    public $unidade_id;
    public $nome;
    public $cpf;
    public $matricula;
    public $descricao;

    public ?Unidade $unidade;
    public ?Usuario $usuario;

    public array $emails = [];
}