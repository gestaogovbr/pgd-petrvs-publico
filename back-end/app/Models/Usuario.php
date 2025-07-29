<?php

namespace App\Models;

use Throwable;
use App\Casts\AsJson;
use App\Models\Anexo;
use App\Models\Change;
use App\Models\Perfil;
use App\Models\Projeto;
use App\Models\Entidade;
use App\Models\Favorito;
use App\Traits\AutoUuid;
use App\Models\Atividade;
use App\Models\Avaliacao;
use App\Models\Documento;
use App\Models\Comentario;
use App\Models\Curriculum;
use App\Models\Integracao;
use App\Models\Afastamento;
use App\Models\Notificacao;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\ProjetoTarefa;
use App\Models\ProjetoRecurso;
use App\Traits\HasPermissions;
use App\Traits\MergeRelations;
use App\Models\AtividadeTarefa;
use App\Models\ProjetoHistorico;
use App\Services\UsuarioService;
use App\Models\NotificacaoConfig;
use Laravel\Sanctum\HasApiTokens;
use App\Exceptions\ServerException;
use App\Models\DocumentoAssinatura;
use App\Models\NotificacaoWhatsapp;
use App\Models\StatusJustificativa;
use App\Models\ProgramaParticipante;
use App\Models\NotificacaoDestinatario;
use Illuminate\Notifications\Notifiable;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\QuestionarioPreenchimento;
use App\Models\IntegracaoServidor;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Lab404\Impersonate\Models\Impersonate;
use Carbon\Carbon;
class UsuarioConfig
{
}

class Usuario extends Authenticatable implements AuditableContract
{
    use HasPermissions, HasApiTokens, HasFactory, Notifiable, AutoUuid, MergeRelations, SoftDeletes, Auditable,Impersonate;

    protected $table = "usuarios";

    protected $with = ['perfil'];
    protected $appends = ['pedagio'];
    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
        'nome', /* varchar(256); NOT NULL; */ // Nome do usuário
        'email', /* varchar(100); NOT NULL; */ // E-mail do usuário
        'email_verified_at', /* timestamp; */ // Data de verificação do e-mail do usuário
        'cpf', /* varchar(14); NOT NULL; */ // CPF do usuário
        'matricula', /* varchar(50); */ // Matrícula funcional do usuário
        'apelido', /* varchar(100); NOT NULL; */ // Apelido/Nome de guerra/Nome social
        'telefone', /* varchar(50); */ // Telefone do usuário
        'sexo', /* enum('MASCULINO','FEMININO'); */ // Sexo do usuário
        'config', /* json; */ // Configurações do usuário
        'notificacoes', /* json; */ // Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)
        'id_google', /* varchar(50); */ // Id associado com o usuário do login do google
        'perfil_id', /* char(36); */
        'uf', /* char(2); */ // UF do usuário
        'texto_complementar_plano', /* longtext; */ // Campo de mensagem adicional do plano de trabalho
        'situacao_funcional',
        'data_nascimento',
        'nome_jornada', /* varchar(100); NULL */ // Nome da Jornada
        'cod_jornada', /* int; NULL */ // Codigo da Jornada
        //'deleted_at', /* timestamp; */
        //'remember_token', /* varchar(100); */
        //'password', /* varchar(255); */// Senha do usuário
        //'url_foto', /* varchar(255); */// URL da foto do usuário (temporário)
        //'foto_perfil', /* text; */// Foto padrão do perfil
        //'foto_google', /* text; */// Foto do G-Suit (Google)
        //'foto_microsoft', /* text; */// Foto do Azure (Microsoft)
        //'foto_firebase', /* text; */// Foto do Firebase (Google, Facebook, Instagram, Twiter, etc...)
        //'id_sei', /* text; */// Id do usuário no SEI
        //'vinculacao', /* enum('SERVIDOR_EFETIVO','SERVIDOR_COMISSIONADO','EMPREGADO','CONTRATADO_TEMPORARIO'); NOT NULL; DEFAULT: 'SERVIDOR_EFETIVO'; */// Vínculo do usuário com a administração
        //'metadados', /* json; */// Metadados do usuário
        'data_modificacao',
        'usuario_externo',
        'is_admin',
        'pedagio'
    ];

    public function proxyFill($dataOrEntity, $unidade, $action)
    {
        $this->fill($dataOrEntity);
        if ($action == 'INSERT') {
            $lotacao_id = optional(array_values(array_filter(
                $dataOrEntity["integrantes"],
                fn($i) => !empty(array_intersect(["LOTADO", "COLABORADOR", "GESTOR_DELEGADO"], $i["atribuicoes"]))
            )))[0]["unidade_id"] ?? null;
            $this->save();
            $vinculoLotacao = $this->unidadesIntegrantes()->save(new UnidadeIntegrante(['unidade_id' => $lotacao_id]));
            $lotacao = $vinculoLotacao->atribuicoes()->save(new UnidadeIntegranteAtribuicao(['atribuicao' => 'LOTADO']));
            if (!$vinculoLotacao || !$lotacao) throw new ServerException("ValidateLotacao", "Erro com a definição da lotação. Usuário não cadastrado!");
        }
        return $dataOrEntity;
    }

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
        'email_verified_at' => 'datetime',
        'notificacoes' => AsJson::class
    ];

    public $delete_cascade = [
        'afastamentos',
        'anexos',
        'assinaturas',
        'atividades',
        'atividadesDemandadas',
        'comentarios',
        'documentos',
        'favoritos',  // Note que 'favoritos' aparece duas vezes na lista original
        'favoritos',
        'historicosProjeto',
        'integracoes',
        'notificacoesDestinatario',
        'notificacoesEnviadas',
        'notificacoesWhatsapp',
        'participacoesProgramas',
        'planosEntregaCriados',
        'planosTrabalho',
        'planosTrabalhoCriados',
        'preenchimentos',
        'projetos',
        'recursosProjeto',
        'statusHistorico',
        'tarefasAtividade',
        'tarefasProjeto',
        'unidadesIntegrantes'
    ];

    // hasOne
    public function gerenciaEntidade()
    {
        return $this->hasOne(Entidade::class, 'gestor_id');
    }

  public function isDeveloper(): bool {
    return $this->perfil?->nivel === 0;
  }

    public function gerenciaSubstitutaEntidade()
    {
        return $this->hasOne(Entidade::class, 'gestor_substituto_id');
    }

    public function curriculum()
    {
        return $this->hasOne(Curriculum::class);
    }

    // hasMany
    public function afastamentos()
    {
        return $this->hasMany(Afastamento::class);
    }

    public function anexos()
    {
        return $this->hasMany(Anexo::class);
    }

    public function consolidacoes()
    {
        return $this->hasMany(PlanoTrabalhoConsolidacao::class, 'avaliador_id');
    }

    public function assinaturas()
    {
        return $this->hasMany(DocumentoAssinatura::class);
    }

    public function ultimaAssinatura()
    {
        return $this->hasOne(DocumentoAssinatura::class)->ofMany('data_assinatura', 'max');
    }

    public function avaliacoes()
    {
        return $this->hasMany(Avaliacao::class);
    }

    public function atividades()
    {
        return $this->hasMany(Atividade::class);
    }

    public function atividadesDemandadas()
    {
        return $this->hasMany(Atividade::class, 'demandante_id');
    }

    public function tarefasAtividade()
    {
        return $this->hasMany(AtividadeTarefa::class);
    }

    public function tarefasProjeto()
    {
        return $this->hasMany(ProjetoTarefa::class);
    }

    public function favoritos()
    {
        return $this->hasMany(Favorito::class);
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class);
    }

    public function projetos()
    {
        return $this->hasMany(Projeto::class);
    }

    public function recursosProjeto()
    {
        return $this->hasMany(ProjetoRecurso::class);
    }

    public function historicosProjeto()
    {
        return $this->hasMany(ProjetoHistorico::class);
    }

    public function notificacoesEnviadas()
    {
        return $this->hasMany(Notificacao::class, 'remetente_id');
    }

    public function notificacoesWhatsapp()
    {
        return $this->hasMany(NotificacaoWhatsapp::class);
    }

    public function notificacoesDestinatario()
    {
        return $this->hasMany(NotificacaoDestinatario::class);
    }

    public function planosTrabalho()
    {
        return $this->hasMany(PlanoTrabalho::class);
    }

    public function ultimoPlanoTrabalho()
    {
        return $this->hasOne(PlanoTrabalho::class)->latestOfMany();
    }

    // ultimo plano de trabalho ativo
    public function ultimoPlanoTrabalhoAtivo()
    {
        return $this->hasOne(PlanoTrabalho::class)->where('status', 'ATIVO')->latestOfMany();
    }

    public function participacoesProgramas()
    {
        return $this->hasMany(ProgramaParticipante::class);
    }

    public function ultimaParticipacaoPrograma()
    {
        return $this->hasOne(ProgramaParticipante::class)->latestOfMany();
    }

    public function integracoes()
    {
        return $this->hasMany(Integracao::class);
    }

    public function planosEntregaCriados()
    {
        return $this->hasMany(PlanoEntrega::class, 'criacao_usuario_id');
    }

    public function planosTrabalhoCriados()
    {
        return $this->hasMany(PlanoEntrega::class, 'criacao_usuario_id');
    }

    
    public function unidadesIntegrantes()
    {
        return $this->hasMany(UnidadeIntegrante::class, 'usuario_id', 'id');
    }

    public function unidadeIntegranteAtribuicoes($unidadeId)
    {
        return $this->hasManyThrough(UnidadeIntegranteAtribuicao::class, UnidadeIntegrante::class)->where('unidade_id', $unidadeId)->get();
    }

    public function unidadesIntegranteAtribuicoes()
    {
        return $this->hasManyThrough(UnidadeIntegranteAtribuicao::class, UnidadeIntegrante::class);
    }

    public function statusHistorico()
    {
        return $this->hasMany(StatusJustificativa::class, "usuario_id");
    }

    public function documentos()
    {
        return $this->hasMany(Documento::class);
    }

    public function preenchimentos()
    {
        return $this->hasMany(QuestionarioPreenchimento::class, "usuario_id");
    }

    // belongsTo
    public function perfil()
    {
        return $this->belongsTo(Perfil::class);
    }     //nullable

    // belongsToMany
    public function unidades()
    {
        return $this->belongsToMany(Unidade::class, 'unidades_integrantes', 'usuario_id', 'unidade_id');
    }

    // Others relationships
    public function gerenciaTitular()
    {
        return $this->hasOne(UnidadeIntegrante::class)->has('gestor');
    }

    public function gerencias()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('gestor');
    }

    public function gerenciasSubstitutas()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('gestorSubstituto');
    }

    public function gerenciasDelegadas()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('gestorDelegado');
    }

    public function lotacao()
    {
        return $this->hasOne(UnidadeIntegrante::class)->has('lotado');
    }

    public function curadores()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('curador');
    }

    public function curador()
    {
        return $this->hasOne(UnidadeIntegrante::class)->has('curador');
    }

    public function lotacoes()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('lotado');
    }

    //public function areasTrabalho() { return $this->hasMany(UnidadeIntegrante::class)->has('lotado')->orHas('colaborador'); }
    public function areasTrabalho()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('atribuicoes');
    }

    public function colaboracoes()
    {
        return $this->hasMany(UnidadeIntegrante::class)->has('colaborador');
    }

    public function colaboracao()
    {
        return $this->hasOne(UnidadeIntegrante::class)->has('colaborador');
    } // unidade com a qual possui TCR


    public function integracaoServidor()
    {
        return $this->hasOne(IntegracaoServidor::class, 'cpf', 'cpf');
    }

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

    public function getPedagioAttribute(){
        if ($this->data_final_pedagio) {
            return Carbon::parse($this->data_final_pedagio)->isFuture();
        }
        return false;
    }

    public function getConfigAttribute($value)
    {
        $config = new UsuarioConfig();
        return array_merge_recursive((array)$config, (array)json_decode(empty($value) ? "[]" : $value));
    }

    public function setConfigAttribute($value)
    {
        $this->attributes['config'] = json_encode($value);
    }

    public function getNotificacoesAttribute($value)
    {
        $notificacoes = new NotificacaoConfig();
        return array_replace_recursive((array)$notificacoes, (array)json_decode(empty($value) ? "[]" : $value));
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

    public function getUnidadesAtribuicoesAttribute()
    {
        $result = [];
        $unidadesIntegrantes = $this->unidadesIntegrantes;
        if (!empty($unidadesIntegrantes)) {
            foreach ($unidadesIntegrantes as $vinculo) {
                $atribuicoes = $vinculo->atribuicoes->toArray();
                if (count($atribuicoes) > 0) $result[$vinculo->unidade_id] = array_map(fn($a) => $a["atribuicao"], $atribuicoes);
            }
        }
        return $result;
    }

    public function auditsExterno(): MorphMany
    {
        return $this->morphMany(Audit::class, 'auditable')->with('user')->where('auditable_type', 'App\Models\Usuario');
    }

    public function setMatriculaAttribute($value)
    {
        if (!is_null($value)) {
            $this->attributes['matricula'] = $value;
        }
    }

    public function canImpersonate()
    {
        // For example
        return $this->is_admin == 1;
    }

    public function impersonateGuard()
    {
        return 'sanctum';
    }

    public static function getTiposIndisponibilidades()
    {
        return [
            '1' => 'Art 10, §2º, INC SEGES/SPGRT nº 24/2024- Primeiro ano do Estágio Probatório.',
            '2' => 'Art 10, §3º, INC SEGES/SPGRT nº 24/2024- Movimentação entre órgãos há menos de 6 (seis) meses.'
        ];
    }
}
