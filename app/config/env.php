<?php
// On Symfony container compilation*, reads parameters from env variables if defined and overrides the yml parameters.
// * For typical use cases like Docker, make sure to recompile Symfony container on run to refresh settings.

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Loader;

if ($value = getenv('SYMFONY_SECRET')) {
    $container->setParameter('secret', $value);
}

// Mailer settings
if ($value = getenv('MAILER_TRANSPORT')) {
    $container->setParameter('mailer_transport', $value);
}

if ($value = getenv('MAILER_HOST')) {
    $container->setParameter('mailer_host', $value);
}

if ($value = getenv('MAILER_USER')) {
    $container->setParameter('mailer_user', $value);
}

if ($value = getenv('MAILER_PASSWORD')) {
    $container->setParameter('mailer_password', $value);
}

// Database settings
if ($value = getenv('DATABASE_DRIVER')) {
    $container->setParameter('database_driver', $value);
}

if ($value = getenv('DATABASE_HOST')) {
    $container->setParameter('database_host', $value);
}

if ($value = getenv('DATABASE_PORT')) {
    $container->setParameter('database_port', $value);
}

if ($value = getenv('DATABASE_NAME')) {
    $container->setParameter('database_name', $value);
}

if ($value = getenv('DATABASE_USER')) {
    $container->setParameter('database_user', $value);
}

if ($value = getenv('DATABASE_PASSWORD')) {
    $container->setParameter('database_password', $value);
}

// Search Engine settings
if ($value = getenv('SEARCH_ENGINE')) {
    $container->setParameter('search_engine', $value);
}

if ($value = getenv('SOLR_DSN')) {
    $container->setParameter('solr_dsn', $value);
}

// Logging settings
if ($value = getenv('LOG_TYPE')) {
    $container->setParameter('log_type', $value);
}

if ($value = getenv('LOG_PATH')) {
    $container->setParameter('log_path', $value);
}

// Cache settings
// Config validation by Stash prohbitis us from pre defining pools using drivers not supported by all systems
// So we expose a env variable to load and use other pools when needed, additional pools can be added in cache_pool/ folder.
if ($pool = getenv('CUSTOM_CACHE_POOL')) {
    $container->setParameter('cache_pool', $pool);

    if ($host = getenv('CACHE_HOST')) {
        $container->setParameter('cache_host', $host);
    }

    $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__ . '/cache_pool'));
    $loader->load($pool . '.yml');
}
