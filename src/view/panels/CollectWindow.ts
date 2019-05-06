
namespace ies {

    export class CollectWindow extends eui.Component {

        // public collectList: eui.List;
        public title: string = '目录';
        public progressWidth: number;

        public progressTitle: eui.BitmapLabel;
        public collectRate1: eui.BitmapLabel;
        public listImage1: eui.List;
        public collectRate2: eui.BitmapLabel;
        public listImage2: eui.List;
        public collectRate3: eui.BitmapLabel;
        public listImage3: eui.List;

        public constructor() {
            super();

            this.name = "collectWindow";
            this.skinName = "skins.ies.CollectWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new CollectWindowMediator(this));
        }

    }
}