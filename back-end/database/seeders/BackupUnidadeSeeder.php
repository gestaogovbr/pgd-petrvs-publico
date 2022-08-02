<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Entidade;
use App\Services\IntegracaoService;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use Carbon\Carbon;

class BackupUnidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teste = new IntegracaoService();
        $teste->entidade = Entidade::where('sigla', 'PRF')->sole();

        // Lê o arquivo XML local de Unidades

        //$xmlStream = file_get_contents("D:\petrvs\unidades.xml");
        $xmlStream = file_get_contents("C:\DevEnv\Projetos\Petrvs-App\unidades.xml");
        $xml = simplexml_load_string($xmlStream);
        $uos = $teste->object2array($xml)["uorg"];
        $sql = "INSERT INTO integracao_unidades(id_servo, pai_servo, codigo_siape, pai_siape, codupag, nomeuorg, siglauorg, telefone, email, natureza, fronteira, fuso_horario, cod_uop, cod_unidade, tipo, tipo_desc, na_rodovia, logradouro, bairro, cep, ptn_ge_coordenada, municipio_siafi_siape, municipio_siscom, municipio_ibge, municipio_nome, municipio_uf, ativa, regimental, datamodificacao, und_nu_adicional, cnpjupag) " .
                    "VALUES (:id_servo, :pai_servo, :codigo_siape, :pai_siape, :codupag, :nomeuorg, :siglauorg, :telefone, :email, :natureza, :fronteira, :fuso_horario, :cod_uop, :cod_unidade, :tipo, :tipo_desc, :na_rodovia, :logradouro, :bairro, :cep, :ptn_ge_coordenada, :municipio_siafi_siape, :municipio_siscom, :municipio_ibge, :municipio_nome, :municipio_uf, :ativa, :regimental, :datamodificacao, :und_nu_adicional, :cnpjupag)";

        /* Insere as unidades presentes no arquivo XML na tabela INTEGRACAO_UNIDADES */
        DB::transaction(function () use (&$uos, &$sql, &$teste) {
            /* Remove toda a lista da tabela temporária integracao_unidades */
            DB::delete('DELETE FROM integracao_unidades');
            /* Itera as UOs */
            foreach($uos as $uo) {
                if(!empty($teste->valueOrDefault($uo["id_servo"]))) {
                    DB::insert($sql, [
                        ':id_servo' => $teste->valueOrDefault($uo["id_servo"]),
                        ':pai_servo' => $teste->valueOrDefault($uo["pai_servo"]),
                        ':codigo_siape' => $teste->valueOrDefault($uo["codigo_siape"]),
                        ':pai_siape' => $teste->valueOrDefault($uo["pai_siape"]),
                        ':codupag' => $teste->valueOrDefault($uo["codupag"]),
                        ':nomeuorg' => $teste->valueOrDefault($uo["nomeuorg"]),
                        ':siglauorg' => $teste->valueOrDefault($uo["siglauorg"]),
                        ':telefone' => $teste->valueOrDefault($uo["telefone"]),
                        ':email' => $teste->valueOrDefault($uo["email"]),
                        ':natureza' => $teste->valueOrDefault($uo["natureza"]),
                        ':fronteira' => $teste->valueOrDefault($uo["fronteira"]),
                        ':fuso_horario' => $teste->valueOrDefault($uo["fuso_horario"]),
                        ':cod_uop' => $teste->valueOrDefault($uo["cod_uop"]),
                        ':cod_unidade' => $teste->valueOrDefault($uo["cod_unidade"]),
                        ':tipo' => $teste->valueOrDefault($uo["tipo"]),
                        ':tipo_desc' => $teste->valueOrDefault($uo["tipo_desc"]),
                        ':na_rodovia' => $teste->valueOrDefault($uo["na_rodovia"]),
                        ':logradouro' => $teste->valueOrDefault($uo["logradouro"]),
                        ':bairro' => $teste->valueOrDefault($uo["bairro"]),
                        ':cep' => $teste->valueOrDefault($uo["cep"]),
                        ':ptn_ge_coordenada' => $teste->valueOrDefault($uo["ptn_ge_coordenada"]),
                        ':municipio_siafi_siape' => $teste->valueOrDefault($uo["municipio_siafi_siape"]),
                        ':municipio_siscom' => $teste->valueOrDefault($uo["municipio_siscom"]),
                        ':municipio_ibge' => $teste->valueOrDefault($uo["municipio_ibge"]),
                        ':municipio_nome' => $teste->valueOrDefault($uo["municipio_nome"]),
                        ':municipio_uf' => $teste->valueOrDefault($uo["municipio_uf"]),
                        ':ativa' => $teste->valueOrDefault($uo["ativa"]),
                        ':regimental' => $teste->valueOrDefault($uo["regimental"]),
                        ':datamodificacao' => $teste->valueOrDefault($uo["datamodificacao"]),
                        ':und_nu_adicional' => $teste->valueOrDefault($uo["und_nu_adicional"]),
                        ':cnpjupag' => $teste->valueOrDefault($uo["cnpjupag"])
                    ]);
                }
            }


        });

        // Seleciona algumas Unidades para inserção na tabela UNIDADES
        $consulta_sql = "SELECT u.id_servo, u.nomeuorg, u.siglauorg, u.pai_servo, c.id AS cidade_id ".
                        "FROM integracao_unidades u LEFT JOIN cidades c ON (u.municipio_ibge = c.codigo_ibge) ".
                        "WHERE u.id_servo in (1,1501,971,3586,3587,2811,3581,3582,678,3842,3843,3577)";
        $teste->unidadesSelecionadas = DB::select($consulta_sql);

        DB::transaction(function () use (&$teste) {
            foreach($teste->unidadesSelecionadas as $unidade) {

                $values = [
                    ':codigo' => $unidade->id_servo,
                    ':nome' => $unidade->nomeuorg,
                    ':sigla' => $unidade->siglauorg,
                    ':cidade_id' => $unidade->cidade_id,
                    ':entidade_id' => $teste->entidade->id
                ];

                $values[':id'] = Uuid::uuid4();
                $values[':path'] = "";
                $values[':unidade_id'] = null;
                $values[':notificacoes'] = '{}';
                $values[':etiquetas'] = [];
                $values[':data_inicio'] = Carbon::now();
                $values[':atividades_arquivamento_automatico'] = 0;
                $values[':atividades_avaliacao_automatico'] = 0;
                $values[':planos_prazo_comparecimento'] = 10;
                $values[':planos_tipo_prazo_comparecimento'] = 'DIAS';
                $values[':horario_trabalho_inicio'] = '00:00';
                $values[':horario_trabalho_fim'] = '23:59';
                $values[':distribuicao_forma_contagem_prazos'] = 'DIAS_CORRIDOS';
                $values[':autoedicao_subordinadas'] = 1;
                $values[':data_fim'] = null;
                $values[':checklist'] = [];

                $sql = "INSERT INTO unidades (id, codigo, path, nome, sigla, cidade_id, unidade_id, entidade_id, ".
                "notificacoes, etiquetas, data_inicio, atividades_arquivamento_automatico, ".
                "atividades_avaliacao_automatico, planos_prazo_comparecimento, planos_tipo_prazo_comparecimento, ".
                "horario_trabalho_inicio, horario_trabalho_fim, distribuicao_forma_contagem_prazos, ".
                "autoedicao_subordinadas, data_fim, checklist) ".
                        "VALUES (:id, :codigo, :path, :nome, :sigla, :cidade_id, :unidade_id, :entidade_id, ".
                ":notificacoes, :etiquetas, :data_inicio, :atividades_arquivamento_automatico, ".
                ":atividades_avaliacao_automatico, :planos_prazo_comparecimento, :planos_tipo_prazo_comparecimento, ".
                ":horario_trabalho_inicio, :horario_trabalho_fim, :distribuicao_forma_contagem_prazos, ".
                ":autoedicao_subordinadas, :data_fim, :checklist)";
                DB::insert($sql, $values);
            }
        });

        $prf = DB::table('unidades')->where('codigo', '1')->first();
        $direcao_geral = DB::table('unidades')->where('codigo', '1501')->first();
        $sprfpi = DB::table('unidades')->where('codigo', '971')->first();
        $del_teresina = DB::table('unidades')->where('codigo', '3581')->first();
        $del_floriano = DB::table('unidades')->where('codigo', '3586')->first();
        $npf_floriano = DB::table('unidades')->where('codigo', '3587')->first();
        $uop_floriano = DB::table('unidades')->where('codigo', '2811')->first();
        $npf_teresina = DB::table('unidades')->where('codigo', '3582')->first();
        $npf_del02BA  = DB::table('unidades')->where('codigo', '3843')->first();
        $sprfba = DB::table('unidades')->where('codigo', '678')->first();
        $del_feira = DB::table('unidades')->where('codigo', '3842')->first();

        // completa corretamente os campos PATH e UNIDADE_ID de umas
        $sql_1 = "UPDATE unidades SET path = :path, unidade_id = :pai_correto_id WHERE id = :id";
        $values_1 = [
                        [':id' => $prf->id,             ':pai_correto_id' => null,                  ':path' => ""],
                        [':id' => $direcao_geral->id,   ':pai_correto_id' => $prf->id,              ':path' => "/".$prf->id],
                        [':id' => $sprfpi->id,          ':pai_correto_id' => $direcao_geral->id,    ':path' => "/".$prf->id."/".$direcao_geral->id],
                        [':id' => $del_teresina->id,    ':pai_correto_id' => $sprfpi->id,           ':path' => "/".$prf->id."/".$direcao_geral->id."/".$sprfpi->id],
                        [':id' => $del_feira->id,       ':pai_correto_id' => $sprfba->id,           ':path' => "/".$prf->id."/".$direcao_geral->id."/".$sprfba->id],
                        [':id' => $sprfba->id,          ':pai_correto_id' => $direcao_geral->id,    ':path' => "/".$prf->id."/".$direcao_geral->id]
        ];
        foreach($values_1 as $unidade) {
            DB::update($sql_1,$unidade);
        }

        // completa erroneamente os dados de outras, para que sejam corrigidos na rotina de Integração Unidades
        //$sql_2 = "UPDATE unidades SET nome = :nome, sigla = :sigla, unidade_id = :pai_id, path = :path WHERE id = :id";
        //$values_2 = [
        //                [':id' => $del_floriano->id, ':nome' => $del_floriano->nome, ':sigla' => 'DELEG003PI',          ':pai_id' => $sprfpi->id,       ':path' => "/".$prf->id."/".$direcao_geral->id."/".$sprfpi->id],
        //                [':id' => $npf_floriano->id, ':nome' => 'NPF03/PI-NPF',      ':sigla' => $npf_floriano->sigla,  ':pai_id' => $sprfpi->id,       ':path' => "/".$prf->id."/".$direcao_geral->id."/".$sprfpi->id],
        //                [':id' => $uop_floriano->id, ':nome' => 'UOP DE FLORIANO',   ':sigla' => $uop_floriano->sigla,  ':pai_id' => $npf_floriano->id, ':path' => "/".$prf->id."/".$direcao_geral->id."/".$sprfpi->id."/".$npf_floriano->id],
        //                [':id' => $npf_teresina->id, ':nome' => $npf_teresina->nome, ':sigla' => 'NPF-TERESINA',        ':pai_id' => $sprfpi->id,       ':path' => "/".$prf->id."/".$direcao_geral->id."/".$sprfpi->id],
        //                [':id' => $npf_del02BA->id,  ':nome' => $npf_del02BA->nome,  ':sigla' => $npf_del02BA->sigla,   ':pai_id' => $sprfpi->id,       ':path' => "/".$prf->id."/".$direcao_geral->id."/".$sprfpi->id]
        //];
        //foreach($values_2 as $unidade) {
        //    DB::update($sql_2,$unidade);
        //}
    }
}
