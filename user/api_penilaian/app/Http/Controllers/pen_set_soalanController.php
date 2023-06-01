<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_set_soalan;

class pen_set_soalanController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function create(Request $request){
        $FK_siri_penilaian  = $request->input('id_siri_penilaian');
        $FK_penilaian       = $request->input('id_penilaian');
        $kod_set            = $request->input('kod_set');
        $json_list          = $request->input('json_list');
        $created_by          = $request->input('noic');
        $statusrekod          = $request->input('statusrekod');
        $jenis_set          = $request->input('jenis_set');

        $data = [
            'FK_siri_penilaian' => $FK_siri_penilaian,
            'FK_penilaian' => $FK_penilaian,
            'kod_set' => $kod_set,
            'json_list' => $json_list,
            'created_by' => $created_by,
            'updated_by' => $created_by,
            'statusrekod' => $statusrekod,
            'jenis_set' => $jenis_set,
        ];

        $obj = pen_set_soalan::create($data);

        $id = $obj->id;

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Tambah Soalan Berjaya!',
                'data'=>$obj
            ],201);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Tambah Soalan Gagal!',
                'data'=>''
            ],401);
        }
    }

    public function update(Request $request){
        $id_set_soalan      = $request->input('id_set_soalan');
        $json_list          = $request->input('json_list');

        $data = [
            'json_list' => $json_list
        ];

        $obj = pen_set_soalan::where('id_set_soalan',$id_set_soalan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Set Soalan Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Kemaskini Set Soalan Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function updatePeratusSet(Request $request){
        $id_set_soalan      = $request->input('id_set_soalan');
        $peratus            = $request->input('peratus');

        $data = [
            'peratus' => $peratus
        ];

        $obj = pen_set_soalan::where('id_set_soalan',$id_set_soalan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Peratus Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Kemaskini Peratus Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function uptJK(Request $request){
        $id_set_soalan      = $request->input('id_set_soalan');
        $statusrekod          = $request->input('statusrekod');

        $data = [
            'statusrekod' => $statusrekod
        ];

        $obj = pen_set_soalan::where('id_set_soalan',$id_set_soalan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Set Soalan Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Kemaskini Set Soalan Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function approval(Request $request){
        $id_set_soalan    = $request->input('id_set_soalan');
        $statusrekod    = $request->input('statusrekod');
        $catatan    = $request->input('catatan');

        $data = [
            'statusrekod' => $statusrekod,
            'catatan' => $catatan,
        ];

        $obj = pen_set_soalan::where('id_set_soalan',$id_set_soalan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function show(Request $request){
        $id_set_soalan = $request->input('id_set_soalan');

        $obj = pen_set_soalan::
        leftjoin('pen_penilaian','pen_penilaian.id_penilaian','pen_set_soalan.FK_penilaian')->
        leftjoin('pen_siri_penilaian','pen_siri_penilaian.id_siri_penilaian','pen_set_soalan.FK_siri_penilaian')->
        leftjoin('pen_kategori_penilaian','pen_kategori_penilaian.id_kategori_penilaian','pen_penilaian.FK_kategori_penilaian')->
        leftjoin('pen_users','pen_users.id_users','pen_penilaian.created_by')->
        where('id_set_soalan',$id_set_soalan)->first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function showKodSet(Request $request){
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $kod_set = $request->input('kod_set');

        $obj = pen_set_soalan::where('FK_siri_penilaian',$FK_siri_penilaian)->where('kod_set',$kod_set)->first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function getJenisPengesahan(Request $request){
        $json_list = $request->input('json_list');

        $obj = pen_set_soalan::where('json_list',$json_list)
        ->first(['statusrekod']);

        // dd($obj);
        if($obj){
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function list($id){

        $obj = pen_set_soalan::where('FK_siri_penilaian',$id)
        ->orderBy('kod_set', 'ASC')
        ->get();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }
    // public function list($id){
    //     dd($id);
    // }

    public function delete(Request $request){
        $id_set_soalan = $request->input('id_set_soalan');

        $obj = pen_set_soalan::where('id_set_soalan',$id_set_soalan)->delete();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Hapus!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Hapus Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }
}
