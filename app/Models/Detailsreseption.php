<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailReception extends Model
{
    use HasFactory;

    protected $fillable = [
        'reception_id',
        'manuel_id',
        'embalage',
        'caisse'
    ];

    public function reception()
    {
        return $this->belongsTo(Reception::class);
    }

    public function manuel()
    {
        return $this->belongsTo(Manuel::class);
    }
}
