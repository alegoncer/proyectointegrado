<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WorkEntryController;
use App\Http\Controllers\AbsenceController;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('auth:sanctum')->group(function () {
                Route::post('/work-entry/start', [WorkEntryController::class, 'startWork']);
                Route::post('/work-entry/end', [WorkEntryController::class, 'endWork']);
                Route::get('/work-entries', [WorkEntryController::class, 'index']);
                Route::post('/absences', [AbsenceController::class, 'store']); // Crear justificante
    Route::get('/absences', [AbsenceController::class, 'index']); // Listar justificantes del usuario autenticado
            });
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(except: [
            '/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
