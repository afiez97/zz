<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class penilaian_pen_jwpn_pengguna extends Model
{
       /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primarykey = 'id_penilaian_pen_jwpn_pengguna';
    protected $table = 'penilaian_pen_jwpn_pengguna';
   
    protected $fillable = [
        'id_penilaian_pen_jwpn_pengguna', 
        'id_penilaian_pen_pengguna', 
        'id_soalan',
        'jawapan_skema', 
        'statusrekod', 
      
    
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
