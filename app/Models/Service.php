<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $fillable = ['id','nom_responsabiliter'];




    public function expressionbesoins()
    {
        return $this->hasMany(ExpressionBesoin::class,'id_service');
    }
}
