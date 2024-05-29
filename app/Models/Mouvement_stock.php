<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mouvement_stock extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'idBonDeSortieAchats',
        'id_produit',
        'quantite',
    ];

    // public function detailsMouvementStock()
    // {
    //     return $this->hasMany(Details_mouvement::class);
    // }

    public function bonSortieDachats()
    {
        return $this->belongsTo(BonSortieAchat::class);
    }
    public function produits()
    {
        return $this->belongsTo(CatelogueProduit::class,'id_produit');
    }

    public function bonSortie(){
        return $this->belongsTo(BonSortieAchat::class,'idBonDeSortieAchats');
    }
}
