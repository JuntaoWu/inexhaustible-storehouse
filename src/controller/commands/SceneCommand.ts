
namespace ies {

    export class SceneCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

        public constructor() {
            super();
        }
        public static NAME: string = "SceneCommand";

        /**
         * 切换场景
         */
        public static CHANGE: string = "scene_change";
        
        public static RESET_FILTER: string = "reset_filter";
        public static SHOW_ANSWER_WINDOW: string = "show_answer_window";
        public static SHOW_CATALOG_WINDOW: string = "show_catalog_window";
        public static SHOW_ALERT_WINDOW: string = "show_alert_window";
        public static SHOW_IMGPRE_WINDOW: string = "show_imgpre_window";
        public static SHOW_TUTORIAL_WINDOW: string = "show_tutorial_window";
        public static SHOW_CARDSGAME_WINDOW: string = "show_cardsgame_window";
        public static SHOW_CARDSGAMERULE_WINDOW: string = "show_cardgamerule_window";

        public static SHOW_AD_WINDOW: string = "show_ad_window";

        public register(): void {
            this.initializeNotifier("ApplicationFacade");
        }

        initializeNotifier(key: string) {
            super.initializeNotifier(key);
            this.facade().registerCommand(SceneCommand.RESET_FILTER, SceneCommand);
            this.facade().registerCommand(SceneCommand.CHANGE, SceneCommand);
            this.facade().registerCommand(SceneCommand.SHOW_ANSWER_WINDOW, SceneCommand);
            this.facade().registerCommand(SceneCommand.SHOW_CATALOG_WINDOW, SceneCommand);
            this.facade().registerCommand(SceneCommand.SHOW_ALERT_WINDOW, SceneCommand);
            this.facade().registerCommand(SceneCommand.SHOW_IMGPRE_WINDOW, SceneCommand);
            this.facade().registerCommand(SceneCommand.SHOW_TUTORIAL_WINDOW, SceneCommand);
            this.facade().registerCommand(SceneCommand.SHOW_CARDSGAME_WINDOW, SceneCommand);
            this.facade().registerCommand(SceneCommand.SHOW_CARDSGAMERULE_WINDOW, SceneCommand);
        }

        public async execute(notification: puremvc.INotification): Promise<any> {
            var data: any = notification.getBody();
            var appMediator: ApplicationMediator =
                <ApplicationMediator><any>this.facade().retrieveMediator(ApplicationMediator.NAME);

            var gameProxy: GameProxy = <GameProxy><any>this.facade().retrieveProxy(GameProxy.NAME);
            switch (notification.getName()) {
                case SceneCommand.RESET_FILTER: {
                    appMediator.main.resetGameScreenFilter();
                    break;
                }
                case SceneCommand.CHANGE: {
                    if (data == Scene.Start) {
                        appMediator.main.enterStartScreen();
                    }
                    else if (data == Scene.Game) {
                        // appMediator.main.enterGameScreen();
                    }
                    break;
                }
                case SceneCommand.SHOW_ANSWER_WINDOW: {
                    appMediator.main.showAnswerWindow(data);
                    break;
                }
                case SceneCommand.SHOW_CATALOG_WINDOW: {
                    appMediator.main.showCatalogWindow();
                    break;
                }
                case SceneCommand.SHOW_ALERT_WINDOW: {
                    appMediator.main.showAlertWindow(data);
                    break;
                }
                case SceneCommand.SHOW_IMGPRE_WINDOW: {
                    appMediator.main.showImagePreviewWindow(data);
                    break;
                }
                case SceneCommand.SHOW_TUTORIAL_WINDOW: {
                    appMediator.main.showTutorialWindow();
                    break;
                }
                case SceneCommand.SHOW_CARDSGAME_WINDOW: {
                    appMediator.main.showCardsGameWindow();
                    break;
                }
                case SceneCommand.SHOW_CARDSGAMERULE_WINDOW: {
                    appMediator.main.showCardsGameRuleWindow();
                    break;
                }
            }
        }
    }
}