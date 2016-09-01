mysql -usummer -pcamp -e "TRUNCATE TABLE kaliop_migrations;" headless
composer install
git pull --tags
php app/console cache:clear
php app/console ezplatform:install clean
php app/console kaliop:migration:migrate -n
php app/console cache:clear --env=prod
