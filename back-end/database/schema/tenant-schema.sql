/*M!999999\- enable the sandbox mode */ 
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;
DROP TABLE IF EXISTS `afastamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `afastamentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `observacoes` text DEFAULT NULL COMMENT 'Observação sobre o afastamento',
  `data_inicio` datetime NOT NULL COMMENT 'Inicio do afastamento',
  `data_fim` datetime NOT NULL COMMENT 'Fim do afastamento',
  `horas` int(11) DEFAULT NULL,
  `usuario_id` char(36) NOT NULL,
  `tipo_motivo_afastamento_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `afastamentos_usuario_id_foreign` (`usuario_id`),
  KEY `afastamentos_tipo_motivo_afastamento_id_foreign` (`tipo_motivo_afastamento_id`),
  CONSTRAINT `afastamentos_tipo_motivo_afastamento_id_foreign` FOREIGN KEY (`tipo_motivo_afastamento_id`) REFERENCES `tipos_motivos_afastamentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `afastamentos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `anexos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `anexos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do arquivo com extensão',
  `descricao` varchar(256) NOT NULL COMMENT 'Descrição do anexo',
  `data_comentario` datetime NOT NULL COMMENT 'Data e horário que foi feito o comentário',
  `path` varchar(256) DEFAULT NULL COMMENT 'Path relativo do arquivo',
  `base64` text DEFAULT NULL COMMENT 'Arquivo em formato base64',
  `usuario_id` char(36) DEFAULT NULL,
  `comentario_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `anexos_usuario_id_foreign` (`usuario_id`),
  KEY `anexos_comentario_id_foreign` (`comentario_id`),
  CONSTRAINT `anexos_comentario_id_foreign` FOREIGN KEY (`comentario_id`) REFERENCES `comentarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `anexos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `areas_atividades_externas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas_atividades_externas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome da área',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'area ativo ou inativo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `areas_conhecimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas_conhecimentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome da área da graduação',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Área ativa ou inativa',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `areas_tematicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas_tematicas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome da área temática',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Área ativa ou inativa',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `atividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `atividades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `numero` int(11) NOT NULL COMMENT 'Número da atividade (Gerado pelo sistema)',
  `descricao` text NOT NULL COMMENT 'Assunto da atividade',
  `data_distribuicao` datetime NOT NULL COMMENT 'Data de cadastro da atividade',
  `carga_horaria` double(8,2) DEFAULT NULL COMMENT 'Carga horária que será utilizada para todos os cálculos (vinda do plano de trabalho)',
  `tempo_planejado` double(8,2) NOT NULL COMMENT 'Diferença entre data_distribuicao e data_estipulada_entrega em horas (úteis ou corridas, configurada na unidade)',
  `data_estipulada_entrega` datetime NOT NULL COMMENT 'Data estipulada para entrega da demanda',
  `data_inicio` datetime DEFAULT NULL COMMENT 'Data em que o usuário iniciou a atividade',
  `data_entrega` datetime DEFAULT NULL COMMENT 'Data da entrega',
  `esforco` double(8,2) NOT NULL COMMENT 'Esforço (tempo) que será empregado na execução da atividade',
  `tempo_despendido` double(8,2) DEFAULT NULL COMMENT 'Calculado no final da atividade, sendo o tempo líquido (considerando pausas)',
  `data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento da demanda',
  `etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
  `checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist' CHECK (json_valid(`checklist`)),
  `prioridade` int(11) DEFAULT NULL COMMENT 'Nível de prioridade',
  `progresso` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Progresso da realização da atividade',
  `status` enum('INCLUIDO','INICIADO','PAUSADO','CONCLUIDO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual da atividade',
  `plano_trabalho_id` char(36) DEFAULT NULL,
  `plano_trabalho_entrega_id` char(36) DEFAULT NULL,
  `plano_trabalho_consolidacao_id` char(36) DEFAULT NULL,
  `tipo_atividade_id` char(36) DEFAULT NULL,
  `demandante_id` char(36) NOT NULL,
  `usuario_id` char(36) DEFAULT NULL,
  `unidade_id` char(36) NOT NULL,
  `documento_requisicao_id` char(36) DEFAULT NULL,
  `documento_entrega_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `atividades_numero_unique` (`numero`),
  KEY `atividades_plano_trabalho_id_foreign` (`plano_trabalho_id`),
  KEY `atividades_plano_trabalho_entrega_id_foreign` (`plano_trabalho_entrega_id`),
  KEY `atividades_plano_trabalho_consolidacao_id_foreign` (`plano_trabalho_consolidacao_id`),
  KEY `atividades_tipo_atividade_id_foreign` (`tipo_atividade_id`),
  KEY `atividades_demandante_id_foreign` (`demandante_id`),
  KEY `atividades_usuario_id_foreign` (`usuario_id`),
  KEY `atividades_unidade_id_foreign` (`unidade_id`),
  KEY `atividades_documento_requisicao_id_foreign` (`documento_requisicao_id`),
  KEY `atividades_documento_entrega_id_foreign` (`documento_entrega_id`),
  CONSTRAINT `atividades_demandante_id_foreign` FOREIGN KEY (`demandante_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_documento_entrega_id_foreign` FOREIGN KEY (`documento_entrega_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_documento_requisicao_id_foreign` FOREIGN KEY (`documento_requisicao_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_plano_trabalho_consolidacao_id_foreign` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_plano_trabalho_entrega_id_foreign` FOREIGN KEY (`plano_trabalho_entrega_id`) REFERENCES `planos_trabalhos_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_tipo_atividade_id_foreign` FOREIGN KEY (`tipo_atividade_id`) REFERENCES `tipos_atividades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `atividades_pausas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `atividades_pausas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_inicio` datetime NOT NULL COMMENT 'Data de início da pausa',
  `data_fim` datetime DEFAULT NULL COMMENT 'Data de retorno',
  `atividade_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `atividades_pausas_atividade_id_foreign` (`atividade_id`),
  CONSTRAINT `atividades_pausas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `atividades_tarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `atividades_tarefas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `descricao` text DEFAULT NULL COMMENT 'Descrição da tarefa',
  `data_lancamento` datetime NOT NULL COMMENT 'Data hora do lançamento da tarefa',
  `tempo_estimado` double(8,2) NOT NULL COMMENT 'Tempo estimado para a execução da tarefa (Horas decimais)',
  `data_conclusao` datetime DEFAULT NULL COMMENT 'Data da conclusão',
  `documento_id` char(36) DEFAULT NULL,
  `atividade_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  `tipo_tarefa_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `atividades_tarefas_documento_id_foreign` (`documento_id`),
  KEY `atividades_tarefas_atividade_id_foreign` (`atividade_id`),
  KEY `atividades_tarefas_usuario_id_foreign` (`usuario_id`),
  KEY `atividades_tarefas_tipo_tarefa_id_foreign` (`tipo_tarefa_id`),
  CONSTRAINT `atividades_tarefas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_tarefas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_tarefas_tipo_tarefa_id_foreign` FOREIGN KEY (`tipo_tarefa_id`) REFERENCES `tipos_tarefas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `atividades_tarefas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `audits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `audits` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_type` varchar(255) DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL,
  `event` varchar(255) NOT NULL,
  `auditable_type` varchar(255) NOT NULL,
  `auditable_id` char(36) NOT NULL,
  `old_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_values`)),
  `new_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_values`)),
  `url` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(1023) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `error_message` longtext DEFAULT NULL,
  `enviado` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `audits_user_type_user_id_index` (`user_type`,`user_id`),
  KEY `audits_auditable_type_auditable_id_index` (`auditable_type`,`auditable_id`),
  KEY `auditable_index` (`auditable_type`,`auditable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_avaliacao` datetime NOT NULL COMMENT 'Data e hora da avaliação',
  `nota` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nota da avaliação' CHECK (json_valid(`nota`)),
  `justificativa` text DEFAULT NULL COMMENT 'Comentário referente à avaliação, pelo avaliador',
  `justificativas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'Justificativas' CHECK (json_valid(`justificativas`)),
  `recurso` text DEFAULT NULL COMMENT 'Recurso contra a nota atribuída, pelo avaliado',
  `avaliador_id` char(36) NOT NULL,
  `plano_trabalho_consolidacao_id` char(36) DEFAULT NULL,
  `plano_entrega_id` char(36) DEFAULT NULL,
  `tipo_avaliacao_id` char(36) NOT NULL,
  `tipo_avaliacao_nota_id` char(36) DEFAULT NULL,
  `data_recurso` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `avaliacoes_avaliador_id_foreign` (`avaliador_id`),
  KEY `avaliacoes_plano_trabalho_consolidacao_id_foreign` (`plano_trabalho_consolidacao_id`),
  KEY `avaliacoes_plano_entrega_id_foreign` (`plano_entrega_id`),
  KEY `avaliacoes_tipo_avaliacao_id_foreign` (`tipo_avaliacao_id`),
  KEY `avaliacoes_tipo_avaliacao_nota_id_foreign` (`tipo_avaliacao_nota_id`),
  CONSTRAINT `avaliacoes_avaliador_id_foreign` FOREIGN KEY (`avaliador_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `avaliacoes_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `avaliacoes_plano_trabalho_consolidacao_id_foreign` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `avaliacoes_tipo_avaliacao_id_foreign` FOREIGN KEY (`tipo_avaliacao_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `avaliacoes_tipo_avaliacao_nota_id_foreign` FOREIGN KEY (`tipo_avaliacao_nota_id`) REFERENCES `tipos_avaliacoes_notas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `avaliacoes_entregas_checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes_entregas_checklist` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Checklist' CHECK (json_valid(`checklist`)),
  `avaliacao_id` char(36) NOT NULL,
  `plano_trabalho_entrega_id` char(36) DEFAULT NULL,
  `plano_entrega_entrega_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `avaliacoes_entregas_checklist_avaliacao_id_foreign` (`avaliacao_id`),
  KEY `avaliacoes_entregas_checklist_plano_trabalho_entrega_id_foreign` (`plano_trabalho_entrega_id`),
  KEY `avaliacoes_entregas_checklist_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
  CONSTRAINT `avaliacoes_entregas_checklist_avaliacao_id_foreign` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `avaliacoes_entregas_checklist_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `avaliacoes_entregas_checklist_plano_trabalho_entrega_id_foreign` FOREIGN KEY (`plano_trabalho_entrega_id`) REFERENCES `planos_trabalhos_entregas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cadeias_valores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadeias_valores` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_inicio` datetime NOT NULL COMMENT 'Data de início da cadeia de valores',
  `data_fim` datetime DEFAULT NULL COMMENT 'Data final da cadeia de valores',
  `data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento da cadeia de valores',
  `nome` varchar(256) NOT NULL COMMENT 'Nome da cadeia de valores',
  `entidade_id` char(36) NOT NULL,
  `unidade_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cadeias_valores_entidade_id_foreign` (`entidade_id`),
  KEY `cadeias_valores_unidade_id_foreign` (`unidade_id`),
  CONSTRAINT `cadeias_valores_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `cadeias_valores_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cadeias_valores_processos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadeias_valores_processos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sequencia` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência do processo dentro do grupo',
  `path` text DEFAULT NULL COMMENT 'Path dos nós pais separados por /, ou NULL caso sejam nós raiz',
  `nome` varchar(256) NOT NULL COMMENT 'Nome do processo',
  `cadeia_valor_id` char(36) NOT NULL,
  `processo_pai_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cadeias_valores_processos_cadeia_valor_id_foreign` (`cadeia_valor_id`),
  KEY `cadeias_valores_processos_processo_pai_id_foreign` (`processo_pai_id`),
  CONSTRAINT `cadeias_valores_processos_cadeia_valor_id_foreign` FOREIGN KEY (`cadeia_valor_id`) REFERENCES `cadeias_valores` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `cadeias_valores_processos_processo_pai_id_foreign` FOREIGN KEY (`processo_pai_id`) REFERENCES `cadeias_valores_processos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `capacidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `capacidades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `perfil_id` char(36) DEFAULT NULL,
  `tipo_capacidade_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `capacidades_perfil_id_foreign` (`perfil_id`),
  KEY `capacidades_tipo_capacidade_id_foreign` (`tipo_capacidade_id`),
  CONSTRAINT `capacidades_perfil_id_foreign` FOREIGN KEY (`perfil_id`) REFERENCES `perfis` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `capacidades_tipo_capacidade_id_foreign` FOREIGN KEY (`tipo_capacidade_id`) REFERENCES `tipos_capacidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `capacidades_tecnicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `capacidades_tecnicas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome da capacidade técnica',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'capacidade ativo ou inativo',
  `area_tematica_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `capacidades_tecnicas_area_tematica_id_foreign` (`area_tematica_id`),
  CONSTRAINT `capacidades_tecnicas_area_tematica_id_foreign` FOREIGN KEY (`area_tematica_id`) REFERENCES `areas_tematicas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do Cargo',
  `nivel` varchar(256) DEFAULT NULL COMMENT 'Nível do Cargo',
  `descricao` varchar(256) DEFAULT NULL COMMENT 'Descrição do Cargo',
  `siape` varchar(256) DEFAULT NULL COMMENT 'código SIAPE do Cargo',
  `cbo` varchar(256) DEFAULT NULL COMMENT 'código CBO do Cargo',
  `efetivo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Cargo efetivo ou comissionado',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Cargo ativo ou inativo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `catalogo_produtos_servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_produtos_servicos` (
  `id` char(36) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `unidade_id` char(36) NOT NULL,
  `curador_responsavel_id` char(36) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `catalogo_produtos_servicos_unidade_id_foreign` (`unidade_id`),
  KEY `catalogo_produtos_servicos_curador_responsavel_id_foreign` (`curador_responsavel_id`),
  CONSTRAINT `catalogo_produtos_servicos_curador_responsavel_id_foreign` FOREIGN KEY (`curador_responsavel_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `catalogo_produtos_servicos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `centros_treinamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `centros_treinamentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do centro de treinamento',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Curso ativo ou inativo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cidades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `codigo_ibge` varchar(20) NOT NULL COMMENT 'Código IBGE',
  `nome` varchar(256) NOT NULL COMMENT 'Nome',
  `tipo` set('MUNICIPIO','DISTRITO','CAPITAL') NOT NULL COMMENT 'Tipo da cidade',
  `uf` varchar(2) NOT NULL COMMENT 'Unidade Federativa',
  `timezone` int(11) NOT NULL COMMENT 'Timezone UTC da cidade',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cidades_codigo_ibge_unique` (`codigo_ibge`),
  KEY `cidades_codigo_ibge_index` (`codigo_ibge`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` char(36) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `tipo_cliente_id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `unidade_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clientes_unidade_id_foreign` (`unidade_id`),
  KEY `clientes_tipo_cliente_id_foreign` (`tipo_cliente_id`),
  CONSTRAINT `clientes_tipo_cliente_id_foreign` FOREIGN KEY (`tipo_cliente_id`) REFERENCES `tipos_clientes` (`id`),
  CONSTRAINT `clientes_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `texto` text NOT NULL COMMENT 'Texto do comentário',
  `path` text DEFAULT NULL COMMENT 'Path dos ids dos comentários',
  `data_comentario` datetime NOT NULL COMMENT 'Data e horário em que foi feito o comentário',
  `tipo` enum('COMENTARIO','TECNICO','GERENCIAL','AVALIACAO','TAREFA','ATIVIDADE','TIPO_ATIVIDADE') NOT NULL DEFAULT 'COMENTARIO' COMMENT 'Tipo do comentário',
  `privacidade` enum('PUBLICO','PRIVADO') NOT NULL DEFAULT 'PUBLICO' COMMENT 'Nível de acesso ao comentário',
  `usuario_id` char(36) NOT NULL,
  `comentario_pai_id` char(36) DEFAULT NULL,
  `atividade_id` char(36) DEFAULT NULL,
  `atividade_tarefa_id` char(36) DEFAULT NULL,
  `projeto_id` char(36) DEFAULT NULL,
  `projeto_tarefa_id` char(36) DEFAULT NULL,
  `plano_entrega_entrega_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comentarios_usuario_id_foreign` (`usuario_id`),
  KEY `comentarios_comentario_pai_id_foreign` (`comentario_pai_id`),
  KEY `comentarios_atividade_id_foreign` (`atividade_id`),
  KEY `comentarios_atividade_tarefa_id_foreign` (`atividade_tarefa_id`),
  KEY `comentarios_projeto_id_foreign` (`projeto_id`),
  KEY `comentarios_projeto_tarefa_id_foreign` (`projeto_tarefa_id`),
  KEY `comentarios_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
  CONSTRAINT `comentarios_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comentarios_atividade_tarefa_id_foreign` FOREIGN KEY (`atividade_tarefa_id`) REFERENCES `atividades_tarefas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comentarios_comentario_pai_id_foreign` FOREIGN KEY (`comentario_pai_id`) REFERENCES `comentarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comentarios_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comentarios_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comentarios_projeto_tarefa_id_foreign` FOREIGN KEY (`projeto_tarefa_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comentarios_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `comparecimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `comparecimentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_comparecimento` date NOT NULL COMMENT 'Data do comparecimento',
  `detalhamento` varchar(255) NOT NULL COMMENT 'Detalhamento do comparecimento',
  `plano_trabalho_consolidacao_id` char(36) NOT NULL,
  `unidade_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comparecimentos_plano_trabalho_consolidacao_id_foreign` (`plano_trabalho_consolidacao_id`),
  KEY `comparecimentos_unidade_id_foreign` (`unidade_id`),
  CONSTRAINT `comparecimentos_plano_trabalho_consolidacao_id_foreign` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comparecimentos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `curriculuns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculuns` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `apresentacao` longtext NOT NULL COMMENT 'Apresentação',
  `telefone` varchar(64) NOT NULL COMMENT 'Telefone',
  `idiomas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Idiomas que fala' CHECK (json_valid(`idiomas`)),
  `estado_civil` varchar(64) DEFAULT NULL COMMENT 'Estado Civil',
  `quantidade_filhos` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Qtde de filhos',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Curriculum ativa ou inativa',
  `usuario_id` char(36) NOT NULL,
  `cidade_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `curriculums_usuario_id_foreign` (`usuario_id`),
  KEY `curriculums_cidade_id_foreign` (`cidade_id`),
  CONSTRAINT `curriculums_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `curriculums_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `curriculuns_graduacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculuns_graduacoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `pretensao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Pretende fazer o curso',
  `curriculum_id` char(36) NOT NULL,
  `curso_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `curriculums_graduacoes_curriculum_id_foreign` (`curriculum_id`),
  KEY `curriculums_graduacoes_curso_id_foreign` (`curso_id`),
  CONSTRAINT `curriculums_graduacoes_curriculum_id_foreign` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculuns` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `curriculums_graduacoes_curso_id_foreign` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `curriculuns_profissionais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculuns_profissionais` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `ano_ingresso` int(11) NOT NULL DEFAULT 0 COMMENT 'Ano de ingresso',
  `lotacao_atual` varchar(255) DEFAULT NULL COMMENT 'Lotação atual',
  `especifique_habilidades` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Especifique suas habilidades: (Ex: Desenvolvo em JavaScript)' CHECK (json_valid(`especifique_habilidades`)),
  `viagem_nacional` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Já fez viagem nacional a trabalho',
  `viagem_internacional` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Já fez viagem internacional a trabalho',
  `interesse_bnt` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Você tem interesse na participação do Banco Nacional de Talentos',
  `pgd_inserido` varchar(255) DEFAULT NULL COMMENT 'Você está inserido no programa de gestão da Instituição',
  `pgd_interesse` varchar(255) DEFAULT NULL COMMENT 'Você tem interesse em participar do programa de gestão da Instituição',
  `telefone` varchar(64) DEFAULT NULL COMMENT 'Telefone do chefe imediato',
  `remocao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Você tem interesse em remoção',
  `curriculum_id` char(36) NOT NULL,
  `centro_treinamento_id` char(36) DEFAULT NULL COMMENT '(DC2Type:guid)',
  `cargo_id` char(36) NOT NULL,
  `grupo_especializado_id` char(36) DEFAULT NULL COMMENT '(DC2Type:guid)',
  PRIMARY KEY (`id`),
  KEY `curriculums_profissionais_curriculum_id_foreign` (`curriculum_id`),
  KEY `curriculums_profissionais_centro_treinamento_id_foreign` (`centro_treinamento_id`),
  KEY `curriculums_profissionais_cargo_id_foreign` (`cargo_id`),
  KEY `curriculums_profissionais_grupo_especializado_id_foreign` (`grupo_especializado_id`),
  CONSTRAINT `curriculums_profissionais_cargo_id_foreign` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `curriculums_profissionais_centro_treinamento_id_foreign` FOREIGN KEY (`centro_treinamento_id`) REFERENCES `centros_treinamentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `curriculums_profissionais_curriculum_id_foreign` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculuns` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `curriculums_profissionais_grupo_especializado_id_foreign` FOREIGN KEY (`grupo_especializado_id`) REFERENCES `grupos_especializados` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do curso',
  `titulo` varchar(64) NOT NULL COMMENT 'Titulação do curso->Graduação, Pos, etc',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Curso ativo ou inativo',
  `area_id` char(36) NOT NULL,
  `tipo_curso_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cursos_area_id_foreign` (`area_id`),
  KEY `cursos_tipo_curso_id_foreign` (`tipo_curso_id`),
  CONSTRAINT `cursos_area_id_foreign` FOREIGN KEY (`area_id`) REFERENCES `areas_conhecimentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `cursos_tipo_curso_id_foreign` FOREIGN KEY (`tipo_curso_id`) REFERENCES `tipos_cursos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `disciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `disciplinas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do curso',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Curso ativo ou inativo',
  `sigla` varchar(20) DEFAULT NULL COMMENT 'Sigla da disciplina.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do documento (Gerado pelo sistema)',
  `titulo` varchar(256) NOT NULL COMMENT 'Titulo do documento',
  `tipo` enum('HTML','PDF','LINK','REPORT') DEFAULT NULL,
  `especie` enum('SEI','TCR','OUTRO','NOTIFICACAO','RELATORIO') DEFAULT NULL,
  `conteudo` longtext DEFAULT NULL COMMENT 'Conteúdo do arquivo',
  `metadados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Metadados' CHECK (json_valid(`metadados`)),
  `link` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Informações sobre o link, caso o tipo seja LINK' CHECK (json_valid(`link`)),
  `status` enum('GERADO','AGUARDANDO_SEI') NOT NULL DEFAULT 'GERADO' COMMENT 'Status do documento: GERADO (documento gerado); AGUARDANDO_SEI (Aguardando abrir o documento no sei para colar o conteúdo dentro)',
  `template` longtext DEFAULT NULL COMMENT 'Campo de Template',
  `dataset` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Definição das variáveis disponíveis para o template' CHECK (json_valid(`dataset`)),
  `datasource` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Conjunto de dados do template' CHECK (json_valid(`datasource`)),
  `template_id` char(36) DEFAULT NULL,
  `entidade_id` char(36) DEFAULT NULL,
  `plano_trabalho_id` char(36) DEFAULT NULL,
  `tipo_documento_id` char(36) DEFAULT NULL,
  `tipo_processo_id` char(36) DEFAULT NULL,
  `atividade_id` char(36) DEFAULT NULL,
  `atividade_tarefa_id` char(36) DEFAULT NULL,
  `usuario_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documentos_numero_unique` (`numero`),
  KEY `documentos_template_id_foreign` (`template_id`),
  KEY `documentos_entidade_id_foreign` (`entidade_id`),
  KEY `documentos_plano_trabalho_id_foreign` (`plano_trabalho_id`),
  KEY `documentos_tipo_documento_id_foreign` (`tipo_documento_id`),
  KEY `documentos_tipo_processo_id_foreign` (`tipo_processo_id`),
  KEY `documentos_atividade_id_foreign` (`atividade_id`),
  KEY `documentos_atividade_tarefa_id_foreign` (`atividade_tarefa_id`),
  KEY `documentos_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `documentos_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `documentos_atividade_tarefa_id_foreign` FOREIGN KEY (`atividade_tarefa_id`) REFERENCES `atividades_tarefas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `documentos_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `documentos_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `documentos_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `documentos_tipo_documento_id_foreign` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipos_documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `documentos_tipo_processo_id_foreign` FOREIGN KEY (`tipo_processo_id`) REFERENCES `tipos_processos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `documentos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `documentos_assinaturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos_assinaturas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_assinatura` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data hora da assinatura',
  `assinatura` text NOT NULL COMMENT 'Hash da assinatura',
  `documento_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `documentos_assinaturas_documento_id_foreign` (`documento_id`),
  KEY `documentos_assinaturas_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `documentos_assinaturas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `documentos_assinaturas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `eixos_tematicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `eixos_tematicos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do eixo temático',
  `icone` varchar(100) NOT NULL COMMENT 'Classe CSS do icone relacionado ao eixo temático',
  `cor` varchar(100) NOT NULL COMMENT 'Código HEX da cor relacionada ao eixo temático',
  `descricao` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `entidade_emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `entidade_emails` (
  `id` char(36) NOT NULL,
  `entidade_id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entidade_emails_entidade_id_foreign` (`entidade_id`),
  CONSTRAINT `entidade_emails_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `entidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `entidades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sigla` varchar(100) NOT NULL COMMENT 'Sigla da entidade',
  `nome` varchar(256) NOT NULL COMMENT 'Nome da entidade',
  `abrangencia` enum('NACIONAL','ESTADUAL','MUNICIPAL') NOT NULL COMMENT 'Abrangência da entidade',
  `codigo_ibge` varchar(8) DEFAULT NULL COMMENT 'Código da UF ou do município (IBGE)',
  `uf` varchar(2) DEFAULT NULL COMMENT 'UF para feriados estaduais',
  `carga_horaria_padrao` int(11) NOT NULL DEFAULT 8 COMMENT 'Carga horária utilizada ao criar plano de trabalho',
  `gravar_historico_processo` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se grava andamento da atividade dentro do processo vinculado (Caso seja o SEI, será em Consultar Andamento)',
  `layout_formulario_atividade` enum('COMPLETO','SIMPLIFICADO') NOT NULL DEFAULT 'COMPLETO' COMMENT 'Layout para a tela do formulário de atividades (cadastro simplificado ou completo)',
  `campos_ocultos_atividade` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Campos que se deseja ocultar do formulário de atividade, com seu respectivo valor padrão, em caso de NULL será utilizado o valor default do banco' CHECK (json_valid(`campos_ocultos_atividade`)),
  `nomenclatura` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nomenclatura utilizada no sistema' CHECK (json_valid(`nomenclatura`)),
  `notificacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)' CHECK (json_valid(`notificacoes`)),
  `forma_contagem_carga_horaria` enum('DIA','SEMANA','MES') NOT NULL DEFAULT 'DIA' COMMENT 'Forma de contagem padrão da carga horária',
  `expediente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{"domingo":[],"segunda":[],"terca":[],"quarta":[],"quinta":[],"sexta":[],"sabado":[],"especial":[]}' COMMENT 'Configuração de expediente' CHECK (json_valid(`expediente`)),
  `tipo_modalidade_id` char(36) DEFAULT NULL,
  `cidade_id` char(36) DEFAULT NULL,
  `gestor_id` char(36) DEFAULT NULL,
  `gestor_substituto_id` char(36) DEFAULT NULL,
  `email_responsavel_siape` varchar(100) DEFAULT NULL,
  `email_remetente_siape` varchar(100) DEFAULT NULL,
  `habilitar_relatos_siape` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entidades_sigla_unique` (`sigla`),
  KEY `entidades_tipo_modalidade_id_foreign` (`tipo_modalidade_id`),
  KEY `entidades_cidade_id_foreign` (`cidade_id`),
  KEY `entidades_gestor_id_foreign` (`gestor_id`),
  KEY `entidades_gestor_substituto_id_foreign` (`gestor_substituto_id`),
  CONSTRAINT `entidades_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `entidades_gestor_id_foreign` FOREIGN KEY (`gestor_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `entidades_gestor_substituto_id_foreign` FOREIGN KEY (`gestor_substituto_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `entidades_tipo_modalidade_id_foreign` FOREIGN KEY (`tipo_modalidade_id`) REFERENCES `tipos_modalidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` text NOT NULL,
  `descricao` text NOT NULL,
  `tipo_indicador` enum('QUANTIDADE','VALOR','PORCENTAGEM','QUALITATIVO') NOT NULL COMMENT 'Tipo do indicador da entrega',
  `lista_qualitativos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Lista de valores para entrega do tipo qualitativo' CHECK (json_valid(`lista_qualitativos`)),
  `unidade_id` char(36) DEFAULT NULL,
  `checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist' CHECK (json_valid(`checklist`)),
  `etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
  PRIMARY KEY (`id`),
  KEY `entregas_unidade_id_foreign` (`unidade_id`),
  CONSTRAINT `entregas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `envio_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio_itens` (
  `id` char(36) NOT NULL,
  `envio_id` char(36) NOT NULL,
  `tipo` enum('participante','trabalho','entrega') NOT NULL,
  `uid` char(36) NOT NULL,
  `fonte` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `sucesso` tinyint(1) NOT NULL DEFAULT 0,
  `erros` text DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `envio_itens_envio_id_foreign` (`envio_id`),
  CONSTRAINT `envio_itens_envio_id_foreign` FOREIGN KEY (`envio_id`) REFERENCES `envios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `envios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `envios` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `finished_at` timestamp NULL DEFAULT NULL,
  `sucesso` tinyint(1) NOT NULL DEFAULT 0,
  `erros` text DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `qtde_participantes_sucessos` int(11) NOT NULL DEFAULT 0,
  `qtde_participantes_falhas` int(11) NOT NULL DEFAULT 0,
  `qtde_entregas_sucessos` int(11) NOT NULL DEFAULT 0,
  `qtde_entregas_falhas` int(11) NOT NULL DEFAULT 0,
  `qtde_trabalhos_sucessos` int(11) NOT NULL DEFAULT 0,
  `qtde_trabalhos_falhas` int(11) NOT NULL DEFAULT 0,
  `numero` bigint(20) unsigned NOT NULL,
  `qtde_participantes_aptos` int(11) NOT NULL DEFAULT 0,
  `qtde_entregas_aptos` int(11) NOT NULL DEFAULT 0,
  `qtde_trabalhos_aptos` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `envios_numero_unique` (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações do favoritos' CHECK (json_valid(`config`)),
  `usuario_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `favoritos_usuario_id_unique` (`usuario_id`),
  CONSTRAINT `favoritos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `feriados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `feriados` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(250) NOT NULL COMMENT 'Descrição do feriado',
  `dia` int(11) NOT NULL COMMENT 'Dia do mês (1~31) ou dia da semana (1-7)',
  `mes` int(11) NOT NULL COMMENT 'Mês',
  `ano` int(11) DEFAULT NULL COMMENT 'Ano do feriado caso seja data não recorrente',
  `tipoDia` enum('MES','SEMANA') NOT NULL COMMENT 'Se o campo dia representa o dia da semana',
  `recorrente` tinyint(4) NOT NULL COMMENT 'Se é uma data única ou repete todos os anos',
  `abrangencia` enum('NACIONAL','ESTADUAL','MUNICIPAL') NOT NULL COMMENT 'Abrangência do feriado',
  `codigo_ibge` varchar(8) DEFAULT NULL COMMENT 'Código da UF ou do município (IBGE)',
  `uf` varchar(2) DEFAULT NULL COMMENT 'UF para feriados estaduais',
  `entidade_id` char(36) DEFAULT NULL,
  `cidade_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `feriados_entidade_id_foreign` (`entidade_id`),
  KEY `feriados_cidade_id_foreign` (`cidade_id`),
  CONSTRAINT `feriados_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `feriados_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `funcoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome da Função',
  `nivel` varchar(256) DEFAULT NULL COMMENT 'Nível da Função',
  `descricao` varchar(256) DEFAULT NULL COMMENT 'Descrição da Função',
  `siape` varchar(256) DEFAULT NULL COMMENT 'código SIAPE da Função',
  `cbo` varchar(256) DEFAULT NULL COMMENT 'código CBO da Função',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Função ativo ou inativo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `grupos_especializados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos_especializados` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do grupo especializado',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Nome ativo ou inativo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `historicos_atividades_externas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicos_atividades_externas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `curriculum_profissional_id` char(36) NOT NULL,
  `area_atividade_externa_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hist_ativ_ext_id_curriculum_prof_id` (`curriculum_profissional_id`),
  KEY `fk_hist_ativ_ext_id_area_ativ_ext_id` (`area_atividade_externa_id`),
  CONSTRAINT `fk_hist_ativ_ext_id_area_ativ_ext_id` FOREIGN KEY (`area_atividade_externa_id`) REFERENCES `areas_atividades_externas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_hist_ativ_ext_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `historicos_atividades_internas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicos_atividades_internas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `curriculum_profissional_id` char(36) NOT NULL,
  `capacidade_tecnica_id` char(36) NOT NULL,
  `atividade_desempenhada` varchar(256) DEFAULT NULL COMMENT 'Atividade desempenhada na instituição',
  PRIMARY KEY (`id`),
  KEY `fk_hist_ativ_int_id_curriculum_prof_id` (`curriculum_profissional_id`),
  KEY `fk_capac_tec_id_curriculum_prof_id` (`capacidade_tecnica_id`),
  CONSTRAINT `fk_capac_tec_id_curriculum_prof_id` FOREIGN KEY (`capacidade_tecnica_id`) REFERENCES `capacidades_tecnicas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_hist_ativ_int_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `historicos_cursos_externos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicos_cursos_externos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(128) NOT NULL COMMENT 'Nome do curso externo',
  `pretensao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Pretende ou não fazer o curso',
  `curriculum_profissional_id` char(36) NOT NULL,
  `area_atividade_externa_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hist_cur_ext_id_curriculum_prof_id` (`curriculum_profissional_id`),
  KEY `fk_hist_cur_ext_id_area_ativ_id` (`area_atividade_externa_id`),
  CONSTRAINT `fk_hist_cur_ext_id_area_ativ_id` FOREIGN KEY (`area_atividade_externa_id`) REFERENCES `areas_atividades_externas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_hist_cur_ext_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `historicos_cursos_internos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicos_cursos_internos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `pretensao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Pretende ou não fazer o curso',
  `curriculum_profissional_id` char(36) NOT NULL,
  `curso_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hist_cur_int_id_curriculum_prof_id` (`curriculum_profissional_id`),
  KEY `fk_hist_cur_int_id_curso_id` (`curso_id`),
  CONSTRAINT `fk_hist_cur_int_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_hist_cur_int_id_curso_id` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `historicos_docencias_externas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicos_docencias_externas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `curriculum_profissional_id` char(36) NOT NULL,
  `area_atividade_externa_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hist_docen_ext_id_curriculum_prof_id` (`curriculum_profissional_id`),
  KEY `fk_hist_docen_ext_id_area_ativ_ext_id` (`area_atividade_externa_id`),
  CONSTRAINT `fk_hist_docen_ext_id_area_ativ_ext_id` FOREIGN KEY (`area_atividade_externa_id`) REFERENCES `areas_atividades_externas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_hist_docen_ext_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `historicos_docencias_internas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicos_docencias_internas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `curriculum_profissional_id` char(36) NOT NULL,
  `disciplina_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hist_docen_int_id_curriculum_prof_id` (`curriculum_profissional_id`),
  KEY `historicos_docencias_internas_disciplina_id_foreign` (`disciplina_id`),
  CONSTRAINT `fk_hist_docen_int_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `historicos_docencias_internas_disciplina_id_foreign` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `historicos_funcoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicos_funcoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `curriculum_profissional_id` char(36) NOT NULL,
  `funcao_id` char(36) NOT NULL,
  `unidade_id` text DEFAULT NULL COMMENT 'Unidade em que foi chefe',
  PRIMARY KEY (`id`),
  KEY `fk_hist_func_id_curriculum_prof_id` (`curriculum_profissional_id`),
  KEY `fk_hist_func_id_funcao_id` (`funcao_id`),
  CONSTRAINT `fk_hist_func_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_hist_func_id_funcao_id` FOREIGN KEY (`funcao_id`) REFERENCES `funcoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `historicos_lotacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historicos_lotacoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `curriculum_profissional_id` char(36) NOT NULL,
  `unidade_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hist_lot_id_curriculum_prof_id` (`curriculum_profissional_id`),
  KEY `fk_hist_lot_id_unidade_id` (`unidade_id`),
  CONSTRAINT `fk_hist_lot_id_curriculum_prof_id` FOREIGN KEY (`curriculum_profissional_id`) REFERENCES `curriculuns_profissionais` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_hist_lot_id_unidade_id` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `integracao_servidores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `integracao_servidores` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `cpf_ativo` varchar(50) DEFAULT NULL,
  `data_modificacao` datetime DEFAULT NULL,
  `cpf` varchar(50) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `emailfuncional` varchar(100) DEFAULT NULL,
  `sexo` varchar(50) DEFAULT NULL,
  `municipio` varchar(100) DEFAULT NULL,
  `uf` varchar(50) DEFAULT NULL,
  `data_nascimento` varchar(50) DEFAULT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `vinculo_ativo` varchar(50) DEFAULT NULL,
  `matriculasiape` varchar(50) DEFAULT NULL,
  `codigo_cargo` varchar(100) DEFAULT NULL,
  `coduorgexercicio` varchar(50) DEFAULT NULL,
  `coduorglotacao` varchar(50) DEFAULT NULL,
  `codigo_servo_exercicio` varchar(50) DEFAULT NULL,
  `nomeguerra` varchar(100) DEFAULT NULL,
  `situacao_funcional` varchar(50) DEFAULT NULL,
  `codupag` varchar(50) DEFAULT NULL,
  `dataexercicionoorgao` varchar(50) DEFAULT NULL,
  `funcoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`funcoes`)),
  `cpf_chefia_imediata` varchar(50) DEFAULT NULL COMMENT 'Registra CPF da chefia imediata informado pelo Siape.',
  `email_chefia_imediata` varchar(50) DEFAULT NULL COMMENT 'Registra e-mail da chefia imediata informado pelo Siape.',
  `codigo_situacao_funcional` varchar(50) DEFAULT NULL COMMENT 'Registra Código da Situação Funcional informado pelo Siape.',
  `nome_jornada` varchar(100) DEFAULT NULL COMMENT 'Codigo da Jornada',
  `cod_jornada` int(11) DEFAULT NULL COMMENT 'Nome da Jornada',
  `modalidade_pgd` varchar(50) DEFAULT NULL COMMENT 'Modalidade do Usuário no PGD',
  `participa_pgd` enum('sim','não') NOT NULL COMMENT 'Indica se o usuário participa do PGD.',
  `ident_unica` varchar(50) DEFAULT NULL COMMENT 'Identificador único do servidor',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `integracao_unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `integracao_unidades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `id_servo` varchar(50) DEFAULT NULL,
  `pai_servo` varchar(50) DEFAULT NULL,
  `codigo_siape` varchar(50) DEFAULT NULL,
  `pai_siape` varchar(50) DEFAULT NULL,
  `codupag` varchar(50) DEFAULT NULL,
  `nomeuorg` varchar(200) DEFAULT NULL,
  `siglauorg` varchar(50) DEFAULT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `natureza` varchar(50) DEFAULT NULL,
  `fronteira` varchar(50) DEFAULT NULL,
  `fuso_horario` varchar(50) DEFAULT NULL,
  `cod_uop` varchar(50) DEFAULT NULL,
  `cod_unidade` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `tipo_desc` varchar(100) DEFAULT NULL,
  `na_rodovia` varchar(50) DEFAULT NULL,
  `logradouro` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cep` varchar(50) DEFAULT NULL,
  `ptn_ge_coordenada` varchar(50) DEFAULT NULL,
  `municipio_siafi_siape` varchar(100) DEFAULT NULL,
  `municipio_siscom` varchar(100) DEFAULT NULL,
  `municipio_ibge` varchar(50) DEFAULT NULL,
  `municipio_nome` varchar(100) DEFAULT NULL,
  `municipio_uf` varchar(50) DEFAULT NULL,
  `ativa` varchar(50) DEFAULT NULL,
  `regimental` varchar(50) DEFAULT NULL,
  `data_modificacao` datetime DEFAULT NULL,
  `und_nu_adicional` varchar(50) DEFAULT NULL,
  `cnpjupag` varchar(60) DEFAULT NULL,
  `cpf_titular_autoridade_uorg` varchar(14) DEFAULT NULL,
  `cpf_substituto_autoridade_uorg` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `integracoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `integracoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_execucao` datetime NOT NULL COMMENT 'Data em que a rotina de integração foi executada',
  `atualizar_unidades` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve atualizar as unidades',
  `atualizar_servidores` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve atualizar os servidores',
  `atualizar_gestores` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve atualizar os gestores',
  `usar_arquivos_locais` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve importar os dados de um arquivo local em formato XML',
  `gravar_arquivos_locais` tinyint(1) NOT NULL COMMENT 'Define se a rotina deve salvar os dados importados do SIAPE em um arquivo local em formato XML',
  `resultado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Resultado da execução da rotina de integração' CHECK (json_valid(`resultado`)),
  `entidade_id` char(36) NOT NULL,
  `usuario_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `integracoes_entidade_id_foreign` (`entidade_id`),
  KEY `integracoes_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `integracoes_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `integracoes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `materiais_servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `materiais_servicos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `tipo` enum('MATERIAL','SERVICO') NOT NULL DEFAULT 'MATERIAL' COMMENT 'Tipo',
  `codigo` varchar(100) DEFAULT NULL COMMENT 'Código',
  `referencia` varchar(100) DEFAULT NULL COMMENT 'Referência',
  `descricao` varchar(256) NOT NULL COMMENT 'Descrição',
  `unidade_medida` enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') NOT NULL COMMENT 'Unidade',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número da mensagem (Gerado pelo sistema)',
  `codigo` varchar(255) NOT NULL COMMENT 'Código da mensagem',
  `data_registro` datetime NOT NULL COMMENT 'Data e hora da inclusão da mensagem',
  `mensagem` longtext NOT NULL COMMENT 'Mensagem',
  `remetente_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notificacoes_numero_unique` (`numero`),
  KEY `notificacoes_remetente_id_foreign` (`remetente_id`),
  CONSTRAINT `notificacoes_remetente_id_foreign` FOREIGN KEY (`remetente_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `notificacoes_destinatarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacoes_destinatarios` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `tipo` enum('PETRVS','EMAIL','WHATSAPP') NOT NULL DEFAULT 'PETRVS' COMMENT 'Tipo do envio',
  `data_leitura` datetime DEFAULT NULL COMMENT 'Data e hora da leitura',
  `data_envio` datetime DEFAULT NULL COMMENT 'Data e hora do envio, utilizado quando realmente a mensagem foi despachada',
  `opcoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Opções' CHECK (json_valid(`opcoes`)),
  `notificacao_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `notificacoes_destinatarios_notificacao_id_foreign` (`notificacao_id`),
  KEY `notificacoes_destinatarios_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `notificacoes_destinatarios_notificacao_id_foreign` FOREIGN KEY (`notificacao_id`) REFERENCES `notificacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `notificacoes_destinatarios_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `notificacoes_whatsapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacoes_whatsapp` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_inicio_sessao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data hora do início da sessão',
  `data_fim_sessao` datetime DEFAULT NULL COMMENT 'Data hora do final da sessão (utilizado posteriormente para alertar o usuário que seu atendimento acabou)',
  `data_ultima_interacao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data hora utilizada para fazer o controle do tempo de sessão',
  `interacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'Interações (histórico do campo atual)' CHECK (json_valid(`interacoes`)),
  `atual` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Informações da posição atual no menu',
  `usuario_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notificacoes_whatsapp_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `notificacoes_whatsapp_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `ocorrencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ocorrencias` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_inicio` datetime NOT NULL COMMENT 'Data inicial da consolidacão',
  `data_fim` datetime NOT NULL COMMENT 'Data final da consolidação',
  `descricao` longtext NOT NULL COMMENT 'Descrição da ocorrência',
  `plano_trabalho_id` char(36) DEFAULT NULL,
  `usuario_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ocorrencias_plano_trabalho_id_foreign` (`plano_trabalho_id`),
  KEY `ocorrencias_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `ocorrencias_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ocorrencias_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `okrs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `okrs` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_inicio` datetime NOT NULL COMMENT 'Data de início do OKR',
  `data_fim` datetime NOT NULL COMMENT 'Data final do OKR',
  `data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do OKR',
  `nome` varchar(256) NOT NULL COMMENT 'Nome do OKR',
  `unidade_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `okrs_unidade_id_foreign` (`unidade_id`),
  CONSTRAINT `okrs_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `okrs_objetivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `okrs_objetivos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sequencia` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência utilizada para ordenar os objetivos',
  `fundamentacao` text NOT NULL COMMENT 'Fundamentação do objetivo, agora como tipo TEXT',
  `nome` varchar(256) NOT NULL COMMENT 'Nome do objetivo',
  `cor` varchar(100) NOT NULL COMMENT 'Cor do objetivo',
  `okr_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `okrs_objetivos_okr_id_foreign` (`okr_id`),
  CONSTRAINT `okrs_objetivos_okr_id_foreign` FOREIGN KEY (`okr_id`) REFERENCES `okrs` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `okrs_objetivos_resultados_chaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `okrs_objetivos_resultados_chaves` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_inicio` datetime NOT NULL COMMENT 'Data inicial',
  `data_fim` datetime DEFAULT NULL COMMENT 'Data final',
  `descricao` varchar(256) NOT NULL COMMENT 'Descrição',
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
  `confianca` decimal(5,2) DEFAULT 0.00 COMMENT 'Nível % de confiança para atingir a meta',
  `realizado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Valor realizado da entrega' CHECK (json_valid(`realizado`)),
  `cor` varchar(100) NOT NULL COMMENT 'Cor do objetivo',
  `okr_objetivo_id` char(36) NOT NULL,
  `entrega_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `okrs_objetivos_resultados_chaves_okr_objetivo_id_foreign` (`okr_objetivo_id`),
  KEY `okrs_objetivos_resultados_chaves_entrega_id_foreign` (`entrega_id`),
  CONSTRAINT `okrs_objetivos_resultados_chaves_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `okrs_objetivos_resultados_chaves_okr_objetivo_id_foreign` FOREIGN KEY (`okr_objetivo_id`) REFERENCES `okrs_objetivos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `perfis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfis` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nivel` int(11) NOT NULL COMMENT 'Evita que usuários de nível inferior atribuam perfis de nível superior',
  `nome` varchar(256) NOT NULL COMMENT 'Nome do perfil',
  `descricao` text NOT NULL COMMENT 'Descrição do perfil',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planejamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planejamentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do planejamento institucional',
  `missao` text NOT NULL COMMENT 'Missão da entidade/unidade',
  `visao` text NOT NULL COMMENT 'Visão da entidade/unidade',
  `data_inicio` datetime NOT NULL COMMENT 'Data de início do planejamento institucional',
  `data_fim` datetime NOT NULL COMMENT 'Data final do planejamento institucional',
  `data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do planejamento institucional',
  `valores` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Valores da unidade' CHECK (json_valid(`valores`)),
  `resultados_institucionais` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Resultados da unidade' CHECK (json_valid(`resultados_institucionais`)),
  `entidade_id` char(36) NOT NULL,
  `unidade_id` char(36) NOT NULL,
  `planejamento_superior_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `planejamentos_entidade_id_foreign` (`entidade_id`),
  KEY `planejamentos_unidade_id_foreign` (`unidade_id`),
  KEY `planejamentos_planejamento_superior_id_foreign` (`planejamento_superior_id`),
  CONSTRAINT `planejamentos_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planejamentos_planejamento_superior_id_foreign` FOREIGN KEY (`planejamento_superior_id`) REFERENCES `planejamentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planejamentos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planejamentos_objetivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planejamentos_objetivos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sequencia` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência utilizada para ordenar os objetivos',
  `fundamentacao` text NOT NULL COMMENT 'Fundamentação do objetivo, agora como tipo TEXT',
  `nome` text NOT NULL,
  `path` text DEFAULT NULL COMMENT 'IDs dos nós ascendentes separados por /, ou NULL caso seja um nó raiz',
  `planejamento_id` char(36) NOT NULL,
  `eixo_tematico_id` char(36) NOT NULL,
  `objetivo_pai_id` char(36) DEFAULT NULL,
  `objetivo_superior_id` char(36) DEFAULT NULL,
  `integra_okr` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Objetivos que serão visíveis no OKR',
  PRIMARY KEY (`id`),
  KEY `planejamentos_objetivos_planejamento_id_foreign` (`planejamento_id`),
  KEY `planejamentos_objetivos_eixo_tematico_id_foreign` (`eixo_tematico_id`),
  KEY `planejamentos_objetivos_objetivo_pai_id_foreign` (`objetivo_pai_id`),
  KEY `planejamentos_objetivos_objetivo_superior_id_foreign` (`objetivo_superior_id`),
  CONSTRAINT `planejamentos_objetivos_eixo_tematico_id_foreign` FOREIGN KEY (`eixo_tematico_id`) REFERENCES `eixos_tematicos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planejamentos_objetivos_objetivo_pai_id_foreign` FOREIGN KEY (`objetivo_pai_id`) REFERENCES `planejamentos_objetivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planejamentos_objetivos_objetivo_superior_id_foreign` FOREIGN KEY (`objetivo_superior_id`) REFERENCES `planejamentos_objetivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planejamentos_objetivos_planejamento_id_foreign` FOREIGN KEY (`planejamento_id`) REFERENCES `planejamentos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_entregas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do plano de entrega (Gerado pelo sistema)',
  `data_inicio` datetime NOT NULL COMMENT 'Data inicial do plano de entregas',
  `data_fim` datetime DEFAULT NULL COMMENT 'Data final do plano de entregas',
  `data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do plano de entregas',
  `nome` varchar(256) NOT NULL COMMENT 'Nome do plano de entregas',
  `status` enum('INCLUIDO','HOMOLOGANDO','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual do plano de entregas',
  `planejamento_id` char(36) DEFAULT NULL,
  `cadeia_valor_id` char(36) DEFAULT NULL,
  `unidade_id` char(36) NOT NULL,
  `plano_entrega_id` char(36) DEFAULT NULL,
  `programa_id` char(36) NOT NULL,
  `criacao_usuario_id` char(36) NOT NULL,
  `avaliacao_id` char(36) DEFAULT NULL,
  `okr_id` char(36) DEFAULT NULL,
  `data_envio_api_pgd` timestamp NULL DEFAULT NULL,
  `avaliado_at` date DEFAULT NULL COMMENT 'Data em que o plano teve seu status alterado para AVALIADO',
  PRIMARY KEY (`id`),
  UNIQUE KEY `planos_entregas_numero_unique` (`numero`),
  KEY `planos_entregas_planejamento_id_foreign` (`planejamento_id`),
  KEY `planos_entregas_cadeia_valor_id_foreign` (`cadeia_valor_id`),
  KEY `planos_entregas_unidade_id_foreign` (`unidade_id`),
  KEY `planos_entregas_plano_entrega_id_foreign` (`plano_entrega_id`),
  KEY `planos_entregas_programa_id_foreign` (`programa_id`),
  KEY `planos_entregas_criacao_usuario_id_foreign` (`criacao_usuario_id`),
  KEY `planos_entregas_avaliacao_id_foreign` (`avaliacao_id`),
  KEY `planos_entregas_okr_id_foreign` (`okr_id`),
  CONSTRAINT `planos_entregas_avaliacao_id_foreign` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_cadeia_valor_id_foreign` FOREIGN KEY (`cadeia_valor_id`) REFERENCES `cadeias_valores` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_criacao_usuario_id_foreign` FOREIGN KEY (`criacao_usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_okr_id_foreign` FOREIGN KEY (`okr_id`) REFERENCES `okrs` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_planejamento_id_foreign` FOREIGN KEY (`planejamento_id`) REFERENCES `planejamentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_entregas_entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_entregas_entregas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `homologado` tinyint(4) NOT NULL COMMENT 'Se a entrega foi ou não homologada',
  `progresso_esperado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual esperado de progresso do Plano de Entregas',
  `progresso_realizado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual realizado de progresso do Plano de Entregas',
  `data_inicio` datetime NOT NULL COMMENT 'Data inicial da entrega',
  `data_fim` datetime DEFAULT NULL COMMENT 'Data final da entrega',
  `descricao` text NOT NULL,
  `destinatario` varchar(255) DEFAULT NULL COMMENT 'Destinatário da entrega',
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
  `realizado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Valor realizado da entrega' CHECK (json_valid(`realizado`)),
  `plano_entrega_id` char(36) NOT NULL,
  `entrega_id` char(36) NOT NULL DEFAULT '1' COMMENT '(DC2Type:guid)',
  `entrega_pai_id` char(36) DEFAULT NULL,
  `unidade_id` char(36) NOT NULL,
  `checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist' CHECK (json_valid(`checklist`)),
  `etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
  `descricao_meta` longtext NOT NULL COMMENT 'Descrição da meta',
  `descricao_entrega` longtext NOT NULL COMMENT 'Descrição do título da entrega',
  PRIMARY KEY (`id`),
  KEY `planos_entregas_entregas_plano_entrega_id_foreign` (`plano_entrega_id`),
  KEY `planos_entregas_entregas_entrega_id_foreign` (`entrega_id`),
  KEY `planos_entregas_entregas_entrega_pai_id_foreign` (`entrega_pai_id`),
  KEY `planos_entregas_entregas_unidade_id_foreign` (`unidade_id`),
  CONSTRAINT `planos_entregas_entregas_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_entregas_entrega_pai_id_foreign` FOREIGN KEY (`entrega_pai_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_entregas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_entregas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_entregas_entregas_objetivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_entregas_entregas_objetivos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `planejamento_objetivo_id` char(36) NOT NULL COMMENT 'Objetivo do Planejamento institucional ao qual está vinculado este objetivo',
  `entrega_id` char(36) NOT NULL COMMENT 'Entrega do Plano de Entregas à qual está vinculado este objetivo',
  PRIMARY KEY (`id`),
  KEY `fk_plan_entr_entr_obj_id_planej_obj_id` (`planejamento_objetivo_id`),
  KEY `fk_plan_ent_ent_id_plan_entr_entr_obj_id` (`entrega_id`),
  CONSTRAINT `fk_plan_ent_ent_id_plan_entr_entr_obj_id` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_plan_entr_entr_obj_id_planej_obj_id` FOREIGN KEY (`planejamento_objetivo_id`) REFERENCES `planejamentos_objetivos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_entregas_entregas_processos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_entregas_entregas_processos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `cadeia_processo_id` char(36) NOT NULL,
  `entrega_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `planos_entregas_entregas_processos_cadeia_processo_id_foreign` (`cadeia_processo_id`),
  KEY `planos_entregas_entregas_processos_entrega_id_foreign` (`entrega_id`),
  CONSTRAINT `planos_entregas_entregas_processos_cadeia_processo_id_foreign` FOREIGN KEY (`cadeia_processo_id`) REFERENCES `cadeias_valores_processos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_entregas_processos_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_entregas_entregas_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_entregas_entregas_produtos` (
  `id` char(36) NOT NULL,
  `entrega_id` char(36) NOT NULL,
  `produto_id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_entregas_produtos` (`entrega_id`,`produto_id`),
  KEY `planos_entregas_entregas_produtos_produto_id_foreign` (`produto_id`),
  CONSTRAINT `planos_entregas_entregas_produtos_entrega_id_foreign` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_entregas_produtos_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_entregas_entregas_progressos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_entregas_entregas_progressos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `homologado` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se a entrega foi ou não homologada',
  `progresso_esperado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual esperado de progresso do Plano de Entregas',
  `progresso_realizado` decimal(5,2) DEFAULT 0.00 COMMENT 'Percentual realizado de progresso do Plano de Entregas',
  `data_inicio` datetime DEFAULT NULL COMMENT 'Data inicial da entrega',
  `data_fim` datetime DEFAULT NULL COMMENT 'Data final da entrega',
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
  `realizado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Valor realizado da entrega' CHECK (json_valid(`realizado`)),
  `data_progresso` date NOT NULL COMMENT 'Data do progresso',
  `usuario_id` char(36) NOT NULL,
  `plano_entrega_entrega_id` char(36) NOT NULL COMMENT 'Entrega do Plano de Entregas à qual está vinculado este progresso',
  `registro_execucao` longtext DEFAULT NULL COMMENT 'Registro de execução da entrega',
  PRIMARY KEY (`id`),
  KEY `planos_entregas_entregas_progressos_usuario_id_foreign` (`usuario_id`),
  KEY `fk_plan_ent_ent_id_plan_entr_entr_pro_id` (`plano_entrega_entrega_id`),
  CONSTRAINT `fk_plan_ent_ent_id_plan_entr_entr_pro_id` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_entregas_progressos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_entregas_entregas_resultados_chaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_entregas_entregas_resultados_chaves` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `okr_objetivo_resultado_chave_id` char(36) NOT NULL COMMENT 'Resultado chave do OKR',
  `entrega_id` char(36) NOT NULL COMMENT 'Entrega do Plano de Entregas à qual está vinculado',
  PRIMARY KEY (`id`),
  KEY `fk_plan_entr_entr_okr_id_resultado_chave` (`okr_objetivo_resultado_chave_id`),
  KEY `fk_plan_ent_ent_id_plan_entr_entr_okr_id` (`entrega_id`),
  CONSTRAINT `fk_plan_ent_ent_id_plan_entr_entr_okr_id` FOREIGN KEY (`entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_plan_entr_entr_okr_id_resultado_chave` FOREIGN KEY (`okr_objetivo_resultado_chave_id`) REFERENCES `okrs_objetivos_resultados_chaves` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_trabalhos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_trabalhos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `carga_horaria` double(8,2) NOT NULL DEFAULT 0.00 COMMENT 'Carga horária diária do usuário',
  `tempo_total` double(8,2) NOT NULL DEFAULT 0.00 COMMENT 'Horas úteis de trabalho no período de data_inicio à data_fim considerando carga_horaria, feriados, fins de semana',
  `tempo_proporcional` double(8,2) NOT NULL DEFAULT 0.00 COMMENT 'tempo_total menos os afastamentos',
  `numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do plano de trabalho (Gerado pelo sistema)',
  `data_inicio` datetime NOT NULL COMMENT 'Inicio do plano de trabalho',
  `data_fim` datetime NOT NULL COMMENT 'Fim do plano de trabalho',
  `data_arquivamento` datetime DEFAULT NULL COMMENT 'Data de arquivamento do plano de trabalho',
  `forma_contagem_carga_horaria` enum('DIA','SEMANA','MES') NOT NULL DEFAULT 'DIA' COMMENT 'Forma de contagem padrão da carga horária',
  `status` enum('INCLUIDO','AGUARDANDO_ASSINATURA','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual do plano de trabalho',
  `programa_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  `unidade_id` char(36) NOT NULL,
  `tipo_modalidade_id` char(36) NOT NULL,
  `criacao_usuario_id` char(36) NOT NULL,
  `documento_id` char(36) DEFAULT NULL,
  `criterios_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'Critérios para avaliação' CHECK (json_valid(`criterios_avaliacao`)),
  `data_envio_api_pgd` timestamp NULL DEFAULT NULL,
  `avaliado_at` date DEFAULT NULL COMMENT 'Data em que todos os planos_trabalhos_consolidacoes tiveram o status alterado para AVALIADO',
  PRIMARY KEY (`id`),
  UNIQUE KEY `planos_trabalhos_numero_unique` (`numero`),
  KEY `planos_trabalhos_programa_id_foreign` (`programa_id`),
  KEY `planos_trabalhos_usuario_id_foreign` (`usuario_id`),
  KEY `planos_trabalhos_unidade_id_foreign` (`unidade_id`),
  KEY `planos_trabalhos_tipo_modalidade_id_foreign` (`tipo_modalidade_id`),
  KEY `planos_trabalhos_criacao_usuario_id_foreign` (`criacao_usuario_id`),
  KEY `planos_trabalhos_documento_id_foreign` (`documento_id`),
  CONSTRAINT `planos_trabalhos_criacao_usuario_id_foreign` FOREIGN KEY (`criacao_usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_tipo_modalidade_id_foreign` FOREIGN KEY (`tipo_modalidade_id`) REFERENCES `tipos_modalidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_trabalhos_consolidacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_trabalhos_consolidacoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_inicio` date NOT NULL COMMENT 'Data inicial da consolidacão',
  `data_fim` date NOT NULL COMMENT 'Data final da consolidação',
  `data_conclusao` datetime DEFAULT NULL COMMENT 'Data da conclusão (usado como referência para o snapshot das atividades)',
  `status` enum('AGUARDANDO_REGISTRO','INCLUIDO','CONCLUIDO','AVALIADO') NOT NULL DEFAULT 'AGUARDANDO_REGISTRO' COMMENT 'Status atual da consolidação',
  `plano_trabalho_id` char(36) NOT NULL,
  `avaliacao_id` char(36) DEFAULT NULL,
  `justificativa_conclusao` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `planos_trabalhos_consolidacoes_plano_trabalho_id_foreign` (`plano_trabalho_id`),
  KEY `planos_trabalhos_consolidacoes_avaliacao_id_foreign` (`avaliacao_id`),
  CONSTRAINT `planos_trabalhos_consolidacoes_avaliacao_id_foreign` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_consolidacoes_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_trabalhos_consolidacoes_afastamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_trabalhos_consolidacoes_afastamentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `snapshot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snapshot do registro de atividades' CHECK (json_valid(`snapshot`)),
  `data_conclusao` datetime NOT NULL COMMENT 'Data e hora da conclusao',
  `plano_trabalho_consolidacao_id` char(36) DEFAULT NULL COMMENT 'Consolidação do Plano de Trabalho à qual se refere o status',
  `afastamento_id` char(36) DEFAULT NULL COMMENT 'Atividade à qual se refere o status',
  PRIMARY KEY (`id`),
  KEY `fk_plan_trb_cons_afst_id_plan_trb_cons_id` (`plano_trabalho_consolidacao_id`),
  KEY `fk_afastamentos_afst_id_afastamentos_id` (`afastamento_id`),
  CONSTRAINT `fk_afastamentos_afst_id_afastamentos_id` FOREIGN KEY (`afastamento_id`) REFERENCES `afastamentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_plan_trb_cons_afst_id_plan_trb_cons_id` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_trabalhos_consolidacoes_atividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_trabalhos_consolidacoes_atividades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `snapshot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snapshot do registro de atividades' CHECK (json_valid(`snapshot`)),
  `data_conclusao` datetime NOT NULL COMMENT 'Data e hora da conclusao',
  `plano_trabalho_consolidacao_id` char(36) DEFAULT NULL COMMENT 'Consolidação do Plano de Trabalho à qual se refere o status',
  `atividade_id` char(36) DEFAULT NULL COMMENT 'Atividade à qual se refere o status',
  PRIMARY KEY (`id`),
  KEY `fk_plan_trb_cons_id_plan_trb_cons_id` (`plano_trabalho_consolidacao_id`),
  KEY `fk_atividades_id_atividades_id` (`atividade_id`),
  CONSTRAINT `fk_atividades_id_atividades_id` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_plan_trb_cons_id_plan_trb_cons_id` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_trabalhos_consolidacoes_ocorrencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_trabalhos_consolidacoes_ocorrencias` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `plano_trabalho_consolidacao_id` char(36) NOT NULL COMMENT 'Consolidação do Plano de Trabalho à qual está associada esta entrega',
  `snapshot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snapshot do registro de atividades' CHECK (json_valid(`snapshot`)),
  `data_conclusao` datetime NOT NULL COMMENT 'Data e hora da conclusao',
  `ocorrencia_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_plan_trab_cons_id_plan_trab_cons_ocor_id` (`plano_trabalho_consolidacao_id`),
  KEY `planos_trabalhos_consolidacoes_ocorrencias_ocorrencia_id_foreign` (`ocorrencia_id`),
  CONSTRAINT `fk_plan_trab_cons_id_plan_trab_cons_ocor_id` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_consolidacoes_ocorrencias_ocorrencia_id_foreign` FOREIGN KEY (`ocorrencia_id`) REFERENCES `ocorrencias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planos_trabalhos_entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos_trabalhos_entregas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `forca_trabalho` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentual da força de trabalho associado a esta entrega',
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Meta para a entrega' CHECK (json_valid(`meta`)),
  `orgao` varchar(256) DEFAULT NULL COMMENT 'Órgão externo',
  `descricao` text NOT NULL,
  `plano_trabalho_id` char(36) NOT NULL,
  `plano_entrega_entrega_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `planos_trabalhos_entregas_plano_trabalho_id_foreign` (`plano_trabalho_id`),
  KEY `planos_trabalhos_entregas_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
  CONSTRAINT `planos_trabalhos_entregas_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_entregas_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `produto_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_clientes` (
  `id` char(36) NOT NULL,
  `produto_id` char(36) NOT NULL,
  `cliente_id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produto_clientes_produto_id_foreign` (`produto_id`),
  KEY `produto_clientes_cliente_id_foreign` (`cliente_id`),
  CONSTRAINT `produto_clientes_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `produto_clientes_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `produto_processo_cadeia_valor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_processo_cadeia_valor` (
  `id` char(36) NOT NULL,
  `produto_id` char(36) NOT NULL,
  `cadeia_valor_processo_id` char(36) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produto_processo_cadeia_valor_produto_id_foreign` (`produto_id`),
  KEY `produto_processo_cadeia_valor_cadeia_valor_processo_id_foreign` (`cadeia_valor_processo_id`),
  CONSTRAINT `produto_processo_cadeia_valor_cadeia_valor_processo_id_foreign` FOREIGN KEY (`cadeia_valor_processo_id`) REFERENCES `cadeias_valores_processos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `produto_processo_cadeia_valor_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` char(36) NOT NULL,
  `responsavel_id` char(36) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `nome_fantasia` varchar(255) DEFAULT NULL,
  `tipo` enum('produto','servico') NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `url` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `unidade_id` char(36) NOT NULL,
  `data_ativado` timestamp NULL DEFAULT NULL,
  `data_desativado` timestamp NULL DEFAULT NULL,
  `identificador` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `produtos_unidade_id_foreign` (`unidade_id`),
  KEY `produtos_responsavel_id_foreign` (`responsavel_id`),
  CONSTRAINT `produtos_responsavel_id_foreign` FOREIGN KEY (`responsavel_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `produtos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `produtos_insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos_insumos` (
  `id` char(36) NOT NULL,
  `produto_id` char(36) NOT NULL,
  `origem` enum('interno','externo') NOT NULL,
  `unidade_id` char(36) DEFAULT NULL,
  `produto_insumo_id` char(36) DEFAULT NULL,
  `cliente_id` char(36) DEFAULT NULL,
  `descricao` varchar(1000) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produtos_insumos_produto_id_foreign` (`produto_id`),
  KEY `produtos_insumos_produto_insumo_id_foreign` (`produto_insumo_id`),
  KEY `produtos_insumos_unidade_id_foreign` (`unidade_id`),
  KEY `produtos_insumos_cliente_id_foreign` (`cliente_id`),
  CONSTRAINT `produtos_insumos_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  CONSTRAINT `produtos_insumos_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `produtos_insumos_produto_insumo_id_foreign` FOREIGN KEY (`produto_insumo_id`) REFERENCES `produtos` (`id`),
  CONSTRAINT `produtos_insumos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `produtos_solucoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos_solucoes` (
  `id` char(36) NOT NULL,
  `produto_id` char(36) NOT NULL,
  `solucao_id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `produtos_solucoes_produto_id_solucao_id_unique` (`produto_id`,`solucao_id`),
  KEY `produtos_solucoes_solucao_id_foreign` (`solucao_id`),
  CONSTRAINT `produtos_solucoes_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `produtos_solucoes_solucao_id_foreign` FOREIGN KEY (`solucao_id`) REFERENCES `solucao_produtos_servicos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `programas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `programas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(255) NOT NULL COMMENT 'Nome do programa',
  `normativa` varchar(255) DEFAULT NULL COMMENT 'Normativa que regula o programa de gestão',
  `prazo_max_plano_entrega` int(11) NOT NULL COMMENT 'Limite máximo de dias corridos para o plano de entregas (Zero para não limitar)',
  `termo_obrigatorio` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o termo é ou não obrigatório',
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações do programa' CHECK (json_valid(`config`)),
  `data_inicio` datetime NOT NULL COMMENT 'Inicio da vigência do programa',
  `data_fim` datetime NOT NULL COMMENT 'Fim da vigência do programa',
  `periodicidade_consolidacao` enum('DIAS','SEMANAL','QUINZENAL','MENSAL','BIMESTRAL','TRIMESTRAL','SEMESTRAL') NOT NULL DEFAULT 'MENSAL' COMMENT 'Período para avaliação do plano de trabalho',
  `periodicidade_valor` int(11) NOT NULL DEFAULT 1 COMMENT 'Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante',
  `dias_tolerancia_consolidacao` int(11) NOT NULL DEFAULT 10 COMMENT 'Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação',
  `dias_tolerancia_avaliacao` int(11) NOT NULL DEFAULT 20 COMMENT 'Dias de tolerância para realizar a avaliação, considerando a tolerância da consolidação. Caso seja zero não fará nada, caso contrário após esse prazo a consolidação será automaticamente avaliada com a nota padrão',
  `dias_tolerancia_recurso_avaliacao` int(11) NOT NULL DEFAULT 20 COMMENT 'Dias de tolerância para recorrer da avaliação',
  `nota_padrao_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nota padrão de avaliação, para quando o gestor não realizar a avaliação dentro do prazo' CHECK (json_valid(`nota_padrao_avaliacao`)),
  `checklist_avaliacao_entregas_plano_entrega` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist para avaliar das entregas do plano de entrega' CHECK (json_valid(`checklist_avaliacao_entregas_plano_entrega`)),
  `checklist_avaliacao_entregas_plano_trabalho` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Checklist para avaliar das entregas do plano de trabalho' CHECK (json_valid(`checklist_avaliacao_entregas_plano_trabalho`)),
  `registra_comparecimento` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se utiliza registro de comparecimento nas consolidações do plano de trabalho',
  `plano_trabalho_assinatura_participante` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Exigir assinatura do usuário no plano de trabalho',
  `plano_trabalho_assinatura_gestor_lotacao` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Exigir assinatura do gestor da unidade de lotação do servidor',
  `plano_trabalho_assinatura_gestor_unidade` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Exigir assinatura do gestor da unidade executora do plano de trabalho',
  `plano_trabalho_assinatura_gestor_entidade` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Exigir assinatura do gestor da entidade do plano de trabalho',
  `tipo_avaliacao_plano_trabalho_id` char(36) NOT NULL,
  `tipo_avaliacao_plano_entrega_id` char(36) NOT NULL,
  `tipo_justificativa_id` char(36) DEFAULT NULL,
  `unidade_id` char(36) NOT NULL,
  `template_tcr_id` char(36) DEFAULT NULL,
  `tipo_documento_tcr_id` char(36) DEFAULT NULL,
  `documento_id` char(36) DEFAULT NULL,
  `plano_trabalho_criterios_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT json_array() COMMENT 'Critérios para avaliação do plano de trabalho' CHECK (json_valid(`plano_trabalho_criterios_avaliacao`)),
  `link_normativa` varchar(255) DEFAULT NULL COMMENT 'Link da normativa que regula o programa de gestão',
  `unidade_autorizadora_id` char(36) DEFAULT NULL,
  `link_autorizacao` varchar(255) DEFAULT NULL COMMENT 'Link da normativa que autoriza o programa de gestão',
  PRIMARY KEY (`id`),
  KEY `programas_tipo_avaliacao_plano_trabalho_id_foreign` (`tipo_avaliacao_plano_trabalho_id`),
  KEY `programas_tipo_avaliacao_plano_entrega_id_foreign` (`tipo_avaliacao_plano_entrega_id`),
  KEY `programas_tipo_justificativa_id_foreign` (`tipo_justificativa_id`),
  KEY `programas_unidade_id_foreign` (`unidade_id`),
  KEY `programas_template_tcr_id_foreign` (`template_tcr_id`),
  KEY `programas_tipo_documento_tcr_id_foreign` (`tipo_documento_tcr_id`),
  KEY `programas_documento_id_foreign` (`documento_id`),
  KEY `programas_unidade_autorizadora_id_foreign` (`unidade_autorizadora_id`),
  CONSTRAINT `programas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `programas_template_tcr_id_foreign` FOREIGN KEY (`template_tcr_id`) REFERENCES `templates` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `programas_tipo_avaliacao_plano_entrega_id_foreign` FOREIGN KEY (`tipo_avaliacao_plano_entrega_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `programas_tipo_avaliacao_plano_trabalho_id_foreign` FOREIGN KEY (`tipo_avaliacao_plano_trabalho_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `programas_tipo_documento_tcr_id_foreign` FOREIGN KEY (`tipo_documento_tcr_id`) REFERENCES `tipos_documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `programas_tipo_justificativa_id_foreign` FOREIGN KEY (`tipo_justificativa_id`) REFERENCES `tipos_justificativas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `programas_unidade_autorizadora_id_foreign` FOREIGN KEY (`unidade_autorizadora_id`) REFERENCES `unidades` (`id`),
  CONSTRAINT `programas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `programas_participantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `programas_participantes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `habilitado` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o participante está habilitado ou não para o programa',
  `programa_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  `documento_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `programas_participantes_programa_id_foreign` (`programa_id`),
  KEY `programas_participantes_usuario_id_foreign` (`usuario_id`),
  KEY `programas_participantes_documento_id_foreign` (`documento_id`),
  CONSTRAINT `programas_participantes_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`),
  CONSTRAINT `programas_participantes_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `programas_participantes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do projeto (Gerado pelo sistema)',
  `nome` varchar(256) NOT NULL COMMENT 'Nome do projeto',
  `descricao` varchar(256) NOT NULL COMMENT 'Descrição do projeto',
  `finalidade` varchar(256) NOT NULL COMMENT 'Descrição do projeto',
  `status` enum('PLANEJADO','INICIADO','CONCLUIDO','SUSPENSO','CANCELADO') NOT NULL COMMENT 'Status do projeto',
  `data_inicio` datetime NOT NULL COMMENT 'Inicio do projeto',
  `data_fim` datetime NOT NULL COMMENT 'Fim do projeto',
  `data_inicio_baseline` datetime DEFAULT NULL COMMENT 'Inicio do projeto (Baseline)',
  `data_fim_baseline` datetime DEFAULT NULL COMMENT 'Fim do projeto (Baseline)',
  `custo` decimal(15,2) NOT NULL COMMENT 'Custo: Será a soma dos recursos, ou a soma dos filhos caso tem_filhos e soma_custos_filhos',
  `calcula_custos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o projeto calcula custos',
  `tempo_corrido` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas)',
  `usa_baseline` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o projeto utiliza baseline',
  `usa_horas` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se usa horas nas datas',
  `calcula_intervalo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se calcula o início e término automaticamente pelos filhos',
  `agrupador` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)',
  `soma_progresso_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)',
  `aloca_proprios_recursos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui recursos próprios',
  `soma_recusos_alocados_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos recursos filhos',
  `custos_proprios` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui custos próprios',
  `soma_custos_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos custos filhos',
  `duracao` double(8,2) NOT NULL COMMENT 'Duração do projeto',
  `progresso` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentual de progresso do projeto',
  `kanban_dockers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração das Labels das swimlanes do quadro Kanban' CHECK (json_valid(`kanban_dockers`)),
  `expediente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração de expediente' CHECK (json_valid(`expediente`)),
  `usuario_id` char(36) DEFAULT NULL,
  `tipo_projeto_id` char(36) DEFAULT NULL,
  `fase_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projetos_numero_unique` (`numero`),
  KEY `projetos_usuario_id_foreign` (`usuario_id`),
  KEY `projetos_tipo_projeto_id_foreign` (`tipo_projeto_id`),
  KEY `projetos_fase_id_foreign` (`fase_id`),
  CONSTRAINT `projetos_fase_id_foreign` FOREIGN KEY (`fase_id`) REFERENCES `projetos_fases` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_tipo_projeto_id_foreign` FOREIGN KEY (`tipo_projeto_id`) REFERENCES `tipos_projetos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projetos_alocacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos_alocacoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `descricao` varchar(256) NOT NULL COMMENT 'Descrição',
  `quantidade` double(8,2) NOT NULL COMMENT 'Quantidade do recurso',
  `projeto_id` char(36) NOT NULL,
  `tarefa_id` char(36) DEFAULT NULL,
  `recurso_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projetos_alocacoes_projeto_id_foreign` (`projeto_id`),
  KEY `projetos_alocacoes_tarefa_id_foreign` (`tarefa_id`),
  KEY `projetos_alocacoes_recurso_id_foreign` (`recurso_id`),
  CONSTRAINT `projetos_alocacoes_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_alocacoes_recurso_id_foreign` FOREIGN KEY (`recurso_id`) REFERENCES `projetos_recursos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_alocacoes_tarefa_id_foreign` FOREIGN KEY (`tarefa_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projetos_alocacoes_regras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos_alocacoes_regras` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `projeto_alocacao_id` char(36) NOT NULL,
  `regra_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projetos_alocacoes_regras_projeto_alocacao_id_foreign` (`projeto_alocacao_id`),
  KEY `projetos_alocacoes_regras_regra_id_foreign` (`regra_id`),
  CONSTRAINT `projetos_alocacoes_regras_projeto_alocacao_id_foreign` FOREIGN KEY (`projeto_alocacao_id`) REFERENCES `projetos_alocacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_alocacoes_regras_regra_id_foreign` FOREIGN KEY (`regra_id`) REFERENCES `projetos_regras` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projetos_fases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos_fases` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_inicio` datetime DEFAULT NULL COMMENT 'Inicio (opcional)',
  `data_fim` datetime DEFAULT NULL COMMENT 'Fim (opcional)',
  `cor` varchar(100) NOT NULL COMMENT 'Código da cor em formato hex',
  `nome` varchar(100) NOT NULL COMMENT 'Nome',
  `descricao` varchar(256) NOT NULL COMMENT 'Descrição',
  `projeto_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projetos_fases_projeto_id_foreign` (`projeto_id`),
  CONSTRAINT `projetos_fases_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projetos_historicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos_historicos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_modificacao` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Data e hora da modificação',
  `completo` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o delta corresponde ao objeto completo',
  `delta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Delta do objeto (ou objeto completo)' CHECK (json_valid(`delta`)),
  `projeto_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projetos_historicos_projeto_id_foreign` (`projeto_id`),
  KEY `projetos_historicos_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `projetos_historicos_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_historicos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projetos_recursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos_recursos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do recurso',
  `tipo` enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') NOT NULL COMMENT 'Tipo do recurso',
  `unidade_medida` enum('UNIDADE','CAIXA','METRO','KILO','LITRO','DUZIA','MONETARIO','HORAS','DIAS','PACOTE') NOT NULL COMMENT 'Unidade do recurso',
  `valor` decimal(15,2) NOT NULL COMMENT 'Valor',
  `projeto_id` char(36) NOT NULL,
  `usuario_id` char(36) DEFAULT NULL,
  `unidade_id` char(36) DEFAULT NULL,
  `material_servico_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projetos_recursos_projeto_id_foreign` (`projeto_id`),
  KEY `projetos_recursos_usuario_id_foreign` (`usuario_id`),
  KEY `projetos_recursos_unidade_id_foreign` (`unidade_id`),
  KEY `projetos_recursos_material_servico_id_foreign` (`material_servico_id`),
  CONSTRAINT `projetos_recursos_material_servico_id_foreign` FOREIGN KEY (`material_servico_id`) REFERENCES `materiais_servicos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_recursos_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_recursos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_recursos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projetos_regras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos_regras` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome da regra',
  `tipo_recurso` enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO') NOT NULL DEFAULT 'MATERIAL' COMMENT 'Tipo do recurso que se aplica a regra',
  `finalidade` enum('OUTRA','ESCRITORIO_PROJETO','GERENTE_PROJETO','GERENTE_RISCO','GERENTE_COMUNICACAO','GERENTE_RECURSO','PATROCINADOR','GESTOR_NEGOCIAL','MEMBRO') NOT NULL COMMENT 'Finalidade/Papel',
  `perfis` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Perfis de capacidade aplicáveis a quem possuir a regra' CHECK (json_valid(`perfis`)),
  `projeto_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projetos_regras_projeto_id_foreign` (`projeto_id`),
  CONSTRAINT `projetos_regras_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projetos_tarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos_tarefas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `indice` int(11) NOT NULL COMMENT 'Indice da sequencia da tarefa',
  `path` text NOT NULL COMMENT 'Path dos nós pais',
  `nome` varchar(256) NOT NULL COMMENT 'Nome da tarefa',
  `descricao` varchar(256) NOT NULL COMMENT 'Descricao da tarefa',
  `data_inicio` datetime DEFAULT NULL COMMENT 'Inicio da tarefa',
  `data_fim` datetime DEFAULT NULL COMMENT 'Fim da tarefa',
  `data_inicio_baseline` datetime DEFAULT NULL COMMENT 'Inicio do projeto (Baseline)',
  `data_fim_baseline` datetime DEFAULT NULL COMMENT 'Fim do projeto (Baseline)',
  `duracao` double(8,2) NOT NULL COMMENT 'Duração da atividade. Se a duração for 0 e sintéfico for falso então irá se comportar apenas como um grupo',
  `progresso` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Percentual de progresso da tarefa',
  `inicio_marco` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o início é um marco',
  `termino_marco` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o término é um marco',
  `tem_filhos` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se é um registro sintético (resumo)',
  `agrupador` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)',
  `soma_progresso_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)',
  `status` enum('PLANEJADO','INICIADO','CONCLUIDO','FALHO','SUSPENSO','CANCELADO','AGUARDANDO') NOT NULL COMMENT 'Status',
  `contraido` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se esta contraído',
  `custo` decimal(15,2) NOT NULL COMMENT 'Custo: Será a soma dos recursos, ou a soma dos filhos caso tem_filhos e soma_custos_filhos',
  `calcula_intervalo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se calcula o início e término automaticamente pelos filhos (somente se tem_filhos)',
  `aloca_proprios_recursos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui recursos próprios (somente se tem_filhos)',
  `soma_recusos_alocados_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos recursos filhos (somente se tem_filhos)',
  `custos_proprios` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Se possui custos próprios (somente se tem_filhos), se não tem filhos sempre será true',
  `soma_custos_filhos` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Mostra o somatório dos custos filhos (somente se tem_filhos)',
  `etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Etiquetas' CHECK (json_valid(`etiquetas`)),
  `documento_id` char(36) DEFAULT NULL,
  `projeto_id` char(36) NOT NULL,
  `tarefa_pai_id` char(36) DEFAULT NULL,
  `tarefa_projeto_id` char(36) DEFAULT NULL,
  `atividade_id` char(36) DEFAULT NULL,
  `usuario_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projetos_tarefas_documento_id_foreign` (`documento_id`),
  KEY `projetos_tarefas_projeto_id_foreign` (`projeto_id`),
  KEY `projetos_tarefas_tarefa_pai_id_foreign` (`tarefa_pai_id`),
  KEY `projetos_tarefas_tarefa_projeto_id_foreign` (`tarefa_projeto_id`),
  KEY `projetos_tarefas_atividade_id_foreign` (`atividade_id`),
  KEY `projetos_tarefas_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `projetos_tarefas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_tarefas_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_tarefas_projeto_id_foreign` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_tarefas_tarefa_pai_id_foreign` FOREIGN KEY (`tarefa_pai_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_tarefas_tarefa_projeto_id_foreign` FOREIGN KEY (`tarefa_projeto_id`) REFERENCES `projetos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_tarefas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projetos_tarefas_dependencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos_tarefas_dependencias` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `tarefa_id` char(36) NOT NULL,
  `dependencia_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projetos_tarefas_dependencias_tarefa_id_foreign` (`tarefa_id`),
  KEY `projetos_tarefas_dependencias_dependencia_id_foreign` (`dependencia_id`),
  CONSTRAINT `projetos_tarefas_dependencias_dependencia_id_foreign` FOREIGN KEY (`dependencia_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_tarefas_dependencias_tarefa_id_foreign` FOREIGN KEY (`tarefa_id`) REFERENCES `projetos_tarefas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `questionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionarios` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `tipo` varchar(256) NOT NULL COMMENT 'Tipo interno | personalizado | anonimo',
  `nome` varchar(256) NOT NULL COMMENT 'Nome do questionário',
  `codigo` varchar(256) NOT NULL COMMENT 'Código do questionario',
  `versao` int(11) NOT NULL DEFAULT 1 COMMENT 'Versao do questionario',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `questionarios_perguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionarios_perguntas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sequencia` tinyint(4) NOT NULL COMMENT 'Sequequencia dos numeros da pergunta no questionario',
  `pergunta` text NOT NULL COMMENT 'A pergunta do questionario',
  `tipo` enum('EMOJI','SELECT','MULTI_SELECT','TEXT','TEXT_AREA','TIMER','DATE_TIME','NUMBER','RATE','SWITCH','RADIO','RADIO_INLINE','RADIO_BUTTON','CHECK','SEARCH') DEFAULT NULL,
  `criado_versao` int(11) NOT NULL COMMENT 'Versão do Questionario que foi criada a pergunta',
  `deletado_versao` int(11) DEFAULT NULL COMMENT 'Versão do Questionario que foi deletada a pergunta',
  `respostas_possiveis` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Respostas possiveis para a pergunta(DC2Type:json)' CHECK (json_valid(`respostas_possiveis`)),
  `questionario_id` char(36) NOT NULL,
  `origem_id` char(36) DEFAULT NULL,
  `codigo` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questionarios_perguntas_questionario_id_foreign` (`questionario_id`),
  KEY `questionarios_perguntas_origem_id_foreign` (`origem_id`),
  CONSTRAINT `questionarios_perguntas_origem_id_foreign` FOREIGN KEY (`origem_id`) REFERENCES `questionarios_perguntas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `questionarios_perguntas_questionario_id_foreign` FOREIGN KEY (`questionario_id`) REFERENCES `questionarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `questionarios_perguntas_respostas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionarios_perguntas_respostas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `resposta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Resposta do questionário' CHECK (json_valid(`resposta`)),
  `questionario_pergunta_id` char(36) NOT NULL,
  `questionario_preenchimento_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_questionario_perg_id` (`questionario_pergunta_id`),
  KEY `fk_questionario_preenchimento_id` (`questionario_preenchimento_id`),
  CONSTRAINT `fk_questionario_perg_id` FOREIGN KEY (`questionario_pergunta_id`) REFERENCES `questionarios_perguntas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_questionario_preenchimento_id` FOREIGN KEY (`questionario_preenchimento_id`) REFERENCES `questionarios_preenchimentos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `questionarios_preenchimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionarios_preenchimentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `data_preenchimento` datetime NOT NULL COMMENT 'Data e hora das respostas',
  `editavel` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Possibilidade de editar as respostas',
  `versao` int(11) NOT NULL COMMENT 'Versao do questionario',
  `questionario_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  `resumo_resposta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Resumo da resposta do questionario' CHECK (json_valid(`resumo_resposta`)),
  PRIMARY KEY (`id`),
  KEY `questionarios_respostas_questionario_id_foreign` (`questionario_id`),
  KEY `questionarios_respostas_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `questionarios_respostas_questionario_id_foreign` FOREIGN KEY (`questionario_id`) REFERENCES `questionarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `questionarios_respostas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `reacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reacoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `tipo` enum('like','love','care','haha','wow','sad','angry') NOT NULL DEFAULT 'like' COMMENT 'Tipo do react',
  `usuario_id` char(36) NOT NULL,
  `atividade_id` char(36) DEFAULT NULL,
  `plano_trabalho_entrega_id` char(36) DEFAULT NULL,
  `plano_entrega_entrega_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reacoes_usuario_id_foreign` (`usuario_id`),
  KEY `reacoes_atividade_id_foreign` (`atividade_id`),
  KEY `reacoes_plano_trabalho_entrega_id_foreign` (`plano_trabalho_entrega_id`),
  KEY `reacoes_plano_entrega_entrega_id_foreign` (`plano_entrega_entrega_id`),
  CONSTRAINT `reacoes_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reacoes_plano_entrega_entrega_id_foreign` FOREIGN KEY (`plano_entrega_entrega_id`) REFERENCES `planos_entregas_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reacoes_plano_trabalho_entrega_id_foreign` FOREIGN KEY (`plano_trabalho_entrega_id`) REFERENCES `planos_trabalhos_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `reacoes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequences` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `template_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número do template',
  `plano_entrega_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numérica do plano de entregas',
  `plano_trabalho_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numérica do plano de trabalho',
  `projeto_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequência numerica do Projeto',
  `documento_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número do documento',
  `atividade_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número da atividade',
  `notificacao_numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Sequencia numeria do número da notificação',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `siape_blacklist_servidores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `siape_blacklist_servidores` (
  `id` char(36) NOT NULL,
  `cpf` varchar(50) NOT NULL,
  `response` longtext NOT NULL,
  `inativado` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `matricula` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `siape_blacklist_unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `siape_blacklist_unidades` (
  `id` char(36) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `response` longtext NOT NULL,
  `inativado` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Indica se a unidade foi inativada (0 = não, 1 = sim)',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `siape_consultaDadosFuncionais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `siape_consultaDadosFuncionais` (
  `id` char(36) NOT NULL,
  `response` longtext NOT NULL,
  `cpf` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `processado` tinyint(1) NOT NULL DEFAULT 0,
  `data_modificacao` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `siape_consultaDadosPessoais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `siape_consultaDadosPessoais` (
  `id` char(36) NOT NULL,
  `response` longtext NOT NULL,
  `cpf` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `processado` tinyint(1) NOT NULL DEFAULT 0,
  `data_modificacao` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `siape_dadosUORG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `siape_dadosUORG` (
  `id` char(36) NOT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `response` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `processado` tinyint(1) NOT NULL DEFAULT 0,
  `data_modificacao` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `siape_listaServidores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `siape_listaServidores` (
  `id` char(36) NOT NULL,
  `response` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `processado` tinyint(1) NOT NULL DEFAULT 0,
  `data_modificacao` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `siape_listaUORG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `siape_listaUORG` (
  `id` char(36) NOT NULL,
  `response` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `processado` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `solucao_produtos_servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `solucao_produtos_servicos` (
  `id` char(36) NOT NULL,
  `nome` varchar(250) NOT NULL,
  `sigla` varchar(20) NOT NULL,
  `descricao` text NOT NULL,
  `url` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `identificador` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `solucao_produtos_servicos_identificador_unique` (`identificador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `solucoes_unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `solucoes_unidades` (
  `id` char(36) NOT NULL,
  `id_unidade` char(36) NOT NULL,
  `id_solucao` char(36) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_unidade_solucao` (`id_unidade`,`id_solucao`),
  KEY `solucoes_unidades_id_solucao_foreign` (`id_solucao`),
  CONSTRAINT `solucoes_unidades_id_solucao_foreign` FOREIGN KEY (`id_solucao`) REFERENCES `solucao_produtos_servicos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `solucoes_unidades_id_unidade_foreign` FOREIGN KEY (`id_unidade`) REFERENCES `unidades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `status_justificativas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_justificativas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `codigo` enum('ATIVO','AVALIADO','CANCELADO','CONCLUIDO','HOMOLOGANDO','AGUARDANDO_ASSINATURA','INCLUIDO','INICIADO','EM_RECURSO','SUSPENSO') NOT NULL COMMENT 'Status do artefato (plano de entregas, plano de trabalho, consolidação ou atividade)',
  `justificativa` text NOT NULL COMMENT 'Justificativa da mudança para este status',
  `plano_entrega_id` char(36) DEFAULT NULL,
  `plano_trabalho_id` char(36) DEFAULT NULL,
  `plano_trabalho_consolidacao_id` char(36) DEFAULT NULL,
  `atividade_id` char(36) DEFAULT NULL,
  `usuario_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `status_justificativas_plano_entrega_id_foreign` (`plano_entrega_id`),
  KEY `status_justificativas_plano_trabalho_id_foreign` (`plano_trabalho_id`),
  KEY `status_justificativas_plano_trabalho_consolidacao_id_foreign` (`plano_trabalho_consolidacao_id`),
  KEY `status_justificativas_atividade_id_foreign` (`atividade_id`),
  KEY `status_justificativas_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `status_justificativas_atividade_id_foreign` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `status_justificativas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `status_justificativas_plano_trabalho_consolidacao_id_foreign` FOREIGN KEY (`plano_trabalho_consolidacao_id`) REFERENCES `planos_trabalhos_consolidacoes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `status_justificativas_plano_trabalho_id_foreign` FOREIGN KEY (`plano_trabalho_id`) REFERENCES `planos_trabalhos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `status_justificativas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL COMMENT 'Código opcional para o template',
  `numero` int(11) NOT NULL DEFAULT 0 COMMENT 'Número do template (Gerado pelo sistema)',
  `especie` enum('SEI','TCR','OUTRO','NOTIFICACAO','RELATORIO') DEFAULT NULL,
  `titulo` varchar(256) NOT NULL COMMENT 'Título do template',
  `conteudo` longtext DEFAULT NULL COMMENT 'Comentário predefinida para a tarefa',
  `dataset` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Dados da parametrização' CHECK (json_valid(`dataset`)),
  `entidade_id` char(36) DEFAULT NULL,
  `unidade_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `templates_numero_unique` (`numero`),
  KEY `templates_entidade_id_foreign` (`entidade_id`),
  KEY `templates_unidade_id_foreign` (`unidade_id`),
  CONSTRAINT `templates_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `templates_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_atividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_atividades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do tipo de atividade',
  `esforco` double(8,2) NOT NULL COMMENT 'Tempo previsto para a execução da atividade (Horas decimais)',
  `dias_planejado` double(8,2) NOT NULL COMMENT 'Sugestão de dias para conclusão da atividade independente de quando iniciado (influência no prazo da atividade)',
  `etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nome das etiquetas para a atividade' CHECK (json_valid(`etiquetas`)),
  `checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nome dos checklist para a atividade' CHECK (json_valid(`checklist`)),
  `comentario` text DEFAULT NULL COMMENT 'Comentário predefinido para a atividade',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_avaliacoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do tipo de avaliação',
  `tipo` set('QUALITATIVO','QUANTITATIVO') NOT NULL COMMENT 'Se a nota será um número ou um conceito',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_avaliacoes_justificativas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_avaliacoes_justificativas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `tipo_avaliacao_nota_id` char(36) NOT NULL,
  `tipo_justificativa_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tipos_avaliacoes_justificativas_tipo_avaliacao_nota_id_foreign` (`tipo_avaliacao_nota_id`),
  KEY `tipos_avaliacoes_justificativas_tipo_justificativa_id_foreign` (`tipo_justificativa_id`),
  CONSTRAINT `tipos_avaliacoes_justificativas_tipo_avaliacao_nota_id_foreign` FOREIGN KEY (`tipo_avaliacao_nota_id`) REFERENCES `tipos_avaliacoes_notas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `tipos_avaliacoes_justificativas_tipo_justificativa_id_foreign` FOREIGN KEY (`tipo_justificativa_id`) REFERENCES `tipos_justificativas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_avaliacoes_notas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_avaliacoes_notas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sequencia` int(11) NOT NULL COMMENT 'Sequencia da nota (serve para ordenar as notas de forma crescente)',
  `nota` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nota' CHECK (json_valid(`nota`)),
  `descricao` varchar(255) NOT NULL COMMENT 'Descrição da nota',
  `pergunta` varchar(255) NOT NULL COMMENT 'Pergunta motivacional',
  `aprova` tinyint(4) NOT NULL COMMENT 'Se essa nota aprova, quando aplicável',
  `justifica` tinyint(4) NOT NULL COMMENT 'Se é obrigatório justificar essa nota',
  `icone` varchar(100) NOT NULL COMMENT 'Classe do icone',
  `cor` varchar(100) NOT NULL COMMENT 'Código da cor em hex',
  `codigo` varchar(50) DEFAULT NULL COMMENT 'Código de integração',
  `tipo_avaliacao_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tipos_avaliacoes_notas_tipo_avaliacao_id_foreign` (`tipo_avaliacao_id`),
  CONSTRAINT `tipos_avaliacoes_notas_tipo_avaliacao_id_foreign` FOREIGN KEY (`tipo_avaliacao_id`) REFERENCES `tipos_avaliacoes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_capacidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_capacidades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `codigo` varchar(256) NOT NULL COMMENT 'Código da rotina no sistema (acesso)',
  `descricao` text NOT NULL COMMENT 'Descrição da capacidade (acesso)',
  `grupo_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipos_capacidades_codigo_unique` (`codigo`),
  KEY `tipos_capacidades_grupo_id_foreign` (`grupo_id`),
  CONSTRAINT `tipos_capacidades_grupo_id_foreign` FOREIGN KEY (`grupo_id`) REFERENCES `tipos_capacidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_clientes` (
  `id` char(36) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_cursos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do tipo do curso',
  `ativo` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Nome ativo ou inativo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_documentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `codigo` varchar(50) DEFAULT NULL COMMENT 'Código do tipo de documento',
  `nome` varchar(256) NOT NULL COMMENT 'Tipo do documento da requisição ou da entrega',
  `entregavel` tinyint(4) NOT NULL COMMENT 'Se é um documento de entrega',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_justificativas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_justificativas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Tipo da justificativa da avaliação',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_modalidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_modalidades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome da modalidade',
  `exige_pedagio` tinyint(1) NOT NULL DEFAULT 0,
  `plano_trabalho_calcula_horas` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se o plano de trabalho calcula horas (considerando a carga horária e os dias)',
  `atividade_tempo_despendido` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se calcula tempo despendido na atividade',
  `atividade_esforco` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se utiliza esforço (tempo para execução) na atividade',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_modalidades_siape`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_modalidades_siape` (
  `id` char(36) NOT NULL,
  `tipo_modalidade_id` char(36) DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipos_modalidades_siape_tipo_modalidade_id_foreign` (`tipo_modalidade_id`),
  KEY `tipos_modalidades_siape_nome_index` (`nome`),
  CONSTRAINT `tipos_modalidades_siape_tipo_modalidade_id_foreign` FOREIGN KEY (`tipo_modalidade_id`) REFERENCES `tipos_modalidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_motivos_afastamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_motivos_afastamentos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `codigo` varchar(50) DEFAULT NULL COMMENT 'Código SIAPE do afastamento.',
  `sigla` varchar(256) NOT NULL COMMENT 'Sigla do afastamento.',
  `nome` varchar(256) NOT NULL COMMENT 'Descrição sucinta do afastamento.',
  `calculo` enum('ACRESCIMO','DECRESCIMO') NOT NULL DEFAULT 'DECRESCIMO' COMMENT 'Usado para calcular as horas do agente público',
  `data_inicio` datetime NOT NULL COMMENT 'Data inicial de ativação do afastamento nos sistemas estruturantes.',
  `data_fim` datetime DEFAULT NULL COMMENT 'Data que especifica encerramento do uso do afastamento nos sistemas estruturantes.',
  `situacao` varchar(100) NOT NULL COMMENT 'Confirma situação no SIAPE registrada no Sigepe Afastamentos.',
  `icone` varchar(100) NOT NULL COMMENT 'Class do ícone relacionado ao afastamento',
  `cor` varchar(100) NOT NULL COMMENT 'Código da cor em formato hex',
  `horas` tinyint(4) NOT NULL COMMENT 'Se o afastamento é medido em horas',
  `integracao` tinyint(4) NOT NULL COMMENT 'Se o tipo de motivo de afastamento é integrado a outro sistema',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_processos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_processos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` text NOT NULL COMMENT 'Nome do Tipo de Processo',
  `codigo` varchar(50) DEFAULT NULL COMMENT 'Código do tipo de Processo',
  `etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nome das etiquetas predefinidas' CHECK (json_valid(`etiquetas`)),
  `checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Nome dos checklist predefinidas' CHECK (json_valid(`checklist`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_projetos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Descrição do tipo da projeto',
  `icone` varchar(100) NOT NULL COMMENT 'Classe do icone',
  `cor` varchar(100) NOT NULL COMMENT 'Código da cor em hex',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tipos_tarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_tarefas` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(256) NOT NULL COMMENT 'Nome do tipo de tarefa',
  `tempo_estimado` double(8,2) NOT NULL COMMENT 'Tempo estimado para a execução do tipo de tarefa (Horas decimais)',
  `documental` tinyint(4) NOT NULL COMMENT 'Se o tipo de tarefa requer obrigatoriamente um documento',
  `comentario` text DEFAULT NULL COMMENT 'Comentário predefinida para o tipo de tarefa',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `codigo` varchar(12) DEFAULT NULL COMMENT 'Código da unidade',
  `sigla` varchar(100) NOT NULL COMMENT 'Sigla da unidade',
  `nome` varchar(256) NOT NULL COMMENT 'Nome da unidade',
  `instituidora` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se a unidade é instituidora (Programas)',
  `path` text DEFAULT NULL COMMENT 'Path dos nós pais separados por /, ou NULL caso sejam nós raiz',
  `texto_complementar_plano` longtext DEFAULT NULL COMMENT 'Campo de mensagem adicional do plano de trabalho',
  `atividades_arquivamento_automatico` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Se arquiva automaticamente após conclusão',
  `atividades_avaliacao_automatico` tinyint(4) NOT NULL DEFAULT 0,
  `planos_prazo_comparecimento` int(11) NOT NULL DEFAULT 10,
  `planos_tipo_prazo_comparecimento` varchar(255) NOT NULL DEFAULT 'DIAS',
  `data_inativacao` datetime DEFAULT NULL COMMENT 'Data em que a unidade foi inativada, se for o caso',
  `data_inicio_inativacao` datetime DEFAULT NULL COMMENT 'Data de início do processo de inativação da unidade',
  `distribuicao_forma_contagem_prazos` set('HORAS_CORRIDAS','DIAS_CORRIDOS','HORAS_UTEIS','DIAS_UTEIS') NOT NULL DEFAULT 'DIAS_UTEIS' COMMENT 'Forma da contagem de prazo',
  `entrega_forma_contagem_prazos` set('HORAS_CORRIDAS','HORAS_UTEIS') NOT NULL DEFAULT 'HORAS_UTEIS' COMMENT 'Forma da contagem de horas para entrega',
  `autoedicao_subordinadas` tinyint(4) NOT NULL DEFAULT 1,
  `etiquetas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração das etiquetas que serão utilizadas nas atividades (contém nome, icone e cor)' CHECK (json_valid(`etiquetas`)),
  `checklist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Nome dos checklist' CHECK (json_valid(`checklist`)),
  `notificacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)' CHECK (json_valid(`notificacoes`)),
  `expediente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configuração de expediente da unidade' CHECK (json_valid(`expediente`)),
  `cidade_id` char(36) DEFAULT NULL,
  `unidade_pai_id` char(36) DEFAULT NULL,
  `entidade_id` char(36) NOT NULL,
  `informal` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Sinaliza se unidade é informal',
  `data_modificacao` datetime DEFAULT NULL COMMENT 'Data de modificação informada pelo SIAPE.',
  `data_ativacao_temporaria` datetime DEFAULT NULL,
  `justificativa_ativacao_temporaria` text DEFAULT NULL,
  `executora` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'indica se a unidade pode cadastrar planos',
  PRIMARY KEY (`id`),
  KEY `unidades_cidade_id_foreign` (`cidade_id`),
  KEY `unidades_unidade_pai_id_foreign` (`unidade_pai_id`),
  KEY `unidades_entidade_id_foreign` (`entidade_id`),
  KEY `unidades_codigo_index` (`codigo`),
  FULLTEXT KEY `unidades_path_fulltext` (`path`),
  CONSTRAINT `unidades_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `unidades_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `unidades_unidade_pai_id_foreign` FOREIGN KEY (`unidade_pai_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `unidades_integrantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades_integrantes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `unidade_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_unidade_usuario` (`usuario_id`,`unidade_id`),
  KEY `unidades_integrantes_unidade_id_foreign` (`unidade_id`),
  CONSTRAINT `unidades_integrantes_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `unidades_integrantes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `unidades_integrantes_atribuicoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades_integrantes_atribuicoes` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `atribuicao` set('AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA','COLABORADOR','GESTOR','GESTOR_SUBSTITUTO','GESTOR_DELEGADO','LOTADO','CURADOR') DEFAULT NULL COMMENT 'Vínculo que o servidor tem com a unidade',
  `unidade_integrante_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `unidades_integrantes_atribuicoes_unidade_integrante_id_foreign` (`unidade_integrante_id`),
  CONSTRAINT `unidades_integrantes_atribuicoes_unidade_integrante_id_foreign` FOREIGN KEY (`unidade_integrante_id`) REFERENCES `unidades_integrantes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `unidades_integrantes_atribuicoes_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades_integrantes_atribuicoes_old` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `atribuicao` set('AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA','COLABORADOR','GESTOR','GESTOR_SUBSTITUTO','GESTOR_DELEGADO','LOTADO','CURADOR') DEFAULT NULL COMMENT 'Vínculo que o servidor tem com a unidade',
  `unidade_integrante_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `unidades_integrantes_atribuicoes_unidade_integrante_id_foreign` (`unidade_integrante_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `unidades_integrantes_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades_integrantes_old` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `unidade_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `unidades_integrantes_unidade_id_foreign` (`unidade_id`),
  KEY `unidades_integrantes_usuario_id_foreign` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL COMMENT 'E-mail do usuário',
  `nome` varchar(256) NOT NULL COMMENT 'Nome do usuário',
  `password` varchar(255) DEFAULT NULL COMMENT 'Senha do usuário',
  `cpf` varchar(14) NOT NULL COMMENT 'CPF do usuário',
  `matricula` varchar(50) DEFAULT NULL COMMENT 'Matrícula funcional do usuário',
  `apelido` varchar(255) DEFAULT NULL COMMENT 'Apelido/Nome de guerra/Nome social',
  `telefone` varchar(50) DEFAULT NULL COMMENT 'Telefone do usuário',
  `data_nascimento` datetime DEFAULT NULL,
  `id_google` varchar(50) DEFAULT NULL COMMENT 'Id associado com o usuário do login do google',
  `url_foto` varchar(255) DEFAULT NULL COMMENT 'URL da foto do usuário (temporário)',
  `texto_complementar_plano` longtext DEFAULT NULL COMMENT 'Campo de mensagem adicional do plano de trabalho',
  `foto_perfil` text DEFAULT NULL COMMENT 'Foto padrão do perfil',
  `foto_google` text DEFAULT NULL COMMENT 'Foto do G-Suit (Google)',
  `foto_microsoft` text DEFAULT NULL COMMENT 'Foto do Azure (Microsoft)',
  `foto_firebase` text DEFAULT NULL COMMENT 'Foto do Firebase (Google, Facebook, Instagram, Twiter, etc...)',
  `id_sei` text DEFAULT NULL COMMENT 'Id do usuário no SUPER',
  `uf` char(2) DEFAULT NULL COMMENT 'UF do usuário',
  `email_verified_at` timestamp NULL DEFAULT NULL COMMENT 'Data de verificação do e-mail do usuário',
  `sexo` enum('MASCULINO','FEMININO') DEFAULT NULL COMMENT 'Sexo do usuário',
  `situacao_funcional` enum('ATIVO_PERMANENTE','APOSENTADO','CEDIDO/REQUISITADO','NOMEADO_CARGO_COMISSIONADO','SEM_VINCULO','TABELISTA(ESP/EMERG)','NATUREZA_ESPECIAL','ATIVO_EM_OUTRO_ORGAO','REDISTRIBUIDO','ATIVO_TRANSITORIO','EXCEDENTE_A_LOTACAO','EM_DISPONIBILIDADE','REQUISITADO_DE_OUTROS_ORGAOS','INSTITUIDOR_PENSAO','REQUISITADO_MILITAR_FORCAS_ARMADAS','APOSENTADO_TCU733/94','EXERCICIO_DESCENTRALIZADO_CARREIRA','EXERCICIO_PROVISORIO','CELETISTA','ATIVO_PERMANENTE_LEI_8878/94','ANISTIADO_ADCT_CF','CELETISTA/EMPREGADO','CLT_ANS_DECISAO_JUDICIAL','CLT_ANS_JUDICIAL_CEDIDO','CLT_APOS_COMPLEMENTO','CLT_APOS_DECISAO_JUDICIAL','INST_PS_DECISAO_JUDICIAL','EMPREGO_PUBLICO','REFORMA_CBM/PM','RESERVA_CBM/PM','REQUISITADO_MILITAR_GDF','ANISTIADO_PUBLICO_L10559','ANISTIADO_PRIVADO_L10559','ATIVO_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO','COLAB_PCCTAE_E_MAGISTERIO','COLABORADOR_ICT','CLT_ANS_DEC_6657/08','EXERCICIO_7_ART93_8112','CEDIDO_SUS/LEI_8270','INST_ANIST_PUBLICO','INST_ANIST_PRIVADO','CELETISTA_DECISAO_JUDICIAL','CONTRATO_TEMPORARIO_CLT','EMPREGO_PCC/EX-TERRITORIO','EXC_INDISCIPLINA','CONTRATO_PROFESSOR_SUBSTITUTO','ESTAGIARIO','ESTAGIARIO_SIGEPE','RESIDENCIA_E_PMM','APOSENTADO_TEMPORARIRIO','CEDIDO_DF_ESTADO_MUNICIPIO','EXERC_DESCEN_CDT','EXERC_LEI_13681/18','PENSIONISTA','BENEFICIARIO_PENSAO','QE/MRE_CEDIDO','QUADRO_ESPEC_QE/MRE','DESCONHECIDO') NOT NULL DEFAULT 'ATIVO_PERMANENTE' COMMENT 'Vínculo do usuário com a administração.',
  `situacao_siape` enum('ATIVO','INATIVO','ATIVO_TEMPORARIO') NOT NULL DEFAULT 'ATIVO' COMMENT 'Situação no SIAPE (Ativo, Inativo ou Ativo Temporário) - NOT NULL, DEFAULT: ATIVO',
  `data_ativacao_temporaria` date DEFAULT NULL COMMENT 'Data de ativação temporária no Petrvs',
  `justicativa_ativacao_temporaria` text DEFAULT NULL COMMENT 'Justificativa da ativação temporária no Petrvs',
  `usuario_externo` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Indica se o usuário é externo',
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações do usuário' CHECK (json_valid(`config`)),
  `notificacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)' CHECK (json_valid(`notificacoes`)),
  `metadados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Metadados do usuário' CHECK (json_valid(`metadados`)),
  `perfil_id` char(36) DEFAULT NULL,
  `data_modificacao` datetime DEFAULT NULL COMMENT 'Data de modificação informada pelo SIAPE.',
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `data_envio_api_pgd` timestamp NULL DEFAULT NULL,
  `data_inicial_pedagio` date DEFAULT NULL,
  `data_final_pedagio` date DEFAULT NULL,
  `tipo_pedagio` tinyint(3) unsigned DEFAULT NULL,
  `nome_jornada` varchar(100) DEFAULT NULL COMMENT 'Codigo da Jornada',
  `cod_jornada` int(11) DEFAULT NULL COMMENT 'Nome da Jornada',
  `tipo_modalidade_id` char(36) NOT NULL COMMENT 'Modalidade do Usuário no PGD(DC2Type:guid)',
  `participa_pgd` enum('sim','não') NOT NULL COMMENT 'Indica se o usuário participa do PGD.',
  `ident_unica` varchar(50) DEFAULT NULL COMMENT 'Identificador único do usuário',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_email_unique` (`email`),
  UNIQUE KEY `usuarios_matricula_unique` (`matricula`),
  KEY `usuarios_perfil_id_foreign` (`perfil_id`),
  KEY `usuarios_tipo_modalidade_id_foreign` (`tipo_modalidade_id`),
  CONSTRAINT `usuarios_perfil_id_foreign` FOREIGN KEY (`perfil_id`) REFERENCES `perfis` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_tipo_modalidade_id_foreign` FOREIGN KEY (`tipo_modalidade_id`) REFERENCES `tipos_modalidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `view_api_pgd`;
/*!50001 DROP VIEW IF EXISTS `view_api_pgd`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `view_api_pgd` AS SELECT
 1 AS `id`,
  1 AS `tipo`,
  1 AS `json_audit`,
  1 AS `fonte` */;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `view_relatorio_plano_entrega`;
/*!50001 DROP VIEW IF EXISTS `view_relatorio_plano_entrega`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `view_relatorio_plano_entrega` AS SELECT
 1 AS `id`,
  1 AS `numero`,
  1 AS `status`,
  1 AS `entregaNome`,
  1 AS `dataInicio`,
  1 AS `dataFim`,
  1 AS `unidade_id`,
  1 AS `unidadeHierarquia`,
  1 AS `unidadeSigla`,
  1 AS `duracao`,
  1 AS `data_avaliacao`,
  1 AS `nota`,
  1 AS `situacao_avaliacao`,
  1 AS `situacao_conclusao`,
  1 AS `data_homologacao`,
  1 AS `data_conclusao` */;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `view_relatorio_plano_trabalho`;
/*!50001 DROP VIEW IF EXISTS `view_relatorio_plano_trabalho`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `view_relatorio_plano_trabalho` AS SELECT
 1 AS `id`,
  1 AS `plano_trabalho_id`,
  1 AS `numero`,
  1 AS `status`,
  1 AS `dataInicio`,
  1 AS `dataFim`,
  1 AS `unidade_id`,
  1 AS `participanteNome`,
  1 AS `unidadeHierarquia`,
  1 AS `unidadeSigla`,
  1 AS `tipo_modalidade_id`,
  1 AS `tipoModalidadeNome`,
  1 AS `duracao`,
  1 AS `chd`,
  1 AS `qtdePeriodosAvaliativos` */;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `view_relatorio_plano_trabalho_detalhado`;
/*!50001 DROP VIEW IF EXISTS `view_relatorio_plano_trabalho_detalhado`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `view_relatorio_plano_trabalho_detalhado` AS SELECT
 1 AS `id`,
  1 AS `plano_trabalho_id`,
  1 AS `numero`,
  1 AS `status`,
  1 AS `dataInicio`,
  1 AS `dataFim`,
  1 AS `unidade_id`,
  1 AS `participanteNome`,
  1 AS `unidadeHierarquia`,
  1 AS `unidadeSigla`,
  1 AS `tipo_modalidade_id`,
  1 AS `tipoModalidadeNome`,
  1 AS `duracao`,
  1 AS `chd`,
  1 AS `data_inicio_avaliativo`,
  1 AS `data_fim_avaliativo`,
  1 AS `data_conclusao`,
  1 AS `data_avaliacao`,
  1 AS `nota`,
  1 AS `data_recurso`,
  1 AS `data_reavaliacao`,
  1 AS `nota_reavaliacao`,
  1 AS `situacao_execucao`,
  1 AS `situacao_avaliacao` */;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `view_relatorio_unidades`;
/*!50001 DROP VIEW IF EXISTS `view_relatorio_unidades`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `view_relatorio_unidades` AS SELECT
 1 AS `id`,
  1 AS `unidade_id`,
  1 AS `unidadeHierarquia`,
  1 AS `nome`,
  1 AS `sigla`,
  1 AS `codigo`,
  1 AS `tipo`,
  1 AS `chefiaId`,
  1 AS `chefiaNome`,
  1 AS `totalVinculados`,
  1 AS `totalSubstitutos`,
  1 AS `totalDelegados` */;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `vw_pgd_planos_entrega`;
/*!50001 DROP VIEW IF EXISTS `vw_pgd_planos_entrega`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `vw_pgd_planos_entrega` AS SELECT
 1 AS `id`,
  1 AS `tipo`,
  1 AS `json_audit`,
  1 AS `fonte` */;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `vw_pgd_planos_trabalho`;
/*!50001 DROP VIEW IF EXISTS `vw_pgd_planos_trabalho`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `vw_pgd_planos_trabalho` AS SELECT
 1 AS `id`,
  1 AS `tipo`,
  1 AS `json_audit`,
  1 AS `fonte` */;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `vw_pgd_usuarios`;
/*!50001 DROP VIEW IF EXISTS `vw_pgd_usuarios`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `vw_pgd_usuarios` AS SELECT
 1 AS `id`,
  1 AS `tipo`,
  1 AS `json_audit`,
  1 AS `fonte` */;
SET character_set_client = @saved_cs_client;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_obter_unidade_hierarquia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `fn_obter_unidade_hierarquia`(p_unidade_id CHAR(36)) RETURNS text CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci
    DETERMINISTIC
BEGIN
        DECLARE V_PATH TEXT;

        WITH RECURSIVE ancestrais AS (
            SELECT
                id,
                sigla,
                unidade_pai_id,
                1 AS nivel
            FROM unidades
            WHERE id = p_unidade_id

            UNION ALL

            SELECT
                u.id,
                u.sigla,
                u.unidade_pai_id,
                a.nivel + 1
            FROM unidades u
            JOIN ancestrais a ON u.id = a.unidade_pai_id
            and u.unidade_pai_id IS NOT NULL
        )
        SELECT GROUP_CONCAT(sigla ORDER BY nivel DESC SEPARATOR '/') INTO V_PATH
        FROM ancestrais;

        RETURN V_PATH;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_view_api_pgd_by_interval` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_view_api_pgd_by_interval`(IN days_interval INT)
BEGIN
                SELECT
                    usuarios.id AS id,
                    "participante" AS tipo,
                    NULL AS json_audit
                FROM usuarios
                INNER JOIN programas_participantes ON usuarios.id = programas_participantes.usuario_id
                WHERE data_envio_api_pgd IS NULL
                UNION ALL
                SELECT
                    id AS id,
                    "trabalho" AS tipo,
                    NULL AS json_audit
                FROM planos_trabalhos
                WHERE data_envio_api_pgd IS NULL
                UNION ALL
                SELECT
                    id AS id,
                    "entrega" AS tipo,
                    NULL AS json_audit
                FROM planos_entregas
                WHERE data_envio_api_pgd IS NULL
                UNION ALL
                SELECT
                    t1.id AS id,
                    t1.tipo AS tipo,
                    t1.json_audit AS json_audit
                FROM
                    (
                        SELECT d.usuario_id AS id,
                        "participante" AS tipo,
                        JSON_ARRAYAGG(a.id) AS json_audit
                        FROM audits a
                        JOIN programas_participantes d ON a.auditable_id = d.id
                        WHERE a.auditable_type LIKE "%ProgramaParticipante"
                        AND DATE(a.created_at) >= CURDATE() - INTERVAL days_interval DAY
                        AND (a.tags = "ERRO" OR a.tags IS NULL)
                        GROUP BY d.usuario_id
                    ) t1
                UNION ALL
                SELECT
                    t2.id AS id,
                    t2.tipo AS tipo,
                    t2.json_audit AS json_audit
                FROM
                    (
                        SELECT d.usuario_id AS id,
                        "participante" AS tipo,
                        JSON_ARRAYAGG(a.id) AS json_audit
                        FROM audits a
                        JOIN documentos_assinaturas d ON a.auditable_id = d.id
                        WHERE a.auditable_type LIKE "%DocumentoAssinatura"
                        AND DATE(a.created_at) >= CURDATE() - INTERVAL days_interval DAY
                        AND (a.tags = "ERRO" OR a.tags IS NULL)
                        GROUP BY d.usuario_id
                    ) t2
                UNION ALL
                SELECT
                    t3.id AS id,
                    t3.tipo AS tipo,
                    t3.json_audit AS json_audit
                FROM
                    (
                        SELECT d.id AS id,
                        "participante" AS tipo,
                        JSON_ARRAYAGG(a.id) AS json_audit
                        FROM audits a
                        JOIN usuarios d ON a.auditable_id = d.id
                        WHERE a.auditable_type LIKE "%Usuario"
                        AND DATE(a.created_at) >= CURDATE() - INTERVAL days_interval DAY
                        AND (a.tags = "ERRO" OR a.tags IS NULL)
                        GROUP BY d.id
                    ) t3
                UNION ALL
                SELECT
                    t4.id AS id,
                    t4.tipo AS tipo,
                    t4.json_audit AS json_audit
                FROM
                    (
                        SELECT d.id AS id,
                        "trabalho" AS tipo,
                        JSON_ARRAYAGG(a.id) AS json_audit
                        FROM audits a
                        JOIN planos_trabalhos d ON a.auditable_id = d.id
                        WHERE a.auditable_type LIKE "%PlanoTrabalho"
                        AND DATE(a.created_at) >= CURDATE() - INTERVAL days_interval DAY
                        AND (a.tags = "ERRO" OR a.tags IS NULL)
                        GROUP BY d.id
                    ) t4
                UNION ALL
                SELECT
                    t5.id AS id,
                    t5.tipo AS tipo,
                    t5.json_audit AS json_audit
                FROM
                    (
                        SELECT d.plano_trabalho_id AS id,
                        "trabalho" AS tipo,
                        JSON_ARRAYAGG(a.id) AS json_audit
                        FROM audits a
                        JOIN planos_trabalhos_consolidacoes d ON a.auditable_id = d.id
                        WHERE a.auditable_type LIKE "%PlanoTrabalhoConsolidacao"
                        AND DATE(a.created_at) >= CURDATE() - INTERVAL days_interval DAY
                        AND (a.tags = "ERRO" OR a.tags IS NULL)
                        GROUP BY d.plano_trabalho_id
                    ) t5
                UNION ALL
                SELECT
                    t6.id AS id,
                    t6.tipo AS tipo,
                    t6.json_audit AS json_audit
                FROM
                    (
                        SELECT d.plano_trabalho_id AS id,
                        "trabalho" AS tipo,
                        JSON_ARRAYAGG(a.id) AS json_audit
                        FROM audits a
                        JOIN planos_trabalhos_entregas d ON a.auditable_id = d.id
                        WHERE a.auditable_type LIKE "%PlanoTrabalhoEntrega"
                        AND DATE(a.created_at) >= CURDATE() - INTERVAL days_interval DAY
                        AND (a.tags = "ERRO" OR a.tags IS NULL)
                        GROUP BY d.plano_trabalho_id
                    ) t6
                UNION ALL
                SELECT
                    t7.id AS id,
                    t7.tipo AS tipo,
                    t7.json_audit AS json_audit
                FROM
                    (
                        SELECT d.id AS id,
                        "entrega" AS tipo,
                        JSON_ARRAYAGG(a.id) AS json_audit
                        FROM audits a
                        JOIN planos_entregas d ON a.auditable_id = d.id
                        WHERE a.auditable_type LIKE "%PlanoEntrega"
                        AND DATE(a.created_at) >= CURDATE() - INTERVAL days_interval DAY
                        AND (a.tags = "ERRO" OR a.tags IS NULL)
                        GROUP BY d.id
                    ) t7
                UNION ALL
                SELECT
                    t8.id AS id,
                    t8.tipo AS tipo,
                    t8.json_audit AS json_audit
                FROM
                    (
                        SELECT d.plano_entrega_id AS id,
                        "entrega" AS tipo,
                        JSON_ARRAYAGG(a.id) AS json_audit
                        FROM audits a
                        JOIN planos_entregas_entregas d ON a.auditable_id = d.id
                        WHERE a.auditable_type LIKE "%PlanoEntregaEntrega"
                        AND DATE(a.created_at) >= CURDATE() - INTERVAL days_interval DAY
                        AND (a.tags = "ERRO" OR a.tags IS NULL)
                        GROUP BY d.plano_entrega_id
                    ) t8;
            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_atividade_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sequence_atividade_numero`()
BEGIN
                UPDATE sequences SET atividade_numero = atividade_numero + 1;
                SELECT atividade_numero AS number FROM sequences;
            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_documento_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sequence_documento_numero`()
BEGIN
                UPDATE sequences SET documento_numero = documento_numero + 1;
                SELECT documento_numero AS number FROM sequences;
            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_notificacao_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sequence_notificacao_numero`()
BEGIN
                UPDATE sequences SET notificacao_numero = notificacao_numero + 1;
                SELECT notificacao_numero AS number FROM sequences;
            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_plano_entrega_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sequence_plano_entrega_numero`()
BEGIN
                UPDATE sequences SET plano_entrega_numero = plano_entrega_numero + 1;
                SELECT plano_entrega_numero AS number FROM sequences;
            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_plano_trabalho_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sequence_plano_trabalho_numero`()
BEGIN
                UPDATE sequences SET plano_trabalho_numero = plano_trabalho_numero + 1;
                SELECT plano_trabalho_numero AS number FROM sequences;
            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_projeto_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sequence_projeto_numero`()
BEGIN
                UPDATE sequences SET projeto_numero = GREATEST(IFNULL((SELECT MAX(numero) FROM projetos), 1), projeto_numero + 1);
                SELECT projeto_numero AS number FROM sequences;
            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_template_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sequence_template_numero`()
BEGIN
                UPDATE sequences SET template_numero = template_numero + 1;
                SELECT template_numero AS number FROM sequences;
            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50001 DROP VIEW IF EXISTS `view_api_pgd`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_api_pgd` AS select distinct `usuarios`.`id` AS `id`,'participante' AS `tipo`,NULL AS `json_audit`,1 AS `fonte` from (`usuarios` join `programas_participantes` on(`usuarios`.`id` = `programas_participantes`.`usuario_id`)) where `usuarios`.`data_envio_api_pgd` is null and `usuarios`.`deleted_at` is null and `programas_participantes`.`deleted_at` is null and exists(select `pt`.`id` from `planos_trabalhos` `pt` where `pt`.`usuario_id` = `usuarios`.`id` and `pt`.`deleted_at` is null limit 1) and exists(select 1 from `documentos_assinaturas` `da` where `da`.`usuario_id` = `usuarios`.`id` and `da`.`deleted_at` is null limit 1) union all select distinct `planos_trabalhos`.`id` AS `id`,'trabalho' collate utf8mb4_unicode_ci AS `tipo`,NULL AS `json_audit`,2 AS `fonte` from `planos_trabalhos` where `planos_trabalhos`.`deleted_at` is null and `planos_trabalhos`.`data_envio_api_pgd` is null and `planos_trabalhos`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') union all select distinct `planos_entregas`.`id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,NULL AS `json_audit`,3 AS `fonte` from `planos_entregas` where `planos_entregas`.`deleted_at` is null and `planos_entregas`.`data_envio_api_pgd` is null and `planos_entregas`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') union all select distinct `t1`.`id` AS `id`,`t1`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t1`.`json_audit` AS `json_audit`,4 AS `fonte` from (select `d`.`usuario_id` AS `id`,'participante' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from (`audits` `a` join `programas_participantes` `d` on(`a`.`auditable_id` = `d`.`id`)) where `a`.`auditable_type` like '%ProgramaParticipante' and (`a`.`tags` like '%ERRO%' or `a`.`tags` is null) and `d`.`deleted_at` is null and exists(select `pt`.`id` from `planos_trabalhos` `pt` where `pt`.`usuario_id` = `d`.`usuario_id` and `pt`.`deleted_at` is null limit 1) and exists(select 1 from `documentos_assinaturas` `da` where `da`.`usuario_id` = `d`.`usuario_id` and `da`.`deleted_at` is null limit 1) group by `d`.`usuario_id`) `t1` union all select distinct `t2`.`id` AS `id`,`t2`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t2`.`json_audit` AS `json_audit`,5 AS `fonte` from (select `d`.`usuario_id` AS `id`,'participante' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from (`audits` `a` join `documentos_assinaturas` `d` on(`a`.`auditable_id` = `d`.`id`)) where `a`.`auditable_type` like '%DocumentoAssinatura' and (`a`.`tags` like '%ERRO%' or `a`.`tags` is null) and `d`.`deleted_at` is null and exists(select `pt`.`id` from `planos_trabalhos` `pt` where `pt`.`usuario_id` = `d`.`usuario_id` and `pt`.`deleted_at` is null limit 1) and exists(select 1 from `documentos_assinaturas` `da` where `da`.`usuario_id` = `d`.`usuario_id` and `da`.`deleted_at` is null limit 1) group by `d`.`usuario_id`) `t2` union all select distinct `t3`.`id` AS `id`,`t3`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t3`.`json_audit` AS `json_audit`,6 AS `fonte` from (select `d`.`id` AS `id`,'participante' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from (`audits` `a` join `usuarios` `d` on(`a`.`auditable_id` = `d`.`id`)) where `a`.`auditable_type` like '%Usuario' and (`a`.`tags` like '%ERRO%' or `a`.`tags` is null) and `d`.`deleted_at` is null and exists(select `pt`.`id` from `planos_trabalhos` `pt` where `pt`.`usuario_id` = `d`.`id` and `pt`.`deleted_at` is null limit 1) and exists(select 1 from `documentos_assinaturas` `da` where `da`.`usuario_id` = `d`.`id` and `da`.`deleted_at` is null limit 1) and exists(select 1 from `programas_participantes` `part` where `part`.`usuario_id` = `d`.`id` and `part`.`deleted_at` is null limit 1) group by `d`.`id`) `t3` union all select distinct `t4`.`id` AS `id`,`t4`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t4`.`json_audit` AS `json_audit`,7 AS `fonte` from (select `d`.`id` AS `id`,'trabalho' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from (`audits` `a` join `planos_trabalhos` `d` on(`a`.`auditable_id` = `d`.`id`)) where `a`.`auditable_type` like '%PlanoTrabalho' and (`a`.`tags` like '%ERRO%' or `a`.`tags` is null) and `d`.`deleted_at` is null and `d`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') group by `d`.`id`) `t4` union all select distinct `t5`.`id` AS `id`,`t5`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t5`.`json_audit` AS `json_audit`,8 AS `fonte` from (select `d`.`plano_trabalho_id` AS `id`,'trabalho' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `planos_trabalhos_consolidacoes` `d` on(`a`.`auditable_id` = `d`.`id`)) join `planos_trabalhos` `pt` on(`pt`.`id` = `d`.`plano_trabalho_id`)) where `a`.`auditable_type` like '%PlanoTrabalhoConsolidacao' and (`a`.`tags` like '%ERRO%' or `a`.`tags` is null) and `d`.`deleted_at` is null and `pt`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `pt`.`deleted_at` is null group by `d`.`plano_trabalho_id`) `t5` union all select distinct `t6`.`id` AS `id`,`t6`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t6`.`json_audit` AS `json_audit`,9 AS `fonte` from (select `d`.`plano_trabalho_id` AS `id`,'trabalho' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `planos_trabalhos_entregas` `d` on(`a`.`auditable_id` = `d`.`id`)) join `planos_trabalhos` `pt` on(`pt`.`id` = `d`.`plano_trabalho_id`)) where `a`.`auditable_type` like '%PlanoTrabalhoEntrega' and (`a`.`tags` like '%ERRO%' or `a`.`tags` is null) and `d`.`deleted_at` is null and `pt`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `pt`.`deleted_at` is null group by `d`.`plano_trabalho_id`) `t6` union all select distinct `t7`.`id` AS `id`,`t7`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t7`.`json_audit` AS `json_audit`,10 AS `fonte` from (select `d`.`id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `planos_entregas` `d` on(`a`.`auditable_id` = `d`.`id`)) join `programas` `p` on(`p`.`id` = `d`.`programa_id`)) where `a`.`auditable_type` like '%PlanoEntrega' and (`a`.`tags` like '%ERRO%' or `a`.`tags` is null) and `d`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `d`.`deleted_at` is null and `p`.`deleted_at` is null group by `d`.`id`) `t7` union all select distinct `t8`.`id` AS `id`,`t8`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t8`.`json_audit` AS `json_audit`,11 AS `fonte` from (select `d`.`plano_entrega_id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from (((`audits` `a` join `planos_entregas_entregas` `d` on(`a`.`auditable_id` = `d`.`id`)) join `planos_entregas` `pe` on(`pe`.`id` = `d`.`plano_entrega_id`)) join `programas` `p` on(`p`.`id` = `pe`.`programa_id`)) where `a`.`auditable_type` like '%PlanoEntregaEntrega' and (`a`.`tags` like '%ERRO%' or `a`.`tags` is null) and `d`.`deleted_at` is null and `pe`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `p`.`deleted_at` is null group by `d`.`plano_entrega_id`) `t8` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!50001 DROP VIEW IF EXISTS `view_relatorio_plano_entrega`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_relatorio_plano_entrega` AS with status_homolog_pe as (select `sj`.`plano_entrega_id` AS `plano_entrega_id`,`sj`.`created_at` AS `created_at`,row_number() over ( partition by `sj`.`plano_entrega_id` order by `sj`.`created_at` desc) AS `rn` from (`status_justificativas` `sj` join `planos_entregas` `pe` on(`pe`.`id` = `sj`.`plano_entrega_id`)) where `sj`.`codigo` = 'ATIVO' and `sj`.`deleted_at` is null and `pe`.`status` not in ('INCLUIDO','CANCELADO','HOMOLOGANDO')), status_concluido_pe as (select `sj`.`plano_entrega_id` AS `plano_entrega_id`,`sj`.`created_at` AS `created_at`,row_number() over ( partition by `sj`.`plano_entrega_id` order by `sj`.`created_at` desc) AS `rn` from (`status_justificativas` `sj` join `planos_entregas` `pe` on(`pe`.`id` = `sj`.`plano_entrega_id`)) where `sj`.`codigo` = 'CONCLUIDO' and `sj`.`deleted_at` is null and `pe`.`status` not in ('INCLUIDO','CANCELADO','SUSPENSO','ATIVO'))select `pe`.`id` collate utf8mb4_unicode_ci AS `id`,`pe`.`numero` AS `numero`,`pe`.`status` collate utf8mb4_unicode_ci AS `status`,`pe`.`nome` collate utf8mb4_unicode_ci AS `entregaNome`,cast(`pe`.`data_inicio` as date) AS `dataInicio`,cast(`pe`.`data_fim` as date) AS `dataFim`,`pe`.`unidade_id` collate utf8mb4_unicode_ci AS `unidade_id`,`fn_obter_unidade_hierarquia`(`pe`.`unidade_id`) collate utf8mb4_unicode_ci AS `unidadeHierarquia`,`uni`.`sigla` collate utf8mb4_unicode_ci AS `unidadeSigla`,to_days(`pe`.`data_fim`) - to_days(`pe`.`data_inicio`) + 1 AS `duracao`,cast(`a`.`data_avaliacao` as date) AS `data_avaliacao`,json_unquote(`a`.`nota`) AS `nota`,case when `pe`.`status` = 'CANCELADO' or `pe`.`status` = 'SUSPENSO' then NULL else case when `a`.`data_avaliacao` is null then case when `scpe`.`created_at` is null or curdate() <= cast(`scpe`.`created_at` as date) + interval 30 day then 'Aguardando' else 'Atrasado' end else case when cast(`a`.`data_avaliacao` as date) <= cast(`scpe`.`created_at` as date) + interval 30 day then 'Registrado no período' else 'Registrado com atraso' end end end collate utf8mb4_unicode_ci AS `situacao_avaliacao`,case when `pe`.`status` = 'CANCELADO' or `pe`.`status` = 'SUSPENSO' then NULL else case when `scpe`.`created_at` is null then 'Pendente' else 'Registrado' end end collate utf8mb4_unicode_ci AS `situacao_conclusao`,cast(`spe`.`created_at` as date) AS `data_homologacao`,cast(`scpe`.`created_at` as date) AS `data_conclusao` from ((((`planos_entregas` `pe` join `unidades` `uni` on(`uni`.`id` = `pe`.`unidade_id`)) left join `avaliacoes` `a` on(`a`.`id` = `pe`.`avaliacao_id` and `a`.`deleted_at` is null)) left join `status_homolog_pe` `spe` on(`spe`.`plano_entrega_id` = `pe`.`id` and `spe`.`rn` = 1)) left join `status_concluido_pe` `scpe` on(`scpe`.`plano_entrega_id` = `pe`.`id` and `scpe`.`rn` = 1)) where `pe`.`deleted_at` is null */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!50001 DROP VIEW IF EXISTS `view_relatorio_plano_trabalho`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_relatorio_plano_trabalho` AS select `pt`.`id` collate utf8mb4_unicode_ci AS `id`,`pt`.`id` collate utf8mb4_unicode_ci AS `plano_trabalho_id`,`pt`.`numero` collate utf8mb4_unicode_ci AS `numero`,`pt`.`status` collate utf8mb4_unicode_ci AS `status`,cast(`pt`.`data_inicio` as date) AS `dataInicio`,cast(`pt`.`data_fim` as date) AS `dataFim`,`pt`.`unidade_id` collate utf8mb4_unicode_ci AS `unidade_id`,`usu`.`nome` collate utf8mb4_unicode_ci AS `participanteNome`,`fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) collate utf8mb4_unicode_ci AS `unidadeHierarquia`,`uni`.`sigla` collate utf8mb4_unicode_ci AS `unidadeSigla`,`pt`.`tipo_modalidade_id` collate utf8mb4_unicode_ci AS `tipo_modalidade_id`,`tm`.`nome` collate utf8mb4_unicode_ci AS `tipoModalidadeNome`,to_days(`pt`.`data_fim`) - to_days(`pt`.`data_inicio`) + 1 AS `duracao`,coalesce((select sum(coalesce(`pte`.`forca_trabalho`,0) * 1) from `planos_trabalhos_entregas` `pte` where `pte`.`plano_trabalho_id` = `pt`.`id` and `pte`.`deleted_at` is null),0) AS `chd`,(select count(0) from `planos_trabalhos_consolidacoes` `ptc` where `ptc`.`plano_trabalho_id` = `pt`.`id` and `ptc`.`deleted_at` is null) AS `qtdePeriodosAvaliativos` from (((`planos_trabalhos` `pt` join `usuarios` `usu` on(`usu`.`id` = `pt`.`usuario_id`)) join `unidades` `uni` on(`uni`.`id` = `pt`.`unidade_id`)) join `tipos_modalidades` `tm` on(`tm`.`id` = `pt`.`tipo_modalidade_id`)) where `pt`.`deleted_at` is null */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!50001 DROP VIEW IF EXISTS `view_relatorio_plano_trabalho_detalhado`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_relatorio_plano_trabalho_detalhado` AS select `ptc`.`id` collate utf8mb4_unicode_ci AS `id`,`pt`.`id` collate utf8mb4_unicode_ci AS `plano_trabalho_id`,`pt`.`numero` collate utf8mb4_unicode_ci AS `numero`,`pt`.`status` collate utf8mb4_unicode_ci AS `status`,cast(`pt`.`data_inicio` as date) AS `dataInicio`,cast(`pt`.`data_fim` as date) AS `dataFim`,`pt`.`unidade_id` collate utf8mb4_unicode_ci AS `unidade_id`,`usu`.`nome` collate utf8mb4_unicode_ci AS `participanteNome`,`fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) collate utf8mb4_unicode_ci AS `unidadeHierarquia`,`uni`.`sigla` collate utf8mb4_unicode_ci AS `unidadeSigla`,`pt`.`tipo_modalidade_id` collate utf8mb4_unicode_ci AS `tipo_modalidade_id`,`tm`.`nome` collate utf8mb4_unicode_ci AS `tipoModalidadeNome`,to_days(`pt`.`data_fim`) - to_days(`pt`.`data_inicio`) + 1 AS `duracao`,ifnull((select sum(ifnull(`pte`.`forca_trabalho`,0) * 1) from `planos_trabalhos_entregas` `pte` where `pte`.`plano_trabalho_id` = `pt`.`id` and `pte`.`deleted_at` is null),0) AS `chd`,cast(`ptc`.`data_inicio` as date) AS `data_inicio_avaliativo`,cast(`ptc`.`data_fim` as date) AS `data_fim_avaliativo`,cast(`ptc`.`data_conclusao` as date) AS `data_conclusao`,cast(`aval_antiga`.`data_avaliacao` as date) AS `data_avaliacao`,json_unquote(`aval_antiga`.`nota`) AS `nota`,`aval_antiga`.`data_recurso` AS `data_recurso`,case when `a`.`id` = `aval_antiga`.`id` then NULL else cast(`a`.`data_avaliacao` as date) end AS `data_reavaliacao`,case when `a`.`id` = `aval_antiga`.`id` then NULL else json_unquote(`a`.`nota`) end AS `nota_reavaliacao`,case when `pt`.`status` = 'CANCELADO' then NULL else case when `ptc`.`data_conclusao` is null then case when curdate() <= cast(`ptc`.`data_fim` as date) + interval 10 day then 'Aguardando' else 'Atrasado' end else case when cast(`ptc`.`data_conclusao` as date) <= cast(`ptc`.`data_fim` as date) + interval 10 day then 'Registrado no período' else 'Registrado com atraso' end end end collate utf8mb4_unicode_ci AS `situacao_execucao`,case when `pt`.`status` = 'CANCELADO' then NULL else case when `a`.`data_avaliacao` is null then case when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day then 'Aguardando' else 'Atrasado' end else case when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day then 'Registrado no período' else 'Registrado com atraso' end end end collate utf8mb4_unicode_ci AS `situacao_avaliacao` from ((((((`planos_trabalhos` `pt` join `usuarios` `usu` on(`usu`.`id` = `pt`.`usuario_id`)) join `unidades` `uni` on(`uni`.`id` = `pt`.`unidade_id`)) join `tipos_modalidades` `tm` on(`tm`.`id` = `pt`.`tipo_modalidade_id`)) left join `planos_trabalhos_consolidacoes` `ptc` on(`ptc`.`plano_trabalho_id` = `pt`.`id` and `ptc`.`deleted_at` is null)) left join `avaliacoes` `a` on(`a`.`id` = `ptc`.`avaliacao_id` and `a`.`deleted_at` is null)) left join (select `a1`.`id` AS `id`,`a1`.`data_avaliacao` AS `data_avaliacao`,`a1`.`nota` AS `nota`,`a1`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,`a1`.`data_recurso` AS `data_recurso`,`a1`.`rn` AS `rn` from (select `avaliacoes`.`id` AS `id`,`avaliacoes`.`data_avaliacao` AS `data_avaliacao`,`avaliacoes`.`nota` AS `nota`,`avaliacoes`.`data_recurso` AS `data_recurso`,`avaliacoes`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,row_number() over ( partition by `avaliacoes`.`plano_trabalho_consolidacao_id` order by `avaliacoes`.`data_avaliacao`) AS `rn` from `avaliacoes` where `avaliacoes`.`deleted_at` is null group by `avaliacoes`.`id`,`avaliacoes`.`data_avaliacao`,`avaliacoes`.`nota`,`avaliacoes`.`data_recurso`,`avaliacoes`.`plano_trabalho_consolidacao_id`) `a1` where `a1`.`rn` = 1) `aval_antiga` on(`aval_antiga`.`plano_trabalho_consolidacao_id` = `ptc`.`id`)) where `pt`.`deleted_at` is null */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!50001 DROP VIEW IF EXISTS `view_relatorio_unidades`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_relatorio_unidades` AS with chefias as (select `ui`.`unidade_id` AS `unidade_id`,`ui`.`usuario_id` AS `usuario_id` from (`unidades_integrantes` `ui` join `unidades_integrantes_atribuicoes` `uia` on(`uia`.`unidade_integrante_id` = `ui`.`id` and `uia`.`deleted_at` is null and `uia`.`atribuicao` collate utf8mb4_unicode_ci = 'GESTOR')) where `ui`.`deleted_at` is null), contadores as (select `ui`.`unidade_id` AS `unidade_id`,count(distinct `ui`.`usuario_id`) AS `totalAgentes`,sum(case when `uia`.`atribuicao` collate utf8mb4_unicode_ci = 'GESTOR_SUBSTITUTO' then 1 else 0 end) AS `totalSubstitutos`,sum(case when `uia`.`atribuicao` collate utf8mb4_unicode_ci = 'GESTOR_DELEGADO' then 1 else 0 end) AS `totalDelegados`,sum(case when `uia`.`atribuicao` collate utf8mb4_unicode_ci = 'COLABORADOR' then 1 else 0 end) AS `totalVinculados` from (`unidades_integrantes` `ui` left join `unidades_integrantes_atribuicoes` `uia` on(`uia`.`unidade_integrante_id` = `ui`.`id` and `uia`.`deleted_at` is null)) where `ui`.`deleted_at` is null and `uia`.`atribuicao` is not null group by `ui`.`unidade_id`)select distinct `uni`.`id` collate utf8mb4_unicode_ci AS `id`,`uni`.`id` collate utf8mb4_unicode_ci AS `unidade_id`,`fn_obter_unidade_hierarquia`(`uni`.`id`) collate utf8mb4_unicode_ci AS `unidadeHierarquia`,`uni`.`nome` collate utf8mb4_unicode_ci AS `nome`,`uni`.`sigla` collate utf8mb4_unicode_ci AS `sigla`,`uni`.`codigo` collate utf8mb4_unicode_ci AS `codigo`,case when `uni`.`instituidora` = 1 then 'Instituidora' collate utf8mb4_unicode_ci else 'Executora' collate utf8mb4_unicode_ci end AS `tipo`,`chefia`.`id` collate utf8mb4_unicode_ci AS `chefiaId`,`chefia`.`nome` collate utf8mb4_unicode_ci AS `chefiaNome`,`contadores`.`totalVinculados` AS `totalVinculados`,`contadores`.`totalSubstitutos` AS `totalSubstitutos`,`contadores`.`totalDelegados` AS `totalDelegados` from (((`unidades` `uni` left join `chefias` on(`chefias`.`unidade_id` = `uni`.`id`)) left join `usuarios` `chefia` on(`chefia`.`id` = `chefias`.`usuario_id`)) left join `contadores` on(`contadores`.`unidade_id` = `uni`.`id`)) where `uni`.`deleted_at` is null order by 2 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!50001 DROP VIEW IF EXISTS `vw_pgd_planos_entrega`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_pgd_planos_entrega` AS select distinct `planos_entregas`.`id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,NULL AS `json_audit`,1 AS `fonte` from `planos_entregas` where `planos_entregas`.`deleted_at` is null and `planos_entregas`.`data_envio_api_pgd` is null and `planos_entregas`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') union all select distinct `t7`.`id` AS `id`,`t7`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t7`.`json_audit` AS `json_audit`,2 AS `fonte` from (select `d`.`id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `planos_entregas` `d` on(`a`.`auditable_id` = `d`.`id`)) join `programas` `p` on(`p`.`id` = `d`.`programa_id`)) where `a`.`auditable_type` = 'App\\Models\\PlanoEntrega' and `a`.`enviado` = 0 and `d`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `d`.`deleted_at` is null and `p`.`deleted_at` is null and `d`.`data_envio_api_pgd` is not null group by `d`.`id`) `t7` union all select distinct `t8`.`id` AS `id`,`t8`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t8`.`json_audit` AS `json_audit`,3 AS `fonte` from (select `d`.`plano_entrega_id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from (((`audits` `a` join `planos_entregas_entregas` `d` on(`a`.`auditable_id` = `d`.`id`)) join `planos_entregas` `pe` on(`pe`.`id` = `d`.`plano_entrega_id`)) join `programas` `p` on(`p`.`id` = `pe`.`programa_id`)) where `a`.`auditable_type` = 'App\\Models\\PlanoEntregaEntrega' and `a`.`enviado` = 0 and `d`.`deleted_at` is null and `pe`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `pe`.`data_envio_api_pgd` is not null and `p`.`deleted_at` is null group by `d`.`plano_entrega_id`) `t8` union all select distinct `t9`.`id` AS `id`,`t9`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t9`.`json_audit` AS `json_audit`,4 AS `fonte` from (select `pe`.`id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `avaliacoes` `ava` on(`ava`.`id` = `a`.`auditable_id`)) join `planos_entregas` `pe` on(`pe`.`id` = `ava`.`plano_entrega_id`)) where `a`.`auditable_type` = 'App\\Models\\Avaliacao' and `a`.`enviado` = 0 and `pe`.`deleted_at` is null and `pe`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `pe`.`data_envio_api_pgd` is not null group by `pe`.`id`) `t9` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!50001 DROP VIEW IF EXISTS `vw_pgd_planos_trabalho`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_pgd_planos_trabalho` AS select distinct `planos_trabalhos`.`id` AS `id`,'trabalho' collate utf8mb4_unicode_ci AS `tipo`,NULL AS `json_audit`,2 AS `fonte` from `planos_trabalhos` where `planos_trabalhos`.`deleted_at` is null and `planos_trabalhos`.`data_envio_api_pgd` is null and `planos_trabalhos`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') union all select distinct `t4`.`id` AS `id`,`t4`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t4`.`json_audit` AS `json_audit`,7 AS `fonte` from (select `d`.`id` AS `id`,'trabalho' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from (`audits` `a` join `planos_trabalhos` `d` on(`a`.`auditable_id` = `d`.`id`)) where `a`.`auditable_type` = 'App\\Models\\PlanoTrabalho' and `a`.`enviado` = 0 and `d`.`deleted_at` is null and `d`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `d`.`data_envio_api_pgd` is not null group by `d`.`id`) `t4` union all select distinct `t5`.`id` AS `id`,`t5`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t5`.`json_audit` AS `json_audit`,8 AS `fonte` from (select `d`.`plano_trabalho_id` AS `id`,'trabalho' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `planos_trabalhos_consolidacoes` `d` on(`a`.`auditable_id` = `d`.`id`)) join `planos_trabalhos` `pt` on(`pt`.`id` = `d`.`plano_trabalho_id`)) where `a`.`auditable_type` = 'App\\Models\\PlanoTrabalhoConsolidacao' and `a`.`enviado` = 0 and `d`.`deleted_at` is null and `pt`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `pt`.`deleted_at` is null and `pt`.`data_envio_api_pgd` is not null group by `d`.`plano_trabalho_id`) `t5` union all select distinct `t6`.`id` AS `id`,`t6`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t6`.`json_audit` AS `json_audit`,9 AS `fonte` from (select `d`.`plano_trabalho_id` AS `id`,'trabalho' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `planos_trabalhos_entregas` `d` on(`a`.`auditable_id` = `d`.`id`)) join `planos_trabalhos` `pt` on(`pt`.`id` = `d`.`plano_trabalho_id`)) where `a`.`auditable_type` = 'App\\Models\\PlanoTrabalhoEntrega' and `a`.`enviado` = 0 and `d`.`deleted_at` is null and `pt`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `pt`.`deleted_at` is null and `pt`.`data_envio_api_pgd` is not null group by `d`.`plano_trabalho_id`) `t6` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!50001 DROP VIEW IF EXISTS `vw_pgd_usuarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_pgd_usuarios` AS select distinct `usuarios`.`id` AS `id`,'participante' collate utf8mb4_unicode_ci AS `tipo`,NULL AS `json_audit`,1 AS `fonte` from (`usuarios` join `programas_participantes` on(`usuarios`.`id` = `programas_participantes`.`usuario_id`)) where `usuarios`.`data_envio_api_pgd` is null and `usuarios`.`deleted_at` is null and `programas_participantes`.`deleted_at` is null and exists(select `pt`.`id` from `planos_trabalhos` `pt` where `pt`.`usuario_id` = `usuarios`.`id` and `pt`.`deleted_at` is null limit 1) and exists(select 1 from `documentos_assinaturas` `da` where `da`.`usuario_id` = `usuarios`.`id` and `da`.`deleted_at` is null limit 1) union all select distinct `t1`.`id` AS `id`,`t1`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t1`.`json_audit` AS `json_audit`,4 AS `fonte` from (select `d`.`usuario_id` AS `id`,'participante' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `programas_participantes` `d` on(`a`.`auditable_id` = `d`.`id`)) join `usuarios` `usu` on(`usu`.`id` = `d`.`usuario_id`)) where `a`.`auditable_type` = 'App\\Models\\ProgramaParticipante' and `a`.`enviado` = 0 and `d`.`deleted_at` is null and `usu`.`deleted_at` is null and `usu`.`data_envio_api_pgd` is not null and exists(select `pt`.`id` from `planos_trabalhos` `pt` where `pt`.`usuario_id` = `d`.`usuario_id` and `pt`.`deleted_at` is null limit 1) and exists(select 1 from `documentos_assinaturas` `da` where `da`.`usuario_id` = `d`.`usuario_id` and `da`.`deleted_at` is null limit 1) group by `d`.`usuario_id`) `t1` union all select distinct `t2`.`id` AS `id`,`t2`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t2`.`json_audit` AS `json_audit`,5 AS `fonte` from (select `d`.`usuario_id` AS `id`,'participante' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `documentos_assinaturas` `d` on(`a`.`auditable_id` = `d`.`id`)) join `usuarios` `usu` on(`usu`.`id` = `d`.`usuario_id`)) where `a`.`auditable_type` = 'App\\Models\\DocumentoAssinatura' and `a`.`enviado` = 0 and `d`.`deleted_at` is null and `usu`.`deleted_at` is null and `usu`.`data_envio_api_pgd` is not null and exists(select `pt`.`id` from `planos_trabalhos` `pt` where `pt`.`usuario_id` = `d`.`usuario_id` and `pt`.`deleted_at` is null limit 1) and exists(select 1 from `documentos_assinaturas` `da` where `da`.`usuario_id` = `d`.`usuario_id` and `da`.`deleted_at` is null limit 1) group by `d`.`usuario_id`) `t2` union all select distinct `t3`.`id` AS `id`,`t3`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t3`.`json_audit` AS `json_audit`,6 AS `fonte` from (select `d`.`id` AS `id`,'participante' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from (`audits` `a` join `usuarios` `d` on(`a`.`auditable_id` = `d`.`id`)) where `a`.`auditable_type` = 'App\\Models\\Usuario' and `a`.`enviado` = 0 and `d`.`deleted_at` is null and `d`.`deleted_at` is null and `d`.`data_envio_api_pgd` is not null and exists(select `pt`.`id` from `planos_trabalhos` `pt` where `pt`.`usuario_id` = `d`.`id` and `pt`.`deleted_at` is null limit 1) and exists(select 1 from `documentos_assinaturas` `da` where `da`.`usuario_id` = `d`.`id` and `da`.`deleted_at` is null limit 1) and exists(select 1 from `programas_participantes` `part` where `part`.`usuario_id` = `d`.`id` and `part`.`deleted_at` is null limit 1) group by `d`.`id`) `t3` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

/*M!999999\- enable the sandbox mode */ 
set autocommit=0;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1,'2014_10_12_100000_create_password_resets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2,'2019_08_19_000000_create_failed_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3,'2019_12_14_000001_create_personal_access_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4,'2021_08_17_135643_create_tipos_projetos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (5,'2021_08_17_152405_create_tipos_processos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (6,'2021_08_17_181024_create_eixos_tematicos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (7,'2021_08_18_001302_create_sequences_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (8,'2021_08_19_200000_create_cidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (9,'2021_08_19_200530_create_tipos_motivos_afastamentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (10,'2021_08_19_210860_create_tipos_documentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (11,'2021_08_19_210905_create_tipos_avaliacoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (12,'2021_08_19_210906_create_tipos_avaliacoes_notas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (13,'2021_08_19_210930_create_tipos_justificativas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (14,'2021_08_19_211000_create_perfis_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (15,'2021_08_19_211010_create_tipos_capacidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (16,'2021_08_19_211020_create_capacidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (17,'2021_08_19_212000_create_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (18,'2021_08_19_212003_create_tipos_modalidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (19,'2021_08_19_212004_create_entidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (20,'2021_08_19_212005_create_unidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (21,'2021_08_19_212006_create_entregas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (22,'2021_08_19_212006_create_tipos_atividades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (23,'2021_08_19_212010_create_templates_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (24,'2021_08_19_212069_create_programas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (25,'2021_08_19_212146_create_tipos_avaliacoes_justificativas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (26,'2021_08_20_174945_create_cadeias_valores',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (27,'2021_08_20_174946_create_planejamentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (28,'2021_08_20_174947_create_planos_entregas',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (29,'2021_08_20_174948_create_planos_trabalhos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (30,'2021_08_20_174949_create_afastamentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (31,'2021_08_20_174949_create_planos_trabalhos_consolidacoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (32,'2021_08_20_174955_create_favoritos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (33,'2021_08_21_094615_create_integracoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (34,'2021_10_18_235402_create_integracao_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (35,'2021_10_18_235857_create_integracao_unidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (36,'2021_11_23_023403_create_feriados_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (37,'2022_03_24_102405_create_tipos_tarefas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (38,'2022_05_28_093211_create_notificacoes_whatsapp_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (39,'2022_08_31_130000_create_projetos_fases_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (40,'2022_08_31_136847_create_projetos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (41,'2022_08_31_140416_create_materiais_servicos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (42,'2022_08_31_142345_create_projetos_recursos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (43,'2022_08_31_144724_create_projetos_regras_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (44,'2022_11_20_100816_function_getuuid',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (45,'2022_11_28_181819_create_planejamentos_objetivos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (46,'2022_11_28_181822_create_cadeias_valores_processos',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (47,'2022_11_28_182434_create_planos_entregas_entregas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (48,'2022_11_28_183243_create_planos_entregas_entregas_objetivos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (49,'2022_11_28_183244_create_planos_entregas_entregas_processos',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (50,'2022_11_28_183245_create_avaliacoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (51,'2022_11_28_183245_create_planos_trabalhos_entregas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (52,'2022_11_28_183246_create_avaliacoes_entregas_checklist_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (53,'2022_11_28_190100_create_documentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (54,'2022_11_28_190200_create_atividades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (55,'2022_11_28_190400_create_atividades_pausas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (56,'2022_11_28_190600_create_atividades_tarefas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (57,'2022_11_28_190700_create_documentos_assinaturas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (58,'2022_11_28_191054_create_planos_trabalhos_consolidacoes_ocorrencias_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (59,'2022_11_28_200000_create_projetos_tarefas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (60,'2022_11_28_200100_create_projetos_alocacoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (61,'2022_11_28_200200_create_projetos_tarefas_dependencias',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (62,'2022_11_28_200300_create_projetos_alocacoes_regras_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (63,'2022_11_28_200400_create_projetos_historicos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (64,'2023_03_20_205001_create_programas_participantes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (65,'2023_04_16_093458_create_unidades_integrantes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (66,'2023_04_16_094000_create_unidades_integrantes_atribuicoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (67,'2023_04_20_190000_create_comentarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (68,'2023_04_20_190500_create_anexos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (69,'2023_04_21_080000_create_areas_atividades_externas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (70,'2023_04_21_080500_create_tipos_cursos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (71,'2023_04_21_081000_create_curriculums_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (72,'2023_04_21_081500_create_centros_treinamentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (73,'2023_04_21_082000_create_grupos_especializados_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (74,'2023_04_21_082500_create_cargos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (75,'2023_04_21_083000_create_curriculums_profissionais_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (76,'2023_04_21_083500_create_funcoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (77,'2023_04_21_103425_create_areas_conhecimentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (78,'2023_04_21_103426_create_areas_tematicas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (79,'2023_04_21_103450_create_cursos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (80,'2023_04_21_103455_create_capacidades_tecnicas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (81,'2023_04_21_103500_create_materias_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (82,'2023_04_21_103505_create_historicos_atividades_internas_curriculum_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (83,'2023_04_21_103507_create_historicos_funcoes_curriculum_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (84,'2023_04_21_103508_create_atividades_externas_curriculum_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (85,'2023_04_21_103509_create_historicos_lotacoes_curriculum_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (86,'2023_04_21_103601_create_historicos_cursos_internos_curriculum_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (87,'2023_04_21_103602_create_historicos_cursos_externos_curriculum_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (88,'2023_04_21_103603_create_historicos_docencias_internas_curriculum_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (89,'2023_04_21_103604_create_historicos_docencias_externas_curriculum_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (90,'2023_04_21_103922_create_curriculums_graduacoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (91,'2023_04_21_103942_create_questionarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (92,'2023_04_21_103943_create_respostas_questionarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (93,'2023_04_21_103944_delete_respostas_questionarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (94,'2023_04_21_103945_create_questionarios_perguntas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (95,'2023_04_21_103946_create_questionarios_respostas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (96,'2023_04_21_103947_create_questionarios_respostas_perguntas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (97,'2023_04_21_103950_alter_questionarios_table_add_versao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (98,'2023_05_31_231236_create_notificacoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (99,'2023_06_01_203758_create_notificacoes_destinatarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (100,'2023_08_02_152357_create_status_justificativas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (101,'2023_08_12_102142_alter_sequences_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (102,'2023_09_10_152357_create_planos_trabalhos_consolidacoes_atividades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (103,'2023_09_10_152360_create_planos_trabalhos_consolidacoes_afastamentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (104,'2023_09_20_132400_create_comparecimentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (105,'2023_10_07_031032_version_2_0_3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (106,'2023_10_09_092130_alter_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (107,'2023_10_11_092130_alter_planos_entregas_entregas_table_add_checklist_etiquetas',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (108,'2023_10_17_092130_alter_entregas_table_add_checklist_etiquetas',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (109,'2023_10_17_092130_alter_plano_trabalho_table_add_criterios_avaliacao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (110,'2023_10_17_092130_alter_programa_table_add_plano_trabalho_criterios_avaliacao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (111,'2023_10_20_132400_create_reacoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (112,'2023_10_31_082530_alter_planejamento_objetivo_table_add_integra_okr',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (113,'2023_11_03_223032_add_informal_to_unidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (114,'2023_11_06_222213_alter_eixos_tematicos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (115,'2023_11_07_092130_alter_programa_table_add_link_normativa',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (116,'2023_11_07_160060_create_planos_entregas_entregas_progressos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (117,'2023_11_11_182611_alter_tipos_capacidades_tables_add_index',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (118,'2023_11_14_174945_create_okrs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (119,'2023_11_14_181819_create_okrs_objetivos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (120,'2023_11_14_181820_create_okrs_objetivos_resultados_chaves_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (121,'2023_11_14_192130_alter_planos_entregas_table_add_okr',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (122,'2023_11_14_283243_create_planos_entregas_entregas_resultados_chaves_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (123,'2023_11_21_123840_alter_planos_entregas_entregas_table_change_entrega_id_not_null',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (124,'2023_11_27_192130_alter_entidades_table_remove_integracao_sei',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (125,'2023_11_27_192131_alter_usuarios_table_rename_id_super_to_sei',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (126,'2023_11_28_092130_alter_templates_table_change_especie_values',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (127,'2023_11_29_142800_alter_usuarios_table_add_data_modificacao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (128,'2023_11_29_215800_alter_unidades_table_add_data_modificacao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (129,'2023_12_08_212400_alter_integracaounidades_table_rename_datamodificacao_to_data_modificacao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (130,'2023_12_11_092130_alter_documentos_table_change_especie_e_tipo_values',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (131,'2023_12_16_121800_version_2_0_7',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (132,'2023_12_20_092130_alter_documentos_table_and_templates_table_change_size_on_conteudo',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (133,'2023_12_21_215800_alter_entregas_table_change_descricao_size',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (134,'2023_12_21_215800_alter_planejamentos_objetivos_table_change_nome_size',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (135,'2023_12_21_215800_alter_planos_entregas_entregas_table_change_descricao_size',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (136,'2023_12_21_215800_alter_planos_trabalhos_entregas_table_change_descricao_size',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (137,'2023_12_22_120600_alter_integracao_servidores_table_change_data_modificacao_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (138,'2023_12_26_191054_create_ocorrencias_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (139,'2023_12_27_215800_alter_planos_trabalhos_consolidacoes_ocorrencias_table_add_snapshot',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (140,'2023_12_30_215700_add_chefia_to_integracao_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (141,'2024_01_02_153600_alter_integracao_unidades_table_change_data_modificacao_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (142,'2024_01_08_161500_add_codigo_situacao_funcional_to_integracao_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (143,'2024_01_08_170600_alter_integracao_servidores_table_rename_cargo_to_codigo_cargo',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (144,'2024_01_09_121800_version_2_0_9',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (145,'2024_01_15_215800_alter_planos_entregas_entregas_table_add_descricao_meta_descricao_entrega',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (146,'2024_01_17_083000_alter_curriculums_profissionais_table_change_ano_int',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (147,'2024_01_17_083500_alter_historicos_atividades_internas_curriculum_table_add_atividade_desempenhada',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (148,'2024_01_17_084000_alter_historicos_docencias_externas_curriculum_table_drop_fk_curso_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (149,'2024_01_17_084600_alter_curriculums_profissionais_table_change_fk_grupo_especializado_null',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (150,'2024_01_29_121800_version_2_0_10',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (151,'2024_01_30_190000_alter_usuarios_table_change_data_nascimento_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (152,'2024_02_11_084600_alter_questionarios_perguntas_table_add_codigo',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (153,'2024_02_19_123300_alter_historicos_funcoes_curriculum_table_add_unidade_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (154,'2024_02_19_123500_alter_questionarios_perguntas_table_add_enum',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (155,'2024_02_29_145300_version_2_0_11',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (156,'2024_03_04_154734_drop_password_resets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (157,'2024_03_04_155130_drop_failed_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (158,'2024_03_07_221717_rename_questionarios_respostas_to_questionarios_preenchimentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (159,'2024_03_07_221813_rename_questionarios_respostas_perguntas_to_questionarios_perguntas_respostas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (160,'2024_03_07_222136_alter_questionarios_preenchimentos_table_rename_column',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (161,'2024_03_07_222240_alter_questionarios_perguntas_respostas_table_rename_column',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (162,'2024_03_08_105829_rename_curriculum_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (163,'2024_03_08_145300_version_2_0_12',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (164,'2024_03_09_091845_rename_curriculums_to_curriculuns_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (165,'2024_03_09_222240_alter_questionarios_perguntas_table_rename_column',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (166,'2024_03_13_153203_alter_curriculuns_profissionais_table_modify_centro_treinamento_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (167,'2024_03_15_105800_rename_materias_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (168,'2024_03_15_145500_alter_disciplinas_table_drop_columns',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (169,'2024_03_15_145700_alter_disciplinas_table_drop_fk_curso_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (170,'2024_03_18_153100_alter_historicos_docencias_internas_table_add_disciplina_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (171,'2024_03_19_123300_alter_questionarios_preenchimentos_table_ add_resumo_resposta',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (172,'2024_04_01_223840_deleta_usuarios_duplicados',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (173,'2024_04_03_164716_add_unique_constraint_to_cpf_column_in_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (174,'2024_04_05_090740_create_jobs_schedules_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (175,'2024_04_05_145300_version_2_0_13',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (176,'2024_04_11_154027_remove_servidores_duplicados_integracao_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (177,'2024_04_16_191452_deleta_integracao_servidores_duplicados_final',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (178,'2024_04_19_145300_version_2_0_14',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (179,'2024_05_01_213806_change_horario_column_in_jobs_schedules_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (180,'2024_05_07_170358_drop_jobs_schedules',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (181,'2024_05_16_165824_add_columns_integracao_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (182,'2024_05_16_184112_add_columns_to_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (183,'2024_05_17_195143_delete_all_data_integracao_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (184,'2024_05_27_104112_add_columns_to_tipos_motivos_afastamentos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (185,'2024_05_29_155300_version_2_0_15',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (186,'2024_06_06_092311_add_tipo_avaliacao_nota_id_to_avaliacoes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (187,'2024_06_18_131241_alter_column_matricula_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (188,'2024_07_01_155300_version_2_0_16',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (189,'2024_07_15_155300_version_2_0_17',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (190,'2024_07_17_163219_create_audits_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (191,'2024_07_29_151556_add_unidade_autorizadora_id_to_programas',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (192,'2024_07_30_092311_add_documento_id_to_programa_participantes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (193,'2024_07_31_110002_alter_audits_add_message',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (194,'2024_07_31_230758_add_data_envio_api_pgd_to_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (195,'2024_07_31_230805_add_data_envio_api_pgd_to_planos_trabalhos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (196,'2024_07_31_230811_add_data_envio_api_pgd_to_planos_entregas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (197,'2024_07_31_232158_create_get_view_api_pgd_by_interval_procedure',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (198,'2024_08_01_220620_create_view_api_pgd',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (199,'2024_08_05_150754_delete_wrong_data_from_siape',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (200,'2024_08_14_113824_update_view_api',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (201,'2024_08_19_172734_add_cpf_columns_to_integracao_unidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (202,'2024_08_20_154929_truncate_unidades_integrantes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (203,'2024_08_21_151217_create_produtos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (204,'2024_08_21_151908_create_produto_produto_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (205,'2024_08_21_152557_create_produto_processo_cadeia_valor_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (206,'2024_08_22_161407_create_catalogo_produtos_servicos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (207,'2024_08_28_234458_update_atribuicao_column_unidades_integrantes_atribuicoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (208,'2024_08_30_010751_alter_catalogo_add_softdelete',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (209,'2024_09_05_165918_alter_entidade_add_email',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (210,'2024_09_06_171107_create_catalogo_produtos_servicos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (211,'2024_09_09_155300_version_2_1_0',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (212,'2024_09_10_171546_add_columns_to_table_produtos',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (213,'2024_09_10_172945_add_columns_to_table_produto_produto',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (214,'2024_09_12_095149_create_tipos_clientes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (215,'2024_09_12_102456_create_clientes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (216,'2024_09_12_103120_create_column_cliente_id_produtos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (217,'2024_09_16_164326_alter_solucoes_add_soft_delete',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (218,'2024_09_17_155300_version_2_1_1',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (219,'2024_09_21_004302_alter_entidade_add_email_remetente',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (220,'2024_09_23_003649_alter_solucao_remove_responsavel',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (221,'2024_09_23_120945_add_solucao_ativo_inativo',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (222,'2024_09_27_113035_create_uorg_and_servidores_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (223,'2024_09_27_192027_add_processado_to_siape_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (224,'2024_09_30_155300_version_2_1_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (225,'2024_10_01_005430_update-view-api-pgd',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (226,'2024_10_01_164031_add_soft_deletes_to_siape_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (227,'2024_10_01_200620_add_cpf_to_siape_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (228,'2024_10_02_152622_alter-entidaide-nullify-email-remetente',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (229,'2024_10_03_105350_version2_1_3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (230,'2024_10_04_105350_version2_2_0',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (231,'2024_10_04_183837_add_data_modificacao_to_siape_dados_u_o_r_g_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (232,'2024_10_04_185248_add_data_modificacao_to_siape_lista_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (233,'2024_10_05_001206_add_data_modificacao_to_siape_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (234,'2024_10_07_163151_create_envios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (235,'2024_10_07_204733_create_envio_itens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (236,'2024_10_11_105350_version2_3_0',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (237,'2024_10_15_152144_truncate_siape_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (238,'2024_10_17_102427_alter_fundamentacao_column_in_okrs_and_planejamentos_objetivos_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (239,'2024_10_23_105350_version2_3_1',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (240,'2024_10_28_153550_alter-envio-add-counters',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (241,'2024_10_30_105432_alter-view-api-pgd-add-distinct',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (242,'2024_11_05_110341_version2_3_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (243,'2024_11_26_120241_create_entidade_emails',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (244,'2024_12_06_024703_create-produtos-solucoes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (245,'2024_12_09_154000_create_entrega_produto_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (246,'2024_12_09_160237_create_solucoes_unidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (247,'2024_12_10_124944_delete_column_solucao_produtos_unidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (248,'2024_12_11_023845_alter_solucao_add_identificador',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (249,'2024_12_17_150819_update_view_api_p_g_d',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (250,'2024_12_18_130736_version2_3_3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (251,'2024_12_26_043918_cria_vw_pg_usuarios',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (252,'2024_12_26_044218_cria_vw_pg_planos_entrega',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (253,'2024_12_26_044231_cria_vw_pg_planos_trabalho',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (254,'2024_12_26_192335_alter_envios_add_numero',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (255,'2024_12_29_172336_alter_audits_add_envio',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (256,'2024_12_30_112727_alter_envios_add_aptos',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (257,'2024_12_30_113155_update_views_p_g_d',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (258,'2025_01_03_130736_version2_3_4',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (259,'2025_01_09_130659_add_responsavel_id_to_produtos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (260,'2025_01_10_153325_remove_tipo_from_produto_produto_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (261,'2025_01_13_154000_alter_entrega_produto_add_unique',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (262,'2025_01_14_104000_alter_entrega_produto_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (263,'2025_01_15_111048_alter_clientes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (264,'2025_01_22_111048_alter_planos_entregas_entregas_produtos_entrega_id_foreign',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (265,'2025_01_22_152917_remove_unidades_raizes_duplicadas',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (266,'2025_01_22_171001_alter_entrega_produto_fk',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (267,'2025_01_23_183155_update_views_p_g_d',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (268,'2025_01_24_130736_version2_3_5',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (269,'2025_01_27_165145_add_usuario_externo_to_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (270,'2025_01_27_172336_update_perfil_usuarios',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (271,'2025_01_28_113017_version2_3_6',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (272,'2025_02_07_113017_version2_3_7',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (273,'2025_02_14_090945_add_isadmin_to_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (274,'2025_02_16_113017_version2_3_8',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (275,'2025_02_16_113017_version2_3_9',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (276,'2025_02_16_201118_add_expires_at_to_personal_access_tokens',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (277,'2025_02_25_004613_create_siape_blacklist_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (278,'2025_02_25_004614_create_siape_blacklist_unidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (279,'2025_02_27_024653_alter-produtos-produtos-insumos',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (280,'2025_02_27_153056_version2_3_10',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (281,'2025_02_28_171001_alter_cliente_tipo_cliente_fk',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (282,'2025_03_07_092117_fix_columns_unidade_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (283,'2025_03_13_153056_version2_3_11',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (284,'2025_03_24_153056_version2_3_12',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (285,'2025_03_28_153056_version2_3_13',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (286,'2025_04_01_153056_version2_3_14',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (287,'2025_04_03_102024_corrige-chefias',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (288,'2025_04_11_153056_version2_3_15',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (289,'2025_04_16_153056_version2_3_16',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (290,'2025_04_22_153056_version2_3_17',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (291,'2025_05_05_151156_remove_jornada_columns_from_integracao_servidores',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (292,'2025_05_05_153844_remove_jornada_columns_from_usuarios',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (293,'2025_05_12_153056_version2_3_18',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (294,'2025_05_16_153056_add_pedagio_usuarios',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (295,'2025_05_19_153056_version2_3_19',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (296,'2025_05_21_153056_add_controle_pedagio_tipo_modalidades',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (297,'2025_05_27_171756_version2_3_20',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (298,'2025_06_10_163440_add-fn-unidade-hierarquia',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (299,'2025_06_11_111456_version2_4_0',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (300,'2025_06_11_185237_create-view-relatorio-pt',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (301,'2025_06_13_111456_version2_4_1',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (302,'2025_06_14_172112_alter_avaliacao_add_data_recurso',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (303,'2025_06_30_114548_add_auditable_index_to_audits_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (304,'2025_07_01_185237_create-view-relatorio-pe',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (305,'2025_07_03_111456_version2_4_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (306,'2025_07_07_172059_delete_duplicate_data_unidade_integrante_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (307,'2025_07_08_101520_add_unique_usuario_unidade_to_unidades_integrantes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (308,'2025_07_09_181025_add_inativado_to_siape_blacklist_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (309,'2025_07_21_111456_version2_5_0',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (310,'2025_07_24_144820_version2_5_1',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (311,'2025_07_24_165824_add_columns_integracao_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (312,'2025_07_24_184112_add_columns_to_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (313,'2025_07_25_101429_delete_usuarios_aposentados',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (314,'2025_07_25_144820_version2_5_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (315,'2025_07_28_182220_version2_5_3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (316,'2025_07_29_112900_add_modalidade_integracao_servidores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (317,'2025_07_29_112900_add_modalidade_to_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (318,'2025_07_31_140300_alter_integracao_servidor_table_add_participa_pgd',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (319,'2025_07_31_140300_alter_usuarios_table_add_participa_pgd',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (320,'2025_08_05_181626_alter-relatorio-pe',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (321,'2025_08_07_121607_alter-relatorio-pt-add-cancelados',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (322,'2025_08_07_152112_change_data_modificacao_integracao_servidores',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (323,'2025_08_08_120000_version2_6_0',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (324,'2025_08_08_121607_alter-relatorio-pe-collation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (325,'2025_08_11_005908_alter-relatorio-pe-add-homologacao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (326,'2025_08_13_110000_version2_6_1',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (327,'2025_08_13_115954_alter-relatorio-unidade-add-sigla',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (328,'2025_08_13_121607_update-relatorio-pe',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (329,'2025_08_13_121607_update-relatorio-pt-detalhado',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (330,'2025_08_13_185237_update-view-relatorio-pt',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (331,'2025_08_13_190000_add_situacao_siape_to_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (332,'2025_08_15_005908_alter-relatorio-pe-add-homologacao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (333,'2025_08_19_204556_move_unique_constraint_from_cpf_to_matricula_usuarios_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (334,'2025_08_20_005908_alter-relatorio-pe-ajuste-situacao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (335,'2025_08_20_130050_create_tipo_modalidade_siape_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (336,'2025_08_20_add_ident_unica_column_to_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (337,'2025_08_21_070300_alter_usuarios_table_add_modalidade_pgd_key',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (338,'2025_08_28_130000_version2_6_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (339,'2025_09_08_130000_version2_6_3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (340,'2025_09_09_150000_version2_6_4',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (341,'2025_09_10_004615_add_codigo_to_siape_dados_uorg_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (342,'2025_09_10_123400_alter_usuarios_table_modalidade_pgd_nullable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (343,'2025_09_11_120000_add_inativado_to_siape_blacklist_unidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (344,'2025_09_11_121000_add_data_inicio_inativacao_to_unidades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (345,'2025_09_17_125821_alter-afastamentos-add-horas',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (346,'2025_09_22_150000_version2_6_5',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (347,'2025_09_26_022347_forcar_envios',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (348,'2025_09_29_150000_version2_7_0',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (349,'2025_10_01_093308_version2_7_1',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (350,'2025_10_02_093308_version2_7_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (351,'2025_10_03_022347_forcar_envios',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (352,'2025_10_06_093308_version2_7_3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (353,'2025_10_07_100000_alter_usuarios_table_situacao_siape_not_null',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (354,'2025_10_09_090956_add_registro_execucao_to_planos_entregas_entregas_progressos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (355,'2025_10_13_093308_version2_7_4',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (356,'2025_10_14_074111_delete_atribuicao_colaborador',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (357,'2025_10_14_074151_delete_atribuicao_colaborador_lotado',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (358,'2025_10_17_104519_update_usuario_externo_not_consulta',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (359,'2025_10_20_093308_version2_7_5',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (360,'2025_10_23_171448_add_temporaria_fields_to_unidade_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (361,'2025_10_24_172900_version2_7_6',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (362,'2025_10_28_104519_add_justificativa_conclusao_consolidacao',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (363,'2025_10_29_095011_add_unidade_executora_flag',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (364,'2025_10_29_134904_update_entidade_nomenclatura_unidade',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (365,'2025_10_29_172900_version2_7_7',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (366,'2025_10_30_151816_tenant_fix_matriculas_duplicadas',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (367,'2025_11_06_000000_tenant_fix_usuarios_duplicados_cpf_matricula',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (368,'2025_11_06_010000_tenant_fix_usuarios_matricula_vazia',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (369,'2025_11_10_172900_version2_7_8',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (370,'2025_11_11_113535_alter_statuses_planos_trabalhos_planos_entregas',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (371,'2025_11_13_015228_alter-entidades-add-habilitar-relatos',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (372,'2025_11_13_152800_add_avaliado_at_to_planos',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (373,'2025_11_17_140000_alter_siape_blacklist_servidores_add_matricula',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (374,'2025_11_17_172900_version2_8_0',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (375,'2025_11_18_172900_version2_8_1',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (376,'2025_11_24_172900_version2_8_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (377,'2025_12_01_172900_version2_8_3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (378,'2025_12_03_172900_version2_9_0',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (379,'2025_12_05_172900_version2_9_1',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (380,'2025_12_05_173500_version2_9_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (381,'2025_12_09_000000_version2_9_3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (382,'2025_12_09_173600_fix_usuarios_modalidade_pgd_from_cpf',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (383,'2025_12_09_212548_alter_usuarios_modalidade_pgd_to_tipo_modalidade_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (384,'2025_12_15_000000_version2_9_4',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (385,'2025_12_19_000000_version2_9_5',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (386,'2025_12_26_000000_version2_9_6',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (387,'2026_01_02_000000_version2_9_7',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (388,'2026_01_12_000000_version2_9_8',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (389,'2026_01_16_000000_version2_9_9',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (390,'2026_01_23_000000_version2_9_10',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (391,'2026_01_28_000000_version2_9_11',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (392,'2026_01_29_000000_version2_9_12',1);
commit;
