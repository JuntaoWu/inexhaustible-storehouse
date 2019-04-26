
namespace ies {

    export class CatalogWindow extends BasePanel {

        public btnCatalog: eui.ToggleButton;
        public btnCollect: eui.ToggleButton;
        public btnSetting: eui.ToggleButton;
        public btnFinal: eui.Button;
        public catalogList: eui.List;
        public catalogScroller: eui.Scroller;

        public titleRes: string = 'title-catalog';
        public showCatalog: boolean = true;
        public showCollect: boolean;
        public showSetting: boolean;
        public showFinalTow: boolean;

        public constructor() {
            super();

            this.name = "catalogWindow";
            this.skinName = "skins.ies.CatalogWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.width = this.stage.stageWidth;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new CatalogWindowMediator(this));
        }

        public close() {
            super.close();
            ApplicationFacade.getInstance().sendNotification(SceneCommand.RESET_FILTER);
        }
    }
}