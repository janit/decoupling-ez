composer install -n
php app/console ezplatform:install clean
php app/console kaliop:migration:migrate -n
