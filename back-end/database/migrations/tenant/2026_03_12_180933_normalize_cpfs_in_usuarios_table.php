<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::beginTransaction();

        try {
            DB::table('usuarios')
                ->select(['id', 'cpf'])
                ->whereNotNull('cpf')
                ->whereRaw("cpf REGEXP '[^0-9]'")
                ->orderBy('id')
                ->chunk(1000, function ($usuarios): void {
                    $updatesById = [];

                    foreach ($usuarios as $usuario) {
                        $cpf = (string) $usuario->cpf;
                        $cpfSemMascara = preg_replace('/\\D+/', '', $cpf);

                        if ($cpfSemMascara === null) {
                            continue;
                        }

                        if ($cpfSemMascara === $cpf) {
                            continue;
                        }

                        if (strlen($cpfSemMascara) !== 11) {
                            continue;
                        }

                        $updatesById[(string) $usuario->id] = $cpfSemMascara;
                    }

                    if ($updatesById === []) {
                        return;
                    }

                    $caseParts = [];
                    $caseBindings = [];
                    $ids = [];

                    foreach ($updatesById as $id => $cpfSemMascara) {
                        $caseParts[] = 'WHEN ? THEN ?';
                        $caseBindings[] = $id;
                        $caseBindings[] = $cpfSemMascara;
                        $ids[] = $id;
                    }

                    $inPlaceholders = implode(',', array_fill(0, count($ids), '?'));
                    $sql = 'UPDATE usuarios SET cpf = CASE id ' . implode(' ', $caseParts) . ' END WHERE id IN (' . $inPlaceholders . ')';

                    DB::update($sql, array_merge($caseBindings, $ids));
                });

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function down(): void
    {
    }
};
