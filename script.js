//script for selementor @ 28-1-2020 .. 4:30pm,

//list of tags
const styleitems = [];
const textitems = [];
const colors = ['grey','black','red','white','yellow','blue','green','orange'];
var currentitem = 'unset';
let istext = true;
let saved1 = 'none';
var undolast = '';
var redolast = '';
let append_adjacend= true;

$(document).ready(function(){
    console.log('document ready');
//if nothing on screen disable buttons
    //if(!($("#screen").val())) { $("input, #tools-section > button").attr("disabled","disabled"); }
//show and hide menu
    $('#allitems').on({
        click: function(){
            $(this).attr('src','close.svg');
            $(this).css('transform','rotate(90deg)');
            $('.box_container').toggle(900);
        },
        mouseleave: function() {
            $(this).attr('src','add.svg');
            $(this).css('transform','rotate(0deg)')
        }
    });

//toggle if box selected
    $('.boxitems').click(function(){
        $('.box_container').toggle(500);
    });

//settings toggle
    $('.toggle-settings').click(function(){
        $('.settings-menu').toggleClass('show-hide-settings');
    });

//bold, italics, undrline .. toggle
    $('.text-bold,.text-italic,.text-underline,.text-upper,.text-lower,.style-static,.style-relative,.style-absolute,.style-fixed').click(
        function(){
        $(this).toggleClass('active');
    });

//sidebar toggle
$('#items-structure').click(function(){
        $('#my_sidebar').toggle();
    });

});

//create and insert items to screen
function create(item,e) {
    console.log('creating '+item);
    if(!item || typeof item == "Number") return false;
    let me = document.createElement(item);
    $(me).attr('ondblclick','editme(event)');
    istext = e || false ;
    clearvalues();
    applydefaults(me);
    insertme(me);
    currentitem = me;
    me = "";
}

//apply default styles to created items
function applydefaults(g) {
    let c = Math.floor(Math.random()*colors.length);
    console.log("applying defaults to "+g);
    g.style.borderRadius = '4px';
    if(istext) {
        g.textContent = "edit text here";
        $("#t_content").focus();
    }
    else {
        if(g=='img') {
            console.log('image inserted : special'+g);
            setimgvalues();
         } else {
            console.log('html object inserted ');
            g.style.width = "100px";
            g.style.height = "30px";
            $(g).css('backgroundColor',colors[c]);
         }
    }
}

//insert item as per in or out
function insertme(me) {
    if($("#screen").html()) {
        let toinsert = prompt("inside or outside current item ..","outside");
        append_adjacend = !(toinsert===null) ? true : false ;
        //console.log("append_adjacend is :"+append_adjacend);
        //console.log("currentitem is :"+currentitem);
        //console.log("me is :"+me);
        (append_adjacend) ? $("#screen").append(me) : $(currentitem).append(me);
    }
    else { $("#screen").append(me); }
}


//set values for image
function setimgvalues() {
    $(currentitem).css('width','300px');
    $(currentitem).css('height','auto');
    x = prompt('please enter source location of your image ... or use sample image.','sample.png');
    if(x==null) {$(currentitem).attr('src','sample.png');}
    else {$(currentitem).attr('src',x);}
    console.log('src set to '+x);
}


//updates text decoration and style decoration
function updateitems(tvalue) {
    console.log("updated text-section "+tvalue);
    //if(tvalue=='bold') {currentitem.style.fontWeight='bold';}
    switch (tvalue) {
        case 'bold': $(currentitem).toggleClass('t-bold'); break;
        case 'italic': $(currentitem).toggleClass('t-italic'); break;
        case 'underline': $(currentitem).toggleClass('t-underline'); break;
        case 'upper': $(currentitem).toggleClass('t-upper'); break;
        case 'lower': $(currentitem).toggleClass('t-lower'); break;
    }
}

//save all to a variable 
function saveall() {
    saved1 = $('#screen').html();
    console.log('..saved all ..');
    $("#mymodal").slideDown(300);
    setTimeout(closemymodal ,900);
}

function closemymodal() {$("#mymodal").slideUp(300);}

//view all current work
function viewall() {
    let currentwork = $('#screen').html();
    alert(currentwork||saved1);
}

//opens PICTOR text editor
function newTextEditor() {
    window.open("file:///D:/SAMPLES/PICTOR/PICTOR_ANIMATED/index.html");
    console.log('opened PICTOR in new window');
}

//opens ANIMATOR
function newPicEditor() {
    window.open("file:///D:/SAMPLES/ANIMATOR/index.html");
    console.log('opened ANIMATOR in new window');
}

//selects item to be edited
function editme(event) {
    console.log('currentitem selected as '+event.target);
    currentitem = event.target;
    //currentitem.style.boxShadow = '4px 4px 4px ' + colors[3];
    $(currentitem).toggle(100).toggle(160);
    clearvalues();
}

//clears the screen and entered values;
function resetall() {
    $('#screen').empty();
    clearvalues();
    console.log('..........screen reset , cleared all........');
}

//removes last inserted tag
function undo() {
    undolast = document.getElementById("screen").lastElementChild;
    console.log("undo "+undolast);
    document.getElementById("screen").removeChild(undolast);
}

//adds last removed tag
function redo() {
    redolast = undolast;
    console.log("redo "+undolast);
    $('#screen').append(redolast)
}

//clear all input fields 
function clearvalues() {
    $('ul li input').val('');
    $('ul li button').removeClass('active');
    $('.text-section input').val('');
    $('.text-section button').removeClass('active');
}

//set contrast level for ui elements
function setcontrast(val) {
    let opacity_val = val / 100;
    console.log(opacity_val);
    $("#tools-section").css("opacity",opacity_val);
    $(".text-section").css("opacity",opacity_val);
    //$("#tools-section").css("backgroundColor","rgba(128, 128, 128,"+opacity_val+")");
    //$(".text-section").css("backgroundColor","rgba(165, 42, 42,"+opacity_val+")");
    if (val<=20) {
        $("#tools-section").css("border","none");
    } else $("#tools-section").css("borderBottom","8px solid black");
}

//sets color scheme
function setcolorscheme(scheme) {
    switch (scheme) {
        case "dark":
            applymecolors("rgba(82, 72, 72, 0.9)","rgba(146, 122, 122, 0.308)","black","darkgrey","rgb(128,128,128)","rgb(70,47,47)","rgba(165, 42, 42, 1)","rgba(156, 65, 65, 0.87)");
            $("body,body *").css("color","white");
            //$(".style-undo,.style-redo").css("background","transparent");
            break;
        case "bright":
            applymecolors("#e1e1e1","","cornsilk","black","gainsboro","#adbfc0","rgba(178, 143, 143, 0.67)","wheat");
            $("body,body *").css("color","black");
            break;
        case "light":
            applymecolors("blue","skyblue","grey","green","yellow","lightblue","darkblue","green");
            $("body,body *").css("color","white");
            //$(".style-undo,.style-redo").css("background","transparent");
            break;
    }
}

//apply colors of selected theme
function applymecolors(color1,color2,color3,color4,color5,color6,color7,color8) {
    $(".base-container").css("backgroundColor",color1);
    $("#screen").css("backgroundColor",color2);
    $(".myitems").css("backgroundColor",color3);
    $(".myitems").css("color",color4);
    $("#tools-section").css("backgroundColor",color5);
    $("#tools-section > ul li").css("backgroundColor",color6);
    $(".text-section").css("backgroundColor",color7);
    $(".text-section *").css("backgroundColor","rgba(50, 57, 67, 1)");
    $("#tools-section > ul li input,#tools-section > ul li button").css("backgroundColor",color8);
    //$(".style-undo,.style-redo").css("background","transparent");
    // let thisitems = ["#screen",".myitems","#tools-section","#tools-section > ul li",".text-section *"];
    // for (i=0; i<8; i++) {
    //     nowcolor = color+i+1;
    //     $(thisitems[i]).css("backgroundColor",nowcolor);
    // }
    console.log("...color theme applied...");
}

function newtabview () {
    let tempcolor = "red";
    let newview = "";
    let previewme = "";
    tempcolor = $("#screen").html() ? "lightgreen" : "yellow";
    $("#newtab-view").css("backgroundColor",tempcolor);
    console.log("opening screen view in new tab");
    if($("#screen").html()) {
        newview = window.open("","","toolbar=no, location=no, status=no, width=600, height=400");
        newview.document.write($("#screen").html()||saved1);
        newview.focus();
    } else alert("no contents to view");
}

function user_code() {
    let val1 = $("#usrcd1").val();
    let val2 = $("#usrcd2").val();
    if(val1!=="" && val2!=="") {
        $(currentitem).css(val1,val2);
        console.log(val1+'something went wrong'+val2)
    } else console.log('something went wrong')
}


//checking database support
// function checkingme () {
//     var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
//     db.transaction(function (tx) {
//     tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
//     tx.executeSql('INSERT INTO LOGS (id,log) VALUES (?, ?'), [colors[0], colors[1]];
//     });
//     console.log('created database'+db);
// }