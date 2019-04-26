
namespace ies {

    export class CollectWindow extends eui.Component {

        // public collectList: eui.List;
        public title: string = '目录';
        public progressTitle: string;
        public progressWidth: number;

        public titleRes1: string;
        public collectRate1: string;
        public listImage1: eui.List;
        public titleRes2: string;
        public collectRate2: string;
        public listImage2: eui.List;
        public titleRes3: string;
        public collectRate3: string;
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