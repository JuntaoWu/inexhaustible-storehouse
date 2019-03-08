
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
            ApplicationFacade.getInstance().registerMediator(new SettingWindowMediator(this));
        }

        public showSetting: boolean = true;
        public showDeveloper: boolean = false;

        public btnVolumeEffect: eui.HSlider;
        public btnVolumeBGM: eui.HSlider;
        public btnDeveloper: eui.Button;
        public switchEffect: eui.ToggleButton;
        public switchBG: eui.ToggleButton;
        public devWindow: DeveloperWindow;
    }
}