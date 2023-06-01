<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class pen_permohonan_penilaian extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'pen_permohonan_penilaian';
    protected $primaryKey = 'id_permohonan_penilaian';
    protected $fillable = [
        'id_permohonan_penilaian',
        'nama',
        'no_kad_pengenalan',
        'gred',
        'jawatan',
        'notel',
        'emel',
        'FK_sesi',
        'FK_siri_penilaian',
        'status_permohonan',
        'statusrekod',
        'created_by', 'updated_by',
        'created_at', 'updated_at',
    ];
}
