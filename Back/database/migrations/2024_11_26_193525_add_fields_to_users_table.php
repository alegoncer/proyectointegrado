<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('dni')->unique()->nullable()->after('email'); // DNI único y opcional
            $table->string('apellidos')->nullable()->after('name'); // Apellidos
            $table->string('telefono_fijo')->nullable()->after('apellidos'); // Teléfono fijo
            $table->string('telefono_movil')->nullable()->after('telefono_fijo'); // Teléfono móvil
            $table->string('direccion')->nullable()->after('telefono_movil'); // Dirección
            $table->string('provincia')->nullable()->after('direccion'); // Provincia
            $table->string('pais')->nullable()->after('provincia'); // País
            $table->boolean('rrhh')->default(false)->after('pais'); // Campo RRHH (booleano) con valor por defecto "false"
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'dni',
                'apellidos',
                'telefono_fijo',
                'telefono_movil',
                'direccion',
                'provincia',
                'pais',
                'rrhh',
            ]);
        });
    }
}
