<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class BatchController extends Controller
{
    /**
     * Run batch for each action
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function run(Request $request)
    {
        try {
            $data = $request->validate([
                'sameTransaction' => ['required'],
                'actions' => ['required', 'array']
            ]);
            $sameTransaction = $data["sameTransaction"];
            ControllerBase::$sameTransaction = $sameTransaction;
            $returns = [];
            try {
                if($sameTransaction) DB::beginTransaction();
                foreach($data["actions"] as $action) {
                    $returns[] = $this->runAction($request, $action["route"], $action["method"], $action["data"]);
                }
                if($sameTransaction) DB::commit();
            } catch (Throwable $e) {
                if($sameTransaction) DB::rollback();
                throw $e;
            }
            return response()->json([
                'success' => true,
                'returns' => $returns
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado ao tentar salvar o registro"]);
        }
    }

    private function runAction(Request $from, string $url, string $method, $params) {
        $request = Request::create($url, $method, $params);
        $request->headers->add([
            "Content-Type" => $from->headers->get("Content-Type"),
            "Cookie" => $from->headers->get("Cookie"),
            "X-Entidade" => $from->headers->get("X-Entidade"),
            "X-Petrvs" => $from->headers->get("X-Petrvs"),
            "X-Xsrf-Token" => $from->headers->get("X-Xsrf-Token")
        ]);
        $response = app()->handle($request);
        return json_decode($response->getContent(), true); 
    }

}
