
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
            for (let i = 1; i <= 20; i++) {
                const v = this.proxy.questionMap.get(i.toString());
                catalogList[v.id - 1] = {
                    res: v.catalogRes,
                    maskOffsetX: 0,
                    maskRes: ''
                }
                if (!this.proxy.isAnswered(v.id)) {
                    const maskStart = v.sentence.indexOf('【');
                    catalogList[v.id - 1].maskOffsetX = (maskStart == 2 ? maskStart * 85 : maskStart * 75) || 5;
                    catalogList[v.id - 1].maskRes = `catalog-inkMark${v.sentence.match(/【(.+?)】/)[1].length}`;
                }
            }
            if (this.proxy.isShowFinalTowQuestion()) {
                let showFinalButton = true;
                this.pageView.showFinalTow = false;
                [21, 22].forEach(i => {
                    const v = this.proxy.questionMap.get(i.toString());
                    catalogList[v.id - 1] = {
                        res: v.catalogRes,
                        maskOffsetX: 0,
                        maskRes: ''
                    }
                    if (!this.proxy.isAnswered(v.id)) {
                        const maskStart = v.sentence.indexOf('【');
                        catalogList[v.id - 1].maskOffsetX = (maskStart == 2 ? maskStart * 85 : maskStart * 75) || 5;
                        catalogList[v.id - 1].maskRes = `catalog-inkMark${v.sentence.match(/【(.+?)】/)[1].length}`;
                        showFinalButton = false;
                    }
                });
                this.pageView.btnFinal.visible = showFinalButton;
                this.pageView.showFinalTow = !showFinalButton;
            }

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