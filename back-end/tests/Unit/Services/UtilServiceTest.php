<?php

use App\Services\UtilService;
use Carbon\Carbon;

#TODO: UtilService é uma god-class de utilidades. Seria uma boa dividí-la por temas (ex.: formatadores, manipuladores de array, conversores de dados, etc.)

describe('valueOrDefault', function () {
    test('retorna valor padrão quando valor é null', function () {
        expect(UtilService::valueOrDefault(null, 'default'))->toBe('default');
    });

    test('retorna valor original quando não é null', function () {
        expect(UtilService::valueOrDefault('value', 'default'))->toBe('value');
    });

    describe('option = uorg', function () {
        test('converte string numérica', function () {
            expect(UtilService::valueOrDefault('123', 'default', 'uorg'))->toBe('123');
        });

        test('é case insensitive', function () {
            expect(UtilService::valueOrDefault('123', 'default', 'UORG'))->toBe('123');
        });

        test('converte número para string', function () {
            expect(UtilService::valueOrDefault(456, 'default', 'uorg'))->toBe('456');
        });

        test('converte float para int string', function () {
            expect(UtilService::valueOrDefault(78.9, 'default', 'uorg'))->toBe('78');
        });

        test('retorna default para zero', function () {
            expect(UtilService::valueOrDefault(0, 'default', 'uorg'))->toBe('default');
        });

        test('retorna default para string não numérica', function () {
            expect(UtilService::valueOrDefault('abc', 'default', 'uorg'))->toBe('default');
        });

        test('retorna default para array vazio', function () {
            expect(UtilService::valueOrDefault([], 'default', 'uorg'))->toBe('default');
        });

        test('converte arrays populados em \'1\'', function () {
            expect(UtilService::valueOrDefault([5, 2, 3], 'default', 'uorg'))->toBe('1');
        }); # de fato deveria funcionar assim?
    });
});

describe("uuid", function () {
    test('c/ inputs iguais, deve retornar o mesmo uuid, com base no md5($text)', function () {
        $result1 = UtilService::uuid('test');
        $result2 = UtilService::uuid('test');
        expect($result1)->toBe($result2);
    });

    test('c/ inputs diferentes, deve retornar uuids diferentes, com base no md5($text)', function () {
        $result1 = UtilService::uuid('test');
        $result2 = UtilService::uuid('test2');
        expect($result1)->not->toBe($result2);
    });

    test('s/ inputs, gera uuids completamente aleatórios', function () {
        $result1 = UtilService::uuid();
        $result2 = UtilService::uuid();
        expect($result1)->not->toBe($result2);
    });
});

describe('differentAttributes', function () {
    test('retorna array vazio quando valores são idênticos', function () {
        $current = ['name' => 'John', 'age' => 30];
        $previous = ['name' => 'John', 'age' => 30];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toBeEmpty();
    });

    test('detecta diferenças simples de valores', function () {
        $current = ['name' => 'John', 'age' => 31];
        $previous = ['name' => 'John', 'age' => 30];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toBe([['age', 31, 30]]);
    });

    test('detecta valores de array', function () {
        $current = ['tags' => ['php', 'laravel']];
        $previous = ['tags' => ['php']];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toHaveCount(1);
        expect($result[0][0])->toBe('tags*1');
        expect($result[0][1])->toBe('laravel');
        expect($result[0][2])->toBeNull();
    });

    test('detecta string de array vazio', function () {
        $current = ['tags' => '[]'];
        $previous = ['tags' => []];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toBeEmpty();
    });

    test('detecta valores de string JSON', function () {
        $current = ['config' => '{"theme": "dark"}'];
        $previous = ['config' => ['theme' => 'light']];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toHaveCount(1);
        expect($result[0][0])->toBe('config*theme');
        expect($result[0][1])->toBe('dark');
        expect($result[0][2])->toBe('light');
    });

    test('detecta comparações de string de data', function () {
        $current = ['created_at' => '2023-01-01 10:00:00'];
        $previous = ['created_at' => '2023-01-01 09:00:00'];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toBe([['created_at', '2023-01-01 10:00:00', '2023-01-01 09:00:00']]);
    });

    test('detecta valores anteriores ausentes', function () {
        $current = ['name' => 'John', 'age' => 30];
        $previous = ['name' => 'John'];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toBe([['age', 30, null]]);
    });

    test('detecta diferenças de array aninhado', function () {
        $current = ['user' => ['name' => 'John', 'age' => 31]];
        $previous = ['user' => ['name' => 'John', 'age' => 30]];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toBe([['user*age', 31, 30]]);
    });

    test('detecta conversão de array para não-array', function () {
        $current = ['tags' => ['php', 'laravel']];
        $previous = ['tags' => 'old_value'];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toBe([['tags', ['php', 'laravel'], 'old_value']]);
    });

    test('detecta valor anterior nulo com array atual', function () {
        $current = ['tags' => ['php']];
        $previous = ['tags' => null];

        $result = UtilService::differentAttributes($current, $previous);

        expect($result)->toBe([['tags*0', 'php', null]]);
    });
});

describe('object2array', function () {
    test('converte objeto simples para array associativo', function () {
        $object = (object) ['name' => 'John', 'age' => 30];

        $result = UtilService::object2array($object);

        expect($result)->toBe(['name' => 'John', 'age' => 30]);
        expect($result)->toBeArray();
    });

    test('converte objeto para array indexado quando k=0', function () {
        $object = (object) ['name' => 'John', 'age' => 30];

        $result = UtilService::object2array($object, 0);

        expect($result)->toBeArray();
        expect(array_values($result))->toBe(['John', 30]);
    })->skip('edge case não implementado');

    test('converte objeto aninhado para array', function () {
        $object = (object) [
            'user' => (object) ['name' => 'John', 'age' => 30],
            'active' => true
        ];

        $result = UtilService::object2array($object);

        expect($result)->toBe([
            'user' => ['name' => 'John', 'age' => 30],
            'active' => true
        ]);
    });

    test('retorna array inalterado', function () {
        $array = ['name' => 'John', 'age' => 30];

        $result = UtilService::object2array($array);

        expect($result)->toBe($array);
    });

    test('converte string JSON válida para array', function () {
        $jsonString = '{"name": "John", "age": 30}';

        $result = UtilService::object2array($jsonString);

        expect($result)->toBe(['name' => 'John', 'age' => 30]);
    })->skip('edge case não implementado');

    test('retorna null para valores inválidos', function () {
        $result = UtilService::object2array(null);
        expect($result)->toBeNull();

        $result = UtilService::object2array('string inválida');
        expect($result)->toBeNull();
    })->skip('edge case não implementado');

    test('converte stdClass vazia para array vazio', function () {
        $object = new stdClass();

        $result = UtilService::object2array($object);

        expect($result)->toBe([]);
        expect($result)->toBeArray();
    })->skip('edge case não implementado');

    test('preserva tipos de dados primitivos', function () {
        $object = (object) [
            'string' => 'texto',
            'integer' => 42,
            'float' => 3.14,
            'boolean' => true,
            'null' => null
        ];

        $result = UtilService::object2array($object);

        expect($result['string'])->toBe('texto');
        expect($result['integer'])->toBe(42);
        expect($result['float'])->toBe(3.14);
        expect($result['boolean'])->toBe(true);
        expect($result['null'])->toBeNull();
    });

    test('converte array de objetos', function () {
        $objects = [
            (object) ['id' => 1, 'name' => 'John'],
            (object) ['id' => 2, 'name' => 'Jane']
        ];

        $result = UtilService::object2array($objects);

        expect($result)->toBe([
            ['id' => 1, 'name' => 'John'],
            ['id' => 2, 'name' => 'Jane']
        ]);
    });
});

describe('onlyNumbers', function () {
    test('retorna string contendo apenas números', function () {
        expect(UtilService::onlyNumbers('123abc456'))->toBe('123456');
        expect(UtilService::onlyNumbers('abc'))->toBe('');
        expect(UtilService::onlyNumbers(''))->toBe('');
        expect(UtilService::onlyNumbers(null))->toBe('');
    });
});

describe('getNested', function () {
    test('retorna valor aninhado', function () {
        $data = [
            'user' => [
                'name' => 'John',
                'age' => 30
            ],
            'active' => true
        ];

        expect(UtilService::getNested($data, 'user.name'))->toBe('John');
        expect(UtilService::getNested($data, 'user.age'))->toBe(30);
        expect(UtilService::getNested($data, 'active'))->toBe(true);
    });

    test('retorna null se não encontrar o caminho', function () {
        $data = [
            'user' => [
                'name' => 'John',
                'age' => 30
            ],
            'active' => true
        ];

        expect(UtilService::getNested($data, 'user.address'))->toBeNull();
        expect(UtilService::getNested($data, 'user.address.street'))->toBeNull();
        expect(UtilService::getNested($data, 'user.address.street.number'))->toBeNull();
    });

    test('retorna null se o caminho for vazio', function () {
        $data = [
            'user' => [
                'name' => 'John',
                'age' => 30
            ],
            'active' => true
        ];

        expect(UtilService::getNested($data, ''))->toBeNull();
    })->skip('edge case não implementado');

    test('retorna null se o caminho for nulo', function () {
        $data = [
            'user' => [
                'name' => 'John',
                'age' => 30
            ],
            'active' => true
        ];

        expect(UtilService::getNested($data, null))->toBeNull();
    })->skip('edge case não implementado');

    test('retorna null se o caminho for indefinido', function () {
        $data = [
            'user' => [
                'name' => 'John',
                'age' => 30
            ],
            'active' => true
        ];

        expect(UtilService::getNested($data, 'undefined'))->toBeNull();
    });
});

describe('getDateTimeFormatted', function () {
    test('formata data e hora com separador padrão', function () {
        $result = UtilService::getDateTimeFormatted('2023-01-15 14:30:00');

        expect($result)->toBe('15/01/2023 14:30');
    });

    test('formata data e hora com separador customizado', function () {
        $result = UtilService::getDateTimeFormatted('2023-01-15 14:30:00', ' - ');

        expect($result)->toBe('15/01/2023 - 14:30');
    });

    test('formata data com hora zero', function () {
        $result = UtilService::getDateTimeFormatted('2023-01-15 00:00:00');

        expect($result)->toBe('15/01/2023 00:00');
    });

    test('formata data com hora final do dia', function () {
        $result = UtilService::getDateTimeFormatted('2023-12-31 23:59:59');

        expect($result)->toBe('31/12/2023 23:59');
    });

    test('aceita objeto DateTime', function () {
        $dateTime = new DateTime('2023-01-15 14:30:00');

        $result = UtilService::getDateTimeFormatted($dateTime);

        expect($result)->toBe('15/01/2023 14:30');
    });

    test('aceita timestamp Carbon', function () {
        $carbon = Carbon::parse('2023-01-15 14:30:00');

        $result = UtilService::getDateTimeFormatted($carbon);

        expect($result)->toBe('15/01/2023 14:30');
    });
});

describe('asDateTime', function () {
    test('retorna null para valores empty', function () {
        $result = UtilService::asDateTime(null);
        $result2 = UtilService::asDateTime('');

        expect($result)->toBeNull();
        expect($result2)->toBeNull();
    });

    test('retorna DateTime inalterado', function () {
        $dateTime = new DateTime('2023-01-15 14:30:00');

        $result = UtilService::asDateTime($dateTime);

        expect($result)->toBe($dateTime);
    });

    test('converte timestamp para DateTime', function () {
        $timestamp = 1673787000; // 2023-01-15 14:30:00 UTC

        $result = UtilService::asDateTime($timestamp);

        expect($result)->toBeInstanceOf(DateTime::class);
        expect($result->getTimestamp())->toBe($timestamp);
    });

    test('converte timestamp 0 para DateTime', function () {
        $timestamp = 0; // 1970-01-01 00:00:00 UTC

        $result = UtilService::asDateTime($timestamp);

        expect($result)->toBeInstanceOf(DateTime::class);
        expect($result->getTimestamp())->toBe($timestamp);
    })->skip('edge case não implementado');

    test('converte string de data para DateTime', function () {
        $dateString = '2023-01-15 14:30:00';

        $result = UtilService::asDateTime($dateString);

        expect($result)->toBeInstanceOf(DateTime::class);
        expect($result->format('Y-m-d H:i:s'))->toBe($dateString);
    });

    test('converte string de data ISO para DateTime', function () {
        $dateString = '2023-01-15T14:30:00Z';

        $result = UtilService::asDateTime($dateString);

        expect($result)->toBeInstanceOf(DateTime::class);
    });

    test('converte data brasileira para DateTime', function () {
        $dateString = '15/01/2023';

        $result = UtilService::asDateTime($dateString);

        expect($result)->toBeInstanceOf(DateTime::class);
    })->skip('DD/MM/YYYY não está sendo convertido. Nunca recebemos datas nesse formato?');

    test('mantém precisão de segundos', function () {
        $dateString = '2023-01-15 14:30:45';

        $result = UtilService::asDateTime($dateString);

        expect($result->format('Y-m-d H:i:s'))->toBe($dateString);
    });

    test('aceita formato de data sem hora', function () {
        $dateString = '2023-01-15';

        $result = UtilService::asDateTime($dateString);

        expect($result)->toBeInstanceOf(DateTime::class);
        expect($result->format('Y-m-d'))->toBe($dateString);
    });
});

describe('inicialMaiuscula', function () {
    test('converte primeira letra para maiúscula', function () {
        $result = UtilService::inicialMaiuscula('joão');

        expect($result)->toBe('João');
    });

    test('mantém primeira letra já maiúscula', function () {
        $result = UtilService::inicialMaiuscula('João');

        expect($result)->toBe('João');
    });

    test('converte apenas primeira letra', function () {
        $result = UtilService::inicialMaiuscula('joão silva');

        expect($result)->toBe('João silva');
    });

    test('funciona com string de uma letra', function () {
        $result = UtilService::inicialMaiuscula('a');

        expect($result)->toBe('A');
    });

    test('funciona com string vazia', function () {
        $result = @UtilService::inicialMaiuscula('');

        expect($result)->toBe('');
    })->skip('edge case não implementado');

    test('funciona com números no início', function () {
        $result = UtilService::inicialMaiuscula('123abc');

        expect($result)->toBe('123abc');
    });

    test('funciona com caracteres especiais', function () {
        $result = UtilService::inicialMaiuscula('@joão');

        expect($result)->toBe('@joão');
    });

    test('funciona com acentos', function () {
        $result = UtilService::inicialMaiuscula('ação');

        expect($result)->toBe('Ação');
    });
});

describe('onlyNumbers', function () {
    test('remove letras mantendo apenas números', function () {
        $result = UtilService::onlyNumbers('123abc456');

        expect($result)->toBe('123456');
    });

    test('retorna string vazia quando não há números', function () {
        $result = UtilService::onlyNumbers('abc');

        expect($result)->toBe('');
    });

    test('retorna string vazia para string vazia', function () {
        $result = UtilService::onlyNumbers('');

        expect($result)->toBe('');
    });

    test('retorna string vazia para null', function () {
        $result = UtilService::onlyNumbers(null);

        expect($result)->toBe('');
    });

    test('mantém números já limpos', function () {
        $result = UtilService::onlyNumbers('123456');

        expect($result)->toBe('123456');
    });

    test('remove caracteres especiais', function () {
        $result = UtilService::onlyNumbers('123-456.789/00');

        expect($result)->toBe('12345678900');
    });

    test('remove espaços', function () {
        $result = UtilService::onlyNumbers('123 456 789');

        expect($result)->toBe('123456789');
    });

    test('funciona com CPF formatado', function () {
        $result = UtilService::onlyNumbers('123.456.789-00');

        expect($result)->toBe('12345678900');
    });

    test('funciona com telefone formatado', function () {
        $result = UtilService::onlyNumbers('(11) 99999-9999');

        expect($result)->toBe('11999999999');
    });

    test('remove acentos e caracteres especiais', function () {
        $result = UtilService::onlyNumbers('123ção456@#$');

        expect($result)->toBe('123456');
    });
});
