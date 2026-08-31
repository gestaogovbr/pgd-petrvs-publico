<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('unidades_executora_historico', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('unidade_id');
            $table->boolean('executora');
            $table->date('data_inicio');
            $table->date('data_fim')->nullable();
            $table->timestamps();

            $table->foreign('unidade_id')->references('id')->on('unidades');
            $table->index(['unidade_id', 'data_inicio']);
        });

        $now = now()->toDateTimeString();

        DB::table('unidades')
            ->whereNull('deleted_at')
            ->orderBy('id')
            ->chunkById(200, function ($unidades) use ($now): void {
                $rows = [];
                foreach ($unidades as $unidade) {
                    $rows[] = [
                        'id' => (string) Str::uuid(),
                        'unidade_id' => $unidade->id,
                        'executora' => (bool) $unidade->executora,
                        'data_inicio' => $unidade->created_at
                            ? date('Y-m-d', strtotime((string) $unidade->created_at))
                            : '2000-01-01',
                        'data_fim' => null,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }

                if ($rows !== []) {
                    DB::table('unidades_executora_historico')->insert($rows);
                }
            }, 'id');
    }

    public function down(): void
    {
        Schema::dropIfExists('unidades_executora_historico');
    }
};
