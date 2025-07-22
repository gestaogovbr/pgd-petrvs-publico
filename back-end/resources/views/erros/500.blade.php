<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Erro 500 - Erro interno do servidor</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #f8f9fa;
    }

    .error-container {
      margin-top: 10%;
    }

    .error-icon {
      font-size: 5rem;
      color: #dc3545;
    }
  </style>
</head>
<body>
  <div class="container text-center error-container">
    <div class="error-icon mb-4">
      <i class="bi bi-x-circle-fill"></i> {{-- Se usar Bootstrap Icons --}}
      {{-- Ou use um emoji: ❌ --}}
    </div>
    <h1 class="display-4 text-danger">Erro 500</h1>
    <p class="lead">Ocorreu um erro interno no servidor.</p>
    <p class="text-muted">Tente novamente mais tarde ou entre em contato com o suporte técnico. <a href="https://portaldeservicos.gestao.gov.br/pt#/" target="_blank">Central de Atendimento</a></p>
    <a href="{{ url('/') }}" class="btn btn-primary mt-3">Voltar à página inicial</a>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Bootstrap Icons (opcional) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
</body>
</html>
