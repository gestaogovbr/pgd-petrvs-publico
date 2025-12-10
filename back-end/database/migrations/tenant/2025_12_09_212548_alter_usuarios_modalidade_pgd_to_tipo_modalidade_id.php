<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

return new class extends Migration
{
    public function up(): void
    {
        DB::transaction(function () {
            $backupTable = 'usuarios_backup_modalidade_pgd';

            if (!Schema::hasTable($backupTable)) {
                Schema::create($backupTable, function (Blueprint $table) {
                    $table->uuid('id')->primary();
                    $table->uuid('modalidade_pgd')->nullable();
                    $table->string('participa_pgd', 10)->nullable();
                });
            }

            DB::statement("INSERT INTO `$backupTable` (`id`, `modalidade_pgd`, `participa_pgd`) SELECT `id`, `modalidade_pgd`, `participa_pgd` FROM `usuarios`");

            try {
                Schema::table('usuarios', function (Blueprint $table) {
                    $table->dropForeign('usuarios_modalidade_pgd_foreign');
                });
            } catch (\Throwable $e) {
            }

            Schema::table('usuarios', function (Blueprint $table) {
                $table->renameColumn('modalidade_pgd', 'tipo_modalidade_id');
            });

            try {
                Schema::table('usuarios', function (Blueprint $table) {
                    $table->foreign('tipo_modalidade_id')
                        ->references('id')
                        ->on('tipos_modalidades')
                        ->onDelete('restrict')
                        ->onUpdate('cascade');
                });
            } catch (\Throwable $e) {
            }

            $presencialId = DB::table('tipos_modalidades')
                ->where('nome', 'Presencial')
                ->whereNull('deleted_at')
                ->value('id');

            $semDadosSiapeId = DB::table('tipos_modalidades')
                ->where('nome', 'Sem dados do SIAPE')
                ->whereNull('deleted_at')
                ->value('id');

            if (!$presencialId || !$semDadosSiapeId) {
                Artisan::call('db:seed', [
                    '--class' => 'In24_2023Seeder',
                    '--force' => true,
                ]);

                $presencialId = DB::table('tipos_modalidades')
                    ->where('nome', 'Presencial')
                    ->whereNull('deleted_at')
                    ->value('id');

                $semDadosSiapeId = DB::table('tipos_modalidades')
                    ->where('nome', 'Sem dados do SIAPE')
                    ->whereNull('deleted_at')
                    ->value('id');
            }

            DB::statement(<<<SQL
                UPDATE `usuarios` AS u
                INNER JOIN `$backupTable` AS b ON b.id = u.id
                INNER JOIN `tipos_modalidades_siape` AS tms ON tms.id = b.modalidade_pgd
                SET u.tipo_modalidade_id = tms.tipo_modalidade_id
                WHERE b.modalidade_pgd IS NOT NULL
            SQL);

            DB::update(
                "UPDATE `usuarios` AS u INNER JOIN `$backupTable` AS b ON b.id = u.id " .
                "SET u.tipo_modalidade_id = ? " .
                "WHERE b.modalidade_pgd IS NULL AND u.participa_pgd = 'não' AND (u.tipo_modalidade_id IS NULL OR u.tipo_modalidade_id = '')",
                [$presencialId]
            );

            DB::update(
                "UPDATE `usuarios` AS u INNER JOIN `$backupTable` AS b ON b.id = u.id " .
                "SET u.tipo_modalidade_id = ? " .
                "WHERE b.modalidade_pgd IS NULL AND u.participa_pgd = 'sim' AND (u.tipo_modalidade_id IS NULL OR u.tipo_modalidade_id = '')",
                [$semDadosSiapeId]
            );

            $nulls = DB::table('usuarios')->whereNull('tipo_modalidade_id')->count();
            if ($nulls > 0) {
                DB::table('usuarios')
                  ->whereNull('tipo_modalidade_id')
                  ->update(['tipo_modalidade_id' => $semDadosSiapeId]);
            }

            Schema::table('usuarios', function (Blueprint $table) {
                $table->uuid('tipo_modalidade_id')->nullable(false)->change();
            });

            Schema::dropIfExists($backupTable);
        });
    }

    public function down(): void
    {
        try {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->dropForeign(['tipo_modalidade_id']);
            });
        } catch (\Throwable $e) {
        }

        try {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->uuid('tipo_modalidade_id')->nullable()->change();
            });
        } catch (\Throwable $e) {
        }

        Schema::table('usuarios', function (Blueprint $table) {
            $table->renameColumn('tipo_modalidade_id', 'modalidade_pgd');
        });

        try {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->foreign('modalidade_pgd')->references('id')->on('tipos_modalidades_siape');
            });
        } catch (\Throwable $e) {
        }
    }
};
