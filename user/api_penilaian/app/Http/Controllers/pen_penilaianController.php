<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_penilaian;
use App\Models\pen_users;

class pen_penilaianController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getToken($id)  {
        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $token     = hash("sha256", Str::random(32).$salt);
        $obj = pen_users::where('id_users',$id)->update([
            'token' => $token
        ]);

        $token = false;

        if($obj){
            $obj = pen_users::where('id_users',$id)->first(['token']);
            $random = hash("sha256", Str::random(32)).'0L1v3';
            $token = $random.$obj->token;
        }

        return $token;
    }

    public function register(Request $request) {

        $kod_penilaian = $request->input('kod_penilaian');
        $nama_penilaian = $request->input('nama_penilaian');
        $FK_penyelaras = $request->input('FK_penyelaras');
        $FK_kluster = $request->input('FK_kluster');
        $FK_kategori_penilaian = $request->input('FK_kategori_penilaian');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');

        // $nosiri = $request->input('nosiri');
        // $tahun = $request->input('tahun');
        // $keterangan = $request->input('keterangan');
        // $jenis_penilaian = $request->input('jenis_penilaian');

        $obj = pen_penilaian::create([
            'kod_penilaian' => $kod_penilaian,
            'nama_penilaian' => $nama_penilaian,
            'FK_penyelaras' => $FK_penyelaras,
            'FK_kluster' => $FK_kluster,
            'FK_kategori_penilaian' => $FK_kategori_penilaian,
            'created_by' => $created_by,
            'updated_by' => $updated_by

            // 'nosiri' => $nosiri,
            // 'tahun' => $tahun,
            // 'keterangan' => $keterangan,
            // 'jenis_penilaian' => $jenis_penilaian,
        ]);

        $id = $obj -> id_penilaian;

        if ($obj)  {

            if($request->file('logo')){

                $fileName = $request->file('logo')->getClientOriginalName();
                $fileName = $id . '_' . $fileName;

                $path = 'logo';
                $destinationPath = $path; // upload path

                $request->file('logo')->move($destinationPath, $fileName);

                $obj_upt = pen_penilaian::where('id_penilaian',$id) -> update([
                    'logo' => $fileName
                ]);

                if($obj_upt)  {
                    return response()->json([
                        'success'=>true,
                        'message'=>'Pendaftaran Rekod Berjaya!',
                        'data'=>$obj,
                    ],201);
                }else    {
                    return response()->json([
                        'success'=>false,
                        'message'=>'Bad Request',
                        'data'=>''
                    ],404);
                }
                
            }else{
                    return response()->json([
                        'success'=>true,
                        'message'=>'Pendaftaran Rekod Berjaya!',
                        'data'=>$obj,
                    ],201);

            }
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_penilaian');

        $obj = pen_penilaian::leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
                                leftjoin('pen_kategori_penilaian','pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                leftjoin('pen_kluster','pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                where('id_penilaian',$id)->
                                first([
                                    'id_penilaian',
                                    'kod_penilaian',
                                    'nama_penilaian',
                                    'pen_penilaian.statusrekod',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'id_kategori_penilaian',
                                    'nama_kategori_penilaian',
                                    'id_kluster',
                                    'nama_kluster',
                                    'logo',
                                    'FK_penyelaras',
                                    'pen_penilaian.FK_kluster',
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function list()  {
        $obj = pen_penilaian::leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
                                leftjoin('pen_kategori_penilaian','pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                leftjoin('pen_kluster','pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                where('pen_penilaian.statusrekod','1') -> 
                                get([
                                    'id_penilaian',
                                    'kod_penilaian',
                                    'nama_penilaian',
                                    'pen_penilaian.statusrekod',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'id_kategori_penilaian',
                                    'nama_kategori_penilaian',
                                    'id_kluster',
                                    'nama_kluster',
                                    'logo',
                                ]);

        if ($obj)   {
            // $token = $this->getToken(1);
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj,
                // 'token'=>$token
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function listByPenyelaras(Request $request)  {
        $FK_users = $request->input('FK_users');
        $FK_kluster = $request->input('FK_kluster');
        $capaian = $request->input('capaian');

        $obj = pen_penilaian::leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
                                leftjoin('pen_kategori_penilaian','pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                leftjoin('pen_kluster','pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster');
        
        if($capaian != "c4ca4238a0b923820dcc509a6f75849b"){
            $obj = $obj -> where('pen_penilaian.FK_penyelaras',$FK_users);
        }
         
        $obj = $obj ->  get([
                            'id_penilaian',
                            'kod_penilaian',
                            'nama_penilaian',
                            'pen_penilaian.statusrekod',
                            'id_users',
                            'nama',
                            'no_kad_pengenalan',
                            'notel',
                            'notel_kerajaan',
                            'emel',
                            'emel_kerajaan',
                            'id_kategori_penilaian',
                            'nama_kategori_penilaian',
                            'id_kluster',
                            'nama_kluster',
                            'logo',
                        ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function countSiriPenilaian()  {

        $obj = pen_penilaian::leftjoin('pen_siri_penilaian', function($join){
                                    $join->on(function($query){
                                        $query->on('pen_siri_penilaian.FK_penilaian','pen_penilaian.id_penilaian')
                                        ->where('id_penilaian','>', '0');
                                    });
                                })->
                                groupBy('id_siri_penilaian')->
                                get([
                                    DB::RAW("COUNT(id_siri_penilaian) AS total")
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function countSiriPenilaianByKluster(Request $request)  {
        $FK_kluster = $request->input('FK_kluster');

        $obj = pen_penilaian::leftjoin('pen_siri_penilaian', function($join){
                                    $join->on(function($query){
                                        $query->on('pen_siri_penilaian.FK_penilaian','pen_penilaian.id_penilaian')
                                        ->where('id_penilaian','>', '0');
                                    });
                                })->
                                groupBy('id_penilaian')->
                                groupBy('FK_kluster')->
                                where('pen_penilaian.FK_kluster', $FK_kluster)->
                                get([
                                    'id_penilaian',
                                    DB::RAW("COUNT(FK_kluster) AS total")
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function countSiriPenilaianByPenyelaras(Request $request)  {
        $created_by = $request->input('created_by');

        $obj = pen_penilaian::leftjoin('pen_siri_penilaian', function($join){
                                    $join->on(function($query){
                                        $query->on('pen_siri_penilaian.FK_penilaian','pen_penilaian.id_penilaian')
                                        ->where('id_penilaian','>', '0');
                                    });
                                })->
                                groupBy('id_penilaian')->
                                groupBy('nama_penilaian')->
                                groupBy('FK_penilaian')->
                                where('pen_penilaian.created_by', $created_by)->
                                get([
                                    'id_penilaian',
                                    'nama_penilaian',
                                    DB::RAW("COUNT(FK_penilaian) AS total")
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function countKategoriPenilaian()  {

        $obj = pen_penilaian::leftjoin('pen_kategori_penilaian','pen_kategori_penilaian.id_kategori_penilaian','pen_penilaian.FK_kategori_penilaian')->
                                leftjoin('pen_siri_penilaian','pen_siri_penilaian.FK_penilaian','pen_penilaian.id_penilaian')->
                                groupBy('nama_kategori_penilaian')->
                                groupBy('FK_kategori_penilaian')->
                                where('pen_penilaian.statusrekod','1')->
                                where('pen_siri_penilaian.statusrekod','1')->
                                get([
                                    'nama_kategori_penilaian',
                                    DB::RAW("COUNT(FK_kategori_penilaian) AS total")
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function countKategoriPenilaianByKluster($FK_kluster)  {

        $obj = pen_penilaian::leftjoin('pen_kategori_penilaian','pen_kategori_penilaian.id_kategori_penilaian','pen_penilaian.FK_kategori_penilaian')->
                                leftjoin('pen_siri_penilaian','pen_siri_penilaian.FK_penilaian','pen_penilaian.id_penilaian')->
                                groupBy('nama_kategori_penilaian')->
                                groupBy('FK_kategori_penilaian')->
                                where('pen_penilaian.statusrekod','1')->
                                where('pen_siri_penilaian.statusrekod','1')->
                                where('pen_penilaian.FK_kluster',$FK_kluster)->
                                get([
                                    'nama_kategori_penilaian',
                                    DB::RAW("COUNT(FK_kategori_penilaian) AS total")
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function countKategoriPenilaianByPenyelaras($FK_penyelaras)  {

        $obj = pen_penilaian::leftjoin('pen_kategori_penilaian','pen_kategori_penilaian.id_kategori_penilaian','pen_penilaian.FK_kategori_penilaian')->
                                leftjoin('pen_siri_penilaian','pen_siri_penilaian.FK_penilaian','pen_penilaian.id_penilaian')->
                                groupBy('nama_kategori_penilaian')->
                                groupBy('FK_kategori_penilaian')->
                                where('pen_penilaian.statusrekod','1')->
                                where('pen_siri_penilaian.statusrekod','1')->
                                where('FK_penyelaras',$FK_penyelaras)->
                                get([
                                    'nama_kategori_penilaian',
                                    DB::RAW("COUNT(FK_kategori_penilaian) AS total")
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function countKategoriPenilaianByUrusetia($FK_users)  {

        $obj = pen_penilaian::leftjoin('pen_kategori_penilaian','pen_kategori_penilaian.id_kategori_penilaian','pen_penilaian.FK_kategori_penilaian')->
                                leftjoin('pen_siri_penilaian','pen_siri_penilaian.FK_penilaian','pen_penilaian.id_penilaian')->
                                leftjoin('pen_urusetia','pen_urusetia.FK_siri_penilaian','pen_siri_penilaian.id_siri_penilaian')->
                                groupBy('nama_kategori_penilaian')->
                                groupBy('FK_kategori_penilaian')->
                                where('pen_penilaian.statusrekod','1')->
                                where('pen_siri_penilaian.statusrekod','1')->
                                where('pen_urusetia.FK_users',$FK_users)->
                                get([
                                    'nama_kategori_penilaian',
                                    DB::RAW("COUNT(FK_kategori_penilaian) AS total")
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function listAll()  {
        $obj = pen_penilaian::leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
                                leftjoin('pen_kategori_penilaian','pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                leftjoin('pen_kluster','pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                get([
                                    'id_penilaian',
                                    'kod_penilaian',
                                    'nama_penilaian',
                                    'pen_penilaian.statusrekod',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'id_kategori_penilaian',
                                    'nama_kategori_penilaian',
                                    'id_kluster',
                                    'nama_kluster',
                                    'logo',
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
        
    }

    public function update(Request $request)    {
        $id = $request->input('id_penilaian');
        $kod_penilaian = $request->input('kod_penilaian');
        $nama_penilaian = $request->input('nama_penilaian');
        $FK_kluster = $request->input('FK_kluster');
        $FK_penyelaras = $request->input('FK_penyelaras');
        $FK_kategori_penilaian = $request->input('FK_kategori_penilaian');
        $updated_by = $request->input('updated_by');

        $obj = pen_penilaian::where('id_penilaian',$id)  -> update([
            'kod_penilaian' => $kod_penilaian,
            'nama_penilaian' => $nama_penilaian,
            'FK_kluster' => $FK_kluster,
            'FK_penyelaras' => $FK_penyelaras,
            'FK_kategori_penilaian' => $FK_kategori_penilaian,
            'updated_by' => $updated_by
        ]);

        if ($obj)  {

            if($request->file('logo') != null){

                $obj_img = pen_penilaian::where('id_penilaian',$id)->first(['logo']);

                if($obj_img->logo != null || $obj_img->logo != ''){

                    unlink("logo/".$obj_img->logo);

                }
                $fileName = $request->file('logo')->getClientOriginalName();
                $fileName = $id . '_' . $fileName;


                $path = 'logo';
                $destinationPath = $path; // upload path

                $request->file('logo')->move($destinationPath, $fileName);
                // DD($destinationPath);

                $obj_upt = pen_penilaian::where('id_penilaian',$id) -> update([
                    'logo' => $fileName
                ]);

                if($obj_upt)  {
                    // $token = $this->getToken($updated_by);
                    return response()->json([
                        'success'=>true,
                        'message'=>'Kemaskini Rekod Berjaya!',
                        'data'=>$obj,
                        // 'token'=>$token
                    ],201);
                }else    {
                    return response()->json([
                        'success'=>false,
                        'message'=>'Bad Request',
                        'data'=>''
                    ],404);
                }
                
            }else{

                // $token = $this->getToken($updated_by);
                    return response()->json([
                        'success'=>true,
                        'message'=>'Kemaskini Rekod Berjaya!',
                        'data'=>$obj,
                        // 'token'=>$token
                    ],201);

            }
            
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Kemaskini Gagal!",
                'data'=>''
            ],404);
        }
    }

    public function delete(Request $request)    {
        $id = $request->input('id_penilaian');

        // $pen_penilaian = pen_penilaian::find($id); 
        $obj_search = pen_penilaian::where('id_penilaian',$id)->first(); 
        switch($obj_search->statusrekod)    {
            case 0: $obj = pen_penilaian::where('id_penilaian',$id) -> update([
                        'statusrekod' => '1',
                    ]);
                    break;
            case 1: $obj = pen_penilaian::where('id_penilaian',$id) -> update([
                        'statusrekod' => '0',
                    ]);
                    break;
        }
        $obj_search = pen_penilaian::where('id_penilaian',$id)->first();

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $obj_search
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Gagal Padam!",
                'data'=>''
            ],404);
        }
    }
}
