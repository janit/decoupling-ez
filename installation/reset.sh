mysql -usummer -pcamp -e "TRUNCATE TABLE kaliop_migrations;" headless
php app/console cache:clear
php app/console ezplatform:install clean
php app/console kaliop:migration:migrate -n
