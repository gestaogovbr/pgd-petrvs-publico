<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use DateTime;

class UtilService
{

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

    public static function asTimestemp($date) {
        return gettype($date) == "integer" ? $date : ($date instanceof DateTime ? $date->getTimestamp() : (gettype($date) == "string" ? strtotime($date) : $date));
    }

    public static function minDate(...$dates) {
        return array_reduce($dates, function ($carry, $item) {
            return !empty($item) && (empty($carry) || UtilService::asTimestemp($carry) > UtilService::asTimestemp($item)) ? $item : $carry;
        }, null);
    }

    public static function maxDate(...$dates) {
        return array_reduce($dates, function ($carry, $item) {
            return !empty($item) && (empty($carry) || UtilService::asTimestemp($carry) < UtilService::asTimestemp($item)) ? $item : $carry;
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

}
