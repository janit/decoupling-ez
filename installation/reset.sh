mysql -usummer -pcamp -e "TRUNCATE TABLE kaliop_migrations;" headless
composer install
patch -p0 < installation/symfony28json.patch
git pull --tags
php app/console cache:clear
php app/console ezplatform:install clean
php app/console kaliop:migration:migrate -n
php app/console cache:clear --env=prod
git checkout step-1
