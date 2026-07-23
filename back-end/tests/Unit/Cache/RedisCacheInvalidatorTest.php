<?php

use App\Cache\RedisCacheInvalidator;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

uses(TestCase::class);

beforeAll(function () {
    try {
        $client = new \Redis();
        $client->connect('petrvs_redis', 6379, 1.0);
        $client->select(5);
        $client->ping();
        $client->flushDB();
    } catch (\Throwable $e) {
        TestCase::markTestSkipped('Redis não disponível: ' . $e->getMessage());
    }
});

beforeEach(function () {
    $this->originalDriver = config('cache.default');
    $this->originalDb = config('database.redis.cache.database');

    config()->set('database.redis.cache.database', 5);
    config()->set('cache.default', 'redis');

    /** @var \Illuminate\Cache\CacheManager */
    $manager = app('cache');
    $manager->forgetDriver('redis');

    try {
        Cache::put('__redis_test_probe', true, 5);
        Cache::forget('__redis_test_probe');
    } catch (\Throwable $e) {
        $this->markTestSkipped('Redis não disponível: ' . $e->getMessage());
    }
});

afterEach(function () {
    config()->set('cache.default', $this->originalDriver);
    config()->set('database.redis.cache.database', $this->originalDb);

    /** @var \Illuminate\Cache\CacheManager */
    $manager = app('cache');
    $manager->forgetDriver('redis');
});

afterAll(function () {
    try {
        $client = new \Redis();
        $client->connect('petrvs_redis', 6379, 1.0);
        $client->select(5);
        $client->flushDB();
    } catch (\Throwable) {
    }
});

describe('RedisCacheInvalidator::invalidateByPrefix', function () {

    test('remove chaves que contêm o prefixo informado', function () {
        Cache::put('unidade-hierarquia:aaa', ['sub-1', 'sub-2'], 3600);
        Cache::put('unidade-hierarquia:bbb', ['sub-3'], 3600);
        Cache::put('unidades-geridas:user-1', ['unid-1'], 3600);
        Cache::put('outra-chave:xyz', 'valor', 3600);

        $invalidator = new RedisCacheInvalidator();
        $invalidator->invalidateByPrefix(['unidade-hierarquia:']);

        expect(Cache::has('unidade-hierarquia:aaa'))->toBeFalse();
        expect(Cache::has('unidade-hierarquia:bbb'))->toBeFalse();
        expect(Cache::has('unidades-geridas:user-1'))->toBeTrue();
        expect(Cache::has('outra-chave:xyz'))->toBeTrue();
    });

    test('remove chaves de múltiplos prefixos', function () {
        Cache::put('unidade-hierarquia:aaa', ['sub-1'], 3600);
        Cache::put('unidades-geridas:user-1', ['unid-1'], 3600);
        Cache::put('outra-chave:xyz', 'valor', 3600);

        $invalidator = new RedisCacheInvalidator();
        $invalidator->invalidateByPrefix(['unidade-hierarquia:', 'unidades-geridas:']);

        expect(Cache::has('unidade-hierarquia:aaa'))->toBeFalse();
        expect(Cache::has('unidades-geridas:user-1'))->toBeFalse();
        expect(Cache::has('outra-chave:xyz'))->toBeTrue();
    });

    test('não falha quando não há chaves correspondentes', function () {
        $invalidator = new RedisCacheInvalidator();
        $invalidator->invalidateByPrefix(['prefixo-inexistente:']);

        expect(true)->toBeTrue();
    });

    test('não falha com array vazio de prefixos', function () {
        Cache::put('unidade-hierarquia:aaa', ['sub-1'], 3600);

        $invalidator = new RedisCacheInvalidator();
        $invalidator->invalidateByPrefix([]);

        expect(Cache::has('unidade-hierarquia:aaa'))->toBeTrue();
    });
});
