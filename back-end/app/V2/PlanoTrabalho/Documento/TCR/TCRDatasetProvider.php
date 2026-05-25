<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\TCR;

use App\Models\PlanoTrabalho;

class TCRDatasetProvider
{
    public function getDataset(): array
    {
        return $this->flattenFields($this->getFieldDefinitions());
    }

    public function getContext(PlanoTrabalho $plano): PlanoTrabalho
    {
        return $plano;
    }

    public function getFieldDefinitions(): array
    {
        return [
            ['field' => 'carga_horaria', 'label' => 'Carga horária diária'],
            ['field' => 'tempo_total', 'label' => 'Tempo total do plano'],
            ['field' => 'tempo_proporcional', 'label' => 'Tempo proporcional (descontando afastamentos)'],
            ['field' => 'status', 'label' => 'Status do plano'],
            ['field' => 'data_inicio', 'label' => 'Data inicial do plano', 'type' => 'DATETIME'],
            ['field' => 'data_fim', 'label' => 'Data final do plano', 'type' => 'DATETIME'],
            ['field' => 'tipo_modalidade', 'label' => 'Tipo de modalidade', 'fields' => [['field' => 'nome', 'label' => 'Nome']], 'type' => 'OBJECT', 'value' => fn ($ctx) => (object) ['nome' => $ctx->modalidade_pgd_label]],
            ['field' => 'unidade', 'label' => 'Unidade', 'fields' => $this->unidadeFields(), 'type' => 'OBJECT', 'value' => fn ($ctx) => $ctx->unidade],
            ['field' => 'usuario', 'label' => 'Usuário', 'fields' => $this->usuarioFields(), 'type' => 'OBJECT', 'value' => fn ($ctx) => $ctx->usuario],
            ['field' => 'programa', 'label' => 'Programa', 'fields' => $this->programaFields(), 'type' => 'OBJECT', 'value' => fn ($ctx) => $ctx->programa],
            ['field' => 'entregas', 'label' => 'Entregas', 'fields' => $this->entregaFields(), 'type' => 'ARRAY', 'value' => fn ($ctx) => $ctx->entregas],
            ['field' => 'criterios_avaliacao', 'label' => 'Critérios de avaliação', 'fields' => [['field' => 'value', 'label' => 'Critério']], 'type' => 'ARRAY', 'value' => fn ($ctx) => $ctx->criterios_avaliacao],
        ];
    }

    private function unidadeFields(): array
    {
        return [
            ['field' => 'codigo', 'label' => 'Código'],
            ['field' => 'sigla', 'label' => 'Sigla'],
            ['field' => 'nome', 'label' => 'Nome'],
            ['field' => 'texto_complementar_plano', 'label' => 'Particularidades da Unidade Executora', 'type' => 'TEMPLATE'],
        ];
    }

    private function usuarioFields(): array
    {
        return [
            ['field' => 'nome', 'label' => 'Nome'],
            ['field' => 'email', 'label' => 'E-mail'],
            ['field' => 'cpf', 'label' => 'CPF'],
            ['field' => 'matricula', 'label' => 'Matrícula'],
            ['field' => 'apelido', 'label' => 'Apelido'],
            ['field' => 'telefone', 'label' => 'Telefone'],
            ['field' => 'sexo', 'label' => 'Sexo', 'lookup' => 'SEXO'],
            ['field' => 'situacao_funcional', 'label' => 'Situação Funcional', 'lookup' => 'USUARIO_SITUACAO_FUNCIONAL'],
            ['field' => 'texto_complementar_plano', 'label' => 'Particularidades do Participante', 'type' => 'TEMPLATE'],
        ];
    }

    private function programaFields(): array
    {
        return [
            ['field' => 'nome', 'label' => 'Nome'],
            ['field' => 'normativa', 'label' => 'Normativa'],
            ['field' => 'data_inicio', 'label' => 'Data início', 'type' => 'DATETIME'],
            ['field' => 'data_fim', 'label' => 'Data término', 'type' => 'DATETIME'],
        ];
    }

    private function entregaFields(): array
    {
        return [
            ['field' => 'descricao', 'label' => 'Descrição da entrega'],
            ['field' => 'forca_trabalho', 'label' => 'Percentual da força de trabalho'],
            ['field' => 'orgao', 'label' => 'Órgão externo vinculado à entrega'],
            ['field' => 'meta', 'label' => 'Meta estipulada para a entrega'],
            ['field' => 'entrega', 'label' => 'Entrega do plano de entrega', 'fields' => $this->planoEntregaEntregaFields(), 'type' => 'OBJECT', 'value' => fn ($ctx) => $ctx->entrega],
        ];
    }

    private function planoEntregaEntregaFields(): array
    {
        return [
            ['field' => 'descricao', 'label' => 'Descrição da entrega'],
            ['field' => 'data_inicio', 'label' => 'Data de início', 'type' => 'DATETIME'],
            ['field' => 'data_fim', 'label' => 'Data de término', 'type' => 'DATETIME'],
            ['field' => 'homologado', 'label' => 'Se a entrega já foi homologada'],
            ['field' => 'progresso_esperado', 'label' => 'Percentual de progresso esperado da entrega'],
            ['field' => 'progresso_realizado', 'label' => 'Percentual de progresso realizado da entrega'],
            ['field' => 'destinatario', 'label' => 'Destinatário da entrega'],
        ];
    }

    private function flattenFields(array $fields): array
    {
        $result = [];
        foreach ($fields as $field) {
            $item = ['field' => $field['field'], 'label' => $field['field']];
            if (isset($field['type'])) {
                $item['type'] = $field['type'];
            }
            if (isset($field['lookup'])) {
                $item['lookup'] = $field['lookup'];
            }
            if (isset($field['fields'])) {
                $item['fields'] = $this->flattenFields($field['fields']);
            }
            $result[] = $item;
        }
        return $result;
    }
}
