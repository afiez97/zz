<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_penyelaras;

class pen_penyelarasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function register(Request $request) {
        $FK_users = $request->input('FK_users');
        $FK_kluster = $request->input('FK_kluster');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');
        
        $obj = pen_penyelaras::create([
            'FK_users' => $FK_users,
            'FK_kluster' => $FK_kluster,
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
        $id = $request->input('id_penyelaras');

        $obj = pen_penyelaras::leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penyelaras.FK_users')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penyelaras.FK_kluster')->
                                where('id_penyelaras',$id)->
                                first([
                                    'id_penyelaras',
                                    'FK_users',
                                    'pen_penyelaras.FK_kluster',
                                    'nama_kluster',
                                    'pen_penyelaras.statusrekod',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
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

    public function showGetIc($no_kad_pengenalan)  {

        $obj = pen_penyelaras::leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penyelaras.FK_users')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penyelaras.FK_kluster')->
                                where('pen_users.no_kad_pengenalan',$no_kad_pengenalan)->
                                where('pen_penyelaras.statusrekod','1')->
                                first([
                                    'id_penyelaras',
                                    'FK_users',
                                    'pen_penyelaras.FK_kluster',
                                    'nama_kluster',
                                    'pen_penyelaras.statusrekod',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
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
        $obj = pen_penyelaras::leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penyelaras.FK_users')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penyelaras.FK_kluster')->
                                where('pen_penyelaras.statusrekod','1') -> 
                                get([
                                    'id_penyelaras',
                                    'FK_users',
                                    'pen_penyelaras.FK_kluster',
                                    'nama_kluster',
                                    'pen_penyelaras.statusrekod',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
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

    public function listByKluster(Request $request)  {
        $FK_kluster = $request->input('FK_kluster');

        $obj = pen_penyelaras::leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penyelaras.FK_users')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penyelaras.FK_kluster')->
                                where('pen_penyelaras.FK_kluster',$FK_kluster) -> 
                                get([
                                    'id_penyelaras',
                                    'FK_users',
                                    'pen_penyelaras.FK_kluster',
                                    'nama_kluster',
                                    'pen_penyelaras.statusrekod',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
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

    public function listKlusterByPenyelaras(Request $request)  {
        $FK_users = $request->input('FK_users');

        $obj = pen_penyelaras::leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penyelaras.FK_kluster')->
                                where('pen_penyelaras.FK_users',$FK_users) -> 
                                where('pen_penyelaras.statusrekod','1') -> 
                                get([
                                    'id_penyelaras',
                                    'FK_users',
                                    'id_kluster',
                                    'nama_kluster',
                                    'pen_penyelaras.statusrekod',
                                ]);

        if (sizeof($obj)>0)   {
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
        $obj = pen_penyelaras::leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penyelaras.FK_users')->
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penyelaras.FK_kluster')->
                                get([
                                    'id_penyelaras',
                                    'FK_users',
                                    'pen_penyelaras.FK_kluster',
                                    'nama_kluster',
                                    'pen_penyelaras.statusrekod',
                                    'nama',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'notel_kerajaan',
                                    'emel',
                                    'emel_kerajaan',
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
        $id = $request->input('id_penyelaras');
        $FK_users = $request->input('FK_users');
        $FK_kluster = $request->input('FK_kluster');
        $updated_by = $request->input('updated_by');

        // $pen_penyelaras = pen_penyelaras::find($id); 

        $obj = pen_penyelaras::where('id_penyelaras',$id)  -> update([
            'FK_users' => $FK_users,
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
        $id = $request->input('id_penyelaras');

        // $pen_penyelaras = pen_penyelaras::find($id); 
        $obj_search = pen_penyelaras::where('id_penyelaras',$id)->first(); 
        switch($obj_search->statusrekod)    {
            case 0: $obj = pen_penyelaras::where('id_penyelaras',$id) -> update([
                        'statusrekod' => '1',
                    ]);
                    break;
            case 1: $obj = pen_penyelaras::where('id_penyelaras',$id) -> update([
                        'statusrekod' => '0',
                    ]);
                    break;
        }
        $obj_search = pen_penyelaras::where('id_penyelaras',$id)->first();

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
