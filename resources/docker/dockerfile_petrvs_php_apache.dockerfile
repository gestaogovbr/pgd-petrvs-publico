FROM php:8.1.0alpha3-apache

RUN mkdir /var/www/back-end

RUN apt-get install sed

RUN sed -E -i -e '/<Directory "\/var\/www\">/,/<\/Directory>/s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
RUN sed -E -i -e 's/DirectoryIndex (.*)$/DirectoryIndex index.php \1/g' /etc/apache2/apache2.conf

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer