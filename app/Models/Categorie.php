<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CatalogueProduit;

class Categorie extends Model
{
    use HasFactory;
<<<<<<< HEAD
    protected $fillable=['type'];
=======
    protected $fillable = [

    ];

    public function catalogueProduits(){
        return $this->hasMany(CatelogueProduit::class,'idCategorie');
    }
>>>>>>> a65ad1700c5ff5ecbf7a73ea263923d489260253
}
