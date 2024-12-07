<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkEntry;
use Illuminate\Support\Facades\Auth;

class WorkEntryController extends Controller
{
    /**
     * Registrar la hora de entrada
     */
    public function startWork(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado.'], 401);
        }

        $existingEntry = WorkEntry::where('user_id', $user->id)
            ->where('work_date', now()->toDateString())
            ->whereNull('end_time')
            ->first();

        if ($existingEntry) {
            return response()->json(['error' => 'Ya tienes una entrada registrada sin salida para hoy.'], 400);
        }

        try {
            $workEntry = WorkEntry::create([
                'user_id' => $user->id,
                'work_date' => now()->toDateString(),
                'start_time' => now()->toTimeString(),
            ]);

            return response()->json([
                'message' => 'Hora de entrada registrada con éxito.',
                'work_entry' => $workEntry,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al registrar la entrada.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Registrar la hora de salida
     */
    public function endWork(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado.'], 401);
        }

        $workEntry = WorkEntry::where('user_id', $user->id)
            ->where('work_date', now()->toDateString())
            ->whereNull('end_time')
            ->first();

        if (!$workEntry) {
            return response()->json(['error' => 'No hay un registro de entrada activo para hoy.'], 404);
        }

        try {
            $workEntry->update([
                'end_time' => now()->toTimeString(),
            ]);

            return response()->json([
                'message' => 'Hora de salida registrada con éxito.',
                'work_entry' => $workEntry,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al registrar la salida.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Listar todas las entradas/salidas del usuario autenticado
     */
    public function index()
    {
        $user = Auth::user();

        $workEntries = WorkEntry::where('user_id', $user->id)
            ->orderBy('work_date', 'desc')
            ->get();

        return response()->json($workEntries);
    }

    /**
     * Listar todas las entradas y salidas de todos los usuarios
     */
    public function listAllWorkEntries()
    {
        try {
            // Obtener todas las entradas/salidas de todos los usuarios
            $workEntries = WorkEntry::with('user') // Relación con el modelo User
                ->orderBy('work_date', 'desc')
                ->orderBy('start_time', 'desc')
                ->get();

            return response()->json($workEntries, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener los registros.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Listar entradas y salidas de un usuario específico
     */
    public function listWorkEntriesByUser($userId)
    {
        try {
            // Obtener las entradas/salidas del usuario especificado
            $workEntries = WorkEntry::with('user')
                ->where('user_id', $userId)
                ->orderBy('work_date', 'desc')
                ->orderBy('start_time', 'desc')
                ->get();

            return response()->json($workEntries, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener los registros.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
