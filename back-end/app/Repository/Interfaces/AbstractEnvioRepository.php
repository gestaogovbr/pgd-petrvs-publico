<?php

declare(strict_types=1);

namespace App\Repository\Interfaces;

use Illuminate\Database\Eloquent\Model;

/**
 * @template T of Model
 *
 */
interface AbstractEnvioRepository extends AbstractEnvioReadRepository, AbstractEnvioWriteRepository
{
}
