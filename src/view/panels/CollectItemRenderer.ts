namespace ies {

    export class CollectItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.CollectItemRenderer";
        }

        public listImage: eui.List;

        protected async dataChanged() {
            super.dataChanged();
            this.listImage.dataProvider = new eui.ArrayCollection(this.data.imgList);
            this.listImage.itemRenderer = CollectImageItemRenderer;
        }

    }
}