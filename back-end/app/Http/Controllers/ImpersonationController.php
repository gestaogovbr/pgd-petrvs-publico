<?php

namespace App\Http\Controllers;

use App\Models\Entidade;
use App\Services\CalendarioService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Lab404\Impersonate\Services\ImpersonateManager;

class ImpersonationController extends Controller
{
    /**
     * Iniciar impersonação e gerar token Sanctum
     */
    public function impersonate(Request $request): JsonResponse
    {
        /** @var Usuario|null $authenticated */
        $authenticated = Auth::guard('sanctum')->user();

        if (!$authenticated) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        $manager = app(ImpersonateManager::class);
        $operator = $this->resolveImpersonationOperator($authenticated, $manager);

        if (!$operator || !$operator->canImpersonate()) {
            return response()->json(['error' => 'Você não tem permissão para impersonar usuários.'], 403);
        }

        $usuario = Usuario::findOrFail($request->user_id);

        if ($usuario->id === $operator->id) {
            return response()->json(['error' => 'Não é possível personificar a si mesmo.'], 400);
        }

        $rootOperatorId = session('original_user_id', $operator->id);

        if ($manager->isImpersonating()) {
            $manager->leave();
        }

        $token = $usuario->createToken('Impersonation')->plainTextToken;

        $authenticated->tokens()->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        session(['original_user_id' => $rootOperatorId]);

        $operator->impersonate($usuario, 'web');
        $request->session()->put('kind', 'SESSION');

        $entidade = $this->registrarEntidade($request);
        $usuario = $this->registrarUsuario($request, $usuario);

        return response()->json([
            'success' => true,
            'token' => $token,
            'kind' => session('kind'),
            'usuario' => $usuario,
            'entidade' => $entidade,
            'horario_servidor' => CalendarioService::horarioServidor(),
        ]);
    }

    /**
     * Encerrar impersonação e retornar ao admin original
     */
    public function stopImpersonating(): JsonResponse
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user || !$user->isImpersonated()) {
            return response()->json(['error' => 'Você não está impersonando nenhum usuário.'], 400);
        }

        $originalUserId = session('original_user_id');
        session()->forget('original_user_id');

        $admin = $originalUserId
            ? Usuario::find($originalUserId)
            : app(ImpersonateManager::class)->getImpersonator();

        if (!$admin instanceof Usuario) {
            return response()->json(['error' => 'Não foi possível recuperar o usuário original.'], 400);
        }

        $user->leaveImpersonation();
        $admin->tokens()->delete();

        $token = $admin->createToken('AdminToken')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Você voltou à sua conta original.',
            'token' => $token,
        ]);
    }

    /**
     * Usuário que iniciou (ou mantém) a cadeia de personificação — não o personificado atual.
     */
    private function resolveImpersonationOperator(Usuario $authenticated, ImpersonateManager $manager): ?Usuario
    {
        $originalUserId = session('original_user_id');
        if ($originalUserId) {
            $original = Usuario::find($originalUserId);
            if ($original instanceof Usuario) {
                return $original;
            }
        }

        if ($manager->isImpersonating()) {
            $impersonator = $manager->getImpersonator();
            if ($impersonator instanceof Usuario) {
                return $impersonator;
            }
        }

        return $authenticated;
    }

    private function registrarEntidade($request, $session = false)
    {
        $with = ['feriados', 'gestor', 'gestorSubstituto'];
        $entidade = $session ? Entidade::with($with)->find($request->session()->put('entidade_id')) : null;
        $sigla = $request->has('entidade') ? $request->input('entidade') : ($request->headers->has('X-Entidade') ? $request->headers->get('X-Entidade') : config('petrvs')['entidade']);
        if (empty($entidade) && !empty($sigla)) {
            $entidade = Entidade::with($with)->where('sigla', $sigla)->first();
            $request->session()->put('entidade_id', $entidade->id);
        }
        return $entidade;
    }

    private function registrarUsuario($request, $usuario, $update = null)
    {
        if (isset($usuario)) {
            if (isset($update) && count($update) > 0) {
                $usuario->update($update);
                $usuario->fresh();
            }
            $entidadeId = $request->session()->has('entidade_id') ? $request->session()->get('entidade_id') : null;
            $usuario = Usuario::where('id', $usuario->id)->with([
                'areasTrabalho' => function ($query) use ($entidadeId) {
                    $query->with(['unidade.gestor.usuario', 'unidade.gestoresSubstitutos.usuario', 'unidade.gestoresDelegados.usuario', 'unidade.cidade', 'unidade.planosEntrega', 'unidade.unidadePai.planosEntrega', 'atribuicoes'])->whereHas('unidade', function ($query) use ($entidadeId) {
                        return $query->where('entidade_id', '=', $entidadeId);
                    });
                },
                'participacoesProgramas' => function ($query) {
                    $query->where('habilitado', 1);
                },
                'perfil.capacidades:id,perfil_id,tipo_capacidade_id',
                'perfil.capacidades.tipoCapacidade:id,codigo',
                'gerenciaTitular.atribuicoes',
                'gerenciaTitular.unidade',
                'gerenciasSubstitutas.atribuicoes',
                'gerenciasSubstitutas.unidade',
                'gerenciasDelegadas.atribuicoes',
                'gerenciasDelegadas.unidade',
                'notificacoesDestinatario' => function ($query) {
                    $query->where('data_leitura', null);
                },
            ])->first();
            $request->session()->put('unidade_id', $usuario->lotacao?->unidade_id);
        }
        return $usuario;
    }
}
