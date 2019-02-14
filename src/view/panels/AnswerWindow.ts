
namespace ies {

    export class AnswerWindow extends BasePanel {

        //bindings:

        public constructor() {
            super();

            this.name = "answerWindow";
            this.skinName = "skins.ies.AnswerWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            // this.poweredLabel.y = this.stage.stageHeight - this.poweredLabel.height - 30;
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator(new AnswerWindowMediator(this));
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}