<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    protected $table = 'resources'; // Nombre de la tabla
    protected $fillable = ['name', 'description']; // Campos permitidos para asignación masiva
}
