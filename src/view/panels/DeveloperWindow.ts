
namespace ies {

    export class DeveloperWindow extends eui.Component {

        public constructor() {
            super();

            this.name = "developerWindow";
            this.skinName = "skins.ies.DeveloperWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

    }
}