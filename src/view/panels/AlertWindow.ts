
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
            this.width = this.stage.stageWidth;
            // this.scaleX = this.stage.stageWidth / 1920;

            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }

        public btnCommon: eui.Group;
        public btnLabel: eui.Group;

        public btnConfirm: eui.Button;
        public msg: string;
        public confirmLabel: string;
        public cancelLabel: string;
        public cbk: () => {};

        public setWindowMsg(data: { msg: string, cbk?: () => {}, confirmLabel?: string, cancelLabel?: string }) {
            console.log(data);
            this.msg = data.msg;
            this.cbk = data.cbk;
            this.confirmLabel = data.confirmLabel || "确认";
            this.cancelLabel = data.cancelLabel || "取消";
            if (!data.confirmLabel) {
                this.btnLabel.visible = false;
                this.btnCommon.visible = true;
            }
            else {
                this.btnLabel.visible = true;
                this.btnCommon.visible = false;
            }
        } 
    }
}