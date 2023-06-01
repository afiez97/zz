<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\fas_status;

class fas_statusController extends Controller
{
    public function register(Request $request){

        $status = $request->input('status');
        $created_by = $request->input('created_by');
        $created_at = $request->input('created_at');

        $data = [
            'status' => $status,
            'created_by' => $created_by,
            'created_at' => $created_at,
            
        ];

        $obj = fas_status::create($data);

        if ($obj)  {
            return response()->json([
                'success'=>'true',
                'message'=>'Register Success!',
                'data'=>$obj
            ],201);
        }

        else    {
            return response()->json([
                'success'=>'false',
                'message'=>'Bad Request',
                'data'=>$obj
            ],400);
        }
        
    }

    public function show($id)  {
        
        $obj = fas_status::where('id_fas_status',$id);

        if ($obj){
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$obj
            ],200);
        }
    }

    public function list(){

        $obj = fas_status::select('*') -> get();

        if ($obj)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$obj
            ],200);
        }

    }

    public function update(Request $request){

        $id = $request->input('id');
        $status = $request->input('status'); 
        $updated_by = $request->input('updated_by');

        $data = [
            'status' => $status,
            'updated_by' => $updated_by
        ];
        
        $obj = fas_status::where('id_fas_status',$id) -> update($data);

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
        $id = $request->input('id');

        $fas_status_search = fas_status::where('id_fas_status',$id) -> first(); 

        switch($fas_status_search->statusrekod)    {
            case 0: $fas_status = fas_status::where('id_fas_status',$id) -> update([
                        'statusrekod' => '1',
                    ]);
                    break;
            case 1: $fas_status = fas_status::where('id_fas_status',$id) -> update([
                        'statusrekod' => '0',
                    ]);
                    break;
        }

        $fas_status_search = fas_status::where('id_fas_status',$id) -> first(); 

        if ($fas_status)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Ubah!",
                'data' => $fas_status_search
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Gagal Ubah!",
                'data'=>''
            ],404);
        }
    }

}
