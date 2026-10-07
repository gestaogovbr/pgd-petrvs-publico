<?php

declare(strict_types=1);

namespace App\Repository\Sequence\Eloquent;

use App\Enums\SequenceType;
use App\Repository\Sequence\Contracts\SequenceWriteRepositoryContract;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class EloquentSequenceWriteRepository implements SequenceWriteRepositoryContract
{
    private const SINGLETON_ID = 1;

    public function insertInitialSequence(array $counters): void
    {
        DB::connection('tenant')->table('sequences')->insertOrIgnore([
            'id' => self::SINGLETON_ID,
            'created_at' => now(),
            'updated_at' => now(),
            ...$counters,
        ]);
    }

    public function incrementAndGet(SequenceType $type): int
    {
        $result = DB::connection('tenant')->select("CALL {$type->value}()");
        $number = $result[0]->number ?? null;

        if ($number === null) {
            throw new RuntimeException("A sequência {$type->value} não retornou um número no tenant atual.");
        }

        return (int) $number;
    }
}
