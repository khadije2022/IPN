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
        'id_expbesoin',
        'id_categorie',
        'id_catproduit',
        'quantite'
    ];
    

    // In ExpressionBesoin model
public function service()
{
    return $this->belongsTo(Service::class, 'id_service');
}

// In DetailsExpBesoin model
public function categorie()
{
    return $this->belongsTo(Categorie::class, 'id_categorie');
}

public function catalogueProduit()
{
    return $this->belongsTo(CatelogueProduit::class, 'id_catproduit');
}

public function expressionBesoin()
{
    return $this->belongsTo(ExpressionBesoin::class, 'id_expbesoin');
}

}
