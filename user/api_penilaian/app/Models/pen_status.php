<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class pen_status extends Model
{
    protected $table = 'pen_status';

    protected $primaryKey = "id_status";

    protected $fillable = [
        'id_status',
        'status',
        'created_by',
        'updated_by',
        'statusrekod'
    ];
}
