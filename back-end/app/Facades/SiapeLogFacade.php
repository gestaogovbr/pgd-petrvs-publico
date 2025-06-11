<?php
namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class SiapeLogFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'siape-log';
    }
}