
namespace ies {

    export class TutorialWindow extends eui.Panel {
        
        public titleList: eui.List;
        public tipsLabel: eui.Label;
        public btnSkip: eui.Button;
        public tutorialGroup: eui.Group;

        public titleGroup: eui.Group;
        public btnNextGroup: eui.Group;
        public scrollerGroup: eui.Group;
        public btnCatalogGroup: eui.Group;

        public btnTips1: eui.Button;
        public btnTips2: eui.Button;
        public btnTips3: eui.Button;
        public inputGroup: eui.Group;
        public submitAnswerGroup: eui.Group;
        public closeAnswerGroup: eui.Group;

        public btnCatalog: eui.ToggleButton;
        public btnCollect: eui.ToggleButton;
        public btnSetting: eui.ToggleButton;
        public sentenceGroup: eui.Group;

        public answerGroup: eui.Group;
        public textInputList: eui.List;
        public catalogGroup: eui.Group;
        public catalogList: eui.List;
        public collectWindow: CollectWindow;
        public settingWindow: SettingWindow;

        public constructor() {
            super();

            this.name = "TutorialWindow";
            this.skinName = "skins.ies.TutorialWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            // this.width = this.stage.stageWidth;
            this.scaleX = this.stage.stageWidth / 1920;

            const textList = "北平砚兄   ".split("");
            this.textInputList.dataProvider = new eui.ArrayCollection(textList);
            this.textInputList.itemRenderer = TextInputItemRenderer;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new TutorialWindowMediator(this));
        }

        public close() {
            super.close();
            ApplicationFacade.getInstance().sendNotification(SceneCommand.RESET_FILTER);
        }
    }
}