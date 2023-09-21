<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function upload()
    {
        return $this->hasOne(Upload::class, 'code', 'package_id');
    }
}
