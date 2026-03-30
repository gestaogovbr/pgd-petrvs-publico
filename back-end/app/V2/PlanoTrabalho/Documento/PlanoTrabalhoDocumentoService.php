<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento;

use App\Models\Documento;
use App\Repository\DocumentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use Illuminate\Support\Facades\Session;

class PlanoTrabalhoDocumentoService
{
    private const TCR_TITULO = 'Termo de Ciência e Responsabilidade';
    private const TCR_TIPO = 'HTML';
    private const TCR_ESPECIE = 'TCR';
    private const TCR_STATUS = 'GERADO';

    public function __construct(
        private readonly DocumentoRepository $documentoRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoDocumentoStoreValidator $storeValidator,
    ) {}

    public function store(string $planoTrabalhoId): Documento
    {
        $this->storeValidator->validar($planoTrabalhoId);

        $documentoExistente = $this->documentoRepository->findTcrByPlanoTrabalhoId($planoTrabalhoId);

        if ($documentoExistente !== null) {
            return $documentoExistente;
        }

        $documento = $this->documentoRepository->create([
            'tipo' => self::TCR_TIPO,
            'especie' => self::TCR_ESPECIE,
            'titulo' => self::TCR_TITULO,
            'status' => self::TCR_STATUS,
            'plano_trabalho_id' => $planoTrabalhoId,
            'entidade_id' => Session::get('entidade_id'),
        ]);

        $this->planoTrabalhoRepository->update($planoTrabalhoId, [
            'documento_id' => $documento->id,
        ]);

        return $documento;
    }
}
