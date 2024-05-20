<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CatalogueProduit;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable=['type'];



    // public function catalogueProduits(){
    //     return $this->hasMany(CatalogueProduit::class,'idCategorie');
    // }
}
