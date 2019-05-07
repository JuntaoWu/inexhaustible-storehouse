
namespace ies {

    export class GameScreenMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "GameScreenMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(GameScreenMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");

            this.gameScreen.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);
            this.gameScreen.scroller.addEventListener(eui.UIEvent.CHANGE_END, this.scrollChangeEnd, this);
            this.gameScreen.scroller.addEventListener(eui.UIEvent.CHANGE, this.scrollChange, this);
            this.gameScreen.scrollerCrowd.addEventListener(eui.UIEvent.CHANGE, this.scrollCrowdChange, this);
            this.gameScreen.btnPrevious.addEventListener(egret.TouchEvent.TOUCH_TAP, this.previousPage, this);
            this.gameScreen.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
            this.gameScreen.btnPrevious2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.previousPage, this);
            this.gameScreen.btnNext2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
            this.gameScreen.titleGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.titleClick, this);
            this.gameScreen.btnCatalog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.catalogClick, this);
            this.gameScreen.btnTutorial.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tutorialClick, this);
            this.gameScreen.btnCardsGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardsGameClick, this);
            
            this.gameScreen.listChapter.addEventListener(eui.ItemTapEvent.ITEM_TAP, (event: eui.ItemTapEvent) => {
                if (!event.itemIndex) {
                    this.proxy.testDeletePlayerInfo();
                    this.initData();
                }
            }, this);
            this.gameScreen.titleList.addEventListener(eui.ItemTapEvent.ITEM_TAP, (event: eui.ItemTapEvent) => {
                let chapterIndex = this._chapterIndex * 2;
                if (!event.itemIndex) {
                    chapterIndex -= 1; 
                }
                const question = { ...this.proxy.questionMap.get(chapterIndex.toString()) };
                question.isAnswered = this.proxy.isAnswered(chapterIndex);
                this.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW, question);
            }, this);
        }

        private arrCollection: eui.ArrayCollection;
        public async initData() {
            console.log("GameScreen initData");
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            await this.proxy.initGamesSetting();
            const sources = [];
            const exclusiveList = [];
            this.gameScreen.showChapter = false;
            this.proxy.questionMap.forEach(v => {
                // const res = (v.id && this.proxy.isAnswered(v.id)) ? `${v.res}-revealed` : v.res.toString();
                if (v.type == "common") {
                    if (v.id == 0) {
                        sources[0] = {
                            res: v.res
                        };
                    }
                    else if (v.id == 2) {
                        const answeredNum = (this.proxy.isAnswered(v.id) ? 1 : 0) + (this.proxy.isAnswered(+v.id - 1) ? 1 : 0);
                        sources[v.id / 2] = {
                            // res: v.res,
                            isDragonBone: true,
                            dragonBoneName: "cj01",
                            answeredNum: answeredNum
                        };
                    }
                    else if (v.id % 2 == 0) {
                        const res = `${v.res}-revealed`;
                        const answeredNum = (this.proxy.isAnswered(v.id) ? 1 : 0) + (this.proxy.isAnswered(+v.id - 1) ? 1 : 0);
                        sources[v.id / 2] = {
                            res: res,
                            answeredNum: answeredNum
                        };
                    }
                }
                else {
                    exclusiveList.push({res: v.res});
                }
            });
            if (!this.proxy.isShowFinalTowQuestion()) {
                sources.splice(11, 1);
            }
            this.arrCollection = new eui.ArrayCollection(sources);
            this.gameScreen.listChapter.itemRenderer = ChapterItemRenderer;
            this.gameScreen.listChapter.dataProvider = this.arrCollection;
            
            this.gameScreen.listCrowd.itemRenderer = ChapterItemRenderer;
            this.gameScreen.listCrowd.dataProvider = new eui.ArrayCollection(exclusiveList);
            this.chapterIndex = 1;
            console.log(this.arrCollection, this.gameScreen.listChapter.numElements);
            if (this.proxy.playerInfo.firstShowTutorial) {
                egret.setTimeout(() => {
                    this.tutorialClick();
                }, this, 1000);
            }
        }

        private _chapterIndex: number = 1;
        public get chapterIndex(): number {
            return this._chapterIndex;
        }
        public set chapterIndex(v: number) {
            this._chapterIndex = v;
            const chapterIndex = this._chapterIndex * 2;
            const titleList = [];
            for (let i = 0; i < 2; i++) {
                const v = this.proxy.questionMap.get((chapterIndex - 1 + i).toString());
                const replaceText = v.sentence.match(/【(.+?)】/)[1];
                titleList[i] = {
                    sentence: v.sentence.replace(/【(.+?)】/, replaceText),
                    sideIcon: '',
                    index: i
                }
                if (!this.proxy.isAnswered(v.id)) {
                    if (chapterIndex > 20) {
                        titleList[i].sideRes = v.sideRes;
                        titleList[i].isGameScreen = true;
                    }
                    else {
                        const emptyText = replaceText.split('').map(i => ' ').join('');
                        titleList[i].sentence = v.sentence.replace(/【(.+?)】/, emptyText);
                        titleList[i].sideIcon = v.sideRes;
                    }
                }
            }
            this.gameScreen.titleList.itemRenderer = SentenceRenderer;
            this.gameScreen.titleList.dataProvider = new eui.ArrayCollection(titleList);

            const answeredNum = (this.proxy.isAnswered(chapterIndex) ? 1 : 0) + (this.proxy.isAnswered(chapterIndex - 1) ? 1 : 0);
            const originalRes = this.proxy.questionMap.get(chapterIndex.toString()).res;
            const res = answeredNum ? `${originalRes}-revealed` : originalRes.toString();
            if (this.gameScreen.listChapter.dataProvider) {
                const item = this.gameScreen.listChapter.dataProvider.getItemAt(v);
                // if(this.gameScreen.listChapter.dataProvider.getItemAt(v).res !== res) {
                //     this.gameScreen.listChapter.dataProvider.getItemAt(v).res = res;
                // }
                if (item) {
                    item.answeredNum = answeredNum;
                }
                this.arrCollection.itemUpdated(item);
            }
        }

        private _chapterCrowdIndex: number = 1;
        public get chapterCrowdIndex(): number {
            return this._chapterCrowdIndex;
        }
        public set chapterCrowdIndex(v: number) {
            this._chapterCrowdIndex = v;
            const question = this.proxy.questionMap.get((this._chapterCrowdIndex).toString());
            this.gameScreen.titleText = question.sentenceRes;
        }

        public listNotificationInterests(): Array<any> {
            return [
                GameProxy.ANSWERED,
                GameProxy.CHANGE_INDEX,
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case GameProxy.ANSWERED: {
                    if (this.proxy.playerInfo.answeredList.length == 20) {
                        this.initData();
                        this.sendNotification(SceneCommand.SHOW_CATALOG_WINDOW);
                    }
                    this.chapterIndex = this.chapterIndex;
                    break;
                }
                case GameProxy.CHANGE_INDEX: {
                    if (this.gameScreen.scrollerCrowd.visible) {
                        this.showCrowdfunding(false);
                        egret.setTimeout(() => {
                            this.chapterIndex = Math.floor(data / 2) + 1;
                            this.moveToTargetIndex(this.chapterIndex);
                        }, this, 750);
                    }
                    else {
                        this.chapterIndex = Math.floor(data / 2) + 1;
                        this.moveToTargetIndex(this.chapterIndex);
                    }
                    break;
                }
            }
        }

        public catalogClick(event: egret.TouchEvent) {
            this.sendNotification(SceneCommand.SHOW_CATALOG_WINDOW);
        }

        public tutorialClick(event?: egret.TouchEvent) {
            this.sendNotification(SceneCommand.SHOW_TUTORIAL_WINDOW);
        }

        public cardsGameClick(event?: egret.TouchEvent) {
            if (!this.proxy.playerInfo.showEntryCardsGameTips) {
                this.sendNotification(SceneCommand.SHOW_CARDSGAME_WINDOW);
                return;
            }
            this.sendNotification(SceneCommand.SHOW_ALERT_WINDOW, {
                msg: "注意：以下内容将引起剧透，为了您良好的游戏体验，建议通关后再来哦。", 
                confirmLabel: "我意已决",
                cancelLabel: "先行告退",
                cbk: () => {
                    this.sendNotification(SceneCommand.SHOW_ALERT_WINDOW, {
                        msg: "您真的确定现在就要开始吗？通关后进行此游戏体验更好哦。", 
                        confirmLabel: "无需多言",
                        cancelLabel: "浪子回头",
                        cbk: () => {
                            this.sendNotification(SceneCommand.SHOW_CARDSGAME_WINDOW);
                            this.proxy.playerInfo.showEntryCardsGameTips = false;
                            this.proxy.savePlayerInfoToStorage();
                        }
                    });
                }
            });
        }

        public titleClick(event: egret.TouchEvent) {
            // if (!this.gameScreen.scrollerCrowd.visible) {
            //     if (!this.proxy.isAnswered(this._chapterIndex)) {
            //         const question = this.proxy.questionMap.get((this._chapterIndex).toString());
            //         this.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW, question);
            //     }
            // }
            // else {
            //     const question = { ...this.proxy.questionMap.get((this._chapterCrowdIndex).toString()) };
            //     question.isAnswered = this.proxy.isAnswered(this._chapterIndex);
            //     this.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW, question);
            // }
            const question = { ...this.proxy.questionMap.get((this._chapterCrowdIndex).toString()) };
            question.isAnswered = this.proxy.isAnswered(this._chapterIndex);
            this.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW, question);
        }

        public moveToTargetIndex(targetIndex: number) {
            const scrollH = this.gameScreen.listChapter.scrollH;
            let targetScrollH = (Constants.contentWidth + Constants.listGap) * targetIndex + 50;
            console.log(targetIndex, targetScrollH, this.gameScreen.scroller.viewport.contentWidth);
            if(targetIndex == this.gameScreen.listChapter.numElements - 2) {
                targetScrollH = this.gameScreen.scroller.viewport.contentWidth - this.gameScreen.scroller.width;
            }
            else if(targetScrollH > 0) {
                targetScrollH = targetScrollH - ((this.gameScreen.width - 1920) / 2);
            }

            if (this.gameScreen.scrollerCrowd.visible) {
                egret.Tween.get(this.gameScreen.listCrowd).to({ scrollH: targetScrollH }, 200).call(() => {
                    this.chapterCrowdIndex = targetIndex + 22;
                });
            }
            else {
                egret.Tween.get(this.gameScreen.listChapter).to({ scrollH: targetScrollH }, 200).call(() => {
                    this.chapterIndex = targetIndex;
                });
            }
        }

        public previousPage(event: egret.TouchEvent) {
            if (!this.gameScreen.scrollerCrowd.visible) {
                const currentIndex = this.chapterIndex;
                if (currentIndex <= 1) {
                    return;
                }
                this.moveToTargetIndex(currentIndex - 1);
            }
            else {
                const currentIndex = this.chapterCrowdIndex - 22;
                if (currentIndex <= 1) {
                    return;
                }
                this.moveToTargetIndex(currentIndex - 1);
            }
        }

        public nextPage(event: egret.TouchEvent) {
            if (!this.gameScreen.scrollerCrowd.visible) {
                const currentIndex = this.chapterIndex;
                if (currentIndex >= (this.gameScreen.listChapter.numElements - 2)) {
                    return;
                }
                this.moveToTargetIndex(currentIndex + 1);
            }
            else {
                const currentIndex = this.chapterCrowdIndex -22;
                if ((currentIndex + 1) >= this.gameScreen.listCrowd.numElements) {
                    return;
                }
                this.moveToTargetIndex(currentIndex + 1);
            }
        }

        public scrollChange(event: eui.UIEvent) {
            const scrollH = event.target.viewport.scrollH;
            let higherBound = Math.floor((scrollH + this.gameScreen.width * 0.5 + Constants.listGap) / (Constants.contentWidth + Constants.listGap));
            if (higherBound > this.gameScreen.listChapter.numElements - 2) {
                higherBound = this.gameScreen.listChapter.numElements - 2;
            }
            else if (higherBound < 1) {
                this.gameScreen.showChapter = false;
                return;
                // higherBound = 1;
            }
            else {
                this.gameScreen.showChapter = true;
            }
            
            if (this.chapterIndex != higherBound && this.gameScreen.scroller.visible) {
                this.chapterIndex = higherBound;
            }
            if (this.chapterIndex >= (this.gameScreen.listChapter.numElements - 2)
            && event.target.viewport.scrollH + 1500 > this.gameScreen.scroller.viewport.contentWidth) {
                this.showCrowdfunding();
            }
        }

        public scrollCrowdChange(event: eui.UIEvent) {
            const scrollH = event.target.viewport.scrollH;
            const lowerBound = Math.floor((scrollH - Constants.coverWidth) / (Constants.contentWidth + Constants.listGap));
            let higherBound = Math.floor((scrollH + this.gameScreen.width - Constants.coverWidth + Constants.listGap) / (Constants.contentWidth + Constants.listGap));
            if (higherBound + 1 > this.gameScreen.listCrowd.numElements) {
                higherBound = this.gameScreen.listCrowd.numElements - 1;
            }
            else if (higherBound < 1) {
                higherBound = 1;
            }
            if (this.chapterCrowdIndex != higherBound + 22 && this.gameScreen.scrollerCrowd.visible) {
                this.chapterCrowdIndex = higherBound + 22;
            }

            if (event.target.viewport.scrollH < -600) {
                this.showCrowdfunding(false);
            }
        }

        public scrollChangeEnd(event: eui.UIEvent) {
            console.log(event.target.viewport.scrollH, this.gameScreen.scroller.viewport.contentWidth);
        }

        public showCrowdfunding(b: boolean = true) {
            if (b && !this.gameScreen.scrollerCrowd.visible) {
                this.gameScreen.scroller.stopAnimation();
                this.gameScreen.scrollerCrowd.stopAnimation();
                this.gameScreen.scrollerCrowd.visible = true;
                // this.gameScreen.scrollerCrowd.viewport.scrollH = -2000;
                this.gameScreen.scrollerCrowd.alpha = 0;
                const scrollH = this.gameScreen.scroller.viewport.contentWidth;
                egret.Tween.get(this.gameScreen.blurFilter3).to({ left: 300 }, 1000);
                egret.Tween.get(this.gameScreen.blurFilter4).to({ x: 170 }, 1000);
                egret.Tween.get(this.gameScreen.scrollBg).to({ right: this.gameScreen.width - 160 }, 1000);
                egret.Tween.get(this.gameScreen.scroller.viewport).to({ scrollH: scrollH }, 1000).call(() => {                
                    this.gameScreen.showCrowd = true;
                    this.gameScreen.showChapter = false;
                    this.gameScreen.scroller.visible = false;
                    this.chapterCrowdIndex = 24;
                    egret.Tween.get(this.gameScreen.scrollerCrowd).to({ alpha: 1 }, 1000);
                });
                // egret.Tween.get(this.gameScreen.scrollerCrowd.viewport).to({ scrollH: 0 }, 1000);
                
            }
            else if (!b && !this.gameScreen.scroller.visible) {
                this.gameScreen.scroller.stopAnimation();
                this.gameScreen.scrollerCrowd.stopAnimation();
                this.gameScreen.scroller.visible = true;
                this.gameScreen.scroller.viewport.scrollH = this.gameScreen.scroller.viewport.contentWidth;
                const scrollH = this.gameScreen.scroller.viewport.contentWidth - 2137;
                egret.Tween.get(this.gameScreen.blurFilter3).to({ left: 160 }, 700);
                egret.Tween.get(this.gameScreen.blurFilter4).to({ x: this.gameScreen.width }, 700);
                egret.Tween.get(this.gameScreen.scrollBg).to({ right: 0 }, 700);
                egret.Tween.get(this.gameScreen.scroller.viewport).to({ scrollH: scrollH }, 700);
                egret.Tween.get(this.gameScreen.scrollerCrowd.viewport).to({ scrollH: -2000 }, 700).call(() => {
                    this.gameScreen.showCrowd = false;
                    this.gameScreen.showChapter = true;
                    this.gameScreen.scrollerCrowd.visible = false;
                    this.gameScreen.scrollerCrowd.viewport.scrollH = 0;
                    this.chapterIndex = this.gameScreen.listChapter.numElements - 2;
                });
            }
        }

        public openAnswerWindow(event: egret.TouchEvent) {
            this.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW);
        }

        public get gameScreen(): GameScreen {
            return this.viewComponent;
        }
    }
}