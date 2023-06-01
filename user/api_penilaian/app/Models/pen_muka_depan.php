<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class pen_muka_depan extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'pen_muka_depan';
    protected $primaryKey = "id_muka_depan";

    protected $fillable = [
        'id_muka_depan', 'FK_siri_penilaian', 'arahan', 'nama', 'stat_nama', 'gred', 'stat_gred', 'jawatan', 'stat_jawatan', 'emel', 'stat_emel', 
        'no_kad_pengenalan', 'stat_no_kad_pengenalan', 'no_angka_giliran', 'stat_no_angka_giliran', 
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
