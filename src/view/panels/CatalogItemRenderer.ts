namespace ies {

    export class CatalogItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.CatalogItemRenderer";
        }

        public sideIconX: number;
        public sentenceX: number;
        public listFinalQuestion: eui.List;

        protected async dataChanged() {
            super.dataChanged();
            const index = +this.data.res.replace("catalog", "");
            if (index % 2 == 0) {
                this.sideIconX = 520;
                this.sentenceX = 0;
            }
            else {
                this.sideIconX = 0;
                this.sentenceX = 100;
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