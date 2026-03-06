<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Exceptions\LogError;
use App\Services\LoginService;
use App\Services\FirebaseAuthService;
use App\Services\GoogleService;
use Exception;
use Throwable;

class LoginController extends Controller
{
    public function __construct(
        protected LoginService $loginService
    ) {
    }

    public static function loggedUser()
    {
        return Auth::user();
    }

    public function selecionaUnidade(Request $request)
    {
        try {
            $data = $request->validate([
                'unidade_id' => ['required'],
                'matricula'  => ['nullable', 'string'],
            ]);

            $result = $this->loginService->selecionaUnidade($data, $request);

            return response()->json($result);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e);
        }
    }

    public function horarioUnidade(Request $request)
    {
        try {
            $hora = $this->loginService->horarioUnidade($request);
            return response()->json([
                "status" => "OK",
                "hora" => $hora
            ]);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e);
        }
    }

    public function logout(Request $request)
    {
        try {
            $this->loginService->logout($request);
            return response()->json(['status' => 'OK']);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e);
        }
    }

    public function authenticateSession(Request $request)
    {
        try {
            $result = $this->loginService->authenticateSession($request);
            return response()->json($result);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e);
        }
    }

    public function authenticateUserPassword(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            $result = $this->loginService->authenticateUserPassword($credentials, $request);
            return response()->json($result);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e, ["email" => $request->input("email")]);
        }
    }

    public function authenticateFirebaseToken(Request $request)
    {
        try {
            $credentials = $request->validate([
                'entidade' => ['required'],
                'token' => ['required']
            ]);

            $result = $this->loginService->authenticateFirebaseToken($credentials, $request);
            return response()->json($result);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e);
        }
    }

    public function authenticateGoogleToken(Request $request)
    {
        try {
            $credentials = $request->validate([
                'entidade' => ['required'],
                'token' => ['required']
            ]);

            $result = $this->loginService->authenticateGoogleToken($credentials, $request);
            return response()->json($result);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e);
        }
    }

    public function authenticateApiSession(Request $request)
    {
        try {
            $result = $this->loginService->authenticateApiSession($request);
            return response()->json($result);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e);
        }
    }

    public function authenticateApiUserPassword(Request $request)
    {
        try {
            $credentials = $request->validate([
                'entidade' => ['required'],
                'email' => ['required', 'email'],
                'password' => ['required'],
                'device_name' => ['required'],
            ]);

            $result = $this->loginService->authenticateApiUserPassword($credentials, $request);
            return response()->json($result);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e, ["email" => $request->input("email")]);
        }
    }

    public function authenticateApiFirebaseToken(Request $request)
    {
        try {
            $credentials = $request->validate([
                'entidade' => ['required'],
                'token' => ['required'],
                'device_name' => ['required'],
            ]);

            $result = $this->loginService->authenticateApiFirebaseToken($credentials, $request);
            return response()->json($result);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e);
        }
    }

    public function authenticateApiGoogleToken(Request $request)
    {
        try {
            $credentials = $request->validate([
                'entidade' => ['required'],
                'token' => ['required'],
                'device_name' => ['required'],
            ]);

            $result = $this->loginService->authenticateApiGoogleToken($credentials, $request);
            return response()->json($result);
        } catch (Exception $e) {
            return LogError::newError($e->getMessage(), $e);
        }
    }

    public function validateApiFirebaseToken(Request $request, FirebaseAuthService $auth, $token)
    {
        return $this->loginService->validateApiFirebaseToken($token);
    }

    public function validateApiToken(Request $request)
    {
        return response()->json($this->loginService->validateApiToken());
    }

    public function loginAzurePopup()
    {
        return redirect('<azure></azure>')->with('popup', 'open');
    }

    public function signInAzureRedirect(Request $request)
    {
        $entidade = $this->loginService->registrarEntidade($request);
        $urlCallback = config("app.url") . "/api/login-azure-callback/" . $entidade->sigla;
        $config = $this->loginService->getConfigAzure($urlCallback);
        
        return $this->loginService->azureProvider($config)
            ->scopes(['openid', 'email', 'profile'])
            ->redirect();
    }

    public function signInAzureCallback(Request $request)
    {
        try {
            $result = $this->loginService->signInAzureCallback($request);

            if ($result === null) {
                $entidade = $this->loginService->registrarEntidade($request);
                $urlCallback = config("app.url") . "/api/login-azure-callback/" . $entidade->sigla;
                $config = $this->loginService->getConfigAzure($urlCallback);
                
                return $this->loginService->azureProvider($config)
                    ->scopes(['openid', 'email', 'profile'])
                    ->redirect();
            }

            return view("azure");
        } catch (Throwable $e) {
            return $this->handleLoginError($e, "Erro em callback do Azure");
        }
    }

    public function loginGovBrPopup()
    {
        return redirect('<govbr></govbr>')->with('popup', 'open');
    }

    public function signInGovBrRedirect(Request $request)
    {
        try {
            $entidade = $this->loginService->registrarEntidade($request);
            $urlCallback = config("services.govbr.redirect") . $entidade->sigla;
            $dados = [
                "code_challenge" => config("services.govbr.code_challenge"),
                "code_challenge_method" => config("services.govbr.code_challenge_method"),
            ];

            $config = $this->loginService->getConfigGovBr($urlCallback, $dados);

            return $this->loginService->govBrProvider($config)
                ->scopes(['openid', 'email', 'profile'])
                ->redirect();

        } catch (Throwable $e) {
            return $this->handleLoginError($e, "Erro ao redirecionar para o GovBr");
        }
    }

    public function signInGovBrCallback(Request $request)
    {
        try {
            $result = $this->loginService->signInGovBrCallback($request);

            if ($result === null) {
                $entidade = $this->loginService->registrarEntidade($request);
                $urlCallback = config("services.govbr.redirect") . $entidade->sigla;
                $dados = [
                    "code" => $request->code,
                    "state" => $request->state,
                    "code_verifier" => config("services.govbr.code_verifier")
                ];
                
                $config = $this->loginService->getConfigGovBr($urlCallback, $dados);
                
                return $this->loginService->govBrProvider($config)
                    ->scopes(['openid', 'email', 'profile'])
                    ->redirect();
            }

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
}
