# CalendarBase Backend

A simple calendar app to view and manage events/meetings.

Features:
1.Authentication
2.Dashboard
3.Profile Management

## Getting Started

This is a Django project created with django-admin startproject.

Requirements:
1.Python
2.pip

First Clone this Repository to your system.

In new terminal at project directory (/CalendarBase/), run:

```bash
$ pip install virtualenv

$ python -m venv backend-env

$ backend-env\scripts\activate

```

In new terminal at project directory (/CalendarBase/calendarbase_backend/), run:

```bash
$ pip install -r requirements.txt

$ python manage.py runserver

```

Create .env file and add below fields:

```bash

DJANGO_SECRET_KEY=""
DJANGO_DEBUG=
DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
CORS_ALLOWED_ORIGINS="http://localhost:3000,https://localhost:3000"
CORS_ALLOW_CREDENTIALS=True

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USE_TLS=
EMAIL_HOST_USER=""
EMAIL_HOST_PASSWORD=""

```

The backend successfully will be running on [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

Note: Postgresql database should be connected to use the app.

Add Postgresql db credentials in settings or env file, then run:

```bash
$ python manage.py makemigrations

$ python manage.py migrate

```
