<?php

namespace App\Http\Controllers;

use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_capaian;
use App\Models\pen_users;
use App\Models\pen_tetapan;

class pen_capaianController extends Controller
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
        $FK_peranan = $request->input('FK_peranan');
        $FK_users = $request->input('FK_users');
        $FK_agensi = $request->input('FK_agensi');
        $FK_kluster = $request->input('FK_kluster');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');
        $statusrekod = "1";
        if ($FK_peranan == 1 || $FK_peranan == 2){
            $checkexist = pen_capaian::where('pen_capaian.FK_users',$FK_users) -> 
                                        where('pen_capaian.FK_peranan',$FK_peranan) -> 
                                        first(); // list all data
        } else{
            $checkexist = pen_capaian::where('pen_capaian.FK_users',$FK_users) -> 
                                        where('pen_capaian.FK_peranan',$FK_peranan) -> 
                                        where('pen_capaian.FK_kluster',$FK_kluster) -> 
                                        first(); // list all data
            
        }
        if (!$checkexist)   {
            $register = pen_capaian::create([
                'FK_agensi' => $FK_agensi,
                'FK_kluster' => $FK_kluster,
                'FK_peranan' => $FK_peranan,
                'FK_users' => $FK_users,
                'created_by' => $created_by,
                'updated_by' => $updated_by,
                'statusrekod' => $statusrekod
            ]);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'System Policy Violation',
                'data'=>$checkexist
            ],404);
        }        

        if ($register)  {
            $pen_users_search = pen_capaian::leftjoin('pen_peranan','pen_peranan.id_peranan','=','pen_capaian.FK_peranan')->
                                            leftjoin('pen_users','pen_users.id_users','=','pen_capaian.FK_users')->
                                            where('pen_capaian.FK_users',$FK_users) -> 
                                            orderBy('pen_capaian.id_capaian','DESC') -> 
                                            first();
            $tetapan_mail = pen_tetapan::first();
            $emel = $pen_users_search->emel;
            $mail = new PHPMailer();
        // mail('amriamewii@gmail.com', '[TEST MESSAGE]', 'This is the body message', 'From: muhammadamri@protigatech.com');
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host       = $tetapan_mail->mail_gateway;
            // disable untuk INTAN
            // $mail->SMTPAuth   = true;
            // $mail->Username   = $tetapan_mail->mail_username;
            // $mail->Password   = $tetapan_mail->mail_password;
            // $mail->SMTPSecure = $tetapan_mail->mail_smtp_secure;
            // disable untuk INTAN
            
            $mail->Port       = $tetapan_mail->mail_port;
            
            $mail->setFrom('penilaian@intanbk.intan.my', 'Sistem Pengurusan Penilaian INTAN (Exam 4 U)');
            $mail->addAddress($pen_users_search->emel_kerajaan);
            $mail->addAddress($pen_users_search->emel);
                
            $mail->isHTML(true);                                  
            $mail->Subject = 'PENGURUSAN PENILAIAN - CAPAIAN PENTADBIR';
            $mail->Body    = '<b>Pendaftaran Capaian '. $pen_users_search->nama_peranan .'</b><br><br>
                                Assalamualaikum dan salam sejahtera<br>
                                '.$pen_users_search->nama.'<br><br>
                                Anda telah dilantik sebagai '. $pen_users_search->nama_peranan .'. <br>
                                <br>
                                Sila log masuk menggunakan nombor kad pengenalan dan katalaluan yang telah diberi/ditetapkan. Terima kasih.<br><br>
                                Pautan Sistem: <a href="'.$tetapan_mail->link_sistem.'/admin">Sistem Pengurusan Penilaian INTAN Malaysia</a><br><br>
                                Terima kasih.';
            $mail->AltBody = 'Alternate Message';
            if(!$mail->send()) {
                // dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>true,
                    'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
                    'data'=>'',
                ],200);
            } 
            else {
                return response()->json([
                    'success'=>'true',
                    'message'=>'Permintaan set semula katalaluan telah dihantar ke<br><br>Emel Rasmi ['.$pen_users_search->emel_kerajaan.']<br>Emel Peribadi ['.$pen_users_search->emel.']<br><br>Sekiranya Emel Rasmi tidak tepat sila kemaskini di <br><span style="font-weight: bold;">Sistem HRMIS</span>',
                    'data'=>'',
                ],200);
            }
            return response()->json([
                'success'=>true,
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$register,
            ],201);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'Register Failed',
                'data'=>$register,
            ],404);
        }
    }

    public function show(Request $request)  {
        $id = $request->input('id_capaian');

        $pen_capaian = pen_capaian::where('id_capaian',$id)->first();

        if ($pen_capaian)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_capaian
            ],201);
        }
    }

    public function showGet($FK_users)  {
        // $id = $request->input('id_capaian');

        $pen_capaian = pen_capaian::join('pen_peranan', 'pen_peranan.id_peranan', '=', 'pen_capaian.FK_peranan') -> 
                                    join('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_capaian.FK_kluster') -> 
                                    where('pen_capaian.FK_users',$FK_users)->
                                    first([
                                        'id_peranan',
                                        'id_kluster',
                                        'nama_kluster',
                                        'id_capaian',
                                        'pen_capaian.FK_users',
                                    ]);

        if ($pen_capaian)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_capaian
            ],200);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function list()  {
        $pen_capaian = pen_capaian::select("*", "pen_capaian.statusrekod AS pen_capaianstatusrekod") ->
                            join('pen_users', 'pen_users.id_users', '=', 'pen_capaian.FK_users') -> 
                            join('pen_peranan', 'pen_peranan.id_peranan', '=', 'pen_capaian.FK_peranan') -> 
                            where('pen_capaian.statusrekod','1') -> get(); // list all data

        if ($pen_capaian)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Berjaya!',
                'data'=>$pen_capaian
            ],200);
        }
        
    }

    public function listByPeranan($FK_peranan)  {
        $pen_capaian = pen_capaian::join('pen_users', 'pen_users.id_users', '=', 'pen_capaian.FK_users') -> 
                                    join('pen_peranan', 'pen_peranan.id_peranan', '=', 'pen_capaian.FK_peranan') -> 
                                    where(pen_capaian::raw("MD5(pen_capaian.FK_peranan)"),$FK_peranan) -> 
                                    where('pen_capaian.statusrekod','1') -> 
                                    get([
                                        'FK_users',
                                        'nama',
                                        'no_kad_pengenalan',
                                        'notel',
                                        'notel_kerajaan',
                                        'emel',
                                        'emel_kerajaan',
                                        'pen_capaian.FK_kluster',
                                    ]); // list all data

        if ($pen_capaian)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$pen_capaian
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>''
            ],404);
        }
        
    }

    public function update(Request $request)    {
        $id = $request->input('id_capaian');
        $FK_peranan = $request->input('FK_peranan');
        $FK_agensi = $request->input('FK_agensi');
        $jenis_fasiliti = $request->input('jenis_fasiliti');
        $FK_users = $request->input('FK_users');
        $updated_by = $request->input('updated_by');

        $pen_capaian = pen_capaian::where('id_capaian',$id) -> update([
            'FK_peranan' => $FK_peranan,
            'jenis_fasiliti' => $jenis_fasiliti,
            'FK_users' => $FK_users,
            'updated_by' => $updated_by
        ]);


        if ($pen_capaian)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_capaian
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
        $id = $request->input('id_capaian');

        $pen_capaian_search = pen_capaian::where('id_capaian',$id)->first(); 
        switch($pen_capaian_search->statusrekod)    {
            case 0: $pen_capaian = pen_capaian::where('id_capaian',$id) -> update([
                        'statusrekod' => '1',
                    ]);
                    break;
            case 1: $pen_capaian = pen_capaian::where('id_capaian',$id) -> update([
                        'statusrekod' => '0',
                    ]);
                    break;
        }
        $pen_capaian_search = pen_capaian::where('id_capaian',$id)->first(); 
        
        if ($pen_capaian)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_capaian_search
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
