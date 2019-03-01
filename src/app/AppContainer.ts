
namespace ies {

    export class AppContainer extends eui.UILayer {

        // public startScreen: StartScreen = new StartScreen();
        public gameScreen: GameScreen = new GameScreen();

        public constructor() {
            super();
            this.alpha = 0;
        }

        public applyGameScreenFilter() {
            this.gameScreen.filters = [new egret.BlurFilter(3, 3, 0)];
        }

        public resetGameScreenFilter() {
            this.gameScreen.filters = [];
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

        public answerWindow: AnswerWindow;
        public showAnswerWindow(data): void {
            if (!this.answerWindow) {
                this.answerWindow = new AnswerWindow();
            }
            this.addChild(this.answerWindow);
            this.answerWindow.setQuestion(data);
            this.answerWindow.show();
            this.applyGameScreenFilter();
        }

        public catalogWindow: CatalogWindow;
        public showCatalogWindow(): void {
            if (!this.catalogWindow) {
                this.catalogWindow = new CatalogWindow();
            }
            this.addChild(this.catalogWindow);
            this.catalogWindow.show();
        }
    }
}