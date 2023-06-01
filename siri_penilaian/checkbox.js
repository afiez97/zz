$("#kat1").change(function(){
    alert("CHANGED");
    if(this.checked) {
        $("#kat3").attr("disabled", true);
    } else  {
        if ($("#kat2").not(":checked") && $("#kat4").not(":checked"))    {
            $("#kat3").attr("disabled", false);
        }
    }
});

$("#kat2").change(function(){
    if(this.checked) {
        $("#kat3").attr("disabled", true);
    } else  {
        if ($("#kat1").not(":checked") && $("#kat4").not(":checked"))    {
            $("#kat3").attr("disabled", false);
        }
    }
});

$("#kat4").change(function(){
    if(this.checked) {
        $("#kat3").attr("disabled", true);
    } else  {
        if ($("#kat1").not(":checked") && $("#kat2").not(":checked"))    {
            $("#kat3").attr("disabled", false);
        }
    }
});

$("#kat3").change(function(){
    if(this.checked) {
        $("#kat1").attr("disabled", true);
        $("#kat2").attr("disabled", true);
        $("#kat4").attr("disabled", true);
    } else  {
        $("#kat1").attr("disabled", false);
        $("#kat2").attr("disabled", false);
        $("#kat4").attr("disabled", false);

    }
});