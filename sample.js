var x = 0; //指の位置(x座標)
var y = 0; //指の位置(y座標)
var win_width; //ウィンドウの横サイズ
var win_height; //ウィンドウの縦サイズ

var moai; //モアイの情報
var width; //モアイの横サイズ
var height; //モアイの縦サイズ

var gomibako; //ゴミ箱の情報
var g_width; //ゴミ箱の横サイズ
var g_height; //ゴミ箱の縦サイズ
var random_x;
var random_y;
var gmRect;

var count_num;
var count = 0;

// 初期設定
function initDefine() {
    win_width = window.innerWidth; //ウィンドウの横サイズ
    win_height = window.innerHeight; //ウィンドウの縦サイズ

    moai = document.getElementById("cha");
    moai.style.position = "fixed";
    width = moai.offsetWidth; //モアイの横サイズ
    height = moai.offsetHeight; //モアイの縦サイズ
    moai.style.top = (win_height*4/5)+"px"; //モアイ位置設定(上)
    moai.style.left = ((win_width/2)-(width/2))+"px"; //モアイ位置設定(左)
    moai.addEventListener("touchstart", touchStatEvent); // モアイに指が触れたときの処理を追加
    moai.addEventListener("touchmove", touchMoveEvent); // 画面上で指を移動させているきの処理を追加
    moai.addEventListener("touchend", touchEndEvent); // モアイから指が離れたときの処理を追加

    gomibako = document.getElementById("gm");
    gomibako.style.position = "absolute";
    g_width = gomibako.offsetWidth; //ゴミ箱の横サイズ
    g_height = gomibako.offsetHeight; //ゴミ箱の縦サイズ
    random_x = Math.floor( Math.random()*(win_width-g_width));
    random_y = Math.floor( Math.random()*(win_height-height-g_height-(win_height/5)))+height;
    gomibako.style.left = random_x +"px"; //ゴミ箱の位置(左)
    gomibako.style.top = random_y +"px"; //ゴミ箱の位置(上)
    gmRect = gm.getBoundingClientRect();

    count_num = document.getElementById("count_txt");
    count_num.style.position = "absolute";
    count_num.style.left = (gmRect.left+(g_width/2)-(count_num.offsetWidth/2))+"px";
    count_num.style.top = (gmRect.top+(g_height/2)-(count_num.offsetHeight/2))+"px";
}

// window(HTML)の読み込みが完了してから初期設定
window.onload = initDefine();

// モアイに指が触れたときの処理を定義
function touchStatEvent(e) {
    //スクロール無効化
    e.preventDefault();
    moai.style.position = "absolute";
    document.getElementById("text").innerHTML = "え、";
};

// 画面上で指を移動させているきの処理を定義
function touchMoveEvent(e) {
    // スクロール無効化
    e.preventDefault();
    // 指が触れた位置のx,y座標を記録
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
    // フリック中のアニメーション＋スタイル
    moai.style.left = (x-width/2) +"px";
    moai.style.top = (y-height/2) +"px";
    moai.classList.add('buruburu'); //振動するclassを追加
    document.getElementById("text").innerHTML = "わーはなせー";
};

// モアイから指が離れたときの処理を定義
function touchEndEvent(e) {
    // スクロール無効化
    e.preventDefault();
    moai.classList.remove('buruburu'); //振動するclassを削除
    const messages = ["うわー","あれまー","さよならー"];
    const messageNo = Math.floor( Math.random()*messages.length );
    if((x>=gmRect.left && x<=(gmRect.left+g_width)) && (y>=gmRect.top && y<=(gmRect.top+g_height))){
        //var cha = document.getElementById("cha");
        moai.classList.add('active'); //class"active"を追加する
        setTimeout('cha.remove()', 1000); //1秒後に削除
        document.getElementById("text").innerHTML = messages[messageNo];
        let dx = (gmRect.left+g_width/2) - x
        let dy = (gmRect.top+g_height/5) - y
        for (let i = 1; i <= 10; i++) {
            moai.style.left = (x-width/2)+dx*(i/10) +"px";
            moai.style.top = (y-height/2)+dy*(i/10) +"px";
        }
        setTimeout('addCharacter()', 1000); //1秒後にモアイ再追加
        setTimeout('initDefine()', 1000); //1秒後に再設定
    }else{
        document.getElementById("text").innerHTML = "モアイを動かしてください";
    }
};

// モアイを追加する関数
function addCharacter() {
    var newElement = document.createElement("img"); // p要素作成
    newElement.setAttribute("id","cha"); // img要素にidを設定
    newElement.setAttribute("src","moai.png"); // img要素にsrcを設定
    newElement.setAttribute("width","100px"); // img要素にwidthを設定
    newElement.setAttribute("style","z-index:300"); // img要素にstyleを設定
    var parentDiv = document.getElementById("parent-pic"); // 親要素（div）への参照を取得
    var childGm = document.getElementById("gm"); // 子要素gmへの参照を取得
    parentDiv.insertBefore(newElement, childGm); // 追加
    document.getElementById("text").innerHTML = "モアイを動かしてください";
    count++;
    count_num.innerHTML = count;
}