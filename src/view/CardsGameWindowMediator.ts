
namespace ies {

    export class CardsGameWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "CardsGameWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(CardsGameWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");
            
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);

            this.pageView.btnGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.runGame, this);
            this.pageView.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRule, this);
            this.pageView.overlay.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.pageView.ruleGroup.visible = false;
            }, this);
            this.pageView.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmSelected, this);
            this.pageView.btnResult.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showResult, this);
            this.pageView.btnPrev.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.changePage(-1), this);
            this.pageView.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.changePage(1), this);
        }

        public async initData() {
            if (!this.shouldReset) return;
            this.pageView.buttonGroup.visible = true;
            this.pageView.ruleGroup.visible = false;
            this.pageView.gameGroup.visible = false;
        }

        public showRule() {
            this.pageView.ruleGroup.visible = true; 
        }

        private pageIndex: number = 1;
        private pageTotal: number = 8;
        public changePage(n: number) {
            const index = this.pageIndex + n;
            if (index > this.pageTotal || index < 1) {
                return;
            }
            else {
                this.pageIndex = index;
                this.pageView.pageLabel = `${this.pageIndex}/${this.pageTotal}`;
            }
        }

        private shouldReset: boolean;
        private cardsList: Array<any>;
        private showCardsList: Array<any>;
        public runGame() {
            this.pageView.gameGroup.visible = true;
            this.pageView.buttonGroup.visible = false;
            this.cardsList = [];
            // ["", "", ""].map(i => {});
            for(let i = 1; i <= 3; i++) {
                const o = {
                    res: "",
                    type: "",
                    isBack: false,
                    text: i
                }
                this.cardsList.push(o);
            }
            this.showCardsList = [ ...this.cardsList ];
            this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
            this.pageView.cardsList.dataProvider = new eui.ArrayCollection(this.showCardsList);
            this.pageView.cardsList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.selectCard, this);
            this.pageView.btnConfirm.visible = true;
            this.pageView.tips = "请项子远玩家从九张标记卡中随机抽一张查看并暗置一旁，然后从下方选出与抽到的标记卡同组的画卷卡，此卡在游戏中代表真品";
            this.shouldReset = false;
        }

        private selectedItem: any;
        selectCard(event: eui.ItemTapEvent) {
            this.selectedItem = event.item;
            this.showCardsList.forEach(i => {
                if (i.text == event.item.text) {
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
            if (!this.selectedItem) return;
            if (this.pageView.cardsList.numElements == this.cardsList.length) { //选择真品
                this.cardsList.forEach(i => {
                    i.isSelected = false;
                    if (i.text == this.selectedItem.text) {
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
                this.showCardsList = [];
                this.cardsList.forEach(i => {
                    i.isSelected = false;
                    if (i.text == this.selectedItem.text) {
                        i.type = "赝";
                        i.isBack = false;
                    }
                    if (i.type != "真") {
                        this.showCardsList.push(i);
                    }
                });
                this.cardsList.find(i => !i.type).type = "仿";
                this.pageView.cardsList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.selectCard, this);
                this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
                this.pageView.cardsList.dataProvider = new eui.ArrayCollection(this.showCardsList);

                egret.setTimeout(() => {
                    this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
                    this.pageView.cardsList.dataProvider = new eui.ArrayCollection([]);
                    this.pageView.btnConfirm.visible = false;
                    this.pageView.btnResult.visible = true;
                }, this, 2000)
            }
            this.selectedItem = null;
        }

        public showResult() {
            this.pageView.btnResult.visible = false;
            this.cardsList.forEach(i => i.isBack = false);
            this.pageView.cardsList.itemRenderer = CardsGameItemRenderer;
            this.pageView.cardsList.dataProvider = new eui.ArrayCollection(this.cardsList);
            this.shouldReset = true;
        }

        public get pageView(): CardsGameWindow {
            return this.viewComponent;
        }
    }
}