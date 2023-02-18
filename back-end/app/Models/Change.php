<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Change extends Model
{
    use HasFactory;

    protected $connection = 'log';

    protected $table = 'changes';

    protected $with = [];

    public $fillable = [
        'user_id',
        'date_time',
        'table_name',
        'row_id',
        'type',
        'delta'
    ];

    public $timestamps = false;

    protected $casts = [
        'date_time' => 'datetime',
    ];

    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'user_id'); }   

/*     // Mutattors e Casts
    public function getDeltaAttribute($value)
    {
        return json_decode($value);
    }   
    public function setDeltaAttribute($value)
    {
        $this->attributes['delta'] = json_encode($value);
    } */

}
