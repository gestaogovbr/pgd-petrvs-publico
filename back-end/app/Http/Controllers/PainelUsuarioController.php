<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\PainelUsuarioService;
use App\Exceptions\LogError;
use Throwable;

class PainelUsuarioController extends Controller
{

  protected $service;

  public function __construct(PainelUsuarioService $service)
  {
    $this->service = $service;
  }

  public function login(Request $request)
  {

    $credentials = $request->only('email', 'password');

    if (Auth::guard('painel')->attempt($credentials)) {
      $request->session()->regenerate();
      return true;
    } else {
      // Autenticação falhou
      return response()->json([
        'error' => 'Credenciais inválidas.'
      ], 401); // Código de status 401 para não autorizado
    }
  }
  public function detail(Request $request)
  {
    // Obtém o usuário autenticado com base no contexto
    $user = $request->user('painel');

    // Verifica se o usuário está autenticado
    if ($user) {
      return response()->json([
        'nome' => $user->nome,
        'email' => $user->email
      ]);
    } else {
      // Usuário não autenticado, retorna uma resposta de erro
      return response()->json([
        'error' => 'Usuário não autenticado'
      ], 401); // Código de status 401 para não autorizado
    }
  }

  public function logout()
  {
    Auth::guard('painel_users')->logout();
    return redirect('/login');
  }

  public function checkAuthentication(Request $request)
  {
    if (Auth::guard('painel')->check()) {
      // Usuário autenticado
      return response()->json(['authenticated' => true]);
    } else {
      // Usuário não autenticado
      return response()->json(['authenticated' => false]);
    }
  }

  public function query(Request $request)
  {
    try {
      $data = $request->validate([
        'page' => ['required'],
        'with' => ['array'],
        'limit' => ['required'],
        'orderBy' => ['array'],
        'deleted' => ['nullable'],
        'where' => ['array']
      ]);
      $result = $this->service->query($data);
      return response()->json([
        'success' => true,
        'count' => $result['count'],
        'rows' => $result['rows'],
        'extra' => $result['extra']
      ]);
    } catch (Throwable $e) {
      return LogError::newError("QUERY: exception", $e); //response()->json(['error' => $e->getMessage()]);
    }
  }

  public function getById(Request $request)
  {
    try {
      $data = $request->validate([
        'id' => ['required'],
        'with' => ['array'],
      ]);
      return response()->json([
        'success' => true,
        'data' => $this->service->getById($data)
      ]);
    } catch (Throwable $e) {
      return response()->json(['error' => $e->getMessage()]);
    }
  }

  public function store(Request $request)
  {
    try {
      $data = $request->validate([
        'entity' => ['required'],
        'with' => ['array']
      ]);

      $entityData = $data['entity'];
      if (isset($entityData['password'])) {
        $entityData['password'] = md5($entityData['password']);
      }
      $entity = $this->service->store($entityData, null, true);
      $tenantIds = array_column($entityData['tenants'], 'id');
      $entity->assignTenants($tenantIds);
      $result = $this->service->getById([
        'id' => $entity->id,
        'with' => $data['with']
      ]);
      return response()->json([
        'success' => true,
        'rows' => [$result]
      ]);
    } catch (Throwable $e) {
      return response()->json(['error' => $e->getMessage()]);
    }
  }
}
