<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'date',
        'time',
        'sport',
        'status',
        'totalPrice',
        'duration',
        'registerId', // was user_id
        'venueId',    // was venue_id
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'registerId');
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class, 'venueId');
    }
}
