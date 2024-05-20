<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatelogueProduit extends Model
{
    use HasFactory;

    public function categorie(){
        return $this->belongTo(Categorie::class,'idCategorie');
    }
}
