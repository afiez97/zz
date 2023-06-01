<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_menu;

class pen_menuController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function register(Request $request) {
        $FK_parent = $request->input('FK_parent');
        $is_parent = $request->input('is_parent');
        $id_nama_menu = $request->input('id_nama_menu');
        $nama_menu = $request->input('nama_menu');
        $nama_fail = $request->input('nama_fail');
        $nama_icon = $request->input('nama_icon');
        $modul = $request->input('modul');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');

        $register = pen_menu::create([
            'FK_parent' => $FK_parent,
            'is_parent' => $is_parent,
            'id_nama_menu' => $id_nama_menu,
            'nama_menu' => $nama_menu,
            'nama_fail' => $nama_fail,
            'nama_icon' => $nama_icon,
            'modul' => $modul,
            'created_by' => $created_by,
            'updated_by' => $updated_by
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
        $nama_fail = $request->input('content');

        $pen_menu = pen_menu::leftjoin('pen_menu AS parent', 'parent.id_menu', 'pen_menu.FK_parent')->
                                where(pen_menu::raw("MD5(pen_menu.nama_fail)"),$nama_fail)->
                                first([
                                    'pen_menu.id_menu',
                                    'pen_menu.nama_fail AS child',
                                    'parent.nama_fail AS parent',
                                ]);

        if ($pen_menu)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_menu
            ],201);
        }
    }

    public function list()  {
        $pen_menu = pen_menu::leftjoin('pen_menu as parent', 'parent.id_menu', '=', 'pen_menu.FK_parent') -> 
                                where('pen_menu.statusrekod','1') -> get([
                                    "pen_menu.id_menu AS PK", 
                                    "pen_menu.FK_parent AS FK_parent", 
                                    "pen_menu.nama_fail AS fail", 
                                    "pen_menu.id_nama_menu AS idmenu", 
                                    "pen_menu.nama_menu AS menu", 
                                    DB::RAW("md5(pen_menu.nama_fail) AS MD5menu"),
                                    "pen_menu.nama_icon AS icon", 
                                    "pen_menu.modul AS modul", 
                                    "pen_menu.is_parent as bapak", 
                                    "parent.nama_fail AS parent_fail", 
                                    "parent.id_nama_menu AS parent_idmenu", 
                                    "parent.nama_menu AS parent_menu"
                                ]); // list all data

        if ($pen_menu)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_menu
            ],200);
        }
        
    }

    public function listByParent(Request $request)  {
        $FK_parent = $request->input('FK_parent');
        $pen_menu = pen_menu::select("pen_menu.id_menu AS PK", "pen_menu.FK_parent AS FK_parent", "pen_menu.nama_fail AS fail", "pen_menu.id_nama_menu AS idmenu", "pen_menu.nama_menu AS menu", "pen_menu.nama_icon AS icon", "pen_menu.modul AS modul", "pen_menu.is_parent as bapak", 
                                "parent.nama_fail AS parent_fail", "parent.id_nama_menu AS parent_idmenu", "parent.nama_menu AS parent_menu") -> 
                                leftjoin('pen_menu as parent', 'parent.id_menu', '=', 'pen_menu.FK_parent') -> 
                                where('pen_menu.FK_parent',$FK_parent) -> 
                                orWhere('pen_menu.id_menu','14') -> // pen_list_bank_soalan
                                get(); // list all data

        if ($pen_menu)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_menu
            ],200);
        }
        
    }

    public function top()  {
        $pen_menu = pen_menu::select("*", "pen_menu.is_parent as bapak") -> 
                        where('FK_parent',"0") ->
                        get(); // list all data

        if ($pen_menu)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_menu
            ],200);
        }
        
    }

    public function mid($FK_parent)  {
        $pen_menu = pen_menu::select("*", "pen_menu.is_parent as bapak") -> 
                        where('FK_parent',$FK_parent) ->
                        get(); // list all data

        if ($pen_menu)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_menu
            ],200);
        }
        
    }

    public function bot($FK_parent)  {
        $pen_menu = pen_menu::where('FK_parent',$FK_parent) ->
                        get(); // list all data

        if ($pen_menu)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_menu
            ],200);
        }
        
    }

public function update(Request $request)    {
        $id = $request->input('id_menu');
        $nama_menu = $request->input('nama_menu');
        $updated_by = $request->input('updated_by');

        $pen_menu = pen_menu::find($id); 

        $pen_menu -> update([
            'nama_menu' => $nama_menu,
            'updated_by' => $updated_by
        ]);

        if ($pen_menu)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_menu
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
        $id = $request->input('id_menu');

        $pen_menu = pen_menu::find($id); 
        
        $pen_menu -> update([
            'statusrekod' => '0',
        ]);

        if ($pen_menu)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_menu
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
