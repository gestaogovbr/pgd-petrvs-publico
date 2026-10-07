<?php

namespace App\Services;

use App\Enums\SequenceType;
use App\Repository\Sequence\Contracts\SequenceReadRepositoryContract;
use App\Repository\Sequence\Contracts\SequenceWriteRepositoryContract;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class TenantSequenceService
{
    public function __construct(
        private readonly SequenceReadRepositoryContract $readRepository,
        private readonly SequenceWriteRepositoryContract $writeRepository,
    ) {}

    public function nextNumber(SequenceType $type): int
    {
        return DB::connection('tenant')->transaction(function () use ($type): int {
            if (!$this->readRepository->lockSequenceRow()) {
                $counters = [];

                foreach (SequenceType::cases() as $sequenceType) {
                    $counters[$sequenceType->column()] = $this->readRepository->maximumNumber($sequenceType);
                }

                $this->writeRepository->insertInitialSequence($counters);
            }

            // Re-read under lock in case another request initialized the row concurrently.
            if (!$this->readRepository->lockSequenceRow()) {
                throw new RuntimeException('Não foi possível inicializar a sequência do tenant atual.');
            }

            return $this->writeRepository->incrementAndGet($type);
        }, 3);
    }
}
