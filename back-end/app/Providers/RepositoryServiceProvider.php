<?php

declare(strict_types=1);

namespace App\Providers;

use App\Repository\PlanoEntregaEntrega\Contracts\PlanoEntregaEntregaReadRepositoryContract;
use App\Repository\PlanoEntregaEntrega\Contracts\PlanoEntregaEntregaWriteRepositoryContract;
use App\Repository\PlanoEntregaEntrega\Eloquent\EloquentPlanoEntregaEntregaReadRepository;
use App\Repository\PlanoEntregaEntrega\Eloquent\EloquentPlanoEntregaEntregaWriteRepository;
use App\Repository\PlanoEntregaEntregaProgresso\Contracts\PlanoEntregaEntregaProgressoReadRepositoryContract;
use App\Repository\PlanoEntregaEntregaProgresso\Eloquent\EloquentPlanoEntregaEntregaProgressoReadRepository;
use App\Repository\Afastamento\Contracts\AfastamentoReadRepositoryContract;

use App\Repository\Afastamento\Contracts\AfastamentoWriteRepositoryContract;
use App\Repository\Feriado\Contracts\FeriadoReadRepositoryContract;
use App\Repository\Feriado\Eloquent\EloquentFeriadoReadRepository;

use App\Repository\Afastamento\Eloquent\EloquentAfastamentoReadRepository;

use App\Repository\Afastamento\Eloquent\EloquentAfastamentoWriteRepository;

use App\Repository\Atividade\Contracts\AtividadeReadRepositoryContract;

use App\Repository\Atividade\Contracts\AtividadeWriteRepositoryContract;

use App\Repository\Atividade\Eloquent\EloquentAtividadeReadRepository;

use App\Repository\Atividade\Eloquent\EloquentAtividadeWriteRepository;

use App\Repository\Avaliacao\Contracts\AvaliacaoReadRepositoryContract;

use App\Repository\Avaliacao\Contracts\AvaliacaoWriteRepositoryContract;

use App\Repository\Avaliacao\Eloquent\EloquentAvaliacaoReadRepository;

use App\Repository\Avaliacao\Eloquent\EloquentAvaliacaoWriteRepository;

use App\Repository\Documento\Contracts\DocumentoReadRepositoryContract;

use App\Repository\Documento\Contracts\DocumentoWriteRepositoryContract;

use App\Repository\Documento\Eloquent\EloquentDocumentoReadRepository;

use App\Repository\Documento\Eloquent\EloquentDocumentoWriteRepository;

use App\Repository\DocumentoAssinatura\Contracts\DocumentoAssinaturaReadRepositoryContract;

use App\Repository\DocumentoAssinatura\Contracts\DocumentoAssinaturaWriteRepositoryContract;

use App\Repository\DocumentoAssinatura\Eloquent\EloquentDocumentoAssinaturaReadRepository;

use App\Repository\DocumentoAssinatura\Eloquent\EloquentDocumentoAssinaturaWriteRepository;

use App\Repository\Entidade\Contracts\EntidadeReadRepositoryContract;

use App\Repository\Entidade\Contracts\EntidadeWriteRepositoryContract;

use App\Repository\Entidade\Eloquent\EloquentEntidadeReadRepository;

use App\Repository\Entidade\Eloquent\EloquentEntidadeWriteRepository;

use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;

use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorWriteRepositoryContract;

use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorReadRepository;

use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorWriteRepository;

use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeReadRepositoryContract;

use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeWriteRepositoryContract;

use App\Repository\IntegracaoUnidade\Eloquent\EloquentIntegracaoUnidadeReadRepository;

use App\Repository\IntegracaoUnidade\Eloquent\EloquentIntegracaoUnidadeWriteRepository;

use App\Repository\Perfil\Contracts\PerfilReadRepositoryContract;

use App\Repository\Perfil\Eloquent\EloquentPerfilReadRepository;

use App\Repository\PlanoEntrega\Contracts\PlanoEntregaReadRepositoryContract;

use App\Repository\PlanoEntrega\Contracts\PlanoEntregaWriteRepositoryContract;

use App\Repository\PlanoEntrega\Eloquent\EloquentPlanoEntregaReadRepository;

use App\Repository\PlanoEntrega\Eloquent\EloquentPlanoEntregaWriteRepository;

use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;

use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;

use App\Repository\PlanoTrabalho\Eloquent\EloquentPlanoTrabalhoReadRepository;

use App\Repository\PlanoTrabalho\Eloquent\EloquentPlanoTrabalhoWriteRepository;

use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoReadRepositoryContract;

use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoWriteRepositoryContract;

use App\Repository\PlanoTrabalhoConsolidacao\Eloquent\EloquentPlanoTrabalhoConsolidacaoReadRepository;

use App\Repository\PlanoTrabalhoConsolidacao\Eloquent\EloquentPlanoTrabalhoConsolidacaoWriteRepository;

use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaReadRepositoryContract;

use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaWriteRepositoryContract;

use App\Repository\PlanoTrabalhoEntrega\Eloquent\EloquentPlanoTrabalhoEntregaReadRepository;

use App\Repository\PlanoTrabalhoEntrega\Eloquent\EloquentPlanoTrabalhoEntregaWriteRepository;
use App\Repository\Tenant\Contracts\TenantReadRepositoryContract;
use App\Repository\Tenant\Contracts\TenantWriteRepositoryContract;
use App\Repository\Tenant\Eloquent\EloquentTenantReadRepository;
use App\Repository\Tenant\Eloquent\EloquentTenantWriteRepository;

use App\Repository\Programa\Contracts\ProgramaReadRepositoryContract;

use App\Repository\Programa\Contracts\ProgramaWriteRepositoryContract;

use App\Repository\Programa\Eloquent\EloquentProgramaReadRepository;

use App\Repository\Programa\Eloquent\EloquentProgramaWriteRepository;

use App\Repository\RelatorioAgente\Contracts\RelatorioAgenteReadRepositoryContract;
use App\Repository\EnvioUsuario\Contracts\EnvioUsuarioReadRepositoryContract;
use App\Repository\EnvioUsuario\Eloquent\EloquentEnvioUsuarioReadRepository;
use App\Repository\EnvioPlanoEntrega\Contracts\EnvioPlanoEntregaReadRepositoryContract;
use App\Repository\EnvioPlanoEntrega\Eloquent\EloquentEnvioPlanoEntregaReadRepository;
use App\Repository\RelatorioEntrega\Contracts\RelatorioEntregaReadRepositoryContract;
use App\Repository\RelatorioEntrega\Eloquent\EloquentRelatorioEntregaReadRepository;
use App\Repository\EnvioPlanoTrabalho\Contracts\EnvioPlanoTrabalhoReadRepositoryContract;
use App\Repository\EnvioPlanoTrabalho\Eloquent\EloquentEnvioPlanoTrabalhoReadRepository;
use App\Repository\Sipec\SipecUnidade\Contracts\SipecUnidadeReadRepositoryContract;
use App\Repository\Sipec\SipecUnidade\Contracts\SipecUnidadeWriteRepositoryContract;
use App\Repository\Sipec\SipecUnidade\Eloquent\EloquentSipecUnidadeReadRepository;
use App\Repository\Sipec\SipecUnidade\Eloquent\EloquentSipecUnidadeWriteRepository;
use App\Repository\Sipec\SipecServidor\Contracts\SipecServidorReadRepositoryContract;
use App\Repository\Sipec\SipecServidor\Contracts\SipecServidorWriteRepositoryContract;
use App\Repository\Sipec\SipecServidor\Eloquent\EloquentSipecServidorReadRepository;
use App\Repository\Sipec\SipecServidor\Eloquent\EloquentSipecServidorWriteRepository;
use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoReadRepositoryContract;
use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoWriteRepositoryContract;
use App\Repository\Sipec\SipecBuscaHistorico\Eloquent\EloquentSipecBuscaHistoricoReadRepository;
use App\Repository\Sipec\SipecBuscaHistorico\Eloquent\EloquentSipecBuscaHistoricoWriteRepository;
use App\Repository\Sipec\SipecSyncCheckpoint\Contracts\SipecSyncCheckpointReadRepositoryContract;
use App\Repository\Sipec\SipecSyncCheckpoint\Contracts\SipecSyncCheckpointWriteRepositoryContract;
use App\Repository\Sipec\SipecSyncCheckpoint\Eloquent\EloquentSipecSyncCheckpointReadRepository;
use App\Repository\Sipec\SipecSyncCheckpoint\Eloquent\EloquentSipecSyncCheckpointWriteRepository;
use App\Repository\MuralAviso\Contracts\MuralAvisoReadRepositoryContract;
use App\Repository\MuralAviso\Contracts\MuralAvisoWriteRepositoryContract;
use App\Repository\MuralAviso\Eloquent\EloquentMuralAvisoReadRepository;
use App\Repository\MuralAviso\Eloquent\EloquentMuralAvisoWriteRepository;
use App\Repository\MuralAvisoLeitura\Contracts\MuralAvisoLeituraReadRepositoryContract;
use App\Repository\MuralAvisoLeitura\Contracts\MuralAvisoLeituraWriteRepositoryContract;
use App\Repository\MuralAvisoLeitura\Eloquent\EloquentMuralAvisoLeituraReadRepository;
use App\Repository\MuralAvisoLeitura\Eloquent\EloquentMuralAvisoLeituraWriteRepository;

use App\Repository\RelatorioAgente\Eloquent\EloquentRelatorioAgenteReadRepository;
use App\Repository\CargaIndividualSiapeRelatorio\Contracts\CargaIndividualSiapeRelatorioReadRepositoryContract;
use App\Repository\CargaIndividualSiapeRelatorio\Contracts\CargaIndividualSiapeRelatorioWriteRepositoryContract;
use App\Repository\CargaIndividualSiapeRelatorio\Eloquent\EloquentCargaIndividualSiapeRelatorioReadRepository;
use App\Repository\CargaIndividualSiapeRelatorio\Eloquent\EloquentCargaIndividualSiapeRelatorioWriteRepository;

use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorReadRepositoryContract;


use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorWriteRepositoryContract;

use App\Repository\SiapeBlackListServidor\Eloquent\EloquentSiapeBlackListServidorReadRepository;
use App\Repository\SiapeBlackListServidor\Eloquent\EloquentSiapeBlackListServidorWriteRepository;
use App\Repository\SiapeBlacklistUnidade\Contracts\SiapeBlacklistUnidadeReadRepositoryContract;
use App\Repository\SiapeBlacklistUnidade\Contracts\SiapeBlacklistUnidadeWriteRepositoryContract;
use App\Repository\SiapeBlacklistUnidade\Eloquent\EloquentSiapeBlacklistUnidadeReadRepository;
use App\Repository\SiapeBlacklistUnidade\Eloquent\EloquentSiapeBlacklistUnidadeWriteRepository;
use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisReadRepositoryContract;
use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisWriteRepositoryContract;
use App\Repository\SiapeConsultaDadosFuncionais\Eloquent\EloquentSiapeConsultaDadosFuncionaisReadRepository;
use App\Repository\SiapeConsultaDadosFuncionais\Eloquent\EloquentSiapeConsultaDadosFuncionaisWriteRepository;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisReadRepositoryContract;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisWriteRepositoryContract;
use App\Repository\SiapeConsultaDadosPessoais\Eloquent\EloquentSiapeConsultaDadosPessoaisReadRepository;
use App\Repository\SiapeConsultaDadosPessoais\Eloquent\EloquentSiapeConsultaDadosPessoaisWriteRepository;
use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGReadRepositoryContract;
use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGWriteRepositoryContract;
use App\Repository\SiapeDadosUORG\Eloquent\EloquentSiapeDadosUORGReadRepository;
use App\Repository\SiapeDadosUORG\Eloquent\EloquentSiapeDadosUORGWriteRepository;
use App\Repository\SiapeListaUORGS\Contracts\SiapeListaUORGSReadRepositoryContract;
use App\Repository\SiapeListaUORGS\Contracts\SiapeListaUORGSWriteRepositoryContract;
use App\Repository\SiapeListaUORGS\Eloquent\EloquentSiapeListaUORGSReadRepository;
use App\Repository\SiapeListaUORGS\Eloquent\EloquentSiapeListaUORGSWriteRepository;
use App\Repository\StatusJustificativa\Contracts\StatusJustificativaReadRepositoryContract;
use App\Repository\StatusJustificativa\Contracts\StatusJustificativaWriteRepositoryContract;
use App\Repository\StatusJustificativa\Eloquent\EloquentStatusJustificativaReadRepository;
use App\Repository\StatusJustificativa\Eloquent\EloquentStatusJustificativaWriteRepository;
use App\Repository\TipoModalidade\Contracts\TipoModalidadeReadRepositoryContract;
use App\Repository\TipoModalidade\Eloquent\EloquentTipoModalidadeReadRepository;
use App\Repository\TipoMotivoAfastamento\Contracts\TipoMotivoAfastamentoReadRepositoryContract;
use App\Repository\TipoMotivoAfastamento\Eloquent\EloquentTipoMotivoAfastamentoReadRepository;
use App\Repository\TipoPlanejamentoObjetivo\Contracts\TipoPlanejamentoObjetivoReadRepositoryContract;
use App\Repository\TipoPlanejamentoObjetivo\Contracts\TipoPlanejamentoObjetivoWriteRepositoryContract;
use App\Repository\TipoPlanejamentoObjetivo\Eloquent\EloquentTipoPlanejamentoObjetivoReadRepository;
use App\Repository\TipoPlanejamentoObjetivo\Eloquent\EloquentTipoPlanejamentoObjetivoWriteRepository;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
use App\Repository\PlanejamentoObjetivo\Eloquent\EloquentPlanejamentoObjetivoReadRepository;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\Repository\CadeiaValor\Eloquent\EloquentCadeiaValorReadRepository;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;
use App\Repository\Unidade\Eloquent\EloquentUnidadeReadRepository;
use App\Repository\Unidade\Eloquent\EloquentUnidadeWriteRepository;
use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteReadRepositoryContract;
use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteWriteRepositoryContract;
use App\Repository\UnidadeIntegrante\Eloquent\EloquentUnidadeIntegranteReadRepository;
use App\Repository\UnidadeIntegrante\Eloquent\EloquentUnidadeIntegranteWriteRepository;
use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoReadRepositoryContract;
use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoWriteRepositoryContract;
use App\Repository\UnidadeIntegranteAtribuicao\Eloquent\EloquentUnidadeIntegranteAtribuicaoReadRepository;
use App\Repository\UnidadeIntegranteAtribuicao\Eloquent\EloquentUnidadeIntegranteAtribuicaoWriteRepository;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;
use App\Repository\Usuario\Eloquent\EloquentUsuarioReadRepository;
use App\Repository\Usuario\Eloquent\EloquentUsuarioWriteRepository;
use Illuminate\Support\ServiceProvider;

final class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            IntegracaoServidorReadRepositoryContract::class,
            EloquentIntegracaoServidorReadRepository::class,
        );

        $this->app->bind(
            IntegracaoServidorWriteRepositoryContract::class,
            EloquentIntegracaoServidorWriteRepository::class,
        );

        $this->app->bind(
            PlanoTrabalhoConsolidacaoReadRepositoryContract::class,
            EloquentPlanoTrabalhoConsolidacaoReadRepository::class,
        );
        $this->app->bind(
            PlanoTrabalhoConsolidacaoWriteRepositoryContract::class,
            EloquentPlanoTrabalhoConsolidacaoWriteRepository::class,
        );

        $this->app->bind(
            UnidadeReadRepositoryContract::class,
            EloquentUnidadeReadRepository::class,
        );

        $this->app->bind(
            UnidadeWriteRepositoryContract::class,
            EloquentUnidadeWriteRepository::class,
        );

        $this->app->bind(
            UsuarioWriteRepositoryContract::class,
            EloquentUsuarioWriteRepository::class,
        );

        $this->app->bind(
            IntegracaoUnidadeReadRepositoryContract::class,
            EloquentIntegracaoUnidadeReadRepository::class,
        );
        $this->app->bind(
            IntegracaoUnidadeWriteRepositoryContract::class,
            EloquentIntegracaoUnidadeWriteRepository::class,
        );

        $this->app->bind(
            SiapeBlacklistUnidadeReadRepositoryContract::class,
            EloquentSiapeBlacklistUnidadeReadRepository::class,
        );

        $this->app->bind(
            SiapeBlacklistUnidadeWriteRepositoryContract::class,
            EloquentSiapeBlacklistUnidadeWriteRepository::class,
        );

        $this->app->bind(
            PerfilReadRepositoryContract::class,
            EloquentPerfilReadRepository::class,
        );

        $this->app->bind(
            TipoMotivoAfastamentoReadRepositoryContract::class,
            EloquentTipoMotivoAfastamentoReadRepository::class,
        );

        $this->app->bind(
            PlanoTrabalhoReadRepositoryContract::class,
            EloquentPlanoTrabalhoReadRepository::class,
        );
        $this->app->bind(
            PlanoTrabalhoWriteRepositoryContract::class,
            EloquentPlanoTrabalhoWriteRepository::class,
        );

        $this->app->bind(
            PlanoEntregaReadRepositoryContract::class,
            EloquentPlanoEntregaReadRepository::class,
        );
        $this->app->bind(
            PlanoEntregaWriteRepositoryContract::class,
            EloquentPlanoEntregaWriteRepository::class,
        );

        $this->app->bind(
            UsuarioReadRepositoryContract::class,
            EloquentUsuarioReadRepository::class,
        );


        $this->app->bind(
            EntidadeReadRepositoryContract::class,
            EloquentEntidadeReadRepository::class,
        );
        $this->app->bind(
            EntidadeWriteRepositoryContract::class,
            EloquentEntidadeWriteRepository::class,
        );

        $this->app->bind(
            SiapeConsultaDadosPessoaisReadRepositoryContract::class,
            EloquentSiapeConsultaDadosPessoaisReadRepository::class,
        );
        $this->app->bind(
            SiapeConsultaDadosPessoaisWriteRepositoryContract::class,
            EloquentSiapeConsultaDadosPessoaisWriteRepository::class,
        );

        $this->app->bind(
            SiapeConsultaDadosFuncionaisReadRepositoryContract::class,
            EloquentSiapeConsultaDadosFuncionaisReadRepository::class,
        );
        $this->app->bind(
            SiapeConsultaDadosFuncionaisWriteRepositoryContract::class,
            EloquentSiapeConsultaDadosFuncionaisWriteRepository::class,
        );

        $this->app->bind(
            SiapeListaUORGSReadRepositoryContract::class,
            EloquentSiapeListaUORGSReadRepository::class,
        );
        $this->app->bind(
            SiapeListaUORGSWriteRepositoryContract::class,
            EloquentSiapeListaUORGSWriteRepository::class,
        );

        $this->app->bind(
            SiapeDadosUORGReadRepositoryContract::class,
            EloquentSiapeDadosUORGReadRepository::class,
        );
        $this->app->bind(
            SiapeDadosUORGWriteRepositoryContract::class,
            EloquentSiapeDadosUORGWriteRepository::class,
        );

        $this->app->bind(
            SiapeBlackListServidorReadRepositoryContract::class,
            EloquentSiapeBlackListServidorReadRepository::class,
        );
        $this->app->bind(
            SiapeBlackListServidorWriteRepositoryContract::class,
            EloquentSiapeBlackListServidorWriteRepository::class,
        );

        $this->app->bind(
            UnidadeIntegranteReadRepositoryContract::class,
            EloquentUnidadeIntegranteReadRepository::class,
        );
        $this->app->bind(
            UnidadeIntegranteWriteRepositoryContract::class,
            EloquentUnidadeIntegranteWriteRepository::class,
        );

        $this->app->bind(
            UnidadeIntegranteAtribuicaoReadRepositoryContract::class,
            EloquentUnidadeIntegranteAtribuicaoReadRepository::class,
        );
        $this->app->bind(
            UnidadeIntegranteAtribuicaoWriteRepositoryContract::class,
            EloquentUnidadeIntegranteAtribuicaoWriteRepository::class,
        );

        $this->app->bind(
            TenantReadRepositoryContract::class,
            EloquentTenantReadRepository::class,
        );
        $this->app->bind(
            TenantWriteRepositoryContract::class,
            EloquentTenantWriteRepository::class,
        );

        $this->app->bind(
            ProgramaReadRepositoryContract::class,
            EloquentProgramaReadRepository::class,
        );
        $this->app->bind(
            ProgramaWriteRepositoryContract::class,
            EloquentProgramaWriteRepository::class,
        );

        $this->app->bind(
            PlanoTrabalhoEntregaReadRepositoryContract::class,
            EloquentPlanoTrabalhoEntregaReadRepository::class,
        );
        $this->app->bind(
            PlanoTrabalhoEntregaWriteRepositoryContract::class,
            EloquentPlanoTrabalhoEntregaWriteRepository::class,
        );

        $this->app->bind(
            DocumentoReadRepositoryContract::class,
            EloquentDocumentoReadRepository::class,
        );
        $this->app->bind(
            DocumentoWriteRepositoryContract::class,
            EloquentDocumentoWriteRepository::class,
        );

        $this->app->bind(
            DocumentoAssinaturaReadRepositoryContract::class,
            EloquentDocumentoAssinaturaReadRepository::class,
        );
        $this->app->bind(
            DocumentoAssinaturaWriteRepositoryContract::class,
            EloquentDocumentoAssinaturaWriteRepository::class,
        );

        $this->app->bind(
            StatusJustificativaReadRepositoryContract::class,
            EloquentStatusJustificativaReadRepository::class,
        );
        $this->app->bind(
            StatusJustificativaWriteRepositoryContract::class,
            EloquentStatusJustificativaWriteRepository::class,
        );

        $this->app->bind(
            AtividadeReadRepositoryContract::class,
            EloquentAtividadeReadRepository::class,
        );

        $this->app->bind(
            AtividadeWriteRepositoryContract::class,
            EloquentAtividadeWriteRepository::class,
        );

        $this->app->bind(
            AvaliacaoReadRepositoryContract::class,
            EloquentAvaliacaoReadRepository::class,
        );
        $this->app->bind(
            AvaliacaoWriteRepositoryContract::class,
            EloquentAvaliacaoWriteRepository::class,
        );

        $this->app->bind(
            RelatorioAgenteReadRepositoryContract::class,
            EloquentRelatorioAgenteReadRepository::class,
        );

        $this->app->bind(
            AfastamentoReadRepositoryContract::class,
            EloquentAfastamentoReadRepository::class,
        );

        $this->app->bind(
            AfastamentoWriteRepositoryContract::class,
            EloquentAfastamentoWriteRepository::class,
        );

        $this->app->bind(
            CargaIndividualSiapeRelatorioReadRepositoryContract::class,
            EloquentCargaIndividualSiapeRelatorioReadRepository::class,
        );

        $this->app->bind(
            CargaIndividualSiapeRelatorioWriteRepositoryContract::class,
            EloquentCargaIndividualSiapeRelatorioWriteRepository::class,
        );

        $this->app->bind(
            TipoPlanejamentoObjetivoReadRepositoryContract::class,
            EloquentTipoPlanejamentoObjetivoReadRepository::class,
        );

        $this->app->bind(
            TipoPlanejamentoObjetivoWriteRepositoryContract::class,
            EloquentTipoPlanejamentoObjetivoWriteRepository::class,
        );

        $this->app->bind(
            PlanejamentoObjetivoReadRepositoryContract::class,
            EloquentPlanejamentoObjetivoReadRepository::class,
        );

        $this->app->bind(
            CadeiaValorReadRepositoryContract::class,
            EloquentCadeiaValorReadRepository::class,
        );

        $this->app->bind(
            EnvioUsuarioReadRepositoryContract::class,
            EloquentEnvioUsuarioReadRepository::class,
        );

        $this->app->bind(
            EnvioPlanoEntregaReadRepositoryContract::class,
            EloquentEnvioPlanoEntregaReadRepository::class,
        );

        $this->app->bind(
            EnvioPlanoTrabalhoReadRepositoryContract::class,
            EloquentEnvioPlanoTrabalhoReadRepository::class,
        );

        $this->app->bind(
            SipecUnidadeReadRepositoryContract::class,
            EloquentSipecUnidadeReadRepository::class,
        );
        $this->app->bind(
            SipecUnidadeWriteRepositoryContract::class,
            EloquentSipecUnidadeWriteRepository::class,
        );

        $this->app->bind(
            SipecServidorReadRepositoryContract::class,
            EloquentSipecServidorReadRepository::class,
        );
        $this->app->bind(
            SipecServidorWriteRepositoryContract::class,
            EloquentSipecServidorWriteRepository::class,
        );

        $this->app->bind(
            SipecSyncCheckpointReadRepositoryContract::class,
            EloquentSipecSyncCheckpointReadRepository::class,
        );
        $this->app->bind(
            SipecSyncCheckpointWriteRepositoryContract::class,
            EloquentSipecSyncCheckpointWriteRepository::class,
        );

        $this->app->bind(
            SipecBuscaHistoricoReadRepositoryContract::class,
            EloquentSipecBuscaHistoricoReadRepository::class,
        );
        $this->app->bind(
            SipecBuscaHistoricoWriteRepositoryContract::class,
            EloquentSipecBuscaHistoricoWriteRepository::class,
        );
        $this->app->bind(
            RelatorioEntregaReadRepositoryContract::class,
            EloquentRelatorioEntregaReadRepository::class,
        );

        $this->app->bind(
            FeriadoReadRepositoryContract::class,
            EloquentFeriadoReadRepository::class,
        );


        $this->app->bind(
            PlanoEntregaEntregaReadRepositoryContract::class,
            EloquentPlanoEntregaEntregaReadRepository::class,
        );
        $this->app->bind(
            PlanoEntregaEntregaWriteRepositoryContract::class,
            EloquentPlanoEntregaEntregaWriteRepository::class,
        );
        $this->app->bind(
            PlanoEntregaEntregaProgressoReadRepositoryContract::class,
            EloquentPlanoEntregaEntregaProgressoReadRepository::class,
        );

        $this->app->bind(
            MuralAvisoReadRepositoryContract::class,
            EloquentMuralAvisoReadRepository::class,
        );
        $this->app->bind(
            MuralAvisoWriteRepositoryContract::class,
            EloquentMuralAvisoWriteRepository::class,
        );
        $this->app->bind(
            MuralAvisoLeituraReadRepositoryContract::class,
            EloquentMuralAvisoLeituraReadRepository::class,
        );
        $this->app->bind(
            MuralAvisoLeituraWriteRepositoryContract::class,
            EloquentMuralAvisoLeituraWriteRepository::class,
        );
    }

    public function boot(): void
    {
    }
}
