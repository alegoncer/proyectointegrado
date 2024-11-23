<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\User; // Asegúrate de importar el modelo correspondiente
use App\Http\Controllers\UserController;


// Ruta principal (página de bienvenida)
Route::get('/', function () {
    return view('welcome'); // Muestra la vista predeterminada "welcome.blade.php"
});

// Rutas para el controlador ResourceController
Route::post('/resources', [App\Http\Controllers\ResourceController::class, 'store']); // Crear un nuevo recurso
Route::put('/resources/{id}', [App\Http\Controllers\ResourceController::class, 'update']); // Actualizar un recurso existente
Route::delete('/resources/{id}', [App\Http\Controllers\ResourceController::class, 'destroy']); // Eliminar un recurso existente

Route::get('/test', function () {
    // Obtén los datos de la base de datos
    $users = User::all();

    // Devuelve los datos como respuesta JSON
    return response()->json([
        'message' => 'Prueba exitosa',
        'status' => 'OK',
        'data' => $users
    ]);
});

// Rutas CRUD para usuarios
Route::post('/users', [UserController::class, 'store']); // Crear usuario

Route::post('/test', function (Request $request) {
    // Validación de los datos
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8'
    ]);

    // Creación de un nuevo usuario
    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => bcrypt($validatedData['password']), // Encriptación del password
    ]);

    // Retornar respuesta JSON
    return response()->json([
        'message' => 'Usuario creado exitosamente',
        'status' => 'OK',
        'data' => $user
    ], 201); // Código de respuesta 201 (creado)
});