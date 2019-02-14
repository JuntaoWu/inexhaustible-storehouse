
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
            this.gameScreen.btnChapterTitle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAnswerWindow, this);
        }

        public async initData() {
            console.log("GameScreen initData");
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;

            const sources = ['blank', '1', '2', '3', '4'];

            this.gameScreen.listChapter.itemRenderer = ChapterItemRenderer;
            this.gameScreen.listChapter.dataProvider = new eui.ArrayCollection(sources);
        }

        public listNotificationInterests(): Array<any> {
            return [
                GameProxy.PLAYER_UPDATE,
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case GameProxy.PLAYER_UPDATE: {
                    break;
                }
            }
        }

        public previousPage(event: egret.TouchEvent) {
            const currentIndex = this.gameScreen.chapterIndex;
            if(currentIndex <= 0) {
                return;
            }
            const targetIndex = currentIndex - 1;
            const scrollH = this.gameScreen.listChapter.scrollH;
            const width = this.gameScreen.listChapter.getChildAt(0).width;
            const targetScrollH = width * targetIndex;

            egret.Tween.get(this.gameScreen.listChapter).to({scrollH: targetScrollH}, 200).call(() => {
                this.gameScreen.chapterIndex = targetIndex;
            });
        }

        public nextPage(event: egret.TouchEvent) {
            const currentIndex = this.gameScreen.chapterIndex;
            if(currentIndex > this.gameScreen.listChapter.numChildren) {
                return;
            }
            const targetIndex = currentIndex + 1;
            const scrollH = this.gameScreen.listChapter.scrollH;
            const width = this.gameScreen.listChapter.getChildAt(0).width;
            const targetScrollH = width * targetIndex;

            egret.Tween.get(this.gameScreen.listChapter).to({scrollH: targetScrollH}, 200).call(() => {
                this.gameScreen.chapterIndex = targetIndex;
            });
        }

        public scrollChangeEnd(event: eui.UIEvent) {
            console.log(event);
            const scrollH = event.target.viewport.scrollH;
            const width = event.target.viewport.getChildAt(0).width;
            const index = Math.ceil(scrollH / width);
            this.gameScreen.chapterIndex = index;
        }

        public openAnswerWindow(event: egret.TouchEvent) {
            this.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW);
        }

        public get gameScreen(): GameScreen {
            return this.viewComponent;
        }
    }
}