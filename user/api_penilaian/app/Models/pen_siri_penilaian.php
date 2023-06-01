<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class pen_siri_penilaian extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'id_siri_penilaian';
    protected $table = 'pen_siri_penilaian';
    protected $fillable = [
        'id_siri_penilaian', 
        'FK_penilaian', 
        'kod_siri_penilaian', 
        'nama_siri_penilaian', 
        'FK_urusetia', 
        'tahun', 
        'kod', 
        'nosiri', 
        'keterbukaan', 
        'tarikh_mula_mohon', 
        'tarikh_tamat_mohon', 
        'tarikh_penilaian', 
        'waktu_mula', 
        'waktu_tamat', 
        'bil_max_calon', 
        'keterangan', 
        'jenis_penilaian', 
        'gred', 
        'tamat_penilaian', 
        'template_emel',
        'statusrekod', 'created_at', 'updated_at', 'created_by', 'updated_by'
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
