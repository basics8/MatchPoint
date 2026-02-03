<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getStats()
    {
        try {
            $totalUsers = User::count();
            $totalBookings = Booking::count();
            $totalVenues = Venue::count();
            $totalRevenue = Booking::sum('totalPrice') ?? 0;

            // Revenue Over Time (Group by Month)
            $monthlyRevenue = Booking::selectRaw('MONTH(date) as month, SUM(totalPrice) as totalAmount')
                ->whereIn('status', ['Confirmed', 'Completed'])
                ->groupBy('month')
                ->orderBy('month')
                ->get();

            // Recent Activity (Latest 5 Bookings)
            $recentActivity = Booking::with(['user' => function($q) {
                    $q->select('id', 'username', 'profileImage');
                }, 'venue' => function($q) {
                    $q->select('id', 'name');
                }])
                ->orderBy('createdAt', 'desc')
                ->limit(6)
                ->get();

            return response()->json([
                'totalUsers' => $totalUsers,
                'totalBookings' => $totalBookings,
                'totalVenues' => $totalVenues,
                'totalRevenue' => $totalRevenue,
                'revenueOverTime' => $monthlyRevenue,
                'recentActivity' => $recentActivity
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function getFinancialStats()
    {
        try {
            $totalRevenue = Booking::whereIn('status', ['Confirmed', 'Completed'])
                ->sum('totalPrice') ?? 0;

            $revenueBySport = Booking::selectRaw('sport, SUM(totalPrice) as totalAmount')
                ->whereIn('status', ['Confirmed', 'Completed'])
                ->groupBy('sport')
                ->get();

            // Revenue by Venue
            $revenueByVenue = Booking::select('venueId', DB::raw('SUM(totalPrice) as totalAmount'), DB::raw('COUNT(id) as totalBookings'))
                ->whereIn('status', ['Confirmed', 'Completed'])
                ->with(['venue' => function($q) {
                    $q->select('id', 'name');
                }])
                ->groupBy('venueId')
                ->get()
                ->map(function($booking) {
                    return $booking;
                });

            return response()->json([
                'totalRevenue' => $totalRevenue,
                'revenueBySport' => $revenueBySport,
                'revenueByVenue' => $revenueByVenue
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function getAllVenues()
    {
        return response()->json(Venue::all(), 200);
    }

    public function createVenue(Request $request)
    {
        try {
            $venue = Venue::create($request->all());
            return response()->json(['message' => "Venue created successfully!", 'venue' => $venue], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function updateVenue(Request $request, $id)
    {
        try {
            $venue = Venue::find($id);
            if ($venue) {
                $venue->update($request->all());
                return response()->json(['message' => "Venue updated successfully!"], 200);
            } else {
                return response()->json(['message' => "Venue not found!"], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function deleteVenue($id)
    {
        try {
            $venue = Venue::find($id);
            if ($venue) {
                $venue->delete();
                return response()->json(['message' => "Venue deleted successfully!"], 200);
            } else {
                return response()->json(['message' => "Venue not found!"], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function getAllUsers()
    {
        return response()->json(User::select('id', 'username', 'email', 'createdAt')->get(), 200);
    }

    public function getAllBookings()
    {
        $bookings = Booking::with([
                'user' => function($q) { $q->select('id', 'username'); },
                'venue' => function($q) { $q->select('id', 'name'); }
            ])
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get();
            
        return response()->json($bookings, 200);
    }
}
