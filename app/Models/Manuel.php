<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manuel extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre_id',
        'annee_id'
    ];

    public function titre()
    {
        return $this->belongsTo(Titre::class);
    }

    public function annee()
    {
        return $this->belongsTo(Annee::class);
    }
}
