
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
            const collectList = [];
            this.proxy.questionMap.forEach(v => {
                collectList[v.id - 1] = v.res.toString();
            });
            console.log(collectList)
            this.pageView.collectList.itemRenderer = CollectItemRenderer;
            this.pageView.collectList.dataProvider = new eui.ArrayCollection(collectList);

        }


        public get pageView(): CollectWindow {
            return this.viewComponent;
        }
    }
}