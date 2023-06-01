<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_kementerian;
use App\Models\pen_kat_agensi;
use App\Models\pen_agensi;

class pen_agensiController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function register(Request $request) {
        $nama_agensi = $request->input('nama_agensi');
        $kod_agensi = $request->input('kod_agensi');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');
        $hari_cuti = $request->input('hari_cuti');
        $statusrekod = $request->input('statusrekod');

        $register = pen_agensi::create([
            'nama_agensi' => $nama_agensi,
            'kod_agensi' => $kod_agensi,
            'created_by' => $created_by,
            'updated_by' => $updated_by,
            'hari_cuti' => $hari_cuti,
            'statusrekod' => $statusrekod
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
                'message'=>'Tak Jadi Boss',
                'data'=>$register
            ],404);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_agensi');

        $pen_agensi = pen_agensi::where('id_agensi',$id)->where('statusrekod','1')->first();

        if ($pen_agensi)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_agensi
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>""
            ],404);
        }
    }

    public function showByKategori($kod_kat_agensi)  {
        
        $pen_agensi = pen_agensi::where('kod_agensi','LIKE', "{$kod_kat_agensi}%")->get();
        // dd($condition);

        if ($pen_agensi)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_agensi
            ],201);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
    }

    public function showGet($kod_kementerian, $kod_kat_agensi)  {
        // $id = $request->input('id_agensi');
        $pen_kementerian = pen_kementerian::where('id_kementerian', $kod_kementerian)->first();
        $pen_kat_agensi = pen_kat_agensi::where('id_kat_agensi', $kod_kat_agensi)->first();
        $condition = $pen_kat_agensi->kod_kat_agensi . "-" . $pen_kementerian->kod_kementerian;
        $pen_agensi = pen_agensi::where('kod_agensi','LIKE', "{$condition}%")->get();
        // dd($condition);

        if ($pen_agensi)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_agensi
            ],201);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
    }

    public function showKod(Request $request)  {
        $kod_agensi = $request->input('kod_agensi');

        $pen_agensi = pen_agensi::where('kod_agensi',$kod_agensi)->where('statusrekod','1')->get();

        if ($pen_agensi)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_agensi
            ],201);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
    }

    public function list(Request $request)  {
        $FK_peranan = $request->input('FK_peranan');
        // $FK_agensi = $request->input('FK_agensi');

        if ($FK_peranan == '1') {
            $pen_agensi = pen_agensi::where('pen_agensi.statusrekod','1') -> orderBy('pen_agensi.nama_agensi', 'ASC') -> get();
        } else  {
            $pen_agensi = pen_agensi::where('pen_agensi.statusrekod','1') -> get();
        }

        if ($pen_agensi)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_agensi
            ],200);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
    }

    public function listCheck(Request $request)  {
        $FK_peranan = $request->input('FK_peranan');
        $FK_agensi = $request->input('FK_agensi');

        if ($FK_peranan == '1') {
            $pen_agensi = pen_agensi::where('pen_agensi.statusrekod','1') -> orderBy('pen_agensi.nama_agensi', 'ASC') -> get();
        } else  {
            $pen_agensi = pen_agensi::where('pen_agensi.statusrekod','1') -> where('id_agensi',$FK_agensi) -> get();
        }

        if ($pen_agensi)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_agensi
            ],200);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }     
    }

    public function listCheckNama(Request $request)  {
        $FK_peranan = $request->input('FK_peranan');
        // $FK_agensi = $request->input('FK_agensi');
        $nama_agensi = $request->input('nama_agensi');

        if ($FK_peranan == '1') {
            $pen_agensi = pen_agensi::where('pen_agensi.statusrekod','1') -> where('pen_agensi.nama_agensi',$nama_agensi) -> orderBy('pen_agensi.nama_agensi', 'ASC') -> first();
        } else  {
            $pen_agensi = pen_agensi::where('pen_agensi.statusrekod','1') -> where('pen_agensi.nama_agensi',$nama_agensi) -> first();
        }

        if ($pen_agensi)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_agensi
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Tiada Rekod Ditemui.",
                'data'=>''
            ],200);
        }
    }

    public function update(Request $request)    {
        $id = $request->input('id');
        $hari_cuti = $request->input('hari_cuti');
        $updated_by = $request->input('updated_by');

        $pen_agensi = pen_agensi::where('id_agensi',$id) -> update([
            'hari_cuti' => $hari_cuti,
            'updated_by' => $updated_by
        ]);

        if ($pen_agensi)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_agensi
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
        $id = $request->input('id_agensi');

        $pen_agensi = pen_agensi::find($id); 
        
        $pen_agensi -> update([
            'statusrekod' => '0',
        ]);

        if ($pen_agensi)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_agensi
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
