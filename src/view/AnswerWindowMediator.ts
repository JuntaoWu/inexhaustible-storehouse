
namespace ies {

    export class AnswerWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "AnswerWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(AnswerWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");

            this.pageView.btnTips1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.tipsClick(1), this);
            this.pageView.btnTips2.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.tipsClick(2), this);
            this.pageView.btnTips3.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                if (!this.isShowTips3 && !this.pageView.question.isAnswered && this.pageView.question.tips3) {
                    this.pageView.btnTips3.selected = false;
                    this.sendNotification(SceneCommand.SHOW_ALERT_WINDOW, {
                        msg: "最后提示接近于直接告诉答案，确定查看提示？", 
                        cbk: () => {
                            this.isShowTips3 = true;
                            this.tipsClick(3);
                        }
                    });
                }
                else {
                    this.tipsClick(3);
                }
            }, this);
            this.pageView.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmClick, this);

            this.pageView.textInput.addEventListener(egret.Event.CHANGE, this.inputChange, this);
            this.pageView.textInput.addEventListener(egret.Event.FOCUS_OUT, this.inputFocusOut, this);

            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);
        }

        private isShowTips3: boolean;

        public async initData() {
            this.pageView.textInput.text = "";
            this.pageView.tips = "";
            this.isShowTips3 = false;
            [1, 2, 3].forEach(v => {
                this.pageView[`btnTips${v}`].selected = false;
            });
        }

        public tipsClick(index: number) {
            this.proxy.playEffect("crowd-change_mp3");
            this.pageView.tips = this.pageView.question[`tips${index}`] || "";
            [1, 2, 3].forEach(v => {
                this.pageView[`btnTips${v}`].selected = v == index ? true : false;
            });
        }

        private isConfirm: boolean;
        public confirmClick(event: egret.TouchEvent) {
            if (this.pageView.textInput.text == this.pageView.answerText) {
                this.proxy.addAnswered(this.pageView.question.id);
                this.sendNotification(GameProxy.ANSWERED, this.pageView.question.id);
                this.pageView.close();
            }
            else {
                if (!this.isConfirm) {
                    this.pageView.tips = "答案不对，再想想。。";
                }
                else {
                    this.pageView.tips = "请再认真考虑下,或者点击提示寻求帮助。";
                }
                this.isConfirm = !this.isConfirm;
                [1, 2, 3].forEach(v => {
                    this.pageView[`btnTips${v}`].selected = false;
                });
            }
        }

        public inputChange(event: egret.Event) {
            this.pageView.answerText.split('').forEach((v, i) => {
                this.pageView.textList[this.pageView.answerStartIndex + i] = event.target.text.substr(i, 1);
            });
            this.pageView.textInputList.dataProvider = new eui.ArrayCollection(this.pageView.textList);
            this.pageView.textInputList.itemRenderer = TextInputItemRenderer;
        }
        public inputFocusOut(e: egret.Event) {
            if (e.target.text.length > this.pageView.answerText.length) {
                e.target.text = e.target.text.substr(0, this.pageView.answerText.length);
            }
        }

        public get pageView(): AnswerWindow {
            return this.viewComponent;
        }
    }
}