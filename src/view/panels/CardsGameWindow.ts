
namespace ies {

    export class CardsGameWindow extends BasePanel {

        public gameGroup: eui.Group;
        public cardsList: eui.List;
        public buttonGroup: eui.Group;
        public btnResult: eui.Button;
        public btnConfirm: eui.Button;
        public btnGame: eui.Button;
        public tips: string;

        public constructor() {
            super();

            this.name = "cardsGameWindow";
            this.skinName = "skins.ies.CardsGameWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.width = this.stage.stageWidth;
            // this.scaleX = this.stage.stageWidth / 1920;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new CardsGameWindowMediator(this));
        }

    }
}