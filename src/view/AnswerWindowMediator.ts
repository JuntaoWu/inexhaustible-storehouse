
namespace ies {

    export class AnswerWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "AnswerWindowMediator";

        private proxy: GameProxy;

        private ybrskillHasBeenHandled: boolean[] = [false, false, false];

        public constructor(viewComponent: any) {
            super(AnswerWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");

            this.answerWindow.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);
        }

        public async initData() {
            console.log("AnswerWindow initData");
            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
        }

        public listNotificationInterests(): Array<any> {
            return [
                GameProxy.PLAYER_UPDATE,
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case GameProxy.PLAYER_UPDATE: {
                    break;
                }
            }
        }

        public get answerWindow(): AnswerWindow {
            return this.viewComponent;
        }
    }
}