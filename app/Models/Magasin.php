<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Magasin extends Model
{
    use HasFactory;
    protected $fillable =[
        'nomMagasin'=>'IPN Magasin',
    ];

    public function categorie(){
        return $this->hasMany(Categorie::class,'id_magasin');
    }
}
