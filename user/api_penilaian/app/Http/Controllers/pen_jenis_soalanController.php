<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_jenis_soalan;

class pen_jenis_soalanController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function create(Request $request) {
        $jenis_soalan = $request->input('jenis_soalan');
        $kod_jenis_soalan = $request->input('kod_jenis_soaln');

        $data = [
            'jenis_soalan' => $jenis_soalan,
            'kod_jenis_soalan' => $kod_jenis_soalan
        ];

        $obj = pen_jenis_soalan::create($data);
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Daftar Berjaya!',
                'data'=>$obj
            ],201);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Create Failed!',
                'data'=>''
            ],401);
        }        
    }

    public function update(Request $request) {
        $jenis_soalan = $request->input('jenis_soalan');
        $kod_jenis_soalan = $request->input('kod_jenis_soaln');
        $id_jenis_soalan = $request->input('id_jenis_soalan');

        $data = [
            'jenis_soalan' => $jenis_soalan,
            'kod_jenis_soalan' => $kod_jenis_soalan
        ];

        $obj = pen_jenis_soalan::where('id_jenis_soalan',$id_jenis_soalan)
        ->update($data);
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Daftar Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Create Failed!',
                'data'=>''
            ],400);
        } 
    }

    public function show($id) {
        $obj = pen_jenis_soalan::where('statusrekod','1')
        ->where('id_jenis_soalan',$id)
        -> get(); // list all data

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
    }

    public function list() {
        $obj = pen_jenis_soalan::where('statusrekod','1') -> get(); // list all data

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
    }

    public function delete(Request $request) {

    }
}
