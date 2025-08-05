# Use official PHP image with FPM
FROM php:8.2-fpm

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    libicu-dev \
    zip \
    unzip \
    git \
    curl \
    netcat-openbsd \
    supervisor \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl \
    opcache

# Install Redis extension
RUN pecl install redis \
    && docker-php-ext-enable redis

# Set working directory
WORKDIR /var/www

# Copy PHP configuration
COPY ./docker/php/php.ini /usr/local/etc/php/conf.d/99-custom.ini
COPY ./docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Copy application code
COPY --chown=www-data:www-data . /var/www

# Set proper permissions for the application
RUN chown -R www-data:www-data /var/www && \
    find /var/www/storage -type d -print0 | xargs -0 chmod 775 && \
    find /var/www/storage -type f -print0 | xargs -0 chmod 664 && \
    find /var/www/bootstrap/cache -type d -print0 | xargs -0 chmod 775 && \
    find /var/www/bootstrap/cache -type f -print0 | xargs -0 chmod 664

# Switch to non-root user
USER www-data

# Install composer dependencies
RUN composer install --no-interaction --no-scripts --no-dev --optimize-autoloader

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
