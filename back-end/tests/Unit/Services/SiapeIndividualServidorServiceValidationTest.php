<?php

use App\Services\SiapeIndividualServidorService;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->service = new SiapeIndividualServidorService();
    $this->method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparEValidarCpf');
    $this->method->setAccessible(true);
});

describe('SiapeIndividualServidorService - Validação de CPF', function () {
    
    it('deve retornar cpf limpo quando válido e formatado', function () {
        // Valid CPF: 529.982.247-25
        $cpf = '529.982.247-25';
        $result = $this->method->invoke($this->service, $cpf);
        expect($result)->toBe('52998224725');
    });

    it('deve retornar cpf limpo quando válido e sem formatação', function () {
        // Valid CPF: 52998224725
        $cpf = '52998224725';
        $result = $this->method->invoke($this->service, $cpf);
        expect($result)->toBe('52998224725');
    });

    it('deve lançar exceção quando cpf tem tamanho inválido', function () {
        expect(fn() => $this->method->invoke($this->service, '123456'))
            ->toThrow(Exception::class, 'CPF inválido: O CPF deve conter exatamente 11 dígitos numéricos');
    });

    it('deve lançar exceção quando cpf tem todos dígitos iguais (repetidos)', function () {
        expect(fn() => $this->method->invoke($this->service, '111.111.111-11'))
            ->toThrow(Exception::class, 'CPF inválido: Dígito verificador incorreto ou inválido');
    });

    it('deve lançar exceção quando cpf tem checksum inválido', function () {
        // 123.456.789-01 is invalid.
        expect(fn() => $this->method->invoke($this->service, '12345678901'))
            ->toThrow(Exception::class, 'CPF inválido: Dígito verificador incorreto ou inválido');
    });

    it('deve proteger contra injeção de SQL falhando na sanitização ou validação', function () {
        // '12345678901 OR 1=1' -> sanitization removes ' OR =', leaves '1234567890111' -> 13 chars -> fails size check
        $input = '52998224725 OR 1=1'; 
        expect(fn() => $this->method->invoke($this->service, $input))
            ->toThrow(Exception::class, 'CPF inválido: O CPF deve conter exatamente 11 dígitos numéricos');
    });

    it('deve proteger contra XSS falhando na validação', function () {
        // '<script>alert(1)</script>' -> sanitized to '1' -> fails size check
        $input = '<script>alert(1)</script>52998224725';
        expect(fn() => $this->method->invoke($this->service, $input))
            ->toThrow(Exception::class, 'CPF inválido: O CPF deve conter exatamente 11 dígitos numéricos');
    });

});
