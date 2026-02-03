<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'name',
        'location',
        'rating',
        'reviews',
        'price',
        'sport',
        'image',
        'description',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
