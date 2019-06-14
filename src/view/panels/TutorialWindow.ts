
namespace ies {

    export class TutorialWindow extends eui.Panel {
        
        public tipsLabel: eui.Label;
        public btnNext: eui.Button;
        public btnSkip: eui.Button;
        public tutorialGroup: eui.Group;

        public titleGroup: eui.Group;
        public btnNextGroup: eui.Group;
        public scrollerGroup: eui.Group;
        public sentenceGroup: eui.Group;
        public btnCatalogGroup: eui.Group;
        public tipsGroup: eui.Group;
        public inputGroup: eui.Group;
        public submitAnswerGroup: eui.Group;
        public closeAnswerGroup: eui.Group;
        public tipsLabelGroup: eui.Group;

        public catalogBg: string;
        public viewScaleX: number;

        public constructor() {
            super();

            this.name = "TutorialWindow";
            this.skinName = "skins.ies.TutorialWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            // this.width = this.stage.stageWidth;
            this.scaleX = this.stage.stageWidth / 1920;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new TutorialWindowMediator(this));
        }

        public close() {
            super.close();
            ApplicationFacade.getInstance().sendNotification(SceneCommand.RESET_FILTER);
        }
    }
}