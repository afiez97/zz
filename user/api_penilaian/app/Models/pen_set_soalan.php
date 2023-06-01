<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class pen_set_soalan extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'pen_set_soalan';
    protected $primaryKey = 'id_set_soalan';
    protected $fillable = [
        'id_set_soalan',
        'FK_siri_penilaian',
        'FK_penilaian',
        'kod_set',
        'json_list',
        'jenis_set',
        'peratus',
        'created_by', 'updated_by', 'statusrekod', 'catatan'
    ];
}
