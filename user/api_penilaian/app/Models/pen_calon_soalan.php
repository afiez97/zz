<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class pen_calon_soalan extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'pen_calon_soalan';
    protected $primaryKey = 'id_calon_soalan';
    protected $fillable = [
        'id_calon_soalan',
        'no_kad_pengenalan',
        'nama',
        'gred',
        'jawatan',
        'emel',
        'no_angka_giliran',
        'notel',
        'token',
        'FK_siri_penilaian',
        'json_list',
        'FK_sesi',
        'markah_akhir',
        'markah_full',
        'peratus_set',
        'peratus_siri',
        'statusrekod',
        'image',
        'created_by', 'updated_by',
        'created_at', 'updated_at',
    ];
}
