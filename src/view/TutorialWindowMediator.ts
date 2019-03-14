
namespace ies {

    export class TutorialWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "TutorialWindowMediator";

        private proxy: GameProxy;
        private dragonBoneGroup: eui.Group = new eui.Group();
        private _dragonBone: dragonBones.EgretArmatureDisplay;
        public get dragonBone(): dragonBones.EgretArmatureDisplay {
            if (!this._dragonBone) {
                this._dragonBone = DragonBones.createDragonBone("hand", "touch");
                this.dragonBoneGroup.verticalCenter = 0;
                this.dragonBoneGroup.horizontalCenter = 0;
                this.dragonBoneGroup.addChild(this.dragonBone);
            }
            return this._dragonBone;
        }
        private _tutorialJson: Array<any>;
        public get tutorialJson(): Array<any> {
            if (!this._tutorialJson) {
                this._tutorialJson = RES.getRes("tutorial_json") as Array<any>;
            }
            return this._tutorialJson;
        }

        private nowIndex: number;
        private tipsText: string;

        public constructor(viewComponent: any) {
            super(TutorialWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");
        
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);

            this.pageView.titleGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                if (this.tutorialJson[this.nowIndex].action == "wait") {
                    this.reSetUI();
                    this.pageView.answerGroup.visible = true;
                    this.nextOne();
                }
            }, this);
            this.pageView.closeAnswerGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                if (this.tutorialJson[this.nowIndex].action == "wait") {
                    this.reSetUI();
                    this.nextOne();
                }
            }, this);
            this.pageView.btnCatalogGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                if (this.tutorialJson[this.nowIndex].action == "wait") {
                    this.reSetUI();
                    this.pageView.catalogGroup.visible = true;
                    this.nextOne();
                }
            }, this);
        }

        public async initData() {
            const catalogList = [];
            for (let i = 1; i <= 20; i++) {
                const v = this.proxy.questionMap.get(i.toString());
                const maskStart = v.sentence.indexOf('【');
                catalogList[v.id - 1] = {
                    res: v.catalogRes,
                    maskOffsetX: (maskStart == 2 ? maskStart * 85 : maskStart * 75) || 5,
                    maskRes: `catalog-inkMark${v.sentence.match(/【(.+?)】/)[1].length}`,
                    sideIcon: v.sideRes
                }
            }
            this.pageView.catalogList.itemRenderer = CatalogItemRenderer;
            this.pageView.catalogList.dataProvider = new eui.ArrayCollection(catalogList);

            this.reSetUI();
            this.nowIndex = 0;
            this.showTips();
        }

        public reSetUI() {
            this.tipsText = "";
            const effectUIPool = [
                this.pageView.titleGroup, this.pageView.btnNext, 
                this.pageView.scrollerGroup, this.pageView.btnCatalogGroup,
                this.pageView.btnTips1, this.pageView.btnTips2, 
                this.pageView.btnTips3, this.pageView.inputGroup, 
                this.pageView.submitAnswerGroup, this.pageView.closeAnswerGroup,
                this.pageView.btnCatalog, this.pageView.btnCollect,
                this.pageView.btnSetting, this.pageView.sentenceGroup,
                this.pageView.answerGroup, this.pageView.catalogGroup
            ]
            effectUIPool.forEach(i => i.visible = false);
        }

        public showTips() {
            const nowItem = this.tutorialJson[this.nowIndex];
            if (!nowItem) return;

            this.tipsText += nowItem.tips || "";
            const textElements = new egret.HtmlTextParser().parser(this.tipsText);
            this.pageView.tipsLabel.textFlow = textElements;
            this.showEffect(nowItem);

            if (nowItem.action == "next") {
                egret.setTimeout(() => {
                    this.nextOne();
                }, this, 2500);
            }
            else if (nowItem.action == "end") {
                this.endTutorial();
            }
        }

        public showEffect(nowItem) {
            this.dragonBoneGroup.parent && this.dragonBoneGroup.parent.removeChild(this.dragonBoneGroup);
            if (this.pageView[nowItem.target]) {
                this.pageView[nowItem.target].visible = true;
                if (nowItem.effect == "play") {
                    this.pageView[nowItem.target].addChild(this.dragonBoneGroup);
                    this.dragonBone.animation.play("hand_touch", 0);
                }
                else if (nowItem.effect == "play-hold") {
                    this.pageView[nowItem.target].addChild(this.dragonBoneGroup);
                    this.dragonBone.animation.play("hand_hold", 0);
                }
            }
            else {
                nowItem.target.split(",").forEach((item, index) => {
                    if (this.pageView[item]) {
                        egret.setTimeout(() => {
                            this.pageView[item].visible = true;
                        }, this, index * 1000);
                    }
                });
            }
        }

        public endTutorial() {
            if (this.proxy.playerInfo.firstShowTutorial) {
                this.proxy.playerInfo.firstShowTutorial = false;
                this.proxy.savePlayerInfoToStorage();
            }
            this.pageView.close();
        }

        public nextOne() {
            this.nowIndex++;
            this.showTips();
        }

        public get pageView(): TutorialWindow {
            return this.viewComponent;
        }
    }
}