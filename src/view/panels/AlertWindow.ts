
namespace ies {

    export class AlertWindow extends BasePanel {

        public constructor() {
            super();

            this.name = "alertWindow";
            this.skinName = "skins.ies.AlertWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.close();
                this.cbk && this.cbk();
            },this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }

        public btnConfirm: eui.Button;
        public msg: string;
        public cbk: () => {};

        public setWindowMsg(data: { msg: string, cbk?: () => {} }) {
            console.log(data);
            this.msg = data.msg;
            this.cbk = data.cbk;
        } 
    }
}