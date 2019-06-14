
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
            this.pageView.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextOne, this);
            this.pageView.btnSkip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endTutorial, this);
        }

        public async initData() {
            // const titleList = [];
            // for (let i = 0; i < 2; i++) {
            //     const v = this.proxy.questionMap.get((1 + i).toString());
            //     const replaceText = v.sentence.match(/【(.+?)】/)[1];
            //     const emptyText = replaceText.split('').map(i => ' ').join('');
            //     titleList[i] = {
            //         sentence: v.sentence.replace(/【(.+?)】/, emptyText),
            //         sideIcon: v.sideRes,
            //         index: i
            //     }
            // }
            // this.pageView.titleList.itemRenderer = SentenceRenderer;
            // this.pageView.titleList.dataProvider = new eui.ArrayCollection(titleList);

            this.reSetUI();
            this.nowIndex = 0;
            this.showTips();
        }

        public reSetUI() {
            this.tipsText = "";
            const effectUIPool = [
                this.pageView.titleGroup, this.pageView.btnNextGroup, 
                this.pageView.scrollerGroup, this.pageView.btnCatalogGroup,
                this.pageView.tipsGroup, this.pageView.inputGroup, 
                this.pageView.submitAnswerGroup, this.pageView.closeAnswerGroup,
                this.pageView.sentenceGroup
            ]
            effectUIPool.forEach(i => i.visible = false);
        }

        public showTips() {
            const nowItem = this.tutorialJson[this.nowIndex];
            console.log(nowItem);
            if (!nowItem) {
                this.endTutorial();
                return;
            }
            this.pageView.catalogBg = nowItem.bg;
            if (nowItem.bg != 'tutorial1') {
                this.pageView.tipsLabelGroup.y = 90;
            }
            else {
                this.pageView.tipsLabelGroup.y = 140;
            }
            this.tipsText = nowItem.tips;
            const textElements = new egret.HtmlTextParser().parser(this.tipsText);
            this.pageView.tipsLabel.textFlow = textElements;
            this.showEffect(nowItem);
            
            if (nowItem.action == "auto") {
                this.nextOne();
            }
        }

        public showEffect(nowItem) {
            if (this.pageView[nowItem.target]) {
                this.pageView[nowItem.target].visible = true;
                if (nowItem.effect == "play") {
                    if (nowItem.target == "btnNextGroup"){
                        console.log(111, this.pageView.btnNextGroup.visible);
                    }
                    this.dragonBoneGroup.parent && this.dragonBoneGroup.parent.removeChild(this.dragonBoneGroup);
                    this.pageView[nowItem.target].addChild(this.dragonBoneGroup);
                    this.dragonBone.animation.play("hand_touch", 0);
                }
                else if (nowItem.effect == "play-hold") {
                    console.log(this.pageView.btnNextGroup.visible);
                    let dragonBone = null;
                    const dragonBoneGroup = this.pageView[nowItem.target].getChildByName('dragonBoneGroup')
                    if (dragonBoneGroup) {
                        dragonBone = dragonBoneGroup.getChildByName('dragonBone');
                    }
                    else {
                        const dragonBoneGroup: eui.Group = new eui.Group();
                        dragonBoneGroup.name = "dragonBoneGroup";
                        dragonBone = DragonBones.createDragonBone("hand", "touch");
                        dragonBone.name = "dragonBone";
                        dragonBoneGroup.addChild(dragonBone);
                        dragonBoneGroup.verticalCenter = 0;
                        dragonBoneGroup.horizontalCenter = 0;
                        this.pageView[nowItem.target].addChild(dragonBoneGroup);
                    }
                    dragonBone && dragonBone.animation.play("hand_hold", 0);
                }
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
            if (this.tutorialJson[this.nowIndex].action != "auto") {
                this.reSetUI();
            }
            this.nowIndex++;
            this.showTips();
        }

        public get pageView(): TutorialWindow {
            return this.viewComponent;
        }
    }
}