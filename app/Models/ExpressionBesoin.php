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
        'description',
        'status',
        'created_by'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class, 'id_service');
    }

    public function DetailStock(){
        return $this->hasMany(Details_ExpBesoin::class,'id_expbesoin');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
