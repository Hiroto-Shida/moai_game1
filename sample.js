var x = 0; //指の位置(x座標)
var y = 0; //指の位置(y座標)
var win_width; //ウィンドウの横サイズ
var win_height; //ウィンドウの縦サイズ

var moai = document.getElementById("cha");
moai.style.position = "fixed";
var width; //モアイの横サイズ
var height; //モアイの縦サイズ

var gomibako = document.getElementById("gm");
gomibako.style.position = "absolute";
var g_width; //ゴミ箱の横サイズ
var g_height; //ゴミ箱の縦サイズ
var random_x;
var random_y;
var gmRect;

// window(HTML)の読み込みが完了してからサイズなど読み込み
window.onload = function(){
    win_width = window.innerWidth; //ウィンドウの横サイズ
    win_height = window.innerHeight; //ウィンドウの縦サイズ
    width = moai.offsetWidth; //モアイの横サイズ
    height = moai.offsetHeight; //モアイの縦サイズ
    moai.style.top = (win_height*4/5)+"px";
    moai.style.left = ((win_width/2)-(width/2))+"px";
    g_width = gomibako.offsetWidth; //ゴミ箱の横サイズ
    g_height = gomibako.offsetHeight; //ゴミ箱の縦サイズ
    random_x = Math.floor( Math.random()*(win_width-g_width));
    random_y = Math.floor( Math.random()*(win_height-height-g_height-(win_height/5)))+height;
    gomibako.style.left = random_x +"px"; //ゴミ箱の位置(左)
    gomibako.style.top = random_y +"px"; //ゴミ箱の位置(上)
    gmRect = gm.getBoundingClientRect()
};

// モアイに指が触れたときの処理を定義
moai.addEventListener("touchstart", function(e) {
    //スクロール無効化
    e.preventDefault();
    moai.style.position = "absolute";
    document.getElementById("text").innerHTML = "あ、";
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
    document.getElementById("text").innerHTML = "そうそう、そんなかんじ";
});

// モアイから指が離れたときの処理を定義
moai.addEventListener("touchend", function(e) {
    // スクロール無効化
    e.preventDefault();
    const messages = ["うわーん","たすけてー","さよならー"];
    const messageNo = Math.floor( Math.random()*messages.length );
    if((x>=gmRect.left && x<=(gmRect.left+g_width)) && (y>=gmRect.top && y<=(gmRect.top+g_height))){
        var cha = document.getElementById("cha");
        cha.classList.add('active'); //class"active"を追加する
        setTimeout('cha.remove()', 1000); //1秒後に削除
        document.getElementById("text").innerHTML = messages[messageNo];
        let dx = (gmRect.left+g_width/2) - x
        let dy = (gmRect.top+g_height/5) - y
        for (let i = 1; i <= 10; i++) {
            moai.style.left = (x-width/2)+dx*(i/10) +"px";
            moai.style.top = (y-height/2)+dy*(i/10) +"px";
        }
        setTimeout('addCharacter()', 1200); //1秒後にモアイ再設定
//        setTimeout('location.reload()', 1200); //1秒後リロード
    }else{
        document.getElementById("text").innerHTML = "モアイを動かしてください";
    }
});

function addCharacter() {
    var newElement = document.createElement("img"); // p要素作成
    newElement.setAttribute("id","cha"); // img要素にidを設定
    newElement.setAttribute("src","moai.png"); // img要素にsrcを設定
    newElement.setAttribute("width","100px"); // img要素にwidthを設定
    // 親要素（div）への参照を取得
    var parentDiv = document.getElementById("parent-pic");     
    // 子要素gmへの参照を取得
    var childGm = document.getElementById("gm");
    // 追加
    parentDiv.insertBefore(newElement, childGm);
}