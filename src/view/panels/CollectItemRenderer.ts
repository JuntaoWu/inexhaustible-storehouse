namespace ies {

    export class CollectItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.CollectItemRenderer";
            this.listImage.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tapItem, this);
        }

        public listImage: eui.List;
        public collectRate: string;

        protected async dataChanged() {
            super.dataChanged();
            this.listImage.dataProvider = new eui.ArrayCollection(this.data.imgList);
            this.listImage.itemRenderer = CollectImageItemRenderer;
            this.collectRate = `(${this.data.imgList.filter(i => i).length}/${this.data.imgList.length})`;
        }

        public tapItem() {
            if (this.listImage.selectedItem) {
                ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_IMGPRE_WINDOW, this.listImage.selectedItem);
            }
        }
    }
}