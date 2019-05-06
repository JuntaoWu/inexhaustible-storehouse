

namespace ies {

    export class TextInputItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.TextInputItemRenderer";
        }

        public bgRes: string;
        public showLabel: boolean;
        public showBitmapLabel: boolean;

        protected async dataChanged() {
            super.dataChanged();
            if (this.data.bg) {
                this.showLabel = true;
                this.showBitmapLabel = false;
                this.bgRes = this.data.bg;
            }
            else {
                this.showLabel = false;
                this.showBitmapLabel = true;
                this.bgRes = "word-bg";
            }
        }
    }
}