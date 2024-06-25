<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CatelogueProduit;


class Details_ExpBesoin extends Model
{
    use HasFactory;
    protected $table = 'details_expbesoins';
    protected $fillable=[
        'produit',
        'quantite',
        'id_expbesoin'
    ];


    // In ExpressionBesoin model
// public function service()
// {
//     return $this->belongsTo(Service::class, 'id_service');
// }



public function Produit()
{
    return $this->belongsTo(CatelogueProduit::class, 'produit');
}

public function expressionBesoin()
{
    return $this->belongsTo(ExpressionBesoin::class, 'id_expbesoin');
}

}
