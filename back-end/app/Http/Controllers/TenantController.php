<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class TenantController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        /* Verifica se foi passada a credencial do administrador do sistema */
        if(false) throw new ServerException("CapacidadeStore", "Inserção não realizada");
    }

    public function store(Request $request) {
        try{
            try {
                $this->checkPermissions("STORE", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
                $data = $request->validate([
                    'entity' => ['required'],
                    'with' => ['array']
                ]);
                $data['entity']['created_at']=  Carbon::now()->toDateTimeString();
                $data['entity']['updated_at']=  Carbon::now()->toDateTimeString();
                $unidade = $this->getUnidade($request);
                $entity = $this->service->store($data['entity'], $unidade);
                $entity = $entity ?? (object) $data['entity'];
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
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function generateCertificateKeys() {
        try {
            return response()->json([
                'success' => true,
                'data' => $this->service->generateCertificateKeys()
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }


    public function cidades(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->cidadeSeeder($data['tenant_id'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function tiposCapacidades(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->tipoCapacidadeSeeder($data['tenant_id'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function migrations(Request $request) {
        try {
            $data = $request->tenant_id??null;
            return response()->json([
                'success' => true,
                'data' => $this->service->migrate($data)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function resetdb(Request $request) {
        try {
            return response()->json([
                'success' => true,
                'data' => $this->service->resetBD()
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function cleandb(Request $request) {
        try {
            $data = $request->tenant_id??null;
            return response()->json([
                'success' => true,
                'data' => $this->service->cleanDB($data)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function seeders(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->seeders($data['tenant_id'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function usuario(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->usuarioSeeder($data['tenant_id'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function entidade(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->entidadeSeeder($data['tenant_id'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function database(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->databaseSeeder($data['tenant_id'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function deleteTenant(Request $request) {
        try {
            $data= $this->service->deleteTenant($request->tenant_id);
            return response()->json([
                'success' => true,
                'data' =>$data
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
