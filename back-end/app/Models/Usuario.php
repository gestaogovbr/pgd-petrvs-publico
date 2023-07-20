<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\AutoUuid;
use App\Models\Afastamento;
use App\Models\Anexo;
use App\Models\Atividade;
use App\Models\AtividadeTarefa;
use App\Models\Avaliacao;
use App\Models\Change;
use App\Models\Comentario;
use App\Models\DocumentoAssinatura;
use App\Models\Entidade;
use App\Models\Favorito;
use App\Models\Integracao;
use App\Models\Notificacao;
use App\Models\NotificacaoDestinatario;
use App\Models\NotificacaoWhatsapp;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Perfil;
use App\Models\ProgramaParticipante;
use App\Models\Projeto;
use App\Models\ProjetoHistorico;
use App\Models\ProjetoRecurso;
use App\Models\ProjetoTarefa;
use App\Models\NotificacaoConfig;
use App\Traits\MergeRelations;
use App\Traits\LogChanges;
use App\Traits\HasPermissions;
use App\Models\UnidadeUsuario;
use App\Services\UsuarioService;
use Throwable;

class UsuarioConfig {}

class Usuario extends Authenticatable
{
    use HasPermissions, HasApiTokens, HasFactory, Notifiable, AutoUuid, MergeRelations, LogChanges;

    protected $table = "usuarios";

    protected $with = ['perfil'];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do usuário
        'email', /* varchar(100); NOT NULL; */// E-mail do usuário
        'email_verified_at', /* timestamp; */// Data de verificação do e-mail do usuário
        'cpf', /* varchar(14); NOT NULL; */// CPF do usuário
        'matricula', /* varchar(10); */// Matrícula funcional do usuário
        'apelido', /* varchar(100); NOT NULL; */// Apelido/Nome de guerra/Nome social
        'telefone', /* varchar(50); */// Telefone do usuário
        'sexo', /* enum('MASCULINO','FEMININO'); */// Sexo do usuário
        'config', /* json; */// Configurações do usuário
        'notificacoes', /* json; */// Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)
        'id_google', /* varchar(50); */// Id associado com o usuário do login do google
        'vinculacao', /* enum('SERVIDOR_EFETIVO','SERVIDOR_COMISSIONADO','EMPREGADO','CONTRATADO_TEMPORARIO'); NOT NULL; DEFAULT: 'SERVIDOR_EFETIVO'; */// Vínculo do usuário com a administração
        'perfil_id', /* char(36); */
        'uf', /* char(2); */// UF do usuário
        'texto_complementar_plano', /* longtext; */// Campo de mensagem adicional do plano de trabalho
        //'deleted_at', /* timestamp; */
        //'remember_token', /* varchar(100); */
        //'password', /* varchar(255); */// Senha do usuário
        //'url_foto', /* varchar(255); */// URL da foto do usuário (temporário)
        //'foto_perfil', /* text; */// Foto padrão do perfil
        //'foto_google', /* text; */// Foto do G-Suit (Google)
        //'foto_microsoft', /* text; */// Foto do Azure (Microsoft)
        //'foto_firebase', /* text; */// Foto do Firebase (Google, Facebook, Instagram, Twiter, etc...)
        //'id_super', /* text; */// Id do usuário no SUPER
        //'metadados', /* json; */// Metadados do usuário
    ];

    public $fillable_changes = [];

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

    public $delete_cascade = ['favoritos','vinculosUnidades'];

    // Has
    public function afastamentos() { return $this->hasMany(Afastamento::class); }
    public function anexos() { return $this->hasMany(Anexo::class); }
    public function consolidacoes() { return $this->hasMany(PlanoTrabalhoConsolidacao::class, 'avaliador_id'); }
    public function assinaturas() { return $this->hasMany(DocumentoAssinatura::class); }
    public function avaliacoes() { return $this->hasMany(Avaliacao::class); }
    public function atividades() { return $this->hasMany(Atividade::class); } 
    public function atividadesDemandadas() { return $this->hasMany(Atividade::class, 'demandante_id'); } 
    public function tarefasAtividade() { return $this->hasMany(AtividadeTarefa::class); } 
    public function tarefasProjeto() { return $this->hasMany(ProjetoTarefa::class); } 
    public function favoritos() { return $this->hasMany(Favorito::class); }
    public function comentarios() { return $this->hasMany(Comentario::class); }
    public function projetos() { return $this->hasMany(Projeto::class); }
    public function recursosProjeto() { return $this->hasMany(ProjetoRecurso::class); }
    public function historicosProjeto() { return $this->hasMany(ProjetoHistorico::class); }
    public function notificacoes() { return $this->hasMany(Notificacao::class, 'remetente_id'); }
    public function notificacoesWhatsapp() { return $this->hasMany(NotificacaoWhatsapp::class); }
    public function notificacoesDestinatario() { return $this->hasMany(NotificacaoDestinatario::class); }
    public function planosTrabalho() { return $this->hasMany(PlanoTrabalho::class); }
    public function participantesPrograma() { return $this->hasMany(ProgramaParticipante::class); }
    public function integracoes() { return $this->hasMany(Integracao::class); }
    public function vinculosUnidades() { return $this->hasMany(UnidadeUsuario::class); }
    public function gerenciaEntidade() { return $this->hasOne(Entidade::class, 'gestor_id'); } 
    public function gerenciaSubstitutaEntidade() { return $this->hasOne(Entidade::class, 'gestor_substituto_id'); } 
    public function planosEntregaCriados() { return $this->hasMany(PlanoEntrega::class, 'criacao_usuario_id'); }  
    public function planosTrabalhoCriados() { return $this->hasMany(PlanoEntrega::class, 'criacao_usuario_id'); }  
    // Belongs
    public function perfil() { return $this->belongsTo(Perfil::class); }     //nullable
    public function unidades() { return $this->belongsToMany(Unidade::class); }
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
        $notificacoes = new NotificacaoConfig();
        return array_replace_recursive((array) $notificacoes, (array) json_decode(empty($value) ? "[]" : $value));
    }
    public function setNotificacoesAttribute($value)
    {
        $this->attributes['notificacoes'] = json_encode($value);
    }
    public function getChangesAttribute() 
    {
        return Change::where('user_id', $this->id)->get()->toArray() ?? []; 
        //Não pode ser usado um relacionamento do Laravel porque as tabelas estão em bancos distintos
    }
    public function getGerenciaTitularAttribute()
    {
        $result = null;
        foreach ($this->vinculosUnidades as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'GESTOR')) > 0) $result = $vinculo->unidade; }
        return $result;
    }
    public function getGerenciasSubstitutasAttribute()
    {
        $result = [];
        foreach ($this->vinculosUnidades as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'GESTOR_SUBSTITUTO')) > 0) array_push($result, $vinculo->unidade); }
        return $result;
    }
    public function getLotacaoAttribute()
    {
        $result = null;
        foreach ($this->vinculosUnidades as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'LOTADO' && $a['deleted_at'] == null)) > 0) $result = $vinculo->unidade; }
        return $result;
    }
    public function getColaboracoesAttribute()
    {
        $result = [];
        foreach ($this->vinculosUnidades as $vinculo){ if(count(array_filter($vinculo->atribuicoes->toArray(), fn($a) => $a['atribuicao'] == 'COLABORADOR')) > 0) array_push($result, $vinculo->unidade); }
        return $result;
    }
    public function getLotacoesAttribute()
    {
        $result = [];
        foreach ($this->vinculosUnidades as $vinculo){ 
            $atribuicoes = $vinculo->atribuicoes;
            if(count(array_filter($atribuicoes->toArray(), fn($a) => ($a['atribuicao'] == 'LOTADO' || $a['atribuicao'] == 'COLABORADOR'))) > 0) array_push($result, $vinculo->unidade); 
        }
        return $result;
    }
    public function getAtribuicoesAttribute()
    { 
        $result = [];
        foreach($this->unidades as $unidade){
            $atribuicoes = Atribuicao::where('unidade_usuario_id', $unidade->pivot->id)->get();
            if(count($atribuicoes) > 0) array_push($result, [$unidade,$atribuicoes->toArray()]);
        }
        return $result;
    }
}