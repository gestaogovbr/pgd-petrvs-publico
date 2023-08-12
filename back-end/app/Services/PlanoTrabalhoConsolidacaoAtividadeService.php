<?php

namespace App\Services;

use App\Models\PlanoTrabalho;
use App\Models\PlanoEntrega;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Services\CalendarioService;
use App\Services\UtilService;
use App\Exceptions\ServerException;
use App\Models\Atividade;
use App\Models\Documento;
use App\Models\PlanoTrabalhoConsolidacao;
use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoConsolidacaoAtividadeService extends ServiceBase 
{
}