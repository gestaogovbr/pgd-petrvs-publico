<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\Feriado;
use App\Services\ServiceBase;
use DateTime;
use DateTimeZone;

class TimeInterval
{
 public $start;
 public $end;
}

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
            str_pad($feriado->mes, 2, "0", STR_PAD_LEFT) . "-" .
            str_pad($feriado->dia, 2, "0", STR_PAD_LEFT);
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
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 48,  $pascoaAno)), //2ºfeira Carnaval
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 47,  $pascoaAno)), //3ºfeira Carnaval
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia - 2 ,  $pascoaAno)), //6ºfeira Santa
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia     ,  $pascoaAno)), //Pascoa
                date("Y-m-d", mktime(0, 0, 0, $pascoaMes, $pascoaDia + 60,  $pascoaAno))  //Corpus Christi
            );
        }
        return $feriados;
    }

    public function isFeriadoCadastrado($timestamp, $listaFeriados) {
        return array_search(date("Y-m-d", $timestamp), $listaFeriados) !== false;
    }

    public static function horarioServidor() {
        $timezone_abbr = timezone_name_from_abbr("", -3600*abs(config('petrvs')["timezone"]), 0);
        $dateTime = new DateTime('now', new DateTimeZone($timezone_abbr));
        $dateTime->setTimestamp($dateTime->getTimestamp());
        return ServiceBase::toIso8601($dateTime);
    }

    public static function getTimestamp($date) {
        return UtilService::asTimestemp($date);
        //return gettype($date) == "integer" ? $date : ($date instanceof DateTime ? $date->getTimestamp() : strtotime($date));
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







    /**
     * expediente
     *
     * @param  mixed $unidade: parâmetro opcional
     * @param  mixed $inicio: parâmetro opcional
     * @return: retorna a duração do expediente em horas. Se a $unidade não for informada, retorna 24.
     */
    public function expediente(Unidade $unidade = null, DateTime $inicio = null) {
        /* Retorna (horario_trabalho_fim - (inicio ou horario_trabalho_inicio) - horario_trabalho_intervalo) ou 24 caso não tenha unidade */
        return is_null($unidade) ? 24 : max($this->getStrTimeHours($unidade->horario_trabalho_fim) -
          ($inicio ? $this->getTimeHours($inicio) : $this->getStrTimeHours($unidade->horario_trabalho_inicio)) -
          $this->getStrTimeHours($unidade->horario_trabalho_intervalo ?? "00:00"), 0);
    }

    /**
     * getStrTimeHours
     *
     * @param  mixed $time: tempo em formato de string ("hh:mm:ss", "hh:mm", "hh")
     * @return: retorna um número que representa sua conversão em horas
     */
    public function getStrTimeHours(string $time) {
        $aTime = array_map(fn($x) => intval($x), explode(":", $time));
        return $aTime[0] + (($aTime[1] ?? 0) / 60) + (($aTime[2] ?? 0) / (60*60));
    }

    /**
     * getTimeHours
     *
     * @param  mixed $dateTime: uma Data ou um número. Caso seja numérico deverá representar um intervalo em milisegundos.
     * @return: retorna um número que equivale à sua conversão em horas.
     */
    public function getTimeHours(DateTime | float $dateTime) {
        return $dateTime instanceof DateTime ? $this->getStrTimeHours($dateTime->format('H:i:s')) : $dateTime / 3600000;
    }

    /**
     * daystamp
     *
     * @param  mixed $dateRef: parâmetro obrigatório. Representa uma data.
     * @return: retorna um número que representa a conversão da data recebida em quantidade de dias
     */
    public function daystamp(DateTime $dateRef) {
        //$userTimezoneOffset = $dateRef->getTimezoneOffset() * 60000;
        return floor(($dateRef->getTimestamp()) / (60 * 60 * 24));
    }

    public function intersection(array $intervals) {
        $isDate = ($intervals[0])->start instanceof DateTime;
        $result = undefined;
        if(count($intervals) > 1) {
          $result = $this->asTimeInterval($intervals[0]);
          for($i = 1; $i < count($intervals) && $result; $i++) {
            $compare = $this->asTimeInterval($intervals[i]);
            if ($result->end >= $compare->start && $result->start <= $compare->end) {
                //$result = {'start' => max($result->start, $compare->start), 'end' => min($result->end, $compare->end);}
            } else {
                $result = undefined;
            }
          }
        }
        return $result && $isDate ? this.asDateInterval(result) : result;
    }

    /*        Função responsável por todos os cálculos de períodos no sistema.
        Obs.: As variáveis que armazenam tempo/data são iniciadas com as respectivas letras:
        - d: Data, do tipo Date do javascript
        - h: Tempo em formato de horas, de forma numérica, por exempo 01h30 será igual a 1.5
        - t: Tempo em formado de milesegundos (getTime() do javascript)
        - u: Unidade de dia, é um formato semelhante ao timestemp, porem contado em dias

        @param Date          inicio       Data e hora de inicio
        @param Date|number   fimOuTempo   Se a intenção for calcular a dataFim então será passado o tempo,
            caso passe uma dataFim será calculado o tempo. O tempo é calculado da seguinte form:
            1) Se forma for DIAS, então será sempre um mútiplo de cargaHoraria (dias = fimOuTempo / cargaHoraria)
            2) Se forma for HORAS, será as horas em forma decimal
        @param number        cargaHoraria Carga horária que sserá considerada para os cálculos
        @param Unidade       unidade      Unidade com as configurações necessárias
        @param TipoContagem  tipo         Se será utilizado a forma de cálculo da distribuição ou da entrega (pego na unidade)
        @param DemandaPausa? pausas       Lista das pausas, quando aplicável
        @param Afastamento?  afastamentos Lista dos afastamento a partir da data Inicio para o usuario, quando aplicável
        @return Efemerides Retorna todas as informações do cálculo com as horas ou a data fim calculados
  */
    public function calculaDataTempo(DateTime $inicio, $fimOuTempo, $cargaHoraria, Unidade $unidade, $tipo, array $pausas = null, array $afastamentos = null) {
        $formaDistribuicao = $unidade->distribuicao_forma_contagem_prazos;
        $formaEntrega = $unidade->entrega_forma_contagem_prazos;
        $forma = $tipo == "DISTRIBUICAO" ? $formaDistribuicao : $formaEntrega;
        $useCorridos = $forma == "DIAS_CORRIDOS" || $forma == "HORAS_CORRIDAS";
        $useDias = $forma == "DIAS_CORRIDOS" || $forma == "DIAS_UTEIS";
        $useTempo = is_int($fimOuTempo) || is_float($fimOuTempo); /* Se o parametro fimOuTempo é DataFim ou Horas/Dias */
        $uDiasInicio = $this->daystamp($inicio); /* Dia inicio (usado somente se !useTempo) */
        $uDiasFim = $useTempo ? $uDiasInicio : $this->daystamp((object) $fimOuTempo); /* Dia fim (usado somente se !useTempo) */
        $hExpediente = $this->expediente($unidade); /* em horas */

        /* Calcula as horas de afastamento */
        $horasAfastamento = function($start, $end) use ($afastamentos) {
            $periodos = [];
            foreach($afastamentos as $afastamento) {
                /* calcula a intersecção entre start e end e o inicio e fim do afastamento */
                //$intervalo = $this->intersection([{$start, $end}, {$start: afastamento.inicio_afastamento.getTime(), $end: afastamento.fim_afastamento.getTime()}]) as TimeInterval;
                if($intervalo) {
                    /* Caso tenha uma intersecção, adiciona o período para retorno e insere em result.afastamentos */
                    $periodos.push($intervalo);
                    if(!result.afastamentos.includes(afastamento)) result.afastamentos.push(afastamento);
                };
            };
            return periodos;
        };

        /* Calcula as horas pausadas */
        /*     const horasPausas = (start: number, end: number): TimeInterval[] => {
      let periodos: TimeInterval[] = [];
      for(let pausa of (pausas || [])) {
        const intervalo = this.util.intersection([{start, end}, {start: pausa.data_inicio.getTime(), end: pausa.data_fim?.getTime() || end}]) as TimeInterval;
        if(intervalo) {
          periodos.push(intervalo);
          if(!result.pausas.includes(pausa)) result.pausas.push(pausa);
        }
      }
      return periodos;
        } */
        /* Calcula a união entre afastamentos e pausas */
        /*     const horasAfastamentoPausa = (start: number, end: number): TimeInterval[] => {
      const hAfastamentos = horasAfastamento(start, end);
      const hPausas = horasPausas(start, end);
      return this.util.union([...hAfastamentos, ...hPausas]) as TimeInterval[];
        }
        let hTempo = useTempo ? fimOuTempo as number : 0; */ /* variável saldo de horas/dias (usado somente se useTempo) */
        /*   let dDiaAtual = new Date(inicio.getTime()); /* Variável que irá percorrer todas as datas (do inicio ao fim ou a quantidade de horas) */
        /*    let result: Efemerides = { /* Variável que irá retonar todas as informações calculadas */
        /*     resultado: useTempo ? "DATA" : "TEMPO",
      dias_corridos: 0,
      inicio: inicio,
      fim: !useTempo ? fimOuTempo as Date: new Date(inicio.getTime()),
      tempoUtil: useTempo ? fimOuTempo as number : 0,
      tipo: tipo,
      formaDistribuicao: formaDistribuicao,
      formaEntrega: formaEntrega,
      horasAfastamentosPausas: 0,
      unidade_id: unidade.id,
      cargaHoraria: cargaHoraria || 24,
      expediente: hExpediente,
      afastamentos: [],
      pausas: [],
      finsSemana: {},
      feriados: {}
        }; */

        /*   cargaHoraria = result.cargaHoraria; /* Garante que se a carga horária vier zerado, será considerado 24hrs */
        /*    while(useTempo ? this.util.round(hTempo, 2) > 0 : this.util.daystamp(dDiaAtual) <= uDiasFim) {
      const firstDay = this.util.daystamp(dDiaAtual) == uDiasInicio;
      const lastDay = this.util.daystamp(dDiaAtual) == uDiasFim; */
        /*     const strDiaAtual = moment(dDiaAtual).format("YYYY-MM-DD"); /* Usado somente para indexar os vetores com a data do feriado/fds */
      /* Se for dias corridos ou horas corridas não é necessário calcular Feriados e nem Fins de Semana */
        /*      const feriadoCadastrado = useCorridos ? undefined : this.isFeriadoCadastrado(dDiaAtual, unidade);
      const feriadoReligioso = useCorridos ? undefined : this.isFeriadoReligioso(dDiaAtual);
      const fimSemana = useCorridos ? undefined : this.isFinalSemana(dDiaAtual);
      const diaUtil = !feriadoCadastrado && !feriadoReligioso && !fimSemana;
      if(!useCorridos) { */
        /*      if(feriadoCadastrado) result.feriados[strDiaAtual] = feriadoCadastrado; /* Se feriado cadastrado, adiciona ao resultado */
        /*    if(feriadoReligioso) result.feriados[strDiaAtual] = feriadoReligioso; /* Se feriado religioso, adiciona ao resultado */
      /*  if(fimSemana) result.finsSemana[strDiaAtual] = fimSemana; /* Se final de semana, adiciona ao resultado */
        /*     }
      /* Calculo em dias */
        /*      if (useDias) {
        const tInicioDia = this.util.setStrTime(dDiaAtual, unidade.horario_trabalho_inicio).getTime();
        const tFimDia = this.util.setStrTime(dDiaAtual, unidade.horario_trabalho_fim).getTime(); */
        //      const intersticio = horasAfastamentoPausa(tInicioDia, tFimDia); /* Calula perído de afastamento e/ou pausa no dia atual */
        //    result.horasAfastamentosPausas += intersticio.length ? cargaHoraria : 0; /* Se tiver afastamento e/ou pausa no dia atual, considera o tempo do dia inteiro */
        /* Se houver algum afastamento ou pausa durante o horário de expediente, o dia tambem não será contado */
        //(lastDay || !firstDay) para considerar o proximo dia util
        //        if (!intersticio.length && (useCorridos || diaUtil)) {
        //        if(useTempo) { /* se for pra calcular a data fim, como é dia, será sempre a data na hora final do expediente, mas não importa, porque o que contará é somente o data sem hora */
        //        hTempo -= cargaHoraria;
      //      result.fim = new Date(tFimDia);
        //  } else { /* se for pra calcular o tempoUtil (lembrando que a quantidade de dias é tempoUtil / cargaHoraria) */
          //  result.tempoUtil += cargaHoraria;
     //     }
        //        }
        //    } else { /* calcula em horas */
        //     if(useCorridos || diaUtil) {
        //         const hIntervalo = this.util.getStrTimeHours(unidade.horario_trabalho_intervalo || "00:00");
        //       const hUteisDia = Math.min(cargaHoraria, hExpediente, useTempo ? hTempo : hExpediente); /* Horas úteis diárias, tempo útil máximo para um dia é o menor entre eles */
     //     const dInicioDia = firstDay ? inicio : this.util.setStrTime(dDiaAtual, useCorridos ? "00:00" : unidade.horario_trabalho_inicio); /* Inicio do expediente */
       //   const dFimDia = lastDay && !useTempo ? fimOuTempo as Date : this.util.minDate(this.util.addTimeHours(dInicioDia, hUteisDia + hIntervalo), this.util.setStrTime(dInicioDia, unidade.horario_trabalho_fim))!; /* fim do expediente */
        //          const intersticio = horasAfastamentoPausa(dInicioDia.getTime(), dFimDia.getTime()); /* Calula perído de afastamento e/ou pausa no dia atual */
        //        const hUteis = Math.min(hUteisDia, this.util.getHoursBetween(dInicioDia, dFimDia)); /* Horas úteis aproveitáveis para os cálculos (considerando o inicio e fim da atividade) */
        //      const hAfastamentoPausa = Math.min(hUteis, this.util.getTimeHours(intersticio.reduce((a, v) => a + (v.end - v.start), 0))); /* Afastamento e/ou pausas no dia, em horas */
      //    const hSaldo = hUteis - hAfastamentoPausa; /* Calcula quantas horas realmente podem ser aproveitadas (sem afastamentos ou pausas) */
        //          result.horasAfastamentosPausas += hAfastamentoPausa;
        //        if(hSaldo) {
        //        if(useTempo) { /* calcula a data fim */
      //        hTempo -= hSaldo;
        //      result.fim = dFimDia;
        //            } else { /* calcula o tempoUtil */
        //            result.tempoUtil += hSaldo;
        //        }
      //    }
        //        }
        //    }
        //  dDiaAtual.setDate(dDiaAtual.getDate() + 1);
        //      result.dias_corridos++;
        //  }
        return result;
    }

    /* Calcula as horas de afastamento - FUNÇÃO EM DESENVOLVIMENTO */
    public function calculaHorasAfastamento(number $start, number $end, array $afastamentos){
      $periodos = [];
      foreach($afastamentos as $afastamento) {
        /* calcula a intersecção entre start e end e o inicio e fim do afastamento */
        //$intervalo = UtilService::intersection([{start, end}, {start: afastamento.inicio_afastamento.getTime(), end: afastamento.fim_afastamento.getTime()}]) as TimeInterval;
        if($intervalo) {
          /* Caso tenha uma intersecção, adiciona o período para retorno e insere em result.afastamentos */
          array_push($periodos, $intervalo);
          if(!result.afastamentos.includes(afastamento)) result.afastamentos.push(afastamento);
        }
      }
      return $periodos;
    }


}
