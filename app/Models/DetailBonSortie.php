<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailBonSortie extends Model
{
    use HasFactory;

    protected $table = 'detail_bon_sorties'; // Replace with your actual table name
    protected $primaryKey = 'id'; // Ensure this matches your primary key column
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = [
        'idBonDeSortie',
        'produit',
        'quantite',
    ];


    public function produits()
    {
        return $this->belongsTo(CatelogueProduit::class,'produit');
    }

    public function bonSortie(){
        return $this->belongsTo(BonSortie::class,'idBonDeSortie');
    }
}
