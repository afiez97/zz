<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_kementerian;

class pen_kementerianController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function register(Request $request) {
        $nama_kementerian = $request->input('nama_kementerian');
        $kod_kementerian = $request->input('kod_kementerian');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');
        $statusrekod = $request->input('statusrekod');

        $register = pen_kementerian::create([
            'nama_kementerian' => $nama_kementerian,
            'kod_kementerian' => $kod_kementerian,
            'created_by' => $created_by,
            'updated_by' => $updated_by,
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
            ],405);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_kementerian');

        $pen_kementerian = pen_kementerian::where('id_kementerian',$id)->first();

        if ($pen_kementerian)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_kementerian
            ],201);
        }
    }

    public function showHrmis(Request $request)  {
        $nama_kementerian = $request->input('nama_kementerian');

        $pen_kementerian = pen_kementerian::where('nama_kementerian',$nama_kementerian)->first();

        if ($pen_kementerian)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_kementerian
            ],201);
        }
    }

    public function showName(Request $request)  {
        $nama_kementerian = $request->input('nama_kementerian');

        $pen_kementerian = pen_kementerian::where('nama_kementerian',$nama_kementerian)->get();
        // dd($pen_kementerian);
        if ($pen_kementerian)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_kementerian
            ],201);
        }
    }

    public function list(Request $request)  {
        $FK_peranan = $request->input('FK_peranan');
        // $FK_kementerian = $request->input('FK_kementerian');

        if ($FK_peranan == '1') {
            $pen_kementerian = pen_kementerian::where('pen_kementerian.statusrekod','1') -> orderBy('pen_kementerian.nama_kementerian', 'ASC') -> get();
        } else  {
            $pen_kementerian = pen_kementerian::where('pen_kementerian.statusrekod','1') -> get();
        }

        if ($pen_kementerian)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_kementerian
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
        $FK_kementerian = $request->input('FK_kementerian');

        if ($FK_peranan == '1') {
            $pen_kementerian = pen_kementerian::where('pen_kementerian.statusrekod','1') -> orderBy('pen_kementerian.nama_kementerian', 'ASC') -> get();
        } else  {
            $pen_kementerian = pen_kementerian::where('pen_kementerian.statusrekod','1') -> where('id_kementerian',$FK_kementerian) -> get();
        }

        if ($pen_kementerian)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_kementerian
            ],200);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
    }

    public function update(Request $request)    {
        $id = $request->input('id_kementerian');
        $nama_kementerian = $request->input('nama_kementerian');
        $kod_kementerian = $request->input('kod_kementerian');
        $updated_by = $request->input('updated_by');

        $pen_kementerian = pen_kementerian::find($id); 

        $pen_kementerian -> update([
            'nama_kementerian' => $nama_kementerian,
            'kod_kementerian' => $kod_kementerian,
            'updated_by' => $updated_by
        ]);

        if ($pen_kementerian)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_kementerian
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
        $id = $request->input('id_kementerian');

        $pen_kementerian = pen_kementerian::find($id); 
        
        $pen_kementerian -> update([
            'statusrekod' => '0',
        ]);

        if ($pen_kementerian)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_kementerian
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
