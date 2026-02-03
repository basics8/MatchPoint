<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function index()
    {
        return response()->json(Venue::all(), 200);
    }

    public function show($id)
    {
        $venue = Venue::find($id);

        if ($venue) {
            return response()->json($venue, 200);
        } else {
            return response()->json(['message' => "Cannot find Venue with id=$id."], 404);
        }
    }
}
