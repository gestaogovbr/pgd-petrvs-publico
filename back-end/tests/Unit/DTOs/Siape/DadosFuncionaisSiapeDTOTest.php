<?php

use App\DTOs\Siape\DadosFuncionaisSiapeDTO;

it('normaliza campos funcionais usados na carga individual', function () {
    $dto = DadosFuncionaisSiapeDTO::fromArray([
        'matriculaSiape' => ' 1234567 ',
        'codUorgExercicio' => '00123',
        'codUorgLotacao' => '00456',
        'emailInstitucional' => ' SERVIDOR@EXEMPLO.GOV.BR ',
        'emailServidor' => 'fallback@exemplo.gov.br',
        'modalidadePGD' => 'Teletrabalho Parcial',
        'participaPGD' => 'SIM',
    ]);

    expect($dto->matriculaSiape())->toBe('1234567')
        ->and($dto->codigosUnidadeCandidatos())->toBe(['00123', '00456'])
        ->and($dto->emailFuncional())->toBe('servidor@exemplo.gov.br')
        ->and($dto->modalidadePgdNormalizada())->toBe('parcial')
        ->and($dto->participaPgdNormalizado())->toBe('sim')
        ->and($dto->atributosUsuarioParciais())->toBe([
            'modalidade_pgd' => 'parcial',
            'participa_pgd' => 'sim',
            'email' => 'servidor@exemplo.gov.br',
        ]);
});

it('usa emailServidor quando emailInstitucional esta vazio ou invalido', function () {
    $dto = DadosFuncionaisSiapeDTO::fromArray([
        'emailInstitucional' => 'email-invalido',
        'emailServidor' => ' SERVIDOR.PESSOAL@EXEMPLO.GOV.BR ',
        'participaPGD' => 'não',
    ]);

    expect($dto->emailFuncional())->toBe('servidor.pessoal@exemplo.gov.br')
        ->and($dto->participaPgdNormalizado())->toBe('não')
        ->and($dto->atributosUsuarioParciais())->toBe([
            'participa_pgd' => 'não',
            'email' => 'servidor.pessoal@exemplo.gov.br',
        ]);
});

it('mantem array original para compatibilidade com fluxos legados', function () {
    $dados = [
        'matriculaSiape' => '123',
        'campoLegado' => ['valor' => true],
    ];

    $dto = DadosFuncionaisSiapeDTO::fromArray($dados);

    expect($dto->toArray())->toBe($dados)
        ->and($dto->keys())->toBe(['matriculaSiape', 'campoLegado']);
});
