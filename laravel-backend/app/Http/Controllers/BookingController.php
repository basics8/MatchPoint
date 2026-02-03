<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Venue;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        if (!$request->venueId || !$request->date || !$request->time || !$request->registerId) {
             return response()->json([
                'message' => "Content can not be empty! Venue, User, Date and Time are required."
            ], 400);
        }

        // Schema uses camelCase for foreign keys
        $booking = Booking::create([
            'date' => $request->date,
            'time' => $request->time,
            'sport' => $request->sport,
            'status' => $request->status ?? 'Confirmed',
            'totalPrice' => $request->totalPrice,
            'duration' => $request->duration ?? '1 hour',
            'venueId' => $request->venueId,       // Legacy column name
            'registerId' => $request->registerId, // Legacy column name
            'booker_type' => $request->bookerType ?? 'user',
        ]);

        return response()->json($booking, 200);
    }

    public function indexByUser(Request $request, $userId)
    {
        $bookerType = $request->query('type', 'user'); // Default to 'user'

        // Query using 'registerId' column matches $userId and booker_type
        $bookings = Booking::where('registerId', $userId)
            ->where('booker_type', $bookerType)
            ->with(['venue' => function($query) {
                $query->select('id', 'name', 'location', 'image');
            }])
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get();

        return response()->json($bookings, 200);
    }
    public function show($id)
    {
        $booking = Booking::with(['venue' => function($query) {
            $query->select('id', 'name', 'location', 'image');
        }])->find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        return response()->json($booking, 200);
    }
}
