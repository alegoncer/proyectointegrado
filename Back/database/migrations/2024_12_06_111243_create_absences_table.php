<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Relación con usuarios
            $table->date('start_date'); // Fecha de inicio
            $table->date('end_date');   // Fecha de fin
            $table->string('type');    // Tipo de incidencia
            $table->text('observations')->nullable(); // Observaciones
            $table->string('file_path')->nullable();  // Ruta del archivo
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('absences');
    }
};
