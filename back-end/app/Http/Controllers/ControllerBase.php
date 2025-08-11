<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;
use App\Exceptions\LogError;
use App\Exceptions\ServerException;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\Facades\Log;
use Throwable;

abstract class ControllerBase extends Controller
{
    public string $collection = "";
    public $service = null;
    public $updatable = [];

    public static $sameTransaction = false;

    public function __construct() {
        if(empty($this->collection)) {
            $this->collection = str_replace("Controller", "", str_replace("App\\Http\\Controllers", "App\\Models", get_class($this)));
        }
        if(empty($this->service)) {
            $child = str_replace("App\\Http", "App", str_replace("Controller", "Service", get_class($this)));
            try {
                if(!empty(app($child))) {
                    $this->service = new $child();
                }
            } catch (BindingResolutionException $e) {}
        }
    }

    abstract protected function checkPermissions($action, $request, $service, $unidade, $usuario);

    /**
     * Retorna o usuário logado
     *
     * @return App\Models\Usuario | null
     */
    public static function loggedUser(): ?Usuario {
        return Auth::user();
    }

    public function getPetrvsHeader(Request $request) {
        $header = $request->header('X-PETRVS');
        if(!empty($header)) {
            return json_decode(base64_decode($header), true);
        }
        return [];
    }

    public function getUnidade(Request $request)
    {
        $result = null;

        // Obtém headers do Petrvs
        $headers = $this->getPetrvsHeader($request);

        // Tenta obter unidade_id dos headers ou da sessão
        $unidade_id = !empty($headers) && !empty($headers["unidade_id"])
            ? $headers["unidade_id"]
            : ($request->hasSession() ? $request->session()->get("unidade_id") : "");

        // Usuário logado
        $usuario = self::loggedUser() ? Usuario::find(self::loggedUser()->id) : null;

        // Tenta determinar a unidade a partir da lotação ou primeira área de trabalho
        $lotacao = $usuario?->lotacao?->unidade
            ?? $usuario?->areasTrabalho?->first()?->unidade
            ?? null;

        if (!empty($unidade_id)) {
            // Carrega usuário com áreas de trabalho filtradas pela unidade_id
            $usuario = Usuario::where("id", self::loggedUser()?->id)
                ->with([
                    "areasTrabalho" => function ($query) use ($unidade_id) {
                        $query->where("unidade_id", $unidade_id);
                    },
                    "areasTrabalho.unidade"
                ])
                ->first();

            // Retorna unidade da primeira área de trabalho, se disponível
            if (isset($usuario->areasTrabalho[0]) && !empty($usuario->areasTrabalho[0]->unidade_id)) {
                return $usuario->areasTrabalho[0]->unidade;
            }
        } elseif (!empty($lotacao)) {
            // Caso não haja unidade selecionada, utiliza a lotação
            return $lotacao;
        }

        // Caso não encontre nenhuma unidade
        return $result;
    }


/*     $tenant = Tenant::find('SENAPPEN');
tenancy()->initialize($tenant); */

    public function getUsuario(Request $request) {
        return !empty(self::loggedUser()) ? Usuario::where("id", self::loggedUser()?->id)->with("areasTrabalho.unidade")->first() : null;
    }

    /**
     * Search for a given text
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function searchText(Request $request)
    {
        try {
            $this->checkPermissions("SEARCHTEXT", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'query' => ['min:0'],
                'fields' => ['required', 'array'],
                'orderBy' => ['array'],
                'where' => ['array']
            ]);
            return response()->json([
                'success' => true,
                'values' => $this->service->searchText($data)
            ]);
        }  catch (IBaseException $e) {

            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            Log::error('Erro capturado', ['exception' => $e]);
            $dataError = throwableToArrayLog($e);
            //Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Search for a given key
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function searchKey(Request $request)
    {
        try {
            $this->checkPermissions("SEARCHKEY", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'key' => ['required'],
                'fields' => ['required', 'array'],
                'with' => ['array']
            ]);
            return response()->json([
                'success' => true,
                'value' => $this->service->searchKey($data)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Get entity by id
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function getById(Request $request)
    {
        try {
            $this->checkPermissions("GETBYID", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required'],
                'with' => ['array'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->getById($data)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Get all ids of a query
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function getAllIds(Request $request)
    {
        try {
            $this->checkPermissions("GETALLIDS", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'fields' => ['array'],
                'with' => ['array'],
                'where' => ['array']
            ]);
            $result = $this->service->getAllIds($data);
            return response()->json([
                'success' => true,
                'rows' => $result["rows"],
                'extra' => $result["extra"]
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Query
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function query(Request $request)
    {
        try {
            $this->checkPermissions("QUERY", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
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
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Download a file with signed url
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string $file
     * @return \Illuminate\Http\Response
     */
    public function download(Request $request, string $tenantId, string $file)
    {
        //$this->checkPermissions("DOWNLOAD", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
        return response()->file($this->service->download($tenantId, $file));
    }

    /**
     * Get public Url of file
     * - file: File path
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function downloadUrl(Request $request)
    {
        try {
            $this->checkPermissions("DOWNLOADURL", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'file' => ['required'],
            ]);
            return response()->json(['success' => true, 'url' => $this->service->downloadUrl($data["file"])]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Delete a file
     * - file: File path
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deleteFile(Request $request)
    {
        try {
            $this->checkPermissions("DELETEFILE", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'file' => ['required'],
            ]);
            return response()->json(['success' => $this->service->deleteFile($data["file"])]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Upload file from multipart/form-data with fields:
     * - path: Relative path to file
     * - name: Name of file
     * - file: File data
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        try {
            $this->checkPermissions("UPLOAD", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'path' => ['required'],
                'name' => ['required']
            ]);
            return response()->json(['success' => true, 'path' => $this->service->upload($data["path"], $data["name"], $request->has('file') ? $request->file('file') : null)]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Upload file from multipart/form-data with fields:
     * - path: Relative path to file
     * - name: Name of file
     * - file: Base64 of file
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function uploadBase64(Request $request)
    {
        try {
            $this->checkPermissions("UPLOADBASE64", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'path' => ['required'],
                'name' => ['required'],
                'file' => ['required'],
            ]);
            return response()->json(['success' => true, 'path' => $this->service->uploadBase64($data["path"], $data["name"], $data["file"])]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $this->checkPermissions("STORE", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'entity' => ['required'],
                'with' => ['array']
            ]);
            $unidade = $this->getUnidade($request);
            $entity = $this->service->store($data['entity'], $unidade, !ControllerBase::$sameTransaction);
            $result = $this->service->getById([
                'id' => $entity->id,
                'with' => $data['with']
            ]);
            return response()->json([
                'success' => true,
                'rows' => [$result]
            ]);
        }
        catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado.".$e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $this->checkPermissions("UPDATE", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required'],
                'data' => ['required'],
                'with' => ['array']
            ]);
            foreach (array_keys($data["data"]) as $key) {
                if($key != "id" && !in_array($key, $this->updatable)) {
                    return response()->json(['error' => "Não é possível atualizar"]);
                }
            }
            $unidade = $this->getUnidade($request);
            $data['data']['id'] = $data['id'];
            $entity = $this->service->update($data['data'], $unidade, !ControllerBase::$sameTransaction);
            $result = $this->service->getById([
                'id' => $entity->id,
                'with' => $data['with']
            ]);
            return response()->json([
                'success' => true,
                'rows' => [$result]
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Update the specified resource json field in storage (merge).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateJson(Request $request)
    {
        try {
            $this->checkPermissions("UPDATEJSON", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required'],
                'data' => ['nullable'],
                'field' => ['required'],
                'with' => ['array']
            ]);
            if(!in_array($data["field"], $this->updatable)) {
                return response()->json(['error' => "Não é possível atualizar"]);
            }
            $unidade = $this->getUnidade($request);
            $entity = $this->service->updateJson($data, $unidade, !ControllerBase::$sameTransaction);
            $result = $this->service->getById([
                'id' => $entity->id,
                'with' => $data['with']
            ]);
            return response()->json([
                'success' => true,
                'rows' => [$result] //$this->service->update($request->all(), $unidade)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        try {
            $this->checkPermissions("DESTROY", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required']
            ]);
            return response()->json(['success' => $this->service->destroy($data["id"], !ControllerBase::$sameTransaction)]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }
}
