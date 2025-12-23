<?php

use App\Services\Siape\ProcessaDadosSiapeBD;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Exceptions\ErrorDataSiapeException;
use App\Exceptions\RequestConectaGovException;
use App\Models\SiapeBlackListServidor;
use App\Models\SiapeBlacklistUnidade;
use SimpleXMLElement;

beforeEach(function () {
    if (!Schema::hasTable('usuarios')) {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->string('matricula')->nullable();
            $table->string('situacao_siape')->nullable();
            $table->timestamp('data_ativacao_temporaria')->nullable();
            $table->text('justicativa_ativacao_temporaria')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
    if (!Schema::hasTable('siape_blacklist_servidores')) {
        Schema::create('siape_blacklist_servidores', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->string('matricula')->nullable();
            $table->longText('response');
            $table->timestamps();
            $table->softDeletes();
        });
    }
    if (!Schema::hasTable('siape_consultaDadosPessoais')) {
        Schema::create('siape_consultaDadosPessoais', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->longText('response')->nullable();
            $table->timestamp('data_modificacao')->nullable();
            $table->tinyInteger('processado')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    if (!Schema::hasTable('siape_consultaDadosFuncionais')) {
        Schema::create('siape_consultaDadosFuncionais', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->longText('response')->nullable();
            $table->timestamp('data_modificacao')->nullable();
            $table->tinyInteger('processado')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    if (!Schema::hasTable('siape_blacklist_unidades')) {
        Schema::create('siape_blacklist_unidades', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('codigo', 50);
            $table->longText('response');
            $table->boolean('inativado')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    if (!Schema::hasTable('siape_dadosUORG')) {
        Schema::create('siape_dadosUORG', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('codigo', 50)->nullable();
            $table->longText('response')->nullable();
            $table->tinyInteger('processado')->default(0);
            $table->timestamp('data_modificacao')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
});

it('processa diferentes cenarios de processaMultiplasMatriculasInativas', function () {
    if (!Schema::hasTable('usuarios')) {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->string('matricula')->nullable();
            $table->string('situacao_siape')->nullable();
            $table->timestamp('data_ativacao_temporaria')->nullable();
            $table->text('justicativa_ativacao_temporaria')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    if (!Schema::hasTable('siape_blacklist_servidores')) {
        Schema::create('siape_blacklist_servidores', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->string('matricula')->nullable();
            $table->longText('response');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    DB::table('usuarios')->delete();
    DB::table('siape_blacklist_servidores')->delete();

    $cpf = '11122233344';
    DB::table('usuarios')->insert([
        ['id' => Str::uuid(), 'cpf' => $cpf, 'matricula' => '123', 'created_at' => now(), 'updated_at' => now()],
        ['id' => Str::uuid(), 'cpf' => $cpf, 'matricula' => '456', 'created_at' => now(), 'updated_at' => now()],
        ['id' => Str::uuid(), 'cpf' => $cpf, 'matricula' => null,   'created_at' => now(), 'updated_at' => now()],
    ]);

    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'processaMultiplasMatriculasInativas');
    $method->setAccessible(true);

    $dadosFuncionaisArray = [ ['matriculaSiape' => '123'], ['matriculaSiape' => null] ];
    $method->invoke($service, $cpf, $dadosFuncionaisArray, 'xml');

    $ativo = DB::table('usuarios')->where('cpf', $cpf)->where('matricula', '123')->first();
    expect($ativo->situacao_siape)->toBe('ATIVO');

    $bl = DB::table('siape_blacklist_servidores')->where('cpf', $cpf)->where('matricula', '456')->count();
    expect($bl)->toBe(1);
});

afterEach(function () {
    // nada
});

it('dadosServidor retorna vazio quando não há registros', function () {
    if (!Schema::hasTable('siape_consultaDadosPessoais')) {
        Schema::create('siape_consultaDadosPessoais', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->longText('response')->nullable();
            $table->timestamp('data_modificacao')->nullable();
            $table->tinyInteger('processado')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    if (!Schema::hasTable('siape_consultaDadosFuncionais')) {
        Schema::create('siape_consultaDadosFuncionais', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->longText('response')->nullable();
            $table->timestamp('data_modificacao')->nullable();
            $table->tinyInteger('processado')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    DB::table('siape_consultaDadosPessoais')->delete();
    DB::table('siape_consultaDadosFuncionais')->delete();
    $service = new ProcessaDadosSiapeBD();
    $dados = $service->dadosServidor();
    expect($dados)->toBeArray()->toBe([]);
});

it('dadosServidor marca apenas CPFs processados com sucesso', function () {
    DB::table('siape_consultaDadosPessoais')->delete();
    DB::table('siape_consultaDadosFuncionais')->delete();
    $cpfOk = '10020030040';
    $cpfFail = '50060070080';
    $xmlPessoaisOk = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet"><out><nome>Teste</nome><cpf>'.$cpfOk.'</cpf></out></ns1:consultaDadosPessoaisResponse></soap:Body></soap:Envelope>';
    $xmlFuncionaisOk = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:consulta xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet"><tipo:DadosFuncionais><matriculaSiape>123</matriculaSiape></tipo:DadosFuncionais></ns1:consulta></soap:Body></soap:Envelope>';
    $xmlPessoaisEmpty = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet"></ns1:consultaDadosPessoaisResponse></soap:Body></soap:Envelope>';
    DB::table('siape_consultaDadosPessoais')->insert([
        ['id' => Str::uuid(), 'cpf' => $cpfOk, 'response' => $xmlPessoaisOk, 'processado' => 0, 'created_at' => now(), 'updated_at' => now()],
        ['id' => Str::uuid(), 'cpf' => $cpfFail, 'response' => $xmlPessoaisEmpty, 'processado' => 0, 'created_at' => now(), 'updated_at' => now()],
    ]);
    DB::table('siape_consultaDadosFuncionais')->insert([
        ['id' => Str::uuid(), 'cpf' => $cpfOk, 'response' => $xmlFuncionaisOk, 'processado' => 0, 'created_at' => now(), 'updated_at' => now()],
        ['id' => Str::uuid(), 'cpf' => $cpfFail, 'response' => $xmlFuncionaisOk, 'processado' => 0, 'created_at' => now(), 'updated_at' => now()],
    ]);
    $service = new ProcessaDadosSiapeBD();
    $dados = $service->dadosServidor();
    expect($dados)->toBeArray()->toHaveCount(1);
    $okP = DB::table('siape_consultaDadosPessoais')->where('cpf', $cpfOk)->value('processado');
    $okF = DB::table('siape_consultaDadosFuncionais')->where('cpf', $cpfOk)->value('processado');
    $failP = DB::table('siape_consultaDadosPessoais')->where('cpf', $cpfFail)->value('processado');
    $failF = DB::table('siape_consultaDadosFuncionais')->where('cpf', $cpfFail)->value('processado');
    expect($okP)->toBe(1);
    expect($okF)->toBe(1);
    expect($failP)->toBe(0);
    expect($failF)->toBe(0);
});

it('dadosServidor ignora CPF na blacklist', function () {
    if (!Schema::hasTable('siape_blacklist_servidores')) {
        Schema::create('siape_blacklist_servidores', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->string('matricula')->nullable();
            $table->longText('response');
            $table->timestamps();
            $table->softDeletes();
        });
    }
    DB::table('siape_blacklist_servidores')->delete();
    DB::table('siape_consultaDadosPessoais')->delete();
    DB::table('siape_consultaDadosFuncionais')->delete();
    $cpfBl = '99988877766';
    DB::table('siape_blacklist_servidores')->insert([
        ['id' => Str::uuid(), 'cpf' => $cpfBl, 'matricula' => null, 'response' => 'x', 'created_at' => now(), 'updated_at' => now()]
    ]);
    $xmlPessoaisOk = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet"><out><nome>Teste</nome><cpf>'.$cpfBl.'</cpf></out></ns1:consultaDadosPessoaisResponse></soap:Body></soap:Envelope>';
    $xmlFuncionaisOk = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:consulta xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet"><tipo:DadosFuncionais><matriculaSiape>123</matriculaSiape></tipo:DadosFuncionais></ns1:consulta></soap:Body></soap:Envelope>';
    DB::table('siape_consultaDadosPessoais')->insert([
        ['id' => Str::uuid(), 'cpf' => $cpfBl, 'response' => $xmlPessoaisOk, 'processado' => 0, 'created_at' => now(), 'updated_at' => now()],
    ]);
    DB::table('siape_consultaDadosFuncionais')->insert([
        ['id' => Str::uuid(), 'cpf' => $cpfBl, 'response' => $xmlFuncionaisOk, 'processado' => 0, 'created_at' => now(), 'updated_at' => now()],
    ]);
    $service = new ProcessaDadosSiapeBD();
    $dados = $service->dadosServidor();
    expect($dados)->toBeArray()->toBe([]);
    $procP = DB::table('siape_consultaDadosPessoais')->where('cpf', $cpfBl)->value('processado');
    $procF = DB::table('siape_consultaDadosFuncionais')->where('cpf', $cpfBl)->value('processado');
    expect($procP)->toBe(0);
    expect($procF)->toBe(0);
});

it('processaDadosPessoais lança erro quando XPath vazio', function () {
    $service = new ProcessaDadosSiapeBD();
    $cpf = '12312312312';
    $xmlEmpty = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet"></ns1:consultaDadosPessoaisResponse></soap:Body></soap:Envelope>';
    $fn = fn() => $service->processaDadosPessoais($cpf, $xmlEmpty);
    expect($fn)->toThrow(ErrorDataSiapeException::class);
});

it('processaDadosFuncionais filtra inativas e retorna ativas', function () {
    $service = new ProcessaDadosSiapeBD();
    $cpf = '32132132132';
    $xml = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:resp xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet"><tipo:DadosFuncionais><matriculaSiape>123</matriculaSiape></tipo:DadosFuncionais><tipo:DadosFuncionais><matriculaSiape>456</matriculaSiape><dataOcorrExclusao>2020-01-01</dataOcorrExclusao></tipo:DadosFuncionais></ns1:resp></soap:Body></soap:Envelope>';
    $arr = $service->processaDadosFuncionais($cpf, $xml);
    expect($arr)->toBeArray()->toHaveCount(1);
    expect($arr[0]['matriculaSiape'])->toBe('123');
});

it('obterMatriculasAtivas retorna únicos', function () {
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'obterMatriculasAtivas');
    $method->setAccessible(true);
    $list = [
        ['matriculaSiape' => '111'],
        ['matriculaSiape' => '111'],
        ['matriculaSiape' => '222'],
        ['matriculaSiape' => null],
    ];
    $ret = $method->invoke($service, $list);
    expect($ret)->toBe(['111', '222']);
});

it('ativarMatricula atualiza usuário e remove blacklist', function () {
    DB::table('usuarios')->delete();
    DB::table('siape_blacklist_servidores')->delete();
    $userId = Str::uuid();
    DB::table('usuarios')->insert([
        ['id' => $userId, 'cpf' => '11122233344', 'matricula' => 'XYZ', 'situacao_siape' => null, 'data_ativacao_temporaria' => now(), 'justicativa_ativacao_temporaria' => 'x', 'created_at' => now(), 'updated_at' => now()],
    ]);
    DB::table('siape_blacklist_servidores')->insert([
        ['id' => Str::uuid(), 'cpf' => '11122233344', 'matricula' => 'XYZ', 'response' => 'xml', 'created_at' => now(), 'updated_at' => now()],
    ]);
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'ativarMatricula');
    $method->setAccessible(true);
    $model = \App\Models\Usuario::query()->where('id', $userId)->first();
    $method->invoke($service, $model);
    $updated = DB::table('usuarios')->where('id', $userId)->first();
    expect($updated->situacao_siape)->toBe('ATIVO');
    expect($updated->data_ativacao_temporaria)->toBeNull();
    expect($updated->justicativa_ativacao_temporaria)->toBe('x');
    $bl = DB::table('siape_blacklist_servidores')->where('matricula', 'XYZ')->whereNull('deleted_at')->count();
    expect($bl)->toBe(0);
});

it('adicionarBlacklistSeElegivel respeita situações', function () {
    DB::table('siape_blacklist_servidores')->delete();
    DB::table('usuarios')->delete();
    $userId = Str::uuid();
    DB::table('usuarios')->insert([
        ['id' => $userId, 'cpf' => '55566677788', 'matricula' => 'AAA', 'situacao_siape' => 'ATIVO', 'created_at' => now(), 'updated_at' => now()],
    ]);
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'adicionarBlacklistSeElegivel');
    $method->setAccessible(true);
    $usuario = DB::table('usuarios')->where('id', $userId)->first();
    $model = new class($usuario) extends \App\Models\Usuario {
        public function __construct($row) { foreach ($row as $k=>$v) $this->$k = $v; }
    };
    $method->invoke($service, '55566677788', $model, '<xml/>');
    $count = DB::table('siape_blacklist_servidores')->where('cpf', '55566677788')->where('matricula', 'AAA')->count();
    expect($count)->toBe(1);
    DB::table('siape_blacklist_servidores')->delete();
    DB::table('usuarios')->where('id', $userId)->update(['situacao_siape' => 'INATIVO']);
    $usuario = DB::table('usuarios')->where('id', $userId)->first();
    $model = new class($usuario) extends \App\Models\Usuario {
        public function __construct($row) { foreach ($row as $k=>$v) $this->$k = $v; }
    };
    $method->invoke($service, '55566677788', $model, '<xml/>');
    $count2 = DB::table('siape_blacklist_servidores')->where('cpf', '55566677788')->count();
    expect($count2)->toBe(0);
});

it('processaDadosUorg processa e marca como concluído', function () {
    if (!Schema::hasTable('siape_dadosUORG')) {
        Schema::create('siape_dadosUORG', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('codigo', 50)->nullable();
            $table->longText('response')->nullable();
            $table->tinyInteger('processado')->default(0);
            $table->timestamp('data_modificacao')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
    DB::table('siape_dadosUORG')->delete();
    $xml = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:dadosUorgResponse xmlns:ns1="http://servico.wssiapenet"><out><ent:cCodigo xmlns:ent="http://entidade.wssiapenet">123</ent:cCodigo></out></ns1:dadosUorgResponse></soap:Body></soap:Envelope>';
    DB::table('siape_dadosUORG')->insert([
        ['id' => Str::uuid(), 'codigo' => 'U1', 'response' => $xml, 'processado' => 0, 'data_modificacao' => now(), 'created_at' => now(), 'updated_at' => now()],
    ]);
    $service = new ProcessaDadosSiapeBD();
    $out = $service->dadosUorg();
    expect($out)->toBeArray()->toHaveCount(1);
    $proc = DB::table('siape_dadosUORG')->where('codigo', 'U1')->value('processado');
    expect($proc)->toBe(1);
});

it('processaDadosUorg lança erro quando XML inválido', function () {
    $service = new ProcessaDadosSiapeBD();
    $fn = fn() => $service->processaDadosUorg('U1', '<<<');
    expect($fn)->toThrow(ErrorDataSiapeException::class);
});

it('prepareResponseXml lança RequestConectaGovException para XML inválido', function () {
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'prepareResponseXml');
    $method->setAccessible(true);
    $fn = fn() => $method->invoke($service, '<<<');
    expect($fn)->toThrow(RequestConectaGovException::class);
});

it('cpfNaBlackList retorna verdadeiro para cpf sem matricula', function () {
    DB::table('siape_blacklist_servidores')->delete();
    DB::table('siape_blacklist_servidores')->insert([
        ['id' => Str::uuid(), 'cpf' => '10101010101', 'matricula' => null, 'response' => 'x', 'created_at' => now(), 'updated_at' => now()],
    ]);
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'cpfNaBlackList');
    $method->setAccessible(true);
    $ret = $method->invoke($service, '10101010101');
    expect($ret)->toBeTrue();
});

it('processaDadosPessoais com fault cria blacklist e lança erro', function () {
    DB::table('siape_blacklist_servidores')->delete();
    $service = new ProcessaDadosSiapeBD();
    $cpf = '20202020202';
    $xmlFault = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><soap:Fault><faultcode>0002</faultcode><faultstring>Não existem dados para consulta</faultstring></soap:Fault></soap:Body></soap:Envelope>';
    $fn = fn() => $service->processaDadosPessoais($cpf, $xmlFault);
    expect($fn)->toThrow(ErrorDataSiapeException::class);
    $exists = DB::table('siape_blacklist_servidores')->where('cpf', $cpf)->count();
    expect($exists)->toBe(1);
});

it('processaDadosUorg com fault cria blacklist e lança erro', function () {
    if (!Schema::hasTable('siape_blacklist_unidades')) {
        Schema::create('siape_blacklist_unidades', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('codigo', 50);
            $table->longText('response');
            $table->boolean('inativado')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    DB::table('siape_blacklist_unidades')->delete();
    $service = new ProcessaDadosSiapeBD();
    $codigo = 'U2';
    $xmlFault = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><soap:Fault><faultcode>0002</faultcode><faultstring>Não existem dados para consulta</faultstring></soap:Fault></soap:Body></soap:Envelope>';
    $fn = fn() => $service->processaDadosUorg($codigo, $xmlFault);
    expect($fn)->toThrow(ErrorDataSiapeException::class);
    $exists = DB::table('siape_blacklist_unidades')->where('codigo', $codigo)->count();
    expect($exists)->toBe(1);
});

it('previneDataNula retorna data default quando nulo', function () {
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'previneDataNula');
    $method->setAccessible(true);
    $servidor = (object) ['data_modificacao' => null];
    $ret = $method->invoke($service, $servidor);
    expect($ret)->toBe('1970-01-01 00:00:00');
});

it('decideDadosFuncionais com único nó retorna array com item', function () {
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'decideDadosFuncionais');
    $method->setAccessible(true);
    $xml = new SimpleXMLElement('<tipo:DadosFuncionais xmlns:tipo="http://tipo.servico.wssiapenet"><matriculaSiape>999</matriculaSiape></tipo:DadosFuncionais>');
    $ret = $method->invoke($service, [$xml]);
    expect($ret)->toHaveCount(1);
    expect($ret[0]['matriculaSiape'])->toBe('999');
});

it('simpleXmlElementToArray converte nós filho para strings', function () {
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'simpleXmlElementToArray');
    $method->setAccessible(true);
    $xml = new SimpleXMLElement('<root><a>1</a><b>2</b></root>');
    $ret = $method->invoke($service, $xml);
    expect($ret)->toBe(['a' => '1', 'b' => '2']);
});

it('prepareResponseServidorXml retorna XML quando sem fault', function () {
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'prepareResponseServidorXml');
    $method->setAccessible(true);
    $xml = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><x>ok</x></soap:Body></soap:Envelope>';
    $ret = $method->invoke($service, '33322211100', $xml);
    expect($ret)->toBeInstanceOf(SimpleXMLElement::class);
});

it('prepareResponseUorgXml retorna XML quando sem fault', function () {
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'prepareResponseUorgXml');
    $method->setAccessible(true);
    $xml = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><x>ok</x></soap:Body></soap:Envelope>';
    $ret = $method->invoke($service, 'U3', $xml);
    expect($ret)->toBeInstanceOf(SimpleXMLElement::class);
});

it('dadosUorg retorna vazio quando coleção vazia', function () {
    if (!Schema::hasTable('siape_dadosUORG')) {
        Schema::create('siape_dadosUORG', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('codigo', 50)->nullable();
            $table->longText('response')->nullable();
            $table->tinyInteger('processado')->default(0);
            $table->timestamp('data_modificacao')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
    DB::table('siape_dadosUORG')->delete();
    $service = new ProcessaDadosSiapeBD();
    $out = $service->dadosUorg();
    expect($out)->toBeArray()->toBe([]);
});

it('prepareResponseXml sanitiza ampersand solto e parseia', function () {
    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'prepareResponseXml');
    $method->setAccessible(true);
    $xml = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><x>AT&T</x></soap:Body></soap:Envelope>';
    $ret = $method->invoke($service, $xml);
    expect($ret)->toBeInstanceOf(SimpleXMLElement::class);
});
