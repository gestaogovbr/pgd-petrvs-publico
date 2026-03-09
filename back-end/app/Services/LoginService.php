<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;
use App\Services\FirebaseAuthService;
use App\Services\GoogleService;
use App\Services\CalendarioService;
use App\Services\UsuarioService;
use App\Services\UnidadeService;
use App\Models\Usuario;
use App\Models\Entidade;
use App\Models\Unidade;
use App\Enums\UsuarioSituacaoSiape;
use App\Repository\UsuarioRepository;
use App\Repository\EntidadeRepository;
use App\Repository\UnidadeRepository;
use Exception;
use Throwable;

class LoginService
{
    private const ENTIDADE_RELATIONS = ["feriados", "gestor", "gestorSubstituto"];
    public const KIND_SESSION = "SESSION";
    public const KIND_USERPASSWORD = "USERPASSWORD";
    public const KIND_FIREBASE = "FIREBASE";
    public const KIND_GOOGLE = "GOOGLE";
    public const KIND_AZURE = "AZURE";
    public const KIND_GOVBR = "GOVBR";

    public function __construct(
        protected UsuarioService $usuarioService,
        protected UnidadeService $unidadeService,
        protected FirebaseAuthService $firebaseAuthService,
        protected GoogleService $googleService,
        protected UsuarioRepository $usuarioRepository,
        protected EntidadeRepository $entidadeRepository,
        protected UnidadeRepository $unidadeRepository
    ) {
    }

    public function registrarEntidade(Request $request, bool $session = false): ?Entidade
    {
        if ($session && $request->hasSession() && $request->session()->has('entidade_id')) {
            return $this->findEntidadeById($request->session()->get('entidade_id'));
        }

        $sigla = $this->getEntidadeSigla($request);
        
        if (empty($sigla)) {
            return null;
        }

        $entidade = $this->findEntidadeBySigla($sigla);

        if ($entidade && $request->hasSession()) {
            $request->session()->put("entidade_id", $entidade->id);
        }
        
        return $entidade;
    }

    private function getEntidadeSigla(Request $request): ?string
    {
        return $request->input('entidade') 
            ?? $request->header("X-Entidade") 
            ?? config("petrvs.entidade");
    }

    private function findEntidadeById($id): ?Entidade
    {
        return $this->entidadeRepository->findById($id, self::ENTIDADE_RELATIONS);
    }

    private function findEntidadeBySigla(string $sigla): ?Entidade
    {
        return $this->entidadeRepository->findBySigla($sigla, self::ENTIDADE_RELATIONS);
    }

    public function registrarUsuario(Request $request, ?Usuario $usuario, ?array $update = null): ?Usuario
    {
        if (!$usuario) {
            return null;
        }

        if (!empty($update)) {
            $usuario->update($update);
            $usuario->fresh();
        }

        $entidadeId = $request->session()->get("entidade_id") ?? "";
        $usuario = $this->loadUserWithRelations($usuario->id, $entidadeId);

        if ($usuario) {
            $this->updateSessionUnidade($request, $usuario);
        }

        return $usuario;
    }

    private function loadUserWithRelations(string $userId, $entidadeId): ?Usuario
    {
        return $this->usuarioRepository->loadUserWithRelations($userId, $entidadeId);
    }

    private function updateSessionUnidade(Request $request, Usuario $usuario): void
    {
        $config = $usuario->config ?? [];
        $request->session()->put("unidade_id", $config['unidade_id'] ?? $usuario->lotacao?->unidade_id);
    }

    public function loggedUser(): ?Usuario
    {
        return Auth::user();
    }

    private function isStatelessSanctum(Request $request): bool
    {
        return (bool) optional($request->user())->currentAccessToken();
    }

    private function forceWebGuard(): void
    {
        Auth::shouldUse('web');
    }

    public function selecionaUnidade(array $data, Request $request): array
    {
        $this->forceWebGuard();

        if (!Auth::guard('web')->check()) {
            throw new Exception("Usuário não logado");
        }

        $usuario = Auth::guard('web')->user();
        $usuario = $this->checkSwitchUserByMatricula($request, $usuario, $data['matricula'] ?? null);

        $usuario = $this->usuarioRepository->findWithAreaTrabalho($usuario->id, $data['unidade_id']);

        if (empty($usuario->areasTrabalho[0]->id)) {
            throw new Exception("Unidade não encontrada no usuário");
        }

        $this->updateUserUnidadeConfig($request, $usuario, $data['unidade_id']);

        return [
            'status'  => 'OK',
            'unidade' => $this->unidadeRepository->findById($data['unidade_id']),
        ];
    }

    private function checkSwitchUserByMatricula(Request $request, Usuario $currentUser, ?string $matricula): Usuario
    {
        if (empty($matricula)) {
            return $currentUser;
        }

        $usuarioMatricula = $this->usuarioRepository->findByMatricula($matricula);

        if ($usuarioMatricula && $usuarioMatricula->id !== $currentUser->id) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            Auth::guard('web')->loginUsingId($usuarioMatricula->id, remember: false);
            $request->session()->regenerate();

            return $usuarioMatricula;
        }

        return $currentUser;
    }

    private function updateUserUnidadeConfig(Request $request, Usuario $usuario, string $unidadeId): void
    {
        $request->session()->put('unidade_id', $unidadeId);
        $config = $usuario->config ?? [];
        $config['unidade_id'] = $unidadeId;
        $usuario->config = $config;
        $usuario->save();
    }

    public function horarioUnidade(Request $request): string
    {
        if (!Auth::check()) {
            throw new Exception("Usuário não logado");
        }

        $unidadeId = $request->session()->get("unidade_id");
        
        if (empty($unidadeId)) {
            throw new Exception("Usuário sem unidade selecionada");
        }

        return $this->unidadeService->hora($unidadeId);
    }

    public function logout(Request $request): void
    {
        $usuario = $this->loggedUser();

        if ($usuario && $this->isStatelessSanctum($request)) {
            optional($usuario->currentAccessToken())->delete();
            return;
        }

        $this->forceWebGuard();
        
        if (Auth::guard('web')->check()) {
            Auth::guard('web')->logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    private function findUser(string $type, string $value): ?Usuario
    {
        if ($type === 'cpf') {
            return $this->findUserByCpf($value);
        }

        if ($type === 'email') {
            return $this->findUserByEmail($value);
        }

        return null;
    }

    private function findUserByCpf(string $cpf): ?Usuario
    {
        $usuario = $this->usuarioRepository->findActiveByCpf($cpf);

        if ($usuario) {
            return $usuario;
        }

        return $this->usuarioRepository->findByCpf($cpf);
    }

    private function findUserByEmail(string $email): ?Usuario
    {
        $usuario = $this->usuarioRepository->findByEmail($email);

        if (!$usuario || $usuario->situacao_siape !== UsuarioSituacaoSiape::INATIVO->value) {
            return $usuario;
        }

        $activeUser = $this->usuarioRepository->findActiveByCpf($usuario->cpf);

        return $activeUser ?? $usuario;
    }

    public function authenticateSession(Request $request)
    {
        $this->forceWebGuard();

        if (Auth::guard('web')->check()) {
            return $this->handleSessionLogin($request);
        }

        $autoLoginEmail = config("petrvs.auto-login");
        if (!empty($autoLoginEmail)) {
            return $this->handleAutoLogin($request, $autoLoginEmail);
        }

        throw new Exception("Sessão não encontrada");
    }

    private function handleSessionLogin(Request $request)
    {
        $entidade = $this->registrarEntidade($request, true);
        $usuario = $this->registrarUsuario($request, $this->loggedUser());
        
        if (!$usuario) {
            throw new Exception("Usuário inativo no SIAPE. Acesso negado.");
        }

        return $this->prepareLoginResponse($request, $usuario, $entidade, $request->session()->get("kind"));
    }

    private function handleAutoLogin(Request $request, string $email)
    {
        $usuario = $this->findUser('email', $email);

        if ($usuario && Auth::guard('web')->loginUsingId($usuario->id)) {
            $request->session()->regenerate();
            $request->session()->put("kind", self::KIND_SESSION);
            
            return $this->handleSuccessfulLogin($request, $usuario, self::KIND_SESSION);
        }

        throw new Exception("Usuário não encontrado");
    }

    public function authenticateUserPassword(array $credentials, Request $request)
    {
        if (!Auth::attempt($credentials)) {
            throw new Exception("As credenciais fornecidas são inválidas.");
        }

        $this->ensureActiveUser(Auth::user());

        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_USERPASSWORD);
        
        return $this->handleSuccessfulLogin($request, $this->loggedUser(), self::KIND_USERPASSWORD);
    }

    private function ensureActiveUser(Usuario $user): void
    {
        if ($user->situacao_siape !== UsuarioSituacaoSiape::INATIVO->value) {
            return;
        }

        $activeUser = $this->findUserByCpf($user->cpf);
        
        if ($activeUser && $activeUser->id !== $user->id) {
            Auth::login($activeUser);
        }
    }

    public function authenticateFirebaseToken(array $credentials, Request $request)
    {
        $tokenData = $this->firebaseAuthService->verifyFirebaseToken($credentials['token']);

        if (isset($tokenData['error'])) {
            throw new Exception("As credenciais fornecidas são inválidas: " . json_encode($tokenData));
        }

        $usuario = $this->findUser('email', $tokenData['email']);

        if (!$usuario) {
            throw new Exception("Usuário inativo no SIAPE. Acesso negado.");
        }

        if (!Auth::loginUsingId($usuario->id)) {
             throw new Exception("Erro ao realizar login.");
        }

        $this->usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_FIREBASE, $usuario, $tokenData["picture"]);
        
        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_FIREBASE);

        return $this->handleSuccessfulLogin($request, $usuario, self::KIND_FIREBASE);
    }

    public function authenticateGoogleToken(array $credentials, Request $request)
    {
        $tokenData = $this->googleService->verifyToken($credentials['token']);

        if (isset($tokenData['error'])) {
            throw new Exception("As credenciais fornecidas são inválidas: " . json_encode($tokenData));
        }

        $usuario = $this->findUser('email', $tokenData['email']);

        if (!$usuario) {
            throw new Exception("Usuário inativo no SIAPE. Acesso negado.");
        }

        if (!Auth::loginUsingId($usuario->id)) {
            throw new Exception("Erro ao realizar login.");
        }

        $this->usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
        
        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_GOOGLE);

        return $this->handleSuccessfulLogin($request, $usuario, self::KIND_GOOGLE);
    }

    public function authenticateApiSession(Request $request)
    {
        if (!Auth::check()) {
            throw new Exception("Sessão não encontrada");
        }

        $user = $this->loggedUser();
        $entidade = $this->registrarEntidade($request, true);
        $usuario = $this->registrarUsuario($request, $user);

        return [
            "token" => $user->currentAccessToken()->plainTextToken ?? $request->bearerToken(),
            "kind" => $request->session()->get("kind"),
            "entidade" => $entidade,
            "usuario" => $usuario,
            "horario_servidor" => CalendarioService::horarioServidor()
        ];
    }

    public function authenticateApiUserPassword(array $credentials, Request $request)
    {
        $usuario = $this->usuarioRepository->findByEmail($credentials['email']);

        if (!$usuario || !Hash::check($credentials['password'], $usuario->password)) {
            throw new Exception("As credenciais fornecidas são inválidas.");
        }

        $usuario = $this->findUser('email', $credentials['email']);
        
        if ($usuario->situacao_siape == UsuarioSituacaoSiape::INATIVO->value) {
            throw new Exception("Usuário inativo.");
        }

        $entidade = $this->registrarEntidade($request);
        $usuario = $this->registrarUsuario($request, $usuario);

        return [
            'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
            'entidade' => $entidade,
            'usuario' => $usuario,
            "horario_servidor" => CalendarioService::horarioServidor()
        ];
    }

    public function authenticateApiFirebaseToken(array $credentials, Request $request)
    {
        $tokenData = $this->firebaseAuthService->verifyFirebaseToken($credentials['token']);

        if (isset($tokenData['error'])) {
            throw new Exception("As credenciais fornecidas são inválidas: " . json_encode($tokenData));
        }

        $usuario = $this->findUser('email', $tokenData['email']);

        if (!$usuario) {
            throw new Exception("Usuário não encontrado.");
        }

        if ($usuario->situacao_siape == UsuarioSituacaoSiape::INATIVO->value) {
            throw new Exception("Usuário inativo.");
        }

        $this->usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_FIREBASE, $usuario, $tokenData["picture"]);
        
        $request->session()->put("kind", self::KIND_FIREBASE);
        $entidade = $this->registrarEntidade($request);
        $usuario = $this->registrarUsuario($request, $usuario);

        return [
            'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
            'entidade' => $entidade,
            'usuario' => $usuario,
            "horario_servidor" => CalendarioService::horarioServidor()
        ];
    }

    public function authenticateApiGoogleToken(array $credentials, Request $request)
    {
        $tokenData = $this->googleService->verifyToken($credentials['token']);

        if (isset($tokenData['error'])) {
             throw new Exception("As credenciais fornecidas são inválidas: " . json_encode($tokenData));
        }

        $usuario = $this->findUser('email', $tokenData['email']);

        if (!$usuario) {
             throw new Exception("Usuário não encontrado.");
        }

        $this->usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
        
        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_GOOGLE);
        
        $entidade = $this->registrarEntidade($request);
        $usuario = $this->registrarUsuario($request, $usuario);

        return [
            'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
            'entidade' => $entidade,
            'usuario' => $usuario,
            "horario_servidor" => CalendarioService::horarioServidor()
        ];
    }

    public function validateApiFirebaseToken($token)
    {
        return $this->firebaseAuthService->verifyFirebaseToken($token);
    }

    public function validateApiToken()
    {
        return [
            "valid" => Auth::check()
        ];
    }

    public function azureProvider($config = null)
    {
        if ($config) {
            /**
             * @disregard P1013 Undefined method
             * @phpstan-ignore-next-line
             */
            return Socialite::driver('azure')->setConfig($config);
        }
        return Socialite::driver('azure');
    }

    public function getConfigAzure($url_dinamica_callback = null): \SocialiteProviders\Manager\Config
    {
        return new \SocialiteProviders\Manager\Config(
            config("services.azure.client_id"),
            config("services.azure.client_secret"),
            $url_dinamica_callback,
            ['tenant' => config("services.azure.tenant")]
        );
    }

    public function govBrProvider($config = null)
    {
        if ($config) {
            /**
             * @disregard P1013 Undefined method
             * @phpstan-ignore-next-line
             */
            return Socialite::driver('govbr')->setConfig($config);
        }
        return Socialite::driver('govbr');
    }

    public function getConfigGovBr($url_dinamica_callback, $dados): \SocialiteProviders\Manager\Config
    {
        return new \SocialiteProviders\Manager\Config(
            config("services.govbr.client_id"),
            config("services.govbr.client_secret"),
            $url_dinamica_callback,
            [
                'environment' => config("services.govbr.environment"),
                'code' => $dados['code'] ?? null,
                'state' => $dados['state'] ?? null,
                'code_verifier' => $dados['code_verifier'] ?? null,
                'code_challenge' => $dados['code_challenge'] ?? null,
                'code_challenge_method' => $dados['code_challenge_method'] ?? null
            ]
        );
    }

    public function stimulusRouteGovBr()
    {
        $response = Http::get('sso.acesso.gov.br/token');
        if ($response->unauthorized() != 401) {
            throw new Exception('Falha de conexão ao GovBR.');
        }
        return $response;
    }

    private function prepareLoginResponse(Request $request, Usuario $usuario, ?Entidade $entidade, ?string $kind)
    {
        return [
            "success" => true,
            "kind" => $kind,
            "usuario" => $usuario,
            "entidade" => $entidade,
            "horario_servidor" => CalendarioService::horarioServidor()
        ];
    }

    private function handleSuccessfulLogin(Request $request, Usuario $usuario, string $kind, ?Entidade $entidade = null)
    {
        $entidade = $entidade ?? $this->registrarEntidade($request);
        $usuario = $this->registrarUsuario($request, $usuario);
        
        if (!$usuario) {
            throw new Exception("Usuário inativo no SIAPE. Acesso negado.");
        }

        return $this->prepareLoginResponse($request, $usuario, $entidade, $kind);
    }

    public function signInAzureCallback(Request $request)
    {
        $entidade = $this->registrarEntidade($request);
        $urlCallback = config("app.url") . "/api/login-azure-callback/" . $entidade->sigla;
        $config = $this->getConfigAzure($urlCallback);
        
        $user = $this->azureProvider($config)->user();

        if (empty($user)) {
            // Return null or indication to redirect
            return null;
        }

        $email = explode("#", $user->email)[0];
        $usuario = $this->findUser('email', $email);

        if (!$usuario) {
            throw new Exception("Usuário inativo no SIAPE. Acesso negado.");
        }

        Auth::loginUsingId($usuario->id);
        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_AZURE);
        
        return $this->handleSuccessfulLogin($request, $usuario, self::KIND_AZURE, $entidade);
    }

    public function signInGovBrCallback(Request $request)
    {
        $entidade = $this->registrarEntidade($request);
        $urlCallback = config("services.govbr.redirect") . $entidade->sigla;
        $dados = [
            "code" => $request->code,
            "state" => $request->state,
            "code_verifier" => config("services.govbr.code_verifier")
        ];
        
        $config = $this->getConfigGovBr($urlCallback, $dados);
        $this->stimulusRouteGovBr();
        
        $user = $this->govBrProvider($config)->stateless()->user();

        if (empty($user)) {
             // Return null or indication to redirect
             return null;
        }

        $cpf = $user->cpf;
        $usuario = $this->findUser('cpf', $cpf);

        if (!$usuario) {
            throw new Exception("Usuário inativo no SIAPE. Acesso negado.");
        }

        Auth::loginUsingId($usuario->id);
        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_GOVBR);
        
        return $this->handleSuccessfulLogin($request, $usuario, self::KIND_GOVBR, $entidade);
    }
}
