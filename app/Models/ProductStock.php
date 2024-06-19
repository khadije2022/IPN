<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductStock extends Model
{
    protected $table = 'product_stock';
    public $timestamps = false;
    protected $primaryKey = 'product_id';
    public $incrementing = false;
    protected $keyType = 'string';
}
