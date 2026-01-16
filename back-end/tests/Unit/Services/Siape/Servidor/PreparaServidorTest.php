<?php

use App\Services\Siape\Servidor\PreparaServidor;

class PreparaServidorTestClass
{
    use PreparaServidor;
}

# TODO: Seria interessante decompor essa classe em um helper
describe('PreparaServidor', function () {
    describe('getAtivo', function () {
        test('retorna dados quando matriculas e dados existem', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $servidor = [
                'matriculas' => [
                    'dados' => ['matricula' => '123456', 'ativo' => true]
                ]
            ];

            $result = $preparaServidor->getAtivo($servidor);

            expect($result)->toBe(['matricula' => '123456', 'ativo' => true]);
        });

        test('retorna null quando matriculas não existe', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $servidor = ['nome' => 'João'];

            $result = $preparaServidor->getAtivo($servidor);

            expect($result)->toBeNull();
        });
    });

    describe('getEmail', function () {
        test('retorna email funcional quando existe', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $matriculas = ['matriculasiape' => '123456'];
            $dadosFuncionais = ['emailfuncional' => 'joao@gov.br'];

            $result = $preparaServidor->getEmail($matriculas, $dadosFuncionais);

            expect($result)->toBe('joao@gov.br');
        });

        test('gera email padrão quando email funcional está vazio', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $matriculas = ['matriculasiape' => '123456'];
            $dadosFuncionais = ['emailfuncional' => ''];

            $result = $preparaServidor->getEmail($matriculas, $dadosFuncionais);

            expect($result)->toBe('123456@petrvs.gov.br');
        });
    });

    describe('getSexo', function () {
        test('converte M para MASCULINO', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $servidor = ['sexo' => 'M'];

            $preparaServidor->getSexo($servidor);

            expect($servidor['sexo'])->toBe('MASCULINO');
        });

        test('converte F para FEMININO', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $servidor = ['sexo' => 'F'];

            $preparaServidor->getSexo($servidor);

            expect($servidor['sexo'])->toBe('FEMININO');
        });

        test('define MASCULINO como padrão quando sexo está vazio', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $servidor = ['sexo' => ''];

            $preparaServidor->getSexo($servidor);

            expect($servidor['sexo'])->toBe('MASCULINO');
        });
    });

    describe('getDataNascimento', function () {
        test('retorna data SIAPE quando tipo é SIAPE', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $servidor = ['data_nascimento' => '1990-01-01'];

            $result = $preparaServidor->getDataNascimento($servidor, 'SIAPE');

            expect($result)->toBe('1990-01-01');
        });

        test('formata data WSO2 quando tipo é WSO2', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $servidor = ['datanascimento' => '1990-01-01'];

            $result = $preparaServidor->getDataNascimento($servidor, 'WSO2');

            expect($result)->toBe('1990-01-01 00:00:00');
        });
    });

    test('getCPFChefiaImediata retorna CPF da chefia quando existe', function () {
        $preparaServidor = new PreparaServidorTestClass();
        $servidor = ['cpf_chefia_imediata' => '12345678901'];

        $result = $preparaServidor->getCPFChefiaImediata($servidor);

        expect($result)->toBe('12345678901');
    });

    describe('getSituacaoFuncional', function () {
        test('retorna situação funcional para código válido', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $ativo = ['codsitfuncional' => '1'];

            $result = $preparaServidor->getSituacaoFuncional($ativo);

            expect($result)->toBe('ATIVO_PERMANENTE');
        });

        test('retorna situação funcional para código numérico', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $ativo = ['codsitfuncional' => 2];

            $result = $preparaServidor->getSituacaoFuncional($ativo);

            expect($result)->toBe('APOSENTADO');
        });

        test('retorna DESCONHECIDO para código inexistente', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $ativo = ['codsitfuncional' => '999'];

            $result = $preparaServidor->getSituacaoFuncional($ativo);

            expect($result)->toBe('DESCONHECIDO');
        });

        test('retorna DESCONHECIDO para código zero', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $ativo = ['codsitfuncional' => '0'];

            $result = $preparaServidor->getSituacaoFuncional($ativo);

            expect($result)->toBe('DESCONHECIDO');
        });

        test('retorna DESCONHECIDO para string não numérica', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $ativo = ['codsitfuncional' => 'abc'];

            $result = $preparaServidor->getSituacaoFuncional($ativo);

            expect($result)->toBe('DESCONHECIDO');
        });

        test('retorna DESCONHECIDO quando codsitfuncional não existe', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $ativo = [];

            $result = $preparaServidor->getSituacaoFuncional($ativo);

            expect($result)->toBe('DESCONHECIDO');
        });

        test('converte float para int', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $ativo = ['codsitfuncional' => 1.9];

            $result = $preparaServidor->getSituacaoFuncional($ativo);

            expect($result)->toBe('ATIVO_PERMANENTE');
        });

        test('funciona com códigos especiais', function () {
            $preparaServidor = new PreparaServidorTestClass();
            $ativo = ['codsitfuncional' => '66'];

            $result = $preparaServidor->getSituacaoFuncional($ativo);

            expect($result)->toBe('ESTAGIARIO');
        });
    });
});
