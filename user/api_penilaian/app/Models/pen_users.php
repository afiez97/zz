<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class pen_users extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'id_users';
    protected $table = 'pen_users';
    protected $fillable = [
        'id_users', 'nama', 'emel', 'no_kad_pengenalan', 'katalaluan', 'notel', 'FK_jenis_pengguna', 'FK_gelaran',
        'gambar', 'resetkatalaluan', 'emel_kerajaan', 'notel_kerajaan', 'nama_jawatan', 
        'kategori_perkhidmatan', 'skim', 'users_intan', 'FK_kampus', 'FK_kluster', 'FK_subkluster', 'FK_unit', 
        'FK_kementerian', 'FK_kat_agensi', 'FK_agensi', 'taraf_jawatan', 'FK_bahagian', 'FK_ila', 'nama_sekolah', 'nama_majikan', 'alamat_majikan', 
        'notel_majikan', 'emel_majikan', 'nama_ketua_jabatan', 'notel_ketua_jabatan', 'emel_ketua_jabatan', 'jawatan_ketua_jabatan',
        'statusrekod', 'created_by', 'updated_by', 
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'katalaluan', 'token'
    ];
}
