composer install -n
mysql -usummer -pcamp -e "TRUNCATE TABLE kaliop_migrations;" headless
php app/console ezplatform:install clean
php app/console kaliop:migration:migrate -n
