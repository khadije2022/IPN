<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MouvmentStock extends Model
{
    use HasFactory;

    protected $fillable = [
        'idBonDeSortie',
        'idBonAchat',
        'typeMouvments',
        'stock'
    ];

    public function bonSortie()
    {
        return $this->belongsTo(BonSortie::class, 'idBonDeSortie');
    }

    public function bonAchat()
    {
        return $this->belongsTo(BonAchat::class, 'idBonAchat');
    }
}
