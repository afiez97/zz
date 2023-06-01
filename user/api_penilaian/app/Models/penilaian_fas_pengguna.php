<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class penilaian_pen_pengguna extends Model
{
       /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primarykey = 'id_penilaian_pen_pengguna';
    protected $table = 'penilaian_pen_pengguna';
   
    protected $fillable = [
        'id_penilaian_pen_pengguna', 
        'id_tem_pen_penilaian', 
        'id_pengguna',
        'id_brg', 
      
    
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];   
}
