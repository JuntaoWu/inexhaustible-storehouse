
namespace ies {

    export class CardsGameWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "CardsGameWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(CardsGameWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");
            
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);

        }

        public async initData() {
            
        }

        public get pageView(): CardsGameWindow {
            return this.viewComponent;
        }
    }
}