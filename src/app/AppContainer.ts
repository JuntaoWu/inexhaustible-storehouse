
namespace ies {

    export class AppContainer extends eui.UILayer {

        // public startScreen: StartScreen = new StartScreen();
        public gameScreen: GameScreen = new GameScreen();

        public constructor() {
            super();
            this.alpha = 0;
        }

        /**
         * 进入开始页面
         */
        public enterStartScreen(): void {

            // platform.hideAllBannerAds();

            // SoundPool.playBGM("generic-music_mp3");
            // const gameScreen = this.getChildByName("gameScreen");
            // gameScreen && this.removeChild(this.gameScreen);
            this.removeChildren();

            this.addChild(this.gameScreen);
            egret.Tween.get(this).to({ alpha: 1 }, 1500);
        }

        private _answerWindow: AnswerWindow;
        public get answerWindow(): AnswerWindow {
            if (!this._answerWindow) {
                this._answerWindow = new AnswerWindow();
            }
            return this._answerWindow;
        }

        /**
         * 显示AnswerWindow
         */
        public showAnswerWindow(): void {
            this.addChild(this.answerWindow);
            this.answerWindow.show();
        }

    }
}