

namespace ies {

    export class ChapterItemRenderer extends eui.ItemRenderer {

        public constructor() {
            super();
            this.skinName = "skins.ies.ChapterItemRenderer";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
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

        protected async dataChanged() {
            super.dataChanged();
            if (this.data.isDragonBone) {
                if (!this.dragonBone) {
                    this.dragonBone = DragonBones.createDragonBone("cj01_ske", "s1");
                    this.dragonBone && this.dragonBoneGroup.addChild(this.dragonBone);
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
                        this.dragonBone.animation.play("012", 1);
                        this.isPlayed1 = true;
                    }
                    egret.setTimeout(() => {
                        this.dragonBone.animation.play("013", 0);
                    }, this, 1500);
                }
                else {
                    if (!this.isPlayed2) {
                        this.dragonBone.animation.play("014", 1);
                        this.isPlayed2 = true;
                    }
                    egret.setTimeout(() => {
                        this.dragonBone.animation.play("015", 0);
                    }, this, 1500);
                }
            }
            else if (this.data.answeredNum == 0) {
                this.filters = [ColorFilter.grey];
                if (!this.cloud) {
                    this.cloud = DragonBones.createDragonBone("masks", "cloude");
                    this.cloud && this.cloudGroup.addChild(this.cloud);
                }
            }
            else if (this.data.answeredNum == 1) {
                this.filters = [ColorFilter.grey];
                if (this.cloud && !this.isPlayedCloud) {
                    this.cloud.animation.play("move", 1);
                    this.isPlayedCloud = true;
                }
            }
            else {
                egret.Tween.get(this).to({ filters: [] }, 1500);
                // this.filters = [];
            }
        }
    }
}