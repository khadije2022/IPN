<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Application Route Whitelist
    |--------------------------------------------------------------------------
    |
    | If you would like to limit the routes that are accessible to Ziggy, you
    | can do so here by listing the names of the routes you would like to
    | include. All other routes will be excluded from the exported file.
    |
    */

    'whitelist' => [
        'home',
        'magasin.*',  // Ajouter cette ligne pour inclure toutes les routes magasin
        // Ajouter d'autres routes si nécessaire
    ],

    /*
    |--------------------------------------------------------------------------
    | Application Route Blacklist
    |--------------------------------------------------------------------------
    |
    | Alternatively, you can use a blacklist to exclude routes from being
    | accessible to Ziggy. If you use both a "whitelist" and a "blacklist",
    | the blacklist will take precedence.
    |
    */

    'blacklist' => [
        // 'admin.*',
    ],

];
