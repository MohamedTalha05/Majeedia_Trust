<?php
/**
 * Majeedia Trust – form handler for the Contact and Volunteer forms.
 * Sends each submission by email to MAIL_TO. Requires PHP 8+ (Hostinger default).
 *
 * Before going live:
 *  1. Create the mailbox MAIL_FROM in Hostinger (Emails > Email Accounts), or
 *     change MAIL_FROM to an existing @majeedia.org address.
 *  2. Submit a test message on the live site and confirm it arrives.
 */
declare(strict_types=1);

const MAIL_TO = 'support@majeedia.org';
const MAIL_FROM = 'website@majeedia.org';
const RATE_LIMIT = 5;          // max submissions per IP address...
const RATE_WINDOW = 3600;      // ...per hour
const MIN_SECONDS = 3;         // faster than this is treated as a bot

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function field(string $name, int $max): string
{
    $value = trim((string)($_POST[$name] ?? ''));
    return mb_substr($value, 0, $max);
}

function oneLine(string $value): string
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Only accept submissions from this website
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== ($_SERVER['HTTP_HOST'] ?? '')) {
    respond(403, ['ok' => false, 'error' => 'Forbidden']);
}

// Spam checks: hidden honeypot field and minimum fill-in time.
// Bots are told "ok" so they do not retry, but nothing is sent.
if (field('website', 200) !== '' || (int)($_POST['elapsed'] ?? 0) < MIN_SECONDS) {
    respond(200, ['ok' => true]);
}

// Rate limit per IP address
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/majeedia_form_' . hash('sha256', $ip);
$now = time();
$recent = [];
if (is_file($rateFile)) {
    $recent = array_filter(
        (array)json_decode((string)file_get_contents($rateFile), true),
        fn($t) => is_int($t) && $t > $now - RATE_WINDOW
    );
}
if (count($recent) >= RATE_LIMIT) {
    respond(429, ['ok' => false, 'error' => 'Too many submissions. Please try again later.']);
}

$type = $_POST['form_type'] ?? '';
$name = oneLine(field('name', 120));
$email = oneLine(field('email', 200));
$phone = oneLine(field('phone', 40));

$errors = [];
if ($name === '') $errors['name'] = 'Please enter your name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';

if ($type === 'contact') {
    $subject = oneLine(field('subject', 200));
    $message = field('message', 5000);
    if ($subject === '') $errors['subject'] = 'Please enter a subject.';
    if ($message === '') $errors['message'] = 'Please enter your message.';
    $mailSubject = 'Website message: ' . $subject;
    $lines = [
        'Name' => $name,
        'Email' => $email,
        'Phone' => $phone ?: '-',
        'Subject' => $subject,
        'Message' => "\n" . $message,
    ];
} elseif ($type === 'volunteer') {
    $motivation = field('motivation', 3000);
    $experience = field('experience', 3000);
    $availability = field('availability', 2000);
    if ($motivation === '') $errors['motivation'] = 'Please tell us why you would like to volunteer.';
    if ($experience === '') $errors['experience'] = 'Please tell us about your experience or skills.';
    if ($availability === '') $errors['availability'] = 'Please tell us when you are available.';
    $areas = array_map(fn($a) => oneLine(mb_substr((string)$a, 0, 80)), (array)($_POST['areas'] ?? []));
    $mailSubject = 'Volunteer application: ' . $name;
    $lines = [
        'Name' => $name,
        'Email' => $email,
        'Phone' => $phone ?: '-',
        'Gender' => oneLine(field('gender', 40)) ?: '-',
        'Age group' => oneLine(field('age_group', 40)) ?: '-',
        'Areas of interest' => $areas ? implode(', ', array_slice($areas, 0, 12)) : '-',
        'Why volunteer' => "\n" . $motivation . "\n",
        'Experience and skills' => "\n" . $experience . "\n",
        'Availability' => "\n" . $availability,
    ];
} else {
    respond(400, ['ok' => false, 'error' => 'Unknown form']);
}

if ($errors) {
    respond(422, ['ok' => false, 'errors' => $errors]);
}

$body = '';
foreach ($lines as $label => $value) {
    $body .= $label . ': ' . $value . "\n";
}
$body .= "\n--\nSent from the form on " . ($_SERVER['HTTP_HOST'] ?? 'majeedia.org') . ' on ' . date('d M Y, H:i') . "\n";

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Majeedia Trust Website <' . MAIL_FROM . '>',
    'Reply-To: ' . '=?UTF-8?B?' . base64_encode($name) . '?= <' . $email . '>',
]);

$sent = mail(
    MAIL_TO,
    '=?UTF-8?B?' . base64_encode(oneLine($mailSubject)) . '?=',
    $body,
    $headers,
    '-f' . MAIL_FROM
);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'The message could not be sent.']);
}

$recent[] = $now;
@file_put_contents($rateFile, json_encode(array_values($recent)), LOCK_EX);
respond(200, ['ok' => true]);
