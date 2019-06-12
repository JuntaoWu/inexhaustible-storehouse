
namespace ies {

    export class CardsWindow extends BasePanel {

        public btnGame: eui.Button;
        public btnRule: eui.Button;

        public constructor() {
            super();

            this.name = "cardsWindow";
            this.skinName = "skins.ies.CardsWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            this.btnGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.runGame, this);
            this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRule, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.width = this.stage.stageWidth;
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public showRule() {
            ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_CARDSGAMERULE_WINDOW);
        }

        public runGame() {
            ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_CARDSGAME_WINDOW);
        }

    }
}