<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use App\Exceptions\LogError;
use App\Services\FirebaseAuthService;
use App\Services\GoogleService;
use App\Services\CalendarioService;
use App\Services\UsuarioService;
use App\Services\UnidadeService;
use App\Models\Usuario;
use App\Models\Entidade;
use App\Models\Unidade;
use App\Enums\UsuarioSituacaoSiape;
use Exception;
use Throwable;

class LoginController extends Controller
{
    private const ENTIDADE_RELATIONS = ["feriados", "gestor", "gestorSubstituto"];
    private const KIND_SESSION = "SESSION";
    private const KIND_USERPASSWORD = "USERPASSWORD";
    private const KIND_FIREBASE = "FIREBASE";
    private const KIND_GOOGLE = "GOOGLE";
    private const KIND_AZURE = "AZURE";
    private const KIND_GOVBR = "GOVBR";

    public function __construct(
        protected UsuarioService $usuarioService,
        protected UnidadeService $unidadeService
    ) {
    }

    private function registrarEntidade(Request $request, bool $session = false): ?Entidade
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
        return Entidade::with(self::ENTIDADE_RELATIONS)->find($id);
    }

    private function findEntidadeBySigla(string $sigla): ?Entidade
    {
        return Entidade::with(self::ENTIDADE_RELATIONS)->where("sigla", $sigla)->first();
    }

    private function registrarUsuario(Request $request, ?Usuario $usuario, ?array $update = null): ?Usuario
    {
        if (!$usuario) {
            return null;
        }

        if (!empty($update)) {
            $usuario->update($update);
            $usuario->fresh();
        }

        $entidadeId = $request->session()->get("entidade_id");
        $usuario = $this->loadUserWithRelations($usuario->id, $entidadeId);

        if ($usuario) {
            $this->updateSessionUnidade($request, $usuario);
        }

        return $usuario;
    }

    private function loadUserWithRelations(string $userId, $entidadeId): ?Usuario
    {
        return Usuario::where("id", $userId)->with([
            "areasTrabalho" => function ($query) use ($entidadeId) {
                $query->with(["unidade.gestor.usuario", "unidade.gestoresSubstitutos.usuario", "unidade.gestoresDelegados.usuario", "unidade.cidade", "unidade.planosEntrega", "unidade.unidadePai.planosEntrega", "atribuicoes"])
                      ->whereHas('unidade', fn($q) => $q->where('entidade_id', $entidadeId));
            },
            "participacoesProgramas" => fn($q) => $q->where("habilitado", 1),
            "perfil.capacidades:id,perfil_id,tipo_capacidade_id",
            "perfil.capacidades.tipoCapacidade:id,codigo",
            "gerenciaTitular.atribuicoes",
            "gerenciaTitular.unidade",
            "gerenciasSubstitutas.atribuicoes",
            "gerenciasSubstitutas.unidade",
            "gerenciasDelegadas.atribuicoes",
            "gerenciasDelegadas.unidade",
            "notificacoesDestinatario" => fn($q) => $q->where('data_leitura', null)
        ])->first();
    }

    private function updateSessionUnidade(Request $request, Usuario $usuario): void
    {
        $config = $usuario->config ?? [];
        $request->session()->put("unidade_id", $config['unidade_id'] ?? $usuario->lotacao?->unidade_id);
    }

    public static function loggedUser(): ?Usuario
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

    public function selecionaUnidade(Request $request)
    {
        $data = $request->validate([
            'unidade_id' => ['required'],
            'matricula'  => ['nullable', 'string'],
        ]);

        $this->forceWebGuard();

        if (!Auth::guard('web')->check()) {
            return LogError::newError('Usuário não logado', new Exception("selecionaUnidade"));
        }

        $usuario = Auth::guard('web')->user();
        $usuario = $this->checkSwitchUserByMatricula($request, $usuario, $data['matricula'] ?? null);

        $usuario = Usuario::where('id', $usuario->id)
            ->with(['areasTrabalho' => fn($q) => $q->where('unidade_id', $data['unidade_id'])])
            ->first();

        if (empty($usuario->areasTrabalho[0]->id)) {
            return LogError::newError('Unidade não encontrada no usuário', new Exception("selecionaUnidade"));
        }

        $this->updateUserUnidadeConfig($request, $usuario, $data['unidade_id']);

        return response()->json([
            'status'  => 'OK',
            'unidade' => Unidade::find($data['unidade_id']),
        ]);
    }

    private function checkSwitchUserByMatricula(Request $request, Usuario $currentUser, ?string $matricula): Usuario
    {
        if (empty($matricula)) {
            return $currentUser;
        }

        $usuarioMatricula = Usuario::where('matricula', $matricula)->first();

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

    public function horarioUnidade(Request $request)
    {
        if (!Auth::check()) {
            return LogError::newError('Usuário não logado', new Exception("horarioUnidade"));
        }

        $unidadeId = $request->session()->get("unidade_id");
        
        if (empty($unidadeId)) {
            return LogError::newError('Usuário sem unidade selecionada', new Exception("horarioUnidade"));
        }

        return response()->json([
            "status" => "OK",
            "hora" => $this->unidadeService->hora($unidadeId)
        ]);
    }

    public function logout(Request $request)
    {
        $usuario = self::loggedUser();

        if ($usuario && $this->isStatelessSanctum($request)) {
            optional($usuario->currentAccessToken())->delete();
            return response()->json(['status' => 'OK']);
        }

        $this->forceWebGuard();
        
        if (Auth::guard('web')->check()) {
            Auth::guard('web')->logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['status' => 'OK']);
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
        $usuario = Usuario::where('cpf', $cpf)
            ->whereIn('situacao_siape', UsuarioSituacaoSiape::ativos())
            ->first();

        if ($usuario) {
            return $usuario;
        }

        return Usuario::where('cpf', $cpf)->first();
    }

    private function findUserByEmail(string $email): ?Usuario
    {
        $usuario = Usuario::where('email', $email)->first();

        if (!$usuario || $usuario->situacao_siape !== UsuarioSituacaoSiape::INATIVO->value) {
            return $usuario;
        }

        $activeUser = Usuario::where('cpf', $usuario->cpf)
            ->whereIn('situacao_siape', UsuarioSituacaoSiape::ativos())
            ->first();

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

        return LogError::newError('Sessão não encontrada', new Exception("authenticateSession"));
    }

    private function handleSessionLogin(Request $request)
    {
        $entidade = $this->registrarEntidade($request, true);
        $usuario = $this->registrarUsuario($request, self::loggedUser());
        
        if (!$usuario) {
            return $this->sendInactiveUserError();
        }

        return $this->sendLoginResponse($request, $usuario, $entidade, $request->session()->get("kind"));
    }

    private function handleAutoLogin(Request $request, string $email)
    {
        $usuario = $this->findUser('email', $email);

        if ($usuario && Auth::guard('web')->loginUsingId($usuario->id)) {
            $request->session()->regenerate();
            $request->session()->put("kind", self::KIND_SESSION);
            
            return $this->handleSuccessfulLogin($request, $usuario, self::KIND_SESSION);
        }

        return LogError::newError('Usuário não encontrado', new Exception("authenticateSession"));
    }

    public function authenticateUserPassword(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return LogError::newError('As credenciais fornecidas são inválidas.', new Exception("authenticateUserPassword"), ["email" => $credentials["email"]]);
        }

        $this->ensureActiveUser(Auth::user());

        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_USERPASSWORD);
        
        return $this->handleSuccessfulLogin($request, self::loggedUser(), self::KIND_USERPASSWORD);
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

    public function authenticateFirebaseToken(Request $request, FirebaseAuthService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required']
        ]);

        $tokenData = $auth->verifyFirebaseToken($credentials['token']);

        if (isset($tokenData['error'])) {
            return LogError::newError('As credenciais fornecidas são inválidas.', new Exception("authenticateFirebaseToken"), $tokenData);
        }

        $usuario = $this->findUser('email', $tokenData['email']);

        if (!$usuario) {
            return $this->sendInactiveUserError();
        }

        if (!Auth::loginUsingId($usuario->id)) {
             return LogError::newError('Erro ao realizar login.', new Exception("authenticateFirebaseToken"));
        }

        $this->usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_FIREBASE, $usuario, $tokenData["picture"]);
        
        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_FIREBASE);

        return $this->handleSuccessfulLogin($request, $usuario, self::KIND_FIREBASE);
    }

    public function authenticateGoogleToken(Request $request, GoogleService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required']
        ]);

        $tokenData = $auth->verifyToken($credentials['token']);

        if (isset($tokenData['error'])) {
            return LogError::newError('As credenciais fornecidas são inválidas.', new Exception("authenticateGoogleToken"), $tokenData);
        }

        $usuario = $this->findUser('email', $tokenData['email']);

        if (!$usuario) {
            return $this->sendInactiveUserError();
        }

        if (!Auth::loginUsingId($usuario->id)) {
            return LogError::newError('Erro ao realizar login.', new Exception("authenticateGoogleToken"));
        }

        $this->usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
        
        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_GOOGLE);

        return $this->handleSuccessfulLogin($request, $usuario, self::KIND_GOOGLE);
    }

    public function authenticateApiSession(Request $request)
    {
        if (!Auth::check()) {
            return LogError::newError('Sessão não encontrada', new Exception("authenticateApiSession"));
        }

        $user = self::loggedUser();
        $entidade = $this->registrarEntidade($request, true);
        $usuario = $this->registrarUsuario($request, $user);

        return response()->json([
            "token" => $user->currentAccessToken()->plainTextToken ?? $request->bearerToken(),
            "kind" => $request->session()->get("kind"),
            "entidade" => $entidade,
            "usuario" => $usuario,
            "horario_servidor" => CalendarioService::horarioServidor()
        ]);
    }

    public function authenticateApiUserPassword(Request $request)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required'],
            'device_name' => ['required'],
        ]);

        $usuario = Usuario::where('email', $credentials['email'])->first();

        if (!$usuario || !Hash::check($credentials['password'], $usuario->password)) {
            return LogError::newError('As credenciais fornecidas são inválidas.', new Exception("authenticateApiUserPassword"), ["email" => $credentials["email"]]);
        }

        $usuario = $this->findUser('email', $credentials['email']);
        
        $entidade = $this->registrarEntidade($request);
        $usuario = $this->registrarUsuario($request, $usuario);

        return response()->json([
            'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
            'entidade' => $entidade,
            'usuario' => $usuario,
            "horario_servidor" => CalendarioService::horarioServidor()
        ]);
    }

    public function authenticateApiFirebaseToken(Request $request, FirebaseAuthService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required'],
            'device_name' => ['required'],
        ]);

        $tokenData = $auth->verifyFirebaseToken($credentials['token']);

        if (isset($tokenData['error'])) {
            return LogError::newError('As credenciais fornecidas são inválidas.', new Exception("authenticateApiFirebaseToken"), $tokenData);
        }

        $usuario = $this->findUser('email', $tokenData['email']);

        if (!$usuario) {
            return LogError::newError('Usuário não encontrado.', new Exception("authenticateApiFirebaseToken"));
        }

        $this->usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_FIREBASE, $usuario, $tokenData["picture"]);
        
        $request->session()->put("kind", self::KIND_FIREBASE);
        $entidade = $this->registrarEntidade($request);
        $usuario = $this->registrarUsuario($request, $usuario);

        return response()->json([
            'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
            'entidade' => $entidade,
            'usuario' => $usuario,
            "horario_servidor" => CalendarioService::horarioServidor()
        ]);
    }

    public function authenticateApiGoogleToken(Request $request, GoogleService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required'],
            'device_name' => ['required'],
        ]);

        $tokenData = $auth->verifyToken($credentials['token']);

        if (isset($tokenData['error'])) {
             return LogError::newError('As credenciais fornecidas são inválidas.', new Exception("authenticateApiGoogleToken"), $tokenData);
        }

        $usuario = $this->findUser('email', $tokenData['email']);

        if (!$usuario) {
             return LogError::newError('Usuário não encontrado.', new Exception("authenticateApiGoogleToken"));
        }

        $this->usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
        
        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_GOOGLE);
        
        $entidade = $this->registrarEntidade($request);
        $usuario = $this->registrarUsuario($request, $usuario);

        return response()->json([
            'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
            'entidade' => $entidade,
            'usuario' => $usuario,
            "horario_servidor" => CalendarioService::horarioServidor()
        ]);
    }

    public function validateApiFirebaseToken(Request $request, FirebaseAuthService $auth, $token)
    {
        return $auth->verifyFirebaseToken($token);
    }

    public function validateApiToken(Request $request)
    {
        return response()->json([
            "valid" => Auth::check()
        ]);
    }

    public function loginAzurePopup()
    {
        return redirect('<azure></azure>')->with('popup', 'open');
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

    private function getConfigAzure($url_dinamica_callback = null): \SocialiteProviders\Manager\Config
    {
        return new \SocialiteProviders\Manager\Config(
            config("services.azure.client_id"),
            config("services.azure.client_secret"),
            $url_dinamica_callback,
            ['tenant' => config("services.azure.tenant")]
        );
    }

    public function signInAzureRedirect(Request $request)
    {
        $entidade = $this->registrarEntidade($request);
        $urlCallback = config("app.url") . "/api/login-azure-callback/" . $entidade->sigla;
        $config = $this->getConfigAzure($urlCallback);
        
        return $this->azureProvider($config)
            ->scopes(['openid', 'email', 'profile'])
            ->redirect();
    }

    public function signInAzureCallback(Request $request)
    {
        $entidade = $this->registrarEntidade($request);
        $urlCallback = config("app.url") . "/api/login-azure-callback/" . $entidade->sigla;
        $config = $this->getConfigAzure($urlCallback);
        
        $user = $this->azureProvider($config)->user();

        if (empty($user)) {
            return $this->azureProvider($config)
                ->scopes(['openid', 'email', 'profile'])
                ->redirect();
        }

        $email = explode("#", $user->email)[0];
        $usuario = $this->findUser('email', $email);

        if (!$usuario) {
            return $this->sendInactiveUserError();
        }

        Auth::loginUsingId($usuario->id);
        $request->session()->regenerate();
        $request->session()->put("kind", self::KIND_AZURE);
        
        // Ensure entity and user registration in session is up to date
        $this->handleSuccessfulLogin($request, $usuario, self::KIND_AZURE, $entidade);

        return view("azure");
    }

    public function loginGovBrPopup()
    {
        return redirect('<govbr></govbr>')->with('popup', 'open');
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

    private function getConfigGovBr($url_dinamica_callback, $dados): \SocialiteProviders\Manager\Config
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

    public function signInGovBrRedirect(Request $request)
    {
        try {
            $entidade = $this->registrarEntidade($request);
            $urlCallback = config("services.govbr.redirect") . $entidade->sigla;
            $dados = [
                "code_challenge" => config("services.govbr.code_challenge"),
                "code_challenge_method" => config("services.govbr.code_challenge_method"),
            ];

            $config = $this->getConfigGovBr($urlCallback, $dados);

            return $this->govBrProvider($config)
                ->scopes(['openid', 'email', 'profile'])
                ->redirect();

        } catch (Throwable $e) {
            return $this->handleLoginError($e, "Erro ao redirecionar para o GovBr");
        }
    }

    public function signInGovBrCallback(Request $request)
    {
        try {
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
                return $this->govBrProvider($config)
                    ->scopes(['openid', 'email', 'profile'])
                    ->redirect();
            }

            $cpf = $user->cpf;
            $usuario = $this->findUser('cpf', $cpf);

            if (!$usuario) {
                return $this->sendInactiveUserError();
            }

            Auth::loginUsingId($usuario->id);
            $request->session()->regenerate();
            $request->session()->put("kind", self::KIND_GOVBR);
            
            // Ensure entity and user registration in session is up to date
            $this->handleSuccessfulLogin($request, $usuario, self::KIND_GOVBR, $entidade);
            
            return view("govbr");

        } catch (Throwable $e) {
            return $this->handleLoginError($e, "Erro em callback do GovBr");
        }
    }

    private function handleLoginError(Throwable $e, string $message)
    {
        Log::error($message, [
            'erro' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);
        return redirect()->route('erro.500');
    }

    private function stimulusRouteGovBr()
    {
        $response = Http::get('sso.acesso.gov.br/token');
        if ($response->unauthorized() != 401) {
            return LogError::newWarn('Falha de conexão ao GovBR.');
        }
        return $response;
    }

    private function sendInactiveUserError()
    {
        return response()->json(['error' => 'Usuário inativo no SIAPE. Acesso negado.'], 401);
    }

    private function sendLoginResponse(Request $request, Usuario $usuario, ?Entidade $entidade, ?string $kind)
    {
        return response()->json([
            "success" => true,
            "kind" => $kind,
            "usuario" => $usuario,
            "entidade" => $entidade,
            "horario_servidor" => CalendarioService::horarioServidor()
        ]);
    }

    private function handleSuccessfulLogin(Request $request, Usuario $usuario, string $kind, ?Entidade $entidade = null)
    {
        $entidade = $entidade ?? $this->registrarEntidade($request);
        $usuario = $this->registrarUsuario($request, $usuario);
        
        if (!$usuario) {
            return $this->sendInactiveUserError();
        }

        return $this->sendLoginResponse($request, $usuario, $entidade, $kind);
    }
}
