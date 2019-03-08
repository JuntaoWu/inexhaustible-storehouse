
namespace ies {

    export class GameScreen extends eui.Component {

        public scroller: eui.Scroller;
        public listChapter: eui.List;
        public btnPrevious: eui.Button;
        public btnNext: eui.Button;
        public titleGroup: eui.Group;
        public btnCatalog: eui.Button;
        public listFinalQuestion: eui.List;
        
        public blurFilter1: eui.Group;
        public blurFilter2: eui.Group;
        public blurFilter3: eui.Group;

        //bindings:
        public titleSideIcon: string;
        public chapterTitle: string;
        public maskStart: number;
        public titleX: number;
        public maskRes: string;
        public showFinal: boolean;

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