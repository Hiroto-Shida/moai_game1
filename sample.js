var x = 0; //指の位置(x座標)
var y = 0; //指の位置(y座標)
var win_width; //ウィンドウの横サイズ
var win_height; //ウィンドウの縦サイズ

var gomibako = document.getElementById("gm");
gomibako.style.position = "absolute";
var random_x;
var random_y;
var gmRect;
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
    win_width = window.outerWidth; //ウィンドウの横サイズ
    win_height = window.outerHeight; //ウィンドウの縦サイズ
    width = moai.offsetWidth; //モアイの横サイズ
    height = moai.offsetHeight; //モアイの縦サイズ
    g_width = gomibako.offsetWidth; //ゴミ箱の横サイズ
    g_height = gomibako.offsetHeight; //ゴミ箱の縦サイズ

    random_x = Math.floor( Math.random()*(win_width-(g_width*2)) ) +g_width;
    random_y = Math.floor( Math.random()*(win_height-(g_height*2)) ) +g_height;
    gomibako.style.left = random_x +"px"; //ゴミ箱の位置(左)
    gomibako.style.top = random_y +"px"; //ゴミ箱の位置(上)
    gmRect = gm.getBoundingClientRect()
};

// モアイに指が触れたときの処理を定義
moai.addEventListener("touchstart", function(e) {
    //スクロール無効化                                      
    e.preventDefault();
    win_width = window.outerWidth; //ウィンドウの横サイズ
    win_height = window.outerHeight; //ウィンドウの縦サイズ
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
