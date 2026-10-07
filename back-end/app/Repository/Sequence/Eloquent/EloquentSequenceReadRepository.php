<?php

declare(strict_types=1);

namespace App\Repository\Sequence\Eloquent;

use App\Enums\SequenceType;
use App\Repository\Sequence\Contracts\SequenceReadRepositoryContract;
use Illuminate\Support\Facades\DB;

class EloquentSequenceReadRepository implements SequenceReadRepositoryContract
{
    public function lockSequenceRow(): bool
    {
        return DB::connection('tenant')
            ->table('sequences')
            ->lockForUpdate()
            ->first() !== null;
    }

    public function maximumNumber(SequenceType $type): int
    {
        return (int) (DB::connection('tenant')
            ->table($type->table())
            ->max('numero') ?? 0);
    }
}
