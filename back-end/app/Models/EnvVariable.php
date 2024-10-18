<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EnvVariable extends ModelBase
{
    use HasFactory;
    //use SoftDeletes;
    protected $table = 'env_variables';
    protected $auditEnabled = false;
    protected $fillable = ['name', 'value'];

}
