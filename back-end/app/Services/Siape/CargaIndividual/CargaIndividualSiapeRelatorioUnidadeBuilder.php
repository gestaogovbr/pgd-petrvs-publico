<?php

declare(strict_types=1);

namespace App\Services\Siape\CargaIndividual;

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Services\IntegracaoService;

class CargaIndividualSiapeRelatorioUnidadeBuilder
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UnidadeIntegranteRepository $unidadeIntegranteRepository,
        private readonly UsuarioRepository $usuarioRepository,
        private readonly CargaIndividualSiapeCampoComparator $comparator,
    ) {
    }

    /**
     * @param array<string, mixed> $dadosSiape
     * @return array<int, array<string, mixed>>
     */
    public function construir(array $dadosSiape, string $codigo): array
    {
        $codigoSiape = $this->normalizarCodigo((string) ($dadosSiape['codUorg'] ?? $codigo));
        $unidade = $this->unidadeRepository->findByCodigoWithPai($codigoSiape);
        $paiSiape = $this->normalizarCodigo((string) ($dadosSiape['codUorgPai'] ?? ''));
        $unidadeRaiz = $paiSiape === (string) IntegracaoService::CODIGO_SIAPE_UNIDADE_RAIZ_PELO_PAI;

        $campos = [
            $this->comparator->comparar('codUorg', 'Codigo da unidade', $codigoSiape, $unidade?->codigo),
            $unidadeRaiz
                ? $this->comparator->comparar('codUorgPai', 'Unidade superior', 'Unidade raiz (' . $paiSiape . ')', 'Unidade raiz', true)
                : $this->comparator->comparar('codUorgPai', 'Unidade superior', $paiSiape ?: null, $unidade?->unidadePai?->codigo),
            $this->comparator->comparar('nomeExtendido', 'Nome da unidade', $dadosSiape['nomeExtendido'] ?? null, $unidade?->nome),
            $this->comparator->comparar('siglaUorg', 'Sigla da unidade', $dadosSiape['siglaUorg'] ?? null, $unidade?->sigla),
            $this->comparator->comparar('dataUltimaTransacao', 'Ultima atualizacao no SIAPE', $dadosSiape['dataUltimaTransacao'] ?? null, $unidade?->data_modificacao, $unidade?->data_modificacao === null),
            $this->comparator->comparar('cpfTitularAutoridadeUorg', 'Chefia titular', $dadosSiape['cpfTitularAutoridadeUorg'] ?? null, $this->cpfGestorTitular($unidade)),
        ];

        return [[
            'titulo' => 'Dados da unidade',
            'tipo' => 'unidade',
            'campos' => $campos,
        ]];
    }

    private function cpfGestorTitular(?Unidade $unidade): ?string
    {
        if (!$unidade instanceof Unidade) {
            return null;
        }

        $integrante = $this->unidadeIntegranteRepository->findGestorByUnidade((string) $unidade->id);

        $usuario = $integrante instanceof UnidadeIntegrante
            ? $this->usuarioRepository->findById((string) $integrante->usuario_id)
            : null;

        return $usuario instanceof Usuario
            ? $this->somenteNumeros($usuario->cpf)
            : null;
    }

    private function normalizarCodigo(string $codigo): string
    {
        return ltrim(preg_replace('/\D/', '', $codigo) ?? '', '0') ?: $codigo;
    }

    private function somenteNumeros(?string $valor): ?string
    {
        $digitos = preg_replace('/\D/', '', (string) $valor);

        return is_string($digitos) && $digitos !== '' ? $digitos : null;
    }
}
