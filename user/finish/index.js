var id_calon_soalan_master, gred_master, no_angka_giliran_master, json_list_master, kod_siri_penilaian_master, tarikh_penilaian_master, tarikh_mula_master, tarikh_tamat_master, masa_mula_master, masa_tamat_master, duration_master, kod_penilaian_master, nama_penilaian_master, currentQ,tamat_penilaian_master;
let json_image = [];
const queryString = window.location.search;

// $(document).on("keydown", disableF);
// $(document).bind("contextmenu", function(e) {
//     return false;
// });

$(function() {
    // $('#on_bg').click(function() { $('#example').fireworks(); });
    $('#example').fireworks();

    let isp = window.sessionStorage.isp;
    let noic = window.localStorage.no_kad_pengenalan;
    let json_list_soalan = JSON.parse(window.sessionStorage.json_list_soalan);

    $.each(json_list_soalan, function(i, item){
        if(item.FK_jenis_soalan != 1 && item.FK_jenis_soalan != 3 && item.FK_jenis_soalan != 4){
            $("#view_markah").html('JAWAPAN TELAH DIREKOD. KEPUTUSAN AKAN DIHANTAR KE EMEL ANDA DALAM MASA TERDEKAT. TERIMA KASIH!');    
            removeTokenCalonSoalan(id_calon_soalan_master,window.localStorage.token,function(){
                if(obj_calon.success){
                    window.sessionStorage.clear();
                    window.localStorage.clear();
                }
            });
            return;
        } else if(json_list_soalan.length == (i+1)){        
            usersPenilaian(noic,isp,token,function(){
                if(dataUsers.success){
                    let data = dataUsers.data;
                    json_list_master = data.json_list;
                    noic = data.no_kad_pengenalan;
                    tamat_penilaian_master = data.tamat_penilaian;
                    id_calon_soalan_master = data.id_calon_soalan;
                    let gred = data.gred;
                    let jenis_pengesahan = '';
    
                    if(gred != null){
                        gred = JSON.parse(gred);
                    }
                    
                    getJenisPengesahan(json_list_master,window.localStorage.token,function(){
                        jenis_pengesahan = obj_sah.data.statusrekod;
            
                        if(jenis_pengesahan == 2){
                            jana_markah();
                            // var form = new FormData;
                            // form.append('id_calon_soalan',id_calon_soalan_master);
                            // getMarkahCalon(form,window.localStorage.token,function(){
                            //     let data = obj_markah.data;
    
                            //     let peratus_siri = data.peratus_siri;
    
                            //     $.each(gred,function(i,item){
                            //         if(i != 0){
                            //             if(item.max_value <= peratus_siri && gred[i-1] > peratus_siri){
                            //                 $('#view_gred').html('GRED : '+item.gred);
                            //             }
                            //         }                                
                            //     });
                
                            //     $('#view_markah').html(data.peratus_siri+'%');
    
                            //     window.sessionStorage.clear();
                            //     window.localStorage.clear();
                            // });
                        } else {
                            removeTokenCalonSoalan(id_calon_soalan_master,window.localStorage.token,function(){    
                                if(obj_calon.success){
                                    window.sessionStorage.clear();
                                    window.localStorage.clear();
                                }
                            });
                        }
                    });
                    $('#msgTamat').html(tamat_penilaian_master);
                }
                else{
                    // reject_load();
                }
            });
        }
    });
});        
    
function removeTokenCalonSoalan(id,token,returnValue){

    let form = new FormData();
    form.append('id_calon_soalan',id);

    var settings = {
        "url": host+"calon_soalan/removeToken",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "AuthorizationExam": token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        // let obj = JSON.parse(response);
        obj_calon = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data siri soalan Error","data":""};
        obj_calon = response;

        returnValue();
    });  
}

function getJenisPengesahan(json,token,returnValue){

    let form = new FormData();
    form.append('json_list',json);

    var settings = {
        "url": host+"setsoalan/getJenisPengesahan",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "AuthorizationExam": token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        // let obj = JSON.parse(response);
        obj_sah = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data siri soalan Error","data":""};
        obj_sah = response;

        returnValue();
    });   
}

function getMarkahCalon(form,token,returnValue){

    var settings = {
        "url": host+"calon_soalan/getMarkah",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "AuthorizationExam": token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    let request = $.ajax(settings);
    request.done(function (response) {
        // let obj = JSON.parse(response);
        obj_markah = JSON.parse(response);

        returnValue();
        
    });
    request.fail(function(){
        response = {"success":false,"message":"data siri soalan Error","data":""};
        obj_markah = response;

        returnValue();
    });   
    // let json_list = JSON.parse(json_list_master);

    // $.each(json_list,function(i,field){
    //     let bahagian = field.bahagian.replaceAll(' ', '_');
    //     json_list_bahagian.push({
    //         bahagian: bahagian
    //     });

    // });

    // $.each(field.soalan,function(x,row){
    //     json_list_soalan.push({
    //         bahagian: bahagian,
    //         PK_siri_soalan: row.id
    //     });
    // });
}

(function( $ ) {
    var MAX_ROCKETS = 5,
        MAX_PARTICLES = 500;

    var FUNCTIONS = {
        'init': function(element) {
            var jqe = $(element);

            // Check this element isn't already inited
            if (jqe.data('fireworks_data') !== undefined) {
                console.log('Looks like this element is already inited!');
                return;
            }

            // Setup fireworks on this element
            var canvas = document.createElement('canvas'),
                canvas_buffer = document.createElement('canvas'),
                data = {
                    'element': element,
                    'canvas': canvas,
                    'context': canvas.getContext('2d'),
                    'canvas_buffer': canvas_buffer,
                    'context_buffer': canvas_buffer.getContext('2d'),
                    'particles': [],
                    'rockets': []
                };

            // Add & position the canvas
            if (jqe.css('position') === 'static') {
                element.style.position = 'relative';
            }
            element.appendChild(canvas);
            canvas.style.position = 'absolute';
            canvas.style.top = '0px';
            canvas.style.bottom = '0px';
            canvas.style.left = '0px';
            canvas.style.right = '0px';

            // Kickoff the loops
            data.interval = setInterval(loop.bind(this, data), 1000 / 50);

            // Save the data for later
            jqe.data('fireworks_data', data);
        },
        'destroy': function(element) {
            var jqe = $(element);

            // Check this element isn't already inited
            if (jqe.data('fireworks_data') === undefined) {
                console.log('Looks like this element is not yet inited!');
                return;
            }
            var data = jqe.data('fireworks_data');
            jqe.removeData('fireworks_data');

            // Stop the interval
            clearInterval(data.interval);

            // Remove the canvas
            data.canvas.remove();

            // Reset the elements positioning
            data.element.style.position = '';
        }
    };

    $.fn.fireworks = function(action) {
        // Assume no action means we want to init
        if (!action) {
            action = 'init';
        }

        // Process each element
        this.each(function() {
            FUNCTIONS[action](this);
        });

        // Chaining ftw :)
        return this;
    };

    function launch(data) {
        if (data.rockets.length < MAX_ROCKETS) {
            var rocket = new Rocket(data);
            data.rockets.push(rocket);
        }
    }

    function loop(data) {
        // Launch a new rocket
        launch(data);

        // Update screen size
        if (data.canvas_width != data.element.offsetWidth) {
            data.canvas_width = data.canvas.width = data.canvas_buffer.width = data.element.offsetWidth;
        }
        if (data.canvas_height != data.element.offsetHeight) {
            data.canvas_height = data.canvas.height = data.canvas_buffer.height = data.element.offsetHeight;
        }

        // Fade the background out slowly
        data.context_buffer.clearRect(0, 0, data.canvas.width, data.canvas.height);
        data.context_buffer.globalAlpha = 0.9;
        data.context_buffer.drawImage(data.canvas, 0, 0);
        data.context.clearRect(0, 0, data.canvas.width, data.canvas.height);
        data.context.drawImage(data.canvas_buffer, 0, 0);

        // Update the rockets
        var existingRockets = [];
        data.rockets.forEach(function(rocket) {
            // update and render
            rocket.update();
            rocket.render(data.context);

            // random chance of 1% if rockets is above the middle
            var randomChance = rocket.pos.y < (data.canvas.height * 2 / 3) ? (Math.random() * 100 <= 1) : false;

            /* Explosion rules
                 - 80% of screen
                - going down
                - close to the mouse
                - 1% chance of random explosion
            */
            if (rocket.pos.y < data.canvas.height / 5 || rocket.vel.y >= 0 || randomChance) {
                rocket.explode(data);
            } else {
                existingRockets.push(rocket);
            }
        });
        data.rockets = existingRockets;

        // Update the particles
        var existingParticles = [];
        data.particles.forEach(function(particle) {
            particle.update();

            // render and save particles that can be rendered
            if (particle.exists()) {
                particle.render(data.context);
                existingParticles.push(particle);
            }
        });
        data.particles = existingParticles;

        while (data.particles.length > MAX_PARTICLES) {
            data.particles.shift();
        }
    }

    function Particle(pos) {
        this.pos = {
            x: pos ? pos.x : 0,
            y: pos ? pos.y : 0
        };
        this.vel = {
            x: 0,
            y: 0
        };
        this.shrink = .97;
        this.size = 2;

        this.resistance = 1;
        this.gravity = 0;

        this.flick = false;

        this.alpha = 1;
        this.fade = 0;
        this.color = 0;
    }

    Particle.prototype.update = function() {
        // apply resistance
        this.vel.x *= this.resistance;
        this.vel.y *= this.resistance;

        // gravity down
        this.vel.y += this.gravity;

        // update position based on speed
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        // shrink
        this.size *= this.shrink;

        // fade out
        this.alpha -= this.fade;
    };

    Particle.prototype.render = function(c) {
        if (!this.exists()) {
            return;
        }

        c.save();

        c.globalCompositeOperation = 'lighter';

        var x = this.pos.x,
            y = this.pos.y,
            r = this.size / 2;

        var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
        gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
        gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
        gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

        c.fillStyle = gradient;

        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
        c.closePath();
        c.fill();

        c.restore();
    };

    Particle.prototype.exists = function() {
        return this.alpha >= 0.1 && this.size >= 1;
    };

    function Rocket(data) {
        Particle.apply(
            this,
            [{
                x: Math.random() * data.canvas.width * 2 / 3 + data.canvas.width / 6,
                y: data.canvas.height
            }]
        );

        this.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
        this.vel.y = Math.random() * -3 - 4;
        this.vel.x = Math.random() * 6 - 3;
        this.size = 2;
        this.shrink = 0.999;
        this.gravity = 0.01;
    }

    Rocket.prototype = new Particle();
    Rocket.prototype.constructor = Rocket;

    Rocket.prototype.explode = function(data) {
        var count = Math.random() * 10 + 80;

        for (var i = 0; i < count; i++) {
            var particle = new Particle(this.pos);
            var angle = Math.random() * Math.PI * 2;

            // emulate 3D effect by using cosine and put more particles in the middle
            var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

            particle.vel.x = Math.cos(angle) * speed;
            particle.vel.y = Math.sin(angle) * speed;

            particle.size = 10;

            particle.gravity = 0.2;
            particle.resistance = 0.92;
            particle.shrink = Math.random() * 0.05 + 0.93;

            particle.flick = true;
            particle.color = this.explosionColor;

            data.particles.push(particle);
        }
    };

    Rocket.prototype.render = function(c) {
        if (!this.exists()) {
            return;
        }

        c.save();

        c.globalCompositeOperation = 'lighter';

        var x = this.pos.x,
            y = this.pos.y,
            r = this.size / 2;

        var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
        gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
        gradient.addColorStop(0.2, "rgba(255, 180, 0, " + this.alpha + ")");

        c.fillStyle = gradient;

        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
        c.closePath();
        c.fill();

        c.restore();
    };
}(jQuery));

function jana_markah(){
    var form = new FormData();
    form.append("FK_calon_soalan", id_calon_soalan_master);

    var settings = {
        "url": host+"calon_jawapan/list134ByCalon",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "AuthorizationExam": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };
    var request = $.ajax(settings);

    request.done(function (response) {
        let result = JSON.parse(response);
        $.each(result.data, function(i, item){
            mark = 0.00;
            if(item.FK_jenis_soalan == "1" || item.FK_jenis_soalan == "4"){
                $.each(JSON.parse(item.jawapan),function(a,rows){
                    value = rows.name.split("jawapan_");
                    if(value[1] == item.skema){
                        if(item.skema == item.jawapan_calon){
                            mark = item.mark;
                        }
                    }
                });
                updateMarks(mark,item.mark,item.id_calon_jawapan);
            } else {
                let markCheckBox = 0;
                $.each(JSON.parse(item.jawapan),function(a,rows){
                    value = rows.name.split("jawapan_");
                    skema = JSON.parse(item.skema);
                    jawapan_calon = item.jawapan_calon.split(',');
                    $.each(skema, function(s,scheme){
                        if(value[1] == scheme[0]){
                            if(jawapan_calon.findIndex(x => x === value[1]) >= 0){
                                markCheckBox = parseFloat(markCheckBox) + parseFloat(scheme[1]);
                                mark = markCheckBox;
                                s = skema.length + 1;
                                check = skema.length + 1;
                            }
                        }
                    });
                });
                updateMarks(markCheckBox,item.mark,item.id_calon_jawapan);
            }
            if(result.data.length == (i+1)){
                var settings = {
                    "url": host+"calon_jawapan/listSumMarkahJawapanByCalon",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "AuthorizationExam": window.localStorage.token
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };
                var request = $.ajax(settings);

                request.done(function (response) {
                    resultSum = JSON.parse(response);
                    $.each(resultSum.data, function(f, field){
                        resultSum.data[f].markah_full = 0;
                        var formfull1 = new FormData();
                        formfull1.append("id_calon_soalan", field.FK_calon_soalan);
                        showCalonSoalanJsonList(formfull1,function(){
                            if(obj.success){
                                obj = obj.data;
                                resultSum.data[f].peratus_set = obj.peratus;
                                gred = JSON.parse(obj.gred);
                                $.each(gred[0].gred, function(g, greds){
                                    if(gred[0].gred.length == (g+1)){
                                        resultSum.data[f].gred = greds.max_value;
                                    }
                                });
                                json_list = JSON.parse(obj.json_list);
                                $.each(json_list, function(t, itemt){
                                    $.each(itemt.soalan, function(p, itemp){
                                        var formmarkahfull = new FormData();
                                        formmarkahfull.append("PK_siri_soalan", itemp.id);
                                        var settings = {
                                            "url": host+"sirisoalan/view",
                                            "method": "POST",
                                            "timeout": 0,
                                            "headers": {
                                              "AuthorizationExam": window.localStorage.token
                                            },
                                            "processData": false,
                                            "mimeType": "multipart/form-data",
                                            "contentType": false,
                                            "data": formmarkahfull
                                        };
                                    
                                        var request = $.ajax(settings);
                                    
                                        request.done(function (response) {
                                            markah_soalan = JSON.parse(response);
                                            if (markah_soalan.data.mark > 0){
                                                resultSum.data[f].markah_full += parseFloat(markah_soalan.data.mark);
                                            }
                                            if(resultSum.data.length == (f+1)){
                                                let final_last = resultSum.data;
                                                $.each(final_last, function(fi, final){
                                                    let peratus_set = 0;
                                                    let peratus_siri = 0;
                                                    if(final.markah_jawapan >= 0 && final.markah_full >= 0){
                                                        peratus_siri = (parseFloat(final.markah_jawapan)/parseFloat(final.markah_full)) * parseFloat(final.gred);
                                                        peratus_set = (parseFloat(final.markah_jawapan)/parseFloat(final.markah_full)) * parseFloat(final.peratus_set);
                                                        gred = JSON.parse(obj.gred);
                                                        $.each(gred[0].gred, function(g, greds){
                                                            if(peratus_siri <= parseFloat(greds.max_value)){
                                                                peratus_siri = greds.gred;
                                                                g = gred[0].gred.length + 1;
                                                            }
                                                        });
                                                    }
                                                    var formAkhir = new FormData();
                                                    formAkhir.append("id_calon_soalan", final.FK_calon_soalan);
                                                    formAkhir.append("markah_akhir", final.markah_jawapan);
                                                    formAkhir.append("markah_full", final.markah_full);
                                                    formAkhir.append("peratus_set", peratus_set);
                                                    formAkhir.append("peratus_siri", peratus_siri);
                                                    var settings = {
                                                        "url": host+"calon_soalan/updateMarkahAkhir",
                                                        "method": "POST",
                                                        "timeout": 0,
                                                        "headers": {
                                                            "AuthorizationExam": window.localStorage.token
                                                        },
                                                        "processData": false,
                                                        "mimeType": "multipart/form-data",
                                                        "contentType": false,
                                                        "data": formAkhir
                                                    };
                                                    var request = $.ajax(settings);
                            
                                                    request.done(function (response) {
                                                        if( resultSum.data.length == (f+1) && 
                                                            json_list.length == (t+1) && 
                                                            itemt.soalan.length == (p+1) && 
                                                            final_last.length == (fi+1)){
                                                            swal({
                                                                title: "Jana Markah Akhir Berjaya!",
                                                                // text: "",
                                                                type: "success",
                                                                showConfirmButton: false,
                                                                allowOutsideClick: false,
                                                                html: false,
                                                                timer: 1000
                                                            }).then(function(){},
                                                                function (dismiss) {
                                                                    if (dismiss === 'timer') {
                                                                        console.log(peratus_siri);
                                                                        console.log(peratus_set);
                                                                        console.log(final.markah_jawapan + "/" + final.markah_full);
                                                                        $('#view_markah').html(peratus_siri);
                                                                        emelKeputusan(id_calon_soalan_master);
                                                                        removeTokenCalonSoalan(id_calon_soalan_master,window.localStorage.token,function(){    
                                                                            if(obj_calon.success){
                                                                                window.sessionStorage.clear();
                                                                                window.localStorage.clear();
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            );
                                                        }  
                                                    });
                                                });
                                            }
                                        });
                                    });
                                });
                            }
                        });
                    });
                });

                request.fail(function (response){
                    swal({
                        title: "Jana Markah Akhir Gagal!",
                        // text: "Sila semak markah jawapan calon. Terdapat calon yang belum dinilai.",
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            // if (dismiss === 'timer') {
                                
                            // }
                        }
                    );            
                });
            }
        });
    });
}

function updateMarks(markah_jawapan, full_mark, id_calon_jawapan){
    var form = new FormData();
    form.append("markah_jawapan", markah_jawapan);
    form.append("id_calon_jawapan", id_calon_jawapan);
    var settings = {
        "url": host+"calon_jawapan/updateMarks",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "AuthorizationExam": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };
    var request = $.ajax(settings);

    request.done(function (response) {
        return;
    });
}

function showCalonSoalanJsonList(form, returnValue){    
    var settings = {
        "url": host + "calon_soalan/showCalonJsonList",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "AuthorizationExam": window.localStorage.token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    var request = $.ajax(settings);

    request.done(function (response) {
        obj= JSON.parse(response);
        returnValue();
    });

    request.fail(function(response){
        obj = response;
        returnValue();
    });  
}

function emelKeputusan(id_calon_soalan){    
    var settings = {
        "url": host + "calon_soalan/calonEmailKeputusan/"+id_calon_soalan,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "AuthorizationExam": window.localStorage.token
        },
    };

    var request = $.ajax(settings);

    request.done(function (response) {
        console.log(response);
    });

    request.fail(function(response){
        console.log(response);
    });
}