<?php

use App\Enums\EnvioPlanoEntregaStatusEnum;
use App\Enums\StatusEnum;
use App\Jobs\Envio\Resources\PlanoEntregaResource;

describe('PlanoEntrega envio por status', function () {
    it('permitemEnvioPlanoEntrega inclui CANCELADO além dos status já enviáveis', function () {
        expect(StatusEnum::permitemEnvioPlanoEntrega())
            ->toEqual([
                StatusEnum::ATIVO->value,
                StatusEnum::CONCLUIDO->value,
                StatusEnum::AVALIADO->value,
                StatusEnum::CANCELADO->value,
            ]);
    });

    it('converte status CANCELADO para código 1 da API PGD', function () {
        $resource = new PlanoEntregaResource(null);

        expect($resource->converteStatus(StatusEnum::CANCELADO->value))
            ->toBe(EnvioPlanoEntregaStatusEnum::CANCELADO->value);
    });

    it('converte status ATIVO, CONCLUIDO e AVALIADO para códigos da API PGD', function () {
        $resource = new PlanoEntregaResource(null);

        expect($resource->converteStatus(StatusEnum::ATIVO->value))
            ->toBe(EnvioPlanoEntregaStatusEnum::EM_EXECUCAO->value);
        expect($resource->converteStatus(StatusEnum::CONCLUIDO->value))
            ->toBe(EnvioPlanoEntregaStatusEnum::CONCLUIDO->value);
        expect($resource->converteStatus(StatusEnum::AVALIADO->value))
            ->toBe(EnvioPlanoEntregaStatusEnum::AVALIADO->value);
    });
});
