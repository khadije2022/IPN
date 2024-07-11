<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonAchat extends Model
{
    use HasFactory;
    protected $fillable = [
        'description',
        'created_at',
        'status',
        "created_by"
    ];

    public function DetailStock(){
        return $this->hasMany(DetailBonAchat::class,'idBonAchat');
    }

    public function mouvments()
    {
        return $this->hasMany(MouvmentStock::class, 'idBonAchat');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
