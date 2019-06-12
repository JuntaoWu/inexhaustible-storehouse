

namespace ies {

	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "GameProxy";

		private lastSeenErrorAt = 0;
		private imLoggedIn = false;
		private bgm: egret.SoundChannel = null;
		private bgmPosition = 0;

		public constructor() {
			super(GameProxy.NAME);
		}

		public async initialize() {
			
		}
		
		public static HIDE_DEV_WINDOW: string = "hide_developer";

		public static ANSWERED: string = "answered";
		public static CHANGE_INDEX: string = "change_index";
		public static PLAY_FINAL: string = "play_final";
		
		private _questionMap: Map<string, Question>;
		public get questionMap(): Map<string, Question> {
			if (!this._questionMap) {
				this._questionMap = new Map<string, Question>(Object.entries(RES.getRes("question_json")));
			}
			return this._questionMap;
		}

		public playerInfo = {
			answeredList: [],
			isSoundEffectOn: true,
			volumeEffect: 0.5,
			isSoundBGMOn: true,
			volumeBGM: 0.5,
			firstShowTutorial: true,
			showEntryCardsGameTips: true,
		}

		public isShowFinalTowQuestion() {
			return this.playerInfo.answeredList.length >= 20;
		}

		public isAnswered(qId) {
			return this.playerInfo.answeredList.includes(qId);
		}

		public isAnsweredAll() {
			return this.playerInfo.answeredList.filter(i => i <= 22).length === 22;
		}

		public addAnswered(qId) {
			if (!this.isAnswered(qId)) {
				this.playerInfo.answeredList.push(qId);
				this.savePlayerInfoToStorage();
			}
		}

		public async getPlayerInfoFromStorage() {
			try {
                 let playerInfo = JSON.parse(await platform.getStorageAsync("playerInfo"));
                 if (playerInfo) {
					 this.playerInfo = Object.assign(this.playerInfo, playerInfo);
                 }
            }
            catch (error) {
                console.error("localPlayerInfo is not JSON, skip.");
            }
		}
		
		public savePlayerInfoToStorage() {
            try {
                platform.setStorageAsync("playerInfo", JSON.stringify(this.playerInfo));
            }
            catch (error) {
                console.error(error);
            }
		}

		public testDeletePlayerInfo() {
			this.playerInfo.answeredList = [];
			this.playerInfo.volumeBGM = 0.5;
			this.playerInfo.volumeEffect = 0.5;
			this.playerInfo.showEntryCardsGameTips = true;
			this.savePlayerInfoToStorage();
		}

		public async initGamesSetting() {
			await this.getPlayerInfoFromStorage();
			SoundPool.volumeBGM = this.playerInfo.volumeBGM;
			this.playBGM();
		}

        public setVolume(value: number, type?: string) {
            if (type == "bgm") {
                SoundPool.volumeBGM = this.playerInfo.volumeBGM = value;
            }
            else {
                this.playerInfo.volumeEffect = value;
            }
            this.savePlayerInfoToStorage();
        }

		public switchBGM(b: boolean) {
			this.playerInfo.isSoundBGMOn = b;
			this.playBGM();
            this.savePlayerInfoToStorage();
		}

		public switchEffect(b: boolean) {
            this.playerInfo.isSoundEffectOn = b;
            this.savePlayerInfoToStorage();
		}

		public playBGM() {
			if (this.playerInfo.isSoundBGMOn) {
				this.getBGMPosition();
				SoundPool.stopBGM();
				this.bgm = SoundPool.playBGM("BGM", this.bgmPosition);
			}
			else {
				SoundPool.stopBGM();
				this.bgm = null;
				this.bgmPosition = 0;
			}
		}

		public getBGMPosition() {
			if (this.bgm) {
				this.bgmPosition = this.bgm.position;
			}
		}

		public playEffect(soundName: string) {
			if (this.playerInfo.isSoundEffectOn) {
				let src = soundName;
				if (platform.os == "wxgame") {
					src = `${Constants.ResourceEndpoint}resource/assets/sound/${soundName.replace('_mp3', '')}.mp3`;
				}			
				platform.createInnerAudio(src, this.playerInfo.volumeEffect);
			}
		}
	}

	
}