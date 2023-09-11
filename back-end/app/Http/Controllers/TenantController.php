<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class TenantController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        /* Verifica se foi passada a credencial do administrador do sistema */
        if(false) throw new ServerException("CapacidadeStore", "Inserção não realizada");
    }

    public function cidades(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->cidades($data['tenant_id'])
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
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->migrate($data['tenant_id'])
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
}
