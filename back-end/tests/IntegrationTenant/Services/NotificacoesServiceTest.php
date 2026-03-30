<?php

use App\Models\Entidade;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\NotificacoesService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Config;

beforeEach(function () {
    $this->service = new NotificacoesService();
});

test('não despacha ProcessEmails e não cria destinatário EMAIL quando email do usuário é nulo', function () {
    Config::set('notificacoes', [
        'petrvs' => ['enviar' => true],
        'email' => ['enviar' => true, 'signature' => ''],
        'whatsapp' => ['enviar' => false],
    ]);

    $entidade = Entidade::factory()->create();
    $unidade = Unidade::factory()->create(['entidade_id' => $entidade->id]);
    $usuario = Usuario::factory()->create(['email' => null]);

    $atividade = (object) [
        'numero' => 'ATV-001',
        'usuario' => $usuario,
        'unidade' => $unidade,
    ];

    $params = ['atividade' => $atividade];

    Bus::fake();

    $this->service->send('DMD_DISTRIBUICAO', $params);

    Bus::assertNotDispatched(\App\Jobs\ProcessEmails::class);

    $this->assertDatabaseHas('notificacao_destinatarios', [
        'tipo' => 'PETRVS',
        'usuario_id' => $usuario->id,
    ]);

    $this->assertDatabaseMissing('notificacao_destinatarios', [
        'tipo' => 'EMAIL',
        'usuario_id' => $usuario->id,
    ]);
});
