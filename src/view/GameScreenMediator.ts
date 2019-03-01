
namespace ies {

    export class GameScreenMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "GameScreenMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(GameScreenMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");

            this.gameScreen.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);
            this.gameScreen.scroller.addEventListener(eui.UIEvent.CHANGE_END, this.scrollChangeEnd, this);
            this.gameScreen.btnPrevious.addEventListener(egret.TouchEvent.TOUCH_TAP, this.previousPage, this);
            this.gameScreen.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
            this.gameScreen.titleGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.titleClick, this);
            this.gameScreen.btnCatalog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.catalogClick, this);
        }

        public async initData() {
            console.log("GameScreen initData");
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            await this.proxy.initGamesSetting();
            const sources = [];
            this.proxy.questionMap.forEach(v => {
                let res = (v.id && this.proxy.isAnswered(v.id)) ? `${v.res}-revealed` : v.res.toString();
                sources[v.id] = {
                    res: res
                };
            });

            this.gameScreen.listChapter.itemRenderer = ChapterItemRenderer;
            this.gameScreen.listChapter.dataProvider = new eui.ArrayCollection(sources);
            this.chapterIndex = 1;
            console.log(this.gameScreen.listChapter.numElements);
        }

        private _chapterIndex: number = 1;
        public get chapterIndex(): number {
            return this._chapterIndex;
        }
        public set chapterIndex(v: number) {
            this._chapterIndex = v;
            console.log(this._chapterIndex);
            this.gameScreen.chapterTitle = this.proxy.questionMap.get((this._chapterIndex).toString()).sentenceRes;
            this.gameScreen.maskRes = "";
            const sentence = this.proxy.questionMap.get((this._chapterIndex).toString()).sentence;
            if (sentence.indexOf('【') != -1 && !this.proxy.isAnswered(this._chapterIndex)) {
                this.gameScreen.maskRes = `inkMark${sentence.match(/【(.+?)】/)[1].length}`;
                this.gameScreen.maskStart = sentence.indexOf('【') * 70 || -15;
            }

            const originalRes = this.proxy.questionMap.get(v.toString()).res;
            const res = this.proxy.isAnswered(v) ? `${originalRes}-revealed` : originalRes.toString();

            if (this.gameScreen.listChapter.dataProvider) {
                if(this.gameScreen.listChapter.dataProvider.getItemAt(v).res !== res) {
                    this.gameScreen.listChapter.dataProvider.getItemAt(v).res = res;
                }
            }
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
                    this.chapterIndex = this.chapterIndex;
                    break;
                }
                case GameProxy.CHANGE_INDEX: {
                    this.chapterIndex = data + 1;
                    this.moveToTargetIndex(this.chapterIndex);
                    break;
                }
            }
        }

        public catalogClick(event: egret.TouchEvent) {
            this.sendNotification(SceneCommand.SHOW_CATALOG_WINDOW);
        }

        public titleClick(event: egret.TouchEvent) {
            if (!this.proxy.isAnswered(this._chapterIndex)) {
                const question = this.proxy.questionMap.get((this._chapterIndex).toString());
                this.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW, question);
            }
        }

        public moveToTargetIndex(targetIndex: number) {
            const scrollH = this.gameScreen.listChapter.scrollH;
            const targetScrollH = (Constants.contentWidth + Constants.listGap) * (targetIndex - 1);

            egret.Tween.get(this.gameScreen.listChapter).to({ scrollH: targetScrollH }, 200).call(() => {
                this.chapterIndex = targetIndex;
            });
        }

        public previousPage(event: egret.TouchEvent) {
            const currentIndex = this.chapterIndex;
            if (currentIndex <= 1) {
                return;
            }
            const targetIndex = currentIndex - 1;
            this.moveToTargetIndex(targetIndex);
        }

        public nextPage(event: egret.TouchEvent) {
            const currentIndex = this.chapterIndex;
            if ((currentIndex + 1) >= this.gameScreen.listChapter.numElements) {
                return;
            }
            const targetIndex = currentIndex + 1;
            this.moveToTargetIndex(targetIndex);
        }

        public scrollChangeEnd(event: eui.UIEvent) {
            console.log(event);
            const scrollH = event.target.viewport.scrollH;
            const lowerBound = Math.floor((scrollH - Constants.coverWidth) / (Constants.contentWidth + Constants.listGap));
            const higherBound = Math.floor((scrollH + 1750 - Constants.coverWidth + Constants.listGap) / (Constants.contentWidth + Constants.listGap));
            this.chapterIndex = higherBound;
        }

        public openAnswerWindow(event: egret.TouchEvent) {
            this.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW);
        }

        public get gameScreen(): GameScreen {
            return this.viewComponent;
        }
    }
}