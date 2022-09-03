enchant();
//プレゼントのクラス
Gifts = Class.create(Sprite, // Spriteクラスを継承
    {
        initialize: function (frame) { //初期化する
            Sprite.call(this, 80, 80); //Spriteオブジェクトを初期化
            this.image = game.assets['gift2.png'];

            // ランダムな場所にフルーツを表示する
            this.x = Math.random() * 320; // Math.random()を使うと0から1未満の
            this.y = Math.random() * 320; // ランダムな小数が得られるのでそれで座標をつくる
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            this.frame = frame;
            game.rootScene.addChild(this);
        },
        onenterframe: function () {
            if (this.within(bear,20)) {
                // 自分自身(フルーツ)を画面から消す
                game.rootScene.removeChild(this);
                score++; //スコアを1足す
            }
        }
    });

//鹿のクラスLeft
DeerLeft = Class.create(Sprite, {
    initialize: function (x, y) {
        Sprite.call(this, 80, 80);
        this.image = game.assets['deer-1.png'];
        this.x = x;
        this.y = y;
        this.frame = 0;
        game.rootScene.addChild(this);

        //衝突したら
        this.addEventListener('enterframe', function () {
            if (bear.within(this, 8)) game.end(game.score, "SCORE: " + game.score)
        });

    },
    //
    onenterframe: function () {
        this.x++;
        if (this.x >= 320) {
            this.x = -40;
        }
    },

});

//鹿のクラスright
DeerRight = Class.create(Sprite, {
    initialize: function (x, y) {
        Sprite.call(this, 80, 80);
        this.image = game.assets['deer-1.png'];
        this.x = x;
        this.y = y;
        this.frame = 0;
        game.rootScene.addChild(this);
        //衝突したら
        this.addEventListener('enterframe', function () {
            if (bear.within(this, 32)) game.end(game.score, "SCORE: " + game.score)
        });

    },
    //
    onenterframe: function () {
        this.x--;
        if (this.x <= -40) {
            this.x = 320;
        }
    },

});

window.onload = function () {
    game = new Game(320, 320);
    game.preload('deer-1.png', "tontu2.png", 'gift2.png', 'background.jpg');
    game.rootScene.backgroundColor = "white";

    
    //スコアを作成
    score = 0;
    var scoreLabel = new Label("SCORE : " + String(score));
    scoreLabel.font = "12px italic"
    scoreLabel.color = "grey";
    scoreLabel.x = 10; // X座標
    scoreLabel.y = 5; // Y座標
    scoreLabel.addEventListener("enterframe", function () {
        scoreLabel.text = "SCORE : " + String(score);
    });
    game.rootScene.addChild(scoreLabel);

    //くまをうごかす
    game.onload = function () {

        //背景
        var bg = new Sprite(320, 320);
        bg.image = game.assets["background.jpg"];
        game.rootScene.addChild(bg);

        //
        game.rootScene.addChild(scoreLabel);


        bear = new Sprite(80, 80);
        bear.image = game.assets["tontu2.png"];
        bear.frame = 0;
        bear.addEventListener("touchstart", function (e) {
            bear.frame += 1;
        });

        bear.addEventListener("touchmove", function (e) {
            bear.x = e.x;
            bear.y = e.y;
            bear.frame += 1;

        });

        bear.addEventListener("touchend", function (e) {
            bear.frame += 1;
        });
        game.rootScene.addChild(bear);

        for (i = 0; i < 10; i++) {
            gifts = new Gifts(15); // 15番(りんご)を表示
            gifts = new Gifts(18); // 18番(メロン)を表示
        };

        //鹿
        deer1 = new DeerLeft(10, 50);
        deer2 = new DeerRight(60, 150);
        deer3 = new DeerLeft(120, 250);
        game.rootScene.addChild(deer1);
        game.rootScene.addChild(deer2);
        game.rootScene.addChild(deer3);

    };


    game.start();

};