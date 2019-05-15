
namespace ies {

    export class DeveloperWindow extends eui.Component {

        public constructor() {
            super();

            this.name = "developerWindow";
            this.skinName = "skins.ies.DeveloperWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        private proxy: GameProxy;
        public createCompleteEvent(event: eui.UIEvent): void {
            this.proxy = ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backClick, this);
            this.btnExtra.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnExtraClick, this);
        }

        public btnBack: eui.Button;

        public backClick() {
            this.proxy.sendNotification(GameProxy.HIDE_DEV_WINDOW);
        }
        
        private btnExtra: eui.Image;
        private tapTime: number;
        private tapStartTime: number;
        private btnExtraClick(event: egret.TouchEvent) {
            if (!this.tapStartTime) {
                this.tapStartTime = new Date().getTime();
                this.tapTime = 0;
                egret.setTimeout(() => {
                    this.tapStartTime = null;
                }, this, 1000);
            }
            this.tapTime += 1;
            if (this.tapTime >= 5) {
                const question = { ...this.proxy.questionMap.get((30).toString()) };
                question.isAnswered = this.proxy.isAnswered(30);
                this.proxy.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW, question);
            }
        }
    }
}