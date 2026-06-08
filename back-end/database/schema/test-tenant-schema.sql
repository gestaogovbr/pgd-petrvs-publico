/*M!999999\- enable the sandbox mode */
-- MariaDB dump 10.19-12.0.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: petrvs_mgi
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB-ubu2404-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `afastamentos`
--

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
  KEY `idx_afastamentos_usuario_data` (`usuario_id`,`data_inicio`,`data_fim`),
  CONSTRAINT `afastamentos_tipo_motivo_afastamento_id_foreign` FOREIGN KEY (`tipo_motivo_afastamento_id`) REFERENCES `tipos_motivos_afastamentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `afastamentos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `anexos`
--

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

--
-- Table structure for table `areas_atividades_externas`
--

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

--
-- Table structure for table `areas_conhecimentos`
--

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

--
-- Table structure for table `areas_tematicas`
--

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

--
-- Table structure for table `atividades`
--

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

--
-- Table structure for table `atividades_pausas`
--

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

--
-- Table structure for table `atividades_tarefas`
--

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

--
-- Table structure for table `audits`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=734 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `avaliacoes`
--

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

--
-- Table structure for table `avaliacoes_entregas_checklist`
--

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

--
-- Table structure for table `cadeias_valores`
--

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

--
-- Table structure for table `cadeias_valores_processos`
--

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

--
-- Table structure for table `capacidades`
--

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

--
-- Table structure for table `capacidades_tecnicas`
--

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

--
-- Table structure for table `cargas_individuais_siape_relatorios`
--

DROP TABLE IF EXISTS `cargas_individuais_siape_relatorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargas_individuais_siape_relatorios` (
  `id` char(36) NOT NULL,
  `processamento_id` char(36) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `chave` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `entrada_valida` tinyint(1) NOT NULL DEFAULT 0,
  `mensagem_usuario` text DEFAULT NULL,
  `orientacoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`orientacoes`)),
  `secoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`secoes`)),
  `solicitante_id` char(36) DEFAULT NULL,
  `processado_em` datetime NOT NULL,
  `expira_em` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ci_siape_rel_processamento_unique` (`processamento_id`),
  KEY `ci_siape_rel_tipo_chave_idx` (`tipo`,`chave`),
  KEY `ci_siape_rel_processado_idx` (`processado_em`),
  KEY `ci_siape_rel_expira_idx` (`expira_em`),
  KEY `ci_siape_rel_solicitante_idx` (`solicitante_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cargos`
--

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

--
-- Table structure for table `catalogo_produtos_servicos`
--

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

--
-- Table structure for table `centros_treinamentos`
--

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

--
-- Table structure for table `cidades`
--

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

--
-- Table structure for table `clientes`
--

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

--
-- Table structure for table `comentarios`
--

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

--
-- Table structure for table `comparecimentos`
--

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

--
-- Table structure for table `curriculuns`
--

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

--
-- Table structure for table `curriculuns_graduacoes`
--

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

--
-- Table structure for table `curriculuns_profissionais`
--

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

--
-- Table structure for table `cursos`
--

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

--
-- Table structure for table `disciplinas`
--

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

--
-- Table structure for table `documentos`
--

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

--
-- Table structure for table `documentos_assinaturas`
--

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

--
-- Table structure for table `eixos_tematicos`
--

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

--
-- Table structure for table `entidade_emails`
--

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

--
-- Table structure for table `entidades`
--

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
  `expediente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT _utf8mb4'{"domingo":[],"segunda":[],"terca":[],"quarta":[],"quinta":[],"sexta":[],"sabado":[],"especial":[]}' COMMENT 'Configuração de expediente' CHECK (json_valid(`expediente`)),
  `modalidade_pgd_padrao` varchar(50) DEFAULT NULL,
  `cidade_id` char(36) DEFAULT NULL,
  `gestor_id` char(36) DEFAULT NULL,
  `gestor_substituto_id` char(36) DEFAULT NULL,
  `email_responsavel_siape` varchar(100) DEFAULT NULL,
  `email_remetente_siape` varchar(100) DEFAULT NULL,
  `habilitar_relatos_siape` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entidades_sigla_unique` (`sigla`),
  KEY `entidades_cidade_id_foreign` (`cidade_id`),
  KEY `entidades_gestor_id_foreign` (`gestor_id`),
  KEY `entidades_gestor_substituto_id_foreign` (`gestor_substituto_id`),
  CONSTRAINT `entidades_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `entidades_gestor_id_foreign` FOREIGN KEY (`gestor_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `entidades_gestor_substituto_id_foreign` FOREIGN KEY (`gestor_substituto_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `entregas`
--

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

--
-- Table structure for table `favoritos`
--

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

--
-- Table structure for table `feriados`
--

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
  KEY `idx_feriados_data` (`ano`,`mes`,`dia`),
  CONSTRAINT `feriados_cidade_id_foreign` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `feriados_entidade_id_foreign` FOREIGN KEY (`entidade_id`) REFERENCES `entidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `funcoes`
--

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

--
-- Table structure for table `grupos_especializados`
--

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

--
-- Table structure for table `historicos_atividades_externas`
--

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

--
-- Table structure for table `historicos_atividades_internas`
--

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

--
-- Table structure for table `historicos_cursos_externos`
--

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

--
-- Table structure for table `historicos_cursos_internos`
--

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

--
-- Table structure for table `historicos_docencias_externas`
--

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

--
-- Table structure for table `historicos_docencias_internas`
--

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

--
-- Table structure for table `historicos_funcoes`
--

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

--
-- Table structure for table `historicos_lotacoes`
--

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

--
-- Table structure for table `integracao_servidores`
--

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

--
-- Table structure for table `integracao_unidades`
--

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

--
-- Table structure for table `integracoes`
--

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

--
-- Table structure for table `materiais_servicos`
--

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

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=496 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notificacoes`
--

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

--
-- Table structure for table `notificacoes_destinatarios`
--

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

--
-- Table structure for table `notificacoes_whatsapp`
--

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

--
-- Table structure for table `ocorrencias`
--

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

--
-- Table structure for table `okrs`
--

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

--
-- Table structure for table `okrs_objetivos`
--

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

--
-- Table structure for table `okrs_objetivos_resultados_chaves`
--

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

--
-- Table structure for table `perfis`
--

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

--
-- Table structure for table `personal_access_tokens`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `planejamentos`
--

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

--
-- Table structure for table `planejamentos_objetivos`
--

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

/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `planejamentos_tipos_objetivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planejamentos_tipos_objetivos` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nome` varchar(255) NOT NULL COMMENT 'Nome do tipo de objetivo',
  `descricao` text DEFAULT NULL COMMENT 'Descrição do tipo de objetivo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `planos_entregas`
--

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
  `data_agendamento_envio` timestamp NULL DEFAULT NULL COMMENT 'Data do agendamento para envio para a API',
  `data_tentativa_envio` timestamp NULL DEFAULT NULL COMMENT 'Data da Ultima Tentativa de Envio',
  `log_envio` text DEFAULT NULL,
  `data_conclusao_envio` timestamp NULL DEFAULT NULL COMMENT 'Data em que o envio foi concluído com sucesso na API PGD',
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
  KEY `planos_entregas_data_agendamento_envio_index` (`data_agendamento_envio`),
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

--
-- Table structure for table `planos_entregas_entregas`
--

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
  CONSTRAINT `planos_entregas_entregas_plano_entrega_id_foreign` FOREIGN KEY (`plano_entrega_id`) REFERENCES `planos_entregas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_entregas_entregas_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `planos_entregas_entregas_objetivos`
--

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

--
-- Table structure for table `planos_entregas_entregas_processos`
--

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

--
-- Table structure for table `planos_entregas_entregas_produtos`
--

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

--
-- Table structure for table `planos_entregas_entregas_progressos`
--

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

--
-- Table structure for table `planos_entregas_entregas_resultados_chaves`
--

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

--
-- Table structure for table `planos_trabalhos`
--

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
  `justificativa_modalidade` varchar(500) DEFAULT NULL COMMENT 'Justificativa para modalidade divergente do SIAPE',
  `justificativa` text DEFAULT NULL COMMENT 'Justificativa para carga horária inferior a 100%',
  `programa_id` char(36) NOT NULL,
  `usuario_id` char(36) NOT NULL,
  `unidade_id` char(36) NOT NULL,
  `modalidade_pgd` varchar(50) DEFAULT NULL,
  `criacao_usuario_id` char(36) NOT NULL,
  `documento_id` char(36) DEFAULT NULL,
  `criterios_avaliacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'Critérios para avaliação' CHECK (json_valid(`criterios_avaliacao`)),
  `data_envio_api_pgd` timestamp NULL DEFAULT NULL,
  `avaliado_at` date DEFAULT NULL COMMENT 'Data em que todos os planos_trabalhos_consolidacoes tiveram o status alterado para AVALIADO',
  `encerrado_at` date DEFAULT NULL COMMENT 'Data de encerramento antecipado do plano de trabalho',
  `data_agendamento_envio` timestamp NULL DEFAULT NULL COMMENT 'Data do agendamento para envio para a API',
  `data_tentativa_envio` timestamp NULL DEFAULT NULL COMMENT 'Data da Ultima Tentativa de Envio',
  `log_envio` text DEFAULT NULL,
  `data_conclusao_envio` timestamp NULL DEFAULT NULL COMMENT 'Data em que o envio foi concluído com sucesso na API PGD',
  PRIMARY KEY (`id`),
  UNIQUE KEY `planos_trabalhos_numero_unique` (`numero`),
  KEY `planos_trabalhos_programa_id_foreign` (`programa_id`),
  KEY `planos_trabalhos_usuario_id_foreign` (`usuario_id`),
  KEY `planos_trabalhos_unidade_id_foreign` (`unidade_id`),
  KEY `planos_trabalhos_criacao_usuario_id_foreign` (`criacao_usuario_id`),
  KEY `planos_trabalhos_documento_id_foreign` (`documento_id`),
  KEY `planos_trabalhos_data_agendamento_envio_index` (`data_agendamento_envio`),
  CONSTRAINT `planos_trabalhos_criacao_usuario_id_foreign` FOREIGN KEY (`criacao_usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_documento_id_foreign` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_programa_id_foreign` FOREIGN KEY (`programa_id`) REFERENCES `programas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_unidade_id_foreign` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `planos_trabalhos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `planos_trabalhos_consolidacoes`
--

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
  `status` enum('INCLUIDO','CONCLUIDO','AVALIADO') NOT NULL DEFAULT 'INCLUIDO' COMMENT 'Status atual da consolidação',
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

--
-- Table structure for table `planos_trabalhos_consolidacoes_afastamentos`
--

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

--
-- Table structure for table `planos_trabalhos_consolidacoes_atividades`
--

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

--
-- Table structure for table `planos_trabalhos_consolidacoes_ocorrencias`
--

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

--
-- Table structure for table `planos_trabalhos_entregas`
--

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

--
-- Table structure for table `produto_clientes`
--

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

--
-- Table structure for table `produto_processo_cadeia_valor`
--

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

--
-- Table structure for table `produtos`
--

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

--
-- Table structure for table `produtos_insumos`
--

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

--
-- Table structure for table `produtos_solucoes`
--

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

--
-- Table structure for table `programas`
--

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

--
-- Table structure for table `programas_participantes`
--

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

--
-- Table structure for table `projetos`
--

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

--
-- Table structure for table `projetos_alocacoes`
--

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

--
-- Table structure for table `projetos_alocacoes_regras`
--

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

--
-- Table structure for table `projetos_fases`
--

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

--
-- Table structure for table `projetos_historicos`
--

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

--
-- Table structure for table `projetos_recursos`
--

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

--
-- Table structure for table `projetos_regras`
--

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

--
-- Table structure for table `projetos_tarefas`
--

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

--
-- Table structure for table `projetos_tarefas_dependencias`
--

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

--
-- Table structure for table `questionarios`
--

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

--
-- Table structure for table `questionarios_perguntas`
--

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
  `respostas_possiveis` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Respostas possiveis para a pergunta' CHECK (json_valid(`respostas_possiveis`)),
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

--
-- Table structure for table `questionarios_perguntas_respostas`
--

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

--
-- Table structure for table `questionarios_preenchimentos`
--

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

--
-- Table structure for table `reacoes`
--

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

--
-- Table structure for table `sequences`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `siape_blacklist_servidores`
--

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

--
-- Table structure for table `siape_blacklist_unidades`
--

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

--
-- Table structure for table `siape_consultaDadosFuncionais`
--

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

--
-- Table structure for table `siape_consultaDadosPessoais`
--

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

--
-- Table structure for table `siape_dadosUORG`
--

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

--
-- Table structure for table `siape_listaServidores`
--

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

--
-- Table structure for table `siape_listaUORG`
--

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

--
-- Table structure for table `solucao_produtos_servicos`
--

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

--
-- Table structure for table `solucoes_unidades`
--

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

--
-- Table structure for table `status_justificativas`
--

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

--
-- Table structure for table `templates`
--

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

--
-- Table structure for table `tipos_atividades`
--

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

--
-- Table structure for table `tipos_avaliacoes`
--

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

--
-- Table structure for table `tipos_avaliacoes_justificativas`
--

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

--
-- Table structure for table `tipos_avaliacoes_notas`
--

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

--
-- Table structure for table `tipos_capacidades`
--

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

--
-- Table structure for table `tipos_clientes`
--

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

--
-- Table structure for table `tipos_cursos`
--

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

--
-- Table structure for table `tipos_documentos`
--

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

--
-- Table structure for table `tipos_justificativas`
--

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

--
-- Table structure for table `tipos_motivos_afastamentos`
--

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

--
-- Table structure for table `tipos_processos`
--

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

--
-- Table structure for table `tipos_projetos`
--

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

--
-- Table structure for table `tipos_tarefas`
--

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

--
-- Table structure for table `unidades`
--

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

--
-- Table structure for table `unidades_integrantes`
--

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

--
-- Table structure for table `unidades_integrantes_atribuicoes`
--

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

--
-- Table structure for table `unidades_integrantes_atribuicoes_old`
--

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

--
-- Table structure for table `unidades_integrantes_old`
--

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

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL COMMENT 'E-mail do usuário',
  `nome` varchar(256) NOT NULL COMMENT 'Nome do usuário',
  `password` varchar(255) DEFAULT NULL COMMENT 'Senha do usuário',
  `cpf` varchar(14) NOT NULL,
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
  `modalidade_pgd` varchar(50) DEFAULT NULL COMMENT 'Modalidade do Usuário no PGD',
  `participa_pgd` enum('sim','não') NOT NULL COMMENT 'Indica se o usuário participa do PGD.',
  `ident_unica` varchar(50) DEFAULT NULL COMMENT 'Identificador único do usuário',
  `data_agendamento_envio` timestamp NULL DEFAULT NULL COMMENT 'Data do agendamento para envio do usuário para a API PGD',
  `data_tentativa_envio` timestamp NULL DEFAULT NULL COMMENT 'Data da Ultima Tentativa de Envio',
  `log_envio` text DEFAULT NULL,
  `data_conclusao_envio` timestamp NULL DEFAULT NULL COMMENT 'Data em que o envio foi concluído com sucesso na API PGD',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_email_unique` (`email`),
  UNIQUE KEY `usuarios_matricula_unique` (`matricula`),
  KEY `usuarios_perfil_id_foreign` (`perfil_id`),
  KEY `usuarios_data_agendamento_envio_index` (`data_agendamento_envio`),
  CONSTRAINT `usuarios_perfil_id_foreign` FOREIGN KEY (`perfil_id`) REFERENCES `perfis` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `view_relatorio_plano_entrega`
--

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

--
-- Temporary table structure for view `view_relatorio_plano_trabalho`
--

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
  1 AS `modalidade_pgd`,
  1 AS `tipo_modalidade_id`,
  1 AS `tipoModalidadeNome`,
  1 AS `duracao`,
  1 AS `chd`,
  1 AS `qtdePeriodosAvaliativos` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `view_relatorio_plano_trabalho_detalhado`
--

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
  1 AS `modalidade_pgd`,
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

--
-- Temporary table structure for view `view_relatorio_unidades`
--

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

--
-- Temporary table structure for view `vw_pgd_planos_entrega`
--

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

--
-- Temporary table structure for view `vw_pgd_usuarios`
--

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

--
-- Dumping routines for database 'petrvs_mgi'
--
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_calcular_dias_uteis` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `fn_calcular_dias_uteis`(p_data_inicio DATE,

    p_data_fim DATE,

    p_unidade_id CHAR(36)) RETURNS int(11)
    DETERMINISTIC
BEGIN

    DECLARE v_dias_uteis INT;



    WITH RECURSIVE

    anos AS (

        SELECT YEAR(p_data_inicio) AS ano

        UNION ALL

        SELECT ano + 1 FROM anos WHERE ano < YEAR(p_data_fim)

    ),

    dias AS (

        SELECT DATE(p_data_inicio) AS data

        UNION ALL

        SELECT DATE_ADD(data, INTERVAL 1 DAY)

        FROM dias

        WHERE data < DATE(p_data_fim)

    ),

    feriados_validos AS (

        SELECT

            f.tipoDia,

            f.dia,

            f.mes,

            f.ano,

            f.recorrente,

            f.abrangencia,

            CASE

                WHEN f.recorrente = 1 AND f.tipoDia = 'MES'

                    THEN DATE(CONCAT(a.ano, '-', LPAD(f.mes, 2, '0'), '-', LPAD(f.dia, 2, '0')))

                WHEN f.recorrente = 0 AND f.tipoDia = 'MES'

                    THEN DATE(CONCAT(f.ano, '-', LPAD(f.mes, 2, '0'), '-', LPAD(f.dia, 2, '0')))

                ELSE NULL

            END AS data_feriado

        FROM feriados f

        LEFT JOIN anos a ON f.recorrente = 1

        WHERE

            (

                f.abrangencia = 'NACIONAL'

                OR (

                    f.abrangencia = 'ESTADUAL'

                    AND f.uf = (

                        SELECT cid.uf

                        FROM unidades uni

                        INNER JOIN cidades cid ON cid.id = uni.cidade_id

                        WHERE uni.id = p_unidade_id

                    )

                )

                OR (

                    f.abrangencia = 'MUNICIPAL'

                    AND f.cidade_id = (

                        SELECT cidade_id

                        FROM unidades

                        WHERE id = p_unidade_id

                    )

                )

            )

            AND (

                f.recorrente = 1

                OR (f.ano BETWEEN YEAR(p_data_inicio) AND YEAR(p_data_fim))

            )

    )

    SELECT COUNT(*) INTO v_dias_uteis

    FROM dias d

    WHERE DAYOFWEEK(d.data) NOT IN (1, 7)

      AND NOT EXISTS (

        SELECT 1

        FROM feriados_validos f

        WHERE

            (

                f.tipoDia = 'MES'

                AND d.data = f.data_feriado

            )

            OR (

                f.tipoDia = 'SEMANA'

                AND DAYOFWEEK(d.data) = f.dia

            )

      );



    RETURN v_dias_uteis;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_data_pascoa` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `fn_data_pascoa`(ano INT) RETURNS date
    DETERMINISTIC
BEGIN

  DECLARE a INT;

  DECLARE b INT;

  DECLARE c INT;

  DECLARE d INT;

  DECLARE e INT;

  DECLARE f INT;

  DECLARE g INT;

  DECLARE h INT;

  DECLARE i INT;

  DECLARE k INT;

  DECLARE l INT;

  DECLARE m INT;

  DECLARE dia INT;

  DECLARE mes INT;



  SET a = ano % 19;

  SET b = FLOOR(ano / 100);

  SET c = ano % 100;

  SET d = FLOOR(b / 4);

  SET e = b % 4;

  SET f = FLOOR((b + 8) / 25);

  SET g = FLOOR((b - f + 1) / 3);

  SET h = (19 * a + b - d - g + 15) % 30;

  SET i = FLOOR(c / 4);

  SET k = c % 4;

  SET l = (32 + 2 * e + 2 * i - h - k) % 7;

  SET m = FLOOR((a + 11 * h + 22 * l) / 451);

  SET mes = FLOOR((h + l - 7 * m + 114) / 31);

  SET dia = ((h + l - 7 * m + 114) % 31) + 1;



  RETURN STR_TO_DATE(CONCAT(ano, '-', mes, '-', dia), '%Y-%m-%d');

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_obter_processo_sequencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `fn_obter_processo_sequencia`(processo_id CHAR(36)) RETURNS varchar(255) CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci
    DETERMINISTIC
BEGIN
                DECLARE seq_result VARCHAR(255) DEFAULT '';
                DECLARE seq_atual VARCHAR(255);
                DECLARE pai_atual CHAR(36);

                SELECT sequencia, processo_pai_id INTO seq_atual, pai_atual
                FROM cadeias_valores_processos
                WHERE id = processo_id;

                WHILE pai_atual IS NOT NULL DO
                    SET seq_result = CONCAT(seq_atual, '.', seq_result);

                    SELECT sequencia, processo_pai_id INTO seq_atual, pai_atual
                    FROM cadeias_valores_processos
                    WHERE id = pai_atual;
                END WHILE;

                SET seq_result = CONCAT(seq_atual, '.', seq_result);
                RETURN TRIM(TRAILING '.' FROM seq_result);
            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP FUNCTION IF EXISTS `obter_sequencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `obter_sequencia`(processo_id CHAR(36)) RETURNS varchar(255) CHARSET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci
    DETERMINISTIC
BEGIN

    DECLARE seq_result VARCHAR(255) DEFAULT '';

    DECLARE seq_atual VARCHAR(255);

    DECLARE pai_atual CHAR(36);



    -- Inicializa com os dados do processo informado

    SELECT sequencia, processo_pai_id INTO seq_atual, pai_atual

    FROM petrvs_mgi.cadeias_valores_processos

    WHERE id = processo_id;



    -- Constrói a sequência subindo na hierarquia

    WHILE pai_atual IS NOT NULL DO

        -- Adiciona o valor atual ao início da sequência

        SET seq_result = CONCAT(seq_atual, '.', seq_result);



        -- Busca o próximo nível da hierarquia

        SELECT sequencia, processo_pai_id INTO seq_atual, pai_atual

        FROM petrvs_mgi.cadeias_valores_processos

        WHERE id = pai_atual;

    END WHILE;



    -- Adiciona o último elemento (raiz) e remove o ponto final se houver

    SET seq_result = CONCAT(seq_atual, '.', seq_result);

    RETURN TRIM(TRAILING '.' FROM seq_result);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_atividade_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
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
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_documento_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sequence_documento_numero`()
BEGIN

                UPDATE sequences SET documento_numero = GREATEST(
                    IFNULL((SELECT MAX(numero) FROM documentos), 0),
                    documento_numero
                ) + 1;

                SELECT documento_numero AS number FROM sequences LIMIT 1;

            END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_notificacao_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
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
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_plano_entrega_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
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
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_plano_trabalho_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
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
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sequence_template_numero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_uca1400_ai_ci */ ;
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

--
-- Final view structure for view `view_relatorio_plano_entrega`
--

/*!50001 DROP VIEW IF EXISTS `view_relatorio_plano_entrega`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_relatorio_plano_entrega` AS with status_homolog_pe as (select `sj`.`plano_entrega_id` AS `plano_entrega_id`,`sj`.`created_at` AS `created_at`,row_number() over ( partition by `sj`.`plano_entrega_id` order by `sj`.`created_at` desc) AS `rn` from (`status_justificativas` `sj` join `planos_entregas` `pe` on(`pe`.`id` = `sj`.`plano_entrega_id`)) where `sj`.`codigo` = 'ATIVO' and `sj`.`deleted_at` is null and `pe`.`status` not in ('INCLUIDO','CANCELADO','HOMOLOGANDO')), status_concluido_pe as (select `sj`.`plano_entrega_id` AS `plano_entrega_id`,`sj`.`created_at` AS `created_at`,row_number() over ( partition by `sj`.`plano_entrega_id` order by `sj`.`created_at` desc) AS `rn` from (`status_justificativas` `sj` join `planos_entregas` `pe` on(`pe`.`id` = `sj`.`plano_entrega_id`)) where `sj`.`codigo` = 'CONCLUIDO' and `sj`.`deleted_at` is null and `pe`.`status` not in ('INCLUIDO','CANCELADO','SUSPENSO','ATIVO'))select `pe`.`id` collate utf8mb4_unicode_ci AS `id`,`pe`.`numero` AS `numero`,`pe`.`status` collate utf8mb4_unicode_ci AS `status`,`pe`.`nome` collate utf8mb4_unicode_ci AS `entregaNome`,cast(`pe`.`data_inicio` as date) AS `dataInicio`,cast(`pe`.`data_fim` as date) AS `dataFim`,`pe`.`unidade_id` collate utf8mb4_unicode_ci AS `unidade_id`,`fn_obter_unidade_hierarquia`(`pe`.`unidade_id`) collate utf8mb4_unicode_ci AS `unidadeHierarquia`,`uni`.`sigla` collate utf8mb4_unicode_ci AS `unidadeSigla`,to_days(`pe`.`data_fim`) - to_days(`pe`.`data_inicio`) + 1 AS `duracao`,cast(`a`.`data_avaliacao` as date) AS `data_avaliacao`,json_unquote(`a`.`nota`) AS `nota`,case when `pe`.`status` = 'CANCELADO' or `pe`.`status` = 'SUSPENSO' then NULL else case when `a`.`data_avaliacao` is null then case when `scpe`.`created_at` is null or curdate() <= cast(`scpe`.`created_at` as date) + interval 30 day then 'Aguardando' else 'Atrasado' end else case when cast(`a`.`data_avaliacao` as date) <= cast(`scpe`.`created_at` as date) + interval 30 day then 'Registrado no período' else 'Registrado com atraso' end end end collate utf8mb4_unicode_ci AS `situacao_avaliacao`,case when `pe`.`status` = 'CANCELADO' or `pe`.`status` = 'SUSPENSO' then NULL else case when `scpe`.`created_at` is null then 'Pendente' else 'Registrado' end end collate utf8mb4_unicode_ci AS `situacao_conclusao`,cast(`spe`.`created_at` as date) AS `data_homologacao`,cast(`scpe`.`created_at` as date) AS `data_conclusao` from ((((`planos_entregas` `pe` join `unidades` `uni` on(`uni`.`id` = `pe`.`unidade_id`)) left join `avaliacoes` `a` on(`a`.`id` = `pe`.`avaliacao_id` and `a`.`deleted_at` is null)) left join `status_homolog_pe` `spe` on(`spe`.`plano_entrega_id` = `pe`.`id` and `spe`.`rn` = 1)) left join `status_concluido_pe` `scpe` on(`scpe`.`plano_entrega_id` = `pe`.`id` and `scpe`.`rn` = 1)) where `pe`.`deleted_at` is null */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_relatorio_plano_trabalho`
--

/*!50001 DROP VIEW IF EXISTS `view_relatorio_plano_trabalho`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_relatorio_plano_trabalho` AS select `pt`.`id` collate utf8mb4_unicode_ci AS `id`,`pt`.`id` collate utf8mb4_unicode_ci AS `plano_trabalho_id`,`pt`.`numero` collate utf8mb4_unicode_ci AS `numero`,`pt`.`status` collate utf8mb4_unicode_ci AS `status`,cast(`pt`.`data_inicio` as date) AS `dataInicio`,cast(`pt`.`data_fim` as date) AS `dataFim`,`pt`.`unidade_id` collate utf8mb4_unicode_ci AS `unidade_id`,`usu`.`nome` collate utf8mb4_unicode_ci AS `participanteNome`,`fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) collate utf8mb4_unicode_ci AS `unidadeHierarquia`,`uni`.`sigla` collate utf8mb4_unicode_ci AS `unidadeSigla`,`pt`.`modalidade_pgd` collate utf8mb4_unicode_ci AS `modalidade_pgd`,`pt`.`modalidade_pgd` collate utf8mb4_unicode_ci AS `tipo_modalidade_id`,case when `pt`.`modalidade_pgd` is null or `pt`.`modalidade_pgd` = '' then 'Não definida' when lcase(`pt`.`modalidade_pgd`) = 'presencial' then 'Presencial' when lcase(`pt`.`modalidade_pgd`) = 'parcial' then 'Teletrabalho (Parcial)' when lcase(`pt`.`modalidade_pgd`) = 'integral' then 'Teletrabalho (Integral)' when lcase(`pt`.`modalidade_pgd`) = 'no exterior substituicao' then 'Teletrabalho no exterior (substituição)' when lcase(`pt`.`modalidade_pgd`) = 'no exterior' then 'Teletrabalho no exterior' else `pt`.`modalidade_pgd` end collate utf8mb4_unicode_ci AS `tipoModalidadeNome`,to_days(`pt`.`data_fim`) - to_days(`pt`.`data_inicio`) + 1 AS `duracao`,coalesce((select sum(coalesce(`pte`.`forca_trabalho`,0) * 1) from `planos_trabalhos_entregas` `pte` where `pte`.`plano_trabalho_id` = `pt`.`id` and `pte`.`deleted_at` is null),0) AS `chd`,(select count(0) from `planos_trabalhos_consolidacoes` `ptc` where `ptc`.`plano_trabalho_id` = `pt`.`id` and `ptc`.`deleted_at` is null) AS `qtdePeriodosAvaliativos` from ((`planos_trabalhos` `pt` join `usuarios` `usu` on(`usu`.`id` = `pt`.`usuario_id`)) join `unidades` `uni` on(`uni`.`id` = `pt`.`unidade_id`)) where `pt`.`deleted_at` is null */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_relatorio_plano_trabalho_detalhado`
--

/*!50001 DROP VIEW IF EXISTS `view_relatorio_plano_trabalho_detalhado`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_relatorio_plano_trabalho_detalhado` AS select `ptc`.`id` collate utf8mb4_unicode_ci AS `id`,`pt`.`id` collate utf8mb4_unicode_ci AS `plano_trabalho_id`,`pt`.`numero` collate utf8mb4_unicode_ci AS `numero`,`pt`.`status` collate utf8mb4_unicode_ci AS `status`,cast(`pt`.`data_inicio` as date) AS `dataInicio`,cast(`pt`.`data_fim` as date) AS `dataFim`,`pt`.`unidade_id` collate utf8mb4_unicode_ci AS `unidade_id`,`usu`.`nome` collate utf8mb4_unicode_ci AS `participanteNome`,`fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) collate utf8mb4_unicode_ci AS `unidadeHierarquia`,`uni`.`sigla` collate utf8mb4_unicode_ci AS `unidadeSigla`,`pt`.`modalidade_pgd` collate utf8mb4_unicode_ci AS `modalidade_pgd`,`pt`.`modalidade_pgd` collate utf8mb4_unicode_ci AS `tipo_modalidade_id`,case when `pt`.`modalidade_pgd` is null or `pt`.`modalidade_pgd` = '' then 'Não definida' when lcase(`pt`.`modalidade_pgd`) = 'presencial' then 'Presencial' when lcase(`pt`.`modalidade_pgd`) = 'parcial' then 'Teletrabalho (Parcial)' when lcase(`pt`.`modalidade_pgd`) = 'integral' then 'Teletrabalho (Integral)' when lcase(`pt`.`modalidade_pgd`) = 'no exterior substituicao' then 'Teletrabalho no exterior (substituição)' when lcase(`pt`.`modalidade_pgd`) = 'no exterior' then 'Teletrabalho no exterior' else `pt`.`modalidade_pgd` end collate utf8mb4_unicode_ci AS `tipoModalidadeNome`,to_days(`pt`.`data_fim`) - to_days(`pt`.`data_inicio`) + 1 AS `duracao`,ifnull((select sum(ifnull(`pte`.`forca_trabalho`,0) * 1) from `planos_trabalhos_entregas` `pte` where `pte`.`plano_trabalho_id` = `pt`.`id` and `pte`.`deleted_at` is null),0) AS `chd`,cast(`ptc`.`data_inicio` as date) AS `data_inicio_avaliativo`,cast(`ptc`.`data_fim` as date) AS `data_fim_avaliativo`,cast(`ptc`.`data_conclusao` as date) AS `data_conclusao`,cast(`aval_antiga`.`data_avaliacao` as date) AS `data_avaliacao`,json_unquote(`aval_antiga`.`nota`) AS `nota`,`aval_antiga`.`data_recurso` AS `data_recurso`,case when `a`.`id` = `aval_antiga`.`id` then NULL else cast(`a`.`data_avaliacao` as date) end AS `data_reavaliacao`,case when `a`.`id` = `aval_antiga`.`id` then NULL else json_unquote(`a`.`nota`) end AS `nota_reavaliacao`,case when `pt`.`status` = 'CANCELADO' then NULL else case when `ptc`.`data_conclusao` is null then case when curdate() <= cast(`ptc`.`data_fim` as date) + interval 10 day then 'Aguardando' else 'Atrasado' end else case when cast(`ptc`.`data_conclusao` as date) <= cast(`ptc`.`data_fim` as date) + interval 10 day then 'Registrado no período' else 'Registrado com atraso' end end end collate utf8mb4_unicode_ci AS `situacao_execucao`,case when `pt`.`status` = 'CANCELADO' then NULL else case when `a`.`data_avaliacao` is null then case when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day then 'Aguardando' else 'Atrasado' end else case when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day then 'Registrado no período' else 'Registrado com atraso' end end end collate utf8mb4_unicode_ci AS `situacao_avaliacao` from (((((`planos_trabalhos` `pt` join `usuarios` `usu` on(`usu`.`id` = `pt`.`usuario_id`)) join `unidades` `uni` on(`uni`.`id` = `pt`.`unidade_id`)) left join `planos_trabalhos_consolidacoes` `ptc` on(`ptc`.`plano_trabalho_id` = `pt`.`id` and `ptc`.`deleted_at` is null)) left join `avaliacoes` `a` on(`a`.`id` = `ptc`.`avaliacao_id` and `a`.`deleted_at` is null)) left join (select `a1`.`id` AS `id`,`a1`.`data_avaliacao` AS `data_avaliacao`,`a1`.`nota` AS `nota`,`a1`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,`a1`.`data_recurso` AS `data_recurso`,`a1`.`rn` AS `rn` from (select `avaliacoes`.`id` AS `id`,`avaliacoes`.`data_avaliacao` AS `data_avaliacao`,`avaliacoes`.`nota` AS `nota`,`avaliacoes`.`data_recurso` AS `data_recurso`,`avaliacoes`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,row_number() over ( partition by `avaliacoes`.`plano_trabalho_consolidacao_id` order by `avaliacoes`.`data_avaliacao`) AS `rn` from `avaliacoes` where `avaliacoes`.`deleted_at` is null group by `avaliacoes`.`id`,`avaliacoes`.`data_avaliacao`,`avaliacoes`.`nota`,`avaliacoes`.`data_recurso`,`avaliacoes`.`plano_trabalho_consolidacao_id`) `a1` where `a1`.`rn` = 1) `aval_antiga` on(`aval_antiga`.`plano_trabalho_consolidacao_id` = `ptc`.`id`)) where `pt`.`deleted_at` is null */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_relatorio_unidades`
--

/*!50001 DROP VIEW IF EXISTS `view_relatorio_unidades`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_relatorio_unidades` AS with chefias as (select `ui`.`unidade_id` AS `unidade_id`,`ui`.`usuario_id` AS `usuario_id` from (`unidades_integrantes` `ui` join `unidades_integrantes_atribuicoes` `uia` on(`uia`.`unidade_integrante_id` = `ui`.`id` and `uia`.`deleted_at` is null and `uia`.`atribuicao` collate utf8mb4_unicode_ci = 'GESTOR')) where `ui`.`deleted_at` is null), contadores as (select `ui`.`unidade_id` AS `unidade_id`,count(distinct `ui`.`usuario_id`) AS `totalAgentes`,sum(case when `uia`.`atribuicao` collate utf8mb4_unicode_ci = 'GESTOR_SUBSTITUTO' then 1 else 0 end) AS `totalSubstitutos`,sum(case when `uia`.`atribuicao` collate utf8mb4_unicode_ci = 'GESTOR_DELEGADO' then 1 else 0 end) AS `totalDelegados`,sum(case when `uia`.`atribuicao` collate utf8mb4_unicode_ci = 'COLABORADOR' then 1 else 0 end) AS `totalVinculados` from (`unidades_integrantes` `ui` left join `unidades_integrantes_atribuicoes` `uia` on(`uia`.`unidade_integrante_id` = `ui`.`id` and `uia`.`deleted_at` is null)) where `ui`.`deleted_at` is null and `uia`.`atribuicao` is not null group by `ui`.`unidade_id`)select distinct `uni`.`id` collate utf8mb4_unicode_ci AS `id`,`uni`.`id` collate utf8mb4_unicode_ci AS `unidade_id`,`fn_obter_unidade_hierarquia`(`uni`.`id`) collate utf8mb4_unicode_ci AS `unidadeHierarquia`,`uni`.`nome` collate utf8mb4_unicode_ci AS `nome`,`uni`.`sigla` collate utf8mb4_unicode_ci AS `sigla`,`uni`.`codigo` collate utf8mb4_unicode_ci AS `codigo`,case when `uni`.`instituidora` = 1 then 'Instituidora' collate utf8mb4_unicode_ci else 'Executora' collate utf8mb4_unicode_ci end AS `tipo`,`chefia`.`id` collate utf8mb4_unicode_ci AS `chefiaId`,`chefia`.`nome` collate utf8mb4_unicode_ci AS `chefiaNome`,`contadores`.`totalVinculados` AS `totalVinculados`,`contadores`.`totalSubstitutos` AS `totalSubstitutos`,`contadores`.`totalDelegados` AS `totalDelegados` from (((`unidades` `uni` left join `chefias` on(`chefias`.`unidade_id` = `uni`.`id`)) left join `usuarios` `chefia` on(`chefia`.`id` = `chefias`.`usuario_id`)) left join `contadores` on(`contadores`.`unidade_id` = `uni`.`id`)) where `uni`.`deleted_at` is null order by `uni`.`id` collate utf8mb4_unicode_ci */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_pgd_planos_entrega`
--

/*!50001 DROP VIEW IF EXISTS `vw_pgd_planos_entrega`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_pgd_planos_entrega` AS select distinct `planos_entregas`.`id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,NULL AS `json_audit`,1 AS `fonte` from `planos_entregas` where `planos_entregas`.`deleted_at` is null and `planos_entregas`.`data_envio_api_pgd` is null and `planos_entregas`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') union all select distinct `t7`.`id` AS `id`,`t7`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t7`.`json_audit` AS `json_audit`,2 AS `fonte` from (select `d`.`id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `planos_entregas` `d` on(`a`.`auditable_id` = `d`.`id`)) join `programas` `p` on(`p`.`id` = `d`.`programa_id`)) where `a`.`auditable_type` = 'App\\Models\\PlanoEntrega' and `a`.`enviado` = 0 and `d`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `d`.`deleted_at` is null and `p`.`deleted_at` is null and `d`.`data_envio_api_pgd` is not null group by `d`.`id`) `t7` union all select distinct `t8`.`id` AS `id`,`t8`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t8`.`json_audit` AS `json_audit`,3 AS `fonte` from (select `d`.`plano_entrega_id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from (((`audits` `a` join `planos_entregas_entregas` `d` on(`a`.`auditable_id` = `d`.`id`)) join `planos_entregas` `pe` on(`pe`.`id` = `d`.`plano_entrega_id`)) join `programas` `p` on(`p`.`id` = `pe`.`programa_id`)) where `a`.`auditable_type` = 'App\\Models\\PlanoEntregaEntrega' and `a`.`enviado` = 0 and `d`.`deleted_at` is null and `pe`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `pe`.`data_envio_api_pgd` is not null and `p`.`deleted_at` is null group by `d`.`plano_entrega_id`) `t8` union all select distinct `t9`.`id` AS `id`,`t9`.`tipo` collate utf8mb4_unicode_ci AS `tipo`,`t9`.`json_audit` AS `json_audit`,4 AS `fonte` from (select `pe`.`id` AS `id`,'entrega' collate utf8mb4_unicode_ci AS `tipo`,json_arrayagg(`a`.`id`) AS `json_audit` from ((`audits` `a` join `avaliacoes` `ava` on(`ava`.`id` = `a`.`auditable_id`)) join `planos_entregas` `pe` on(`pe`.`id` = `ava`.`plano_entrega_id`)) where `a`.`auditable_type` = 'App\\Models\\Avaliacao' and `a`.`enviado` = 0 and `pe`.`deleted_at` is null and `pe`.`status` in ('ATIVO','CONCLUIDO','AVALIADO') and `pe`.`data_envio_api_pgd` is not null group by `pe`.`id`) `t9` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_pgd_usuarios`
--

/*!50001 DROP VIEW IF EXISTS `vw_pgd_usuarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
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
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-05-07 19:50:07
