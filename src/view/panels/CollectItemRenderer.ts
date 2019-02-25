namespace ies {

    export class CollectItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.CollectItemRenderer";
        }

        public listImage: eui.List;
        public collectRate: string;

        protected async dataChanged() {
            super.dataChanged();
            this.listImage.dataProvider = new eui.ArrayCollection(this.data.imgList);
            this.listImage.itemRenderer = CollectImageItemRenderer;
            this.collectRate = `(${this.data.imgList.filter(i => i).length}/${this.data.imgList.length})`;
        }

    }
}