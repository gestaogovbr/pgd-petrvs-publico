<?php

declare(strict_types=1);

namespace App\Repository\Sequence\Contracts;

use App\Enums\SequenceType;

interface SequenceWriteRepositoryContract
{
    /** @param array<string, int> $counters */
    public function insertInitialSequence(array $counters): void;

    public function incrementAndGet(SequenceType $type): int;
}
