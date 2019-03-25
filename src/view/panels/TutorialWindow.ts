
namespace ies {

    export class TutorialWindow extends eui.Panel {
        
        public tipsLabel: eui.Label;

        public titleGroup: eui.Group;
        public btnNext: eui.Button;
        public scrollerGroup: eui.Group;
        public btnCatalogGroup: eui.Group;

        public btnTips1: eui.Button;
        public btnTips2: eui.Button;
        public btnTips3: eui.Button;
        public inputGroup: eui.Group;
        public submitAnswerGroup: eui.Group;
        public closeAnswerGroup: eui.Group;

        public btnCatalog: eui.Button;
        public btnCollect: eui.Button;
        public btnSetting: eui.Button;
        public sentenceGroup: eui.Group;

        public answerGroup: eui.Group;
        public textInputList: eui.List;
        public catalogGroup: eui.Group;
        public catalogList: eui.List;

        public constructor() {
            super();

            this.name = "TutorialWindow";
            this.skinName = "skins.ies.TutorialWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.width = this.stage.stageWidth;

            const textList = "北平砚兄   ".split("");
            this.textInputList.dataProvider = new eui.ArrayCollection(textList);
            this.textInputList.itemRenderer = TextInputItemRenderer;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new TutorialWindowMediator(this));
        }

    }
}