
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

        public widthEffect: number = 720;
        public widthBGM: number = 720;

        public volumeEffectGroup: eui.Group;
        public volumeBGMGroup: eui.Group;
        public btnVolumeEffect: eui.Button;
        public btnVolumeBGM: eui.Button;
        public btnDeveloper: eui.Button;
        public switchEffect: eui.ToggleButton;
        public switchBG: eui.ToggleButton;

    }
}