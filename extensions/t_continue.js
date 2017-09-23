//canvas正男 Tボタンの動作変更拡張
CanvasMasao.TContinue = (function(){
    var TContinue = {};

    TContinue.inject = function(mc, options){
        var _ui = mc.userInit, _us = mc.userSub;
        // リセットを行うフラグ
        var reset_flag = false;
        // 本当に戻りたいフラグ
        var disable_count = 0;
        // ステージ画面とばすフラグ
        var jump_flag = false;

        mc.userInit = function(){
            _ui.apply(mc);
            // GameKeyを乗っ取る
            var gk = mc.gk;
            var _keyPressed = gk.keyPressed,
                _keyReleased= gk.keyReleased;

            gk.keyPressed = function(paramKeyEvent){
                var code = paramKeyEvent.keyCode;
                _keyPressed.apply(gk, arguments);
                if (code === 84 && (mc.mp.ml_mode === 91 || mc.mp.ml_mode === 100)){
                    // Tキーを妨害
                    gk.key_code = 0;
                    reset_flag = true;
                } else if ((code === 32 || code === 90) && mc.mp.ml_mode === 91){
                    // ジャンプ
                    jump_flag = true;
                }
            };
            gk.keyReleased= function(paramKeyEvent){
                _keyReleased.apply(gk, arguments);
            };
        };
        mc.userSub = function(){
            _us.apply(mc, arguments);
            if (reset_flag) {
                reset_flag = false;

                if (mc.mp.ml_mode === 91){
                    // ステージ番号画面
                    if (++disable_count >= 3){
                        // 3連打したので本当に戻る
                        mc.mp.ml_mode = 50;
                    }
                    return;
                }

                disable_count = 0;
                if (mc.mp.ml_mode === 100){
                    // リセットが要請されている
                    if (--mc.mp.j_left >= 0){
                        // まだ残機がある
                        mc.mp.ml_mode = 90;
                    } else {
                        mc.mp.j_left = 0;
                        mc.mp.ml_mode = 50;
                    }
                }
            } else if (jump_flag){
                jump_flag = false;

                if (mc.mp.ml_mode === 91){
                    mc.mp.ml_mode_c = mc.mp.mode_wait_stagestart;
                }
            }
        };
    };

    return TContinue;
})();
