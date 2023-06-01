<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\pen_users;
use App\Models\pen_capaian;
use App\Models\pen_tetapan;
use App\Models\pen_siri_penilaian;
use App\Models\pen_sesi_siri_penilaian;
use App\Models\pen_calon_soalan;
use PDF;

class authController extends Controller
{    

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

    public function getTokenPenilaian($id)  {
        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $token     = hash("sha256", Str::random(32).$salt);
        $obj = pen_calon_soalan::where('id_calon_soalan',$id)->update([
            'token' => $token
        ]);

        $token = false;

        if($obj){
            $obj = pen_calon_soalan::where('id_calon_soalan',$id)->first(['token']);
            $random = hash("sha256", Str::random(32)).'0L1v3';
            $token = $random.$obj->token;
        }

        return $token;
    }

    public function register(Request $request) {
        $katalaluan = $request->input('katalaluan');
        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $enc_katalaluan     = hash("sha256", $katalaluan.$salt);
        // dd($enc_katalaluan);
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $nama = $request->input('nama');
        $emel = $request->input('emel');
        $notel = $request->input('notel');
        $FK_jenis_pengguna = $request->input('FK_jenis_pengguna');
        $FK_gelaran = $request->input('FK_gelaran');
        $emel_kerajaan = $request->input('emel_kerajaan');
        $notel_kerajaan = $request->input('notel_kerajaan');
        $nama_jawatan = $request->input('nama_jawatan');
        $FK_kementerian = $request->input('FK_kementerian');
        $FK_kat_agensi = $request->input('FK_kat_agensi');
        $FK_agensi = $request->input('FK_agensi');
        $kategori_perkhidmatan = $request->input('kategori_perkhidmatan');
        $skim = $request->input('skim');
        $taraf_jawatan = $request->input('taraf_jawatan');
        $nama_majikan = $request->input('nama_majikan');
        $emel_majikan = $request->input('emel_majikan');
        $notel_majikan = $request->input('notel_majikan');


        $register = pen_users::create([
            'no_kad_pengenalan' => $no_kad_pengenalan,
            'nama' => $nama,
            'emel' => $emel,
            'notel' => $notel,
            'FK_jenis_pengguna' => $FK_jenis_pengguna,
            'FK_gelaran' => $FK_gelaran,
            'katalaluan' => $enc_katalaluan,
            'emel_kerajaan' => $emel_kerajaan,
            'notel_kerajaan' => $notel_kerajaan,
            'nama_jawatan' => $nama_jawatan,
            'FK_kementerian' => $FK_kementerian,
            'FK_kat_agensi' => $FK_kat_agensi,
            'FK_agensi' => $FK_agensi,
            'kategori_perkhidmatan' => $kategori_perkhidmatan,
            'skim' => $skim,
            'taraf_jawatan' => $taraf_jawatan,
            'nama_majikan' => $nama_majikan,
            'emel_majikan' => $emel_majikan,
            'notel_majikan' => $notel_majikan,
        ]);

        if ($register)  {
            $tetapan_mail = pen_tetapan::first();
            $emelreceiver = $emel;
            $mail = new PHPMailer();
        // mail('amriamewii@gmail.com', '[TEST MESSAGE]', 'This is the body message', 'From: muhammadamri@protigatech.com');
            // $mail->SMTPAuth = true;
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
            $mail->addAddress($emelreceiver);
                
            $mail->isHTML(true);                                  
            $mail->Subject = 'PENGURUSAN PENILAIAN - PENDAFTARAN AKAUN PENGGUNA';
            $mail->Body    = '<b>Pendaftaran Akaun Pengguna</b><br><br>
                                Assalamualaikum dan salam sejahtera<br>
                                '.$nama.'<br><br>
                                Tahniah! Anda berjaya mendaftar akaun. <br>
                                Sekiranya anda tidak membuat permintaan ini, silakan abaikan emel ini. <br>
                                Sekiranya anda membuat permintaan ini, Sila klik pautan dibawah untuk masuk ke dalam sistem:<br><br>
                                No. Kad Pengenalan: '. $no_kad_pengenalan .'<br>
                                Katalaluan: '. $katalaluan .'<br><br>
                                <a href="'.$tetapan_mail->link_sistem.'/user">Sistem Pengurusan Penilaian INTAN Malaysia</a><br><br>
                                Terima kasih.';
            $mail->AltBody = 'Alternate Message';
            if(!$mail->send()) {
                dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>'true',
                    'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
                    'data'=>''
                ],200);
                // exit;
            }
            if(!$mail->send()) {
                dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>'true',
                    'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
                    'data'=>''
                ],200);
            } 
            else {
                // dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>'true',
                    'message'=>'Berjaya Mendaftar Akaun! Sila log masuk menggunakan No. Kad Pengenalan & Katalaluan yang didaftarkan.',
                    'data'=>''
                ],200);
            }
            return response()->json([
                'success'=>'true',
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$register
            ],201);
        }

        else    {
            return response()->json([
                'success'=>'false',
                'message'=>'Bad Request',
                'data'=>$register
            ],400);
        }
    }

    public function login(Request $request){
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $katalaluan = $request->input('katalaluan'); // user11
        
        $userS = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->
                            // where('FK_jenis_pengguna','1')->
                            // where('users_intan','1')->
                            first();
        if($userS){
            $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
            $enc_katalaluan  = hash("sha256", $katalaluan.$salt);
            // dd($enc_katalaluan);
            if($userS->katalaluan === $enc_katalaluan){
                $token = Str::random(32);
    
                $user = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->update([
                    'token' => $token
                ]);
    
                if($user){
                    $token = $this->getToken($userS->id_users);
                    return response()->json([
                        'success'=>true,
                        'token'=>$token,
                        'no_kad_pengenalan' => $no_kad_pengenalan,
                        'messages'=>'Log Masuk Berjaya',
                        'data'=>$userS, // id_users, nama, no_kad_pengenalan, katalaluan, token
                    ],201);
                }
                else {
                    return response()->json([
                        'success'=>false,
                        'token'=>$token,
                        'messages'=>'Log Masuk Gagal',
                        'data'=>'',
                    ],201);
                }
            }
            else{
                return response()->json([
                    'success'=>false,
                    // 'token'=>$token,
                    'messages'=>'Log Masuk Gagal',
                    'data'=>'Katalaluan tidak tepat. Sila cuba lagi.',
                ],201);
            }
        }
        else {
            return response()->json([
                'success'=>false,
                // 'token'=>$token,
                'messages'=>'Log Masuk Gagal',
                'data'=>'Sila hubungi pihak pentadbir sistem untuk maklumat lanjut.',
            ],201);
        }
    }

    public function loginPenilaian(Request $request){
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $no_angka_giliran = $request->input('no_angka_giliran');
        $nama = $request->input('nama');
        $jawatan = $request->input('jawatan');
        $gred = $request->input('gred');
        $emel = $request->input('emel');
        $FK_siri_penilaian = $request->input('isp');
        $dateNow = $request->input('dateNow');
        
        $userS = pen_calon_soalan::leftjoin('pen_sesi_siri_penilaian','id_sesi_siri_penilaian','pen_calon_soalan.FK_sesi');

        if($no_kad_pengenalan != "undefined" && $no_kad_pengenalan != null){ $userS = $userS -> where('no_kad_pengenalan',$no_kad_pengenalan); }
        if($no_angka_giliran != "undefined" && $no_angka_giliran != null){ $userS = $userS -> where('no_angka_giliran',$no_angka_giliran); }
        if($nama != "undefined" && $nama != null){ $userS = $userS -> where('nama',$nama); }
        if($jawatan != "undefined" && $jawatan != null){ $userS = $userS -> where('jawatan',$jawatan); }
        if($gred != "undefined" && $gred != null){ $userS = $userS -> where('gred',$gred); }
        if($emel != "undefined" && $emel != null){ $userS = $userS -> where('emel',$emel); }
        if($FK_siri_penilaian != "undefined" && $FK_siri_penilaian != null){ $userS = $userS -> where('pen_calon_soalan.FK_siri_penilaian',$FK_siri_penilaian); }

        $user_check_combination = $userS -> first();
        
        if($user_check_combination){
            if($user_check_combination->token == '0'){
                return response()->json([
                    'success'=>false,
                    // 'token'=>$token,
                    'messages'=>'Anda Telah Menjawab Penilaian Ini.',
                    'data'=>'Sila hubungi pihak pentadbir sistem untuk maklumat lanjut.',
                ],201);
            } else {
                $userS = $userS ->  where(DB::RAW('CONCAT(pen_sesi_siri_penilaian.tarikh_mula, " ", pen_sesi_siri_penilaian.masa_mula)'),'<',date("Y-m-d H:i",strtotime($dateNow))) ->
                                    where(DB::RAW('CONCAT(pen_sesi_siri_penilaian.tarikh_tamat, " ", pen_sesi_siri_penilaian.masa_tamat)'),'>',date("Y-m-d H:i",strtotime($dateNow))) ->first();
                if($userS){
                    $token = $this->getTokenPenilaian($userS->id_calon_soalan);
                    return response()->json([
                        'success'=>true,
                        'token'=>$token,
                        'no_kad_pengenalan' => $no_kad_pengenalan,
                        'messages'=>'Log Masuk Berjaya',
                        'data'=>$userS, // id_users, nama, no_kad_pengenalan, katalaluan, token
                    ],201);
                }
                else {
                    return response()->json([
                        'success'=>false,
                        // 'token'=>$token,
                        'messages'=>'Cubaan Log Masuk Di Luar Waktu Penilaian.',
                        'data'=>'Sila hubungi pihak pentadbir sistem untuk maklumat lanjut.',
                    ],201);
                }
            }
        } else {
            return response()->json([
                'success'=>false,
                // 'token'=>$token,
                'messages'=>'Kombinasi No. Kad Pengenalan & Katalaluan tidak tepat.',
                'data'=>'Sila hubungi pihak pentadbir sistem untuk maklumat lanjut.',
            ],201);
        }

        
    }

    public function loginUser(Request $request){
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $katalaluan = $request->input('katalaluan');

        $userS = pen_users::leftjoin('pen_kementerian', 'pen_kementerian.id_kementerian', '=', 'pen_users.FK_kementerian') -> 
                            leftjoin('pen_agensi', 'pen_agensi.id_agensi', '=', 'pen_users.FK_agensi') -> 
                            where('no_kad_pengenalan',$no_kad_pengenalan)->first();
        if($userS){
            $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
            $enc_katalaluan     = hash("sha256", $katalaluan.$salt);
            
            // dd($enc_katalaluan);
            if($userS->katalaluan === $enc_katalaluan){
                $token = Str::random(32);
    
                $user = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->update([
                    'token' => $token
                ]);
    
                if($user){
    
                    return response()->json([
                        'success'=>true,
                        'token'=>$token,
                        'no_kad_pengenalan' => $no_kad_pengenalan,
                        'messages'=>'Log Masuk Berjaya',
                        'data'=>$userS,
                    ],201);
                }
                else {
                    return response()->json([
                        'success'=>false,
                        'token'=>$token,
                        'messages'=>'Log Masuk Gagal',
                        'data'=>'',
                    ],201);
                }
            }
            else{
                return response()->json([
                    'success'=>false,
                    // 'token'=>$token,
                    'messages'=>'Log Masuk Gagal',
                    'data'=>'Katalaluan tidak tepat. Sila cuba lagi.',
                ],201);
            }
        }
        else {
            return response()->json([
                'success'=>false,
                // 'token'=>$token,
                'messages'=>'Log Masuk Gagal',
                'data'=>'Sila hubungi pihak pentadbir sistem untuk maklumat lanjut.',
            ],201);
        }
    }

    public function showGetResetKatalaluan($resetkatalaluan)  {

        $pen_users = pen_users::where('resetkatalaluan',$resetkatalaluan)->first();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_users
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ]);
        }
    }

    public function resetpasswordtomail(Request $request)  {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $masa = $request->input('masa');
        $landing_page = $request->input('landing_page');

        $pen_users_search = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->first();
        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $enc_link     = hash("sha256", $masa.$salt);
        
        if ($pen_users_search)  {
            $pen_users = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan) -> update([
                'resetkatalaluan' => $enc_link
            ]);
            if ($pen_users)   {
                $tetapan_mail = pen_tetapan::first();
                $emel = $pen_users_search->emel;
                $mail = new PHPMailer();
            // mail('amriamewii@gmail.com', '[TEST MESSAGE]', 'This is the body message', 'From: muhammadamri@protigatech.com');
                $mail->SMTPDebug = 0;
                $mail->isSMTP();
                $mail->Host       = $tetapan_mail->mail_gateway;

                if($tetapan_mail->mail_username == 'muhammadamri@protigatech.com'){
                    $mail->SMTPAuth   = true;
                    $mail->Username   = $tetapan_mail->mail_username;
                    $mail->Password   = $tetapan_mail->mail_password;
                    $mail->SMTPSecure = $tetapan_mail->mail_smtp_secure;
                }
                
                $mail->Port       = $tetapan_mail->mail_port;
                
                $mail->setFrom('penilaian@intanbk.intan.my', 'Admin Penilaian INTAN');
                $mail->addAddress($pen_users_search->emel_kerajaan);
                $mail->addAddress($pen_users_search->emel);
                    
                $mail->isHTML(true);                                  
                $mail->Subject = 'PENILAIAN INTAN - SET SEMULA KATALALUAN';
                $mail->Body    = '<b>Set Semula Katalaluan</b><br><br>
                                    Assalamualaikum dan salam sejahtera<br>
                                    '.$pen_users_search->nama.'<br><br>
                                    Anda telah membuat permintaan menetapkan semula kata laluan. <br>
                                    Sekiranya anda tidak membuat permintaan ini, silakan abaikan emel ini. <br>
                                    Sekiranya anda membuat permintaan ini, sila klik pautan dibawah untuk tetapkan semula katalaluan anda:<br><br>
                                    <a href="'.$tetapan_mail->link_sistem.'/user/reset/?temp='.$enc_link.'&capaian='.$landing_page.'">Set Semula Katalaluan</a><br><br>
                                    Terima kasih.';
                $mail->AltBody = 'Alternate Message';
                if(!$mail->send()) {
                    return response()->json([
                        'success'=>'true',
                        'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
                        'data'=>''
                    ],200);
                    // exit;
                }
                else {
                    return response()->json([
                        'success'=>'true',
                        'message'=>'Permintaan set semula katalaluan telah dihantar ke<br><br>Emel Rasmi ['.$pen_users_search->emel_kerajaan.']<br>Emel Peribadi ['.$pen_users_search->emel.']<br><br>Sekiranya Emel Rasmi tidak tepat sila kemaskini di <br><span style="font-weight: bold;">Sistem HRMIS</span>',
                        'data'=>''
                    ],200);
                }
            }
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ]);
        }
    }

    public function showIcEmel(Request $request)  {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $emel = $request->input('emel');

        $pen_users = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->where('emel',$emel)->first();

        if ($pen_users)   {
            $mail = new PHPMailer(true);
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_users
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ]);
        }
    }

    public function resetpassword(Request $request)  {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $katalaluan = $request->input('katalaluan');

        $pen_users_search = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->first();
        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $enc_katalaluan     = hash("sha256", $katalaluan.$salt);
        
        if ($pen_users_search)  {
            $pen_users = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan) -> update([
                'katalaluan' => $enc_katalaluan,
                'resetkatalaluan' => null
            ]);
            if ($pen_users)   {
                return response()->json([
                    'success'=>true,
                    'message'=>'Show Success!',
                    'data'=>''
                ],200);
            }
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ]);
        }
    }

    public function checkAuth(Request $request) {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $token = explode('0L1v3', $request->input('token'));

        $pen_users = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->where('token', $token[1])->first();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_users
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ]);
        }
    }

    public function show(Request $request)  {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');

        $pen_users = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->first();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'Show Success!',
                'data'=>$pen_users
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ]);
        }
    }

    public function checkLoginAdmin(Request $request)  {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');

        $pen_users = pen_capaian::leftjoin('pen_users', 'pen_users.id_users', 'pen_capaian.FK_users')->
                                    leftjoin('pen_peranan', 'pen_peranan.id_peranan', 'pen_capaian.FK_peranan')->
                                    where('pen_capaian.statusrekod','1')->
                                    where('pen_users.statusrekod','1')->
                                    where('pen_users.no_kad_pengenalan',$no_kad_pengenalan)->
                                    orderBy('pen_peranan.id_peranan','ASC')->
                                    get([
                                        'id_peranan',
                                        'nama_peranan',
                                        'FK_submodul',
                                    ]);

        if (sizeof($pen_users)>0)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ],400);
        }
    }

    public function uploadFile(Request $request){
        $file = $request->file('file');

        $file_type = $file->getClientOriginalExtension();
        $file_name = $file->getClientOriginalName();

        if((strtolower($file_type) == "jpg") || (strtolower($file_type) == "jpeg") || (strtolower($file_type) == "png")){
            $destinationPath = 'uploads_img' ;            
            if($file->move($destinationPath,$file_name)){
                //ok
            }
            else{
                $file_name = "";
            }

        }
        
        if ($file_name != "")  {
            return response()->json([
                'success'=>'true',
                'message'=>'Upload Success!',
                'location'=>'http://'.$_SERVER["HTTP_HOST"].'/api_penilaian/public/uploads_img/'.$file_name
            ],201);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Upload Fail!",
                'data'=>''
            ],401);
        }
    }

    public function testamri(){
        // $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $no_kad_pengenalan = '931125016897';
        $html = '<html class="no-js " lang="en"><body>'
			. ' <table style="border: 1px solid black; width: 100%;">
                    <tr>
                        <th>'.__DIR__.'</th><th>No. Kad Pengenalan</th>
                    </tr>
                    <tr>
                        <td style="background-color: blue;"><span style="background-color: orange;">Amri</span></td><td>931125016897</td>
                    </tr>
                </table>'
			. '</body></html>';
            // dd('amri');
	    return PDF::load($html, 'A4', 'portrait')->show();
    }

    public function showEncId(Request $request)  {
        $id = $request->input('id_sesi_siri_penilaian');

        $obj = pen_sesi_siri_penilaian::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', 'pen_sesi_siri_penilaian.FK_siri_penilaian')->
                                        leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', 'pen_siri_penilaian.FK_penilaian')->
                                        leftjoin('pen_muka_depan', 'pen_muka_depan.FK_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian')->
                                        where(DB::RAW("MD5(id_sesi_siri_penilaian)"),$id)->
                                        first([
                                            'pen_sesi_siri_penilaian.id_sesi_siri_penilaian',
                                            'pen_sesi_siri_penilaian.id_tetapan_masa',
                                            'pen_sesi_siri_penilaian.sesi_penilaian',
                                            'pen_sesi_siri_penilaian.tarikh_mula',
                                            'pen_sesi_siri_penilaian.tarikh_tamat',
                                            'pen_sesi_siri_penilaian.masa_mula',
                                            'pen_sesi_siri_penilaian.masa_tamat',
                                            'pen_sesi_siri_penilaian.duration',
                                            'pen_siri_penilaian.id_siri_penilaian',
                                            'pen_siri_penilaian.kod_siri_penilaian',
                                            'pen_siri_penilaian.tahun',
                                            'pen_siri_penilaian.nosiri',
                                            'pen_siri_penilaian.keterangan',
                                            'pen_siri_penilaian.statusrekod',
                                            'pen_penilaian.id_penilaian',
                                            'pen_penilaian.nama_penilaian',
                                            'pen_penilaian.kod_penilaian',
                                            'pen_penilaian.logo',
                                            'pen_muka_depan.arahan',
                                            'pen_muka_depan.nama AS nama',
                                            'stat_nama',
                                            'pen_muka_depan.no_kad_pengenalan AS no_kad_pengenalan',
                                            'stat_no_kad_pengenalan',
                                            'pen_muka_depan.gred AS gred',
                                            'stat_gred',
                                            'pen_muka_depan.jawatan AS jawatan',
                                            'stat_jawatan',
                                            'pen_muka_depan.no_angka_giliran AS no_angka_giliran',
                                            'stat_no_angka_giliran',
                                            'pen_muka_depan.emel AS emel',
                                            'stat_emel',
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
}
