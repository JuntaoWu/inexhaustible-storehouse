
namespace ies {

    export class CardsGameRuleWindow extends BasePanel {

        public constructor() {
            super();

            this.name = "cardsGameRuleWindow";
            this.skinName = "skins.ies.CardsGameRuleWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public btnScollBar: eui.VSlider;
        public scroller: eui.Scroller;
        public cardTitle1: eui.Button;
        public cardTitle2: eui.Button;
        public cardTitle3: eui.Button;
        public cardTitle4: eui.Button;
        public cardTitle41: eui.Button;
        public cardTitle42: eui.Button;
        public cardTitle43: eui.Button;
        public cardTitle5: eui.Button;
        
        public createCompleteEvent(event: eui.UIEvent): void {
            this.width = this.stage.stageWidth;
            // this.scaleX = this.stage.stageWidth / 1920;

            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            this.btnScollBar.addEventListener(eui.UIEvent.CHANGE, this.sliderChange, this);
            this.scroller.addEventListener(eui.UIEvent.CHANGE, this.scrollChange, this);
            this.cardTitle1.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.changeScrollTo(0), this);
            this.cardTitle2.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.changeScrollTo(720), this);
            this.cardTitle3.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.changeScrollTo(1530), this);
            this.cardTitle4.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.changeScrollTo(2290), this);
            this.cardTitle41.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.changeScrollTo(2290), this);
            this.cardTitle42.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.changeScrollTo(3350), this);
            this.cardTitle43.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.changeScrollTo(4220), this);
            this.cardTitle5.addEventListener(egret.TouchEvent.TOUCH_TAP,() => this.changeScrollTo(4840), this);
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

        public changeScrollTo(scrollV) {
            const maxScrollV = this.scroller.viewport.contentHeight- this.scroller.height;
            scrollV = Math.min(scrollV, maxScrollV);
            egret.Tween.get(this.scroller.viewport).to({ scrollV: scrollV }, 150);
            const value = 10 - scrollV / maxScrollV * 10;
            egret.Tween.get(this.btnScollBar).to({ value: value }, 150);
        }
    }
}