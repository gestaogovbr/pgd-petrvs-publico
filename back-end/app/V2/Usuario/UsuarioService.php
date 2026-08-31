<?php

namespace App\V2\Usuario;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\Usuario;
use App\Repository\UsuarioRepository;
use App\Services\IntegracaoService;
use App\Services\UnidadeIntegranteService;
use App\V2\Usuario\DTOs\UsuarioAtribuicoesDTO;
use App\V2\Usuario\DTOs\UsuarioDadosPessoaisDTO;
use App\V2\Usuario\DTOs\UsuarioStoreDTO;
use App\V2\Usuario\Validators\UsuarioShowAuthorizationValidator;
use App\V2\Usuario\Validators\UsuarioStoreValidator;
use App\V2\Usuario\Validators\UsuarioUpdateAuthorizationValidator;
use App\V2\Usuario\Validators\UsuarioUpdateValidator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UsuarioService
{
    private const CAPACIDADE_INCLUIR_USUARIO = 'MOD_USER_INCL';

    public function __construct(
        protected UsuarioRepository $usuarioRepository,
        protected UsuarioUpdateAuthorizationValidator $authorizationValidator,
        protected UsuarioShowAuthorizationValidator $showAuthorizationValidator,
        protected UsuarioUpdateValidator $updateValidator,
        protected UsuarioStoreValidator $storeValidator,
        protected UnidadeIntegranteService $unidadeIntegranteService,
        protected IntegracaoService $integracaoService,
    ) {}

    public function store(UsuarioStoreDTO $dto): Usuario
    {
        $editor = $this->getUsuarioLogado();

        if (!$editor->hasPermissionTo(self::CAPACIDADE_INCLUIR_USUARIO)) {
            throw new ForbiddenException('Seu perfil não permite incluir usuários.');
        }

        $usuarioExistente = $this->storeValidator->validar($dto);

        return DB::transaction(function () use ($dto, $usuarioExistente) {
            if ($usuarioExistente !== null) {
                return $this->restaurarUsuario($usuarioExistente, $dto);
            }

            return $this->criarNovoUsuario($dto);
        });
    }

    public function updateDadosPessoais(string $usuarioId, UsuarioDadosPessoaisDTO $dto): Usuario
    {
        $alvo = $this->findUsuarioOrFail($usuarioId);
        $editor = $this->getUsuarioLogado();

        $this->authorizationValidator->validarEscopo($editor, $alvo);

        $dados = (bool) $alvo->usuario_externo ? $dto->toArray() : $dto->toArrayInterno();

        $this->usuarioRepository->update($usuarioId, $dados);

        return $this->usuarioRepository->findById($usuarioId);
    }

    public function updateTextoComplementar(string $usuarioId, ?string $texto): Usuario
    {
        $alvo = $this->findUsuarioOrFail($usuarioId);
        $editor = $this->getUsuarioLogado();

        $this->authorizationValidator->validarEscopo($editor, $alvo);

        $this->usuarioRepository->update($usuarioId, ['texto_complementar_plano' => $texto]);

        return $this->usuarioRepository->findById($usuarioId);
    }

    public function updatePerfil(string $usuarioId, string $perfilId): Usuario
    {
        $alvo = $this->findUsuarioOrFail($usuarioId);
        $editor = $this->getUsuarioLogado();

        $this->authorizationValidator->validarEscopo($editor, $alvo);
        $this->authorizationValidator->validarAlteracaoPerfil($editor, $alvo, $perfilId);
        $this->updateValidator->validarPerfil($perfilId, $alvo);

        $this->usuarioRepository->update($usuarioId, ['perfil_id' => $perfilId]);

        return $this->usuarioRepository->findById($usuarioId);
    }

    /** @todo Desacoplar de UnidadeIntegranteService V1 (ServiceBase) — extrair persistência de atribuições para repository V2 */
    public function updateAtribuicoes(UsuarioAtribuicoesDTO $dto): Usuario
    {
        $alvo = $this->findUsuarioOrFail($dto->usuarioId);
        $editor = $this->getUsuarioLogado();

        $this->authorizationValidator->validarEscopo($editor, $alvo);
        $this->updateValidator->validarAtribuicoes($dto->atribuicoes, (bool) $alvo->usuario_externo);

        return DB::transaction(function () use ($dto) {
            /** @todo V1 delegation — substituir por repository V2 */
            $this->unidadeIntegranteService->salvarIntegrantes($dto->toVinculos(), false);

            return $this->usuarioRepository->findById($dto->usuarioId);
        });
    }

    public function updateNomeSocial(string $usuarioId, ?string $nomeSocial): void
    {
        $this->usuarioRepository->update($usuarioId, ['nome_social' => $nomeSocial]);
    }

    public function searchByNomeMatricula(string $nomeMatricula, string $cadastranteId): Collection
    {
        $solicitante = $this->getUsuarioLogado();

        if (!$solicitante->hasPermissionTo('MOD_USER_VIS')) {
            return new Collection();
        }

        return $this->usuarioRepository->findAgentesPublicosNoEscopoCadastrante($nomeMatricula, $cadastranteId);
    }

    public function show(string $usuarioId): Usuario
    {
        $alvo = $this->findUsuarioOrFail($usuarioId);
        $solicitante = $this->getUsuarioLogado();

        $this->showAuthorizationValidator->validarEscopo($solicitante, $alvo);

        return $alvo;
    }

    public function unidadesVinculadasPorCpf(string $cpf): Collection
    {
        $alvos = $this->usuarioRepository->findAllByCpf($cpf);

        if ($alvos->isEmpty()) {
            throw new NotFoundException('Usuário não encontrado para o CPF informado.');
        }

        $solicitante = $this->getUsuarioLogado();
        $this->showAuthorizationValidator->validarEscopoParaAlgumAlvo($solicitante, $alvos);

        return $this->usuarioRepository->getUnidadesVinculadas($cpf);
    }

    private function restaurarUsuario(Usuario $existente, UsuarioStoreDTO $dto): Usuario
    {
        /** @todo V1 delegation — substituir por lógica própria V2 */
        $this->integracaoService->liberarEmailDuplicadoDefinindoComoNulo($dto->email, $dto->matricula, $existente->id);
        $this->usuarioRepository->removerVinculos($existente->id);
        $this->usuarioRepository->restore($existente->id);
        $this->usuarioRepository->update($existente->id, $dto->toArray());

        $this->salvarAtribuicoes($existente->id, $dto->atribuicoes);

        return $this->usuarioRepository->findById($existente->id);
    }

    private function criarNovoUsuario(UsuarioStoreDTO $dto): Usuario
    {
        $usuario = $this->usuarioRepository->create($dto->toArray());

        $this->salvarAtribuicoes($usuario->id, $dto->atribuicoes);

        return $this->usuarioRepository->findById($usuario->id);
    }

    /** @todo V1 delegation — substituir por repository V2 */
    private function salvarAtribuicoes(string $usuarioId, array $atribuicoes): void
    {
        $vinculos = array_map(
            fn (array $item) => array_merge($item, ['usuario_id' => $usuarioId]),
            $atribuicoes
        );

        $this->unidadeIntegranteService->salvarIntegrantes($vinculos, false);
    }

    private function findUsuarioOrFail(string $usuarioId): Usuario
    {
        $usuario = $this->usuarioRepository->findById($usuarioId);

        if ($usuario === null) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        return $usuario;
    }

    private function getUsuarioLogado(): Usuario
    {
        $usuario = $this->usuarioRepository->findByIdComAreasTrabalho(Auth::id());

        if ($usuario === null) {
            throw new NotFoundException('Usuário logado não encontrado.');
        }

        $usuario->loadMissing('perfil');

        return $usuario;
    }
}
