<?php
/**
 * Бюро перекладів «Фенікс» — відправка заявок у Telegram
 *
 * ЩО ПОТРІБНО ЗРОБИТИ, КОЛИ З'ЯВИТЬСЯ БОТ:
 *   1. Вставте токен бота (від @BotFather) у BOT_TOKEN.
 *   2. Вставте chat_id у CHAT_ID (особистий чат або група, куди мають приходити заявки).
 *   3. У файлі js/main.js поставте  demo: false
 */

// ====================== НАЛАШТУВАННЯ ======================
const BOT_TOKEN   = '00000000:AAH7upk6z1P962C4Q'; 
const CHAT_ID     = '0000000000';   
const MAX_FILES   = 5;
const MAX_FILE_MB = 10;
const RATE_LIMIT_SECONDS = 20;              // не частіше однієї заявки з IP
const ALLOWED_EXT = ['pdf','doc','docx','txt','rtf','odt','jpg','jpeg','png','heic','xls','xlsx','ppt','pptx','zip'];
const TIMEZONE    = 'Europe/Kyiv';         // час у заявках
// ==========================================================

// Попередження PHP не повинні потрапляти у відповідь — інакше сайт не розбере JSON
ini_set('display_errors', '0');
// На старих серверах Київ ще записаний як Europe/Kiev
if (!@date_default_timezone_set(TIMEZONE)) @date_default_timezone_set('Europe/Kiev');
ob_start();

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $code, array $data): void {
    while (ob_get_level()) ob_end_clean();
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function field(string $key, int $max = 500): string {
    $v = isset($_POST[$key]) && is_string($_POST[$key]) ? trim($_POST[$key]) : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v);
    return mb_substr($v, 0, $max, 'UTF-8');
}

function esc(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function tg(string $method, array $params): array {
    $ch = curl_init('https://api.telegram.org/bot' . BOT_TOKEN . '/' . $method);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $params,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT        => 60,
    ]);
    $body = curl_exec($ch);
    $err  = curl_error($ch);
    if ($body === false) return ['ok' => false, 'description' => $err];
    $json = json_decode($body, true);
    return is_array($json) ? $json : ['ok' => false, 'description' => 'bad response'];
}

// ---------- Перевірки запиту ----------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}
if (strpos(BOT_TOKEN, 'ВСТАВТЕ') === 0 || strpos(CHAT_ID, 'ВСТАВТЕ') === 0) {
    respond(500, ['ok' => false, 'error' => 'not_configured']);
}
if (!function_exists('curl_init')) {
    respond(500, ['ok' => false, 'error' => 'curl_missing']);
}

// Пастка для ботів: справжні люди це поле не заповнюють
if (field('website') !== '') {
    respond(200, ['ok' => true]);
}

// Простий захист від повторних відправок
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$lockFile = sys_get_temp_dir() . '/fenix_' . md5($ip);
if (is_file($lockFile) && time() - filemtime($lockFile) < RATE_LIMIT_SECONDS) {
    respond(429, ['ok' => false, 'error' => 'too_many_requests']);
}

// ---------- Дані форми ----------
$name     = field('name', 80);
$phone    = field('phone', 25);
$email    = field('email', 120);
$contact  = field('contact', 20);
$service  = field('service', 80);
$language = field('language', 60);
$message  = field('message', 2000);
$calc     = field('calc', 300);
$siteLang = field('site_lang', 5);
$page     = field('page', 300);

$digits = preg_replace('/\D/', '', $phone);
if (mb_strlen($name, 'UTF-8') < 2 || strlen($digits) < 10 || strlen($digits) > 15) {
    respond(422, ['ok' => false, 'error' => 'validation']);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'validation']);
}

// ---------- Файли ----------
$files = [];
if (!empty($_FILES['files']) && is_array($_FILES['files']['name'])) {
    $count = min(count($_FILES['files']['name']), MAX_FILES);
    for ($i = 0; $i < $count; $i++) {
        if ($_FILES['files']['error'][$i] !== UPLOAD_ERR_OK) continue;
        if ($_FILES['files']['size'][$i] > MAX_FILE_MB * 1024 * 1024) continue;
        $orig = basename($_FILES['files']['name'][$i]);
        $ext  = strtolower(pathinfo($orig, PATHINFO_EXTENSION));
        if (!in_array($ext, ALLOWED_EXT, true)) continue;
        $files[] = ['tmp' => $_FILES['files']['tmp_name'][$i], 'name' => $orig];
    }
}

// ---------- Повідомлення ----------
$phoneLink = '+' . $digits;
$lines = [
    '🔥 <b>Нова заявка — Фенікс</b>',
    '',
    '👤 <b>Ім\'я:</b> ' . esc($name),
    '📞 <b>Телефон:</b> <a href="tel:' . esc($phoneLink) . '">' . esc($phone) . '</a>',
];
if ($email !== '')   $lines[] = '✉️ <b>Email:</b> ' . esc($email);
if ($contact !== '') $lines[] = '💬 <b>Зв\'язок:</b> ' . esc($contact);
$lines[] = '';
if ($service !== '')  $lines[] = '📄 <b>Документ:</b> ' . esc($service);
if ($language !== '') $lines[] = '🌍 <b>Мова:</b> ' . esc($language);
if ($calc !== '')     $lines[] = '🧮 <b>Калькулятор:</b> ' . esc($calc);
if ($message !== '')  $lines[] = "\n📝 <b>Коментар:</b>\n" . esc($message);
if ($files)           $lines[] = "\n📎 Файлів: " . count($files) . ' (надіслано нижче)';
$lines[] = '';
$lines[] = '🕒 ' . date('d.m.Y H:i') . ($siteLang ? ' · ' . strtoupper(esc($siteLang)) : '');

$res = tg('sendMessage', [
    'chat_id'                  => CHAT_ID,
    'text'                     => implode("\n", $lines),
    'parse_mode'               => 'HTML',
    'disable_web_page_preview' => 'true',
]);

if (empty($res['ok'])) {
    error_log('Fenix TG error: ' . ($res['description'] ?? 'unknown'));
    respond(502, ['ok' => false, 'error' => 'telegram']);
}

foreach ($files as $f) {
    tg('sendDocument', [
        'chat_id'  => CHAT_ID,
        'document' => new CURLFile($f['tmp'], (function_exists('mime_content_type') ? mime_content_type($f['tmp']) : '') ?: 'application/octet-stream', $f['name']),
        'caption'  => '📎 ' . $name . ' · ' . $phone,
        'reply_to_message_id' => $res['result']['message_id'] ?? '',
    ]);
}

@touch($lockFile);
respond(200, ['ok' => true]);
