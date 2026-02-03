<?php

use App\Models\Venue;

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$venues = Venue::all();

$images = [
    'Padel' => 'https://images.unsplash.com/photo-1627916568853-9051412d2a1b?q=80&w=1000&auto=format&fit=crop',
    'Tennis' => 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop',
    'Badminton' => 'https://images.unsplash.com/photo-1613918113476-880949b29cce?q=80&w=1000&auto=format&fit=crop',
    'Futsal' => 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000&auto=format&fit=crop',
    'Basketball' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop',
    'Gym' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop'
];

foreach ($venues as $venue) {
    echo "Updating Venue: {$venue->name} ({$venue->sport})\n";
    
    $sport = $venue->sport;
    
    // Normalize sport check
    if (stripos($venue->name, 'Padel') !== false || stripos($sport, 'Padel') !== false) {
        $venue->image = $images['Padel'];
    } elseif (stripos($venue->name, 'Tennis') !== false || stripos($sport, 'Tennis') !== false) {
        $venue->image = $images['Tennis'];
    } elseif (stripos($venue->name, 'Badminton') !== false || stripos($sport, 'Badminton') !== false) {
        $venue->image = $images['Badminton'];
    } elseif (stripos($venue->name, 'Futsal') !== false || stripos($sport, 'Futsal') !== false) {
        $venue->image = $images['Futsal'];
    } elseif (stripos($venue->name, 'Basket') !== false || stripos($sport, 'Basket') !== false) {
        $venue->image = $images['Basketball'];
    } else {
         // Default fallback if unknown, try to guess or leave/use generic
         echo "Unknown sport, using Padel default for now or skipping if already set.\n";
         // Optional: $venue->image = $images['Padel']; 
    }
    
    $venue->save();
}

echo "All venues updated.\n";
