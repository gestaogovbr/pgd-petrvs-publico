# syntax=docker/dockerfile:1
FROM php:8.2-apache
# instala recursos adicionais
RUN apt-get update && apt-get install -y \
    sed \
    vim \
    git \
    zlib1g-dev \
    libzip-dev \
    unzip \
    curl \
    libcurl4-openssl-dev \
    openssl \
    libssl-dev \
    libxml2-dev \
    sudo \
    chrony \
    libpng-dev \
    libjpeg-dev \
    cron \
    supervisor \
    default-mysql-client \
    && pecl install redis

RUN docker-php-ext-install zip
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable pdo_mysql
RUN docker-php-ext-install soap
RUN docker-php-ext-install curl
RUN docker-php-ext-install gd
RUN docker-php-ext-install calendar
# Instalar openssl utilizando um workaround
RUN docker-php-ext-install openssl || true
RUN cp /usr/src/php/ext/openssl/config0.m4 /usr/src/php/ext/openssl/config.m4
RUN docker-php-ext-install pcntl
RUN docker-php-ext-enable redis
# cria diretorio do document-root
WORKDIR /var/www
RUN mkdir /etc/apache2/ssl
# Copiar arquivos de configuração e certificado digital
COPY ../resources/docker/producao/configuracoes/apache2/apache2.conf /etc/apache2/apache2.conf
COPY ../resources/docker/producao/configuracoes/php/php_production.ini /usr/local/etc/php/php.ini
COPY ../resources/docker/producao/configuracoes/php/cacert.pem /usr/local/etc/php/cacert.pem
COPY ../resources/docker/producao/configuracoes/apache2/ssl-params.conf /etc/apache2/conf-available/ssl-params.conf
COPY ../resources/docker/producao/configuracoes/apache2/default-ssl.conf /etc/apache2/sites-available/default-ssl.conf
COPY ../resources/docker/producao/configuracoes/certificados/certificate.crt /etc/apache2/ssl/certificate.crt
COPY ../resources/docker/producao/configuracoes/certificados/private.key /etc/apache2/ssl/private.key
COPY ../resources/docker/producao/configuracoes/chrony/chrony.conf /etc/chrony/chrony.conf
# copia arquivos de configuracao
COPY ../resources/deploy/apache2.conf /etc/apache2/apache2.conf
COPY ../resources/deploy/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ../resources/deploy/cacert.pem /usr/local/etc/php/cacert.pem
# instala o composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
# habilita o modulo rewrite
RUN a2enconf ssl-params
RUN a2enmod ssl
RUN a2enmod rewrite
RUN a2enmod headers
RUN a2ensite default-ssl
# Rodar script com configurações do modo produção
RUN service chrony restart
COPY ../resources/deploy/setup_production.sh /root/setup_production.sh
RUN chmod a+x /root/setup_production.sh
RUN /root/setup_production.sh
#Instalacao
# Copia do projeto back
COPY ../../../back-end/ ./
# Configurar permissões do diretório temporário
RUN chmod -R 1777 /tmp

# Configurar permissões do diretório do projeto
RUN chmod -R 755 ./

# Ajustar permissões dos diretórios necessários
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/public

RUN composer install --optimize-autoloader --no-dev

COPY ../resources/deploy/entrypoint.sh ./entrypoint.sh
COPY ../resources/deploy/horizon.conf /etc/supervisor/conf.d/horizon.conf

# Adiciona a entrada do cron
RUN echo "* * * * * cd /var/www/ && /usr/local/bin/php artisan schedule:run >> /var/www/storage/logs/schedule.log 2>&1" | crontab -


# Exponha a porta 80 para o servidor Apache
EXPOSE 80

CMD [ "sh", "-c", "/var/www/entrypoint.sh; /usr/local/bin/apache2-foreground" ]