<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Details_mouvement extends Model
{
    use HasFactory;

    public function mouvementStock()
    {
        return $this->belongsTo(Mouvement_stock::class);
    }
    

    public function catalogueProduit()
    {
        return $this->belongsTo(CatelogueProduit::class);
    }

}
