<?php

namespace App\Http\Controllers;

use App\Models\Absence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AbsenceController extends Controller
{
    /**
     * Registrar un justificante de ausencia.
     */
    public function store(Request $request)
{
    try {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'type' => 'required|string|max:255',
            'observations' => 'nullable|string',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:10240',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('absences', 'public');
        }

        // Verifica los datos que se intentan insertar
        \Log::info('Datos a insertar:', [
            'user_id' => Auth::id(),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'type' => $request->type,
            'observations' => $request->observations,
            'file_path' => $filePath,
        ]);

        $absence = Absence::create([
            'user_id' => Auth::id(),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'type' => $request->type,
            'observations' => $request->observations,
            'file_path' => $filePath,
        ]);

        return response()->json([
            'message' => 'Justificante registrado con éxito.',
            'absence' => $absence,
        ], 201);
    } catch (\Exception $e) {
        \Log::error('Error al registrar justificante:', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Error interno del servidor.'], 500);
    }
}

    

    /**
     * Obtener las ausencias del usuario autenticado.
     */
    public function index()
    {
        $user = Auth::user();

        $absences = Absence::where('user_id', $user->id)
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json($absences);
    }
}
