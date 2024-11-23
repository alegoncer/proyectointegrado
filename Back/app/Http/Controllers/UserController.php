<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Asegúrate de tener el modelo User configurado

class UserController extends Controller
{
    /**
     * Mostrar una lista de usuarios.
     */
    public function index()
    {
        $users = User::all();
        return response()->json([
            'message' => 'Lista de usuarios obtenida correctamente.',
            'data' => $users
        ]);
    }

    /**
     * Crear un nuevo usuario.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8'
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']), // Encripta la contraseña
        ]);

        return response()->json([
            'message' => 'Usuario creado exitosamente.',
            'data' => $user
        ], 201);
    }

    /**
     * Mostrar un usuario específico.
     */
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }

        return response()->json(['data' => $user]);
    }

    /**
     * Actualizar un usuario existente.
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8'
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        $user->update($validatedData);

        return response()->json([
            'message' => 'Usuario actualizado correctamente.',
            'data' => $user
        ]);
    }

    /**
     * Eliminar un usuario.
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente.']);
    }
}
