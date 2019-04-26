
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
            for (let i = 1; i <= 20; i++) {
                const v = this.proxy.questionMap.get(i.toString());
                collectList[0][v.id - 1] = this.proxy.isAnswered(v.id) ? `${v.res}-revealed` : '';
            }
            collectList[1] = collectList[0].slice(0, 6);
            const list = [];
            let totalCollect = 0, collected = 0;
            for (let i = 0; i < 3; i++) {
                list[i] = {
                    title: titleList[i],
                    imgList: collectList[i]
                }
                totalCollect += collectList[i].length;
                collected += collectList[i].filter(i => i).length;
                
                this.pageView[`listImage${i+1}`].dataProvider = new eui.ArrayCollection(collectList[i]);
                this.pageView[`listImage${i+1}`].itemRenderer = CollectImageItemRenderer;
                this.pageView[`titleRes${i+1}`] = titleList[i];
                this.pageView[`collectRate${i+1}`] = collectList[i].length ? `(${collectList[i].filter(i => i).length}/${collectList[i].length})` : '';
            }
            const capsNums = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            const percent = Math.floor((collected / (totalCollect + 4)) * 100);
            const num1 = Math.floor(percent / 10);
            const num2 = percent % 10;
            this.pageView.progressTitle = `百分之零`;
            this.pageView.progressWidth = 900 * percent / 100;
            if (num1 || num2) {
                this.pageView.progressTitle = `百分之${!num1 ? '' : capsNums[num1] + '十'}${!num2 ? '' : capsNums[num2]}`;
            }
            // this.pageView.collectList.itemRenderer = CollectItemRenderer;
            // this.pageView.collectList.dataProvider = new eui.ArrayCollection(list);

        }

        public tapItem(e: eui.ItemTapEvent) {
            if (e.item) {
                this.sendNotification(SceneCommand.SHOW_IMGPRE_WINDOW, e.item);
            }
        }

        public get pageView(): CollectWindow {
            return this.viewComponent;
        }
    }
}