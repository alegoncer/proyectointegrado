<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\User; // Asegúrate de importar el modelo correspondiente
use App\Http\Controllers\UserController;


// Ruta principal (página de bienvenida)
Route::get('/', function () {
    return view('welcome'); // Muestra la vista predeterminada "welcome.blade.php"
});


// Rutas CRUD para usuarios (users), se controlan desde UserController.php

Route::get('/users', function () { 
    $users = User::all();
    // Devuelve los datos como respuesta JSON
    return response()->json([
        'message' => 'Prueba exitosa',
        'status' => 'OK',
        'data' => $users
    ]); });

Route::post('/users', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
    ]);

    // Crear el usuario
    $user = \App\Models\User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
    ]);

    return response()->json(['message' => 'Usuario creado con éxito.'], 201);
});

Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::put('/users/{id}', [UserController::class, 'update']);
