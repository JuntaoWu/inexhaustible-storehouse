
namespace ies {

    export class GameScreen extends eui.Component {

        public scroller: eui.Scroller;
        public listChapter: eui.List;
        public scrollerCrowd: eui.Scroller;
        public listCrowd: eui.List;
        public btnPrevious: eui.Button;
        public btnNext: eui.Button;
        public btnPrevious2: eui.Button;
        public btnNext2: eui.Button;
        public titleGroup: eui.Group;
        public btnCatalog: eui.Button;
        public btnTutorial: eui.Button;
        public btnCardsGame: eui.Button;
        // public listFinalQuestion: eui.List;
        public titleList: eui.List;
        public scrollBg: eui.Image;
        public bgDragonBoneGroup: eui.Group;
        public btnSkip: eui.Button;
        public finalGroup: eui.Group;
        public dragonBoneGroup: eui.Group;

        public blurFilter1: eui.Group;
        public blurFilter2: eui.Group;
        public blurFilter3: eui.Group;
        public blurFilter4: eui.Group;

        //bindings:
        public titleSideIcon: string;
        public chapterTitle: string;
        public maskStart: number;
        public titleX: number;
        public maskRes: string;
        public titleText: string;
        public showCrowd: boolean;
        public showChapter: boolean = true;
        public viewScaleX: number;

        public constructor() {
            super();

            this.name = "gameScreen";
            this.skinName = "skins.ies.GameScreen";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.width = this.stage.stageWidth;
            this.viewScaleX = this.stage.stageWidth / 1920;

            this.blurFilter4.x = this.width;
            this.scrollerCrowd.visible = false;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new GameScreenMediator(this));
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}