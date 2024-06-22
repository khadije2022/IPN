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
        'stock',
        'created_at'
    ];

    public function typeCategorie(){
        return $this->belongsTo(Categorie::class,'type');
    }
    public function mouvments(){
        return $this->belongsTo(Mouvement_stock::class,'produit');
    }

    public function detailsBonSorties()
    {
        return $this->hasMany(DetailBonSortie::class, 'produit');
    }

    public function detailsBonAchats()
    {
        return $this->hasMany(DetailBonAchat::class, 'produit');
    }

}
