<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\UserController;



// Ruta principal (página de bienvenida)
Route::get('/', function () {
    return view('welcome'); // Muestra la vista predeterminada "welcome.blade.php"
});

// Rutas CRUD para usuarios (users), se controlan desde UserController.php

Route::get('/users',[userController::class, 'index']);

Route::get('/users/{id}', [UserController::class, 'show']);

Route::post('/users', [UserController::class, 'store']);

Route::put('/users/{id}', [UserController::class, 'update']);

Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Rutas Login y me

Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/me', [UserController::class, 'me']);
});






