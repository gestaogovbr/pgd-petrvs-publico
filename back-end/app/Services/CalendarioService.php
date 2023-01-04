<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\Feriado;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;
use DateTime;
use \Moment\Moment;

class Interval
{
 public $start;
 public $end;
}

class Turno
{

}

class Expediente 
{
    public $domingo;
    public $segunda = [];
    public $terca = [];
    public $quarta = [];
    public $quinta = [];
    public $sexta = [];
    public $sabado = [];
    public $especial = [];

    function __construct($value = null) {
        if($value) {
            $valor = (array) $value;
            if($valor['domingo']) $this->domingo = $valor['domingo']; 
            if($valor['segunda']) $this->segunda = $valor['segunda']; 
            if($valor['terca']) $this->terca = $valor['terca']; 
            if($valor['quarta']) $this->quarta = $valor['quarta']; 
            if($valor['quinta']) $this->quinta = $valor['quinta']; 
            if($valor['sexta']) $this->sexta = $valor['sexta']; 
            if($valor['sabado']) $this->sabado = $valor['sabado']; 
            if($valor['especial']) $this->especial = $valor['especial']; 
        }
    }
}

class Efemerides
{ 
    public $resultado;                              
    public $dias_corridos = 0; 
    public $inicio;
    public $fim;
    public $tempoUtil;                              
    public $tipo;                                   
    public $formaDistribuicao;                      
    public $formaEntrega;                           
    public $horasAfastamentosPausas = 0;
    public $unidade_id;                             
    public $cargaHoraria;                           
    public $expediente;                             
    public $afastamentos = [];
    public $pausas = [];
    public $finsSemana;                             
    public $feriados;                               
    public $horario_trabalho_inicio;                
    public $horario_trabalho_fim;                   
    public $horario_trabalho_intervalo;             
}

class CalendarioService
{
    const DIA_EM_SEGUNDOS = 86400;
    public $feriadosCadastrados = [];
    public $feriadosReligiosos = [];
    public $util;

    public static function feriadosCadastrados($unidade_id) {
        $unidade = Unidade::find($unidade_id);
        $feriados = Feriado::whereRaw(
            "(entidade_id IS NULL OR entidade_id = :entidade_id) AND ("
                ."(abrangencia = 'NACIONAL') OR"
                ."(abrangencia = 'ESTADUAL' && uf = :uf) OR"
                ."(abrangencia = 'MUNICIPAL' && cidade_id = :cidade_id)"
            .")", [
                ":entidade_id" => $unidade->entidade_id,
                ":uf" => $unidade->cidade->uf,
                ":cidade_id" => $unidade->cidade_id
            ])->get();
        $result = [];
        foreach($feriados as $feriado) {
            $data = ($feriado->recorrent ? "" : str_pad($feriado->ano, 4, "0", STR_PAD_LEFT)) . "-" .
            str_pad($feriado->mes, 2, "0", STR_PAD_LEFT) . "-" .
            str_pad($feriado->dia, 2, "0", STR_PAD_LEFT);
            $result[$data] = $feriado->nome;
        }
        return $result;
    }

    public static function isFinalSemana($timestamp) {
        return date("N", $timestamp) > 5;
    }

    public static function isFeriadoReligioso($timestamp) {
        return array_search(date("Y-m-d", $timestamp), static::listaFeriadosReligiosos($timestamp,$timestamp)) !== false;
    }

    public static function easter(int $ano = null) {
        $year = $ano || getdate()['year'];
        $G = $year % 19; 
        $C = floor($year / 100); 
        $H = ($C - floor($C / 4) - floor((8 * $C + 13) / 25) + 19 * $G + 15) % 30;
        $I = $H - floor($H / 28) * (1 - floor(29 / ($H + 1)) * floor((21 - $G) / 11)); 
        $J = ($year + floor($year / 4) + $I + 2 - $C + floor($C / 4)) % 7;
        $L = $I - $J;
        $month = 3 + floor(($L + 40) / 44);
        $day = $L + 28 - 31 * floor($month / 4);
        return new DateTime($year."-".$month."-".$day." 00:00:00");
    }

    public static function listaFeriadosReligiosos(int $inicio, int $fim) {
        $feriados = [];
        for($ano = intval(date('Y', $inicio)), $anoFim = intval(date('Y', $fim)); $ano <= $anoFim; $ano++) {
            $pascoa = static::easter($ano);
            $pascoaDia = date('j', UtilService::asTimestamp($pascoa));
            $pascoaMes = date('n', UtilService::asTimestamp($pascoa));
            $pascoaAno = date('Y', UtilService::asTimestamp($pascoa));
            array_push($feriados,
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 48,  $pascoaAno)), //2ºfeira Carnaval
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 47,  $pascoaAno)), //3ºfeira Carnaval
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 2 ,  $pascoaAno)), //6ºfeira Santa
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia     ,  $pascoaAno)), //Pascoa
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia + 60,  $pascoaAno))  //Corpus Christi
            );
        }
        return $feriados;
    }

    public static function isFeriadoCadastrado($timestamp, $listaFeriados) {
        return array_search(date("Y-m-d", $timestamp), $listaFeriados) !== false;
    }

    public static function horarioServidor() {
        $dateTime = new DateTime();
        $dateTime->setTimestamp($dateTime->getTimestamp() + (60 * 60 * (config('petrvs')["timezone"]+3)));
        return ServiceBase::toIso8601($dateTime); //retorna a data no formato "Y-m-d\TH:i:s"
    }

    public static function getTimestamp($date) {
        return UtilService::asTimestamp($date);
    }

    public static function between($date, $start, $end): bool {
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
    public function horasEntreDatas($inicio, $fim): int {
        try {
            $r = $inicio->diff($fim);

            $horas = $r->y*8760 + $r->m*720 + $r->d*24 + $r->h;
        } catch (Throwable $e) { throw $e; }
        return $horas;
    }

    public function listaFeriadosCadastrados($inicio, $fim, $unidade) {
        $feriados = Feriado::whereRaw(
            "(entidade_id IS NULL OR entidade_id = :entidade_id) AND ("
                ."(abrangencia = 'NACIONAL') OR"
                ."(abrangencia = 'ESTADUAL' && uf = :uf) OR"
                ."(abrangencia = 'MUNICIPAL' && cidade_id = :cidade_id)"
            .")", [
                ":entidade_id" => $unidade->entidade_id,
                ":uf" => $unidade->cidade->uf,
                ":cidade_id" => $unidade->cidade_id
            ])->get();
        $result = [];
        for($ano = intval(date('Y', $inicio)), $anoFim = intval(date('Y', $fim)); $ano <= $anoFim; $ano++) {
            foreach($feriados as $feriado) {
                $dataFeriado = mktime(0, 0, 0, $feriado->dia, $feriado->mes, $ano);
                if(($feriado->recorrent || $feriado->ano == $ano) && static::between($dataFeriado, $inicio, $fim)) {
                    array_push($result, date("Y-m-d", $dataFeriado));
                }
            }
        }
        return $result;
    }

    public function decimalToTimer($decimal) {
        $hours = floor($decimal);
        $min = round(($decimal - $hours) * 60);
        return mktime($hours, $min, 0, 0, 0, 0);
    }

    public function timerToDecimal($time) {
        $sec = $time % 60;
        $min = floor($time / 60);
        $hours = floor($min / 60);
        $min = $min % 60;
        return $hours + ($min / 60) + ($sec / (60*60));
    }

    public function prazo($inicio_data, $horas, $carga_horaria, $unidade_id){
        $unidade = Unidade::find($unidade_id);
        $dataInicio = $inicio_data instanceof DateTime ? $inicio_data->getTimestamp() : strtotime($inicio_data);
        $diaAtual = $dataInicio;
        $cargaHoraria = $this->decimalToTimer($carga_horaria);
        $result = "";
        $ano = "";
        $forma = $unidade->distribuicao_forma_contagem_prazos;
        $listaFeriados = [];
        $listaFeriadosReligiosos = [];
        while($unidade && $horas > 0) {
            if($ano != date('Y', $diaAtual)) {
                $ano = date('Y', $diaAtual);
                $inicio = $ano == date('Y', $dataInicio) ? $dataInicio : mktime(0, 0, 0, 1, 1, $ano);
                $fim = mktime(0, 0, 0, 31, 12, $ano);
                $listaFeriados = $this->listaFeriadosCadastrados($inicio, $fim, $unidade);
                $listaFeriadosReligiosos = $this->listaFeriadosReligiosos($inicio, $fim, $unidade);
            }
            $diaUtil = !static::isFeriadoReligioso($diaAtual, $listaFeriadosReligiosos) && static::isFeriadoCadastrado($diaAtual, $listaFeriados) && !static::isFinalSemana($inicio);
            /* calcula em dias */
            if($forma == "DIAS_CORRIDOS" || $forma == "DIAS_UTEIS") {
                /* Conta sempre a partir do próximo dia útil e encerra sempre com $unidade->horario_trabalho_fim */
                if($dataInicio != $diaAtual && ($forma == "DIAS_CORRIDOS" || $diaUtil)) {
                    $horas -= min($cargaHoraria, $horas);
                    $result = date('Y-m-d', $diaAtual) + "T" + $unidade->horario_trabalho_fim + ":00";
                }
            } else { /* calcula em horas */
                if($forma == "HORAS_CORRIDAS" || $diaUtil) {
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

    public function qtdDiasUteis($inicioData, $fimData, $unidade_id){
        $inicio = $inicioData instanceof DateTime ? $inicioData->getTimestamp() : strtotime($inicioData);
        $fim = $fimData instanceof DateTime ? $fimData->getTimestamp() : strtotime($fimData);
        $unidade = Unidade::find($unidade_id);
        if ($inicio < $fim && !empty($unidade)) {
            $listaFeriados = $this->listaFeriadosCadastrados($inicio, $fim, $unidade);
            $listaFeriadosReligiosos = $this->listaFeriadosReligiosos($inicio, $fim, $unidade);
            $diasUteis = 0;
            for (; $inicio <= $fim; $inicio += self::DIA_EM_SEGUNDOS) {
                if(!static::isFeriadoReligioso($inicio, $listaFeriadosReligiosos) && !static::isFeriadoCadastrado($inicio, $listaFeriados) && !static::isFinalSemana($inicio)) {
                    $diasUteis++;
                }
            };
            return $diasUteis;
        }
    }

    public function feriados($inicioData, $fimData, $unidade_id) {
        $inicio = $inicioData instanceof DateTime ? $inicioData->getTimestamp() : strtotime($inicioData);
        $fim = $fimData instanceof DateTime ? $fimData->getTimestamp() : strtotime($fimData);
        $unidade = Unidade::find($unidade_id);
        return [
            "religiosos" => $this->listaFeriadosReligiosos($inicio, $fim, $unidade),
            "cadastrados" => $this->listaFeriadosCadastrados($inicio, $fim, $unidade)
        ];
    }

    public function tempoAtraso($prazo_entrega, $referencia, $carga_horaria) {
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
    public static function expediente(Unidade $unidade = null, DateTime $inicio = null) {
        return is_null($unidade) ? 24 : max(UtilService::getStrTimeHours($unidade->horario_trabalho_fim) -
          ($inicio ? UtilService::getTimeHours($inicio) : UtilService::getStrTimeHours($unidade->horario_trabalho_inicio)) -
          UtilService::getStrTimeHours($unidade->horario_trabalho_intervalo ?? "00:00"), 0);
    }

    public static function preparaParametros(array $data): Efemerides {
        $inicio = UtilService::asDateTime($data['inicio']);
        $fimOuTempo = UtilService::onlyNumbers($data['fimOuTempo']) == $data['fimOuTempo'] ? intval($data['fimOuTempo']) : UtilService::asDateTime($data['fimOuTempo']) ;
        $cargaHoraria = intval($data['cargaHoraria']);
        $unidade = Unidade::find($data['unidade_id']);
        $tipo = $data['tipo'];
        $pausas = $data['pausas'];
        $afastamentos = $data['afastamentos'];
        return static::calculaDataTempo($inicio, $fimOuTempo, $cargaHoraria, $unidade, $tipo, $pausas, $afastamentos);
    }

    public function calculaDataTempoUnidade(DateTime $inicio, $fimOuTempo, int $cargaHoraria, Unidade $unidade, string $tipo, array $pausas = null, array $afastamentos = null) {
        $feriados = $this->feriadosCadastrados($unidade->id) || [];
        $forma = $tipo == 'DISTRIBUICAO' ? $unidade->distribuicao_forma_contagem_prazos : $unidade->entrega_forma_contagem_prazos;
        $expediente = $this->nestedExpediente($unidade);
        return $this->calculaDataTempo($inicio, $fimOuTempo, $forma, $cargaHoraria, $expediente, $feriados, $pausas, $afastamentos);
    }

    public function nestedExpediente(Unidade $unidade): Expediente {
        $expediente = $unidade->expediente || $unidade->entidade?->expediente;
        $expediente = $expediente || ($unidade->entidade_id == Auth::user()->unidade?->entidade_id ? Auth::user()->unidade->entidade->expediente : new Expediente());
        return $expediente;
    }

/*     public calculaDataTempo(inicio: Date, fimOuTempo: Date | number, forma: FormaContagem, cargaHoraria?: number, expediente?: Expediente, feriados?: FeriadoList, pausas?: DemandaPausa[], afastamentos?: Afastamento[]): Efemerides {
        const useCorridos = forma == "DIAS_CORRIDOS" || forma == "HORAS_CORRIDAS";
        const useDias = forma == "DIAS_CORRIDOS" || forma == "DIAS_UTEIS";
        const useTempo = typeof fimOuTempo == "number"; 
        const uDiasInicio = this.util.daystamp(inicio); 
        const uDiasFim = useTempo ? uDiasInicio : this.util.daystamp(fimOuTempo as Date); /* Dia fim (usado somente se !useTempo) 
        /* Verifica quando o expediente é obrigatório, e quando não for então expediente será undefined  
        if (!expediente && !useCorridos) throw new Error("Expediente não informado");
        expediente = useCorridos ? undefined : expediente; */

    /** CONSTRUINDO A NOVA FUNÇÃO EM PHP */
    public static function calculaDataTempo(DateTime $inicio, $fimOuTempo, string $forma, int $cargaHoraria = null, $expediente, array $feriados, array $pausas = null, array $afastamentos = null): Efemerides {
        $formaDistribuicao = $unidade->distribuicao_forma_contagem_prazos;
        $formaEntrega = $unidade->entrega_forma_contagem_prazos;
        $forma = $tipo == "DISTRIBUICAO" ? $formaDistribuicao : $formaEntrega;
        $useCorridos = $forma == "DIAS_CORRIDOS" || $forma == "HORAS_CORRIDAS";
        $useDias = $forma == "DIAS_CORRIDOS" || $forma == "DIAS_UTEIS";
        $useTempo = $fimOuTempo instanceof number; /* Se o parametro fimOuTempo é DataFim ou Horas/Dias */
        $uDiasInicio = UtilService::daystamp($inicio); /* Dia inicio (usado somente se !useTempo) */
        $uDiasFim = $useTempo ? $uDiasInicio : UtilService::daystamp(UtilService::asDateTime($fimOuTempo)); /* Dia fim (usado somente se !useTempo) */
        $hExpediente = static::expediente($unidade); /* em horas */

        $hTempo = $useTempo ? UtilService::asTimestamp($fimOuTempo) : 0; /* variável saldo de horas/dias (usado somente se useTempo) */
        $dDiaAtual = UtilService::asDateTime($inicio->getTimestamp()); /* Variável que irá percorrer todas as datas (do inicio ao fim ou a quantidade de horas) */
        $inicializaEfemerides = function () use($useTempo, $fimOuTempo, $inicio, $tipo, $formaDistribuicao, $formaEntrega, $unidade, $cargaHoraria, $hExpediente): Efemerides {
            $e = new Efemerides();
            $e->resultado = $useTempo ? "DATA" : "TEMPO";
            $e->inicio = UtilService::asDateTime($inicio->getTimestamp());
            $e->fim = !$useTempo ? UtilService::asDateTime($fimOuTempo->getTimestamp()) : UtilService::asDateTime($inicio->getTimestamp());
            $e->tempoUtil = $useTempo ? UtilService::asTimestamp($fimOuTempo) : 0;
            $e->tipo = $tipo;       // "DISTRIBUICAO" | "ENTREGA"
            $e->formaDistribuicao = $formaDistribuicao;
            $e->formaEntrega = $formaEntrega;
            $e->unidade_id = $unidade->id;
            $e->cargaHoraria = $cargaHoraria || 24;
            $e->expediente = $hExpediente;
            $e->finsSemana = new \stdClass();
            $e->feriados = new \stdClass();
            $e->horario_trabalho_inicio = $unidade->horario_trabalho_inicio;
            $e->horario_trabalho_fim = $unidade->horario_trabalho_fim;
            $e->horario_trabalho_intervalo = $unidade->horario_trabalho_intervalo;
            return $e;
        };
        $result = $inicializaEfemerides();
       
        /* Calcula as horas de afastamento */
        $horasAfastamentos = function (int $start, int $end) use ($result, $afastamentos): array {
            $periodos = [];
            foreach($afastamentos as $afastamento) {
                /* calcula a intersecção entre start e end e o inicio e fim do afastamento */
                $intervalo = UtilService::intersection([['start' => $start, 'end' => $end], ['start' => $afastamento->inicio_afastamento->getTimestamp(), 'end' => $afastamento->fim_afastamento->getTimestamp()]]);
                if($intervalo) {
                    /* Caso tenha uma intersecção, adiciona o período para retorno e insere em $result->afastamentos */
                    array_push($periodos, $intervalo);
                    if(!array_search($afastamento, $result->afastamentos)) {array_push($result->afastamentos, $afastamento);}
                }
            };
            return $periodos;
        };

        /* Calcula as horas pausadas */
        $horasPausas = function (int $start, int $end) use ($pausas): array {
            $periodos = [];
            foreach($pausas as $pausa) {
                $interval = UtilService::asTimeInterval(UtilService::intersection([
                        [$start, $end], 
                        [$start => $pausa['data_inicio']->getTimestamp(), $end => $pausa['data_fim'] ? $pausa['data_fim']->getTimestamp() : $end]
                    ]));
                if($interval) {
                    array_push($periodos, $interval);
                    if(!array_search($pausa, $result->pausas)) {array_push($result->pausas, $pausa);}
                }
            };
            return $periodos;
        };

        /* Calcula a união entre afastamentos e pausas */
        $horasAfastamentoPausa = function (int $start, int $end) use ($horasAfastamentos, $horasPausas): array {
            $hAfastamentos = $horasAfastamentos($start, $end);
            $hPausas = $horasPausas($start, $end);
            return UtilService::asTimeInterval(UtilService::intersectionsList([...$hAfastamentos, ...$hPausas]));
        };

        $cargaHoraria = $result->cargaHoraria; /* Garante que se a carga horária vier zerado, será considerado 24hrs */
        while($useTempo ? UtilService::round($hTempo, 2) > 0 : UtilService::daystamp($dDiaAtual) <= $uDiasFim) {
            $firstDay = UtilService::daystamp($dDiaAtual) == $uDiasInicio;
            $lastDay = UtilService::daystamp($dDiaAtual) == $uDiasFim;
            $strDiaAtual = (new Moment(UtilService::asTimestamp($dDiaAtual)))->format('Y-m-d'); /* Usado somente para indexar os vetores com a data do feriado/fds */
            /* Se for dias corridos ou horas corridas não é necessário calcular Feriados e nem Fins de Semana */
            $feriadoCadastrado = $useCorridos ? null : static::isFeriadoCadastrado(UtilService::asTimestamp($dDiaAtual), static::feriadosCadastrados($unidade->id));
            $feriadoReligioso = $useCorridos ? null : static::isFeriadoReligioso(UtilService::asTimestamp($dDiaAtual));
            $fimSemana = $useCorridos ? null : static::isFinalSemana(UtilService::asTimestamp($dDiaAtual));
            $diaUtil = !$feriadoCadastrado && !$feriadoReligioso && !$fimSemana;
            if(!$useCorridos) {
              if($feriadoCadastrado) $result->feriados['strDiaAtual'] = $feriadoCadastrado; /* Se feriado cadastrado, adiciona ao resultado */
              if($feriadoReligioso) $result->feriados['strDiaAtual'] = $feriadoReligioso; /* Se feriado religioso, adiciona ao resultado */
              if($fimSemana) $result->finsSemana['strDiaAtual'] = $fimSemana; /* Se final de semana, adiciona ao resultado */
            }
            /* Calculo em dias */
            if ($useDias) {
              $tInicioDia = UtilService::setStrTime($dDiaAtual, $unidade->horario_trabalho_inicio)->getTimestamp();
              $tFimDia = UtilService::setStrTime($dDiaAtual, $unidade->horario_trabalho_fim)->getTimestamp();
              $intersticio = $horasAfastamentoPausa($tInicioDia, $tFimDia); /* Calula perído de afastamento e/ou pausa no dia atual */
              $result->horasAfastamentosPausas += count($intersticio) ? $cargaHoraria : 0; /* Se tiver afastamento e/ou pausa no dia atual, considera o tempo do dia inteiro */
              /* Se houver algum afastamento ou pausa durante o horário de expediente, o dia tambem não será contado */
              //(lastDay || !firstDay) para considerar o proximo dia util
              if (!count($intersticio) && ($useCorridos || $diaUtil)) {
                if($useTempo) { /* se for pra calcular a data fim, como é dia, será sempre a data na hora final do expediente, mas não importa, porque o que contará é somente o data sem hora */
                  $hTempo -= $cargaHoraria;
                  $result->fim = new DateTime($tFimDia);
                } else { /* se for pra calcular o tempoUtil (lembrando que a quantidade de dias é tempoUtil / cargaHoraria) */
                  $result->tempoUtil += $cargaHoraria;
                }
              }
            } else { /* calcula em horas */
              if($useCorridos || $diaUtil) {
                $hIntervalo = UtilService::getStrTimeHours($unidade->horario_trabalho_intervalo || "00:00");
                $hUteisDia = $useCorridos ? 24 : min($cargaHoraria, $hExpediente, $useTempo ? $hTempo : $hExpediente); /* Horas úteis diárias, se for corrido é 24h, se não então será o menor entre eles */
                $dInicioDia = $firstDay ? $inicio : UtilService::setStrTime($dDiaAtual, $useCorridos ? "00:00" : $unidade->horario_trabalho_inicio); /* Inicio do expediente */
                $dFimDia = $lastDay && !$useTempo ? UtilService::asDateTime($fimOuTempo) : UtilService::minDate(UtilService::addTimeHours($dInicioDia, $hUteisDia + $hIntervalo), UtilService::setStrTime($dInicioDia, $useCorridos ? "24:00" : $unidade->horario_trabalho_fim)); //!; /* fim do expediente */
                $intersticio = $horasAfastamentoPausa($dInicioDia->getTimestamp(), $dFimDia->getTimestamp()); /* Calula perído de afastamento e/ou pausa no dia atual */
                $hUteis = min($hUteisDia, UtilService::getHoursBetween($dInicioDia, $dFimDia)); /* Horas úteis aproveitáveis para os cálculos (considerando o inicio e fim da atividade) */
                $hAfastamentoPausa = min($hUteis, UtilService::getTimeHours(array_reduce($intersticio, fn($a, $v) => $a + ($v['end'] - $v['start']), 0))); /* Afastamento e/ou pausas no dia, em horas */
                $hSaldo = $hUteis - $hAfastamentoPausa; /* Calcula quantas horas realmente podem ser aproveitadas (sem afastamentos ou pausas) */
                $result->horasAfastamentosPausas += $hAfastamentoPausa;
                if($hSaldo) {
                  if($useTempo) { /* calcula a data fim */
                    $hTempo -= $hSaldo;
                    $result->fim = $dFimDia;
                  } else { /* calcula o tempoUtil */
                    $result->tempoUtil += $hSaldo;
                  }
                }
              }
            }
            date_date_set($dDiaAtual, (int)getdate($dDiaAtual->getTimestamp())['year'], (int)getdate($dDiaAtual->getTimestamp())['mon'], (int)getdate($dDiaAtual->getTimestamp())['mday'] + 1);
            $result->dias_corridos++;
        }
        $result->inicio = UtilService::getDateTimeFormatted($result->inicio);
        $result->fim = UtilService::getDateTimeFormatted($result->fim);
        return $result;
    }
}        