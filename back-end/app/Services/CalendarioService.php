<?php

namespace App\Services;

use App\Exceptions\ValidateException;
use App\Models\Unidade;
use App\Models\Feriado;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;
use DateTime;
use DateTimeZone;
use Exception;
use Throwable;
use InvalidArgumentException;

class Interval
{
  public int $start;
  public int $end;

  function __construct($value = null)
  {
    $value = (array) $value;
    if ($value)
      foreach (array_keys($value) as $key)
        $this->$key = $value[$key];
  }
}

class Turno
{
  public string $inicio;
  public string $fim;
  public string|null $data;
  public bool $sem;

  function __construct($value = null)
  {
    $value = (array) $value;
    if ($value)
      foreach (array_keys($value) as $key)
        $this->$key = $value[$key];
  }
}

class Expediente
{
  public $domingo = [];
  public $segunda = [];
  public $terca = [];
  public $quarta = [];
  public $quinta = [];
  public $sexta = [];
  public $sabado = [];
  public $especial = [];

  function __construct($value = null)
  {
    $value = (array) $value;
    if ($value)
      foreach (array_keys($value) as $key)
        if ($value[$key])
          $this->$key = $value[$key];
  }
}

class ExpedienteDia
{
  public $diaSemana = '';
  public $diaLiteral = '';
  public $tInicio = 0;
  public $tFim = 0;
  public $hExpediente = 0;
  public $intervalos = [];

  function __construct($value = null)
  {
    $value = (array) $value;
    if ($value)
      foreach (array_keys($value) as $key)
        if ($value[$key])
          $this->$key = $value[$key];
  }
}

class Efemerides
{
  public string $resultado;
  public int $dias_corridos = 0;
  public string $inicio;
  public string $fim;
  public float $tempoUtil = 0.0;
  public string $forma;
  public float $horasNaoUteis = 0.0;
  public float $horasAfastamento = 0.0;
  public float $cargaHoraria = 0.0;
  public Expediente $expediente;
  public array $afastamentos = [];
  public array $pausas = [];
  public array $feriados = [];
  public array $diasNaoUteis = [];
  public array $diasDetalhes = [];

  function __construct($value = null)
  {
    $value = (array) $value;
    if ($value)
      foreach (array_keys($value) as $key)
        if ($value[$key])
          $this->$key = $value[$key];
  }
}

class CalendarioService
{
  const DIA_EM_SEGUNDOS = 86400;
  public $feriadosCadastrados = [];
  public $feriadosReligiosos = [];
  public $util;

  public static function feriadosCadastrados($unidade_id)
  {
    $unidade = Unidade::find($unidade_id);
    if ($unidade->cidade !== null) {
      $feriados = Feriado::whereRaw(
        "(entidade_id IS NULL OR entidade_id = :entidade_id) AND ("
        . "(abrangencia = 'NACIONAL') OR"
        . "(abrangencia = 'ESTADUAL' && uf = :uf) OR"
        . "(abrangencia = 'MUNICIPAL' && cidade_id = :cidade_id)"
        . ")",
        [
          ":entidade_id" => $unidade->entidade_id,
          ":uf" => $unidade->cidade->uf,
          ":cidade_id" => $unidade->cidade_id
        ]
      )->get();
    } else {
      $feriados = Feriado::whereRaw(
        "(entidade_id IS NULL OR entidade_id = :entidade_id) AND ("
        . "(abrangencia = 'NACIONAL')"
        . ")",
        [
          ":entidade_id" => $unidade->entidade_id
        ]
      )->get();
    }

    $result = [];
    foreach ($feriados as $feriado) {
      $data = ($feriado->recorrente ? "" : str_pad($feriado->ano, 4, "0", STR_PAD_LEFT)) . "-" .
        str_pad($feriado->mes, 2, "0", STR_PAD_LEFT) . "-" .
        str_pad($feriado->dia, 2, "0", STR_PAD_LEFT);
      $result[$data] = $feriado->nome;
    }
    return $result;
  }

  public static function isFinalSemana($timestamp)
  {
    return date("N", $timestamp) > 5;
  }

  public static function isFeriadoReligioso($timestamp): string|null
  {
    $listaFeriados = static::listaFeriadosReligiosos($timestamp, $timestamp);
    return static::isFeriadoCadastrado($timestamp, $listaFeriados);
  }

  public static function isFeriadoCadastrado($timestamp, $listaFeriados): string|null
  {
    $result = array_key_exists(date("Y-m-d", $timestamp), $listaFeriados);
    if ($result)
      return $listaFeriados[date("Y-m-d", $timestamp)];
    $result = array_key_exists(date("0000-m-d", $timestamp), $listaFeriados);
    return $result ? $listaFeriados[date("0000-m-d", $timestamp)] : null;
  }

  public static function easter(int $ano = null)
  {
    $year = $ano ?? getdate()['year'];
    $G = $year % 19;
    $C = floor($year / 100);
    $H = ($C - floor($C / 4) - floor((8 * $C + 13) / 25) + 19 * $G + 15) % 30;
    $I = $H - floor($H / 28) * (1 - floor(29 / ($H + 1)) * floor((21 - $G) / 11));
    $J = ($year + floor($year / 4) + $I + 2 - $C + floor($C / 4)) % 7;
    $L = $I - $J;
    $month = 3 + floor(($L + 40) / 44);
    $day = $L + 28 - 31 * floor($month / 4);
    return new DateTime($year . "-" . $month . "-" . $day . " 00:00:00");
  }

  public static function listaFeriadosReligiosos(int $inicio, int $fim)
  {
    $feriados = [];
    for ($ano = intval(date('Y', $inicio)), $anoFim = intval(date('Y', $fim)); $ano <= $anoFim; $ano++) {
      $pascoa = static::easter($ano);
      $pascoaDia = date('j', UtilService::asTimestamp($pascoa));
      $pascoaMes = date('n', UtilService::asTimestamp($pascoa));
      $pascoaAno = date('Y', UtilService::asTimestamp($pascoa));
      $feriados[date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 48, $pascoaAno))] = '2ª-feira Carnaval';
      $feriados[date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 47, $pascoaAno))] = '3ª-feira Carnaval';
      $feriados[date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 2, $pascoaAno))] = '6ª-feira Santa';
      $feriados[date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia, $pascoaAno))] = 'Páscoa';
      $feriados[date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia + 60, $pascoaAno))] = 'Corpus Christi';
    }
    return $feriados;
  }

  public static function horarioServidor()
  {
    $dateTime = new DateTime();
    $dateTime->setTimestamp($dateTime->getTimestamp() + (60 * 60 * (config('petrvs')["timezone"] + 3)));
    return ServiceBase::toIso8601($dateTime);
  }


  public static function getTimestamp($date)
  {
    return UtilService::asTimestamp($date);
  }

  public static function between($date, $start, $end): bool
  {
    $date = CalendarioService::getTimestamp($date); //gettype($date) == "integer" ? $date : ($date instanceof DateTime ? $date->getTimestamp() : strtotime($date));
    $start = CalendarioService::getTimestamp($start); //gettype($start) == "integer" ? $start : ($start instanceof DateTime ? $start->getTimestamp() : strtotime($start));
    $end = CalendarioService::getTimestamp($end); //gettype($end) == "integer" ? $end : ($end instanceof DateTime ? $end->getTimestamp() : strtotime($end));
    return $date >= $start && $date <= $end;
  }

  /**
   * horasEntreDatas
   *
   * @param  mixed $inicio: data inicial, em formato UNIX timestamp
   * @param  mixed $fim: data final, em formato UNIX timestamp
   * @return int: quantidade de horas entre as duas datas
   */
  public function horasEntreDatas($inicio, $fim): int
  {
    try {
      $r = $inicio->diff($fim);

      $horas = $r->y * 8760 + $r->m * 720 + $r->d * 24 + $r->h;
    } catch (Throwable $e) {
      throw $e;
    }
    return $horas;
  }

  public function listaFeriadosCadastrados($inicio, $fim, $unidade)
  {
    $feriados = Feriado::whereRaw(
      "(entidade_id IS NULL OR entidade_id = :entidade_id) AND ("
      . "(abrangencia = 'NACIONAL') OR"
      . "(abrangencia = 'ESTADUAL' && uf = :uf) OR"
      . "(abrangencia = 'MUNICIPAL' && cidade_id = :cidade_id)"
      . ")",
      [
        ":entidade_id" => $unidade->entidade_id,
        ":uf" => $unidade->cidade->uf,
        ":cidade_id" => $unidade->cidade_id
      ]
    )->get();
    $result = [];
    for ($ano = intval(date('Y', $inicio)), $anoFim = intval(date('Y', $fim)); $ano <= $anoFim; $ano++) {
      foreach ($feriados as $feriado) {
        $dataFeriado = mktime(0, 0, 0, $feriado->dia, $feriado->mes, $ano);
        if (($feriado->recorrent || $feriado->ano == $ano) && static::between($dataFeriado, $inicio, $fim)) {
          array_push($result, date("Y-m-d", $dataFeriado));
        }
      }
    }
    return $result;
  }

  public function decimalToTimer($decimal)
  {
    $hours = floor($decimal);
    $min = round(($decimal - $hours) * 60);
    return mktime($hours, $min, 0, 0, 0, 0);
  }

  public function timerToDecimal($time)
  {
    $sec = $time % 60;
    $min = floor($time / 60);
    $hours = floor($min / 60);
    $min = $min % 60;
    return $hours + ($min / 60) + ($sec / (60 * 60));
  }

  public function prazo($inicio_data, $horas, $carga_horaria, $unidade_id)
  {
    $unidade = Unidade::find($unidade_id);
    $dataInicio = $inicio_data instanceof DateTime ? $inicio_data->getTimestamp() : strtotime($inicio_data);
    $diaAtual = $dataInicio;
    $cargaHoraria = $this->decimalToTimer($carga_horaria);
    $result = "";
    $ano = "";
    $forma = $unidade->distribuicao_forma_contagem_prazos;
    $listaFeriados = [];
    $listaFeriadosReligiosos = [];
    while ($unidade && $horas > 0) {
      if ($ano != date('Y', $diaAtual)) {
        $ano = date('Y', $diaAtual);
        $inicio = $ano == date('Y', $dataInicio) ? $dataInicio : mktime(0, 0, 0, 1, 1, $ano);
        $fim = mktime(0, 0, 0, 31, 12, $ano);
        $listaFeriados = $this->listaFeriadosCadastrados($inicio, $fim, $unidade);
        $listaFeriadosReligiosos = $this->listaFeriadosReligiosos($inicio, $fim);
      }
      $diaUtil = !static::isFeriadoReligioso($diaAtual, $listaFeriadosReligiosos) && static::isFeriadoCadastrado($diaAtual, $listaFeriados) && !static::isFinalSemana($inicio);
      /* calcula em dias */
      if ($forma == "DIAS_CORRIDOS" || $forma == "DIAS_UTEIS") {
        /* Conta sempre a partir do próximo dia útil e encerra sempre com $unidade->horario_trabalho_fim */
        if ($dataInicio != $diaAtual && ($forma == "DIAS_CORRIDOS" || $diaUtil)) {
          $horas -= min($cargaHoraria, $horas);
          $result = date('Y-m-d', $diaAtual) + "T" + $unidade->horario_trabalho_fim + ":00";
        }
      } else { /* calcula em horas */
        if ($forma == "HORAS_CORRIDAS" || $diaUtil) {
          $inicioDia = $dataInicio != $diaAtual ? $dataInicio : strtotime(date('Y-m-d', $diaAtual) + "T" + ($forma == "HORAS_CORRIDAS" ? "00:00:00" : $unidade->horario_trabalho_inicio));
          $expediente = $forma == "HORAS_CORRIDAS" ? strtotime(date('Y-m-d', $diaAtual) + "T23:59:59") : min(strtotime(date('Y-m-d', $diaAtual) + "T" + $unidade->horario_trabalho_fim) - $inicioDia, $cargaHoraria);
          $horasUteis = min($expediente, $horas);
          $horas -= $horasUteis;
          $result = date(ServiceBase::ISO8601_FORMAT, $inicioDia + $horasUteis);
        }
      }
      $diaAtual += self::DIA_EM_SEGUNDOS;
    }
    return $result;
  }

  public function qtdDiasUteis($inicioData, $fimData, $unidade_id)
  {
    $inicio = $inicioData instanceof DateTime ? $inicioData->getTimestamp() : strtotime($inicioData);
    $fim = $fimData instanceof DateTime ? $fimData->getTimestamp() : strtotime($fimData);
    $unidade = Unidade::find($unidade_id);
    if ($inicio < $fim && !empty($unidade)) {
      $listaFeriados = $this->listaFeriadosCadastrados($inicio, $fim, $unidade);
      $listaFeriadosReligiosos = $this->listaFeriadosReligiosos($inicio, $fim, $unidade);
      $diasUteis = 0;
      for (; $inicio <= $fim; $inicio += self::DIA_EM_SEGUNDOS) {
        if (!static::isFeriadoReligioso($inicio, $listaFeriadosReligiosos) && !static::isFeriadoCadastrado($inicio, $listaFeriados) && !static::isFinalSemana($inicio)) {
          $diasUteis++;
        }
      }
      ;
      return $diasUteis;
    }
  }

  public function feriados($inicioData, $fimData, $unidade_id)
  {
    $inicio = $inicioData instanceof DateTime ? $inicioData->getTimestamp() : strtotime($inicioData);
    $fim = $fimData instanceof DateTime ? $fimData->getTimestamp() : strtotime($fimData);
    $unidade = Unidade::find($unidade_id);
    return [
      "religiosos" => $this->listaFeriadosReligiosos($inicio, $fim, $unidade),
      "cadastrados" => $this->listaFeriadosCadastrados($inicio, $fim, $unidade)
    ];
  }

  public function tempoAtraso($data_estipulada_entrega, $referencia, $carga_horaria)
  {
    // Refazer esse método para considerar os fds e os feriados e fastamentos
    return 100;
    //$this->timerToDecimal();
  }

  /**
   * expediente
   *
   * @param  mixed $unidade: parâmetro opcional
   * @param  mixed $inicio: parâmetro opcional
   * @return: retorna a duração do expediente em horas. Se a $unidade não for informada, retorna 24.
   */
  public static function expediente(Unidade $unidade = null, DateTime $inicio = null)
  {
    return is_null($unidade) ? 24 : max(UtilService::getStrTimeHours($unidade->horario_trabalho_fim) -
      ($inicio ? UtilService::getTimeHours($inicio) : UtilService::getStrTimeHours($unidade->horario_trabalho_inicio)) -
      UtilService::getStrTimeHours($unidade->horario_trabalho_intervalo ?? "00:00"), 0);
  }

  public static function preparaParametros(array $data): Efemerides
  {
    $inicio = UtilService::asDateTime($data['inicio']);
    $fimOuTempo = in_array(gettype($data['fimOuTempo']), ["integer", "double"]) ? $data['fimOuTempo'] : UtilService::asDateTime($data['fimOuTempo']);
    $cargaHoraria = doubleval($data['cargaHoraria']);
    $unidade = Unidade::find($data['unidade_id']);
    $tipo = $data['tipo'];
    $pausas = $data['pausas'];
    $afastamentos = $data['afastamentos'];
    $resultado = static::calculaDataTempoUnidade($inicio, $fimOuTempo, $cargaHoraria, $unidade, $tipo, $pausas, $afastamentos);
    return $resultado;
  }

  public static function calculaDataTempoUnidade($inicio, $fimOuTempo, int $cargaHoraria, Unidade $unidade, string $tipo, array $pausas = null, array $afastamentos = null): Efemerides
  {
    $feriados = static::feriadosCadastrados($unidade->id) ?? [];
    $forma = in_array($tipo, ['HORAS_UTEIS', 'HORAS_CORRIDAS', 'DIAS_UTEIS', 'DIAS_CORRIDOS']) ? $tipo : ($tipo == 'DISTRIBUICAO' ? $unidade->distribuicao_forma_contagem_prazos : $unidade->entrega_forma_contagem_prazos);
    $expediente = static::nestedExpediente($unidade);
    return static::calculaDataTempo($inicio, $fimOuTempo, $forma, $cargaHoraria, $expediente, $feriados, $pausas, $afastamentos);
  }

  public static function nestedExpediente(Unidade $unidade): Expediente
  {
    $expediente = $unidade->expediente ? new Expediente($unidade->expediente) : new Expediente($unidade->entidade->expediente);
    $expediente = $expediente ? $expediente : ($unidade->entidade_id == Auth::user()->unidade->entidade_id ? new Expediente(Auth::user()->unidade->entidade->expediente) : new Expediente());
    //transforma objetos da classe stdClass em objetos da classe Turno
    foreach (array_keys((array) $expediente) as $dia) {
      foreach (array_keys((array) $expediente->$dia) as $t) {
        if (array_key_exists($t, $expediente->$dia)) {
          $expediente->$dia[$t] = new Turno((array) $expediente->$dia[$t]);
        }
      }
    }
    return $expediente;
  }

  /*
  Função responsável por todos os cálculos de períodos no sistema.
  Obs.: As variáveis que armazenam tempo/data são iniciadas com as respectivas letras:
  - d: data, do tipo DateTime do PHP
  - h: tempo em formato de horas, de forma numérica, por exempo 01h30 será igual a 1.5
  - t: tempo em formado de segundos (DateTime.getTimestamp() do PHP)
  - u: Unidade de dia, é um formato semelhante ao timestamp, porem contado em dias
  - s: Hora em formato string (hh:mm(:ss)?)

  @param  DateTime         $inicio        Data e hora de inicio
  @param  (data | número)  $fimOuTempo    Se a intenção for calcular a dataFim então será passado o tempo.
                                          Se for passada uma data, então será calculado o tempo.
      O tempo é calculado da seguinte forma:
      1) Se forma for DIAS, então será sempre um mútiplo de cargaHoraria (dias = fimOuTempo / cargaHoraria)
      2) Se forma for HORAS, será as horas em forma decimal
  @param  string           $forma         Forma de contagem dos prazos (dias/horas - úteis/corridos)
  @param  int | null       $cargaHoraria  Carga horária que será considerada para os cálculos
  @param  Expediente       $expediente    Expediente que será utilizado para os cálculos. Não obrigatório caso seja dias/horas corridas.
  @param  array | null     $feriados      Lista dos feriados, quando aplicável
  @param  array | null     $pausas        Lista das pausas, quando aplicável
  @param  array | null     $afastamentos  Lista dos afastamentos do usuário, a partir da data $inicio, quando aplicável
  @return Efemerides                      Retorna todas as informações do cálculo com as horas ou a data fim calculados
  */
  public static function calculaDataTempo(DateTime $inicio, $fimOuTempo, string $forma, int $cargaHoraria = null, Expediente $expediente, array $feriados = null, array $pausas = null, array $afastamentos = null): Efemerides
  {
    if (!defined('INICIO_PERIODO'))
      define('INICIO_PERIODO', $inicio->format(DateTime::ATOM));
    $useCorridos = $forma == "DIAS_CORRIDOS" || $forma == "HORAS_CORRIDAS";
    $useDias = $forma == "DIAS_CORRIDOS" || $forma == "DIAS_UTEIS";
    $useTempo = in_array(gettype($fimOuTempo), ["integer", "double"]); /* Se o parametro fimOuTempo for uma data, é porque deve-se usá-la para calcular o Tempo (ou seja, useTempo = false); Caso ele seja um nr. de horas, é porque deve-se usá-lo para calcular a DataFim (useTempo = true)*/
    $uDiasInicio = UtilService::daystamp($inicio); /* Dia inicio (usado somente se !useTempo) */
    $uDiasFim = $useTempo ? $uDiasInicio : UtilService::daystamp(UtilService::asDateTime($fimOuTempo)); /* Dia fim (usado somente se !useTempo) */

    /* Verifica se existe $expediente quando ele é obrigatório, e cria uma exceção se ele não foi informado. Quando não for obrigatório, $expediente será nulo  */
    if (!$expediente && !$useCorridos)
      throw new ValidateException('Expediente não informado');
    $expediente = $useCorridos ? null : $expediente;

    $result = new Efemerides([
      'resultado' => $useTempo ? "DATA" : "TEMPO",
      'tempoUtil' => $useTempo ? $fimOuTempo : 0,
      'fim' => !$useTempo ? (UtilService::asDateTime($fimOuTempo))->format(DateTime::ATOM) : $inicio->format(DateTime::ATOM),
      'expediente' => new Expediente(),
      'forma' => $forma,
      'cargaHoraria' => $cargaHoraria ?? 24
    ]);

    /* Calcula as horas de afastamento */
    $horasAfastamentos = function (int $start, int $end) use (&$result, &$afastamentos): array {
      $periodos = [];
      foreach (($afastamentos ?? []) as $afastamento) {
        /* calcula a intersecção entre start e end e o inicio e fim do afastamento */
        $a = UtilService::asTimestamp($afastamento['data_inicio']);
        $b = UtilService::asTimestamp($afastamento['data_fim']);
        $intervalo = UtilService::intersection([new Interval(['start' => $start, 'end' => $end]), new Interval(['start' => $a, 'end' => $b])]);
        if ($intervalo && $intervalo["start"] != $intervalo["end"]) {
          /* Caso tenha uma intersecção, adiciona o período para retorno e insere em $result->afastamentos */
          array_push($periodos, $intervalo);
          if (gettype(array_search($afastamento, $result->afastamentos)) != 'integer') {
            array_push($result->afastamentos, $afastamento);
          }
        }
      };
      return $periodos;
    };

    /* Calcula as horas pausadas */
    $horasPausas = function (int $start, int $end) use (&$result, &$pausas): array {
      $periodos = [];
      foreach (($pausas ?? []) as $pausa) {
        $intervalo = UtilService::intersection([
          new Interval(['start' => $start, 'end' => $end]),
          new Interval(['start' => UtilService::asTimestamp($pausa['data_inicio']), 'end' => $pausa['data_fim'] ? UtilService::asTimestamp($pausa['data_fim']) : $end])
        ]);
        if ($intervalo && $intervalo["start"] != $intervalo["end"]) {
          array_push($periodos, $intervalo);
          if (!array_search($pausa, $result->pausas)) {
            array_push($result->pausas, $pausa);
          }
        }
      };
      return $periodos;
    };

    $hTempo = $useTempo ? $fimOuTempo : 0.0; /* variável saldo de horas/dias (usado somente se useTempo) */
    $dDiaAtual = $inicio; /* Variável que irá percorrer todas as datas (do inicio ao fim ou a quantidade de horas) */

    /* Calculo do expediente (inicio, fim, e intervalos. Considerando os especiais). Caso expediente seja undefined então será 24h, e caso não tenha expediente no dia será undefined */
    $expedienteDia = function (string $sInicio = null, string $sFim = null) use (&$dDiaAtual, &$expediente, &$result): ExpedienteDia {
      $diaSemana = LookupService::getCode(LookupService::LOOKUPS['DIA_SEMANA'], date('w', UtilService::asTimestamp($dDiaAtual)));
      $diaLiteral = LookupService::getValue(LookupService::LOOKUPS['DIA_SEMANA'], date('w', UtilService::asTimestamp($dDiaAtual)));
      $tLimiteInicio = UtilService::asTimestamp(UtilService::setStrTime($dDiaAtual, $sInicio ?? "00:00"));
      $tLimiteFim = UtilService::asTimestamp(UtilService::setStrTime($dDiaAtual, $sFim ?? "24:00"));
      $dia = new ExpedienteDia([
        'diaSemana' => $diaSemana,
        'diaLiteral' => $diaLiteral,
        'tInicio' => $tLimiteInicio,
        'tFim' => $tLimiteFim,
        'hExpediente' => UtilService::getHoursBetween(UtilService::asDateTime($tLimiteInicio), UtilService::asDateTime($tLimiteFim)),
        'intervalos' => [new Interval(['start' => 0, 'end' => 0])]
      ]);
      if ($expediente) {
        $diaIso = $dDiaAtual->format('Y-m-d');
        $especial = array_filter($expediente->especial, function (Turno $x) use (&$diaIso) {
          if (is_string($x->data)) {
              $data = DateTime::createFromFormat('Y-m-d H:i:s', $x->data);
              if (!$data) {
                  $data = DateTime::createFromFormat('Y-m-d', $x->data);
              }
          } else if ($x->data instanceof DateTime) {
              $data = $x->data;
          } else {
              return false;
          }
          return $data->format('Y-m-d') == $diaIso;
        });
        $turnos = [...$expediente->$diaSemana, ...array_filter($especial, function ($x) {
          !$x->sem; })];
        usort($turnos, function ($a, $b) {
          UtilService::getStrTimeHours($a->inicio) - UtilService::getStrTimeHours($b->inicio); });
        /* Adiciona o expediente utilizado */
        $result->expediente->$diaSemana = $expediente->$diaSemana;
        array_push($result->expediente->especial, ...$especial);
        if (count($turnos) > 0) {
          $tFimTurno = null;
          $dia->tInicio = max($tLimiteInicio, UtilService::setStrTime($dDiaAtual, $turnos[0]->inicio)->getTimestamp());
          $dia->tFim = min($tLimiteFim, max(UtilService::setStrTime($dDiaAtual, $turnos[0]->fim)->getTimestamp(), $dia->tInicio));
          /* Calcula o inicio e fim e adiciona intervalos, e soma os expedientes especiais COM expediente */
          foreach ($turnos as $turno) {
            $tInicio = UtilService::setStrTime($dDiaAtual, $turno->inicio)->getTimestamp();
            $tFim = UtilService::setStrTime($dDiaAtual, $turno->fim)->getTimestamp();
            if ($tLimiteInicio < $tFim && $tInicio < $tLimiteFim) {
              if ($tFimTurno && $tFimTurno < $tInicio)
                array_push($dia->intervalos, new Interval(['start' => $tFimTurno, 'end' => $tInicio]));
              $dia->tInicio = max($tLimiteInicio, min($dia->tInicio, $tInicio));
              $dia->tFim = min($tLimiteFim, max($dia->tFim, $tFim));
              $tFimTurno = $tFimTurno ? max($tFimTurno, $tFim) : $tFim;
            }
          }
          $dia->hExpediente = UtilService::getHoursBetween(UtilService::asDateTime($dia->tInicio), UtilService::asDateTime($dia->tFim));
          /* Adiciona os expedientes especiais SEM expediente e faz a união com os intervalos já existentes do expediente */
          array_map(function (Turno $x) use (&$dia, &$dDiaAtual) {
            array_push($dia->intervalos, new Interval([
              'start' => UtilService::setStrTime($dDiaAtual, $x->inicio)->getTimestamp(),
              'end' => UtilService::setStrTime($dDiaAtual, $x->fim)->getTimestamp()
            ]));
          }, array_filter($especial, function (Turno $x) {
            if ($x->sem)
              return $x; }));
          $dia->intervalos = UtilService::union($dia->intervalos);
          /* Filtra e ajusta os intervalos para caberem entre inicio e fim */
          $dia->intervalos = array_map(
            function (Interval $x) use (&$dia) {
              return new Interval(['start' => max($x->start, $dia->tInicio), 'end' => min($x->end, $dia->tFim)]); },
            array_filter($dia->intervalos, function (Interval $x) use (&$dia) {
              return $x->start <= $dia->tFim && $x->end >= $dia->tInicio; }),
          );
          /* Calcula as horas dos intervalos (os intervalos já estão unificados e ajustados para dentro do expediente)
          dia.hNaoUteis = dia.intervalo.reduce((a, v) => a + this.util.getHoursBetween(v.start, v.end), 0); */
        } else { /* Caso no dia não tenha nenhum turno ou horario especial com expediente */
          $dia->tInicio = 0;
          $dia->tFim = 0;
          $dia->hExpediente = 0;
        }
      }
      return $dia;
    };

    $cargaHoraria = $forma == "HORAS_CORRIDAS" ? 24 : $result->cargaHoraria; /* Garante que se a carga horária vier zerado, será considerado 24hrs */
    while ($useTempo ? (UtilService::round($hTempo, 2) > 0) : (UtilService::daystamp($dDiaAtual) <= $uDiasFim)) {
      $firstDay = UtilService::daystamp($dDiaAtual) == $uDiasInicio;
      $lastDay = UtilService::daystamp($dDiaAtual) == $uDiasFim;
      $strDiaAtual = $dDiaAtual->format('Y-m-d'); /* Usado somente para indexar os vetores com a data do feriado/fds */
      $sInicio = $useDias || !$firstDay ? null : UtilService::getTimeFormatted($inicio);
      $sFim = $useDias || !$lastDay || $useTempo ? null : UtilService::getTimeFormatted($fimOuTempo);
      $diaAtual = $expedienteDia($sInicio, $sFim); /* Em caso de useTempo, sFim ainda não corresponde ao fim do expediente, será encontrado depois */
      /* Afastamentos e pausas baseados no inicio e fim do expediente */
      $afastamentosDia = $horasAfastamentos($diaAtual->tInicio, $diaAtual->tFim);
      if ($afastamentosDia == [])
        $afastamentosDia = [new Interval(['start' => 0, 'end' => 0])];
      $pausasDia = $horasPausas($diaAtual->tInicio, $diaAtual->tFim);
      if ($pausasDia == [])
        $pausasDia = [new Interval(['start' => 0, 'end' => 0])];
      /* Se for dias corridos ou horas corridas não é necessário calcular Feriados e nem Fins de Semana */
      $feriadoCadastrado = $useCorridos ? null : static::isFeriadoCadastrado(UtilService::asTimestamp($dDiaAtual), $feriados);
      $feriadoReligioso = $useCorridos ? null : static::isFeriadoReligioso(UtilService::asTimestamp($dDiaAtual));
      if (!$useCorridos) {
        if ($feriadoCadastrado)
          $result->feriados[$strDiaAtual] = $feriadoCadastrado; /* Se feriado cadastrado, adiciona ao resultado */
        if ($feriadoReligioso)
          $result->feriados[$strDiaAtual] = $feriadoReligioso; /* Se feriado religioso, adiciona ao resultado */
      }
      /* Calcula se é dia útil ou não */
      $naoUteis = $useCorridos ? [new Interval(['start' => 0, 'end' => 0])] : UtilService::union([...$afastamentosDia, ...$pausasDia, ...$diaAtual->intervalos]);
      $hNaoUteis = array_reduce($naoUteis, function ($acum, $item) {
        $acum += UtilService::getHoursBetween(UtilService::asDateTime($item->start), UtilService::asDateTime($item->end));
        return $acum;
      }, 0);
      $diaUtil = $useCorridos || (!$feriadoCadastrado && !$feriadoReligioso && $diaAtual->hExpediente > $hNaoUteis);

      // cálculo das horas dos afastamentos do servidor
      $afastamentoHoje = UtilService::union($afastamentosDia);
      $hAfastamentoHoje = array_reduce($afastamentoHoje, function ($acum, $item) {
        $acum += UtilService::getHoursBetween(UtilService::asDateTime($item->start), UtilService::asDateTime($item->end));
        return $acum;
      }, 0);
      $intersecao = UtilService::intersection([...$diaAtual->intervalos, ...$afastamentosDia]);
      $hIntersecao = !$intersecao ? 0 : array_reduce([$intersecao], function ($acum, $item) {
        $acum += UtilService::getHoursBetween(UtilService::asDateTime($item->start), UtilService::asDateTime($item->end));
        return $acum;
      }, 0);
      $result->horasAfastamento += ($hAfastamentoHoje - $hIntersecao);

      if (!$diaUtil)
        $result->diasNaoUteis[$strDiaAtual] = implode(', ', array_filter([$diaAtual->diaLiteral, $feriadoCadastrado, $feriadoReligioso], function ($x) {
          return strlen($x); }));

      /* Calculo em dias (se a forma pretendida for DIAS ÚTEIS ou DIAS CORRIDOS) */
      if ($useDias) {
        foreach ($afastamentosDia as $a) {
          if ($a->start == 0) {
            unset($afastamentosDia[array_search($a, $afastamentosDia)]);
          }
        }    // elimina eventual intervalo do tipo ['start' => 0, 'end' => 0]
        foreach ($pausasDia as $p) {
          if ($p->start == 0) {
            unset($pausasDia[array_search($p, $pausasDia)]);
          }
        }    // elimina eventual intervalo do tipo ['start' => 0, 'end' => 0]
        if ($diaUtil && ($useCorridos || (!count($afastamentosDia) && !count($pausasDia)))) {
          if ($useTempo) { /* se for pra calcular a data fim, como é dia, será sempre a data na hora final do expediente, mas não importa, porque o que contará é somente o data sem hora */
            $hTempo -= $cargaHoraria;
            $result->fim = (UtilService::asDateTime($diaAtual->tFim))->format(DateTime::ATOM);
          } else { /* se for pra calcular o tempoUtil (lembrando que a quantidade de dias é tempoUtil / cargaHoraria) */
            $result->tempoUtil += $cargaHoraria;
          }
        } else {
          $result->horasNaoUteis += $cargaHoraria; /* Se o dia não for útil considera o tempo do dia inteiro */
        }
      } else { /* calcula em horas (se a forma pretendida for HORAS ÚTEIS ou HORAS CORRIDAS) */
        if ($diaUtil) {
          $hSaldo = min($diaAtual->hExpediente - $hNaoUteis, $cargaHoraria, $useTempo ? $hTempo : 24);
          if ($hSaldo) {
            if ($useTempo) { /* calcula a data fim */
              $hTempo -= $hSaldo;
              foreach ($naoUteis as $n) {
                if ($n->start == 0) {
                  unset($naoUteis[array_search($n, $naoUteis)]);
                }
              }    // elimina eventual intervalo do tipo ['start' => 0, 'end' => 0]
              $ultimoTurno = array_reduce($naoUteis, function ($a, $v) use (&$hSaldo) {
                $hTurno = UtilService::getHoursBetween($a, UtilService::asDateTime($v->start));
                if ($hTurno < $hSaldo) {
                  $hSaldo -= $hTurno;
                  return $v->end;
                }
                return $a;
              }, UtilService::asDateTime($diaAtual->tInicio));
              $result->fim = (UtilService::addTimeHours(UtilService::asDateTime($ultimoTurno), $hSaldo))->format(DateTime::ATOM);
              if (!$hTempo) {
                $diaAtual->tFim = UtilService::asTimestamp(UtilService::addTimeHours(UtilService::asDateTime($ultimoTurno), $hSaldo));
                $diaAtual->hExpediente = $hSaldo;
              }
            } else { /* calcula o tempoUtil */
              $result->tempoUtil += $hSaldo;
            }
          }
        } else {
          $result->horasNaoUteis += min($diaAtual->hExpediente, $cargaHoraria);
        }
      }

      if ($diaUtil) {
        // prepara os valores para o front-end
        $diaAtual->tInicio *= 1000;
        $diaAtual->tFim *= 1000;
        foreach ($naoUteis as $n) {
          if ($n->start == 0) {
            unset($naoUteis[array_search($n, $naoUteis)]);
          } else {
            $n->start *= 1000;
            $n->end *= 1000;
          }
        }
        array_push($result->diasDetalhes, $diaAtual);
        $result->diasDetalhes[count($result->diasDetalhes) - 1]->intervalos = (array) $naoUteis;
      }
      $dDiaAtual->modify('+1 day');;
      $result->dias_corridos++;
    }
    $result->inicio = INICIO_PERIODO;
    return $result;
  }

  function utcToTimezone(int $utcOffset): string
  {
    switch ($utcOffset) {
        case -12:
            return 'Etc/GMT+12';

        case -11:
            return 'Pacific/Niue';

        case -10:
            return 'Pacific/Honolulu';

        case -9:
            return 'America/Anchorage';

        case -8:
            return 'America/Los_Angeles';

        case -7:
            return 'America/Denver';

        case -6:
            return 'America/Mexico_City';

        case -5:
            return 'America/New_York';

        case -4:
            return 'America/Manaus';

        case -3:
            return 'America/Sao_Paulo';

        case -2:
            return 'America/Noronha';

        case -1:
            return 'Atlantic/Cape_Verde';

        case 0:
            return 'Etc/UTC';

        case 1:
            return 'Europe/Berlin';

        case 2:
            return 'Europe/Athens';

        case 3:
            return 'Europe/Moscow';

        case 4:
            return 'Asia/Dubai';

        case 5:
            return 'Asia/Karachi';

        case 6:
            return 'Asia/Dhaka';

        case 7:
            return 'Asia/Bangkok';

        case 8:
            return 'Asia/Shanghai';

        case 9:
            return 'Asia/Tokyo';

        case 10:
            return 'Australia/Sydney';

        case 11:
            return 'Pacific/Guadalcanal';

        case 12:
            return 'Pacific/Auckland';

        case 13:
            return 'Pacific/Tongatapu';

        case 14:
            return 'Pacific/Kiritimati';

        default:
            throw new InvalidArgumentException("UTC offset inválido: {$utcOffset}");
    }
  }
}
