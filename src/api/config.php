<?php

# Debug
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

# Basic
const LOG = __DIR__ . '/app.log';
const SITE_NAME = 'nightly';
const URL = 'http://localhost/nightly/src/api/';
const LIBS = 'libs/';
const JSON = 'src/data/';
define('CSS_VERSION', date('l jS \of F Y h:i:s A'));
const PATH_ADMIN = 'panel/';
const PATH_USER = 'user';
const UPLOAD_IMAGE_PATH = 'upload/images/';
const UPLOAD_DOC = 'upload/doc/';

# Database
const DB_TYPE = 'mysql';
const DB_HOST = 'localhost';
const DB_NAME = 'nightly';
const DB_CHARSET = 'utf8mb4';
const DB_USER = 'root';
const DB_PASS = '';
const DB_TABLE_PRE = 'abi_';

# Security
const HASH_GENERAL_KEY = 'AmirRahimi';
const HASH_PASSWORD_KEY = 'programmingismyjob';
const EMAIL = 'atenyun@gmail.com';
const ENABLE_UPLOADS = true;
const MERCHANT_ID = '';

# Auth0
const AUTH_DOMAIN = "";
const AUTH_CLIENT_ID = "";
const AUTH_CLIENT_SECRET = "";

# Google
const GOOGLE_MAP_API = '';
const GOOGLE_RECAPTCHA_SITE_KEY = '';
const GOOGLE_RECAPTCHA_SECREAT_KEY = '';
const FCM_SERVER_KEY = '';
const GOOGLE_ANALYTICS = '';
const GOOGLE_CLIENT_ID = '';
const GOOGLE_SECRET_ID = '';

# Facebook
const FB_APP_ID = '';
const FB_APP_SECRET = '';

# HCaptcha
const HCAPTCHA_SECRET = '';
const HCAPTCHA_RESPONSE = '';

# Region
date_default_timezone_set('America/New_York'); // EST

# Session
$sec = (8 * 60 * 60) * 5;
ini_set('session.gc_maxlifetime', $sec);
session_set_cookie_params($sec);

# UI
define('ICON_DELETE', '<i class="ms-Icon ms-Icon--Delete text-danger" aria-hidden="true"></i>');
define('ICON_EDIT', '<i class="ms-Icon ms-Icon--SingleColumnEdit text-warning" aria-hidden="true"></i>');
define('ICON_ACTIVE', '<i class="ms-Icon ms-Icon--ToggleRight badge badge-success" aria-hidden="true"></i>');
define('ICON_DEACTIVE', '<i class="ms-Icon ms-Icon--ToggleLeft badge badge-warning" aria-hidden="true"></i>');
define('ICON_OPEN', '<i class="ms-Icon ms-Icon--OpenInNewWindow" aria-hidden="true"></i>');
define('ICON_PREVIEW', '<i class="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i>');
define('ICON_CLOSE', '<span class="material-icons text-danger">clear</span>');
define('ICON_DONE', '<span class="material-icons text-success">done</span>');
define('ICON_COPY', '<span class="material-icons">content_copy</span>');
define('ICON_LINK', '<span class="material-icons">link</span>');
define('ICON_SMS', '<i class="ms-Icon ms-Icon--Message" aria-hidden="true"></i>');
define('ICON_UPLOAD', '<i class="ms-Icon ms-Icon--CloudUpload" aria-hidden="true"></i>');
define('ICON_USER', '<i class="ms-Icon ms-Icon--UserFollowed" aria-hidden="true"></i>');