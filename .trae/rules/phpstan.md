Ao finalizar a implementação de um código, deve-se rodar o comando `docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Models --configuration=phpstan.neon.dist --memory-limit=1G"` nos arquivos modificados.
Isso é necessário para garantir que o código esteja seguindo as boas práticas de tipagem e segurança.
use como referencia o documento `back-end/docs/phpstan.md`.
Valido para alterações na pasta `back-end/`	