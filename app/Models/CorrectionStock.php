<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CorrectionStock extends Model
{
    use HasFactory;

    protected $fillable = [
        'motif',
        'created_at',
        'status',
        'created_by'
    ];

    public function DetailStock(){
        return $this->hasMany(DetailCorrectionStock::class,'idCorrectionStock');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
