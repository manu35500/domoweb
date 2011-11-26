#!/usr/bin/python
# -*- coding: utf-8 -*-

""" This file is part of B{Domogik} project (U{http://www.domogik.org}).

License
=======

B{Domogik} is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

B{Domogik} is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Domogik. If not, see U{http://www.gnu.org/licenses}.

Module purpose
==============



Implements
==========


@author: Marc Schneider <marc@mirelsol.org>
@copyright: (C) 2007-2009 Domogik project
@license: GPL(v3)
@organization: Domogik
"""

import os
import commands

DEBUG = True
TEMPLATE_DEBUG = DEBUG

RINOR_MIN_API = '0.2'
RINOR_MAX_API = '0.2' #included
DMG_MIN_VERSION = '0.2.0-alpha1'

ADMINS = ()

MANAGERS = ADMINS

PROJECT_PATH = os.environ['DOMOWEB_PATH']
print PROJECT_PATH

### Get DomoWeb Version
DOMOWEB_FULL_VERSION = commands.getoutput("cd %s ; hg branch | xargs hg log -l1 --template '{branch}.{rev} ({latesttag}) - {date|isodate}' -b" % PROJECT_PATH)
DOMOWEB_VERSION = commands.getoutput("cd %s ; hg branch | xargs hg log -l1 --template '{branch}.{rev}' -b" % PROJECT_PATH)
print DOMOWEB_FULL_VERSION

### UI Database settings
DATABASE_ENGINE = 'sqlite3'
DATABASE_NAME = "%s/.domogik/domoweb.db" % os.environ['DOMOWEB_USER_HOME']

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'Europe/Paris'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'i#=g$uo$$qn&0qtz!sbimt%#d+lb!stt#12hr@%vp-u)yw3s+b'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.load_template_source',
    'django.template.loaders.app_directories.load_template_source',
#     'django.template.loaders.eggs.load_template_source',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    # TODO : uncomment this once multi-languages will be supported
    # 'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
)

ROOT_URLCONF = 'domoweb.urls'

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.request',
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.admin',
    'tastypie',
    'rpc4django',
    'domoweb',
    'domoweb.view',
    'domoweb.admin',
    'domoweb.rinor',
)

# Session stuff
# Other options are :
### 'django.contrib.sessions.backends.db'
### 'django.contrib.sessions.backends.file'
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'

PIPES_CACHE_EXPIRY=0
PIPES_SOCKET_TIMEOUT=600 # 600 sec

#Tastypie
API_LIMIT_PER_PAGE = 0

# For login Auth
LOGIN_URL = '/admin/login'
LOGOUT_URL = '/admin/logout'
LOGIN_REDIRECT_URL = '/admin/'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or
    # "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    '%s/templates/' % PROJECT_PATH,
    '%s/view/templates/' % PROJECT_PATH,
    '%s/admin/templates/' % PROJECT_PATH,
    '%s/rinor/templates/' % PROJECT_PATH,
)

# List the availables widgets
WIDGETS_LIST = []
STATIC_WIDGETS_ROOT = os.environ['DOMOWEB_STATIC_WIDGETS']
if os.path.isdir(STATIC_WIDGETS_ROOT):
    for file in os.listdir(STATIC_WIDGETS_ROOT):
        main = os.path.join(STATIC_WIDGETS_ROOT, file, "main.js")
        if os.path.isfile(main):
            WIDGETS_LIST.append(file)