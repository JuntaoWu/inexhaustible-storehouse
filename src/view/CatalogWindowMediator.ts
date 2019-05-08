
namespace ies {

    export class CatalogWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "CatalogWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(CatalogWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");
            
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);

            this.pageView.btnCatalog.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tabChange(e, 0), this);
            this.pageView.btnCollect.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tabChange(e, 1), this);
            this.pageView.btnSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tabChange(e, 2), this);
            this.pageView.catalogList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.changeIndex, this);
            this.pageView.btnFinal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.finalClick, this);
        }

        public async initData() {
            const catalogList = [];
            for (let i = 0; i < 20; i++) {
                const v = this.proxy.questionMap.get((i+1).toString());
                const replaceText = v.sentence.match(/【(.+?)】/)[1];
                catalogList[i] = {
                    sentence: v.sentence.replace(/【(.+?)】/, replaceText),
                    sideIcon: '',
                    index: i
                }
                if (!this.proxy.isAnswered(v.id)) {
                    const emptyText = replaceText.split('').map(i => ' ').join('');
                    catalogList[i].sentence = v.sentence.replace(/【(.+?)】/, emptyText);
                    catalogList[i].sideIcon = v.sideRes;
                }
            }
            if (this.proxy.isShowFinalTowQuestion()) {
                
                    console.log(catalogList);
                let showFinalButton = true;
                this.pageView.showFinalTow = false;
                [20, 21].forEach(i => {
                    const v = this.proxy.questionMap.get((i+1).toString());
                    const replaceText = v.sentence.match(/【(.+?)】/)[1];
                    catalogList[i] = {
                        sentence: v.sentence.replace(/【(.+?)】/, replaceText),
                        sideRes: '',
                        index: i
                    }
                    if (!this.proxy.isAnswered(v.id)) {
                        catalogList[i].sideRes = v.sideRes;
                        showFinalButton = false;
                    }
                    console.log(catalogList);
                });
                this.pageView.btnFinal.visible = showFinalButton;
                this.pageView.showFinalTow = !showFinalButton;
            }
            this.pageView.catalogList.itemRenderer = SentenceRenderer;
            this.pageView.catalogList.dataProvider = new eui.ArrayCollection(catalogList);
        }

        public changeIndex(event: eui.ItemTapEvent) {
            this.pageView.close();
            this.sendNotification(GameProxy.CHANGE_INDEX, event.itemIndex);
        }

        public tabChange(e: egret.TouchEvent, index: number) {
            this.proxy.playEffect("common-click_mp3");
            e.currentTarget.selected = true;
            const titles = ['title-catalog', 'title-collect', 'title-setting'];
            const showType = ['showCatalog', 'showCollect', 'showSetting'];
            this.pageView.titleRes = titles[index];
            showType.forEach((v, i) => {
                this.pageView[v] = i == index ? true : false;
            });
        }

        public finalClick(e: egret.TouchEvent) {
            this.proxy.playEffect("btn-final_mp3");
        }

        public get pageView(): CatalogWindow {
            return this.viewComponent;
        }
    }
}