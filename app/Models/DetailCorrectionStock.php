<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailCorrectionStock extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'produit',
        'quantite',
        'idCorrectionStock',
        'typeMouvment'
    ];

    public function produits()
    {
        return $this->belongsTo(CatelogueProduit::class,'produit');
    }

    public function correctionStock(){
        return $this->belongsTo(CorrectionStock::class,'idCorrectionStock');
    }
}
