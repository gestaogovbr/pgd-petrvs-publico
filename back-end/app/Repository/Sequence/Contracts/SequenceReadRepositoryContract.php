<?php

declare(strict_types=1);

namespace App\Repository\Sequence\Contracts;

use App\Enums\SequenceType;

interface SequenceReadRepositoryContract
{
    public function lockSequenceRow(): bool;

    public function maximumNumber(SequenceType $type): int;
}
