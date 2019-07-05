
namespace ies {

    export class AppContainer extends eui.UILayer {

        // public startScreen: StartScreen = new StartScreen();
        public gameScreen: GameScreen = new GameScreen();

        public constructor() {
            super();
            this.alpha = 0;
        }

        public applyGameScreenFilter() {
            const filter = new egret.BlurFilter(6, 6, 0);
            [1, 2, 3, 4].forEach(v => {
                this.gameScreen[`blurFilter${v}`].filters = [filter];
            });
        }

        public resetGameScreenFilter() {
            [1, 2, 3, 4].forEach(v => {
                this.gameScreen[`blurFilter${v}`].filters = [];
            });
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
        public showCatalogWindow(data): void {
            if (!this.catalogWindow) {
                this.catalogWindow = new CatalogWindow();
            }
            if (!!data) {
                this.catalogWindow.toLastScroll();
            }
            this.addChild(this.catalogWindow);
            this.catalogWindow.show();
            this.applyGameScreenFilter();
        }

        public alertWindow: AlertWindow;
        public showAlertWindow(data): void {
            if (!this.alertWindow) {
                this.alertWindow = new AlertWindow();
            }
            this.addChild(this.alertWindow);
            this.alertWindow.setWindowMsg(data);
            this.alertWindow.show();
        }

        public imagePreviewWindow: ImagePreviewWindow;
        public showImagePreviewWindow(data): void {
            if (!this.imagePreviewWindow) {
                this.imagePreviewWindow = new ImagePreviewWindow();
            }
            this.addChild(this.imagePreviewWindow);
            this.imagePreviewWindow.setImageRes(data);
            this.imagePreviewWindow.show();
        }
        
        public tutorialWindow: TutorialWindow;
        public showTutorialWindow(): void {
            if (!this.tutorialWindow) {
                this.tutorialWindow = new TutorialWindow();
            }
            this.addChild(this.tutorialWindow);
            this.applyGameScreenFilter();
        }

        public cardsWindow: CardsWindow;
        public showCardsWindow(): void {
            if (!this.cardsWindow) {
                this.cardsWindow = new CardsWindow();
            }
            this.addChild(this.cardsWindow);
            this.cardsWindow.show();
        }

        public cardsGameWindow: CardsGameWindow;
        public showCardsGameWindow(): void {
            if (!this.cardsGameWindow) {
                this.cardsGameWindow = new CardsGameWindow();
            }
            this.addChild(this.cardsGameWindow);
            this.cardsGameWindow.show();
        }

        public cardsGameRuleWindow: CardsGameRuleWindow;
        public showCardsGameRuleWindow(): void {
            if (!this.cardsGameRuleWindow) {
                this.cardsGameRuleWindow = new CardsGameRuleWindow();
            }
            this.addChild(this.cardsGameRuleWindow);
            this.cardsGameRuleWindow.show();
        }

    }
}