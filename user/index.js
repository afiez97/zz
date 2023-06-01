// $(function () {
//     $.ajaxSetup({
//         cache: false
//     });
//     // $.fn.select2.defaults.set( "theme", "bootstrap" );
//     // $.fn.modal.Constructor.prototype.enforceFocus = function() {};
//     let token = window.localStorage.token;
//     if(token == null && window.localStorage.no_kad_pengenalan == null){
//         window.location.replace('../login/');
//     }
//     else{
//         window.location.replace('../dashboard/');
//     }
// });

$(document).ready(function(){
    let token = window.localStorage.token;
    if(token == null && window.localStorage.no_kad_pengenalan == null){
        window.location.replace('login/');
    }
    else{
        window.location.replace('dashboard/');
    }
});