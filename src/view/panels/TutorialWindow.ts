
namespace ies {

    export class TutorialWindow extends BasePanel {

        public tipsLabel: eui.Label;

        public constructor() {
            super();

            this.name = "TutorialWindow";
            this.skinName = "skins.ies.TutorialWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            // this.overlay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new TutorialWindowMediator(this));
        }

    }
}