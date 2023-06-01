<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_urusetia;

class pen_urusetiaController extends Controller
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
        $urusetia = $request->input('urusetia');
        $jk_penggubal = $request->input('jk_penggubal');
        $jk_penilai = $request->input('jk_penilai');
        $panel_penilai = $request->input('panel_penilai');
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $FK_users = $request->input('FK_users');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');

        $obj = pen_urusetia::create([
            'urusetia' => $urusetia,
            'jk_penggubal' => $jk_penggubal,
            'jk_penilai' => $jk_penilai,
            'panel_penilai' => $panel_penilai,
            'FK_siri_penilaian' => $FK_siri_penilaian,
            'FK_users' => $FK_users,
            'created_by' => $created_by,
            'updated_by' => $updated_by
        ]);

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$obj,
            ],201);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_urusetia');

        $obj = pen_urusetia::
                                // leftjoin('pen_kategori_urusetia', 'pen_kategori_urusetia.id_kategori_urusetia', '=', 'pen_urusetia.FK_kategori_urusetia')->
                                leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_urusetia.FK_users')->
                                where('id_urusetia',$id)->
                                first([
                                    'id_urusetia',
                                    'urusetia',
                                    'jk_penggubal',
                                    'jk_penilai',
                                    'panel_penilai',
                                    // 'id_kategori_urusetia',
                                    // 'nama_kategori_urusetia',
                                    'id_siri_penilaian',
                                    'nama_siri_penilaian',
                                    'id_penilaian',
                                    'nama_penilaian',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'id_kluster',
                                    'nama_kluster',
                                    'pen_urusetia.statusrekod',
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

    public function showBySiriPenilaian(Request $request)  {
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $FK_users = $request->input('FK_users');

        $obj = pen_urusetia::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_urusetia.FK_users')->
                                where('FK_siri_penilaian',$FK_siri_penilaian)->
                                where('FK_users',$FK_users)->
                                first([
                                    'id_urusetia',
                                    'urusetia',
                                    'jk_penggubal',
                                    'jk_penilai',
                                    'panel_penilai',
                                    // 'id_kategori_urusetia',
                                    // 'nama_kategori_urusetia',
                                    'id_siri_penilaian',
                                    'nama_siri_penilaian',
                                    'id_penilaian',
                                    'nama_penilaian',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'id_kluster',
                                    'nama_kluster',
                                    'pen_urusetia.statusrekod',
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
                'message'=>'Good Error',
                'data'=>''
            ],400);
        }
    }

    public function showJKBySiriPenilaian(Request $request)  {
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');

        $obj = pen_urusetia::where('pen_urusetia.FK_siri_penilaian',$FK_siri_penilaian)->
                                where('pen_urusetia.jk_penilai','1')->
                                first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
                'data'=>$obj
            ],200);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Good Error',
                'data'=>''
            ],400);
        }
    }

    public function list()  {
        $obj = pen_urusetia::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_urusetia.FK_users')->
                                where('pen_urusetia.statusrekod','1') -> 
                                get([
                                    'id_urusetia',
                                    'urusetia',
                                    'jk_penggubal',
                                    'jk_penilai',
                                    'panel_penilai',
                                    // 'id_kategori_urusetia',
                                    // 'nama_kategori_urusetia',
                                    'id_siri_penilaian',
                                    'nama_siri_penilaian',
                                    'id_penilaian',
                                    'nama_penilaian',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'id_kluster',
                                    'nama_kluster',
                                    'pen_urusetia.statusrekod',
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

    public function listByPenilaian(Request $request)  {
        $FK_penilaian = $request->input('FK_penilaian');
        $FK_users = $request->input('FK_users');

        $obj = pen_urusetia::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_urusetia.FK_users')->
                                where('pen_siri_penilaian.FK_penilaian',$FK_penilaian)->
                                where('pen_urusetia.FK_users',$FK_users)->
                                get([
                                    'id_urusetia',
                                    'urusetia',
                                    'jk_penggubal',
                                    'jk_penilai',
                                    'panel_penilai',
                                    // 'id_kategori_urusetia',
                                    // 'nama_kategori_urusetia',
                                    'id_siri_penilaian',
                                    'nama_siri_penilaian',
                                    'id_penilaian',
                                    'nama_penilaian',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'pen_urusetia.statusrekod',
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
                'message'=>'Good Error',
                'data'=>''
            ],400);
        }
    }

    public function listBySiriPenilaian(Request $request)  {
        $id = $request->input('FK_siri_penilaian');

        $obj = pen_urusetia::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_urusetia.FK_users')->
                                where('FK_siri_penilaian',$id)->
                                get([
                                    'id_urusetia',
                                    'urusetia',
                                    'jk_penggubal',
                                    'jk_penilai',
                                    'panel_penilai',
                                    // 'id_kategori_urusetia',
                                    // 'nama_kategori_urusetia',
                                    'id_siri_penilaian',
                                    'nama_siri_penilaian',
                                    'id_penilaian',
                                    'nama_penilaian',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'id_kluster',
                                    'nama_kluster',
                                    'pen_urusetia.statusrekod',
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

    public function listSiriPenilaian(Request $request)  {
        $FK_users = $request->input('FK_users');

        $obj = pen_urusetia::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                // leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_urusetia.FK_users')->
                                where('pen_urusetia.FK_users',$FK_users)->
                                get([
                                    'id_urusetia',
                                    'urusetia',
                                    'jk_penggubal',
                                    'jk_penilai',
                                    'panel_penilai',
                                    // 'id_kategori_urusetia',
                                    // 'nama_kategori_urusetia',
                                    'id_siri_penilaian',
                                    'kod_siri_penilaian',
                                    'nama_siri_penilaian',
                                    'id_penilaian',
                                    'nama_penilaian',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    // 'id_kluster',
                                    // 'nama_kluster',
                                    'pen_urusetia.statusrekod',
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

    // public function listByPenilaian(Request $request)  {
    //     $FK_penilaian = $request->input('FK_penilaian');

    //     $obj = pen_urusetia::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_urusetia.FK_siri_penilaian')->
    //                             leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
    //                             leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
    //                             leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_urusetia.FK_users')->
    //                             where('pen_urusetia.FK_penilaian',$FK_penilaian) -> 
    //                             get([
    //                                 'id_urusetia',
    //                                 'urusetia',
    //                                 'jk_penggubal',
    //                                 'jk_penilai',
    //                                 'panel_penilai',
    //                                 // 'id_kategori_urusetia',
    //                                 // 'nama_kategori_urusetia',
    //                                 'id_siri_penilaian',
    //                                 'nama_siri_penilaian',
    //                                 'id_penilaian',
    //                                 'nama_penilaian',
    //                                 'id_users',
    //                                 'nama',
    //                                 'no_kad_pengenalan',
    //                                 'notel',
    //                                 'notel_kerajaan',
    //                                 'emel',
    //                                 'emel_kerajaan',
    //                                 'id_kluster',
    //                                 'nama_kluster',
    //                                 'pen_urusetia.statusrekod',
    //                             ]);

    //     if ($obj)   {
    //         return response()->json([
    //             'success'=>true,
    //             'message'=>'List Success!',
    //             'data'=>$obj
    //         ],200);
    //     } else    {
    //         return response()->json([
    //             'success'=>false,
    //             'message'=>'Bad Request',
    //             'data'=>''
    //         ],404);
    //     }
        
    // }

    public function listPenilaianByUrusSetia(Request $request)  {
        $FK_users = $request->input('FK_users');

        $obj = pen_urusetia::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_urusetia.FK_users')->
                                where('pen_urusetia.FK_users',$FK_users) -> 
                                get([
                                    'id_urusetia',
                                    'urusetia',
                                    'jk_penggubal',
                                    'jk_penilai',
                                    'panel_penilai',
                                    // 'id_kategori_urusetia',
                                    // 'nama_kategori_urusetia',
                                    'id_siri_penilaian',
                                    'nama_siri_penilaian',
                                    'id_penilaian',
                                    'nama_penilaian',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'id_kluster',
                                    'nama_kluster',
                                    'pen_urusetia.statusrekod',
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
        $obj = pen_urusetia::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_urusetia.FK_users')->
                                get([
                                    'id_urusetia',
                                    'urusetia',
                                    'jk_penggubal',
                                    'jk_penilai',
                                    'panel_penilai',
                                    // 'id_kategori_urusetia',
                                    // 'nama_kategori_urusetia',
                                    'id_siri_penilaian',
                                    'nama_siri_penilaian',
                                    'id_penilaian',
                                    'nama_penilaian',
                                    'id_users',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
                                    'id_kluster',
                                    'nama_kluster',
                                    'pen_urusetia.statusrekod',
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
        $id = $request->input('id_urusetia');
        $FK_users = $request->input('FK_users');
        $urusetia = $request->input('urusetia');
        $jk_penggubal = $request->input('jk_penggubal');
        $jk_penilai = $request->input('jk_penilai');
        $panel_penilai = $request->input('panel_penilai');
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $updated_by = $request->input('updated_by');

        // $pen_urusetia = pen_urusetia::find($id); 

        $obj = pen_urusetia::where('id_urusetia',$id)  -> update([
            'FK_users' => $FK_users,
            'urusetia' => $urusetia,
            'jk_penggubal' => $jk_penggubal,
            'jk_penilai' => $jk_penilai,
            'panel_penilai' => $panel_penilai,
            'FK_siri_penilaian' => $FK_siri_penilaian,
            'updated_by' => $updated_by
        ]);

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data'=>$obj,
            ],201);
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
        $id = $request->input('id_urusetia');

        // $pen_urusetia = pen_urusetia::find($id); 
        $obj_search = pen_urusetia::where('id_urusetia',$id)->first(); 
        switch($obj_search->statusrekod)    {
            case 0: $obj = pen_urusetia::where('id_urusetia',$id) -> update([
                        'statusrekod' => '1',
                    ]);
                    break;
            case 1: $obj = pen_urusetia::where('id_urusetia',$id) -> update([
                        'statusrekod' => '0',
                    ]);
                    break;
        }
        $obj_search = pen_urusetia::where('id_urusetia',$id)->first();

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

    public function permDelete(Request $request)    {
        $id = $request->input('id_urusetia');

        $obj = pen_urusetia::where('id_urusetia',$id)  -> delete();

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $obj
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Kemaskini Gagal!",
                'data'=>''
            ],404);
        }
    }

    public function permDeleteUsersSiri(Request $request)    {
        $FK_users = $request->input('FK_users');
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');

        $obj = pen_urusetia::where('FK_users',$FK_users)  -> where('FK_siri_penilaian',$FK_siri_penilaian)  -> delete();

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $obj
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Kemaskini Gagal!",
                'data'=>''
            ],404);
        }
    }
}
