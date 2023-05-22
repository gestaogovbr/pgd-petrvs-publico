<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\FirebaseAuthService;
use App\Services\GoogleService;
use App\Services\DprfSegurancaAuthService;
use App\Services\IntegracaoService;
use App\Services\ApiService;
use App\Models\Usuario;
use App\Models\Lotacao;
use App\Exceptions\LogError;
use App\Models\Entidade;
use App\Services\UnidadeService;
use App\Services\ServiceBase;
use App\Services\CalendarioService;
use App\Services\UsuarioService;
use Database\Seeders\UsuarioSeeder;
use Illuminate\Validation\ValidationException;
use SocialiteProviders\Azure\Provider;
use DateTime;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    private function registrarEntidade($request, $session = false) {
        $with = ["feriados", "gestor", "gestorSubstituto"]; 
        $entidade = $session ? Entidade::with($with)->find($request->session()->put("entidade_id")) : null;
        $sigla = $request->has('entidade') ? $request->input('entidade') : config("petrvs")["entidade"]; 
        if(empty($entidade) && !empty($sigla)) {
            $entidade = Entidade::with($with)->where("sigla", $sigla)->first();
            $request->session()->put("entidade_id", $entidade->id);
        }
        return $entidade;
    }

    private function registrarUsuario($request, $usuario, $update = null) {
        if(isset($usuario)) {
            if(isset($update) && count($update) > 0) {
                $usuario->update($update);
                $usuario->fresh();
            }
            $entidadeId = $request->session()->has("entidade_id") ? $request->session()->get("entidade_id") : null;
            $usuario = Usuario::where("id", $usuario->id)->with(["lotacoes" => function ($query) use ($entidadeId) {
                $query->with(["unidade"])->whereHas('unidade', function ($query) use ($entidadeId) {
                    return $query->where('entidade_id', '=', $entidadeId);
                })->whereNull("data_fim");
            }, "perfil.capacidades.tipoCapacidade","chefiasTitulares","chefiasSubstitutas"])->first();
            foreach ($usuario->lotacoes as $lotacao) {
                if($lotacao->principal) {
                    $request->session()->put("unidade_id", $lotacao->unidade_id);
                }
            }
        }
        return $usuario;
    }

    /**
     * Retorna o usuário logado
     *
     * @return App\Models\Usuario | null
     */
    public static function loggedUser(): ?Usuario {
        return Auth::user();
    }

    /**
     * Seleciona Unidade Atual
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function selecionaUnidade(Request $request, FirebaseAuthService $auth)
    {
        $data = $request->validate([
            'unidade_id' => ['required'],
        ]);
        if(Auth::check()) {
            $usuario = Auth::user();
            $usuario = Usuario::where("id", $usuario->id)->with(["lotacoes" => function ($query) use ($data) {
                $query->whereNull("data_fim")->where("unidade_id", $data["unidade_id"]);
            }, "lotacoes.unidade.entidade", "perfil.capacidades.tipoCapacidade"])->first();
            if(isset($usuario->lotacoes[0]) && !empty($usuario->lotacoes[0]->unidade_id)) {
                $request->session()->put("unidade_id", $usuario->lotacoes[0]->unidade_id);
                return response()->json([
                    "status" => "OK",
                    "unidade" => $usuario->lotacoes[0]->unidade
                ]);
            } else {
                return LogError::newError('Unidade não encontrada no usuário');
            }
        } else {
            return LogError::newError('Usuário não logado');
        }
    }

    /**
     * Obtem horário da unidade atual do usuário logado (considerando UTC pelo código IBGE)
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function horarioUnidade(Request $request) {
        if(Auth::check()) {
            $unidade_id = $request->session()->get("unidade_id");
            if(!empty($unidade_id)) {
                $unidadeService = new UnidadeService();
                return response()->json([
                    "status" => "OK",
                    "hora" => $unidadeService->hora($unidade_id)
                ]);
            } else {
                return LogError::newError('Usuário sem unidade selecionada');
            }
        } else {
            return LogError::newError('Usuário não logado');
        }
    }

    /**
     * Logout
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request, FirebaseAuthService $auth)
    {
        $usuario = self::loggedUser();
        if(!empty($usuario) && !empty($usuario->currentAccessToken())) $usuario->currentAccessToken()->delete();
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(["status" => "OK"]);
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateSession(Request $request) {
        if(Auth::check()) {
            $entidade = $this->registrarEntidade($request, true);
            $usuario = $this->registrarUsuario($request, self::loggedUser());
            return response()->json([
                "success" => true,
                "kind" => $request->session()->get("kind"),
                "usuario" => $usuario,
                "entidade" => $entidade,
                "horario_servidor" => CalendarioService::horarioServidor()
            ]);
        }
        return LogError::newError('Sessão não encontrada');
    }


    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateUserPassword(Request $request, FirebaseAuthService $auth)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $request->session()->put("kind", "USERPASSWORD");
            $entidade = $this->registrarEntidade($request);
            $usuario = $this->registrarUsuario($request, self::loggedUser());
            return response()->json([
                'success' => true,
                "entidade" => $entidade,
                "usuario" => $usuario,
                "horario_servidor" => CalendarioService::horarioServidor()
            ]);
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateFirebaseToken(Request $request, FirebaseAuthService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required']
        ]);
        $tokenData = $auth->verifyFirebaseToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $entidade = $this->registrarEntidade($request);
            $usuario = $this->registrarUsuario($request, Usuario::where('email', $tokenData['email'])->where("data_fim", null)->first());
            if (isset($usuario) && Auth::loginUsingId($usuario->id)) {
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_FIREBASE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "FIREBASE");
                return response()->json([
                    'success' => true,
                    "entidade" => $entidade,
                    "usuario" => $usuario,
                    "horario_servidor" => CalendarioService::horarioServidor()
                ]);
            }
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateGoogleToken(Request $request, GoogleService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required']
        ]);
        $tokenData = $auth->verifyToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $entidade = $this->registrarEntidade($request);
            $usuario = $this->registrarUsuario($request, Usuario::where('email', $tokenData['email'])->where("data_fim", null)->first());
            if (isset($usuario) && Auth::loginUsingId($usuario->id)) {
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "GOOGLE");
                return response()->json([
                    'success' => true,
                    "entidade" => $entidade,
                    "usuario" => $usuario,
                    "horario_servidor" => CalendarioService::horarioServidor()
                ]);
            }
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticatePrfGoogleToken(Request $request, GoogleService $auth, IntegracaoService $integracao)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required']
        ]);
        $tokenData = $auth->verifyToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $usuario = Usuario::where('email', $tokenData['email'])->where("data_fim", null)->first();
            if(!isset($usuario) && $integracao->autoIncluir) {
                $usuario = new Usuario();
                $lotacao = new Lotacao();
                $service = new IntegracaoService();
                $service->salvaUsuarioLotacaoGoogle($usuario, $lotacao, $tokenData, $auth);
            }
            if (isset($usuario) && Auth::loginUsingId($usuario->id)) {
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "GOOGLE");
                $entidade = $this->registrarEntidade($request);
                $usuario = $this->registrarUsuario($request, $usuario, ['id_google' => $tokenData["sub"]]);
                return response()->json([
                    'success' => true,
                    "entidade" => $entidade, 
                    "usuario" => $usuario,
                    "horario_servidor" => CalendarioService::horarioServidor()
                ]);
            }
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateDprfSeguranca(Request $request, DprfSegurancaAuthService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'cpf' => ['regex:/^\d{11}$/'],
            'senha' => ['required'],
            'token' => ['required']
        ]);
        /* Usando temporariamente o loginCpf(), mas o correto é login()  */
        $profile = $auth->loginToken($credentials['cpf'], $credentials['senha'], $credentials['token']);
        if(!isset($profile['error'])) {
            $email = str_contains($profile['email'], "@") ? $profile['email'] : $profile["email"] . "@prf.gov.br";
            $usuario = Usuario::where('email', $email)->where("data_fim", null)->first();
            if(!isset($usuario) && $auth->autoIncluir) {
                $usuario = new Usuario();
                $lotacao = new Lotacao();
                $service = new IntegracaoService();
                $service->salvaUsuarioLotacaoDprf($usuario, $lotacao, $profile, $auth);
            }
            if (isset($usuario) && Auth::loginUsingId($usuario->id)) {
                $request->session()->regenerate();
                $request->session()->put("kind", "DPRFSEGURANCA");
                $entidade = $this->registrarEntidade($request);
                $usuario = $this->registrarUsuario($request, $usuario);
                return response()->json([
                    'success' => true,
                    "entidade" => $entidade,
                    "usuario" => $usuario,
                    "horario_servidor" => CalendarioService::horarioServidor()
                ]);
            }
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateApiSession(Request $request) {
        if(Auth::check()) {
            $user = self::loggedUser();
            $entidade = $this->registrarEntidade($request, true);
            $usuario = $this->registrarUsuario($request, $user);
            return response()->json([
                "token" => $user->currentAccessToken()->plainTextToken ?? $request->bearerToken(), // ?? $user->createToken($credentials['device_name'])->plainTextToken,
                "kind" => $request->session()->get("kind"),
                "entidade" => $entidade,
                "usuario" => $usuario,
                "horario_servidor" => CalendarioService::horarioServidor()
            ]);
        }
        return LogError::newError('Sessão não encontrada');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateApiUserPassword(Request $request, FirebaseAuthService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required'],
            'device_name' => ['required'],
        ]);
        $usuario = Usuario::where('email', $credentials['email'])->where("data_fim", null)->first();
        if (isset($usuario)) {
            $request->session()->put("kind", "USERPASSWORD");
            $user = self::loggedUser();
            $entidade = $this->registrarEntidade($request);
            $usuario = $this->registrarUsuario($request, $usuario);
            return response()->json([
                'token' => $user->createToken($credentials['device_name'])->plainTextToken,
                'entidade' => $entidade,
                'usuario' => $usuario,
                "horario_servidor" => CalendarioService::horarioServidor()
            ]);
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateApiFirebaseToken(Request $request, FirebaseAuthService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required'],
            'device_name' => ['required'],
        ]);
        $tokenData = $auth->verifyFirebaseToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $usuario = Usuario::where('email', $tokenData['email'])->where("data_fim", null)->first();
            if (isset($usuario)) { // && Hash::check($request->password, $user->password)
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_FIREBASE, $usuario, $tokenData["picture"]);
                $request->session()->put("kind", "FIREBASE");
                $entidade = $this->registrarEntidade($request);
                $usuario = $this->registrarUsuario($request, $usuario);
                return response()->json([
                    'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
                    'entidade' => $entidade,
                    'usuario' => $usuario,
                    "horario_servidor" => CalendarioService::horarioServidor()
                ]);
            }
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateApiGoogleToken(Request $request, GoogleService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required'],
            'device_name' => ['required'],
        ]);
        $tokenData = $auth->verifyToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $usuario = Usuario::where('email', $tokenData['email'])->where("data_fim", null)->first();
            if (isset($usuario)) { // && Hash::check($request->password, $user->password)
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "GOOGLE");
                $entidade = $this->registrarEntidade($request);
                $usuario = $this->registrarUsuario($request, $usuario);                
                return response()->json([
                    'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
                    'entidade' => $entidade,
                    'usuario' => $usuario,
                    "horario_servidor" => CalendarioService::horarioServidor()
                ]);
            }
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateApiPrfGoogleToken(Request $request, GoogleService $auth, IntegracaoService $integracao)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required'],
            'device_name' => ['required'],
        ]);
        $tokenData = $auth->verifyToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $usuario = Usuario::where('email', $tokenData['email'])->where("data_fim", null)->first();
            if(!isset($usuario) && $integracao->autoIncluir) {
                $usuario = new Usuario();
                $lotacao = new Lotacao();
                $service = new IntegracaoService();
                $service->salvaUsuarioLotacaoGoogle($usuario, $lotacao, $tokenData, $auth);
            }
            if (isset($usuario)) { // && Hash::check($request->password, $user->password)
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "GOOGLE");
                $usuario->save();
                $entidade = $this->registrarEntidade($request);
                $usuario = $this->registrarUsuario($request, $usuario, ['id_google' => $tokenData["sub"]]);
                return response()->json([
                    'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
                    'entidade' => $entidade,
                    'usuario' => $usuario,
                    "horario_servidor" => CalendarioService::horarioServidor()
                ]);
            }
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function generateApiPrfSessionToken(Request $request, ApiService $api, IntegracaoService $integracao)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'token' => ['required'],
            'entidade' => ['required']
        ]);
        $entidade = Entidade::where("sigla", $credentials["entidade"])->first();
        if(empty($entidade) || empty($entidade->api_private_key)) return LogError::newError('Entidade inválidas.');
        $tokenData = $api->verifyToken($credentials['token'], $entidade->api_private_key, $entidade->sigla);
        if(!isset($tokenData['error'])) {
            $usuario = !empty($tokenData['email']) ? Usuario::where('email', $tokenData['email'])->where("data_fim", null)->first() :
                Usuario::where('cpf', $tokenData['cpf'])->where("data_fim", null)->first();
            if(!isset($usuario) && $integracao->autoIncluir) {
                $usuario = new Usuario();
                $lotacao = new Lotacao();
                $service = new IntegracaoService();
                $service->salvaUsuarioLotacaoApi($usuario, $lotacao, $tokenData, $api);
            }
            if (isset($usuario)) { // && Hash::check($request->password, $user->password)
                $request->session()->regenerate();
                $request->session()->put("kind", "SUPER");
                $usuario->save();
                $entidade = $this->registrarEntidade($request);
                $usuario = $this->registrarUsuario($request, $usuario, !empty($tokenData["id_super"]) ? ['id_super' => $tokenData["id_super"]] : []);
                return response()->json([
                    'token' => $usuario->createToken("SUPER_" . $tokenData["id_super"])->plainTextToken,
                    'entidade' => $entidade,
                    'usuario' => $usuario,
                    "horario_servidor" => CalendarioService::horarioServidor()
                ]);
            } else {
                return LogError::newError('USER_NOT_FOUND');
            }
        }
        return LogError::newError('As credenciais fornecidas são inválidas.' . $tokenData['error']);
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticateApiDprfSeguranca(Request $request, DprfSegurancaAuthService $auth)
    {
        $credentials = $request->validate([
            'entidade' => ['required'],
            'cpf' => ['regex:/^\d{11}$/'],
            'senha' => ['required'],
            'token' => ['required'],
            'device_name' => ['required']
        ]);
        /* Usando temporariamente o loginCpf(), mas o correto é login()  */
        $profile = $auth->loginToken($credentials['cpf'], $credentials['senha'], $credentials['token']);
        if(!isset($profile['error'])) {
            $email = str_contains($profile["email"], "@") ? $profile["email"] : $profile["email"] . "@prf.gov.br";
            $usuario = Usuario::where('email', $email)->where("data_fim", null)->first();
            if(!isset($usuario) && $auth->autoIncluir) {
                $usuario = new Usuario();
                $lotacao = new Lotacao();
                $service = new IntegracaoService();
                $service->salvaUsuarioLotacaoDprf($usuario, $lotacao, $profile, $auth);
            }
            if (isset($usuario)) {
                $request->session()->put("kind", "DPRFSEGURANCA");
                $usuario->save();
                $entidade = $this->registrarEntidade($request);
                $usuario = $this->registrarUsuario($request, $usuario);
                return response()->json([
                    'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
                    'entidade' => $entidade,
                    'usuario' => $usuario,
                    "horario_servidor" => CalendarioService::horarioServidor()
                ]);
            }
        }
        return LogError::newError('As credenciais fornecidas são inválidas.');
    }

    /**
     * Verify an firebase token
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function validateApiFirebaseToken(Request $request, FirebaseAuthService $auth, $token) {
        return $auth->verifyFirebaseToken($token);
    }

    /**
     * Verify an Sactum token
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function validateApiToken(Request $request) {
        return response()->json([
            "valid" => Auth::check()
        ]);
    }

    public function loginAzurePopup(){
        return redirect('<azure></azure>')->with('popup', 'open');
    }

    public function azureProvider(): Provider {
        return Socialite::driver('azure');
    }

    public function signInAzureRedirect(Request $request) {
        $this->registrarEntidade($request);
        return $this->azureProvider()->scopes(['openid', 'email', 'profile'])->redirect();
    }

    public function simulateAzureCallback(Request $request) {
        return view("azure");
    }

    public function signInAzureCallback(Request $request) {
        $user = $this->azureProvider()->user();
        if(!empty($user)) {
            $token = $user->token;
            $email = $user->email;
            $email = explode("#", $email);
            $email = $email[0];
            $email = str_replace("_", "@", $email);
            $usuario = $this->registrarUsuario($request, Usuario::where('email', $email)->where("data_fim", null)->first());
            if (($usuario)) {
                Auth::loginUsingId($usuario->id);
                $request->session()->regenerate();
                $request->session()->put("kind", "AZURE");
                return view("azure"); //redirect()->intended('http://localhost:4200/#/login-retorno');
            } else {
                return LogError::newError('As credenciais fornecidas são inválidas. Email: '.$email);
            }
        } else {
            return $this->azureProvider()->redirect();
        }
    }

}
