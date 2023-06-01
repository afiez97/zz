<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_siri_urusetia;

class pen_siri_urusetiaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function register(Request $request) {
        $urusetia = $request->input('urusetia');
        $penggubal = $request->input('penggubal');
        $penilai = $request->input('penilai');
        $panel_penilai = $request->input('panel_penilai');
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $FK_users = $request->input('FK_users');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');

        $obj = pen_siri_urusetia::create([
            'urusetia' => $urusetia,
            'penggubal' => $penggubal,
            'penilai' => $penilai,
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
                'data'=>$obj
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
        $id = $request->input('id_siri_urusetia');

        $obj = pen_siri_urusetia::leftjoin('pen_kategori_urusetia', 'pen_kategori_urusetia.id_kategori_urusetia', '=', 'pen_siri_urusetia.FK_kategori_urusetia')->
                                leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_siri_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_siri_urusetia.FK_users')->
                                where('id_siri_urusetia',$id)->
                                first([
                                    'id_siri_urusetia',
                                    'id_kategori_urusetia',
                                    'nama_kategori_urusetia',
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
                                    'pen_siri_urusetia.statusrekod',
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
        $obj = pen_siri_urusetia::leftjoin('pen_kategori_urusetia', 'pen_kategori_urusetia.id_kategori_urusetia', '=', 'pen_siri_urusetia.FK_kategori_urusetia')->
                                leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_siri_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_siri_urusetia.FK_users')->
                                where('pen_siri_urusetia.statusrekod','1') -> 
                                get([
                                    'id_siri_urusetia',
                                    'id_kategori_urusetia',
                                    'nama_kategori_urusetia',
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
                                    'pen_siri_urusetia.statusrekod',
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

        $obj = pen_siri_urusetia::leftjoin('pen_kategori_urusetia', 'pen_kategori_urusetia.id_kategori_urusetia', '=', 'pen_siri_urusetia.FK_kategori_urusetia')->
                                leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_siri_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_siri_urusetia.FK_users')->
                                where('pen_siri_urusetia.FK_penilaian',$FK_penilaian) -> 
                                get([
                                    'id_siri_urusetia',
                                    'id_kategori_urusetia',
                                    'nama_kategori_urusetia',
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
                                    'pen_siri_urusetia.statusrekod',
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

    public function listPenilaianByUrusSetia(Request $request)  {
        $FK_users = $request->input('FK_users');

        $obj = pen_siri_urusetia::leftjoin('pen_kategori_urusetia', 'pen_kategori_urusetia.id_kategori_urusetia', '=', 'pen_siri_urusetia.FK_kategori_urusetia')->
                                leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_siri_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_siri_urusetia.FK_users')->
                                where('pen_siri_urusetia.FK_users',$FK_users) -> 
                                get([
                                    'id_siri_urusetia',
                                    'id_kategori_urusetia',
                                    'nama_kategori_urusetia',
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
                                    'pen_siri_urusetia.statusrekod',
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
        $obj = pen_siri_urusetia::leftjoin('pen_kategori_urusetia', 'pen_kategori_urusetia.id_kategori_urusetia', '=', 'pen_siri_urusetia.FK_kategori_urusetia')->
                                leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_siri_urusetia.FK_siri_penilaian')->
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_siri_urusetia.FK_users')->
                                get([
                                    'id_siri_urusetia',
                                    'id_kategori_urusetia',
                                    'nama_kategori_urusetia',
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
                                    'pen_siri_urusetia.statusrekod',
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
        $id = $request->input('id_siri_urusetia');
        $FK_kategori_urusetia = $request->input('FK_kategori_urusetia');
        $FK_users = $request->input('FK_users');
        $FK_penilaian = $request->input('FK_penilaian');
        $FK_kluster = $request->input('FK_kluster');
        $updated_by = $request->input('updated_by');

        // $pen_siri_urusetia = pen_siri_urusetia::find($id); 

        $obj = pen_siri_urusetia::where('id_siri_urusetia',$id)  -> update([
            'FK_kategori_urusetia' => $FK_kategori_urusetia,
            'FK_users' => $FK_users,
            'FK_penilaian' => $FK_penilaian,
            'FK_kluster' => $FK_kluster,
            'updated_by' => $updated_by
        ]);

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

    public function delete(Request $request)    {
        $id = $request->input('id_siri_urusetia');

        // $pen_siri_urusetia = pen_siri_urusetia::find($id); 
        $obj_search = pen_siri_urusetia::where('id_siri_urusetia',$id)->first(); 
        switch($obj_search->statusrekod)    {
            case 0: $obj = pen_siri_urusetia::where('id_siri_urusetia',$id) -> update([
                        'statusrekod' => '1',
                    ]);
                    break;
            case 1: $obj = pen_siri_urusetia::where('id_siri_urusetia',$id) -> update([
                        'statusrekod' => '0',
                    ]);
                    break;
        }
        $obj_search = pen_siri_urusetia::where('id_siri_urusetia',$id)->first();

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
