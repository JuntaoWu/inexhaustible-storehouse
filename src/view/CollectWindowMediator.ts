
namespace ies {

    export class CollectWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "CollectWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(CollectWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");

            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);
        }

        public async initData() {
            const titleList = [
                'main-task', 
                // 'branch-task', 
                'crowdfunding-task'
            ];
            const collectMainList = [];
            let collectCrowdList = [];
            this.proxy.questionMap.forEach(v => {
                collectMainList[v.id - 1] = this.proxy.isAnswered(v.id) ? `${v.res}-revealed` : '';
            });
            collectCrowdList = collectMainList.slice(0, 6);
            const list = [];
            list[0] = {
                title: titleList[0],
                imgList: collectMainList
            }
            list[1] = {
                title: titleList[1],
                imgList: collectCrowdList
            }
            this.pageView.collectList.itemRenderer = CollectItemRenderer;
            this.pageView.collectList.dataProvider = new eui.ArrayCollection(list);

        }


        public get pageView(): CollectWindow {
            return this.viewComponent;
        }
    }
}