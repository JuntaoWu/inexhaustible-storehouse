

namespace ies {

    export class WordItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.WordItemRenderer";
        }

        private bgImg: string;
        private bitmapLabel: eui.BitmapLabel;

        protected async dataChanged() {
            super.dataChanged();
            this.bgImg = this.data.useWordBox ? 'word-box' : 'word-box-min';
            this.bitmapLabel.text = this.data.text;
        }
    }
}