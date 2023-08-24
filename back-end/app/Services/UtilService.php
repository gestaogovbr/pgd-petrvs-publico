<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Services\CalendarioService;
use Carbon\Carbon;
use \MomentPHP\MomentPHP;
use DateTime;
use PhpParser\Node\Stmt\Switch_;

class UtilService
{

    public static function emptyEntry($data, $key) {
        $arrayRef = gettype($data) == "object" ? (method_exists($data, "toArray") ? $data->toArray() : (array) $data) : $data;
        return empty($arrayRef) || !is_array($arrayRef) || !array_key_exists($key, $arrayRef) || empty($arrayRef[$key]);
    }

    public static function valueOrNull($data, $key) {
        $arrayRef = gettype($data) == "object" ? (method_exists($data, "toArray") ? $data->toArray() : (array) $data) : $data;
        return empty($arrayRef) || !is_array($arrayRef) || !array_key_exists($key, $arrayRef) ? null : $arrayRef[$key];
    }

    public static function getDateFormatted($dataHora) {
        return Carbon::parse($dataHora)->format("d/m/Y");
    }

    public function valueOrDefault($value, $default = "", $option = "") {
        
        // Trata númerações códigos siapes de uorgs com fins 
        // de evitar erro nas respectivas querys
        if(strtolower($option) == "uorg" && !is_null($value)){
            $value = strval(intval($value));
            return empty($value) || gettype($value) == "array" ? $default : $value;
        }

        // Retorna descrição de situação funcional baseado 
        // no código informado pelo web service
        if (strtolower($option) == "situacao_funcional" && !is_null($value)){
            $situacoes = array(
                "1"  => "ATIVO PERMANENTE",
                "2"  => "APOSENTADO",
                "3"  => "CEDIDO/REQUISITADO",
                "4"  => "NOMEADO CARGO COMIS.",
                "5"  => "SEM VÍNCULO",
                "6"  => "TABELISTA(ESP/EMERG)",
                "7"  => "NATUREZA ESPECIAL",
                "8"  => "ATIVO EM OUTRO ÓRGÃO",
                "9"  => "REDISTRIBUÍDO",
                "10" => "ATIVO TRANSITÓRIO",
                "11" => "EXCEDENTE À LOTAÇÃO",
                "12" => "CONTRATO TEMPORÁRIO",
                "13" => "EM DISPONIBILIDADE",
                "14" => "REQ.DE OUTROS ÓRGÃOS",
                "15" => "INSTITUIDOR PENSÃO",
                "16" => "REQ. MILITAR F. ARM",
                "17" => "APOSENTADO TCU733/94",
                "18" => "EXERC DESCENT CARREI",
                "19" => "EXERCÍCIO PROVISÓRIO",
                "20" => "CELETISTA",
                "21" => "ATIVO PERM L.8878/94",
                "22" => "ANISTIADO ADCT CF",
                "23" => "CELETISTA/EMPREGADO",
                "25" => "CLT ANS DEC JUDICIAL",
                "27" => "CLT ANS JUD. CEDIDO",
                "29" => "CLT-APOS.COMPLEMENTO",
                "30" => "CLT-APS.DEC.JUDICIAL",
                "31" => "INST.PS DEC JUD",
                "32" => "EMPREGO PÚBLICO",
                "33" => "REFORMA CBM / PM",
                "34" => "RESERVA CBM / PM",
                "35" => "REQUIS. MILITAR GDF",
                "36" => "ANIST.PUBLICO L10559",
                "37" => "ANIST.PRIVADO L10559",
                "38" => "ATIVO - DEC. JUDIC",
                "40" => "CONTRATO TEMPORÁRIO",
                "41" => "COLAB PCCTAE E MAGIS",
                "42" => "COLABORADOR ICT",
                "43" => "CLT ANS -DEC 6657/08",
                "44" => "EXERC. 7  ART93 8112",
                "45" => "CEDIDO SUS/LEI 8270",
                "46" => "INST.ANIST.PUBLICO",
                "47" => "INST.ANIST.PRIVADO",
                "48" => "CELETISTA DEC.JUDIC.",
                "49" => "CONTR.TEMPORARIO CLT",
                "50" => "EMPREGO PCC/EX-TERRI",
                "51" => "EXC. INDISCIPLINA",
                "52" => "CONT.PROF.SUBSTITUTO",
                "66" => "ESTAGIÁRIO",
                "70" => "ESTAGIÁRIO SIGEPE",
                "71" => "RESIDÊNCIA E PMM",
                "72" => "APOSENTADO TEMPORARI",
                "75" => "CEDIDO DF EST MUNIC.",
                "76" => "CONTRATO TEMPORÁRIO",
                "77" => "EXERC. DESCEN. CDT",
                "80" => "EXERC. LEI 13681/18",
                "84" => "PENSIONISTA",
                "93" => "BENEFICIÁRIO PENSÃO",
                "96" => "QE/MRE - CEDIDO",
                "97" => "QUADRO ESPEC.-QE/MRE",
            );
            $value = intval($value);
            array_key_exists($value, $situacoes) ? $value = $situacoes[$value] : $value = null;
            return empty($value) || gettype($value) == "array" ? $default : $value;
        }
        // Retorno conforme função original
        return empty($value) || gettype($value) == "array" ? $default : $value;
    }

    public function object2array($object, $k = 1) {
        return @json_decode(@json_encode($object),$k);
    }

    public static function arrayToObject($array) {
        foreach($array as $key => $value) {
          if(is_array($value)) $array[$key] = static::arrayToObject($value);
        }
        return (object) $array;
    }

    public static function getTimeFormatted($dataHora) {
        return Carbon::parse($dataHora)->format("H:i");
    }

    public static function getDateTimeFormatted($dataHora, $separator = " ") {
        return static::getDateFormatted($dataHora) . $separator . static::getTimeFormatted($dataHora);
    }

    public static function decimalToTimer($decimal) {
        $hours = floor($decimal);
        $min = round(($decimal - $hours) * 60);
        return mktime($hours, $min, 0, 0, 0, 0);
    }

    public static function timerToDecimal($time) {
        $sec = $time % 60;
        $min = floor($time / 60);
        $hours = floor($min / 60);
        $min = $min % 60;
        return $hours + ($min / 60) + ($sec / (60*60));
    }

    /**
     * A função devolve um int, que será o Timestamp, se receber uma data em qualquer um dos seguintes formatos: DateTime, Timestamp, string.
     * Se o formato recebido for inválido, retorna -1.
     */
    public static function asTimestamp($date): int | null {
        $result = gettype($date) == "integer" ? $date : ($date instanceof DateTime ? $date->getTimestamp() : (gettype($date) == "string" ? (strtotime($date) ? strtotime($date) : null) : null));
        return $result;
    }

    /**
     * A função devolve um DateTime, se receber uma data em qualquer um dos seguintes formatos: DateTime, Timestamp, string;
     */
    public static function asDateTime(DateTime | int | string $date): DateTime {
        return $date instanceof DateTime ? $date : (gettype($date) == "integer" ? new DateTime(date(ServiceBase::ISO8601_FORMAT,$date)) : (gettype($date) == "string" ? new DateTime($date) : $date));
    }

    public static function between($middle, $start, $end) {
        if(empty($middle) || empty($start) || empty($end)) return false;
        $check = static::asTimestamp($middle);
        return (static::asTimestamp($start) <= $check) && ($check <= static::asTimestamp($end));
    }

    public static function lessThanOrIqual($first, $secound) {
        if(empty($fisrt) || empty($secound)) return false;
        return static::asTimestamp($first) <= static::asTimestamp($secound);
    }

    public static function greaterThanOrIqual($first, $secound) {
        if(empty($fisrt) || empty($secound)) return false;
        return static::asTimestamp($first) >= static::asTimestamp($secound);
    }

    public static function intersect($startA, $endA, $startB, $endB) {
        if(empty($startA) || empty($endA) || empty($startB) || empty($endB)) return false;
        return static::asTimestamp($startA) <= static::asTimestamp($endB) && static::asTimestamp($endA) >= static::asTimestamp($startB);
    }

    public static function minDate(...$dates) {
        return array_reduce($dates, function ($carry, $item) {
            return !empty($item) && (empty($carry) || static::asTimestamp($carry) > static::asTimestamp($item)) ? $item : $carry;
        }, null);
    }

    public static function maxDate(...$dates) {
        return array_reduce($dates, function ($carry, $item) {
            return !empty($item) && (empty($carry) || static::asTimestamp($carry) < static::asTimestamp($item)) ? $item : $carry;
        }, null);
    }

    public static function avg($array) {
        $sum = 0;
        foreach ($array as $value) $sum += $value; 
        return $sum / count($array);
    }

    public static function removeAcentos($source) {
        $comAcentos = ["/(À|Á|Â|Ã|Ä|Å|Æ)/", "/(È|É|Ê|Ë)/", "/(Ì|Í|Î|Ï)/", "/Ð/", "/(Ò|Ó|Ô|Õ|Ö|Ø)/", "/(Ù|Ú|Û|Ü)/", "/Ŕ/", "/Þ/", "/ß/", "/(à|á|â|ã|ä|å|æ)/", "/Ç/", "/ç/", "/(è|é|ê|ë)/", "/(ì|í|î|ï)/", "/ñ/", "/Ñ/", "/(ò|ó|ô|õ|ö|ø|ð)/", "/(ù|ú|û|ü)/", "/Ý/", "/(ý|ÿ)/", "/þ/", "/ŕ/"];
        $semAcentos = ["A"                , "E"          , "I"          , "D"  , "O"              , "U"          , "R"  , "s"  , "B"  , "a"                , "C"  , "c"  , "e"          , "i"          , "n"  , "N"  , "o"                , "u"          , "Y"  , "y"      , "b"  , "r"];
        return preg_replace($comAcentos, $semAcentos, $source);
    }

    public static function onlyNumbers($string) {
        return preg_replace('/\D/', '', $string);
    }

    public static function inicialMaiuscula($termo){
        return strtoupper($termo[0]).substr($termo,1);
    }

    public static function uuid($text = "") {
        $hash = empty($text) ? substr(bin2hex(random_bytes(20)), 0, 32) : md5($text);
        return substr($hash, 0, 8) . "-" . substr($hash, 8, 4) . "-" . substr($hash, 12, 4) . "-" . substr($hash, 16, 4) . "-" . substr($hash, 20, 12);
    }
 
    // ***************

        /**
     * getStrTimeHours
     *
     * @param  mixed $time: tempo em formato de string ("hh:mm:ss", "hh:mm", "hh")
     * @return: retorna um número que representa sua conversão em horas
     */
    public static function getStrTimeHours(string $time) {
        $aTime = array_map(fn($x) => intval($x), explode(":", $time));
        return $aTime[0] + (($aTime[1] ?? 0) / 60) + (($aTime[2] ?? 0) / (60*60));
    }

    /**
     * getTimeHours
     *
     * @param  mixed $dateTime: um DateTime ou um number. Caso seja numérico, deverá representar uma data em milissegundos.
     * @return: retorna um número que equivale à sua conversão em horas.
     */
    public static function getTimeHours($dateTime) {
        return $dateTime instanceof DateTime ? static::getStrTimeHours($dateTime->format('H:i:s')) : $dateTime / 3600000;
    }

    /**
     * setStrTime
     *
     * @param  $dateRef: um DateTime.
     * @param  $time: uma string representando um tempo (hh:mm:ss) 
     * @return: retorna um DateTime
     */
    public static function setStrTime(DateTime $dateRef, string $time): DateTime {
        $aTime = array_map(fn($x) => intval($x), explode(":", $time));
        return static::setTime($dateRef, $aTime[0] ?? 0, $aTime[1] ?? 0, $aTime[2] ?? 0);
    }


    public static function addTimeHours(DateTime $dateRef, int | float $hours): DateTime {
        $result = static::asDateTime($dateRef->getTimestamp());
        return date_timestamp_set($result, $result->getTimestamp() + ($hours * 60 * 60));
    }

    /**
     * setTime
     *
     * @param  $dateRef: um DateTime.
     * @param  $hour: um inteiro representando as horas
     * @param  $min: um inteiro representando os minutos
     * @param  $seg: um inteiro representando os segundos 
     * @return: retorna um DateTime
     */
    public static function setTime(DateTime $dateRef, int $hour, int $min, int $sec): DateTime {
        $result = new DateTime(date(ServiceBase::ISO8601_FORMAT, $dateRef->getTimeStamp()));
        return date_time_set($result, $hour, $min, $sec);
    }

    public static function getHoursBetween(DateTime $dateStart, DateTime $dateEnd): float {
        $timestamp = $dateEnd->getTimestamp() - $dateStart->getTimestamp();
        $timer = static::secondsToTimer($timestamp);
        return $timer['hours'] + ($timer['minutes'] / 60) + ($timer['secounds'] / (60*60));
    }

    public static function secondsToTimer(int $seconds) {
        return [
          'hours' => (int)floor($seconds / 3600),
          'minutes' => (int)floor($seconds % 3600 / 60),
          'secounds' => (int)floor($seconds % 3600 % 60)
        ];
    }

    /**
     * daystamp
     *
     * @param  mixed $dateRef: parâmetro obrigatório. Representa uma data.
     * @return: retorna um número que representa a conversão da data recebida em quantidade de dias,
     *          extraindo a diferença de fusos horários. Sem essa extração, poderia ocorrer o seguinte:
     *          a data 01/01/2023 20:00 (GMT-03:00) -> dia 01/01/2023, mas a data 01/01/2023 23:00 (GMT-03:00) -> dia 02/01/2023
     */
    public static function daystamp(DateTime $dateRef) {
        return intval(floor(($dateRef->getTimestamp() + $dateRef->getOffset()) / CalendarioService::DIA_EM_SEGUNDOS));
    }

    /**
     * @param   $intervals - esperado um array de intervalos, na seguinte forma:
     *          [['start' => number | DateTime, 'end' => number | DateTime],...['start' => number | DateTime, 'end' => number | DateTime]], 
     *          onde number são Timestamps. Se houver uma interseção entre todos os intervalos do array, a função retorna essa interseção no formato
     *          de um intervalo, que poderá ser de DateTime ou de Timestamp, dependendo do formato recebido no start do primeiro elemento do parâmetro $intervals.
     */
    public static function intersection(array $intervals): Interval | null {
        $isDate = ($intervals[0])->start instanceof DateTime;
        $result = null;
        if(count($intervals) > 1) {
          $compare_0 = $intervals[0];
          for($i = 1; $i < count($intervals); $i++) {
            $compare_i = $intervals[$i];
            if ($compare_0->end >= $compare_i->start && $compare_0->start <= $compare_i->end) {
                $result = new Interval(['start' => max($compare_0->start, $compare_i->start), 'end' => min($compare_0->end, $compare_i->end)]);
            }
          }
        }
        return $result && $isDate ? static::asDateInterval((array) $result) : $result;
    }

    /**
     * @param   $intervals - esperado um array de intervalos, na seguinte forma:
     *          [['start' => number | DateTime, 'end' => number | DateTime],...['start' => number | DateTime, 'end' => number | DateTime]], 
     *          onde number são Timestamps. A função retorna um array, com um ou mais intervalos, que representa a união de todos os intervalos recebidos como parâmetro.
     *          Os elementos do array retornado poderão ser no formato DateTime ou Timestamp, dependendo do formato recebido 
     *          no start do primeiro elemento do parâmetro $intervals.
     */
    public static function union(array $intervals) : array {
        if(count($intervals) < 2){
            return $intervals;
        } else {
            $isDate = ($intervals[0])->start instanceof DateTime;
            $result = [array_shift($intervals)];                  
            for($i = 0; $i < count($result); $i++) {
                for($j = 0; $j < count($intervals); $j++) {
                    if($result[$i]->end >= $intervals[$j]->start && $result[$i]->start <= $intervals[$j]->end) {
                        $result[$i]->start = min($result[$i]->start, $intervals[$j]->start);
                        $result[$i]->end = max($result[$i]->end, $intervals[$j]->end);
                        array_splice($intervals, $j, 1);
                        $j = -1;
                    } 
                }
                if($intervals) array_push($result, array_shift($intervals));
            }
            return $isDate ? array_map(fn($x) => static::asDateInterval($x), $result) : $result;
        }
    }
    /**
     * Intervalos para teste:
     * 01 15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15
     * 01 01  02  02  03  03  04  04  05  05  06  06  07  07  08  08  09  09  10  10  11  11  12  12
     * 22 22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22
     * 
     * CASO I:
     *    ********** 
     *                    **********         
     *                                ****** 
     *              $intervals_i = [['start' => new DateTime('2022-01-15 00:00:00'), 'end' => new DateTime('2022-02-15 00:00:00')],
     *                              ['start' => new DateTime('2022-03-15 00:00:00'), 'end' => new DateTime('2022-04-15 00:00:00')],
     *                              ['start' => new DateTime('2022-05-01 00:00:00'), 'end' => new DateTime('2022-05-15 00:00:00')]]        
     *          Retorno esperado da função UNION:    15/01/22---15/02/22     15/03/22---15/04/22       01/05/22---15/05/22  
     * 
     * CASO II:
     *    **********
     *        ******************         
     *                                ****** 
     *              $intervals_ii = [['start' => new DateTime('2022-01-15 00:00:00'), 'end' => new DateTime('2022-02-15 00:00:00')],
     *                               ['start' => new DateTime('2022-02-01 00:00:00'), 'end' => new DateTime('2022-04-01 00:00:00')],
     *                               ['start' => new DateTime('2022-05-01 00:00:00'), 'end' => new DateTime('2022-05-15 00:00:00')]]        
     *          Retorno esperado da função UNION:    15/01/22---01/04/22     01/05/22---15/05/22 
     * 
     * CASO III:
     *    **********
     *        ******************         
     *                    ****************** 
     *              $intervals_iii = [['start' => new DateTime('2022-01-15 00:00:00'), 'end' => new DateTime('2022-02-15 00:00:00')],
     *                                ['start' => new DateTime('2022-02-01 00:00:00'), 'end' => new DateTime('2022-04-01 00:00:00')],
     *                                ['start' => new DateTime('2022-03-15 00:00:00'), 'end' => new DateTime('2022-05-15 00:00:00')]]          
     *          Retorno esperado da função UNION:    15/01/22---15/05/22      
     * 
     * Intervalos para teste:
     * 01 15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15
     * 01 01  02  02  03  03  04  04  05  05  06  06  07  07  08  08  09  09  10  10  11  11  12  12
     * 22 22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22
     *  
     * CASO IV:
     *    **************
     *        ******         
     *                    ****************** 
     *                            ******  
     *              $intervals_iv = [['start' => new DateTime('2022-01-15 00:00:00'), 'end' => new DateTime('2022-03-01 00:00:00')],
     *                               ['start' => new DateTime('2022-02-01 00:00:00'), 'end' => new DateTime('2022-02-15 00:00:00')],
     *                               ['start' => new DateTime('2022-03-15 00:00:00'), 'end' => new DateTime('2022-05-15 00:00:00')],
     *                               ['start' => new DateTime('2022-04-15 00:00:00'), 'end' => new DateTime('2022-05-01 00:00:00')]] 
     *          Retorno esperado da função UNION:    15/01/22---01/03/22     15/03/22---15/05/22       
     *
     * CASO V:
     *    **********************************
     *        **************************         
     *            ****************** 
     *              $intervals_v = [['start' => new DateTime('2022-01-15 00:00:00'), 'end' => new DateTime('2022-05-15 00:00:00')],
     *                              ['start' => new DateTime('2022-02-01 00:00:00'), 'end' => new DateTime('2022-05-01 00:00:00')],
     *                              ['start' => new DateTime('2022-02-15 00:00:00'), 'end' => new DateTime('2022-04-15 00:00:00')]]          
     *          Retorno esperado da função UNION:    15/01/22---15/05/22    
     * 
     * CASO VI:
     *    **************
     *                        **************         
     *        ****** 
     *                    **********
     *            **************
     *              $intervals_vi = [['start' => new DateTime('2022-01-15 00:00:00'), 'end' => new DateTime('2022-03-01 00:00:00')],
     *                               ['start' => new DateTime('2022-04-01 00:00:00'), 'end' => new DateTime('2022-05-15 00:00:00')],
     *                               ['start' => new DateTime('2022-02-01 00:00:00'), 'end' => new DateTime('2022-02-15 00:00:00')],
     *                               ['start' => new DateTime('2022-03-15 00:00:00'), 'end' => new DateTime('2022-04-15 00:00:00')],
     *                               ['start' => new DateTime('2022-02-15 00:00:00'), 'end' => new DateTime('2022-04-01 00:00:00')]]          
     *          Retorno esperado da função UNION:    15/01/22---15/05/22 
     *         
     * Intervalos para teste:
     * 01 15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15  01  15
     * 01 01  02  02  03  03  04  04  05  05  06  06  07  07  08  08  09  09  10  10  11  11  12  12
     * 22 22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22  22
     *  
     * CASO VII:
     *    ******
     *        ******         
     *                ********** 
     *                    **********
     *                                ****** 
     *                                    ****** 
     *                                            ******
     *              $intervals_vii = [['start' => new DateTime('2022-01-15 00:00:00'), 'end' => new DateTime('2022-02-01 00:00:00')],
     *                                ['start' => new DateTime('2022-02-01 00:00:00'), 'end' => new DateTime('2022-02-15 00:00:00')],
     *                                ['start' => new DateTime('2022-03-01 00:00:00'), 'end' => new DateTime('2022-04-01 00:00:00')],
     *                                ['start' => new DateTime('2022-03-15 00:00:00'), 'end' => new DateTime('2022-04-15 00:00:00')],
     *                                ['start' => new DateTime('2022-05-01 00:00:00'), 'end' => new DateTime('2022-05-15 00:00:00')],
     *                                ['start' => new DateTime('2022-05-15 00:00:00'), 'end' => new DateTime('2022-06-01 00:00:00')],
     *                                ['start' => new DateTime('2022-06-15 00:00:00'), 'end' => new DateTime('2022-07-01 00:00:00')]] 
     *          Retorno esperado da função UNION:    Esperado:   15/01/22---15/02/22     01/03/22---15/04/22     01/05/22---01/06/22   15/06/22---01/07/22      
    */

    /**
     * @param $interval - esperado um array na seguinte forma ['start' => number | DateTime, 'end' => number | DateTime], 
     * onde number são Timestamps.
     */
    public static function asTimeInterval(Interval $interval): Interval {
        return new Interval([
            'start' => $interval ? ($interval->start instanceof DateTime ? static::asTimestamp($interval->start) : $interval->start) : 0, 
            'end' => $interval ? ($interval->end instanceof DateTime ? static::asTimestamp($interval->end) : $interval->end) : 0
        ]);

    }

    /**
     * @param $interval - esperado um array na seguinte forma ['start' => number | DateTime, 'end' => number | DateTime], 
     * onde number são Timestamps.
     */
    public static function asDateInterval(array $interval): Interval {
        return new Interval([
            'start' => $interval ? ($interval['start'] instanceof DateTime ? $interval['start'] : static::asDateTime($interval['start'])) : 0, 
            'end' => $interval ? ($interval['end'] instanceof DateTime ? $interval['end'] : static::asDateTime($interval['end'])) : 0
        ]);
    }

    public static function round(float $num, float $decimal) {
        $EPSILON = 2.2204460492503130808472633361816 * pow(10,-16);
        $factor = pow(10, $decimal);
        return round(($num + $EPSILON) * $factor) / $factor;
    } //*** Qual a necessidade do EPSILON? */

    public static function containsInterval(array &$intervals, array $interval) {
        for($i = 0; $i < count($intervals); $i++) {
            if($intervals[$i]['start'] <= $interval['start'] && $intervals[$i]['end'] >= $interval['end']) {
                $intervals[$i] = $interval;
                return true;
            }
        }        
        return false;
    }

    /**
     * @param array $valoresAtuais  Array com os valores atuais dos atributos, no formato [...['string', any]]
     * @param array $valoresAnteriores  Array com os valores anteriores dos atributos, no formato [...['string', any]]
     * @return      Array com as diferenças encontradas, no formato [...['path\para\chave', 'valor atual', 'valor antigo']]
     */
    public function differentAttributes(array $valoresAtuais, array $valoresAnteriores): array {
        $diferenca=array();
        $incluirDiferenca = function (string $pathParaAtributo, $valorAtual, $valorAnterior) use (&$diferenca) {
            array_push($diferenca,[$pathParaAtributo,$valorAtual,$valorAnterior]);
        };
        foreach($valoresAtuais as $atributo => $valorAtual) {
            $valorAnterior = $valoresAnteriores[$atributo] ?? null;
            if( is_array($valorAtual) || $valorAtual === '[]') {                    // SE O VALOR ATUAL FOR UM ARRAY
                if( !(is_array($valorAnterior) || $valorAnterior === '[]')) { 

                    if($valorAnterior) {
                        $incluirDiferenca($atributo,$valorAtual,$valorAnterior);
                    }else{
                        $new_diff = $this->differentAttributes($valorAtual === '[]' ? [] : $valorAtual, []);
                        if( !empty($new_diff) ) {
                            foreach ($new_diff as $dif) { $incluirDiferenca("{$atributo}*{$dif[0]}",$dif[1],$dif[2]); }
                        }
                    }

                } else {
                    $new_diff = $this->differentAttributes($valorAtual === '[]' ? [] : $valorAtual, $valorAnterior === '[]' ? [] : $valorAnterior);
                    if( !empty($new_diff) ) {
                        foreach ($new_diff as $dif) { $incluirDiferenca("{$atributo}*{$dif[0]}",$dif[1],$dif[2]); }
                    }
                }
            } else if( is_string($valorAtual) && json_decode($valorAtual) ){        // SE O VALOR ATUAL FOR UMA STRING JSON                    
                if( is_array($valorAnterior) ){                                         // E O VALOR ANTERIOR FOR UM ARRAY
                    if(is_array($this->object2array(json_decode($valorAtual)))) {     //... se o valor atual puder ser convertido para array,
                        $new_diff = $this->differentAttributes($this->object2array(json_decode($valorAtual)),$valorAnterior); //... chama a função recursivamente passando os dois arrays
                        if( !empty($new_diff) ) {
                            foreach ($new_diff as $dif) { $incluirDiferenca("{$atributo}*{$dif[0]}",$dif[1],$dif[2]); }
                        }                    
                    } else {
                        $incluirDiferenca($atributo,$valorAtual,$valorAnterior);      //... se não puder, inclui essa diferença
                    }                               
                }else if( (is_string($valorAnterior) && json_decode($valorAnterior)) || json_encode($valorAnterior) ) {  // E O VALOR ANTERIOR TAMBÉM FOR UMA STRING/OBJETO JSON 
                    //... se ambos puderem ser convertidas para array, chama-se a função recursivamente                    
                    if(is_array($this->object2array(json_decode($valorAtual))) && (json_encode($valorAnterior) ? is_array($this->object2array($valorAnterior)) : is_array($this->object2array(json_decode($valorAnterior),3)))){
                        $new_diff = $this->differentAttributes($this->object2array(json_decode($valorAtual)),json_encode($valorAnterior) ? $this->object2array($valorAnterior) : $this->object2array(json_decode($valorAnterior),3));
                        if( !empty($new_diff) ) {
                            foreach ($new_diff as $dif) { $incluirDiferenca("{$atributo}*{$dif[0]}",$dif[1],$dif[2]); }
                        }                      
                    }else{      //... caso contrário, inclui essa diferença
                        if($valorAnterior != $valorAtual) $incluirDiferenca($atributo,$valorAtual,$valorAnterior);
                    }
                } else if( json_encode($valorAnterior) ) {                        
                    if( json_encode($valorAnterior) != $valorAtual ) $incluirDiferenca($atributo,$valorAtual,json_encode($valorAnterior)); 
                }
            } else if( strtotime($valorAtual) && strtotime($valorAnterior) ) {      // SE OS VALORES ATUAL E ANTERIOR FOREM STRING DO TIPO DATA E/OU HORA 
                if( strtotime($valorAtual) != strtotime($valorAnterior) ) $incluirDiferenca($atributo,$valorAtual,$valorAnterior); 
            } else if( strtotime($valorAtual) && is_a(new MomentPHP($valorAtual),'DateTime') && is_a(new MomentPHP($valorAnterior),'DateTime') ){
                $incluirDiferenca($atributo,$valorAtual,$valorAnterior);          // SE O VALOR ATUAL FOR UMA STRING DO TIPO DATA E/OU HORA E O VALOR ANTERIOR FOR UM OBJETO DO TIPO DATETIME
            } else if( $valorAnterior != $valorAtual ) { 
                $incluirDiferenca($atributo,$valorAtual,$valorAnterior);          // SE NÃO FOR NENHUM DOS CASOS ANTERIORES
            }
        }
        return $diferenca;
    }

    /**
     * Método utilizado para validar os campos obrigatórios de uma entidade. 
     * @param array $entity             Array com os dados a serem analisados.
     * @param array $requiredAttributes Array com os campos obrigatórios.
     * @return string                   Uma string vazia se todos os campos de $entity foram validados, ou uma string com o nome do campo que não passou na validação.
     */
    public static function validateRequired($entity, $requiredAttributes): string {
        foreach($entity as $key => $value) if(in_array($key, $requiredAttributes) && !$value) return $key;
        return '';
    }

    /**
     * Método utilizado para validar os campos de uma entidade cujos valores precisam estar dentro de uma faixa.
     * @param array $entity             Array com os dados a serem analisados.
     * @param array $rangeAttributes    Array com os campos e as suas respectivas faixas de valores, no seguinte formato: 
     *                                  [campo: string, valorMinimo: number, valorMaximo: number, incluiValorMinimo: bool, incluiValorMaximo: bool]. Por padrão, os valores mínimo e máximo
     *                                  da escala são incluídos na faixa. Dois exemplos equivalentes: [['idade',1,100]['salario',1200.50,4.500.00]] e [['idade',1,100,true,true],['salario',1200.50,4.500.00,true,true]],
     * @return string                   Uma string vazia se todos os campos de $entity foram validados, ou uma string com o nome do campo que não passou na validação.
     */
    public static function validateRange($entity, $rangeAttributes): string {

/*         foreach ($entity as [$k, $v, $includeMinValue = true, $includeMaxValue = true]) {
            $value = floatVal($v);
            foreach($rangeAttributes as $condition){ 
                $condition1 = $includeMinValue ? $valor < $condition[1] : $valor <= $condition[1]; 
                if($key == $condition[0] && ($valor < $condition[1] || $valor > $condition[2])) return [] . $key . " deve estar entre " . $condition[1] . " e " . $condition[2]; 
            }
        } */
        return '';
    }

    public static function getApelido(string $nome) {
      (string) $apelido = "";
      if(!empty($nome) && is_string($nome)){
          $nome = strtolower($nome);
          $nome = explode(" ", $nome);
          $apelido = ucfirst($nome[0]);
          }
      return $apelido;
    }
}

/* EXEMPLO:

$a = ['nome' => 'Ricardo', 'sexo' => 'MASC', 'endereco' => 'Av. Abdias Neves, 2168', 'esposa' => ['nome' => 'Suzana', 'idade' => 49]];
$b = ['nome' => 'Ricardo de Sousa', 'sexo' => 'MASC', 'endereco' => [
    'logradouro' => 'Av. Abdias Neves', 'numero' => '2168'], 'esposa' => ['nome' => 'Susana', 'idade' => 49]];
$diferenca = ['nome' => 'Ricardo', 'endereco' => 'Av. Abdias Neves, 2168', 'esposa' => ['nome' => 'Suzana']]; */