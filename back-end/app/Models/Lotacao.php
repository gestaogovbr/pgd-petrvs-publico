<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Patrulha;
use App\Models\Incidente;
use App\Models\Feed;
use App\Models\Exame;
use App\Models\Covid;
use App\Models\Afastamento;
use App\Models\Unidade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class Lotacao extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    public $fillable = [
        'principal',
        'usuario_id',
        'data_inicio',
        //'data_fim',
        'unidade_id'
    ];
    

    protected $table = 'lotacoes';
    // Has
    // public function usuarios() { return $this->hasMany(Usuario::class); }
    public function patrulhas() { return $this->hasMany(Patrulha::class); }
    public function incidentes() { return $this->hasMany(Incidente::class); }
    public function feeds() { return $this->hasMany(Feed::class); }
    public function exames() { return $this->hasMany(Exame::class); }
    public function covids() { return $this->hasMany(Covid::class); }
    public function afastamentos() { return $this->hasMany(Afastamento::class); }    
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function unidade() { return $this->belongsTo(Unidade::class); }    
}