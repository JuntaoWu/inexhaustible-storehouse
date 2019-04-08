namespace ies {

    export class CardsGameItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.CardsGameItemRenderer";
        }

        public imgBg: string;
        public res: string;
        public testRes: string;

        protected async dataChanged() {
            super.dataChanged();
            this.imgBg = "card-front";
            this.testRes = this.data && this.data.text;
            if (this.data && this.data.isBack) {
                this.imgBg = "card-back";
                this.res = this.data.res;
                this.testRes = "";
            }
        }
    }
}