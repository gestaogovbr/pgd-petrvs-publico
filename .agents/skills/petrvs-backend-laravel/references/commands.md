# Petrvs Commands Reference

All backend commands run inside `petrvs_php`:

```bash
docker exec petrvs_php sh -lc "cd /var/www && <command>"
```

All frontend commands run inside `petrvs_node`:

```bash
docker exec petrvs_node sh -lc "cd /usr/src/app && <command>"
```

Do not run `artisan`, Pest, PHPStan, Composer, `npm`, `ng`, builds, or tests directly on the host.

## Backend

```bash
docker exec petrvs_php sh -lc "cd /var/www && composer install --no-interaction --prefer-dist"
docker exec petrvs_php sh -lc "cd /var/www && php artisan <command>"
docker exec petrvs_php sh -lc "cd /var/www && php artisan make:repository <Model>Repository"
```

## Pest

```bash
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --ci"
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/Unit/Services/ExampleTest.php"
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --testsuite=Integration"
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --testsuite=IntegrationTenant"
```

## PHPStan

```bash
docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app/Services/ExampleService.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
```

## Frontend

```bash
docker exec petrvs_node sh -lc "cd /usr/src/app && npm install"
docker exec petrvs_node sh -lc "cd /usr/src/app && npm start"
docker exec petrvs_node sh -lc "cd /usr/src/app && npm run build"
docker exec petrvs_node sh -lc "cd /usr/src/app && npm run lint"
docker exec petrvs_node sh -lc "cd /usr/src/app && npm test"
```
