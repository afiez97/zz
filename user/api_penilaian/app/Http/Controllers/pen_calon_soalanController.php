<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\pen_calon_soalan;
use App\Models\pen_sesi_siri_penilaian;
use App\Models\pen_siri_penilaian;
use App\Models\pen_users;
use App\Models\pen_tetapan;

class pen_calon_soalanController extends Controller
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

    public function create(Request $request){
        
        $no_kad_pengenalan  = $request->input('no_kad_pengenalan');
        $nama  = $request->input('nama');
        $gred  = $request->input('gred');
        if($request->input('gred') == 'undefined'){
            $gred  = '';
        }
        $jawatan  = $request->input('jawatan');
        if($request->input('jawatan') == 'undefined'){
            $jawatan  = '';
        }
        $emel  = $request->input('emel');
        if($request->input('emel') == 'undefined'){
            $emel  = '';
        }
        $no_angka_giliran  = $request->input('no_angka_giliran');
        $notel  = $request->input('notel');
        if($request->input('notel') == 'undefined'){
            $notel  = '';
        }
        
        $FK_siri_penilaian  = $request->input('FK_siri_penilaian');
        $FK_sesi  = $request->input('FK_sesi');
        $created_by  = $request->input('created_by');
        $obj_search = pen_calon_soalan::where('no_kad_pengenalan', $no_kad_pengenalan) -> where('FK_siri_penilaian', $FK_siri_penilaian) -> first();

        if ($obj_search){

            return response()->json([
                'success'=>false,
                'message'=>'Permohonan Gagal!',
                'data'=>''
            ],401);
        } else{
            $data = [
                'no_kad_pengenalan' => $no_kad_pengenalan,
                'nama' => $nama,
                'gred' => $gred,
                'jawatan' => $jawatan,
                'emel' => $emel,
                'no_angka_giliran' => $no_angka_giliran,
                'FK_siri_penilaian' => $FK_siri_penilaian,
                'notel' => $notel,
                'FK_sesi' => $FK_sesi,
                'created_by' => $created_by,
                'updated_by' => $created_by,
            ];
            // dd($data);
    
            $obj = pen_calon_soalan::create($data);
            // dd($obj);

            $id = $obj->id_calon_soalan;

            if ($obj)   {
                return response()->json([
                    'success'=>true,
                    'message'=>'Permohonan Berjaya!',
                    'data'=>$obj,
                ],201);
            } else {
                return response()->json([
                    'success'=>false,
                    'message'=>'Permohonan Gagal!',
                    'data'=>''
                ],401);
            }
        }
    }

    public function blastEmail(Request $request){
        $FK_siri_penilaian      = $request->input('FK_siri_penilaian');
        $obj = pen_calon_soalan::leftjoin('pen_siri_penilaian','pen_siri_penilaian.id_siri_penilaian','pen_calon_soalan.FK_siri_penilaian')->
                                leftjoin('pen_penilaian','pen_penilaian.id_penilaian','pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_sesi_siri_penilaian','pen_sesi_siri_penilaian.id_sesi_siri_penilaian','pen_calon_soalan.FK_sesi')->
                                where('pen_calon_soalan.FK_siri_penilaian',$FK_siri_penilaian)->
                                get([
                                    'pen_calon_soalan.id_calon_soalan',
                                    'pen_calon_soalan.nama',
                                    'pen_calon_soalan.no_kad_pengenalan',
                                    'pen_calon_soalan.gred',
                                    'pen_calon_soalan.jawatan',
                                    'pen_calon_soalan.emel',
                                    'pen_calon_soalan.no_angka_giliran',
                                    'pen_calon_soalan.notel',
                                    'pen_calon_soalan.FK_siri_penilaian',
                                    'pen_calon_soalan.json_list',
                                    'pen_siri_penilaian.kod_siri_penilaian',
                                    'pen_siri_penilaian.kod',
                                    'pen_siri_penilaian.tahun',
                                    'pen_siri_penilaian.nosiri',
                                    'pen_siri_penilaian.template_emel',
                                    'pen_penilaian.nama_penilaian',
                                    'pen_sesi_siri_penilaian.id_tetapan_masa',
                                    'pen_sesi_siri_penilaian.tarikh_mula',
                                    'pen_sesi_siri_penilaian.masa_mula',
                                    'pen_sesi_siri_penilaian.masa_tamat',
                                    'pen_sesi_siri_penilaian.pautan_status',
                                    'pen_sesi_siri_penilaian.pautan_skype',
                                    'pen_sesi_siri_penilaian.pautan_zoom',
                                    'pen_sesi_siri_penilaian.pautan_google',
                                    'pen_sesi_siri_penilaian.pautan_team',
                                    DB::RAW('MD5(pen_siri_penilaian.id_siri_penilaian) AS enc_id_siri_penilaian'),
                                    DB::RAW('MD5(pen_sesi_siri_penilaian.id_sesi_siri_penilaian) AS enc_id_sesi_siri_penilaian'),
                                ]);
        if(sizeof($obj)>0){
            $count = 0;
            for($i = 0; $i < sizeof($obj); $i++){
                $objJSONlist = pen_sesi_siri_penilaian::leftjoin('pen_calon_soalan','FK_sesi','id_sesi_siri_penilaian')->
                                                        where('id_calon_soalan',$obj[$i]->id_calon_soalan)->
                                                        first();
                $json_list = json_decode($objJSONlist->json_set_soalan);
                $json_list = $json_list[rand(0,(sizeof($json_list)-1))]->json_list;

                $objAssignSet = pen_calon_soalan::where('id_calon_soalan',$obj[$i]->id_calon_soalan)->update([
                    'json_list' => $json_list
                ]);
                if(!$objAssignSet){
                    dd($json_list);
                } else {
                    // dd(sizeof($json_list));
                    $tetapan_mail = pen_tetapan::first();
                    $emelreceiver = $obj[$i]->emel;
                    $mail = new PHPMailer();
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
                    $mail->setFrom('penilaian@intanbk.intan.my', 'PENILAIAN '.$obj[$i]->nama_penilaian.' SIRI '.$obj[$i]->kod.'/'.$obj[$i]->tahun);
                    $mail->addAddress($emelreceiver);
                    $mail->isHTML(true);
                    $mail->Subject = $obj[$i]->nama_penilaian;
                    $mail->Body    = '
                                        Nama : '.$obj[$i]->nama.' <br>
                                        No KP : '.$obj[$i]->no_kad_pengenalan.'<br><br>
            
                                        Tuan/Puan, <br>
                            
                                        <b>PENILAIAN '.$obj[$i]->nama_penilaian.' SIRI '.$obj[$i]->kod.'/'.$obj[$i]->tahun.'</b> <br><br>
            
                                        Dengan hormatnya tuan/puan dijemput menghadiri '.$obj[$i]->nama_penilaian.'. Butir-butir penilaian adalah seperti berikut: <br><br>
            
                                        <table class="table table-bordered" width="100%">
                                            <tr>
                                                <th style="border: 1px solid black; background-color: grey; text-align: left; padding-left: 5px;">
                                                PENILAIAN
                                                </th>
                                                <td style="border: 1px solid black; text-align: left; padding-left: 5px;">
                                                    '.$obj[$i]->nama_penilaian.'
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style="border: 1px solid black; background-color: grey; text-align: left; padding-left: 5px;">
                                                    NO. ANGKA GILIRAN
                                                </th>
                                                <td style="border: 1px solid black; text-align: left; padding-left: 5px;">
                                                    '.$obj[$i]->no_angka_giliran.' <b>(INI ADALAH KATA LALUAN ANDA)</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style="border: 1px solid black; background-color: grey; text-align: left; padding-left: 5px;">
                                                    PAUTAN
                                                </th>
                                                <td style="border: 1px solid black; text-align: left; padding-left: 5px;">
                                                <a onclick="popUp()" href="'.$tetapan_mail->link_sistem.'/user/exam/?issp='.$obj[$i]->enc_id_sesi_siri_penilaian.'">'.$tetapan_mail->link_sistem.'/user/exam/</a><br> <b>*Pautan ini hanya akan AKTIF satu (1) jam sebelum penilaian bermula.</b>
                                                </td>
                                            </tr>
                                        </table>
                                        <br><br>
        
                                        <table style="border: 1px solid black;" width="100%">
                                            <tr>
                                                <th style="border: 1px solid black; background-color: grey; text-align: center;">
                                                    TARIKH
                                                </th>
                                                <th style="border: 1px solid black; background-color: grey; text-align: center;">
                                                    BAHAGIAN
                                                </th>
                                                <th style="border: 1px solid black; background-color: grey; text-align: center;">
                                                    MASA DARI
                                                </th>
                                                <th style="border: 1px solid black; background-color: grey; text-align: center;">
                                                    MASA HINGGA
                                                </th>
                                            </tr>
                                            <tr>';
                    if($obj[$i]->id_tetapan_masa == 1){
                        $mail->Body .= '<td rowspan="'.sizeof(json_decode($json_list)).'" style="border: 1px solid black; text-align: center;">
                                            '.date("d/m/Y", strtotime($obj[$i]->tarikh_mula)).'
                                        </td>';
                        $jsonlist = json_decode($json_list);
                        for($u = 0; $u < sizeof(json_decode($json_list)); $u++){
                            $mail->Body .= '
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.$jsonlist[$u]->bahagian.'
                                                </td>
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.date('h:i a', strtotime($obj[$i]->masa_mula)).'
                                                </td>
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.date('h:i a', strtotime($obj[$i]->masa_tamat)).'
                                                </td>
                                            </tr>
                                            <tr>
                            ';
                        }
                    } else if($obj[$i]->id_tetapan_masa == 2){
                        $mail->Body .= '<td rowspan="'.sizeof($json_list).'" style="border: 1px solid black; text-align: center;">
                                            '.date("d/m/Y", strtotime($obj[$i]->tarikh_mula)).'
                                        </td>';
                        $jsonlist = $json_list;
                        for($u = 0; $u < sizeof($jsonlist); $u++){
                            $mail->Body .= '
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.$jsonlist[$u]->bahagian.'
                                                </td>
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.date('h:i a', strtotime($json_list[$u]->masa_mula)).'
                                                </td>
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.date('h:i a', strtotime($json_list[$u]->masa_tamat)).'
                                                </td>
                                            </tr>
                                            <tr>
                            ';
                        }
                    }
                                            $mail->Body .= '
                                            </tr>
                                        </table>
                                        <br><br>
                                        '.$obj[$i]->template_emel;
                    // dd($mail->Body);
                    $mail->AltBody = 'Alternate Message';
                    // if($mail->send()) {
                    // }
                    $mail->send();
                }
                $count++;
            }
            if(($count) == sizeof($obj)) {
                return response()->json([
                    'success'=>true,
                    'message'=>'Berjaya Menghantar Emel!',
                    'data'=>'',
                ],200);
            }
    //         if(!$mail->send()) {
    // //                dd("Mailer Error: " . $mail->ErrorInfo);
    //             return response()->json([
    //                 'success'=>false,
    //                 'message'=>'Konfigurasi Emel Sistem Tidak Tepat. Superadmin perlu set di bahagian Pentadbir Sistem -> Tetapan Sistem',
    //                 'data'=>'',
    //                 // 'token'=>$token
    //             ],400);
    //         } 
            else {
                // dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>false,
                    'message'=>$count . sizeof($obj),
                    'data'=>'',
                ],400);
            }

        }

    }

    public function calonEmail(Request $request){
        $id_calon_soalan      = $request->input('id_calon_soalan');
        $obj = pen_calon_soalan::leftjoin('pen_siri_penilaian','pen_siri_penilaian.id_siri_penilaian','pen_calon_soalan.FK_siri_penilaian')->
                                leftjoin('pen_penilaian','pen_penilaian.id_penilaian','pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_sesi_siri_penilaian','pen_sesi_siri_penilaian.id_sesi_siri_penilaian','pen_calon_soalan.FK_sesi')->
                                where('pen_calon_soalan.id_calon_soalan',$id_calon_soalan)->
                                get([
                                    'pen_calon_soalan.id_calon_soalan',
                                    'pen_calon_soalan.nama',
                                    'pen_calon_soalan.no_kad_pengenalan',
                                    'pen_calon_soalan.gred',
                                    'pen_calon_soalan.jawatan',
                                    'pen_calon_soalan.emel',
                                    'pen_calon_soalan.no_angka_giliran',
                                    'pen_calon_soalan.notel',
                                    'pen_calon_soalan.FK_siri_penilaian',
                                    'pen_calon_soalan.json_list',
                                    'pen_siri_penilaian.kod_siri_penilaian',
                                    'pen_siri_penilaian.kod',
                                    'pen_siri_penilaian.tahun',
                                    'pen_siri_penilaian.nosiri',
                                    'pen_siri_penilaian.template_emel',
                                    'pen_penilaian.nama_penilaian',
                                    'pen_sesi_siri_penilaian.id_tetapan_masa',
                                    'pen_sesi_siri_penilaian.tarikh_mula',
                                    'pen_sesi_siri_penilaian.masa_mula',
                                    'pen_sesi_siri_penilaian.masa_tamat',
                                    'pen_sesi_siri_penilaian.pautan_status',
                                    'pen_sesi_siri_penilaian.pautan_skype',
                                    'pen_sesi_siri_penilaian.pautan_zoom',
                                    'pen_sesi_siri_penilaian.pautan_google',
                                    'pen_sesi_siri_penilaian.pautan_team',
                                    DB::RAW('MD5(pen_siri_penilaian.id_siri_penilaian) AS enc_id_siri_penilaian'),
                                    DB::RAW('MD5(pen_sesi_siri_penilaian.id_sesi_siri_penilaian) AS enc_id_sesi_siri_penilaian'),
                                ]);
        if(sizeof($obj)>0){
            $count = 0;
            for($i = 0; $i < sizeof($obj); $i++){
                $objJSONlist = pen_sesi_siri_penilaian::leftjoin('pen_calon_soalan','FK_sesi','id_sesi_siri_penilaian')->
                                                        where('id_calon_soalan',$obj[$i]->id_calon_soalan)->
                                                        first();
                $json_list = json_decode($objJSONlist->json_set_soalan);
                $json_list = $json_list[rand(0,(sizeof($json_list)-1))]->json_list;

                $objAssignSet = pen_calon_soalan::where('id_calon_soalan',$obj[$i]->id_calon_soalan)->update([
                    'json_list' => $json_list
                ]);
                if(!$objAssignSet){
                    dd($json_list);
                } else {
                    // dd(sizeof($json_list));
                    $tetapan_mail = pen_tetapan::first();
                    $emelreceiver = $obj[$i]->emel;
                    $mail = new PHPMailer();
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
                    $mail->setFrom('penilaian@intanbk.intan.my', 'PENILAIAN '.$obj[$i]->nama_penilaian.' SIRI '.$obj[$i]->kod.'/'.$obj[$i]->tahun);
                    $mail->addAddress($emelreceiver);
                    $mail->isHTML(true);
                    $mail->Subject = $obj[$i]->nama_penilaian;
                    $mail->Body    = '
                                        Nama : '.$obj[$i]->nama.' <br>
                                        No KP : '.$obj[$i]->no_kad_pengenalan.'<br><br>
            
                                        Tuan/Puan, <br>
                            
                                        <b>PENILAIAN '.$obj[$i]->nama_penilaian.' SIRI '.$obj[$i]->kod.'/'.$obj[$i]->tahun.'</b> <br><br>
            
                                        Dengan hormatnya tuan/puan dijemput menghadiri '.$obj[$i]->nama_penilaian.'. Butir-butir penilaian adalah seperti berikut: <br><br>
            
                                        <table class="table table-bordered" width="100%">
                                            <tr>
                                                <th style="border: 1px solid black; background-color: grey; text-align: left; padding-left: 5px;">
                                                PENILAIAN
                                                </th>
                                                <td style="border: 1px solid black; text-align: left; padding-left: 5px;">
                                                    '.$obj[$i]->nama_penilaian.'
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style="border: 1px solid black; background-color: grey; text-align: left; padding-left: 5px;">
                                                    NO. ANGKA GILIRAN
                                                </th>
                                                <td style="border: 1px solid black; text-align: left; padding-left: 5px;">
                                                    '.$obj[$i]->no_angka_giliran.' <b>(INI ADALAH KATA LALUAN ANDA)</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style="border: 1px solid black; background-color: grey; text-align: left; padding-left: 5px;">
                                                    PAUTAN
                                                </th>
                                                <td style="border: 1px solid black; text-align: left; padding-left: 5px;">
                                                <a onclick="popUp()" href="'.$tetapan_mail->link_sistem.'/user/exam/?issp='.$obj[$i]->enc_id_sesi_siri_penilaian.'">'.$tetapan_mail->link_sistem.'/user/exam/</a><br> <b>*Pautan ini hanya akan AKTIF satu (1) jam sebelum penilaian bermula.</b>
                                                </td>
                                            </tr>
                                        </table>
                                        <br><br>
        
                                        <table style="border: 1px solid black;" width="100%">
                                            <tr>
                                                <th style="border: 1px solid black; background-color: grey; text-align: center;">
                                                    TARIKH
                                                </th>
                                                <th style="border: 1px solid black; background-color: grey; text-align: center;">
                                                    BAHAGIAN
                                                </th>
                                                <th style="border: 1px solid black; background-color: grey; text-align: center;">
                                                    MASA DARI
                                                </th>
                                                <th style="border: 1px solid black; background-color: grey; text-align: center;">
                                                    MASA HINGGA
                                                </th>
                                            </tr>
                                            <tr>';
                    if($obj[$i]->id_tetapan_masa == 1){
                        $mail->Body .= '<td rowspan="'.sizeof(json_decode($json_list)).'" style="border: 1px solid black; text-align: center;">
                                            '.date("d/m/Y", strtotime($obj[$i]->tarikh_mula)).'
                                        </td>';
                        $jsonlist = json_decode($json_list);
                        for($u = 0; $u < sizeof(json_decode($json_list)); $u++){
                            $mail->Body .= '
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.$jsonlist[$u]->bahagian.'
                                                </td>
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.date('h:i a', strtotime($obj[$i]->masa_mula)).'
                                                </td>
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.date('h:i a', strtotime($obj[$i]->masa_tamat)).'
                                                </td>
                                            </tr>
                                            <tr>
                            ';
                        }
                    } else if($obj[$i]->id_tetapan_masa == 2){
                        $mail->Body .= '<td rowspan="'.sizeof($json_list).'" style="border: 1px solid black; text-align: center;">
                                            '.date("d/m/Y", strtotime($obj[$i]->tarikh_mula)).'
                                        </td>';
                        $jsonlist = $json_list;
                        for($u = 0; $u < sizeof($jsonlist); $u++){
                            $mail->Body .= '
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.$jsonlist[$u]->bahagian.'
                                                </td>
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.date('h:i a', strtotime($json_list[$u]->masa_mula)).'
                                                </td>
                                                <td style="border: 1px solid black; text-align: center;">
                                                    '.date('h:i a', strtotime($json_list[$u]->masa_tamat)).'
                                                </td>
                                            </tr>
                                            <tr>
                            ';
                        }
                    }
                                            $mail->Body .= '
                                            </tr>
                                        </table>
                                        <br><br>
                                        '.$obj[$i]->template_emel;
                    // dd($mail->Body);
                    $mail->AltBody = 'Alternate Message';
                    $mail->send();
                }
                $count++;
            }
            if(($count) == sizeof($obj)) {
                return response()->json([
                    'success'=>true,
                    'message'=>'Berjaya Menghantar Emel!',
                    'data'=>$obj,
                ],200);
            }
            else {
                // dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>false,
                    'message'=>$count . sizeof($obj),
                    'data'=>'',
                ],400);
            }

        }

    }

    public function calonEmailKeputusan($id_calon_soalan){
        $obj = pen_calon_soalan::leftjoin('pen_siri_penilaian','pen_siri_penilaian.id_siri_penilaian','pen_calon_soalan.FK_siri_penilaian')->
                                leftjoin('pen_penilaian','pen_penilaian.id_penilaian','pen_siri_penilaian.FK_penilaian')->
                                leftjoin('pen_sesi_siri_penilaian','pen_sesi_siri_penilaian.id_sesi_siri_penilaian','pen_calon_soalan.FK_sesi')->
                                where('pen_calon_soalan.id_calon_soalan',$id_calon_soalan)->
                                get([
                                    'pen_calon_soalan.id_calon_soalan',
                                    'pen_calon_soalan.nama',
                                    'pen_calon_soalan.no_kad_pengenalan',
                                    'pen_calon_soalan.gred',
                                    'pen_calon_soalan.jawatan',
                                    'pen_calon_soalan.emel',
                                    'pen_calon_soalan.no_angka_giliran',
                                    'pen_calon_soalan.notel',
                                    'pen_calon_soalan.FK_siri_penilaian',
                                    'pen_calon_soalan.json_list',
                                    'pen_calon_soalan.peratus_set',
                                    'pen_calon_soalan.peratus_siri',
                                    'pen_calon_soalan.markah_akhir',
                                    'pen_calon_soalan.markah_full',
                                    'pen_siri_penilaian.kod_siri_penilaian',
                                    'pen_siri_penilaian.kod',
                                    'pen_siri_penilaian.tahun',
                                    'pen_siri_penilaian.nosiri',
                                    'pen_siri_penilaian.template_emel',
                                    'pen_penilaian.nama_penilaian',
                                    'pen_sesi_siri_penilaian.id_tetapan_masa',
                                    'pen_sesi_siri_penilaian.tarikh_mula',
                                    'pen_sesi_siri_penilaian.masa_mula',
                                    'pen_sesi_siri_penilaian.masa_tamat',
                                    'pen_sesi_siri_penilaian.pautan_status',
                                    'pen_sesi_siri_penilaian.pautan_skype',
                                    'pen_sesi_siri_penilaian.pautan_zoom',
                                    'pen_sesi_siri_penilaian.pautan_google',
                                    'pen_sesi_siri_penilaian.pautan_team',
                                    DB::RAW('MD5(pen_siri_penilaian.id_siri_penilaian) AS enc_id_siri_penilaian'),
                                    DB::RAW('MD5(pen_sesi_siri_penilaian.id_sesi_siri_penilaian) AS enc_id_sesi_siri_penilaian'),
                                ]);
        if(sizeof($obj)>0){
            $count = 0;
            for($i = 0; $i < sizeof($obj); $i++){
                $tetapan_mail = pen_tetapan::first();
                $emelreceiver = $obj[$i]->emel;
                $mail = new PHPMailer();
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
                $mail->setFrom('penilaian@intanbk.intan.my', 'KEPUTUSAN PENILAIAN '.$obj[$i]->nama_penilaian.' SIRI '.$obj[$i]->kod.'/'.$obj[$i]->tahun);
                $mail->addAddress($emelreceiver);
                $mail->isHTML(true);
                $mail->Subject = $obj[$i]->nama_penilaian;
                $mail->Body    = '
                                    Nama : '.$obj[$i]->nama.' <br>
                                    No KP : '.$obj[$i]->no_kad_pengenalan.'<br><br>
        
                                    Tuan/Puan, <br>
                        
                                    <b>KEPUTUSAN PENILAIAN '.$obj[$i]->nama_penilaian.' SIRI '.$obj[$i]->kod.'/'.$obj[$i]->tahun.'</b> <br><br>

                                    Dengan segala hormatnya perkara di atas adalah dirujuk.<br><br>

                                    2. &nbsp;&nbsp;&nbsp;Keputusan peperiksaan yang telah Tuan/Puan hadiri di atas adalah seperti berikut:

                                    <table style="border: 1px solid black;" width="80%">
                                        <tr valign="top">
                                            <th style="border: 1px solid black; background-color: grey; text-align: left; padding-left: 5px;" width="20%">Markah Soalan</th>
                                            <th style="border: 1px solid black; background-color: grey; text-align: left; padding-left: 5px;" width="20%">Peratus Set (%)</th>
                                            <th style="border: 1px solid black; background-color: grey; text-align: left; padding-left: 5px;" width="20%">Gred</th>
                                        </tr>
                                        <tr valign="top">
                                            <td style="border: 1px solid black; text-align: left; padding-left: 5px;">'.$obj[$i]->markah_akhir.'/'.$obj[$i]->markah_full.'</td>
                                            <td style="border: 1px solid black; text-align: left; padding-left: 5px;">'.$obj[$i]->peratus_set.'%</td>
                                            <td style="border: 1px solid black; text-align: left; padding-left: 5px;">'.$obj[$i]->peratus_siri.'</td>
                                        </tr>
                                    </table>

                                    <br><br>

                                    Keputusan peperiksaan boleh diketahui melalui emel dan semakan secara online di <a onclick="popUp()" href="'.$tetapan_mail->link_sistem.'/user">Portal Sistem Penilaian INTAN</a>.<br><br>

                                    Sekian, terima kasih.';
                // dd($mail->Body);
                $mail->AltBody = 'Alternate Message';
                $mail->send();
                $count++;
            }
            if(($count) == sizeof($obj)) {
                return response()->json([
                    'success'=>true,
                    'message'=>'Berjaya Menghantar Emel!',
                    'data'=>$obj,
                ],200);
            }
            else {
                // dd("Mailer Error: " . $mail->ErrorInfo);
                return response()->json([
                    'success'=>false,
                    'message'=>$count . sizeof($obj),
                    'data'=>'',
                ],400);
            }

        }

    }

    public function update(Request $request){
        $id_set_soalan      = $request->input('id_set_soalan');
        $json_list          = $request->input('json_list');

        $data = [
            'json_list' => $json_list
        ];

        $obj = pen_calon_soalan::where('id_set_soalan',$id_set_soalan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Kemaskini Set Soalan Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Kemaskini Set Soalan Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function updateMarkahAkhir(Request $request){
        $id_calon_soalan      = $request->input('id_calon_soalan');
        $markah_akhir         = $request->input('markah_akhir');
        $markah_full          = $request->input('markah_full');
        $peratus_set          = $request->input('peratus_set');
        $peratus_siri         = $request->input('peratus_siri');

        $data = [
            'markah_akhir' => $markah_akhir,
            'markah_full' => $markah_full,
            'peratus_set' => $peratus_set,
            'peratus_siri' => $peratus_siri,
        ];

        $obj = pen_calon_soalan::where('id_calon_soalan',$id_calon_soalan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Jana Markah Akhir Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Jana Markah Akhir Gagal!',
                'data'=>''
            ],200);
        }
    }

    public function updateImage(Request $request){
        $id_calon_soalan    = $request->input('id_calon_soalan');
        $image              = $request->input('image');

        $data = [
            'image' => $image
        ];

        $obj = pen_calon_soalan::where('id_calon_soalan',$id_calon_soalan)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Image Updated!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Image Not Updated!',
                'data'=>''
            ],400);
        }
    }

    public function approval(Request $request){
        $id_permohonan_penilaian    = $request->input('id_permohonan_penilaian');
        $status_permohonan          = $request->input('status_permohonan');

        $data = [
            'status_permohonan' => $status_permohonan
        ];

        $obj = pen_calon_soalan::where(DB::RAW("MD5(id_permohonan_penilaian)"),$id_permohonan_penilaian)->update($data);
        
        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$obj
            ],202);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function show(Request $request){
        $id_set_soalan = $request->input('id_set_soalan');

        $obj = pen_calon_soalan::where('id_set_soalan',$id_set_soalan)->first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function showCalon(Request $request){
        $id_calon_soalan = $request->input('id_calon_soalan');

        $obj = pen_calon_soalan::where('id_calon_soalan',$id_calon_soalan)->first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Calon Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Show Calon Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function showCalonJsonList(Request $request){
        $id_calon_soalan = $request->input('id_calon_soalan');

        $obj = pen_calon_soalan::leftjoin('pen_set_soalan','pen_set_soalan.json_list','pen_calon_soalan.json_list')->
                                leftjoin('pen_siri_penilaian','pen_siri_penilaian.id_siri_penilaian','pen_calon_soalan.FK_siri_penilaian')->
                                where('id_calon_soalan',$id_calon_soalan)->
                                first([
                                    'pen_calon_soalan.json_list',
                                    'pen_set_soalan.peratus',
                                    'pen_siri_penilaian.gred',
                                ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Calon Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Show Calon Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function showGetIc($no_kad_pengenalan, $FK_siri_penilaian)  {
        $obj = pen_calon_soalan::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', 'pen_calon_soalan.FK_siri_penilaian') -> 
                                leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', 'pen_siri_penilaian.FK_penilaian') -> 
                                // leftjoin('pen_set_soalan', 'pen_set_soalan.json_list', 'pen_calon_soalan.json_list') -> 
                                leftjoin('pen_sesi_siri_penilaian', 'pen_sesi_siri_penilaian.id_sesi_siri_penilaian', 'pen_calon_soalan.FK_sesi') -> 
                                where('no_kad_pengenalan',$no_kad_pengenalan)->
                                where('pen_calon_soalan.FK_siri_penilaian',$FK_siri_penilaian)->
                                where('pen_calon_soalan.statusrekod','1')->
                                first([
                                    'id_calon_soalan',
                                    'no_kad_pengenalan',                                            
                                    'nama',
                                    'pen_calon_soalan.gred',
                                    'jawatan',
                                    'emel',
                                    'pen_calon_soalan.notel',
                                    'no_angka_giliran',
                                    'json_list',
                                    'id_siri_penilaian',
                                    'kod_siri_penilaian',
                                    'tarikh_penilaian',
                                    'pen_sesi_siri_penilaian.tarikh_mula',
                                    'pen_sesi_siri_penilaian.tarikh_tamat',
                                    'pen_sesi_siri_penilaian.masa_mula',
                                    'pen_sesi_siri_penilaian.masa_tamat',
                                    'pen_sesi_siri_penilaian.duration',
                                    'kod_penilaian',
                                    'nama_penilaian',
                                    'pen_siri_penilaian.tamat_penilaian',
                                    'pen_siri_penilaian.gred'
                                ]);
        if ($obj)   {
            $token = $this->getTokenPenilaian($obj->id_calon_soalan);
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
                'data'=>$obj,
                'token'=>$token
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

    public function getMarkah(Request $request){
        $id = $request->input('id_calon_soalan');

        // dd($id);
        $obj = pen_calon_soalan::where('id_calon_soalan',$id)->
        first(['markah_akhir','markah_full','peratus_set','peratus_siri']);

        if($obj){
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
                'data'=>$obj,
                // 'token'=>$token
            ],200);
        }else{
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ],400);
        }
    }

    public function removeToken(Request $request){

        $id = $request->input('id_calon_soalan');

        $obj = pen_calon_soalan::where('id_calon_soalan',$id)
        ->update([
            'token' => '0'
        ]);

        if($obj){
            return response()->json([
                'success'=>true,
                'message'=>'Show Success!',
                'data'=>$obj,
                // 'token'=>$token
            ],200);
        }else{
            return response()->json([
                'success'=>false,
                'message'=>"No Data!",
                'data'=>''
            ],400);
        }
    }

    public function list($id){

        $obj = pen_calon_soalan::where('FK_siri_penilaian',$id)
        ->orderBy('kod_set', 'ASC')
        ->get();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function showBySiriPenilaian(Request $request){
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $obj = pen_calon_soalan::where('FK_siri_penilaian',$FK_siri_penilaian)
        ->orderBy('no_angka_giliran', 'DESC')
        ->first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Show Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function showBySesi(Request $request){
        $FK_sesi = $request->input('FK_sesi');
        $obj = pen_calon_soalan::where('FK_sesi',$FK_sesi)
        ->orderBy('no_angka_giliran', 'DESC')
        ->first();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Show Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Show Gagal!',
                'data'=>''
            ],400);
        }
    }

    public function listBySiriPenilaian(Request $request){
        $FK_siri_penilaian = $request->input('FK_siri_penilaian');
        $FK_sesi = $request->input('FK_sesi');

        $obj = pen_calon_soalan::
        leftjoin('pen_users', 'pen_users.no_kad_pengenalan', 'pen_calon_soalan.no_kad_pengenalan');
        if($FK_sesi != "undefined" && $FK_sesi != null){ $obj = $obj -> where('pen_calon_soalan.FK_sesi',$FK_sesi); }
        $obj = $obj -> where('pen_calon_soalan.FK_siri_penilaian',$FK_siri_penilaian)->
        orderBy('pen_calon_soalan.no_angka_giliran','ASC')->
                                        get([
                                            'id_calon_soalan',
                                            'pen_calon_soalan.nama',
                                            'pen_calon_soalan.no_kad_pengenalan',
                                            'pen_users.notel',
                                            'pen_calon_soalan.emel',
                                            'pen_calon_soalan.notel',
                                            'pen_users.emel_kerajaan',
                                            'pen_users.emel_majikan',
                                            'pen_users.FK_jenis_pengguna',
                                            'pen_users.nama_jawatan',
                                            'pen_calon_soalan.jawatan',
                                            'pen_users.skim',
                                            'pen_calon_soalan.FK_sesi',
                                            'pen_calon_soalan.json_list',
                                            'pen_calon_soalan.no_angka_giliran',
                                            'pen_calon_soalan.image',
                                            'pen_calon_soalan.markah_akhir',
                                            'pen_calon_soalan.markah_full',
                                            'pen_calon_soalan.peratus_set',
                                            'pen_calon_soalan.peratus_siri',
                                        ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Set Soalan Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Set Soalan Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function listByKP(Request $request){
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');

        $obj = pen_calon_soalan::leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', 'pen_calon_soalan.FK_siri_penilaian')
                                        ->leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', 'pen_siri_penilaian.FK_penilaian')
                                        ->where('no_kad_pengenalan',$no_kad_pengenalan)
                                        ->get([
                                            'id_permohonan_penilaian',
                                            'pen_penilaian.nama_penilaian',
                                            'pen_siri_penilaian.kod_siri_penilaian',
                                            'pen_siri_penilaian.tarikh_penilaian',
                                            'pen_siri_penilaian.created_at',
                                            'pen_calon_soalan.status_permohonan'
                                        ]);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function keputusanListByKP(Request $request){
        $no_kad_pengenalan = $request->input('no_kad_pengenalan');

        // dd($no_kad_pengenalan);
        $obj = pen_calon_soalan::
        leftjoin('pen_siri_penilaian', 'pen_siri_penilaian.id_siri_penilaian', 'pen_calon_soalan.FK_siri_penilaian')
                                        ->leftjoin('pen_penilaian', 'pen_penilaian.id_penilaian', 'pen_siri_penilaian.FK_penilaian')
                                        ->where('no_kad_pengenalan',$no_kad_pengenalan)
                                        ->where(function ($q){
                                            $q->orWhere('peratus_set','<>',null);
                                            $q->orWhere('peratus_set','<>','');
                                        })
                                        ->where(function ($q){
                                            $q->orWhere('peratus_siri','<>',null);
                                            $q->orWhere('peratus_siri','<>','');
                                        })
                                        ->get(
                                            [
                                            // 'id_permohonan_penilaian',
                                            'pen_penilaian.nama_penilaian',
                                            'pen_siri_penilaian.kod_siri_penilaian',
                                            'pen_siri_penilaian.tarikh_penilaian',
                                            'pen_siri_penilaian.created_at',
                                            // 'pen_calon_soalan.status_permohonan'
                                            'pen_calon_soalan.peratus_set', //MIMI 03032023
                                            'pen_calon_soalan.peratus_siri', //MIMI 03032023
                                            'pen_calon_soalan.FK_siri_penilaian', //MIMI 03032023
                                            'pen_calon_soalan.json_list', //MIMI 03032023
                                            'pen_calon_soalan.FK_sesi', //MIMI 03032023
                                            'pen_calon_soalan.no_angka_giliran', //MIMI 03032023
                                            'pen_calon_soalan.id_calon_soalan', //MIMI 03032023
                                        ]
                                    );

                                    // dd($obj);

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function delete(Request $request){
        $id_calon_soalan = $request->input('id_calon_soalan');

        $obj = pen_calon_soalan::where('id_calon_soalan',$id_calon_soalan)->delete();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Calon Hapus Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Hapus Calon Gagal!',
                'data'=>''
            ],404);
        }
    }

    public function deleteBySesi(Request $request){
        $FK_sesi = $request->input('FK_sesi');

        $obj = pen_calon_soalan::where('FK_sesi',$FK_sesi)->delete();

        if ($obj)   {
            return response()->json([
                'success'=>true,
                'message'=>'Calon Hapus Berjaya!',
                'data'=>$obj
            ],200);
        } else{
            return response()->json([
                'success'=>false,
                'message'=>'Hapus Calon Gagal!',
                'data'=>''
            ],404);
        }
    }
}
