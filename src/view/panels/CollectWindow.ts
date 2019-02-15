
namespace ies {

    export class CollectWindow extends eui.Component {

        public collectList: eui.List;
        public title: string = '目录';

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