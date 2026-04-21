<?php

use App\Enums\PerfilEnum;
use App\Exceptions\NotFoundException;
use App\Models\Afastamento;
use App\Models\Ocorrencia;
use App\Models\Perfil;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use App\Models\Programa;
use App\Models\Template;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\OcorrenciaService;
use App\Services\ServiceBase;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

beforeEach(function () {
    $this->tipoModalidade = TipoModalidade::factory()->create();
    $this->perfilParticipante = Perfil::factory()->create(['nivel' => PerfilEnum::PARTICIPANTE->value]);
    $this->unidade = Unidade::factory()->create();

    $template = Template::factory()->create();
    $this->programa = Programa::factory()->create([
        'template_tcr_id' => $template->id,
    ]);

    $this->usuarioParticipante = Usuario::factory()->create([
        'perfil_id' => $this->perfilParticipante->id,
        'tipo_modalidade_id' => $this->tipoModalidade->id,
    ]);

    $this->outroUsuario = Usuario::factory()->create([
        'perfil_id' => $this->perfilParticipante->id,
        'tipo_modalidade_id' => $this->tipoModalidade->id,
    ]);

    $this->planoTrabalho = PlanoTrabalho::factory()->create([
        'usuario_id' => $this->usuarioParticipante->id,
        'unidade_id' => $this->unidade->id,
        'tipo_modalidade_id' => $this->tipoModalidade->id,
        'programa_id' => $this->programa->id,
    ]);
});

describe('OcorrenciaService::getById', function () {
    test('usuário participante obtém apenas próprio afastamento', function () {
        Auth::login($this->usuarioParticipante);

        $meu = Afastamento::factory()->create(['usuario_id' => $this->usuarioParticipante->id]);
        $deOutro = Afastamento::factory()->create(['usuario_id' => $this->outroUsuario->id]);

        /** @var OcorrenciaService $service */
        $service = app(OcorrenciaService::class);

        expect(fn () => $service->getById(['id' => $deOutro->id]))->toThrow(NotFoundException::class);

        $found = $service->getById(['id' => $meu->id]);
        expect($found->id)->toBe($meu->id);

        Auth::logout();
    });
});

describe('OcorrenciaService::afterStore', function () {
    test('atualiza datas no snapshot da consolidação quando existe vínculo por ocorrencia_id', function () {
        $sharedId = (string) Str::uuid();

        Ocorrencia::factory()->create([
            'id' => $sharedId,
            'usuario_id' => $this->usuarioParticipante->id,
            'plano_trabalho_id' => $this->planoTrabalho->id,
        ]);

        $afastamento = Afastamento::factory()->create([
            'id' => $sharedId,
            'usuario_id' => $this->usuarioParticipante->id,
        ]);

        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $this->planoTrabalho->id,
        ]);

        PlanoTrabalhoConsolidacaoOcorrencia::query()->create([
            'plano_trabalho_consolidacao_id' => $consolidacao->id,
            'ocorrencia_id' => $sharedId,
            'data_conclusao' => now(),
            'snapshot' => [
                'data_inicio' => '2024-01-01T08:00:00',
                'data_fim' => '2024-01-15T18:00:00',
            ],
        ]);

        $afastamento->data_inicio = '2025-03-01 09:00:00';
        $afastamento->data_fim = '2025-03-10 17:00:00';
        $afastamento->save();

        /** @var OcorrenciaService $service */
        $service = app(OcorrenciaService::class);
        $service->afterStore($afastamento, ServiceBase::ACTION_INSERT);

        $row = PlanoTrabalhoConsolidacaoOcorrencia::query()->where('ocorrencia_id', $sharedId)->first();
        $afastamento->refresh();

        // afterStore replica o valor do model (string datetime do MySQL), não formato ISO8601 com "T".
        $inicioSnapshot = Carbon::parse((string) data_get($row->snapshot, 'data_inicio'));
        $fimSnapshot = Carbon::parse((string) data_get($row->snapshot, 'data_fim'));

        expect($row)->not->toBeNull()
            ->and($inicioSnapshot->equalTo(Carbon::parse($afastamento->data_inicio)))->toBeTrue()
            ->and($fimSnapshot->equalTo(Carbon::parse($afastamento->data_fim)))->toBeTrue();
    });
});
