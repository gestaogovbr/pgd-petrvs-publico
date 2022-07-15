<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\Feriado;
use App\Services\ServiceBase;
use DateTime;

class CalendarioService
{
    public const DIA_EM_SEGUNDOS = 86400;
    public $feriadosCadastrados = [];
    public $feriadosReligiosos = [];
    public $util;

    public function feriadosCadastrados($unidade_id) {
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
                str_pad($feriado->dia, 2, "0", STR_PAD_LEFT) . "-" .
                str_pad($feriado->mes, 2, "0", STR_PAD_LEFT);
            $result[$data] = $feriado->nome;
        }
        return $result;
    }

    public function isFimSemana($timestamp) {
        return date("N", $timestamp) > 5;
    }

    public function isFeriadoSanto($timestamp, $listaFeriados) {
        return array_search(date("Y-m-d", $timestamp), $listaFeriados) !== false;
    }

    public function listaFeriadosReligiosos($inicio, $fim) {
        $feriados = [];
        for($ano = intval(date('Y', $inicio)), $anoFim = intval(date('Y', $fim)); $ano <= $anoFim; $ano++) {
            $pascoa = easter_date($ano);
            $pascoaDia = date('j', $pascoa);
            $pascoaMes = date('n', $pascoa);
            $pascoaAno = date('Y', $pascoa);
            array_push($feriados,
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 48,  $pascoaAno)), //2ºferia Carnaval
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 47,  $pascoaAno)), //3ºferia Carnaval
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 2 ,  $pascoaAno)), //6ºfeira Santa
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia     ,  $pascoaAno)), //Pascoa
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia + 60,  $pascoaAno))  //Corpus Cirist
            );
        }
        return $feriados;
    }

    public function isFeriadoCadastrado($timestamp, $listaFeriados) {
        return array_search(date("Y-m-d", $timestamp), $listaFeriados) !== false;
    }

    public static function horarioServidor() {
        $dateTime = new DateTime();
        $dateTime->setTimestamp($dateTime->getTimestamp() + (60 * 60 * (config('petrvs')["timezone"]+3)));
        return ServiceBase::toIso8601($dateTime);
    }

    public static function getTimestamp($date) {
        return UtilService::asTimestemp($date);
        //return gettype($date) == "integer" ? $date : ($date instanceof DateTime ? $date->getTimestamp() : strtotime($date));
    }

    public static function between($date, $start, $end) {
        $date = CalendarioService::getTimestamp($date); //gettype($date) == "integer" ? $date : ($date instanceof DateTime ? $date->getTimestamp() : strtotime($date));
        $start = CalendarioService::getTimestamp($start); //gettype($start) == "integer" ? $start : ($start instanceof DateTime ? $start->getTimestamp() : strtotime($start));
        $end = CalendarioService::getTimestamp($end); //gettype($end) == "integer" ? $end : ($end instanceof DateTime ? $end->getTimestamp() : strtotime($end));
        return $date >= $start && $date <= $end;
    }

    /* Este método retorna a diferença entre duas datas, em horas, considerando os dois parâmetros como timestamps. */
    public function horasEntreDatas($inicio, $fim) {
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
        while($unidade && $horas > 0) {
            if($ano != date('Y', $diaAtual)) {
                $ano = date('Y', $diaAtual);
                $inicio = $ano == date('Y', $dataInicio) ? $dataInicio : mktime(0, 0, 0, 1, 1, $ano);
                $fim = mktime(0, 0, 0, 31, 12, $ano);
                $listaFeriados = $this->listaFeriadosCadastrados($inicio, $fim, $unidade);
                $listaFeriadosReligiosos = $this->listaFeriadosReligiosos($inicio, $fim, $unidade);
            }
            $diaUtil = !$this->isFeriadoSanto($diaAtual, $listaFeriadosReligiosos) && !$this->isFeriadoCadastrado($diaAtual, $listaFeriados) && !$this->isFimSemana($inicio);
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
                if(!$this->isFeriadoSanto($inicio, $listaFeriadosReligiosos) && !$this->isFeriadoCadastrado($inicio, $listaFeriados) && !$this->isFimSemana($inicio)) {
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

}
