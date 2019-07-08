
namespace ies {

    export class CollectWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "CollectWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(CollectWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");

            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);
            this.pageView.listImage1.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tapItem, this);
            this.pageView.listImage2.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tapItem, this);
            this.pageView.listImage3.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tapItem, this);
        }

        public async initData() {
            const collectList = [[], [], []];
            for (let i = 1; i <= 22; i++) {
                collectList[0][i - 1] = this.proxy.isAnswered(i) ? `collect-min-${i}` : '';
            }
            for (let i = 23; i <= 28; i++) {
                collectList[1][i - 23] = this.proxy.isAnswered(i) ? `collect-min-${i}` : '';
            }
            for (let i = 29; i <= 30; i++) {
                collectList[2][i - 29] = this.proxy.isAnswered(i) ? `collect-min-${i}` : '';
            }

            this.pageView.showHiddenCollect = !!collectList[2].filter(i => i).length; //显示隐藏收藏
            let totalCollect = 0, collected = 0;
            totalCollect += collectList[2].length;
            collected += collectList[2].filter(i => i).length;
            for (let i = 0; i < 2; i++) {
                totalCollect += collectList[i].length;
                collected += collectList[i].filter(i => i).length;

                this.pageView[`listImage${i + 1}`].dataProvider = new eui.ArrayCollection(collectList[i]);
                this.pageView[`listImage${i + 1}`].itemRenderer = CollectImageItemRenderer;
                this.pageView[`collectRate${i + 1}`].text = collectList[i].length ? `${collectList[i].filter(i => i).length}/${collectList[i].length}` : '';
            }
            if (this.pageView.showHiddenCollect) {
                this.pageView.listImage3.dataProvider = new eui.ArrayCollection(collectList[2]);
                this.pageView.listImage3.itemRenderer = CollectImageItemRenderer;
                this.pageView.collectRate3.text = collectList[2].length ? `${collectList[2].filter(i => i).length}/${collectList[2].length}` : '';
            }
            const capsNums = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            const percent = Math.floor((collected / totalCollect) * 100);
            const num1 = Math.floor(percent / 10);
            const num2 = percent % 10;
            this.pageView.progressTitle.text = `零`;
            this.pageView.progressWidth = 1240 * percent / 100;
            if (num1 === 10) {
                this.pageView.progressTitle.text = "百";
            }
            else if (num1 || num2) {
                this.pageView.progressTitle.text = `${!num1 ? '' : capsNums[num1] + '十'}${!num2 ? '' : capsNums[num2]}`;
            }
        }

        public tapItem(e: eui.ItemTapEvent) {
            if (e.item) {
                this.proxy.playEffect("crowd-change_mp3");
                this.sendNotification(SceneCommand.SHOW_IMGPRE_WINDOW, e.item.replace('-min', ''));
            }
        }

        public get pageView(): CollectWindow {
            return this.viewComponent;
        }
    }
}