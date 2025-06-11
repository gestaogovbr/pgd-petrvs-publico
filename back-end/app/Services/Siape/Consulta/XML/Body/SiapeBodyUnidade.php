<?php
namespace App\Services\Siape\Consulta\XML\Body;

class SiapeBodyUnidade extends SiapeBody
{
    public function __construct(string $siapeCodUorg)
    {
        parent::__construct('ser:dadosUorg');

        $this->root->addChild('codUorg', $siapeCodUorg);
    }
}