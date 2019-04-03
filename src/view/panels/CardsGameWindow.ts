
namespace ies {

    export class CardsGameWindow extends BasePanel {



        public constructor() {
            super();

            this.name = "cardsGameWindow";
            this.skinName = "skins.ies.CardsGameWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.width = this.stage.stageWidth;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new CardsGameWindowMediator(this));
        }

    }
}