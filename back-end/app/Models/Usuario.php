<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\AutoUuid;
use App\Models\Afastamento;
use App\Models\DemandaAvaliacao;
use App\Models\Demanda;
use App\Models\Favorito;
use App\Models\Lotacao;
use App\Models\Plano;
use App\Models\Perfil;
use App\Traits\MergeRelations;
use App\Traits\AutoDataInicio;
use App\Traits\HasPermissions;

class UsuarioConfig {}

class UsuarioNotificacoes {
    public $enviar_email = true;
    public $enviar_whatsapp = true;
    public $notifica_demanda_distribuicao = true;
    public $notifica_demanda_conclusao = true;
    public $notifica_demanda_avaliacao = true;
    public $notifica_demanda_modificacao = true;
    public $notifica_demanda_comentario = true;
}

class Usuario extends Authenticatable
{
    use HasPermissions, HasApiTokens, HasFactory, Notifiable, AutoUuid, MergeRelations, AutoDataInicio;

    protected $keyType = 'string';

    protected $with = ['perfil'];

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $fillable = [
        'password',
        'nome',
        'email',
        'email_verified_at',
        'cpf',
        'matricula',
        'apelido',
        'telefone',
        'sexo',
        'config',
        'notificacoes',
        'data_inicio',
        //'data_fim',
        'id_google',
        'url_foto',
        'vinculacao',
        'perfil_id'
    ];

    public $fillable_changes = [
        'lotacoes'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public $delete_cascade = ['favoritos', 'lotacoes'];

    // Has
    public function afastamentos() { return $this->hasMany(Afastamento::class); }        
    public function avaliacoes() { return $this->hasMany(DemandaAvaliacao::class); }        
    public function demandas() { return $this->hasMany(Demanda::class); }        
    public function favoritos() { return $this->hasMany(Favorito::class); }    
    public function lotacoes() { return $this->hasMany(Lotacao::class); }    
    public function planos() { return $this->hasMany(Plano::class); }        
    public function usuariosHashes() { return $this->hasMany(UsuarioHahs::class); }        
    // Belongs
    public function perfil() { return $this->belongsTo(Perfil::class, 'perfil_id'); }
    // Mutattors e Casts
    public function getConfigAttribute($value)
    {
        $config = new UsuarioConfig();
        return array_merge_recursive((array) $config, (array) json_decode(empty($value) ? "[]" : $value));
    }   
    public function setConfigAttribute($value)
    {
        $this->attributes['config'] = json_encode($value);
    }
    public function getNotificacoesAttribute($value)
    {
        $notificacoes = new UsuarioNotificacoes();
        return array_replace_recursive((array) $notificacoes, (array) json_decode(empty($value) ? "[]" : $value));
    }   
    public function setNotificacoesAttribute($value)
    {
        $this->attributes['notificacoes'] = json_encode($value);
    }
}
