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


    public function detailsBonSorties()
    {
        return $this->hasMany(DetailBonSortie::class, 'produit');
    }

    public function detailsBonAchats()
    {
        return $this->hasMany(DetailBonAchat::class, 'produit');
    }

}



// <?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class CatelogueProduit extends Model
// {
//     use HasFactory;

//     protected $fillable =[
//         'designation',
//         'type',
//         'stock',
//         'created_at'
//     ];

//     public function typeCategorie(){
//         return $this->belongsTo(Categorie::class,'type');
//     }
//     public function mouvments(){
//         return $this->belongsTo(Mouvement_stock::class,'produit');
//     }

//     public function detailsBonSorties()
//     {
//         return $this->hasMany(DetailBonSortie::class, 'produit');
//     }

//     public function detailsBonAchats()
//     {
//         return $this->hasMany(DetailBonAchat::class, 'produit');
//     }

//     public function getIncomingQuantity()
//     {
//         return DetailBonAchat::where('produit', $this->id)->sum('quantite');
//     }

//     // Méthode pour calculer la quantité sortante
//     public function getOutgoingQuantity()
//     {
//         return DetailBonSortie::where('produit', $this->id)->sum('quantite');
//     }

//     // Méthode pour obtenir la quantité initiale
//     public function getInitialQuantity()
//     {
//         return $this->stock; // Suppose la colonne 'stock' est la quantité initiale
//     }

// }
