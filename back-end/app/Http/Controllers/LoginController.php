<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\FirebaseAuthService;
use App\Services\GapiService;
use App\Services\DprfSegurancaAuthService;
use App\Services\IntegracaoService;
use App\Models\Usuario;
use App\Models\Lotacao;
use App\Exceptions\LogError;
use App\Services\UnidadeService;
use App\Services\ServiceBase;
use App\Services\CalendarioService;
use App\Services\UsuarioService;
use Database\Seeders\UsuarioSeeder;
use Illuminate\Validation\ValidationException;
use DateTime;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    private function registrarUsuario($request, $usuario, $update = null) {
        if(isset($usuario)) {
            if(isset($update) && count($update) > 0) {
                $usuario->update($update);
                $usuario->fresh();
            }
            $usuario = Usuario::where("id", $usuario->id)->with(["lotacoes" => function ($query){
                $query->whereNull("data_fim");
            }, "lotacoes.unidade.entidade", "perfil.capacidades.tipoCapacidade"])->first();
            foreach ($usuario->lotacoes as $lotacao) {
                if($lotacao->principal) {
                    $request->session()->put("unidade_id", $lotacao->unidade_id);
                }
            }
        }
        return $usuario;
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
        $usuario = Auth::user();
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
            return response()->json([
                "success" => true,
                "kind" => $request->session()->get("kind"),
                "usuario" => $this->registrarUsuario($request, Auth::user()),
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
            return response()->json([
                'success' => true,
                "usuario" => $this->registrarUsuario($request, Auth::user()),
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
        $credentials = $request->validate(['token' => ['required']]);
        $tokenData = $auth->verifyFirebaseToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $usuario = $this->registrarUsuario($request, Usuario::where('email', $tokenData['email'])->first());
            if (isset($usuario) && Auth::loginUsingId($usuario->id)) {
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_FIREBASE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "FIREBASE");
                return response()->json([
                    'success' => true,
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
    public function authenticateGapiToken(Request $request, GapiService $auth)
    {
        $credentials = $request->validate(['token' => ['required']]);
        $tokenData = $auth->verifyToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $usuario = $this->registrarUsuario($request, Usuario::where('email', $tokenData['email'])->first());
            if (isset($usuario) && Auth::loginUsingId($usuario->id)) {
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "GAPI");
                return response()->json([
                    'success' => true,
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
    public function authenticatePrfGapiToken(Request $request, GapiService $auth, IntegracaoService $integracao)
    {
        $credentials = $request->validate(['token' => ['required']]);
        $tokenData = $auth->verifyToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $usuario = Usuario::where('email', $tokenData['email'])->first();
            if(!isset($usuario) && $integracao->autoIncluir) {
                LogError::newWarn("Fill");
                $usuario = new Usuario();
                $lotacao = new Lotacao();
                $this->service = new IntegracaoService();
                $this->service->salvaUsuarioLotacaoGapi($usuario, $lotacao, $tokenData, $auth);
            }
            if (isset($usuario) && Auth::loginUsingId($usuario->id)) {
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "GAPI");
                return response()->json([
                    'success' => true,
                    "usuario" => $this->registrarUsuario($request, $usuario, ['id_google' => $tokenData["sub"]]), //, 'url_foto' => $tokenData["picture"]
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
            'cpf' => ['regex:/^\d{11}$/'],
            'senha' => ['required'],
            'token' => ['required']
        ]);
        /* Usando temporariamente o loginCpf(), mas o correto é login()  */
        $profile = $auth->loginToken($credentials['cpf'], $credentials['senha'], $credentials['token']);
        if(!isset($profile['error'])) {
            $email = str_contains($profile['email'], "@") ? $profile['email'] : $profile["email"] . "@prf.gov.br";
            $usuario = Usuario::where('email', $email)->first();
            if(!isset($usuario) && $auth->autoIncluir) {
                $usuario = new Usuario();
                $lotacao = new Lotacao();
                $this->service = new IntegracaoService();
                $this->service->salvaUsuarioLotacaoDprf($usuario, $lotacao, $profile, $auth);
            }
            if (isset($usuario) && Auth::loginUsingId($usuario->id)) {
                $request->session()->regenerate();
                $request->session()->put("kind", "DPRFSEGURANCA");
                return response()->json([
                    'success' => true,
                    "usuario" => $this->registrarUsuario($request, $usuario),
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
            $user = Auth::user();
            return response()->json([
                "token" => $user->currentAccessToken()->plainTextToken ?? $request->bearerToken(), // ?? $user->createToken($credentials['device_name'])->plainTextToken,
                "kind" => $request->session()->get("kind"),
                "usuario" => $this->registrarUsuario($request, $user),
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
            'email' => ['required', 'email'],
            'password' => ['required'],
            'device_name' => ['required'],
        ]);
        $usuario = Usuario::where('email', $credentials['email'])->first();
        if (isset($usuario)) {
            $request->session()->put("kind", "USERPASSWORD");
            $user = Auth::user();
            return response()->json([
                'token' => $user->createToken($credentials['device_name'])->plainTextToken,
                'usuario' => $this->registrarUsuario($request, $usuario),
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
            'token' => ['required'],
            'device_name' => ['required'],
        ]);
        $tokenData = $auth->verifyFirebaseToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $usuario = Usuario::where('email', $tokenData['email'])->first();
            if (isset($usuario)) { // && Hash::check($request->password, $user->password)
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_FIREBASE, $usuario, $tokenData["picture"]);
                $request->session()->put("kind", "FIREBASE");
                return response()->json([
                    'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
                    'usuario' => $this->registrarUsuario($request, $usuario),
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
    public function authenticateApiGapiToken(Request $request, GapiService $auth)
    {
        $credentials = $request->validate([
            'token' => ['required'],
            'device_name' => ['required'],
        ]);
        $tokenData = $auth->verifyToken($credentials['token']);
        if(!isset($tokenData['error'])) {
            $usuario = Usuario::where('email', $tokenData['email'])->first();
            if (isset($usuario)) { // && Hash::check($request->password, $user->password)
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "GAPI");
                return response()->json([
                    'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
                    'usuario' => $this->registrarUsuario($request, $usuario),
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
    public function authenticateApiPrfGapiToken(Request $request, GapiService $auth, IntegracaoService $integracao)
    {
        LogError::newWarn("Validando");
        $credentials = $request->validate([
            'token' => ['required'],
            'device_name' => ['required'],
        ]);
        LogError::newWarn("Iniciou");
        $tokenData = $auth->verifyToken($credentials['token']);
        LogError::newWarn("Decodificou", $tokenData);
        if(!isset($tokenData['error'])) {
            $usuario = Usuario::where('email', $tokenData['email'])->first();
            if(!isset($usuario) && $integracao->autoIncluir) {
                LogError::newWarn("Fill");
                $usuario = new Usuario();
                $lotacao = new Lotacao();
                $this->service = new IntegracaoService();
                $this->service->salvaUsuarioLotacaoGapi($usuario, $lotacao, $tokenData, $auth);
            }
            if (isset($usuario)) { // && Hash::check($request->password, $user->password)
                $usuarioService = new UsuarioService();
                $usuarioService->atualizarFotoPerfil(UsuarioService::LOGIN_GOOGLE, $usuario, $tokenData["picture"]);
                $request->session()->regenerate();
                $request->session()->put("kind", "GAPI");
                $usuario->save();
                return response()->json([
                    'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
                    'usuario' => $this->registrarUsuario($request, $usuario, ['id_google' => $tokenData["sub"]]), //, 'url_foto' => $tokenData["picture"]
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
    public function authenticateApiDprfSeguranca(Request $request, DprfSegurancaAuthService $auth)
    {
        $credentials = $request->validate([
            'cpf' => ['regex:/^\d{11}$/'],
            'senha' => ['required'],
            'token' => ['required'],
            'device_name' => ['required']
        ]);
        /* Usando temporariamente o loginCpf(), mas o correto é login()  */
        $profile = $auth->loginToken($credentials['cpf'], $credentials['senha'], $credentials['token']);
        if(!isset($profile['error'])) {
            $email = str_contains($profile["email"], "@") ? $profile["email"] : $profile["email"] . "@prf.gov.br";
            $usuario = Usuario::where('email', $email)->first();
            if(!isset($usuario) && $auth->autoIncluir) {
                $usuario = new Usuario();
                $lotacao = new Lotacao();
                $this->service = new IntegracaoService();
                $this->service->salvaUsuarioLotacaoDprf($usuario, $lotacao, $profile, $auth);
            }
            if (isset($usuario)) {
                $request->session()->put("kind", "DPRFSEGURANCA");
                $usuario->save();
                return response()->json([
                    'token' => $usuario->createToken($credentials['device_name'])->plainTextToken,
                    'usuario' => $this->registrarUsuario($request, $usuario),
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

    public function signInAzureRedirect(Request $request) {
        return Socialite::driver('azure')
        ->scopes(['openid', 'email', 'profile'])
        ->redirect();
    }

    public function signInAzureCallback(Request $request) {
        $user = Socialite::driver('azure')->user();
        if(!empty($user)) {
            $token = $user->token;
            $email = $user->email;
            $email = explode("#", $email);
            $email = $email[0];
            $email = str_replace("_", "@", $email);
            $usuario = $this->registrarUsuario($request, Usuario::where('email', $email)->first());
            if (($usuario)) {
                Auth::loginUsingId($usuario->id);
                $request->session()->regenerate();
                $request->session()->put("kind", "AZURE");
                return redirect()->intended('http://localhost:4200/#/login-retorno'); view("azure");
            } else {
                return LogError::newError('As credenciais fornecidas são inválidas. Email: '.$email);
            }
        } else {
            return Socialite::driver('azure')->redirect();
        }
    }

}
