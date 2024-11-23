<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Resource; // Si estás usando un modelo llamado Resource

class ResourceController extends Controller
{
    public function index()
    {
        // Obtén todos los recursos (ejemplo con Eloquent)
        $resources = Resource::all();

        // Devuelve los recursos como JSON
        return response()->json($resources, 200);
    }
}
