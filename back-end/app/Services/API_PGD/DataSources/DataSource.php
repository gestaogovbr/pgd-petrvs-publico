<?php
namespace App\Services\API_PGD\DataSources;

use App\Services\API_PGD\ExportSource;

abstract class DataSource 
{
    abstract public function getData(ExportSource $exportSource);
}

