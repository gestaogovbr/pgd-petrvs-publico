<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Traits\UseDataFim;
use Exception;
use stdClass;

class ProjetoService extends ServiceBase {
    use UseDataFim;

    public function validateStore($data, $unidade, $action) {

    }

    public function proxyStore(&$data, $unidade, $action) {
        $this->recalcular($data);
    }

    public function getValue($objArray, $key) {
        return gettype($objArray) == "array" ? $objArray[$key] : $objArray->$key;
    }

    public function setValue($objArray, $key, $value) {
        if(gettype($objArray) == "array") {
            $objArray[$key] = $value;
        } else {
            $objArray->$key = $value;
        }
    }

    public function arrayDelta(&$from, &$to) {
        $result = [];
        $ids = [];
        foreach($to as $current) {
            $ids[] = $current->id;
            $src = array_filter($from, fn($v) => $this->getValue($v, "id") == $this->getValue($current, "id"));
            if(count($src) == 1) {
                $delta = $this->delta($src[0], $current);
                if(!empty($delta)) $result[] = $delta;
            } else {
                $delta = clone $current;
                $this->setValue($delta, "_status", "ADD");
                $result[] = $delta;
            }
        }
        foreach($from as $current) {
            if(!in_array($this->getValue($current, "id"), $ids)) $result[] = gettype($current) == "array" ? (object) [ "id" => $current->id, "_status" => "DEL" ] : [ "id" => $current->id, "_status" => "DEL" ];
        }
        return empty($result) ? null : $result;
    }

    public function delta(&$from, &$to) {
        if(gettype($from) != gettype($to)) throw new Exception("ObjectDelta: Tipos diferentes");
        $isArray = gettype($to) == "array";
        $before = (array) $from;
        $now = (array) $to;
        $result = [];
        foreach($now as $key => $value) {
            if(gettype($value) == "array") {
                $delta = isset($before[$key]) ? $this->arrayDelta($before[$key], $value) : $value;
                if(!empty($delta)) {
                    $result[$key] = $delta;
                    $result["_status"] = "EDIT";
                }
            } else if(gettype($value) == "object"){
                $delta = (array) isset($before[$key]) ? $this->delta($before[$key], $value) : clone $value;
                if(!empty($delta)) {
                    $delta["_status"] = "EDIT";
                    $result[$key] = $delta;
                    $result["_status"] = "EDIT";
                }
            } else if(!isset($before[$key]) || gettype($before[$key]) != gettype($value) || strval($before[$key]) != strval($value)) {
                $result[$key] = $value;
                $result["_status"] = "EDIT";
            }
        }
        return empty($result) ? null : $result;
    }

    public function applyDelta(&$from, &$delta) {
        
    }

    public function recalcular(&$projeto) {
        // Reindexar os indices 
        // Recalcular recursos
        // recacular valores
        // recalcular os prazos


        


    }
}

