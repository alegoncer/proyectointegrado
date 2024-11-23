<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->id(); // ID autoincremental
            $table->string('name'); // Columna de texto
            $table->text('description'); // Columna para una descripción
            $table->timestamps(); // created_at y updated_at
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
