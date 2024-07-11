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
        'status',
        'created_by'
    ];

    public function DetailSortie(){
        return $this->hasMany(DetailBonSortie::class,'idBonDeSortie');
    }

    public function mouvments()
    {
        return $this->hasMany(MouvmentStock::class, 'idBonDeSortie');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

}
