
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
                collectList[v.id - 1] = this.proxy.isAnswered(v.id) ? `${v.res}-revealed` : '';
            });
            const list = [];
            const titleList = ['main-task', 'branch-task', 'crowdfunding-task'];
            for (let i = 0; i < 3; i++) {
                list[i] = {
                    title: titleList[i],
                    imgList: collectList
                }
            }
            this.pageView.collectList.itemRenderer = CollectItemRenderer;
            this.pageView.collectList.dataProvider = new eui.ArrayCollection(list);

        }


        public get pageView(): CollectWindow {
            return this.viewComponent;
        }
    }
}