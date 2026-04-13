<?php
namespace App\DTOs;

use Illuminate\Support\Collection;

class ListResult
{
    public function __construct(
        public Collection $data,
        public int $total
    ) {}

    public function toArray(): array
    {
        return [
            'rows' => $this->data,
            'count' => $this->total,
        ];
    }
}
