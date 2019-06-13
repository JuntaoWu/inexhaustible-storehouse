namespace ies {

    export class CardsGameItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.CardsGameItemRenderer";
        }

        public scale: number;
        public res: string;

        protected async dataChanged() {
            super.dataChanged();
            this.scale = 0.9;
            if (this.data && this.data.isSelected) {
                this.scale = 1;
            }
        }
    }
}