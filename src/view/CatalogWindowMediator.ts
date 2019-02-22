
namespace ies {

    export class CatalogWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "CatalogWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(CatalogWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");
            
            this.pageView.btnCatalog.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tabChange(e, 0), this);
            this.pageView.btnCollect.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tabChange(e, 1), this);
            this.pageView.btnSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tabChange(e, 2), this);

            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);

            this.pageView.catalogList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.changeIndex, this);
        }

        public async initData() {
            const catalogList = [];
            this.proxy.questionMap.forEach(v => {
                if (!this.proxy.isAnswered(v.id)) {
                    const replaceText = v.sentence.match(/【(.+?)】/)[1].split('').map(i => '■').join('');
                    catalogList[v.id - 1] = v.sentence.replace(/【(.+?)】/, `【${replaceText}】`);
                }
                else {
                    // 已解答
                    catalogList[v.id - 1] = v.sentence.replace(/【|】/g, '');
                }
            });

            this.pageView.catalogList.itemRenderer = CatalogItemRenderer;
            this.pageView.catalogList.dataProvider = new eui.ArrayCollection(catalogList);

        }

        public changeIndex(event: eui.ItemTapEvent) {
            this.pageView.close();
            this.sendNotification(GameProxy.CHANGE_INDEX, event.itemIndex);
        }

        public tabChange(e: egret.TouchEvent, index: number) {
            e.currentTarget.selected = true;
            const titles = ['title-catalog', 'title-collect', 'title-setting'];
            const showType = ['showCatalog', 'showCollect', 'showSetting'];
            this.pageView.titleRes = titles[index];
            showType.forEach((v, i) => {
                this.pageView[v] = i == index ? true : false;
            });
        }

        public get pageView(): CatalogWindow {
            return this.viewComponent;
        }
    }
}