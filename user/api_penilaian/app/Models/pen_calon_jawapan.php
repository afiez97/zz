<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class pen_calon_jawapan extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'pen_calon_jawapan';
    protected $primaryKey = 'id_calon_jawapan';
    protected $fillable = [
        'id_calon_jawapan',
        'FK_calon_soalan',
        'no_kad_pengenalan',
        'FK_siri_soalan',
        'jawapan',
        'markah_jawapan',
        'flag_markah',
        'FK_siri_penilaian',
        'statusrekod',
        'created_by', 'updated_by',
        'created_at', 'updated_at',
    ];
}
