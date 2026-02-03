<?php

use App\Models\Venue;

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$venues = Venue::all();
foreach ($venues as $venue) {
    echo "ID: {$venue->id} | Name: {$venue->name} | Sport: {$venue->sport} | Image: {$venue->image}\n";
}
