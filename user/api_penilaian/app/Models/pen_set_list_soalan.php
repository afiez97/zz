<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class pen_set_list_soalan extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'pen_set_list_soalan';
    protected $fillable = [
        'PK_bank_soalan',
        'kod_soalan',
        'FK_penilaian',
        'FK_jenis_soalan',
        'topik',
        'tahap',
        'FK_set_soalan',
        'soalan',
        'jawapan',
        'skema',
        'mark',
        'display_mark',
        'FK_infodetail',
        'created_by', 'updated_by', 'statusrekod'
    ];
}
