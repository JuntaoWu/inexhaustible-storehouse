namespace ies {

    export class SentenceRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.SentenceRenderer";
        }

        public question: eui.Group;
        public sideIcon: eui.Image;
        public wordList: eui.List;
        public listFinalQuestion: eui.List;
        public sentenceX: number;

        protected async dataChanged() {
            super.dataChanged();
            const list = this.data.sentence.split('');
            this.wordList.dataProvider = new eui.ArrayCollection(list);
            this.wordList.itemRenderer = WordItemRenderer;
            if(!(this.data.index % 2)) {
                this.sideIcon.x = 0;
                this.sentenceX = 90;
            }
            else {
                this.sideIcon.x = 640;
                this.sentenceX = 0;
            }
            if (this.data.sideRes) {
                this.question.visible = false;
                this.listFinalQuestion.visible = true;
                const iconList = this.data.sideRes.split(",").map(v => {
                    return `stamps_${v}`;
                })
                this.listFinalQuestion.itemRenderer = SideIconItemRenderer;
                this.listFinalQuestion.dataProvider = new eui.ArrayCollection(iconList);
            }
        }
    }
}