<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonSortie extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'created_at',
        'status'
    ];

    public function DetailSortie(){
        return $this->hasMany(DetailBonSortie::class,'idBonDeSortie');
    }

}
