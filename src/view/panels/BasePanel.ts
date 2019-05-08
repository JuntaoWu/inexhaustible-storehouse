namespace ies {
    
    export class BasePanel extends eui.Panel {

        public overlay: eui.Rect;
        public container: eui.UIComponent;

        constructor() {
            super();
        }

        childrenCreated() {
            super.childrenCreated();
            if (!this.overlay) { /* 遮罩 */
                this.overlay = new eui.Rect();
                this.overlay.alpha = 0.4;
                this.overlay.width = egret.lifecycle.stage.stageWidth;
                this.overlay.height = egret.lifecycle.stage.stageHeight;
                this.addChildAt(this.overlay, 0);
                this.overlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            }
            this.container.visible = false;
        }

        show(animation?: boolean, style?: any) {
            this.container.visible = true;
            if (animation) {
                this.container.y = -1920;
                let targetTop = (this.stage.stageHeight - this.container.height) / 2;

                if(style && style.top) {
                    targetTop = style.top;
                }

                egret.Tween.get(this.container).to({ y: targetTop }, 500, egret.Ease.sineIn);
            }
            else {
                this.container.verticalCenter = 0;
                this.container.horizontalCenter = 0;
                this.container.scaleX = 0.5;
                this.container.scaleY = 0.5;
                egret.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.quadOut);
            }
        }

        onCloseButtonClick(event: egret.TouchEvent) {
            super.onCloseButtonClick(event);
            this.close();
        }

        close() {
            this.parent && this.parent.removeChild(this);
            const proxy = ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME) as GameProxy;
            proxy.playEffect("btn-back_mp3");
        }
    }
}