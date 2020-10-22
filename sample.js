var flick_sx = 0;
var flick_sy = 0;
var x = 0;
var y = 0;
var win_width; //ウィンドウの横サイズ
var win_height;

//var win_width = document.documentElement.clientWidth; //ウィンドウの横サイズ
//var win_height = document.documentElement.clientHeight;

var gomibako = document.getElementById("gm");
gomibako.style.position = "absolute";
var random_x = Math.floor( Math.random()*(win_width-(gomibako.offsetWidth*2)) ) +gomibako.offsetWidth;
var random_y = Math.floor( Math.random()*(win_height-(gomibako.offsetHeight*2)) ) +gomibako.offsetHeight;
gomibako.style.left = random_x +"px";
gomibako.style.top = random_y +"px";
var gmRect = gm.getBoundingClientRect();
var g_width;
var g_height;

var moai = document.getElementById("cha");
moai.style.position = "absolute";
//moai.style.width = document.width + "px";
//moai.style.height = document.height + "px";
var width;
var height;

// window(HTML)の読み込みが完了してからサイズ読み込み
window.onload = function(){
    win_width = document.body.offsetWidth; //ウィンドウの横サイズ
    win_height = document.body.offsetHeight; //
    width = moai.offsetWidth;
    height = moai.offsetHeight;
    g_width = gomibako.offsetWidth;
    g_height = gomibako.offsetHeight;
};

// モアイに指が触れたときの処理を定義
moai.addEventListener("touchstart", function(e) {
    //スクロール無効化                                      
    e.preventDefault();
    // 指が触れた位置のx,y座標を記録
//    flick_sx = e.touches[0].pageX;
//    flick_sy = e.touches[0].pageY;
    document.getElementById("text").innerHTML = win_width+","+win_height;
});

// 画面上で指を移動させているきの処理を定義
moai.addEventListener("touchmove", function(e) {
    // スクロール無効化
    e.preventDefault();
    // 指が触れた位置のx,y座標を記録
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;

    // フリック中のアニメーション＋スタイル
    moai.style.left = (x-width/2) +"px";
    moai.style.top = (y-height/2) +"px";
//    document.getElementById("text").innerHTML = g_width+","+g_height;
});

// モアイから指が離れたときの処理を定義
moai.addEventListener("touchend", function(e) {
    // スクロール無効化
    e.preventDefault();
    const messages = ["うわ～","たすけて～","さよなら～"];
    const messageNo = Math.floor( Math.random()*messages.length );
    if((x>=gmRect.left && x<=(gmRect.left+g_width)) && (y>=gmRect.top && y<=(gmRect.top+g_height))){
        var cha = document.getElementById("cha");
        cha.remove();
        document.getElementById("text").innerHTML = messages[messageNo];
    }
});
