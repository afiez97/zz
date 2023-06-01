<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_jenispengguna;

class pen_jenispenggunaController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function register(Request $request) {
        $jenis_pengguna = $request->input('jenis_pengguna');
        $kod_jenis_pengguna = $request->input('kod_jenis_pengguna');

        $register = pen_jenispengguna::create([
            'jenis_pengguna' => $jenis_pengguna,
            'kod_jenis_pengguna' => $kod_jenis_pengguna,
        ]);

        if ($register)  {
            return response()->json([
                'success'=>'true',
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$register
            ],201);
        }

        else    {
            return response()->json([
                'success'=>'false',
                'message'=>'Bad Request',
                'data'=>$register
            ],400);
        }
    }

    public function list()  {
        $pen_jenispengguna = pen_jenispengguna::get();

        if ($pen_jenispengguna)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_jenispengguna
            ],200);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_jenispengguna');

        $pen_jenispengguna = pen_jenispengguna::where('id_jenispengguna',$id)->first();

        if ($pen_jenispengguna)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_jenispengguna
            ],200);
        }
    }
}
