<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatelogueProduit extends Model
{
    use HasFactory;

    protected $fillable =[
        'designation',
        'type',
        'created_at'
    ];

    public function typeCategorie(){
        return $this->belongsTo(Categorie::class,'type');
    }
    public function mouvments(){
        return $this->belongsTo(Mouvement_stock::class,'produit');
    }

}
