
namespace ies {

    export class AnswerWindow extends BasePanel {

        //bindings:

        public constructor() {
            super();

            this.name = "answerWindow";
            this.skinName = "skins.ies.AnswerWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.width = this.stage.stageWidth;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new AnswerWindowMediator(this));
        }
        
        public question: Question;
        public btnTips1: eui.ToggleButton;
        public btnTips2: eui.ToggleButton;
        public btnTips3: eui.ToggleButton;
        public tips: string;

        public textInput: egret.TextField;
        public textInputList: eui.List;
        public btnConfirm: eui.Button;
        public listTileLayout: eui.TileLayout;

        public textList: Array<string>;
        public answerText: string;
        public answerStartIndex: number;

        public setQuestion(question) {
            this.question = { ...question };
            console.log(this.question);
            
            this.answerText = question.sentence.match(/【(.+?)】/)[1];
            const replaceText = this.answerText.split('').map(i => ' ').join('');
            if (question.isAnswered) {
                this.btnConfirm.visible = this.textInput.visible = false;
                this.textList = question.sentence.replace(/[【】]/g, '').split('');
            }
            else {
                this.btnConfirm.visible = this.textInput.visible = true;
                this.textList = question.sentence.replace(/【(.+?)】/, replaceText).split('');
            }
            this.answerStartIndex = this.textList.findIndex(i => i == ' ');
            this.textInput.maxChars = this.answerText.length;
            if (this.textList.length < 7) {
                this.listTileLayout.requestedColumnCount = this.textList.length;
            }
            else {
                this.listTileLayout.requestedColumnCount = 7;
            }
            this.textInputList.dataProvider = new eui.ArrayCollection(this.textList);
            this.textInputList.itemRenderer = TextInputItemRenderer;
        }

        public close() {
            super.close();
            ApplicationFacade.getInstance().sendNotification(SceneCommand.RESET_FILTER);
        }
    }
}