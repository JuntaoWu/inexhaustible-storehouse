
namespace ies {

    export class GameScreen extends eui.Component {

        public scroller: eui.Scroller;
        public listChapter: eui.List;
        public btnPrevious: eui.Button;
        public btnNext: eui.Button;

        public btnChapterTitle: eui.Label;

        private titles: string[] = ['无尽藏', '图片1', '图片2', '图片3', '图片4'];

        //bindings:
        public chapterTitle: string = this.titles[0];

        private _chapterIndex: number = 0;
        public get chapterIndex(): number {
            return this._chapterIndex;
        }
        public set chapterIndex(v: number) {
            this._chapterIndex = v;
            this.chapterTitle = this.titles[this._chapterIndex];
        }

        public constructor() {
            super();

            this.name = "gameScreen";
            this.skinName = "skins.ies.GameScreen";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            // this.poweredLabel.y = this.stage.stageHeight - this.poweredLabel.height - 30;
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new GameScreenMediator(this));
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}