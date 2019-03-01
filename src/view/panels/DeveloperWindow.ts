
namespace ies {

    export class DeveloperWindow extends eui.Component {

        public constructor() {
            super();

            this.name = "developerWindow";
            this.skinName = "skins.ies.DeveloperWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backClick, this);
        }

        public btnBack: eui.Button;

        public backClick() {
            this.visible = false;
            ApplicationFacade.getInstance().sendNotification(GameProxy.HIDE_DEV_WINDOW, false);
        }
    }
}