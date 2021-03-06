
namespace ies {

    export class CardsGameWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "CardsGameWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(CardsGameWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");
            
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);
            this.initData();

            this.pageView.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmSelected, this);
            this.pageView.btnResult.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showResult, this);
            this.pageView.btnGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.initData, this);
        }

        public async initData() {
            if (this.isStarted) return;
            this.cardsList = [];
            // ["", "", ""].map(i => {});
            for(let i = 1; i <= 3; i++) {
                const o = {
                    res: `card-img${i}`,
                    isBack: false,
                    type: ""
                }
                this.cardsList.push(o);
            }
            this.showCardsList = [ ...this.cardsList ];
            this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
            this.pageView.cardsList.dataProvider = new eui.ArrayCollection(this.showCardsList);
            this.pageView.cardsList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.selectCard, this);
            this.pageView.btnResult.visible = this.pageView.btnGame.visible = false;
            this.pageView.btnConfirm.visible = true;
            this.pageView.tips = "请项子远玩家从九张标记卡中随机抽一张查看并暗置一旁，然后从下方选出与抽到的标记卡同组的画卷卡，此卡在游戏中代表真品";
            this.isStarted = true;
            this.isLastConfirm = false;
        }

        private isStarted: boolean;
        private isLastConfirm: boolean;
        private cardsList: Array<any>;
        private showCardsList: Array<any>;

        private selectedItem: any;
        selectCard(event: eui.ItemTapEvent) {
            this.selectedItem = event.item;
            this.showCardsList.forEach(i => {
                if (i.res == event.item.res) {
                    i.isSelected = true;
                }
                else {
                    i.isSelected = false;
                }
            });
            this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
            this.pageView.cardsList.dataProvider = new eui.ArrayCollection(this.showCardsList);
        }

        public confirmSelected() {
            if (this.isLastConfirm) {
                this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
                this.pageView.cardsList.dataProvider = new eui.ArrayCollection([]);
                this.pageView.tips = "游戏最后点击揭示真相。";
                this.pageView.btnConfirm.visible = false;
                this.pageView.btnResult.visible = true;
            }
            this.proxy.playEffect("btn-confirm_mp3");
            if (!this.selectedItem) return;
            if (this.pageView.cardsList.numElements == this.cardsList.length) { //选择真品
                this.cardsList.forEach(i => {
                    i.isSelected = false;
                    if (i.res == this.selectedItem.res) {
                        i.type = "真"
                    }
                });
                this.showCardsList = [];
                this.cardsList.forEach(i => {
                    i.isBack = true;
                    if (!i.type) {
                        this.showCardsList.push(i);
                    }
                });
                this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
                this.pageView.cardsList.dataProvider = new eui.ArrayCollection(this.showCardsList);
                this.pageView.tips = "请许一城玩家从下方选一张独自查看，此卡在游戏中代表赝品";
            }
            else { //选择赝品
                this.pageView.tips = "";
                this.cardsList.forEach(i => {
                    i.isSelected = false;
                    if (i.res == this.selectedItem.res) {
                        i.type = "赝";
                        i.isBack = false;
                    }
                });
                this.cardsList.find(i => !i.type).type = "仿";
                this.pageView.cardsList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.selectCard, this);
                this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
                this.pageView.cardsList.dataProvider = new eui.ArrayCollection(this.showCardsList);
                this.isLastConfirm = true;
            }
            this.selectedItem = null;
        }

        public showResult() {
            this.pageView.btnResult.visible = false;
            this.pageView.btnGame.visible = true;
            this.cardsList.forEach(i => i.isBack = false);
            this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
            this.pageView.cardsList.dataProvider = new eui.ArrayCollection(this.cardsList);
            this.isStarted = false;
        }

        public get pageView(): CardsGameWindow {
            return this.viewComponent;
        }
    }
}