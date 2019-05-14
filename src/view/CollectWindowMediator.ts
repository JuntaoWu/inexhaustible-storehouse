
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
            const titleList = [
                'main-task', 
                'crowdfunding-task',
                ''
            ];
            const collectList = [[],[],[]];
            for (let i = 1; i <= 22; i++) {
                collectList[0][i - 1] = this.proxy.isAnswered(i) ? `collect-min-${i}` : '';
            }
            for (let i = 23; i <= 28; i++) {
                collectList[1][i - 23] = this.proxy.isAnswered(i) ? `collect-min-${i}` : '';
            }

            this.pageView.showHiddenCollect = this.proxy.playerInfo.showHiddenCollect; //显示隐藏收藏
            let totalCollect = 0, collected = 0;
            for (let i = 0; i < 3; i++) {
                totalCollect += collectList[i].length;
                collected += collectList[i].filter(i => i).length;
                
                this.pageView[`listImage${i+1}`].dataProvider = new eui.ArrayCollection(collectList[i]);
                this.pageView[`listImage${i+1}`].itemRenderer = CollectImageItemRenderer;
                this.pageView[`collectRate${i+1}`].text = collectList[i].length ? `${collectList[i].filter(i => i).length}/${collectList[i].length}` : '';
            }
            const capsNums = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            const percent = Math.floor((collected / (totalCollect + 4)) * 100);
            const num1 = Math.floor(percent / 10);
            const num2 = percent % 10;
            this.pageView.progressTitle.text = `零`;
            this.pageView.progressWidth = 1240 * percent / 100 * 0.9;
            if (num1 || num2) {
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