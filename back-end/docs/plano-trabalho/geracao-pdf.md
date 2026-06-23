# Geração de PDF a partir de documentos Markdown

## Comando

```bash
pandoc <arquivo>.md -o <arquivo>.pdf \
  --pdf-engine=pdflatex \
  -V geometry:margin=2cm \
  -H docs/plano-trabalho/latex-header.tex
```

## Arquivo de cabeçalho LaTeX

O arquivo `docs/plano-trabalho/latex-header.tex` deve ser incluído via `-H` para garantir:

- Quebra de linha em blocos de código (evita texto sangrando fora da página)
- Suporte a syntax highlighting com wrapping

## Linguagens suportadas para code blocks

| Linguagem | Uso |
|-----------|-----|
| `javascript` | JSON com comentários (`//`) |
| `json` | JSON puro |
| `php` | Código PHP |
| `sql` | Queries SQL |
| `bash` | Comandos de terminal |
| (sem tag) | Diagramas ASCII, texto genérico |

## Restrições do pdflatex

- **Não usar** caracteres Unicode de box-drawing (`─`, `│`, `┌`, `└`, etc.) em blocos de código
- Usar ASCII puro para diagramas: `|`, `-`, `+`
- Acentos no texto normal funcionam normalmente
