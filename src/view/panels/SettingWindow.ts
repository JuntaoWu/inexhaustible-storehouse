
namespace ies {

    export class SettingWindow extends eui.Component {

        public constructor() {
            super();

            this.name = "settingWindow";
            this.skinName = "skins.ies.SettingWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

    }
}