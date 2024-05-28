<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpressionBesoin extends Model
{
    use HasFactory;


    protected $table = 'expression_besoins';
    protected $fillable=[
        'id_service',
        'description'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class,'id_service');
    }
}