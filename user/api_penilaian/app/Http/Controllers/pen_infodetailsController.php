<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_infodetails;

class pen_infodetailsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getToken($id)  {
        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $token     = hash("sha256", Str::random(32).$salt);
        $obj = pen_users::where('id_users',$id)->update([
            'token' => $token
        ]);

        $token = false;

        if($obj){
            $obj = pen_users::where('id_users',$id)->first(['token']);
            $random = hash("sha256", Str::random(32)).'0L1v3';
            $token = $random.$obj->token;
        }

        return $token;
    }

    public function create(Request $request){
        $FK_penilaian = $request->input('FK_penilaian');
        $teks = $request->input('teks');
        $created_by = $request->input('created_by');
        $jenis_soalan = '07';

        $data = [
            'kod_teks' => $jenis_soalan.date('Yis').strtoupper(Str::random(4)),
            'FK_penilaian' => $FK_penilaian,
            'teks' => $teks,
            'created_by' => $created_by,
            'updated_by' => $created_by,
        ];

        $obj = pen_infodetails::create($data);
        $id = $obj -> id;

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Daftar Berjaya!',
                'data'=>$id,
            ],201);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Create Failed!',
                'data'=>''
            ],401);
        } 
    }

    public function update(Request $request){
        $FK_penilaian = $request->input('FK_penilaian');
        $id_infodetails = $request->input('id_infodetails');
        $teks = $request->input('teks');
        $created_by = $request->input('created_by');
        $jenis_soalan = '07';

        $data = [
            'kod_teks' => $jenis_soalan.date('Yis').strtoupper(Str::random(4)),
            // 'id_infodetails' => $id_infodetails,
            'FK_penilaian' => $FK_penilaian,
            'teks' => $teks,
            // 'created_by' => $created_by,
            'updated_by' => $created_by
        ];

        $obj = pen_infodetails::where('id_infodetails',$id_infodetails)->update($data);
        // $id = $obj -> id_infodetails;

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Daftar Berjaya!',
                'data'=>$id_infodetails,
            ],201);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Create Failed!',
                'data'=>''
            ],401);
        } 
    }

    public function show(Request $request){
        
        $id = $request -> input('id_infodetails');
        $obj = pen_infodetails::where('id_infodetails',$id) -> first(['id_infodetails','kod_teks','teks','statusrekod','created_at','created_by','updated_at','updated_at']);

        if($obj){
            return response()->json([
                'success'=>true,
                'message'=>'Daftar Berjaya!',
                'data'=>$obj
            ],201);
        }else{
            return response()->json([
                'success'=>false,
                'message'=>'Daftar Gagal!',
                'data'=>''
            ],400);
        }
    }

}
