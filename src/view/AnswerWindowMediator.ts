
namespace ies {

    export class AnswerWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "AnswerWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(AnswerWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");

            this.pageView.btnTips1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.tipsClick(1), this);
            this.pageView.btnTips2.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.tipsClick(2), this);
            this.pageView.btnTips3.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.tipsClick(3), this);
            this.pageView.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmClick, this);
            // this.pageView.textInputList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.textInputClick, this);
            this.pageView.textInput.addEventListener(egret.Event.CHANGE, this.inputChange, this);
            this.pageView.textInput.addEventListener(egret.Event.FOCUS_OUT, this.inputFocusOut, this);

            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);
        }

        public async initData() {

        }

        public tipsClick(index: number) {
            this.pageView.tips = this.pageView.question[`tips${index}`];
        }

        public confirmClick(event: egret.TouchEvent) {
            if (this.pageView.textInput.text == this.pageView.answerText) {
                this.proxy.addAnswered(this.pageView.question.id);
                this.sendNotification(GameProxy.ANSWERED);
                this.pageView.close();
            }
        }

        public textInputClick(event: egret.TouchEvent) {
            this.pageView.textInput.setFocus();
            this.pageView.textInput.visible = false;
        }

        public inputChange(event: egret.Event) {
            this.pageView.answerText.split('').forEach((v, i) => {
                this.pageView.textList[this.pageView.answerStartIndex + i] = event.target.text.substr(i, 1);
            });
            this.pageView.textInputList.dataProvider = new eui.ArrayCollection(this.pageView.textList);
            this.pageView.textInputList.itemRenderer = TextInputItemRenderer;
        }
        public inputFocusOut(e: egret.Event) {
            this.pageView.textInput.visible = true;
            if (e.target.text.length > this.pageView.answerText.length) {
                e.target.text = e.target.text.substr(0, this.pageView.answerText.length);
            }
        }

        public get pageView(): AnswerWindow {
            return this.viewComponent;
        }
    }
}