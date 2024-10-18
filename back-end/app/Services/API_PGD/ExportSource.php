<?php
namespace App\Services\API_PGD;

class ExportSource
{
    public string $tipo;
    public string $id;
    public string $fonte;
    public ?array $auditIds;

    public function __construct(string $tipo, string $id, string $fonte, $json_audit = null) {
        $this->tipo = $tipo;
        $this->id = $id;
        $this->fonte = $fonte;

        if ($json_audit) {
            $this->auditIds = json_decode($json_audit);
        } else {
            $this->auditIds = null;
        }
    }
}

