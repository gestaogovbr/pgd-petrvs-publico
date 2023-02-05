<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Services\CalendarioService;
use Carbon\Carbon;
use \MomentPHP\MomentPHP;
use DateTime;

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

    public function valueOrDefault($value, $default = "") {
        return empty($value) || gettype($value) == "array" ? $default : $value;
    }

    public function object2array($object) {
        return @json_decode(@json_encode($object),1);
    }

    public static function getTimeFormatted($dataHora) {
        return (new MomentPHP($dataHora))->format("H:i");
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
     * A função devolve um float, que será o Timestamp, se receber uma data em qualquer um dos seguintes formatos: DateTime, Timestamp, string.
     * Se o formato recebido for inválido, retorna -1.
     */
    public static function asTimestamp($date): float {
        return gettype($date) == "integer" ? $date : ($date instanceof DateTime ? $date->getTimestamp() : (gettype($date) == "string" ? (strtotime($date) ? strtotime($date) : -1) : -1));
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
        $i = 0;
        $summ = 0;
        $arrayLen = count($array);
        while ($i < $arrayLen) {
            $summ = $summ + $array[$i];
            $i++;
        }
        return $summ / $arrayLen;
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


    public static function addTimeHours(DateTime $dateRef, int $hours): DateTime {
        $result = new DateTime($dateRef->getTimestamp());
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
    public static function intersection(array $intervals) {
        $isDate = ($intervals[0])['start'] instanceof DateTime;
        $result = null;
        if(count($intervals) > 1) {
          $result = static::asTimeInterval($intervals[0]);
          for($i = 1; $i < count($intervals); $i++) {
            $compare = static::asTimeInterval($intervals[$i]);
            if ($result['end'] >= $compare['start'] && $result['start'] <= $compare['end']) {
                $result = ['start' => max($result['start'], $compare['start']), 'end' => min($result['end'], $compare['end'])];
            } else {
                $result = null;
            }
          }
        }
        return $result && $isDate ? static::asDateInterval($result) : $result;
    }

    /**
     * @param   $intervals - esperado um array de intervalos, na seguinte forma:
     *          [['start' => number | DateTime, 'end' => number | DateTime],...['start' => number | DateTime, 'end' => number | DateTime]], 
     *          onde number são Timestamps. A função retorna um array que representa a união de todos os intervalos recebidos como parâmetro.
     *          Os elementos do array retornado poderão ser no formato DateTime ou Timestamp, dependendo do formato recebido 
     *          no start do primeiro elemento do parâmetro $intervals.
     */
    public static function union(array $intervals) : array {
        if(count($intervals) < 2){
            return $intervals;
        } else {
            $isDate = ($intervals[0])['start'] instanceof DateTime;
            $intervalos = array_map(fn($x) => static::asTimeInterval($x), $intervals);
            $result = [array_shift($intervalos)];                  
            for($i = 0; $i < count($result); $i++) {
                for($j = 0; $j < count($intervalos); $j++) {
                    if($result[$i]['end'] >= $intervalos[$j]['start'] && $result[$i]['start'] <= $intervalos[$j]['end']) {
                        $result[$i] = [
                            'start' => min($result[$i]['start'], $intervalos[$j]['start']),
                            'end'=> max($result[$i]['end'], $intervalos[$j]['end'])
                        ];
                        array_splice($intervalos, $j, 1);
                        $j = -1;
                    } 
                }
                if($intervalos) array_push($result, array_shift($intervalos));
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
    public static function asTimeInterval(array $interval): array {
        if(count($interval)>0){
            return [
                'start' => static::asTimestamp($interval['start']),
                'end' => static::asTimestamp($interval['end'])
            ];
        } else {
            return [];
        }
    }

    /**
     * @param $interval - esperado um array na seguinte forma ['start' => number | DateTime, 'end' => number | DateTime], 
     * onde number são Timestamps.
     */
    public static function asDateInterval(array $interval): array {
        return [
            'start' => static::asDateTime($interval['start']),
            'end' => static::asDateTime($interval['end'])
        ];
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
}
