<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', '/csrf-token', '/users', '/*'], // Incluye tus rutas específicas
    'allowed_methods' => ['*'],    // Permite todos los métodos (GET, POST, etc.)
    'allowed_origins' => ['http://localhost:5173'], // Cambia al dominio del frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],   // Permite todos los encabezados
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Cambia a true si necesitas cookies o autenticación
];



