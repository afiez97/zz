<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_data_calon;

class pen_data_calonController extends Controller
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

    public function list()  {
        $obj = pen_data_calon::where('pen_data_calon.statusrekod','1') -> 
                                    get([
                                        'id_data',
                                        'data_calon',
                                        'label'
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
}
