<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;
class Audit extends Model implements AuditableContract
{
    use Auditable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'audits';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',       // Usuário que realizou a alteração
        'event',         // Tipo de evento (created, updated, deleted)
        'auditable_type', // Tipo do modelo alterado
        'auditable_id',   // ID do modelo alterado
        'old_values',    // Valores anteriores (JSON)
        'new_values',    // Novos valores (JSON)
        'url',           // URL onde ocorreu a ação
        'ip_address',    // IP do usuário
        'user_agent',    // User Agent do navegador
        'tags',          // Tags opcionais
    ];

    protected $appends = ['details', 'performed_by', 'table_type'];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
    ];

    /**
     * Relationship with User model.
     */
    public function user()
    {
        return $this->belongsTo(Usuario::class);
    }

    /**
     * Relationship with the auditable model.
     */
    public function auditable()
    {
        return $this->morphTo();
    }

    public function getTableTypeAttribute()
    {
        return class_basename($this->auditable_type);
    }


    public function getPerformedByAttribute()
    {
        return optional($this->user)->nome ?? 'N/A';
    }

    public function getDetailsAttribute()
    {
        switch ($this->event) {
            case 'created':
                return ['created' => $this->new_values];

            case 'updated':
                $changes = [];
                foreach ($this->new_values as $key => $newValue) {
                    $oldValue = $this->old_values[$key] ?? null;
                    if ($oldValue !== $newValue) {
                        $changes[$key] = [
                            'old' => $oldValue,
                            'new' => $newValue,
                        ];
                    }
                }
                return ['changes' => $changes];

            case 'deleted':
                return ['deleted' => $this->old_values];

            default:
                return [];
        }
    }
    protected function createdAt(): Attribute
    {
        return Attribute::get(fn ($value) => Carbon::parse($value)->timezone('America/Sao_Paulo')->format('d/m/Y - H:i:s'));
    }
}
