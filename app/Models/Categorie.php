<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CatelogueProduit;

class Categorie extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable=[
        'type',
        'id_magasin'
    ];



    public function catalogueProduits(){
        return $this->hasMany(CatelogueProduit::class,'type');
    }

    public function magasin(){
        return $this->belongsTo(Magasin::class,'id_magasin');
    }



    public function parents()
{
    return $this->belongsTo(Categorie::class, 'parent_id');
}
}
