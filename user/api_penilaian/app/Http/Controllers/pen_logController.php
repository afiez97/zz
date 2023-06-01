<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_log;

class pen_logController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function register(Request $request) {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $action_made = $request->input('action_made');
        $browser_name = getHostByName(getHostName());

        $register = pen_log::create([
            'no_kad_pengenalan' => $no_kad_pengenalan,
            'action_made' => $action_made,
            'browser_name' => $browser_name
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
                'message'=>'Gagal Daftar Maklumat',
                'data'=>$register
            ],405);
        }
    }

    public function show(Request $request)  {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');

        $pen_log = pen_log::where('no_kad_pengenalan',$no_kad_pengenalan)->orderBy('id_log', 'DESC')->get();

        if ($pen_log)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_log
            ],201);
        }
    }

    public function showToday(Request $request)  {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');

        $pen_log = pen_log::where('no_kad_pengenalan',$no_kad_pengenalan)->
                            where('created_at','LIKE',date("Y-m-d")."%")->
                            orderBy('id_log', 'DESC')->
                            get();

        if ($pen_log)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_log
            ],201);
        }
    }

    public function countUserAktif()  {

        $pen_log = pen_log::groupBy('no_kad_pengenalan')->
                            where('created_at', 'LIKE', date("Y-m-d")."%")->
                            get([
                                DB::RAW("DISTINCT(no_kad_pengenalan) AS total")
                            ]);

        if ($pen_log)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_log
            ],201);
        }
    }

    public function showSearch(Request $request)  {
        $date_start = $request->input('date_start');
        $date_end = $request->input('date_end');

        $pen_log = pen_log::select("*", "pen_log.id_log AS PK", pen_log::raw("DATE_FORMAT(pen_log.created_at,'%d/%m/%Y %h:%i:%s') AS logsTime")) -> 
                            join('pen_users', 'pen_users.id_users', '=', 'pen_log.no_kad_pengenalan') -> 
                            whereBetween('pen_log.created_at',[$date_start.'%', $date_end.'%']) ->
                            orderBy('pen_log.id_log', 'desc') ->
                            get();

        if ($pen_log)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_log
            ],201);
        }
    }

    public function list()  {
        $pen_log = pen_log::select("*", "pen_log.id_log AS PK", pen_log::raw("DATE_FORMAT(pen_log.created_at,'%d/%m/%Y %h:%i:%s') AS logsTime")) -> 
                    join('pen_users', 'pen_users.id_users', '=', 'pen_log.no_kad_pengenalan') -> 
                    orderBy('pen_log.id_log', 'desc') ->
                    get(); // list all data // list all data

        if ($pen_log)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_log
            ],200);
        }
        
    }

    public function listcurrdate()  {
        $pen_log = pen_log::select("*", "pen_log.id_log AS PK", pen_log::raw("DATE_FORMAT(pen_log.created_at,'%d/%m/%Y %h:%i:%s') AS logsTime")) -> 
                    join('pen_users', 'pen_users.id_users', '=', 'pen_log.no_kad_pengenalan') -> 
                    where('pen_log.created_at','LIKE',pen_log::raw("CONCAT(CURRENT_DATE(),'%')")) ->
                    orderBy('pen_log.id_log', 'desc') ->
                    get(); // list all data // list all data

        if ($pen_log)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_log
            ],200);
        }
        
    }
}
