function convertDate(date,opr,disp){
    let d = new Date(date);

    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');
    let year = d.getFullYear();

    if(disp == 1){ return [day, month, year].join(opr); }else{ return [year, month, day].join(opr);}
    
}

function convertDateAndTime(date,opr,disp){
    let d = new Date(date);

    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');
    let year = d.getFullYear();

    if(disp == 1){ return [day, month, year].join(opr); }else{ return [year, month, day].join(opr);}
    
}

function convertDisplayToDate(date,oprOp){
    let d = date.split('/');
    
    let day = d[0].trim();
    let month = d[1].trim();
    let year = d[2].trim();

    return [year, month, day].join(oprOp);

}

function setText(item,text){
    $('#'+item).text(text);
    
}

function setValue(item,text){

    $('#'+item).val(text);
    
}

function setImage(item,text){

    $('#'+item).attr("src", text);
}

function setLayout(item,text, jenis_layout){

    $('#'+item).attr("src", text);
    $('#a_'+item).attr("href", text);
    $('#jenis_'+item).html(jenis_layout);
}

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

function appendClassDivByFlag(divName,className,flag){

    switch(flag){
        case 1: $('#'+divName).removeClass(className); break;
        case 2: $('#'+divName).addClass(className); break;
    }

}
