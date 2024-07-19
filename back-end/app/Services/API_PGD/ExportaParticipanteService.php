<?php
namespace App\Services\API_PGD;



class ExportarPlanoEntregasService extends ExportarService
{
    public function __construct(private HttpSenderService $httpSender)
    {
    }

    public function getBody($dados) : array
    {
       return [];
    }

    public function getBodyMock($dados): array{
        return [];
    }
}

