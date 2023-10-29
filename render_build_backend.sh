echo "-----> Build hook"
echo "-----> Poetry install"
poetry install --no-interaction --without dev
chmod u+rwx backend/manage.py
echo "-----> Poetry done"

if [ -n "$ENABLE_DJANGO_COLLECTSTATIC" ] && [ "$ENABLE_DJANGO_COLLECTSTATIC" == 1 ]; then
    echo "-----> Running collectstatic"
    
    echo "-----> Collecting static files"
    poetry run backend/manage.py collectstatic --noinput  2>&1 | sed '/^Copying/d;/^$/d;/^ /d'
    
    echo
fi

echo "-----> Running manage.py check --deploy --fail-level WARNING"
poetry run backend/manage.py check --deploy --fail-level WARNING

if [ -n "$AUTO_MIGRATE" ] && [ "$AUTO_MIGRATE" == 1 ]; then
    echo "-----> Running manage.py migrate"
    poetry run backend/manage.py migrate --noinput
fi

echo "-----> Post-compile done"