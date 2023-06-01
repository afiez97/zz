<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class pen_calon_siri_penilaian extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'id_calon_siri_penilaian';
    protected $table = 'pen_calon_siri_penilaian';
    protected $fillable = [
        'id_calon_siri_penilaian', 'FK_siri_penilaian', 'nama', 'no_kad_pengenalan', 'jawatan', 'emel', 'no_angka_giliran', 'gred', 'statusrekod', 'created_at', 'updated_at', 'created_by', 'updated_by'
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
