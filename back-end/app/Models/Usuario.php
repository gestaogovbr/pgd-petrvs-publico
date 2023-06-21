<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\AutoUuid;
use App\Models\Afastamento;
use App\Models\DemandaAvaliacao;
use App\Models\Demanda;
use App\Models\Change;
use App\Models\Favorito;
use App\Models\Lotacao;
use App\Models\Plano;
use App\Models\Perfil;
use App\Models\NotificacoesConfig;
use App\Traits\MergeRelations;
use App\Traits\LogChanges;
use App\Traits\AutoDataInicio;
use App\Traits\HasPermissions;
use App\Services\UsuarioService;
use Throwable;

class UsuarioConfig {}

/*class UsuarioNotificacoes {
    public $enviar_email = true;
    public $enviar_whatsapp = true;
    public $notifica_demanda_distribuicao = true;
    public $notifica_demanda_conclusao = true;
    public $notifica_demanda_avaliacao = true;
    public $notifica_demanda_modificacao = true;
    public $notifica_demanda_comentario = true;
}*/

class Usuario extends Authenticatable
{
    use HasPermissions, HasApiTokens, HasFactory, Notifiable, AutoUuid, MergeRelations, AutoDataInicio, LogChanges;

    protected $table = "usuarios";

    protected $with = ['perfil'];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do usuário
        'email', /* varchar(100); NOT NULL; */// Email do usuário
        'email_verified_at', /* timestamp; */
        'cpf', /* varchar(14); NOT NULL; */// CPF do usuário
        'matricula', /* varchar(10); */// Matrícula funcional do usuário
        'apelido', /* varchar(100); NOT NULL; */// Apelido/Nome de guerra/Nome social
        'telefone', /* varchar(50); */// Telefone do usuário
        'sexo', /* enum('MASCULINO','FEMININO'); */
        'config', /* json; */
        'notificacoes', /* json; */// Configurações das notificações (Se envia email, whatsapp, tipos, templates)
        'data_inicio', /* datetime; NOT NULL; */
        'id_google', /* varchar(50); */// Id associado com o usuário do login do google
        'vinculacao', /* enum('SERVIDOR_EFETIVO','SERVIDOR_COMISSIONADO','EMPREGADO','CONTRATADO_TEMPORARIO'); NOT NULL; DEFAULT: 'SERVIDOR_EFETIVO'; */// Vinculo do usuário com a administração
        'perfil_id', /* char(36); */
        'uf', /* char(2); */// UF do usuário
        'texto_complementar_plano', /* longtext; */// Campo de mensagem adicional do plano de trabalho
        //'remember_token', /* varchar(100); */
        //'password', /* varchar(255); */
        //'data_fim', /* datetime; */
        //'url_foto', /* varchar(255); */// Url da foto do usuário (temporário)
        //'metadados', /* json; */// Metadados
        //'foto_perfil', /* text; */// Foto padrão do perfil
        //'foto_google', /* text; */// Foto do G-Suit (Google)
        //'foto_microsoft', /* text; */// Foto do Azure (Microsoft)
        //'foto_firebase', /* text; */// Foto do Firebase (Google, Facebook, Instagram, Twiter, etc...)
        //'projeto_id', /* char(36); */
        //'projeto_tarefa_id', /* char(36); */
        //'id_super', /* text; */// Id do usuário no SUPER
    ];

    public $fillable_changes = [
        'lotacoes'
    ];

    protected $keyType = 'string';

    public $incrementing = false;

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
        'email_verified_at' => 'datetime'
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
    public function integracoes() { return $this->hasMany(Integracao::class); }
    public function chefiasTitulares() { return $this->hasMany(Unidade::class, 'gestor_id'); }
    public function chefiasSubstitutas() { return $this->hasMany(Unidade::class, 'gestor_substituto_id'); }
    public function lotacao() { return $this->hasOne(Lotacao::class)->where('principal', 1); }
    // Belongs
    public function perfil() { return $this->belongsTo(Perfil::class, 'perfil_id'); }
    // Mutattors e Casts
    public function getUrlFotoAttribute($value) 
    {
        $usuarioService = new UsuarioService();
        $url = "/assets/images/profile.png";
        try {
            $url = empty($this->foto_perfil) ? "/assets/images/profile.png" : $usuarioService->downloadUrl($this->foto_perfil);
        } catch (Throwable $e) {
            $url = "/assets/images/profile.png";
        }
        return $url;
    }
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
        $notificacoes = new NotificacoesConfig();
        return array_replace_recursive((array) $notificacoes, (array) json_decode(empty($value) ? "[]" : $value));
    }
    public function setNotificacoesAttribute($value)
    {
        $this->attributes['notificacoes'] = json_encode($value);
    }

    // Outros métodos
    public function changes(): array {
        return Change::where('user_id', $this->id)->get()->toArray() ?? [];
    }
}
