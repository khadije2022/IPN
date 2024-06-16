<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonSortieAchat extends Model
{
    use HasFactory;
    protected $fillable = [
        'description',
        'created_at',
        'status'
    ];

    public function DetailStock(){
        return $this->hasMany(Mouvement_stock::class,'idBonDeSortieAchats');
    }

}
