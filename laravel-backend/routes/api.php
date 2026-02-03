<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Auth Routes
Route::post('/auth/signup', [AuthController::class, 'signup']);
Route::post('/auth/signin', [AuthController::class, 'signin']);
Route::post('/user/update-profile', [AuthController::class, 'updateProfile']);
Route::middleware('auth:sanctum')->get('/user/stats', [AuthController::class, 'getUserStats']);

// Admin Auth Routes
Route::post('/auth/admin/signin', [AuthController::class, 'adminSignin']);
Route::post('/auth/admin/signup', [AuthController::class, 'adminSignup']);

// Venue Routes (Public)
Route::get('/venues', [VenueController::class, 'index']);
Route::get('/venues/{id}', [VenueController::class, 'show']);

// Booking Routes
Route::post('/bookings', [BookingController::class, 'store']);
Route::get('/bookings/{id}', [BookingController::class, 'show']);
Route::get('/bookings/user/{userId}', [BookingController::class, 'indexByUser']);

// Admin Protected Routes
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/stats', [AdminController::class, 'getStats']);
    Route::get('/financial', [AdminController::class, 'getFinancialStats']);

    // Admin Venue Management
    Route::get('/venues', [AdminController::class, 'getAllVenues']);
    Route::post('/venues', [AdminController::class, 'createVenue']);
    Route::put('/venues/{id}', [AdminController::class, 'updateVenue']);
    Route::delete('/venues/{id}', [AdminController::class, 'deleteVenue']);

    // Admin User/Booking Management
    Route::get('/users', [AdminController::class, 'getAllUsers']);
    Route::get('/bookings', [AdminController::class, 'getAllBookings']);
});
