

namespace ies {

    export class WordItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.WordItemRenderer";
        }

        private bitmapLabel: eui.BitmapLabel;

        protected async dataChanged() {
            super.dataChanged();
            this.bitmapLabel.text = this.data;
        }
    }
}