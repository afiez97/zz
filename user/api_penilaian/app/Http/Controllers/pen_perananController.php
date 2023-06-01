<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_peranan;

class pen_perananController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function register(Request $request) {
        $nama_peranan = $request->input('nama_peranan');
        $FK_submodul = $request->input('FK_submodul');
        $FK_capaian = $request->input('FK_capaian');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');
        $statusrekod = "1";

        // $json_FK_capaian = json_encode($FK_capaian);
        // $arrayFK_capaian = json_decode($json_FK_capaian, true);
        // dd($json_FK_capaian);

        $checkexist = pen_peranan::where('pen_peranan.nama_peranan',$nama_peranan) -> 
                                        get(); // list all data
        if ($checkexist -> count() == 0)   {
            $register = pen_peranan::create([
                'nama_peranan' => $nama_peranan,
                'FK_submodul' => $FK_submodul,
                'FK_capaian' => $FK_capaian,
                'created_by' => $created_by,
                'updated_by' => $updated_by,
                'statusrekod' => $statusrekod
            ]);
        } else  {
            return response()->json([
                'success'=>'false',
                'message'=>'Data Exist',
                'data'=>$checkexist
            ],405);
        }        

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
                'message'=>'Register Failed',
                'data'=>$register
            ],406);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_peranan');

        $peranan = pen_peranan::where('id_peranan',$id)->first();

        if ($peranan)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$peranan
            ],201);
        }
    }

    public function list()  {
        $peranan = pen_peranan::where('pen_peranan.statusrekod','1') -> get(); // list all data

        if ($peranan)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$peranan
            ],200);
        }
        
    }

    public function countCapaian()  {

        $obj = pen_peranan::leftjoin('pen_capaian', function($join){
                                    $join->on(function($query){
                                        $query->on('pen_capaian.FK_peranan','pen_peranan.id_peranan')
                                        ->where('id_peranan','>', '0');
                                    });
                                })->
                                groupBy('nama_peranan')->
                                groupBy('FK_peranan')->
                                get([
                                    'nama_peranan',
                                    DB::RAW("COUNT(FK_peranan) AS total")
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
        $id = $request->input('id_peranan');
        // dd($id);
        $nama_peranan = $request->input('nama_peranan');
        $FK_submodul = $request->input('FK_submodul');
        $FK_capaian = $request->input('FK_capaian');
        $updated_by = $request->input('updated_by');

        $peranan = pen_peranan::where('id_peranan','=',$id) -> update([
            'nama_peranan' => $nama_peranan,
            'FK_submodul' => $FK_submodul,
            'FK_capaian' => $FK_capaian,
            'updated_by' => $updated_by
        ]);

        if ($peranan)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $peranan
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
        $id = $request->input('id_peranan');

        $peranan = pen_peranan::find($id); 
        
        $peranan -> update([
            'statusrekod' => '0',
        ]);

        if ($peranan)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $peranan
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
