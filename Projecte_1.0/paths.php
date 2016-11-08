<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/Projecte_1.0/';
define('SITE_ROOT', $path);
define('USER_LOG_DIR', SITE_ROOT . 'log/user/Site_User_errors.log');
define('GENERAL_LOG_DIR', SITE_ROOT . 'log/general/Site_General_errors.log');

define('PRODUCTION', true);
