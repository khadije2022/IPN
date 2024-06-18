<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailBonAchat extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'produit', 
        'quantite', 
        'prix', 
        'idBonAchat'
    ];

    public function produits()
    {
        return $this->belongsTo(CatelogueProduit::class,'produit');
    }

    public function bonAchat(){
        return $this->belongsTo(BonAchat::class,'idBonAchat');
    }

}
