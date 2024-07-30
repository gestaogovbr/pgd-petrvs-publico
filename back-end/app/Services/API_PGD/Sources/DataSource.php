<?php
namespace App\Services\API_PGD\Sources;

abstract class DataSource 
{
    abstract public function getAuditInfo();

    abstract public function getData($model);
}

