<?php

namespace App\Services;

use App\Enums\UsuarioSituacaoSiape;
use App\Facades\SiapeLog;
use App\Models\SiapeBlackListServidor;
use App\Models\Usuario;
use App\Repository\SiapeBlackListServidorRepository;
use App\Repository\UsuarioRepository;
use App\Services\ServiceBase;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Str;

class SiapeBlackListServidorService extends ServiceBase
{
    protected SiapeBlackListServidorRepository $siapeBlackListServidorRepository;
    protected UsuarioRepository $usuarioRepository;

    public function __construct($collection = null) {
        $this->siapeBlackListServidorRepository = app(SiapeBlackListServidorRepository::class);
        $this->usuarioRepository = app(UsuarioRepository::class);
        parent::__construct($collection);
    }

    public function remover(string $cpf): array
    {
        try {
            $registros = SiapeBlackListServidor::where('cpf', $cpf)->get();
            
            if ($registros->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'CPF não encontrado na blacklist',
                    'count' => 0
                ];
            }
            
            $count = $registros->count();
            
            foreach ($registros as $registro) {
                $registro->forceDelete();
            }

            $usuario = Usuario::where('cpf', $cpf)->first();
            if ($usuario) {
                $usuario->update(['situacao_siape' => 'ATIVO', 'data_ativacao_temporaria' => null]);
            }
            
            return [
                'success' => true,
                'message' => "CPF removido da blacklist com sucesso. {$count} registro(s) removido(s).",
                'count' => $count
            ];
        } catch (Exception $e) {
            report($e);
            throw new Exception('Erro ao remover CPF da blacklist: ' . $e->getMessage());
        }
    }

    /**
     * Adiciona matrícula à blacklist se ainda não existir.
     */
    public function adicionar(string $cpf, ?string $matricula, string $motivo = 'Adicionado automaticamente via integração'): void
    {
        if (empty($matricula)) return;

        if (!$this->siapeBlackListServidorRepository->exists($cpf, $matricula)) {
            $this->siapeBlackListServidorRepository->create([
                'id' => Str::uuid(),
                'cpf' => $cpf,
                'matricula' => $matricula,
                'response' => $motivo,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
            SiapeLog::info('Usuário adicionado à blacklist', ['cpf' => $cpf, 'matricula' => $matricula]);
        }
    }

    /**
     * Verifica se o usuário está na blacklist e o reativa se necessário.
     * Retorna true se encontrou e removeu registro.
     */
    public function verificarERemover(string $cpf, ?string $matricula = null): bool
    {
        $registro = $this->siapeBlackListServidorRepository->findByCpfAndOptionalMatricula($cpf, $matricula);

        if (!$registro) {
            return false;
        }

        if ((int) ($registro->inativado ?? 0) === 1) {
            $usuario = Usuario::where('cpf', $cpf)
                ->when($matricula, fn($q) => $q->where('matricula', $matricula))
                ->first();

            if ($usuario) {
                $this->usuarioRepository->update($usuario->id, [
                    'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value
                ]);
                SiapeLog::info('Usuário reativado pela remoção da blacklist', [
                    'cpf' => $cpf,
                    'usuario_id' => $usuario->id
                ]);
            }
        }

        $this->siapeBlackListServidorRepository->forceDelete($registro->id);
        SiapeLog::info('Registro removido da blacklist', ['cpf' => $cpf, 'matricula' => $matricula]);

        return true;
    }
}