<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    protected $fillable = [
        
    ];

    public function catalogue_produit(){
        return $this->hasMany(Catalogue_produit::class);
    }
}
