namespace ies {

    export class CatalogItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.CatalogItemRenderer";
        }

        public sideIconX: number;
        public sentenceX: number;
        public listFinalQuestion: eui.List;
        public showTitle: boolean;

        protected async dataChanged() {
            super.dataChanged();
            const index = +this.data.res.replace("catalog", "") || +this.data.res.replace("sentence", "");
            if (index % 2 == 0) {
                this.sideIconX = 520;
                this.sentenceX = 0;
            }
            else {
                this.sideIconX = 0;
                this.sentenceX = 80;
            }

            if (this.data.isGameScreen) {
                this.showTitle = false;
                this.listFinalQuestion.y = 0;
            }
            else {
                this.showTitle = true;
                this.listFinalQuestion.y = 80;
            }
            this.listFinalQuestion.visible = false;
            if (this.data.sideRes) {
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