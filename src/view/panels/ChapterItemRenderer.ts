

namespace ies {

    export class ChapterItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.ChapterItemRenderer";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        private proxy: GameProxy;
        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            this.proxy = ApplicationFacade.getInstance().retrieveProxy(GameProxy.NAME) as GameProxy;
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public dragonBoneGroup: eui.Group;
        public cloudGroup: eui.Group;
        public dragonBone: dragonBones.EgretArmatureDisplay;
        public cloud: dragonBones.EgretArmatureDisplay;
        private isPlayed1: boolean;
        private isPlayed2: boolean;
        private isPlayedCloud: boolean;

        private btnExtra: eui.Button;
        private tapTime: number;
        private tapStartTime: number;

        protected async dataChanged() {
            super.dataChanged();
            this.width = 1880;
            if (this.data.isDragonBone) {
                if (!this.dragonBone) {
                    this.dragonBone = DragonBones.createDragonBone("senceAll", this.data.armature);
                    if (this.dragonBone) {
                        this.dragonBone.scaleX = 2;
                        this.dragonBone.scaleY = 2;
                        this.dragonBone && this.dragonBoneGroup.addChild(this.dragonBone);
                    }
                }
                if (this.data.answeredNum == 0) {
                    this.dragonBone.animation.play("011", 0);
                    if (!this.cloud) {
                        this.cloud = DragonBones.createDragonBone("masks", "cloude");
                        this.cloud && this.cloudGroup.addChild(this.cloud);
                    }
                }
                else if (this.data.answeredNum == 1) {
                    if (this.cloud && !this.isPlayedCloud) {
                        this.cloud.animation.play("move", 1);
                        this.isPlayedCloud = true;
                    }
                    if (!this.isPlayed1) {
                        this.proxy.playEffect("change12_mp3");
                        this.dragonBone.animation.play("012", 1);
                        this.isPlayed1 = true;
                    }
                    egret.setTimeout(() => {
                        this.dragonBone.animation.play("013", 0);
                    }, this, 1500);
                }
                else {
                    if (!this.isPlayed2) {
                        this.proxy.playEffect("change23_mp3");
                        this.dragonBone.animation.play("014", 1);
                        this.isPlayed2 = true;
                    }
                    egret.setTimeout(() => {
                        this.dragonBone.animation.play("015", 0);
                    }, this, 1500);
                }
            }
            else if (this.data.showExtra) {
                if (!this.btnExtra.visible) {
                    this.btnExtra.visible = true;
                    this.btnExtra.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnExtraClick, this);
                }
            }
            else {
                this.width = 1600;
            }
        }

        private btnExtraClick(event: egret.TouchEvent) {
            if (!this.tapStartTime) {
                this.tapStartTime = new Date().getTime();
                this.tapTime = 0;
                egret.setTimeout(() => {
                    this.tapStartTime = null;
                }, this, 1000);
            }
            this.tapTime += 1;
            if (this.tapTime >= 5) {
                const question = { ...this.proxy.questionMap.get((0).toString()) };
                question.isAnswered = this.proxy.isAnswered(0);
                this.proxy.sendNotification(SceneCommand.SHOW_ANSWER_WINDOW, question);
                this.proxy.showHiddenCollect();
            }
        }
    }
}