namespace ies {

    export class CatalogItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.CatalogItemRenderer";
        }

        protected async dataChanged() {
            super.dataChanged();
            this.showMask = !!this.data.maskLen;
            if (this.showMask) {
                this.maskW = this.data.maskLen * 65;
                this.maskX = this.data.maskStart * 65;
            }
        }

        public maskX: number;
        public maskW: number;
        public showMask: boolean;
    }
}