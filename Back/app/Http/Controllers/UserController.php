<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

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
            'password' => Hash::make($request->password), // Hashea la contraseña
        ]);

        // Generar el token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario creado exitosamente.',
            'status' => 'OK',
            'token' => $token,
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
        // Encuentra al usuario por su ID
        $user = User::findOrFail($id);
    
        // Verifica si el usuario existe
        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado.',
                'status' => 'Error',
            ], 404);
        }
    
        // Valida los datos de entrada
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id, // Permite el mismo email del usuario actual
            'password' => 'sometimes|string|min:8'
        ]);
    
        // Si se envía una contraseña, la encripta antes de actualizar
        if (isset($validatedData['password'])) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }
    
        // Actualiza el usuario con los datos validados
        $user->update($validatedData);
    
        return response()->json([
            'message' => 'Usuario actualizado correctamente.',
            'status' => 'OK',
            'data' => $user
        ], 200);
    }
    

    /**
     * Eliminar un usuario.
     */
    public function destroy($id)
    {
        // Encuentra al usuario por su ID
        $user = User::find($id);
    
        // Verifica si el usuario existe
        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado.',
                'status' => 'Error',
            ], 404);
        }
    
        // Elimina el usuario
        $user->delete();
    
        return response()->json([
            'message' => 'Usuario eliminado correctamente.',
            'status' => 'OK',
        ], 200);
    }

    // Inicio de sesión
    public function login(Request $request)
    {
        // Validar la solicitud
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Intentar autenticar al usuario
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        // Obtener el usuario autenticado
        $user = Auth::user();

        // Generar el token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'user' => $user,
            'token' => $token,
        ]);
    }
     // Cerrar sesión
     public function logout(Request $request)
     {
         // Revocar todos los tokens del usuario autenticado
         $request->user()->tokens()->delete();
 
         return response()->json(['message' => 'Sesión cerrada correctamente']);
     }


    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    public function updateme(Request $request)
    {
        $user = Auth::user(); // Obtiene el usuario autenticado

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        // Validar los datos recibidos
        $validator = Validator::make($request->all(), [
            'telefono_fijo' => 'nullable|string|max:15',
            'telefono_movil' => 'nullable|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'provincia' => 'nullable|string|max:100',
            'pais' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Intenta actualizar los datos
        try {
            $user->update($request->only([
                'telefono_fijo',
                'telefono_movil',
                'direccion',
                'email',
                'provincia',
                'pais',
            ]));

            return response()->json([
                'message' => 'Datos actualizados con éxito.',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Ocurrió un error al actualizar los datos.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
