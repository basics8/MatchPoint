<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:registers',
            'email' => 'required|string|email|unique:registers',
            'password' => 'required|string',
        ]);

        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully!'], 200);
    }

    public function signin(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Check Admin first
        $admin = Admin::where('username', $request->username)->first();

        if ($admin && Hash::check($request->password, $admin->password)) {
            $token = $admin->createToken('admin-token')->plainTextToken;

            return response()->json([
                'id' => $admin->id,
                'username' => $admin->username,
                'roles' => 'admin',
                'accessToken' => $token
            ], 200);
        }

        // Check User
        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'accessToken' => null,
                'message' => 'Invalid Password!' // Or User not found, matching original generic/specificmsg
            ], 401);
        }

        $token = $user->createToken('user-token')->plainTextToken;

        return response()->json([
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'roles' => 'user',
            'profileImage' => $user->profileImage,
            'createdAt' => $user->created_at,
            'accessToken' => $token
        ], 200);
    }

    public function adminSignup(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:admins',
            'password' => 'required|string',
        ]);

        Admin::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Admin registered successfully!'], 200);
    }

    public function adminSignin(Request $request)
    {
        // Duplicate logic for admin-specific route if needed, or redirect to signin
        // Original app had separate route.
        
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('username', $request->username)->first();

        if (!$admin) {
            return response()->json(['message' => 'Admin Not found.'], 404);
        }

        if (!Hash::check($request->password, $admin->password)) {
             return response()->json([
                'accessToken' => null,
                'message' => 'Invalid Password!'
            ], 401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'id' => $admin->id,
            'username' => $admin->username,
            'roles' => 'admin',
            'profileImage' => $admin->profileImage,
            'accessToken' => $token
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $user = User::where('username', $request->username)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->update([
            'profileImage' => $request->profileImage
        ]);

        return response()->json([
            'message' => 'Profile updated successfully!',
            'profileImage' => $user->profileImage
        ], 200);
    }
    public function getUserStats(Request $request)
    {
        $user = $request->user();
        
        $totalMatches = \App\Models\Booking::where('registerId', $user->id)->count();

        $favSport = \App\Models\Booking::where('registerId', $user->id)
            ->select('sport', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
            ->groupBy('sport')
            ->orderByDesc('total')
            ->first();

        return response()->json([
            'totalMatches' => $totalMatches,
            'favoriteSport' => $favSport ? $favSport->sport : '-',
            'memberSince' => $user->createdAt // Return raw string, frontend parses it
        ], 200);
    }
}
