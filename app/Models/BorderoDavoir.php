<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BorderoDAvoir extends Model
{
    use HasFactory;

    protected $fillable = [
        'region_id',
        'description',
        'user_id',
        'type',
        'date'
    ];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function details()
    {
        return $this->hasMany(DetailBorderoDAvoir::class);
    }
}
