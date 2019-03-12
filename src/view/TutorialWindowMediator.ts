
namespace ies {

    export class TutorialWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "TutorialWindowMediator";

        private proxy: GameProxy;

        private nowIndex: number;

        public constructor(viewComponent: any) {
            super(TutorialWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");
        
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);


        }

        public async initData() {
            this.nowIndex = 0;
            this.showTips();
        }

        public showTips() {
            if (!this.tutorialTips[this.nowIndex]) {
                this.proxy.playerInfo.firstShowTutorial = false;
                this.pageView.close();
                return;
            }
            const nowTips = this.tutorialTips[this.nowIndex];
            const textElements = new egret.HtmlTextParser().parser(nowTips);
            this.pageView.tipsLabel.textFlow = textElements;
            egret.setTimeout(() => {
                this.nowIndex++;
                this.showTips();
            }, this, 2500);
        }

        public get tutorialTips() {
            return [
                "【】画卷上方标题是解谜书中的打油诗，点击右箭头按钮【】或向左滑动画卷【】可以跳转到下一句诗句，请根据<font color=\"0xff0000\">印章</font>找到<font color=\"0xff0000\">对应的诗句，</font>并点击<font color=\"0xff0000\">涂抹处</font>填写答案。",
                "【】点击空格处输入正确答案。对谜题没有解答思路的话可以点击<font color=\"0xff0000\">提示按键</font>提示关键信息。【】输入答案后可点击提交按键检阅对错。【】点击窗口右上角X号按键可以返回上级界面。",
                "【】如果想要查阅整首诗句或者调整音量请点击目录图标。",
                "【】点击目录界面的任意诗句可以直接<font color=\"0xff0000\">跳转到对应画卷</font>【】，收藏界面可查看已解画卷配图，设置界面可以调整音量大小。",
                "教程结束"
            ];
        }

        public get pageView(): TutorialWindow {
            return this.viewComponent;
        }
    }
}