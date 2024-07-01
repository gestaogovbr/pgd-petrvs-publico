<?php

namespace App\Models;

use ReflectionObject;
use Illuminate\Support\Str;
use App\Traits\MergeRelations;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class PainelUsuario extends Authenticatable
{
    use Notifiable;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        // Define a conexão do modelo com base na configuração 'database.default'
        $this->connection = env('DB_CONNECTION', 'mysql');
    }
    protected $table = 'users_panel';
    protected $fillable = [
        'nome',
        'email',
        'cpf',
        'password',
        'nivel'
    ];

    public $fillable_relations = ["tenants"];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public $delete_cascade = ['tenants'];

    public function assignTenants($tenantIds)
    {
        $this->tenants()->sync($tenantIds);
    }

    // Has
    public function tenants()
    {
        return $this->belongsToMany(Tenant::class, 'users_panel_tenants', 'users_panel_id');
    }

    public function deleteCascade()
    {
    foreach ($this->delete_cascade as $relationName)
    {
        $relation = $this->{Str::camel($relationName)}();
        $relationType = (new ReflectionObject($relation))->getShortName();

        if (in_array($relationType, ["HasMany", "HasOne"]))
        {
        $relatedModel = $relation->getRelated();
        $children = $relatedModel::where($relation->getForeignKeyName(), $this->id)->get();
        foreach ($children as $child)
        {
            if (method_exists($child, 'deleteCascade')) {
                $retorno = $child->deleteCascade();
            }
        }
        }
    }

    $this->delete();
    }
}
