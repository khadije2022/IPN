<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailBorderoDAvoir extends Model
{
    use HasFactory;

    protected $fillable = [
        'bordero_d_avoir_id',
        'manuel_id',
        'embalage',
        'caisse'
    ];

    public function borderoDAvoir()
    {
        return $this->belongsTo(BorderoDAvoir::class);
    }

    public function manuel()
    {
        return $this->belongsTo(Manuel::class);
    }
}
