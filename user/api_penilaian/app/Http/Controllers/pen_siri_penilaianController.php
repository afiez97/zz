<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_users;
use App\Models\pen_penilaian;
use App\Models\pen_siri_penilaian;
use App\Models\pen_tetapan;

class pen_siri_penilaianController extends Controller
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
        $FK_penilaian = $request->input('FK_penilaian');
        $kod_siri_penilaian = $request->input('kod_siri_penilaian');
        $kod = $request->input('kod');
        $FK_kategori_penilaian = $request->input('FK_kategori_penilaian');
        $FK_kluster = $request->input('FK_kluster');
        $tahun = $request->input('tahun');
        $keterangan = $request->input('keterangan');
        $jenis_penilaian = $request->input('jenis_penilaian');
        $created_by = $request->input('created_by');
        $updated_by = $request->input('updated_by');

        $nosiri = "00001";
        $obj = pen_siri_penilaian::where('tahun',$tahun)->orderBy('nosiri',"DESC")->first(['nosiri']);

        if($obj){
            $num = (int) $obj['nosiri']+1;
            if(strlen($num) == 1){
                $nosiri = "0000".$num;
            }
            elseif(strlen($num) == 2){
                $nosiri = "000".$num;
            }
            elseif(strlen($num) == 3){
                $nosiri = "00".$num;
            }
            elseif(strlen($num) == 4){
                $nosiri = "0".$num;
            }
            else{
                $nosiri = $num;
            }
        }
        if ($FK_kategori_penilaian == 1){
            $kod_siri_penilaian = "K".$FK_kluster.$tahun.$nosiri;
        } else if ($FK_kategori_penilaian == 2){
            $kod_siri_penilaian = "P".$FK_kluster.$tahun.$nosiri;
        } else if ($FK_kategori_penilaian == 3){
            $kod_siri_penilaian = "I".$FK_kluster.$tahun.$nosiri;
        } else if ($FK_kategori_penilaian == 4){
            $kod_siri_penilaian = "E".$FK_kluster.$tahun.$nosiri;
        }

        $obj = pen_siri_penilaian::create([
            'FK_penilaian' => $FK_penilaian,
            'kod_siri_penilaian' => $kod_siri_penilaian,
            'kod' => $kod,
            'tahun' => $tahun,
            'nosiri' => $nosiri,
            'keterangan' => $keterangan,
            'jenis_penilaian' => $jenis_penilaian,
            'created_by' => $created_by,
            'updated_by' => $updated_by
        ]);
        $id = $obj -> id;
        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>'Pendaftaran Rekod Berjaya!',
                'data'=>$id
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
        $id = $request->input('id_siri_penilaian');

        $obj = pen_siri_penilaian::leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                    leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                    leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                    leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
                                    leftjoin('pen_jenis_penilaian', 'pen_jenis_penilaian.id_jenis_penilaian', '=', 'pen_siri_penilaian.jenis_penilaian')->
                                    where('id_siri_penilaian',$id)->
                                    first([
                                        'id_siri_penilaian',
                                        'kod_siri_penilaian',
                                        'tahun',
                                        'kod',
                                        'nosiri',
                                        'keterangan',
                                        'logo',
                                        'gred',
                                        'template_emel',
                                        'tamat_penilaian',
                                        // 'jenis',
                                        'jenis_penilaian',
                                        'nama_jenis_penilaian',
                                        'keterbukaan',
                                        'tarikh_mula_mohon',
                                        'tarikh_tamat_mohon',
                                        // 'tarikh_penilaian',
                                        // 'waktu_mula',
                                        // 'waktu_tamat',
                                        'FK_urusetia',
                                        // 'bil_max_calon',
                                        'pen_siri_penilaian.statusrekod',
                                        'id_penilaian',
                                        'nama_penilaian',
                                        'kod_penilaian',
                                        'id_kluster',
                                        'nama_kluster',
                                        'id_kategori_penilaian',
                                        'nama_kategori_penilaian',
                                        'id_users',
                                        'nama',
                                        'notel',
                                        'notel_kerajaan',
                                        'emel',
                                        'emel_kerajaan',
                                    ]);
                                    // DD($obj);

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
        $obj = pen_siri_penilaian::leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                    leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                    leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                    leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
                                    where('pen_siri_penilaian.statusrekod','1') -> 
                                    get([
                                        'id_siri_penilaian',
                                        'kod_siri_penilaian',
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

    // public function listByTarikhMohonOpen()  {
    //     $obj = pen_siri_penilaian::leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
    //                                 leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
    //                                 leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
    //                                 leftjoin('pen_jenis_penilaian', 'pen_jenis_penilaian.id_jenis_penilaian', '=', 'pen_siri_penilaian.jenis_penilaian')->
    //                                 leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
    //                                 where('pen_siri_penilaian.statusrekod','1') -> 
    //                                 where('pen_siri_penilaian.tarikh_mula_mohon','<=',DB::RAW("DATE(NOW())")) -> 
    //                                 where('pen_siri_penilaian.tarikh_tamat_mohon','>=',DB::RAW("DATE(NOW())")) -> 
    //                                 get([
    //                                     'id_siri_penilaian',
    //                                     'kod_siri_penilaian',
    //                                     'tarikh_mula_mohon',
    //                                     'tarikh_tamat_mohon',
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
    //                                     'id_jenis_penilaian',
    //                                     'nama_jenis_penilaian',
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

    public function listByPenilaian(Request $request)  {
        $FK_penilaian = $request->input('FK_penilaian');
        $obj = pen_siri_penilaian::leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                    leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                    leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                    leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
                                    leftjoin('pen_jenis_penilaian', 'pen_jenis_penilaian.id_jenis_penilaian', '=', 'pen_siri_penilaian.jenis_penilaian')->
                                    where('pen_siri_penilaian.FK_penilaian',$FK_penilaian)->
                                    get([
                                        'id_siri_penilaian',
                                        'kod_siri_penilaian',
                                        'kod',
                                        'keterangan',
                                        'jenis_penilaian',
                                        'nama_jenis_penilaian',
                                        // 'waktu_mula',
                                        // 'waktu_tamat',
                                        'tahun',
                                        'nosiri',
                                        'pen_siri_penilaian.statusrekod',
                                        'id_penilaian',
                                        'nama_penilaian',
                                        'id_kluster',
                                        'nama_kluster',
                                        'id_kategori_penilaian',
                                        'nama_kategori_penilaian',
                                        'id_users',
                                        'nama',
                                        'notel',
                                        'notel_kerajaan',
                                        'emel',
                                        'emel_kerajaan',
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

    public function listByUrusetiaSiriPenilaian(Request $request)  {
        $FK_users = $request->input('FK_users');
        $obj = pen_siri_penilaian::leftjoin('pen_urusetia', 'pen_urusetia.FK_siri_penilaian', '=', 'pen_siri_penilaian.id_siri_penilaian')->
                                    leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                    leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                    where('pen_urusetia.FK_users',$FK_users)->
                                    groupby('id_penilaian') ->
                                    groupby('nama_penilaian') ->
                                    groupby('kod_penilaian') ->
                                    groupby('id_kategori_penilaian') ->
                                    groupby('nama_kategori_penilaian') ->
                                    get([
                                        pen_penilaian::raw("DISTINCT(id_penilaian) AS id_penilaian"),
                                        'nama_penilaian',
                                        'kod_penilaian',
                                        'id_kategori_penilaian',
                                        'nama_kategori_penilaian',
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
        $obj = pen_siri_penilaian::leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', '=', 'pen_siri_penilaian.FK_penilaian')->
                                    leftjoin('pen_kluster', 'pen_kluster.id_kluster', '=', 'pen_penilaian.FK_kluster')->
                                    leftjoin('pen_kategori_penilaian', 'pen_kategori_penilaian.id_kategori_penilaian', '=', 'pen_penilaian.FK_kategori_penilaian')->
                                    leftjoin('pen_users', 'pen_users.id_users', '=', 'pen_penilaian.FK_penyelaras')->
                                    get([
                                        'id_siri_penilaian',
                                        'kod_siri_penilaian',
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

    public function update(Request $request)    {
        $id = $request->input('id_siri_penilaian');
        $FK_penilaian = $request->input('FK_penilaian');
        $nosiri = $request->input('nosiri');
        $tahun = $request->input('tahun');
        $keterangan = $request->input('keterangan');
        $jenis_penilaian = $request->input('jenis_penilaian');
        $updated_by = $request->input('updated_by');

        $obj = pen_siri_penilaian::where('id_siri_penilaian',$id)  -> update([
            'FK_penilaian' => $FK_penilaian,
            'nosiri' => $nosiri,
            'tahun' => $tahun,
            'keterangan' => $keterangan,
            'jenis_penilaian' => $jenis_penilaian,
            'updated_by' => $updated_by
        ]);

        if($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
                'data'=>$obj,
            ],201);
        }else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function updateKeterbukaan(Request $request)    {
        $id = $request->input('id_siri_penilaian');
        $keterbukaan = $request->input('keterbukaan');
        $tarikh_mula_mohon = $request->input('tarikh_mula_mohon');
        $tarikh_tamat_mohon = $request->input('tarikh_tamat_mohon');
        $updated_by = $request->input('updated_by');
        $count = 0;
        $obj = pen_siri_penilaian::where('id_siri_penilaian',$id)  -> update([
            'keterbukaan' => $keterbukaan,
            'updated_by' => $updated_by
        ]);
        $count = 1;

        if(($tarikh_mula_mohon != "undefined" && $tarikh_mula_mohon != null) && ($tarikh_tamat_mohon != "undefined" && $tarikh_tamat_mohon != null)){ 
            
            $obj = pen_siri_penilaian::where('id_siri_penilaian',$id) -> update([
                'tarikh_mula_mohon' => $tarikh_mula_mohon,
                'tarikh_tamat_mohon' => $tarikh_tamat_mohon
            ]);
        // dd($tarikh_mula_mohon.' ~ '.$tarikh_tamat_mohon);
            $count = 2;
        }
        
        if($count > 0)  {
            $token = $this->getToken($updated_by);

            // dd($token);
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
                'data'=>$obj,
                'token'=>$token
            ],201);
        }else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],400);
        }
    }

    public function updateGred(Request $request)    {
        $id = $request->input('id_siri_penilaian');
        $gred = $request->input('gred');
        $tamat_penilaian = $request->input('tamat_penilaian');
        $updated_by = $request->input('updated_by');

        $obj = pen_siri_penilaian::where('id_siri_penilaian',$id)  -> update([
            'gred' => $gred,
            'tamat_penilaian' => $tamat_penilaian,
            'updated_by' => $updated_by
        ]);

        if($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
                'data'=>$obj,
            ],201);
        }else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function updateTemplateEmel(Request $request)    {
        $id = $request->input('id_siri_penilaian');
        $template_emel = $request->input('template_emel');
        $updated_by = $request->input('updated_by');

        $obj = pen_siri_penilaian::where('id_siri_penilaian',$id)  -> update([
            'template_emel' => $template_emel,
            'updated_by' => $updated_by
        ]);

        if($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Rekod Berjaya!',
                'data'=>$obj,
            ],201);
        }else    {
            return response()->json([
                'success'=>false,
                'message'=>'Bad Request',
                'data'=>''
            ],404);
        }
    }

    public function updateUrusetia(Request $request)    {
        $id = $request->input('id_siri_penilaian');
        $FK_urusetia = $request->input('FK_urusetia');
        $updated_by = $request->input('updated_by');
        $json_FK_urusetia = json_decode($FK_urusetia);

        $compareurusetia = pen_siri_penilaian::leftjoin('pen_penilaian','pen_penilaian.id_penilaian', 'pen_siri_penilaian.FK_penilaian')->
                                                where('id_siri_penilaian', $id) -> first();

        if($compareurusetia){
            $i = 0;
            $u = 0;
            if(json_decode($compareurusetia->FK_urusetia)){
                $json_compare = json_decode($compareurusetia->FK_urusetia);
                for($i=0;$i<count($json_compare);$i++){
                    for($u=0;$u<count($json_FK_urusetia);$u++){
                        if($json_compare[$i]->no_kad_pengenalan == $json_FK_urusetia[$u]->no_kad_pengenalan){
                            $u = count($json_FK_urusetia)+1;
                        }
                    }
                //     if($u == count($json_FK_urusetia)){
                //         $objUsers = pen_users::where('no_kad_pengenalan', $json_compare[$i]->no_kad_pengenalan)->first();
                //         if($objUsers){
                //             $tetapan_mail = pen_tetapan::first();
                //             $emelreceiver = $objUsers->emel;
                //             $mail = new PHPMailer();
                //         // mail('amriamewii@gmail.com', '[TEST MESSAGE]', 'This is the body message', 'From: muhammadamri@protigatech.com');
                //             // $mail->SMTPAuth = true;
                //             $mail->SMTPDebug = 0;
                //             $mail->isSMTP();
                //             $mail->Host       = $tetapan_mail->mail_gateway;
                            
                //             // disable untuk INTAN
                // //            $mail->SMTPAuth   = true;
                // //            $mail->Username   = $tetapan_mail->mail_username;
                // //            $mail->Password   = $tetapan_mail->mail_password;
                // //            $mail->SMTPSecure = $tetapan_mail->mail_smtp_secure;
                //             // disable untuk INTAN
                
                //             $mail->Port       = $tetapan_mail->mail_port;
                            
                //             $mail->setFrom('penilaian@intanbk.intan.my', 'Sistem Pengurusan Penilaian INTAN (Exam 4 U)');
                //             $mail->addAddress($emelreceiver);
                //             $mail->addAddress($objUsers->emel_kerajaan);
                                
                //             $mail->isHTML(true);                                  
                //             $mail->Subject = 'PENGURUSAN PENILAIAN - PENGGUGURAN CAPAIAN URUSETIA BAGI PENILAIAN ' . $compareurusetia->nama_penilaian . ' SIRI ' . $compareurusetia->kod_siri_penilaian;
                //             $mail->Body    = '<b>Pengguruan Capaian</b><br><br>
                //                                 Assalamualaikum dan salam sejahtera<br>
                //                                 '.$objUsers->nama.'<br><br>
                //                                 Perkara di atas adalah dirujuk. <br><br>
                //                                 Dukacita ingin memaklumkan bahawa anda bukan lagi Urusetia bagi penilaian ini. Sekian, Terima kasih.<br><br>
                //                                 <a href="'.$tetapan_mail->link_sistem.'/admin">Admin Sistem Pengurusan Penilaian INTAN Malaysia</a><br><br>
                //                                 Terima kasih.';
                //             $mail->AltBody = 'Alternate Message';
                //             if(!$mail->send()) {
                // //                dd("Mailer Error: " . $mail->ErrorInfo);
                //                 return response()->json([
                //                     'success'=>'true',
                //                     'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
                //                     'data'=>''
                //                 ],200);
                //             }
                //         }
                //     }
                }
            }
            // dd(count($json_compare));
        }

        $compareurusetia = pen_siri_penilaian::leftjoin('pen_penilaian','pen_penilaian.id_penilaian', 'pen_siri_penilaian.FK_penilaian')->
                                                where('id_siri_penilaian', $id) -> first();

        $i = 0;
        $u = 0;
        for($u=0;$u<count($json_FK_urusetia);$u++){
            if(json_decode($compareurusetia->FK_urusetia)){
                $json_compare = json_decode($compareurusetia->FK_urusetia);
                for($i=0;$i<count($json_compare);$i++){
                    if($json_FK_urusetia[$u]->no_kad_pengenalan == $json_compare[$i]->no_kad_pengenalan){
                        $i = count($json_compare)+1;
                    }
                //     if($i == (count($json_compare) - 1)){
                //         $objUsers = pen_users::where('no_kad_pengenalan', $json_FK_urusetia[$u]->no_kad_pengenalan)->first();
                //         if($objUsers){
                //             $capaianurusetia = "";
                //             if($json_FK_urusetia[$u]->urusetia == "1"){
                //                 $capaianurusetia .= '<br><br><span class="badge bg-success">- Urusetia</span> ';
                //             }
                //             if($json_FK_urusetia[$u]->jk_penggubal == "1"){
                //                 $capaianurusetia .= '<br><br><span class="badge bg-success">- Jawatankuasa Penggubal Soalan</span> ';
                //             }
                //             if($json_FK_urusetia[$u]->jk_penilai == "1"){
                //                 $capaianurusetia .= '<br><br><span class="badge bg-success">- Jawatankuasa Penilai</span> ';
                //             }
                //             if($json_FK_urusetia[$u]->panel_penilai == "1"){
                //                 $capaianurusetia .= '<br><br><span class="badge bg-success">- Panel Penilai</span> ';
                //             }
                //             $tetapan_mail = pen_tetapan::first();
                //             $emelreceiver = $objUsers->emel;
                //             $mail = new PHPMailer();
                //             // mail('amriamewii@gmail.com', '[TEST MESSAGE]', 'This is the body message', 'From: muhammadamri@protigatech.com');
                //             // $mail->SMTPAuth = true;
                //             $mail->SMTPDebug = 0;
                //             $mail->isSMTP();
                //             $mail->Host       = $tetapan_mail->mail_gateway;
                            
                //             // disable untuk INTAN
                //         //    $mail->SMTPAuth   = true;
                //         //    $mail->Username   = $tetapan_mail->mail_username;
                //         //    $mail->Password   = $tetapan_mail->mail_password;
                //         //    $mail->SMTPSecure = $tetapan_mail->mail_smtp_secure;
                //             // disable untuk INTAN
                
                //             $mail->Port       = $tetapan_mail->mail_port;
                            
                //             $mail->setFrom('penilaian@intanbk.intan.my', 'Sistem Pengurusan Penilaian INTAN (Exam 4 U)');
                //             $mail->addAddress($emelreceiver);
                //             $mail->addAddress($objUsers->emel_kerajaan);
                                
                //             $mail->isHTML(true);                                  
                //             $mail->Subject = 'PENGURUSAN PENILAIAN - PELANTIKAN CAPAIAN URUSETIA BAGI PENILAIAN ' . $compareurusetia->nama_penilaian . ' SIRI ' . $compareurusetia->kod_siri_penilaian;
                //             $mail->Body    = '<b>Pelantikan Capaian</b><br><br>
                //                                 Assalamualaikum dan salam sejahtera<br>
                //                                 '.$objUsers->nama.'<br><br>
                //                                 Perkara di atas adalah dirujuk. <br><br>
                //                                 Sukacita ingin memaklumkan bahawa anda telah dilantik sebagai Urusetia bagi penilaian ini. Butiran penilaian adalah seperti di bawah:<br><br>
                //                                 Nama Penilaian: '.$compareurusetia->nama_penilaian.'<br>
                //                                 Kod Siri Penilaian: '.$compareurusetia->kod_siri_penilaian.'<br>
                //                                 Capaian: '.$capaianurusetia.'<br><br>
                //                                 Sekian, Terima kasih.<br><br>
                //                                 <a href="'.$tetapan_mail->link_sistem.'/admin">Admin Sistem Pengurusan Penilaian INTAN Malaysia</a><br><br>
                //                                 Terima kasih.';
                //             $mail->AltBody = 'Alternate Message';
                //             // dd($mail->Body);
                //             if(!$mail->send()) {
                // //                dd("Mailer Error: " . $mail->ErrorInfo);
                //                 return response()->json([
                //                     'success'=>'true',
                //                     'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
                //                     'data'=>''
                //                 ],200);
                //             }
                //             else {
                //                 return response()->json([
                //                     'success'=>'true',
                //                     'message'=>'Pendaftaran Rekod Berjaya!',
                //                     'data'=>$objUsers,
                //                 ],201);                                
                //             }
                //             // return response()->json([
                //             //     'success'=>'true',
                //             //     'message'=>'Pendaftaran Rekod Berjaya!',
                //             //     'data'=>$objUsers,
                //             // ],201);
                //         }
                //     }
                }
            }
        }

        // dd(json_decode($request->input('FK_urusetia')));

        // $pen_siri_penilaian = pen_siri_penilaian::find($id); 
        
        $obj = pen_siri_penilaian::where('id_siri_penilaian',$id)  -> update([
            'FK_urusetia' => $FK_urusetia,
            'updated_by' => $updated_by
        ]);

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Kemaskini Berjaya!",
                'data' => $obj,
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
        $id = $request->input('id_siri_penilaian');

        // $pen_siri_penilaian = pen_siri_penilaian::find($id); 

        $obj = pen_siri_penilaian::where('id_siri_penilaian',$id) -> update([
            'statusrekod' => '0',
        ]);

        if ($obj)  {
            return response()->json([
                'success'=>true,
                'message'=>"Berjaya Padam!",
                'data' => $obj
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
