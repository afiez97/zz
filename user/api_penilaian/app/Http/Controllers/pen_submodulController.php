<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_submodul;

class pen_submodulController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function register(Request $request) {
        $FK_modul = $request->input('FK_modul');
        $nama_submodul = $request->input('nama_submodul');
        $nama_menu_submodul = $request->input('nama_menu_submodul');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');

        $register = pen_submodul::create([
            'FK_modul' => $FK_modul,
            'nama_submodul' => $nama_submodul,
            'nama_menu_submodul' => $nama_menu_submodul,
            'created_by' => $created_by,
            'updated_by' => $updated_by
        ]);

        if ($register)  {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$register
            ],201);
        }

        else    {
            return response()->json([
                'success'=>'false',
                'message'=>'Gagal Daftar Maklumat',
                'data'=>$register
            ],405);
        }
    }

    public function show(Request $request)  {
        $FK_modul = $request->input('FK_modul');

        $pen_submodul = pen_submodul::get();

        $q = $pen_submodul->where('FK_modul',$FK_modul);

        if ($pen_submodul)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$q
            ],201);
        }
    }

    public function showSubmodul(Request $request, $FK_modul)  {

        $pen_submodul = pen_submodul::get();

        $q = $pen_submodul->where('FK_modul',$FK_modul);

        if ($pen_submodul)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$q
            ],201);
        }
    }

    public function list()  {
        $pen_submodul = pen_submodul::select("pen_submodul.id_submodul", "nama_submodul", "FK_modul", "nama_modul", "pen_submodul.statusrekod", "pen_modul.statusrekod") -> 
                                    join('pen_modul', 'pen_modul.id_modul', '=', 'pen_submodul.FK_modul') -> 
                                    where('pen_submodul.statusrekod','1') -> where('pen_modul.statusrekod','1') -> get(); // list all data

        if ($pen_submodul)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_submodul
            ],200);
        }
        
    }

    public function update(Request $request)    {
        $id = $request->input('id_submodul');
        $nama_submodul = $request->input('nama_submodul');
        $nama_menu_submodul = $request->input('nama_menu_submodul');
        $updated_by = $request->input('updated_by');

        $pen_submodul = pen_submodul::find($id); 

        $pen_submodul -> update([
            'nama_submodul' => $nama_submodul,
            'nama_menu_submodul' => $nama_menu_submodul,
            'updated_by' => $updated_by
        ]);

        if ($pen_submodul)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_submodul
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
        $id = $request->input('id_submodul');

        $pen_submodul = pen_submodul::find($id); 

        $pen_submodul -> update([
            'statusrekod' => '0',
        ]);

        if ($pen_submodul)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_submodul
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
