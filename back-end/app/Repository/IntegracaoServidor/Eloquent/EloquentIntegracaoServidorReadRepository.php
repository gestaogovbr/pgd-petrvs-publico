<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoServidor\Eloquent;

use App\Models\IntegracaoServidor;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;
use Illuminate\Support\Facades\DB;

final class EloquentIntegracaoServidorReadRepository extends AbstractEloquentReadRepository implements IntegracaoServidorReadRepositoryContract
{
    public function __construct(IntegracaoServidor $model)
    {
        $this->model = $model;
    }

    public function getMatriculaByCpf(string $cpf): ?string
    {
        return $this->model->newQuery()
            ->where('cpf', $cpf)
            ->value('matriculasiape');
    }

    public function findByCpfAndCodigoExercicio(string $cpf, string $codigoExercicio): ?IntegracaoServidor
    {
        /** @var IntegracaoServidor|null */
        return $this->query()
            ->where('cpf', $cpf)
            ->where('codigo_servo_exercicio', $codigoExercicio)
            ->first();
    }

    public function getServidor(string $cpf, string $matricula): ?IntegracaoServidor
    {
        /** @var IntegracaoServidor|null */
        return $this->query()
            ->where('cpf', $cpf)
            ->where('matriculasiape', $matricula)
            ->orderBy('created_at', 'desc')
            ->first();
    }

    public function buscarAtualizacoesDados(): array
    {
        return DB::select(
            "SELECT
                u.id,
                isr.matriculasiape,
                isr.cpf AS cpf_servidor,
                u.nome AS nome_anterior,
                isr.nome AS nome_servidor,
                u.apelido AS apelido_anterior,
                isr.nomeguerra AS nome_guerra,
                u.email AS email_anterior,
                isr.emailfuncional,
                u.telefone AS telefone_anterior,
                isr.telefone,
                isr.data_modificacao AS data_modificacao,
                u.data_modificacao AS data_modificacao_anterior,
                isr.data_nascimento,
                isr.ident_unica AS ident_unica,
                u.ident_unica AS ident_unica_anterior,
                u.nome_jornada AS nome_jornada_antigo,
                isr.nome_jornada AS nome_jornada,
                u.cod_jornada AS cod_jornada_antigo,
                isr.cod_jornada AS cod_jornada,
                u.tipo_modalidade_id AS tipo_modalidade_id_anterior,
                isr.modalidade_pgd,
                u.participa_pgd AS participa_pgd_anterior,
                isr.participa_pgd
            FROM integracao_servidores isr
            LEFT JOIN usuarios u ON (isr.matriculasiape = u.matricula)
            WHERE
                (isr.nome != u.nome OR
                isr.emailfuncional != u.email OR
                isr.nomeguerra != u.apelido OR
                isr.telefone != u.telefone OR
                (isr.nome_jornada != u.nome_jornada OR isr.nome_jornada IS NOT NULL AND u.nome_jornada IS NULL) OR
                (isr.cod_jornada != u.cod_jornada OR isr.cod_jornada IS NOT NULL AND u.cod_jornada IS NULL) OR
                (isr.modalidade_pgd IS NOT NULL AND u.tipo_modalidade_id IS NULL) OR
                (isr.participa_pgd != u.participa_pgd OR isr.participa_pgd IS NOT NULL AND u.participa_pgd IS NULL) OR
                (isr.data_modificacao > u.data_modificacao OR isr.data_modificacao IS NOT NULL AND u.data_nascimento IS NULL))
            AND u.id IS NOT NULL"
        );
    }

    public function getAtualizacoesLotacoes(): array
    {
        return DB::select(
            "SELECT usuario.id AS usuario_id, isr.nome AS nome, " .
            "  u.codigo AS exercicio_antigo, " .
            "  isr.codigo_servo_exercicio AS exercicio_atual, " .
            "  u.id AS exercicio_antigo_id, " .

            "(SELECT u2.id " .
            "FROM unidades AS u2 " .
            "WHERE isr.codigo_servo_exercicio = u2.codigo LIMIT 1) AS exercicio_atual_id, " .

            " uia.atribuicao AS atribuicao " .

            "FROM unidades_integrantes_atribuicoes AS uia " .
            "JOIN unidades_integrantes AS ui ON ui.id = uia.unidade_integrante_id " .
            "JOIN unidades AS u ON ui.unidade_id = u.id " .
            "JOIN usuarios AS usuario ON ui.usuario_id = usuario.id " .
            "JOIN integracao_servidores AS isr ON isr.matriculasiape = usuario.matricula " .
            "WHERE uia.atribuicao = 'LOTADO' AND u.codigo <> isr.codigo_servo_exercicio and ui.deleted_at IS NULL " .
            "AND uia.deleted_at IS NULL " .
            "ORDER BY exercicio_antigo ASC"
        );
    }

    public function getServidoresInseridosNaoLotados(): array
    {
        return DB::select(
            "SELECT u.id AS usuario_id, un.id AS unidade_id , u.matricula
            FROM usuarios AS u
            INNER JOIN integracao_servidores AS ius ON u.matricula = ius.matriculasiape
            INNER JOIN unidades AS un ON un.codigo = ius.codigo_servo_exercicio
            WHERE u.id NOT IN
                (SELECT u.id
                FROM usuarios AS u
                INNER JOIN integracao_servidores AS ius ON u.matricula = ius.matriculasiape
                INNER JOIN unidades_integrantes AS ui ON u.id = ui.usuario_id
                INNER  JOIN unidades_integrantes_atribuicoes AS uia ON ui.id = uia.unidade_integrante_id
                WHERE uia.atribuicao = 'LOTADO'
                  AND uia.deleted_at IS NULL
                GROUP BY u.id)"
        );
    }

    public function getUsuariosAusentes(): array
    {
        return DB::select(
            "SELECT " .
            "isr.matriculasiape as matricula, " .
            "isr.nome as nome, isr.cpf as cpf, " .
            "isr.emailfuncional as emailfuncional, " .
            "isr.sexo as sexo, " .
            "isr.uf as uf, " .
            "isr.data_nascimento as data_nascimento, " .
            "isr.telefone as telefone, " .
            "isr.nomeguerra as apelido, " .
            "isr.codigo_servo_exercicio as exercicio, " .
            "isr.situacao_funcional as situacao_funcional, " .
            "isr.data_modificacao as data_modificacao, " .
            "isr.ident_unica as ident_unica, " .
            "isr.modalidade_pgd, ".
            "isr.funcoes as gestor " .
            "FROM integracao_servidores as isr " .
            "LEFT JOIN usuarios u on u.matricula = isr.matriculasiape " .
            "WHERE u.matricula is NULL"
        );
    }
}
