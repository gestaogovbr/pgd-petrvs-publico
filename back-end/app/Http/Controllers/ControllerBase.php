<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;
use App\Exceptions\LogError;
use Throwable;

abstract class ControllerBase extends Controller
{
    public string $collection = "";
    public $service = null;
    public $updatable = [];

    public function __construct() {
        if(empty($this->collection)) {
            $this->collection = str_replace("Controller", "", str_replace("App\\Http\\Controllers", "App\\Models", get_class($this)));
        }
        if(empty($this->service)) {
            $chield = str_replace("App\\Http", "App", str_replace("Controller", "Service", get_class($this)));
            try {
                if(!empty(app($chield))) {
                    $this->service = new $chield();
                }
            } catch (Illuminate\Contracts\Container\BindingResolutionException $e) {}
        }
    }

    abstract protected function checkPermissions($action, $request, $service, $unidade, $usuario);

    public function getPetrvsHeader(Request $request) {
        $header = $request->header('X-PETRVS');
        if(!empty($header)) {
            return json_decode(base64_decode($header), true);
        }
        return [];
    }

    public function getUnidade(Request $request) {
        $headers = $this->getPetrvsHeader($request);
        $unidade_id = !empty($headers) && !empty($headers["unidade_id"]) ? $headers["unidade_id"] : $request->session()->get("unidade");
        if(!empty($unidade_id)) {
            $usuario = Usuario::where("id", Auth::user()->id)->with(["lotacoes" => function ($query) use ($unidade_id) {
                $query->whereNull("data_fim")->where("unidade_id", $unidade_id);
            }, "lotacoes.unidade"])->first();
            if(isset($usuario->lotacoes[0]) && !empty($usuario->lotacoes[0]->unidade_id)) {
                return $usuario->lotacoes[0]->unidade;
            }
        }
        return null;
    }

    public function getUsuario(Request $request) {
        return Usuario::where("id", Auth::user()->id)->with(["lotacoes" => function ($query) {
            $query->whereNull("data_fim");
        }, "lotacoes.unidade"])->first();
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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

    /**
     * Download a file with signed url
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string $file
     * @return \Illuminate\Http\Response
     */
    public function download(Request $request, string $file)
    {
        //$this->checkPermissions("DOWNLOAD", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
        return response()->file($this->service->download($file));
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
            $entity = $this->service->store($data['entity'], $unidade);
            $result = $this->service->getById([
                'id' => $entity->id,
                'with' => $data['with']
            ]);
            return response()->json([
                'success' => true,
                'rows' => [$result] //[$this->service->store($request->all(), $unidade)]
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
            //foreach (array_keys($request->all()) as $key) {
            foreach (array_keys($data["data"]) as $key) {
                if($key != "id" && !in_array($key, $this->updatable)) {
                    return response()->json(['error' => "Não é possível atualizar"]);
                }
            }
            $unidade = $this->getUnidade($request);
            $data['data']['id'] = $data['id'];
            $entity = $this->service->update($data['data'], $unidade);
            $result = $this->service->getById([
                'id' => $entity->id,
                'with' => $data['with']
            ]);
            return response()->json([
                'success' => true,
                'rows' => [$result] //$this->service->update($request->all(), $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
                'data' => ['required'],
                'field' => ['required'],
                'with' => ['array']
            ]);
            if(!in_array($data["field"], $this->updatable)) {
                return response()->json(['error' => "Não é possível atualizar"]);
            }
            $unidade = $this->getUnidade($request);
            $entity = $this->service->updateJson($data, $unidade);
            $result = $this->service->getById([
                'id' => $entity->id,
                'with' => $data['with']
            ]);
            return response()->json([
                'success' => true,
                'rows' => [$result] //$this->service->update($request->all(), $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
            return response()->json(['success' => $this->service->destroy($data["id"])]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
