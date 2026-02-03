<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Registers Table:\n";
$col = DB::select("SHOW COLUMNS FROM registers LIKE 'profileImage'");
print_r($col);

echo "\nAdmins Table:\n";
$colAdmin = DB::select("SHOW COLUMNS FROM admins LIKE 'profileImage'");
print_r($colAdmin);
