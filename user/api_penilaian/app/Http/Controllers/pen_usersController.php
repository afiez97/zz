<?php

namespace App\Http\Controllers;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_capaian;
use App\Models\pen_tetapan;

// require '../api_pentadbir/vendor/autoload.php';

class pen_usersController extends Controller
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
        $katalaluan = $request->input('katalaluan');
        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $enc_katalaluan     = hash("sha256", $katalaluan.$salt);
        // dd($enc_katalaluan);
        $nama = $request->input('nama');
        $emel = $request->input('emel');
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $notel = $request->input('notel');
        $nama_jawatan = $request->input('nama_jawatan');
        $emel_kerajaan = $request->input('emel_kerajaan');
        $notel_kerajaan = $request->input('notel_kerajaan');
        $FK_gelaran = $request->input('FK_gelaran');
        $FK_kementerian = $request->input('FK_kementerian');
        $FK_agensi = $request->input('FK_agensi');
        $FK_kluster = $request->input('FK_kluster');
        $users_intan = $request->input('users_intan');
        $FK_jenis_pengguna = $request->input('FK_jenis_pengguna');
        $created_by = $request->input('created_by');


        $obj = pen_users::create([
            'nama' => $nama,
            'emel' => $emel,
            'no_kad_pengenalan' => $no_kad_pengenalan,
            'katalaluan' => $enc_katalaluan,
            'notel' => $notel,
            'nama_jawatan' => $nama_jawatan,
            'emel_kerajaan' => $emel_kerajaan,
            'notel_kerajaan' => $notel_kerajaan,
            'FK_gelaran' => $FK_gelaran,
            'FK_kementerian' => $FK_kementerian,
            'FK_agensi' => $FK_agensi,
            'FK_kluster' => $FK_kluster,
            'users_intan' => $users_intan,
            'FK_jenis_pengguna' => $FK_jenis_pengguna,
            'created_by' => $created_by,
        ]);

        if ($obj)  {
            $tetapan_mail = pen_tetapan::first();
            $emelreceiver = $emel;
            $mail = new PHPMailer();
        // mail('amriamewii@gmail.com', '[TEST MESSAGE]', 'This is the body message', 'From: muhammadamri@protigatech.com');
            // $mail->SMTPAuth = true;
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host       = $tetapan_mail->mail_gateway;
            
            // disable untuk INTAN
//            $mail->SMTPAuth   = true;
//            $mail->Username   = $tetapan_mail->mail_username;
//            $mail->Password   = $tetapan_mail->mail_password;
//            $mail->SMTPSecure = $tetapan_mail->mail_smtp_secure;
            // disable untuk INTAN

            $mail->Port       = $tetapan_mail->mail_port;
            
            $mail->setFrom('penilaian@intanbk.intan.my', 'Sistem Pengurusan Penilaian INTAN (Exam 4 U)');
            $mail->addAddress($emelreceiver);
                
            $mail->isHTML(true);                                  
            $mail->Subject = 'PENGURUSAN PENILAIAN - PENDAFTARAN AKAUN PENGGUNA';
            $mail->Body    = '<b>Pendaftaran Akaun Pengguna</b><br><br>
                                Assalamualaikum dan salam sejahtera<br>
                                '.$nama.'<br><br>
                                Tahniah! Akaun anda berjaya didaftar di bawah kuasa admin sistem. <br>
                                Sila klik pautan dibawah untuk masuk ke dalam sistem:<br><br>
                                No. Kad Pengenalan: '. $no_kad_pengenalan .'<br>
                                Katalaluan: '. $katalaluan .'<br><br>
                                <a href="'.$tetapan_mail->link_sistem.'/admin">Sistem Pengurusan Penilaian INTAN Malaysia</a><br><br>
                                Terima kasih.';
            $mail->AltBody = 'Alternate Message';
            if(!$mail->send()) {
//                dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>'true',
                    'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
                    'data'=>'',
                ],200);
                // exit;
            }
            if(!$mail->send()) {
//                dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>'true',
                    'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
                    'data'=>'',
                ],200);
            } 
            else {
                // dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>'true',
                    'message'=>'Berjaya Mendaftar Akaun! Sila log masuk menggunakan No. Kad Pengenalan & Katalaluan yang didaftarkan.',
                    'data'=>'',
                ],200);
            }
            return response()->json([
                'success'=>'true',
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$obj,
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

    public function checkpassword(Request $request)  {
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $katalaluan = $request->input('katalaluan');

        $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
        $enc_katalaluan     = hash("sha256", $katalaluan.$salt);
        $pen_users_search = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->where('katalaluan',$enc_katalaluan)->first();
        
        if ($pen_users_search)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
                'data'=>''
            ],200);
        } else  {
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
                'success'=>true,
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

    public function showGetId($id)  {

        $pen_users = pen_users::where('id_users',$id)->first();

        if ($pen_users)   {
            return response()->json([
                'success'=>true,
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

    public function showGetIc($no_kad_pengenalan)  {
        $pen_users = pen_users::leftjoin('pen_agensi', 'pen_agensi.id_agensi', '=', 'pen_users.FK_agensi') -> 
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_users.FK_kluster') -> 
                                where('no_kad_pengenalan',$no_kad_pengenalan)->
                                first([
                                    'id_users',
                                    'nama',
                                    'emel',
                                    'no_kad_pengenalan',
                                    'notel',
                                    'gambar',
                                    'FK_jenis_pengguna',
                                    'FK_gelaran',
                                    'FK_agensi',
                                    'emel_kerajaan',
                                    'notel_kerajaan',
                                    'nama_jawatan',
                                    'kategori_perkhidmatan',
                                    'skim',
                                    'taraf_jawatan',
                                    'pen_users.FK_kampus',
                                    'pen_users.FK_kluster',
                                    'FK_kementerian',
                                    'FK_kat_agensi',
                                    'FK_agensi',
                                    'nama_majikan',
                                    'alamat_majikan',
                                    'notel_majikan',
                                    'emel_majikan',
                                    'nama_ketua_jabatan',
                                    'emel_ketua_jabatan',
                                    'notel_ketua_jabatan',
                                    'jawatan_ketua_jabatan',
                                    'nama_kluster',
                                    'kod_agensi',
                                    'nama_agensi',
                                    'users_intan',
                                    'pen_users.updated_at',
                                    'pen_users.statusrekod',
                                ]);
        if ($pen_users)   {
            // $token = $this->getToken($pen_users->id_users);
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
                'data'=>$pen_users,
                // 'token'=>$token
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

    // public function getToken($no_kad_pengenalan)  {
    //     $salt = "RMY7nZ3+s8xpU1n0O*0o_EGfdoYtd|iU_AzhKCMoSu_xhh-e|~y8FOG*-xLZ";
    //     $token     = hash("sha256", Str::random(32).$salt);
    //     $obj = pen_users::where('no_kad_pengenalan',$no_kad_pengenalan)->update([
    //         'token' => $token
    //     ]);

    //     if ($obj)   {
    //         return response()->json([
    //             'success'=>true,
    //             'token'=>$token,
    //             'message'=>'Show Success!',
    //         ],200);
    //     }
    //     else{
    //         return response()->json([
    //             'success'=>false,
    //             'message'=>"Token Invalid!",
    //             'data'=>''
    //         ],400);
    //     }
    // }

    public function list()  {
        $pen_users = pen_users::join('pen_jenispengguna', 'pen_jenispengguna.id_jenispengguna', '=', 'pen_users.FK_jenis_pengguna') -> 
                                join('pen_gelaran', 'pen_gelaran.id_gelaran', '=', 'pen_users.FK_gelaran') -> get();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function listAgensi()  {
        $pen_users = pen_users::select(pen_users::raw('DISTINCT(FK_agensi) AS FK_agensi'), 'id_agensi', 'nama_agensi')->
                                leftjoin('pen_agensi', 'pen_agensi.id_agensi', '=', 'pen_users.FK_agensi')->
                                where('FK_agensi', '!=', '')->
                                get();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function listIntan()  {
        $pen_users = pen_users::where('users_intan','1') ->
                                get();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function showPentadbir($no_kad_pengenalan, $peranan)  {
        $pen_users = pen_users::join('pen_capaian', 'pen_capaian.FK_users', '=', 'pen_users.id_users') -> 
                                join('pen_peranan', 'pen_peranan.id_peranan', '=', 'pen_capaian.FK_peranan') -> 
                                join('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_capaian.FK_kluster') -> 
                                where('pen_users.no_kad_pengenalan',$no_kad_pengenalan) ->
                                where('pen_capaian.FK_peranan',$peranan) ->
                                first();
        
        if ($pen_users)   {
            return response()->json([
                'success'=>true,
                'message'=>'Data Exist',
                'data'=>$pen_users
            ],200);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
        
    }

    public function listIntanGetIc($no_kad_pengenalan)  {
        $pen_users = pen_users::join('pen_jenispengguna', 'pen_jenispengguna.id_jenispengguna', '=', 'pen_users.FK_jenis_pengguna') -> 
                                where('users_intan','1') -> where('pen_users.no_kad_pengenalan',$no_kad_pengenalan) ->
                                first();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function listLuar()  {
        $pen_users = pen_users::join('pen_jenispengguna', 'pen_jenispengguna.id_jenispengguna', '=', 'pen_users.FK_jenis_pengguna') -> 
                                join('pen_gelaran', 'pen_gelaran.id_gelaran', '=', 'pen_users.FK_gelaran') -> 
                                where('users_intan','0') ->
                                get();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function listAll()  {
        $pen_users = pen_users::select('*','pen_users.statusrekod AS statusrekod_users')->
                                join('pen_jenispengguna', 'pen_jenispengguna.id_jenispengguna', '=', 'pen_users.FK_jenis_pengguna') -> 
                                leftjoin('pen_gelaran', 'pen_gelaran.id_gelaran', '=', 'pen_users.FK_gelaran') -> 
                                leftjoin('pen_agensi', 'pen_agensi.id_agensi', '=', 'pen_users.FK_agensi') -> 
                                orderby('pen_users.nama', 'ASC') ->
                                get();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function checkCapaian(Request $request)  {
        $capaian = $request->input('capaian');
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');

        $pen_users = pen_users::join('pen_capaian', 'pen_capaian.FK_users', '=', 'pen_users.id_users') -> 
                                where(pen_capaian::raw("MD5(pen_capaian.FK_peranan)"), $capaian) -> where('pen_users.no_kad_pengenalan', $no_kad_pengenalan) -> 
                                where('pen_capaian.statusrekod', '1') -> 
                                first([
                                    'pen_capaian.id_capaian',
                                    'pen_capaian.FK_peranan',
                                    'pen_users.id_users',
                                    'pen_users.nama',
                                    'pen_users.no_kad_pengenalan',
                                ]);

        if ($pen_users)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
                'data'=>$pen_users
            ],200);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Fail!',
                'data'=>''
            ],404);
        }
        
    }

    public function listPentadbir(Request $request)  {
        $jenis_pentadbir = $request->input('jenis_pentadbir');
        $FK_peranan = $request->input('FK_peranan');
        $existed = $request->input('existed');
        // $FK_agensi = $request->input('FK_agensi');
        if (($existed != null) && ($existed != '')) {
            $test = json_decode($existed);
            // dd($test[0]->no_kad_pengenalan);
            // dd(sizeof($test));
        }

        if ($FK_peranan == '1')    {
            $pen_users = pen_users::select('*','pen_capaian.statusrekod AS statusrekod_capaian','pen_users.statusrekod AS statusrekod_users')->
            leftjoin('pen_gelaran', 'pen_gelaran.id_gelaran', '=', 'pen_users.FK_gelaran') -> 
            join('pen_capaian', 'pen_capaian.FK_users', '=', 'pen_users.id_users') -> 
            join('pen_peranan', 'pen_peranan.id_peranan', '=', 'pen_capaian.FK_peranan') -> 
            leftjoin('pen_agensi', 'pen_agensi.id_agensi', '=', 'pen_users.FK_agensi') -> 
            orderby(pen_users::raw('ISNULL(pen_peranan.id_peranan)', 'ASC')) -> orderby('pen_peranan.id_peranan', 'ASC') ->
            where(function($q) use($test){
                foreach($test as $tests){
                    $q->where('pen_users.no_kad_pengenalan', '!=', $tests->no_kad_pengenalan);
                }
            })->
            where('pen_capaian.FK_peranan', $jenis_pentadbir) -> 
            get();
        } else  {
            
            $pen_users = pen_users::select('*','pen_capaian.statusrekod AS statusrekod_capaian','pen_users.statusrekod AS statusrekod_users')->
            leftjoin('pen_gelaran', 'pen_gelaran.id_gelaran', '=', 'pen_users.FK_gelaran') -> 
            join('pen_capaian', 'pen_capaian.FK_users', '=', 'pen_users.id_users') -> 
            join('pen_peranan', 'pen_peranan.id_peranan', '=', 'pen_capaian.FK_peranan') -> 
            leftjoin('pen_agensi', 'pen_agensi.id_agensi', '=', 'pen_users.FK_agensi') -> 
            orderby(pen_users::raw('ISNULL(pen_peranan.id_peranan)', 'ASC')) -> orderby('pen_peranan.id_peranan', 'ASC') ->
            where(function($q) use($test){
                foreach($test as $tests){
                    $q->where('pen_users.no_kad_pengenalan', '!=', $tests->no_kad_pengenalan);
                }
            })->
            where('pen_capaian.FK_peranan', $jenis_pentadbir) -> 
            get();

        }

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function listKerajaan()  {
        $pen_users = pen_users::join('pen_jenispengguna', 'pen_jenispengguna.id_jenispengguna', '=', 'pen_users.FK_jenis_pengguna') -> 
                                join('pen_gelaran', 'pen_gelaran.id_gelaran', '=', 'pen_users.FK_gelaran') -> 
                                where('FK_jenis_pengguna','1') ->
                                get();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function listKerajaanSingle($FK_users)  {
        $pen_users = pen_users::leftjoin('pen_agensi', 'pen_agensi.id_agensi', '=', 'pen_users.FK_agensi') -> 
                                leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_users.FK_kluster') -> 
                                leftjoin('pen_subkluster', 'pen_subkluster.id_subkluster', '=', 'pen_users.FK_subkluster') -> 
                                leftjoin('pen_unit', 'pen_unit.id_unit', '=', 'pen_users.FK_unit') -> 
                                leftjoin('pen_kementerian', 'pen_kementerian.id_kementerian', '=', 'pen_users.FK_kementerian') -> 
                                leftjoin('pen_agensi', 'pen_agensi.id_agensi', '=', 'pen_users.FK_agensi') -> 
                                leftjoin('pen_bahagian', 'pen_bahagian.id_bahagian', '=', 'pen_users.FK_bahagian') -> 
                                leftjoin('pen_ilawam', 'pen_ilawam.id_ilawam', '=', 'pen_users.FK_ila') -> 
                                where('FK_jenis_pengguna','1') -> where('pen_users.id_users',$FK_users) ->
                                first();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function listUsersEditProfile($no_kad_pengenalan)  {
        $pen_users = pen_users::leftjoin('pen_kementerian', 'pen_kementerian.id_kementerian', '=', 'pen_users.FK_kementerian') -> 
                                leftjoin('pen_agensi', 'pen_agensi.id_agensi', '=', 'pen_users.FK_agensi') -> 
                                where('pen_users.no_kad_pengenalan',$no_kad_pengenalan) ->
                                first();

        if ($pen_users)   {
            return response()->json([
                'success'=>true,
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        } else  {
            return response()->json([
                'success'=>false,
                'message'=>'List Failed!',
                'data'=>''
            ],404);
        }
        
    }

    public function listSwasta()  {
        $pen_users = pen_users::join('pen_jenispengguna', 'pen_jenispengguna.id_jenispengguna', '=', 'pen_users.FK_jenis_pengguna') -> 
                                join('pen_gelaran', 'pen_gelaran.id_gelaran', '=', 'pen_users.FK_gelaran') -> 
                                where('FK_jenis_pengguna','2') ->
                                get();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function listPelajar()  {
        $pen_users = pen_users::join('pen_jenispengguna', 'pen_jenispengguna.id_jenispengguna', '=', 'pen_users.FK_jenis_pengguna') -> 
                                join('pen_gelaran', 'pen_gelaran.id_gelaran', '=', 'pen_users.FK_gelaran') -> 
                                where('FK_jenis_pengguna','3') ->
                                get();

        if ($pen_users)   {
            return response()->json([
                'success'=>'true',
                'message'=>'List Success!',
                'data'=>$pen_users
            ],200);
        }
        
    }

    public function update(Request $request)    {
        $id = $request->input('id_users');
        $nama = $request->input('nama');
        $emel = $request->input('emel');
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $notel = $request->input('notel');
        $FK_jenis_pengguna = $request->input('FK_jenis_pengguna');
        $FK_gelaran = $request->input('FK_gelaran');
        $updated_by = $request->input('updated_by');

        $pen_users = pen_users::find($id); 

        $pen_users -> update([
            'nama' => $nama,
            'emel' => $emel,
            'no_kad_pengenalan' => $no_kad_pengenalan,
            'notel' => $notel,
            'FK_jenis_pengguna' => $FK_jenis_pengguna,
            'FK_gelaran' => $FK_gelaran,
            'updated_by' => $updated_by
        ]);

        if ($pen_users)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_users
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

    public function updateKerajaan(Request $request)    {
        $id = $request->input('id_users');
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $skim = $request->input('skim');
        $taraf_jawatan = $request->input('taraf_jawatan');
        $FK_jenis_pengguna = $request->input('FK_jenis_pengguna');
        $notel_kerajaan = $request->input('notel_kerajaan');
        $notel = $request->input('notel');
        $FK_kementerian = $request->input('FK_kementerian');
        $FK_agensi = $request->input('FK_agensi');
        $alamat_majikan = $request->input('alamat_majikan');
        $nama_ketua_jabatan = $request->input('nama_ketua_jabatan');
        $emel_ketua_jabatan = $request->input('emel_ketua_jabatan');
        $notel_ketua_jabatan = $request->input('notel_ketua_jabatan');
        $jawatan_ketua_jabatan = $request->input('jawatan_ketua_jabatan');
        $updated_by = $request->input('updated_by');

        $pen_users = pen_users::find($id); 

        $pen_users -> update([
            'no_kad_pengenalan' => $no_kad_pengenalan,
            'skim' => $skim,
            'taraf_jawatan' => $taraf_jawatan,
            'FK_jenis_pengguna' => $FK_jenis_pengguna,
            'notel' => $notel,
            'notel_kerajaan' => $notel_kerajaan,
            'emel_majikan' => $notel,
            'FK_kementerian' => $FK_kementerian,
            'FK_agensi' => $FK_agensi,
            'alamat_majikan' => $alamat_majikan,
            'nama_ketua_jabatan' => $nama_ketua_jabatan,
            'emel_ketua_jabatan' => $emel_ketua_jabatan,
            'notel_ketua_jabatan' => $notel_ketua_jabatan,
            'jawatan_ketua_jabatan' => $jawatan_ketua_jabatan,
            'updated_by' => $updated_by
        ]);

        if ($pen_users)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_users,
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

    public function updateSwasta(Request $request)    {
        $id = $request->input('id_users');
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');
        $nama_jawatan = $request->input('nama_jawatan');
        $notel = $request->input('notel');
        $alamat_majikan = $request->input('alamat_majikan');
        $nama_majikan = $request->input('nama_majikan');
        $emel_majikan = $request->input('emel_majikan');
        $notel_majikan = $request->input('notel_majikan');
        $updated_by = $request->input('updated_by');

        $pen_users = pen_users::find($id); 

        $pen_users -> update([
            'no_kad_pengenalan' => $no_kad_pengenalan,
            'nama_jawatan' => $nama_jawatan,
            'notel' => $notel,
            'alamat_majikan' => $alamat_majikan,
            'nama_majikan' => $nama_majikan,
            'emel_majikan' => $emel_majikan,
            'notel_majikan' => $notel_majikan,
            'updated_by' => $updated_by
        ]);

        if ($pen_users)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $pen_users,
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

    public function editprofile(Request $request)    {
        $id = $request->input('id_users');
        $emel = $request->input('emel');
        $notel = $request->input('notel');
        $emel_kerajaan = $request->input('emel_kerajaan');
        $notel_kerajaan = $request->input('notel_kerajaan');
        // $nama_jawatan = $request->input('nama_jawatan');
        // $FK_kementerian = $request->input('FK_kementerian');
        // $FK_agensi = $request->input('FK_agensi');
        $updated_by = $request->input('updated_by');

        $pen_users = pen_users::where('id_users', $id) -> update([
            'emel' => $emel,
            'notel' => $notel,
            'emel_kerajaan' => $emel_kerajaan,
            'notel_kerajaan' => $notel_kerajaan,
            // 'nama_jawatan' => $nama_jawatan,
            // 'FK_kementerian' => $FK_kementerian,
            // 'FK_agensi' => $FK_agensi,
            'updated_by' => $updated_by
        ]);

        if ($pen_users)  {
            if($request->file('gambar') != null){

                $obj_img = pen_users::where('id_users',$id)->first(['gambar']);

                if($obj_img->gambar != null || $obj_img->gambar != ''){

                    unlink("gambar/".$obj_img->gambar);

                }
                $fileName = $request->file('gambar')->getClientOriginalName();
                $fileName = $id . '_' . $fileName;


                $path = 'gambar';
                $destinationPath = $path; // upload path

                $request->file('gambar')->move($destinationPath, $fileName);
                // DD($destinationPath);

                $obj_upt = pen_users::where('id_users',$id) -> update([
                    'gambar' => $fileName
                ]);

                if($obj_upt)  {
                    // $token = $this->getToken($updated_by);
                    return response()->json([
                        'success'=>true,
                        'message'=>'Kemaskini Rekod Berjaya!',
                        'data'=>$pen_users,
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
            // $token = $this->getToken($updated_by);
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => '',
            ],200);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>"Kemaskini Gagal!",
                'data'=>''
            ],200);
        }
    }

    public function delete(Request $request)    {
        $id = $request->input('id_users');

        $pen_users_search = pen_users::where('id_users',$id)->first(); 
        switch($pen_users_search->statusrekod)    {
            case 0: $pen_users = pen_users::where('id_users',$id) -> update([
                        'statusrekod' => '1',
                    ]);
                    break;
            case 1: $pen_users = pen_users::where('id_users',$id) -> update([
                        'statusrekod' => '0',
                    ]);
                    break;
        }
        $pen_users_search = pen_users::where('id_users',$id)->first(); 
        
        if ($pen_users)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $pen_users_search
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

    function sendmail($to, $nameto, $subject, $message, $altmess) {
        echo $subject;
        $from = 'muhammadamri@protigatech.com';
        $namefrom = 'Amri';
        $mail = new PHPMailer();
        $mail->SMTPDebug = 0;
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = "mail.protigatech.com";
        $mail->Port = 465;
        $mail->Username = $from;
        $mail->Password = 'Amewii-0123';
        $mail->SMTPSecure = "ssl";
        $mail->setFrom($from, $namefrom);
        $mail->addCC($from, $namefrom);
        $mail->Subject = $subject;
        $mail->isHTML();
        $mail->Body = $message;
        $mail->AltBody = $altmess;
        $mail->addAddress($to, $nameto);
        return $mail->send();
    }
    
}
