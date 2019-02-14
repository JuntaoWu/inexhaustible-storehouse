
namespace ies {

    export class GameScreenMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "GameScreenMediator";

        private proxy: GameProxy;

        private ybrskillHasBeenHandled: boolean[] = [false, false, false];

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
            const sources = [];
            this.proxy.questionMap.forEach(v => {
                sources[v.id - 1] = v.res.toString();
            });
            
            this.chapterIndex = 1;
            this.gameScreen.listChapter.itemRenderer = ChapterItemRenderer;
            this.gameScreen.listChapter.dataProvider = new eui.ArrayCollection(sources);
        }

        private _chapterIndex: number = 0;
        public get chapterIndex(): number {
            return this._chapterIndex;
        }
        public set chapterIndex(v: number) {
            this._chapterIndex = v;
            let title = this.proxy.questionMap.get((this._chapterIndex).toString()).sentence;
            if (!this.proxy.isAnswered(this._chapterIndex)) { 
                const replaceText = title.match(/【(.+?)】/)[1].split('').map(i => '*').join('');
                title = title.replace(/【(.+?)】/, replaceText);
            }
            else {
                // 已解答
                title = title.replace(/【|】/g, '');
            }
            this.gameScreen.chapterTitle = title;
        }

        public listNotificationInterests(): Array<any> {
            return [
                GameProxy.ANSWERED,
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case GameProxy.ANSWERED: {
                    this.chapterIndex = this.chapterIndex;
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

        public previousPage(event: egret.TouchEvent) {
            const currentIndex = this.chapterIndex;
            if(currentIndex <= 1) {
                return;
            }
            const targetIndex = currentIndex - 1;
            const scrollH = this.gameScreen.listChapter.scrollH;
            const width = this.gameScreen.listChapter.getChildAt(0).width;
            const targetScrollH = width * targetIndex;

            egret.Tween.get(this.gameScreen.listChapter).to({scrollH: targetScrollH}, 200).call(() => {
                this.chapterIndex = targetIndex;
            });
        }

        public nextPage(event: egret.TouchEvent) {
            const currentIndex = this.chapterIndex;
            if(currentIndex >= this.gameScreen.listChapter.numChildren) {
                return;
            }
            const targetIndex = currentIndex + 1;
            const scrollH = this.gameScreen.listChapter.scrollH;
            const width = this.gameScreen.listChapter.getChildAt(0).width;
            const targetScrollH = width * targetIndex;

            egret.Tween.get(this.gameScreen.listChapter).to({scrollH: targetScrollH}, 200).call(() => {
                this.chapterIndex = targetIndex;
            });
        }

        public scrollChangeEnd(event: eui.UIEvent) {
            console.log(event);
            const scrollH = event.target.viewport.scrollH;
            const width = event.target.viewport.getChildAt(0).width;
            const index = Math.ceil(scrollH / width) + 1;
            this.chapterIndex = index;
        }

        public openAnswerWindow(event: egret.TouchEvent) {
            this.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW);
        }

        public get gameScreen(): GameScreen {
            return this.viewComponent;
        }
    }
}