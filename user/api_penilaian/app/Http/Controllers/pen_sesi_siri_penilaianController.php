<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_penilaian;
use App\Models\pen_sesi_siri_penilaian;

class pen_sesi_siri_penilaianController extends Controller
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

    public function register(Request $request) {

        //BELUM FINALIZE
        $id_sesi_siri_penilaian = $request->input('id_sesi_siri_penilaian');
        $id_tetapan_masa = $request->input('id_tetapan_masa');
        $sesi_penilaian = $request->input('sesi_penilaian');
        $tarikh_mula = $request->input('tarikh_mula');
        $tarikh_tamat = $request->input('tarikh_tamat');
        $masa_mula = $request->input('masa_mula');
        $masa_tamat = $request->input('masa_tamat');
        $duration = $request->input('duration');
        $pautan_status = $request->input('pautan_status');
        $status_penilaian = $request->input('status_penilaian');
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $created_by = $request->input('created_by');
        $pautan_zoom = $request->input('pautan_zoom');
        $pautan_google = $request->input('pautan_google');
        $pautan_skype = $request->input('pautan_skype');
        $pautan_team = $request->input('pautan_team');

        $data = [
            'id_tetapan_masa' => $id_tetapan_masa,
            'sesi_penilaian' => $sesi_penilaian,
            'tarikh_mula' => $tarikh_mula,
            'tarikh_tamat' => $tarikh_tamat,
            'masa_mula' => $masa_mula,
            'masa_tamat' => $masa_tamat,
            'duration' => $duration,
            'pautan_status' => $pautan_status,
            'status_penilaian' => $status_penilaian,
            'FK_siri_penilaian' => $FK_siri_penilaian,
            'pautan_zoom' => $pautan_zoom,
            'pautan_google' => $pautan_google,
            'pautan_skype' => $pautan_skype,
            'pautan_team' => $pautan_team,
            'created_by' => $created_by,
            'updated_by' => $created_by
        ];

        if($id_sesi_siri_penilaian != null && $id_sesi_siri_penilaian != "" && $id_sesi_siri_penilaian != "undefined"){
            $obj = pen_sesi_siri_penilaian::where('id_sesi_siri_penilaian',$id_sesi_siri_penilaian)->update($data);
            $id = $id_sesi_siri_penilaian;
        } else {
            $obj = pen_sesi_siri_penilaian::create($data);
            $id = $obj -> id_sesi_siri_penilaian;
        }
        
        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$id,
            ],201);
        } else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function create(Request $request) {

        //BELUM FINALIZE
        $id_tetapan_masa = $request->input('id_tetapan_masa');
        $sesi_penilaian = $request->input('sesi_penilaian');
        $tarikh_mula = $request->input('tarikh_mula');
        $tarikh_tamat = $request->input('tarikh_tamat');
        $masa_mula = $request->input('masa_mula');
        $masa_tamat = $request->input('masa_tamat');
        $duration = $request->input('duration');
        $status_penilaian = $request->input('status_penilaian');
        $pautan_status = $request->input('pautan_status');

        $pautan_zoom = $request->input('pautan_zoom');
        $pautan_google = $request->input('pautan_google');
        $pautan_skype = $request->input('pautan_skype');
        $pautan_team = $request->input('pautan_team');

        $bil_calon = $request->input('bil_calon');
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $created_by = $request->input('created_by');
        $created_by = $request->input('created_by');
        // dd('ahh sudah = '.$created_by);

        $obj = pen_sesi_siri_penilaian::create([
            'id_tetapan_masa' => $id_tetapan_masa,
            'sesi_penilaian' => $sesi_penilaian,
            'tarikh_mula' => $tarikh_mula,
            'tarikh_tamat' => $tarikh_tamat,
            'masa_mula' => $masa_mula,
            'masa_tamat' => $masa_tamat,
            'duration' => $duration,
            'pautan_status' => $pautan_status,
            'pautan_zoom' => $pautan_zoom,
            'pautan_google' => $pautan_google,
            'pautan_skype' => $pautan_skype,
            'pautan_team' => $pautan_team,
            'status_penilaian' => $status_penilaian,
            'bil_calon' => $bil_calon,
            'FK_siri_penilaian' => $FK_siri_penilaian,
            'created_by' => $created_by,
            'updated_by' => $created_by,
            // 'created_at' => $created_at,
            // 'updated_at' => $created_at
        ]);

        $id = $obj -> id_sesi_siri_penilaian;

        if ($obj)  {
            // $token = $this->getToken($created_by);
            return response()->json([
                'success'=>true,
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$id,
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
        $id = $request->input('id_sesi_siri_penilaian');

        $obj = pen_sesi_siri_penilaian::
                                    leftjoin('pen_tetapan_masa', 'pen_tetapan_masa.id_tetapan_masa', '=', 'pen_sesi_siri_penilaian.id_tetapan_masa')->
                                    leftjoin('pen_mod_penilaian', 'pen_mod_penilaian.id_mod_penilaian', '=', 'pen_sesi_siri_penilaian.status_penilaian')->
                                    where('id_sesi_siri_penilaian',$id)->
                                    first([
                                        'id_sesi_siri_penilaian',
                                        'FK_siri_penilaian',
                                        'pen_sesi_siri_penilaian.id_tetapan_masa',
                                        'sesi_penilaian',
                                        // 'tetapan_masa',
                                        'tarikh_mula',
                                        'tarikh_tamat',
                                        'duration',
                                        'masa_mula',
                                        'masa_tamat',
                                        'pautan_google',
                                        'pautan_zoom',
                                        'pautan_skype',
                                        'pautan_team',
                                        'pautan_status',
                                        'status_penilaian',
                                        'mod_penilaian',
                                        'bil_calon',
                                        'json_set_soalan',
                                        'pen_sesi_siri_penilaian.created_at',
                                        'pen_sesi_siri_penilaian.updated_at',
                                        'pen_sesi_siri_penilaian.created_by',
                                        'pen_sesi_siri_penilaian.updated_by'
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

    public function showPautan(Request $request)  {
        $id = $request->input('id_sesi_siri_penilaian');

        $obj = pen_sesi_siri_penilaian::where('id_sesi_siri_penilaian',$id)->first([
                                        DB::RAW('MD5(pen_sesi_siri_penilaian.id_sesi_siri_penilaian) AS enc_id_sesi_siri_penilaian')
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

    public function listSet($id_set)  {

        $obj = pen_sesi_siri_penilaian::where('json_set_soalan','LIKE','%"id_set":'.$id_set.',%')->get();

        if (sizeof(($obj))>0)   {
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
            ],400);
        }
    }

    // public function email(Request $request){

    //     $emel = $request -> input('emel');
    //     $penilaian = $request -> input('penilaian');
    //     $penilaian = $request -> input('');
    //     $penilaian = $request -> input('');
    //     $penilaian = $request -> input('');
    //     $penilaian = $request -> input('');
    //     $penilaian = $request -> input('');
    //     $penilaian = $request -> input('');
    //     $penilaian = $request -> input('');
    //     $penilaian = $request -> input('');

    //     if ($register)  {
    //         $tetapan_mail = pen_tetapan::first();
    //         $emelreceiver = $emel;
    //         $mail = new PHPMailer();
    //         $mail->SMTPDebug = 0;
    //         $mail->isSMTP();
    //         $mail->Host       = $tetapan_mail->mail_gateway;

    //         $mail->Port       = $tetapan_mail->mail_port;
            
    //         $mail->setFrom('penilaian@intanbk.intan.my', 'Sistem Pengurusan Penilaian INTAN (Booking 4 U');
    //         $mail->addAddress($emelreceiver);
                
    //         $mail->isHTML(true);                                  
    //         $mail->Subject = 'PENGURUSAN PENILAIAN - PEPERIKSAAN BAGI '.$penilaian;
    //         $mail->Body    = $nama.`<br/>No. KP : `.$no_kad_pengenalan.`<br/><br/>
    //                         Tuan/Puan,<br/><br/>
    //                         <b>PEPERIKSAAN BAGI `.$penilaian.`</b><br/><br/>
    //                         Dengan hormatnya tuan/puan dijemput menghadiri Peperiksaan bagi `.$penilaian_small.`
    //                         . Butir-butir peperiksaan adalah seperti berikut<br/><br/>
    //                         <table width="100%">
    //                             <tr>
    //                                 <td style="background-color:grey"PEPERIKSAAN></td>
    //                                 <td>: `.$penilaian.`</td>
    //                             </tr>
    //                             <tr>
    //                                 <td style="background-color:grey"NO. ANGKA GILIRAN></td>
    //                                 <td>: `.$no_angka_giliran.`</td>
    //                             </tr>
    //                             <tr>
    //                                 <td style="background-color:grey"PAUTAN</td>
    //                                 <td>: `.$zoom.``.$google.``.$skype.``.$time.`</td>
    //                             </tr>
    //                         </table><br/><br/>
    //                         <table width="100%">
    //                             <tr style="background-color:grey">
    //                                 <td>TARIKH</td>
    //                                 <td>PEPERIKSAAN</td>
    //                             </tr>
    //                             <tr>
    //                                 <td>`.$tarikh.`</td>
    //                                 <td>PEPERIKSAAN</td>
    //                             </tr>
    //                         </table>`
            
    //         '<b>Pendaftaran Akaun Pengguna</b><br><br>
    //                             Assalamualaikum dan salam sejahtera<br>
    //                             '.$nama.'<br><br>
    //                             Tahniah! Anda berjaya mendaftar akaun. <br>
    //                             Sekiranya anda tidak membuat permintaan ini, silakan abaikan emel ini. <br>
    //                             Sekiranya anda membuat permintaan ini, Sila klik pautan dibawah untuk masuk ke dalam sistem:<br><br>
    //                             No. Kad Pengenalan: '. $no_kad_pengenalan .'<br>
    //                             Katalaluan: '. $katalaluan .'<br><br>
    //                             <a href="'.$tetapan_mail->link_sistem.'/user">Sistem Pengurusan Penilaian INTAN Malaysia</a><br><br>
    //                             Terima kasih.';
    //         $mail->AltBody = 'Alternate Message';
    //         if(!$mail->send()) {
    //             dd("Mailer Error: " . $mail->ErrorInfo);
    //             return response()->json([
    //                 'success'=>'true',
    //                 'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
    //                 'data'=>''
    //             ],200);
    //             // exit;
    //         }
    //         if(!$mail->send()) {
    //             dd("Mailer Error: " . $mail->ErrorInfo);
    //             return response()->json([
    //                 'success'=>'true',
    //                 'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
    //                 'data'=>''
    //             ],200);
    //         } 
    //         else {
    //             // dd("Mailer Error: " . $mail->ErrorInfo);
    //             return response()->json([
    //                 'success'=>'true',
    //                 'message'=>'Berjaya Mendaftar Akaun! Sila log masuk menggunakan No. Kad Pengenalan & Katalaluan yang didaftarkan.',
    //                 'data'=>''
    //             ],200);
    //         }
    //         return response()->json([
    //             'success'=>'true',
    //             'message'=>'Pendaftaran Rekod Berjaya!',
    //             'data'=>$register
    //         ],201);
    //     }

    //     else    {
    //         return response()->json([
    //             'success'=>'false',
    //             'message'=>'Bad Request',
    //             'data'=>$register
    //         ],400);
    //     }
    // }

    public function list($id)  {

        $obj = pen_sesi_siri_penilaian::
                                    leftjoin('pen_tetapan_masa', 'pen_tetapan_masa.id_tetapan_masa', '=', 'pen_sesi_siri_penilaian.id_tetapan_masa')->
                                    leftjoin('pen_mod_penilaian', 'pen_mod_penilaian.id_mod_penilaian', '=', 'pen_sesi_siri_penilaian.status_penilaian')->
                                    where('pen_sesi_siri_penilaian.statusrekod','1') -> 
                                    where('pen_sesi_siri_penilaian.FK_siri_penilaian',$id) -> 
                                    get([
                                        'id_sesi_siri_penilaian',
                                        'FK_siri_penilaian',
                                        'pen_sesi_siri_penilaian.id_tetapan_masa',
                                        'sesi_penilaian',
                                        // 'tetapan_masa',
                                        'tarikh_mula',
                                        'tarikh_tamat',
                                        'duration',
                                        'masa_mula',
                                        'masa_tamat',
                                        'pautan_google',
                                        'pautan_zoom',
                                        'pautan_skype',
                                        'pautan_team',
                                        'pautan_status',
                                        'status_penilaian',
                                        'mod_penilaian',
                                        'bil_calon',
                                        'json_set_soalan',
                                        'pen_sesi_siri_penilaian.created_at',
                                        'pen_sesi_siri_penilaian.updated_at',
                                        'pen_sesi_siri_penilaian.created_by',
                                        'pen_sesi_siri_penilaian.updated_by'
                                    ]);
                                    // get();
                                    // dd($obj);

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

    public function listKluster($FK_kluster)  {

        $obj = pen_sesi_siri_penilaian::
                                    leftjoin('pen_tetapan_masa', 'pen_tetapan_masa.id_tetapan_masa', '=', 'pen_sesi_siri_penilaian.id_tetapan_masa')->
                                    leftjoin('pen_mod_penilaian', 'pen_mod_penilaian.id_mod_penilaian', '=', 'pen_sesi_siri_penilaian.status_penilaian')->
                                    leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_sesi_siri_penilaian.FK_siri_penilaian')->
                                    leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                    where('pen_sesi_siri_penilaian.statusrekod','1') -> 
                                    where('pen_penilaian.FK_kluster',$FK_kluster) -> 
                                    orderBy('pen_siri_penilaian.id_siri_penilaian','ASC')->
                                    get([
                                        'pen_sesi_siri_penilaian.id_sesi_siri_penilaian',
                                        'pen_sesi_siri_penilaian.FK_siri_penilaian',
                                        'pen_sesi_siri_penilaian.id_tetapan_masa',
                                        'pen_sesi_siri_penilaian.sesi_penilaian',
                                        'pen_sesi_siri_penilaian.tarikh_mula',
                                        'pen_sesi_siri_penilaian.tarikh_tamat',
                                        'pen_sesi_siri_penilaian.duration',
                                        'pen_sesi_siri_penilaian.masa_mula',
                                        'pen_sesi_siri_penilaian.masa_tamat',
                                        'pen_sesi_siri_penilaian.pautan_google',
                                        'pen_sesi_siri_penilaian.pautan_zoom',
                                        'pen_sesi_siri_penilaian.pautan_skype',
                                        'pen_sesi_siri_penilaian.pautan_team',
                                        'pen_sesi_siri_penilaian.pautan_status',
                                        'pen_sesi_siri_penilaian.status_penilaian',
                                        'pen_mod_penilaian.mod_penilaian',
                                        'pen_sesi_siri_penilaian.bil_calon',
                                        'pen_sesi_siri_penilaian.json_set_soalan',
                                        'pen_sesi_siri_penilaian.created_at',
                                        'pen_sesi_siri_penilaian.updated_at',
                                        'pen_sesi_siri_penilaian.created_by',
                                        'pen_sesi_siri_penilaian.updated_by',
                                        'pen_siri_penilaian.kod',
                                        'pen_siri_penilaian.tahun',
                                        'pen_penilaian.nama_penilaian',
                                    ]);
                                    // get();
                                    // dd($obj);

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

    public function listPenyelaras($FK_penyelaras)  {

        $obj = pen_sesi_siri_penilaian::
                                    leftjoin('pen_tetapan_masa', 'pen_tetapan_masa.id_tetapan_masa', '=', 'pen_sesi_siri_penilaian.id_tetapan_masa')->
                                    leftjoin('pen_mod_penilaian', 'pen_mod_penilaian.id_mod_penilaian', '=', 'pen_sesi_siri_penilaian.status_penilaian')->
                                    leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_sesi_siri_penilaian.FK_siri_penilaian')->
                                    leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                    where('pen_sesi_siri_penilaian.statusrekod','1') -> 
                                    where('pen_penilaian.FK_penyelaras',$FK_penyelaras) -> 
                                    orderBy('pen_siri_penilaian.id_siri_penilaian','ASC')->
                                    get([
                                        'pen_sesi_siri_penilaian.id_sesi_siri_penilaian',
                                        'pen_sesi_siri_penilaian.FK_siri_penilaian',
                                        'pen_sesi_siri_penilaian.id_tetapan_masa',
                                        'pen_sesi_siri_penilaian.sesi_penilaian',
                                        'pen_sesi_siri_penilaian.tarikh_mula',
                                        'pen_sesi_siri_penilaian.tarikh_tamat',
                                        'pen_sesi_siri_penilaian.duration',
                                        'pen_sesi_siri_penilaian.masa_mula',
                                        'pen_sesi_siri_penilaian.masa_tamat',
                                        'pen_sesi_siri_penilaian.pautan_google',
                                        'pen_sesi_siri_penilaian.pautan_zoom',
                                        'pen_sesi_siri_penilaian.pautan_skype',
                                        'pen_sesi_siri_penilaian.pautan_team',
                                        'pen_sesi_siri_penilaian.pautan_status',
                                        'pen_sesi_siri_penilaian.status_penilaian',
                                        'pen_mod_penilaian.mod_penilaian',
                                        'pen_sesi_siri_penilaian.bil_calon',
                                        'pen_sesi_siri_penilaian.json_set_soalan',
                                        'pen_sesi_siri_penilaian.created_at',
                                        'pen_sesi_siri_penilaian.updated_at',
                                        'pen_sesi_siri_penilaian.created_by',
                                        'pen_sesi_siri_penilaian.updated_by',
                                        'pen_siri_penilaian.kod',
                                        'pen_siri_penilaian.tahun',
                                        'pen_penilaian.nama_penilaian',
                                    ]);
                                    // get();
                                    // dd($obj);

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

    public function listUrusetia($FK_users)  {

        $obj = pen_sesi_siri_penilaian::
                                    leftjoin('pen_tetapan_masa', 'pen_tetapan_masa.id_tetapan_masa', '=', 'pen_sesi_siri_penilaian.id_tetapan_masa')->
                                    leftjoin('pen_mod_penilaian', 'pen_mod_penilaian.id_mod_penilaian', '=', 'pen_sesi_siri_penilaian.status_penilaian')->
                                    leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_sesi_siri_penilaian.FK_siri_penilaian')->
                                    leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                    leftjoin('pen_urusetia','pen_urusetia.FK_siri_penilaian','pen_siri_penilaian.id_siri_penilaian')->
                                    where('pen_sesi_siri_penilaian.statusrekod','1') -> 
                                    where('pen_urusetia.FK_users',$FK_users) -> 
                                    orderBy('pen_siri_penilaian.id_siri_penilaian','ASC')->
                                    get([
                                        'pen_sesi_siri_penilaian.id_sesi_siri_penilaian',
                                        'pen_sesi_siri_penilaian.FK_siri_penilaian',
                                        'pen_sesi_siri_penilaian.id_tetapan_masa',
                                        'pen_sesi_siri_penilaian.sesi_penilaian',
                                        'pen_sesi_siri_penilaian.tarikh_mula',
                                        'pen_sesi_siri_penilaian.tarikh_tamat',
                                        'pen_sesi_siri_penilaian.duration',
                                        'pen_sesi_siri_penilaian.masa_mula',
                                        'pen_sesi_siri_penilaian.masa_tamat',
                                        'pen_sesi_siri_penilaian.pautan_google',
                                        'pen_sesi_siri_penilaian.pautan_zoom',
                                        'pen_sesi_siri_penilaian.pautan_skype',
                                        'pen_sesi_siri_penilaian.pautan_team',
                                        'pen_sesi_siri_penilaian.pautan_status',
                                        'pen_sesi_siri_penilaian.status_penilaian',
                                        'pen_mod_penilaian.mod_penilaian',
                                        'pen_sesi_siri_penilaian.bil_calon',
                                        'pen_sesi_siri_penilaian.json_set_soalan',
                                        'pen_sesi_siri_penilaian.created_at',
                                        'pen_sesi_siri_penilaian.updated_at',
                                        'pen_sesi_siri_penilaian.created_by',
                                        'pen_sesi_siri_penilaian.updated_by',
                                        'pen_siri_penilaian.kod',
                                        'pen_siri_penilaian.tahun',
                                        'pen_penilaian.nama_penilaian',
                                    ]);
                                    // get();
                                    // dd($obj);

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

    public function listAll()  {

        $obj = pen_sesi_siri_penilaian::
                                    leftjoin('pen_tetapan_masa', 'pen_tetapan_masa.id_tetapan_masa', '=', 'pen_sesi_siri_penilaian.id_tetapan_masa')->
                                    leftjoin('pen_mod_penilaian', 'pen_mod_penilaian.id_mod_penilaian', '=', 'pen_sesi_siri_penilaian.status_penilaian')->
                                    leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_sesi_siri_penilaian.FK_siri_penilaian')->
                                    leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                    where('pen_sesi_siri_penilaian.statusrekod','1') -> 
                                    get([
                                        'pen_sesi_siri_penilaian.id_sesi_siri_penilaian',
                                        'pen_sesi_siri_penilaian.FK_siri_penilaian',
                                        'pen_sesi_siri_penilaian.id_tetapan_masa',
                                        'pen_sesi_siri_penilaian.sesi_penilaian',
                                        'pen_sesi_siri_penilaian.tarikh_mula',
                                        'pen_sesi_siri_penilaian.tarikh_tamat',
                                        'pen_sesi_siri_penilaian.duration',
                                        'pen_sesi_siri_penilaian.masa_mula',
                                        'pen_sesi_siri_penilaian.masa_tamat',
                                        'pen_sesi_siri_penilaian.pautan_google',
                                        'pen_sesi_siri_penilaian.pautan_zoom',
                                        'pen_sesi_siri_penilaian.pautan_skype',
                                        'pen_sesi_siri_penilaian.pautan_team',
                                        'pen_sesi_siri_penilaian.pautan_status',
                                        'pen_sesi_siri_penilaian.status_penilaian',
                                        'pen_mod_penilaian.mod_penilaian',
                                        'pen_sesi_siri_penilaian.bil_calon',
                                        'pen_sesi_siri_penilaian.json_set_soalan',
                                        'pen_sesi_siri_penilaian.created_at',
                                        'pen_sesi_siri_penilaian.updated_at',
                                        'pen_sesi_siri_penilaian.created_by',
                                        'pen_sesi_siri_penilaian.updated_by',
                                        'pen_siri_penilaian.kod',
                                        'pen_siri_penilaian.tahun',
                                        'pen_penilaian.nama_penilaian',
                                    ]);
                                    // get();
                                    // dd($obj);

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

    // public function listByPenilaian(Request $request)  {
    //     $FK_penilaian = $request->input('FK_penilaian');
    //     $obj = pen_sesi_siri_penilaian::leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
    //                                 leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
    //                                 leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
    //                                 leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
    //                                 where('pen_siri_penilaian.FK_penilaian',$FK_penilaian)->
    //                                 get([
    //                                     'id_siri_penilaian',
    //                                     'kod_siri_penilaian',
    //                                     'keterangan',
    //                                     // 'waktu_mula',
    //                                     // 'waktu_tamat',
    //                                     'tahun',
    //                                     'nosiri',
    //                                     'pen_siri_penilaian.statusrekod',
    //                                     'id_penilaian',
    //                                     'nama_penilaian',
    //                                     'id_kluster',
    //                                     'nama_kluster',
    //                                     'id_kategori_penilaian',
    //                                     'nama_kategori_penilaian',
    //                                     'id_users',
    //                                     'nama',
    //                                     'notel',
    //                                     'notel_kerajaan',
    //                                     'emel',
    //                                     'emel_kerajaan',
    //                                 ]);

    //     if (sizeof($obj)>0)   {
    //         return response()->json([
    //             'success'=>true,
    //             'message'=>'List Success!',
    //             'data'=>$obj
    //         ],200);
    //     } else    {
    //         return response()->json([
    //             'success'=>false,
    //             'message'=>'Bad Request',
    //             'data'=>''
    //         ],404);
    //     }
        
    // }

    // public function listByUrusetiaSiriPenilaian(Request $request)  {
    //     $FK_users = $request->input('FK_users');
    //     $obj = pen_sesi_siri_penilaian::leftjoin('pen_urusetia', 'pen_urusetia.FK_siri_penilaian', '=', 'pen_siri_penilaian.id_siri_penilaian')->
    //                                 leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
    //                                 leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
    //                                 where('pen_urusetia.FK_users',$FK_users)->
    //                                 groupby('id_penilaian') ->
    //                                 groupby('nama_penilaian') ->
    //                                 groupby('kod_penilaian') ->
    //                                 groupby('id_kategori_penilaian') ->
    //                                 groupby('nama_kategori_penilaian') ->
    //                                 get([
    //                                     pen_penilaian::raw("DISTINCT(id_penilaian) AS id_penilaian"),
    //                                     'nama_penilaian',
    //                                     'kod_penilaian',
    //                                     'id_kategori_penilaian',
    //                                     'nama_kategori_penilaian',
    //                                 ]);

    //     if (sizeof($obj)>0)   {
    //         return response()->json([
    //             'success'=>true,
    //             'message'=>'List Success!',
    //             'data'=>$obj
    //         ],200);
    //     } else    {
    //         return response()->json([
    //             'success'=>false,
    //             'message'=>'Bad Request',
    //             'data'=>''
    //         ],404);
    //     }
        
    // }

    // public function listAll()  {
    //     $obj = pen_sesi_siri_penilaian::leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
    //                                 leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
    //                                 leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
    //                                 leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
    //                                 get([
    //                                     'id_siri_penilaian',
    //                                     'kod_siri_penilaian',
    //                                     'tarikh_penilaian',
    //                                     'waktu_mula',
    //                                     'waktu_tamat',
    //                                     'FK_urusetia',
    //                                     'bil_max_calon',
    //                                     'pen_siri_penilaian.statusrekod',
    //                                     'id_penilaian',
    //                                     'nama_penilaian',
    //                                     'id_kluster',
    //                                     'nama_kluster',
    //                                     'id_kategori_penilaian',
    //                                     'nama_kategori_penilaian',
    //                                     'id_users',
    //                                     'nama',
    //                                     'notel',
    //                                     'notel_kerajaan',
    //                                     'emel',
    //                                     'emel_kerajaan',
    //                                 ]);

    //     if ($obj)   {
    //         return response()->json([
    //             'success'=>true,
    //             'message'=>'List Success!',
    //             'data'=>$obj
    //         ],200);
    //     } else    {
    //         return response()->json([
    //             'success'=>false,
    //             'message'=>'Bad Request',
    //             'data'=>''
    //         ],404);
    //     }
        
    // }

    // public function update(Request $request)    {
    //     $id = $request->input('id_siri_penilaian');
    //     $FK_penilaian = $request->input('FK_penilaian');
    //     $nosiri = $request->input('nosiri');
    //     $tahun = $request->input('tahun');
    //     $keterangan = $request->input('keterangan');
    //     $jenis_penilaian = $request->input('jenis_penilaian');
    //     $updated_by = $request->input('updated_by');

    //     $obj = pen_sesi_siri_penilaian::where('id_siri_penilaian',$id)  -> update([
    //         'FK_penilaian' => $FK_penilaian,
    //         'nosiri' => $nosiri,
    //         'tahun' => $tahun,
    //         'keterangan' => $keterangan,
    //         'jenis_penilaian' => $jenis_penilaian,
    //         'updated_by' => $updated_by
    //     ]);

    //     if($obj)  {
    //         $token = $this->getToken($updated_by);

    //         // dd($token);
    //         return response()->json([
    //             'success'=>true,
    //             'message'=>'Kemaskini Rekod Berjaya!',
    //             'data'=>$obj,
    //             'token'=>$token
    //         ],201);
    //     }else    {
    //         return response()->json([
    //             'success'=>false,
    //             'message'=>'Bad Request',
    //             'data'=>''
    //         ],404);
    //     }
    // }

    public function listByTarikhMohonOpen()  {
        $obj = pen_sesi_siri_penilaian::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', '=', 'pen_sesi_siri_penilaian.FK_siri_penilaian')->
                                        leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                        leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                        leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                        leftjoin('pen_jenis_penilaian', 'pen_jenis_penilaian.id_jenis_penilaian', '=', 'pen_siri_penilaian.jenis_penilaian')->
                                        leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
                                        where('pen_siri_penilaian.statusrekod','1') -> 
                                        where('pen_siri_penilaian.tarikh_mula_mohon','<=',DB::RAW("DATE(NOW())")) -> 
                                        where('pen_siri_penilaian.tarikh_tamat_mohon','>=',DB::RAW("DATE(NOW())")) -> 
                                        where('pen_siri_penilaian.keterbukaan','>','1') -> 
                                        get([
                                            'id_sesi_siri_penilaian',
                                            'sesi_penilaian',
                                            'pen_sesi_siri_penilaian.tarikh_mula',
                                            'pen_sesi_siri_penilaian.masa_mula',
                                            'pen_sesi_siri_penilaian.masa_tamat',
                                            'id_siri_penilaian',
                                            'kod_siri_penilaian',
                                            'tarikh_mula_mohon',
                                            'tarikh_tamat_mohon',
                                            'tarikh_penilaian',
                                            'waktu_mula',
                                            'waktu_tamat',
                                            'FK_urusetia',
                                            'bil_max_calon',
                                            'pen_siri_penilaian.statusrekod',
                                            'id_penilaian',
                                            'nama_penilaian',
                                            'id_kluster',
                                            'nama_kluster',
                                            'id_kategori_penilaian',
                                            'nama_kategori_penilaian',
                                            'id_jenis_penilaian',
                                            'nama_jenis_penilaian',
                                            'id_users',
                                            'nama',
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

    public function updateBilCalon(Request $request)    {
        $id = $request->input('id_sesi_siri_penilaian');
        $bil_calon = $request->input('bil_calon');
        $updated_by = $request->input('updated_by');

        $obj = pen_sesi_siri_penilaian::where('id_sesi_siri_penilaian',$id)  -> update([
            'bil_calon' => $bil_calon,
            'updated_by' => $updated_by
        ]);

        if($obj)  {
            // $token = $this->getToken($updated_by);

            // dd($token);
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
                'data'=>$obj,
                // 'token'=>$token
            ],201);
        }else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function updateSenaraiSet(Request $request)    {
        $id = $request->input('id_sesi_siri_penilaian');
        $json_set_soalan = $request->input('json_set_soalan');
        $updated_by = $request->input('updated_by');

        $obj = pen_sesi_siri_penilaian::where('id_sesi_siri_penilaian',$id)  -> update([
            'json_set_soalan' => $json_set_soalan,
            'updated_by' => $updated_by
        ]);

        if($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
                'data'=>$obj,
                // 'token'=>$token
            ],201);
        }else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],400);
        }
    }

    // public function updateUrusetia(Request $request)    {
    //     $id = $request->input('id_siri_penilaian');
    //     $FK_urusetia = $request->input('FK_urusetia');
    //     $updated_by = $request->input('updated_by');

    //     // $pen_siri_penilaian = pen_sesi_siri_penilaian::find($id); 

    //     $obj = pen_sesi_siri_penilaian::where('id_siri_penilaian',$id)  -> update([
    //         'FK_urusetia' => $FK_urusetia,
    //         'updated_by' => $updated_by
    //     ]);

    //     if ($obj)  {
    //         $token = $this->getToken($updated_by);
    //         return response()->json([
    //             'success'=>true,
    //             'message'=>"Kemaskini Berjaya!",
    //             'data' => $obj,
    //             'token' => $token
    //         ],200);
    //     }
    //     else{
    //         return response()->json([
    //             'success'=>false,
    //             'message'=>"Kemaskini Gagal!",
    //             'data'=>''
    //         ],404);
    //     }
    // }

    public function delete(Request $request){
        $id_sesi_siri_penilaian = $request->input('id_sesi_siri_penilaian');

        $obj = pen_sesi_siri_penilaian::where('id_sesi_siri_penilaian',$id_sesi_siri_penilaian)->delete();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Hapus Sesi Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Hapus Sesi Gagal!',
                'data'=>''
            ],404);
        }
    }
}
