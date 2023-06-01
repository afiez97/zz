<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class fas_status extends Model
{
    protected $table = 'fas_status';

    protected $primaryKey = "id_fas_status";

    protected $fillable = [
        'id_fas_status',
        'status',
        'created_by',
        'updated_by',
        'statusrekod'
    ];
}
