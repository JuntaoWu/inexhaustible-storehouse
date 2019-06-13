
namespace ies {

    export class CardsGameRuleWindow extends BasePanel {

        public constructor() {
            super();

            this.name = "cardsGameRuleWindow";
            this.skinName = "skins.ies.CardsGameRuleWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            this.btnScollBar.addEventListener(eui.UIEvent.CHANGE, this.sliderChange, this);
            this.scroller.addEventListener(eui.UIEvent.CHANGE, this.scrollChange, this);
            this.scroller.addEventListener(eui.UIEvent.CHANGE_END, this.scrollChangeEnd, this);
            this.buttonList = [
                this.cardTitle1, this.cardTitle2, this.cardTitle3,
                this.cardTitle41, this.cardTitle42, this.cardTitle43, this.cardTitle5
            ];
            this.buttonList.forEach((v, i) => {
                v.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.cursorChange(i), this);
            });
            this.cardTitle4.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.cursorChange(3), this);
            
        }

        public btnScollBar: eui.VSlider;
        public scroller: eui.Scroller;
        public cardTitle1: eui.ToggleButton;
        public cardTitle2: eui.ToggleButton;
        public cardTitle3: eui.ToggleButton;
        public cardTitle4: eui.Button;
        public cardTitle41: eui.ToggleButton;
        public cardTitle42: eui.ToggleButton;
        public cardTitle43: eui.ToggleButton;
        public cardTitle5: eui.ToggleButton;
        
        public buttonList: Array<eui.ToggleButton>;

        public createCompleteEvent(event: eui.UIEvent): void {
            // this.width = this.stage.stageWidth;
            this.scaleX = this.stage.stageWidth / 1920;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            this.btnScollBar.value = 10;
        }

        public sliderChange(event: eui.UIEvent) {
            const maxScrollV = this.scroller.viewport.contentHeight- this.scroller.height;
            const scrollV = maxScrollV * (1 - event.target.value / 10);
            this.scroller.viewport.scrollV = scrollV;
        }

        public scrollChange(event: eui.UIEvent) {
            const maxScrollV = this.scroller.viewport.contentHeight- this.scroller.height;
            const value = 10 - event.target.viewport.scrollV / maxScrollV * 10;
            this.btnScollBar.value = value;
        }
        
        public scrollChangeEnd(event: eui.UIEvent) {
            const scrollValueList = [0, 320, 1130, 1890, 2950, 3820, 4440];
            let n = 0;
            scrollValueList.forEach((v, i) => {
                if (event.target.viewport.scrollV > v) {
                    n = i;
                }
            });
            this.buttonList.forEach((v, i) => v.selected = i == n ? true : false);
        }

        public changeScrollTo(scrollV) {
            const maxScrollV = this.scroller.viewport.contentHeight- this.scroller.height;
            scrollV = Math.min(scrollV, maxScrollV);
            egret.Tween.get(this.scroller.viewport).to({ scrollV: scrollV }, 150);
            const value = 10 - scrollV / maxScrollV * 10;
            egret.Tween.get(this.btnScollBar).to({ value: value }, 150);
        }

        public cursorChange(n) {
            const scrollValueList = [0, 720, 1530, 2290, 3350, 4220, 4840];
            this.changeScrollTo(scrollValueList[n]);
            this.buttonList.forEach((v, i) => v.selected = i == n ? true : false);
        }
    }
}