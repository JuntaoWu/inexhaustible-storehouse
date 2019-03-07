

namespace ies {

	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "GameProxy";

		private lastSeenErrorAt = 0;
		private imLoggedIn = false;

		public constructor() {
			super(GameProxy.NAME);
		}

		public async initialize() {
			
		}
		
		public static HIDE_DEV_WINDOW: string = "hide_developer";

		public static ANSWERED: string = "answered";
		public static CHANGE_INDEX: string = "change_index";
		
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
			volumeEffect: 1,
			isSoundBGMOn: true,
			volumeBGM: 1,
		}

		public isShowFinalTowQuestion() {
			return this.playerInfo.answeredList.length >= 20;
		}

		public isAnswered(qId) {
			return !qId || this.playerInfo.answeredList.includes(qId);
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
                     this.playerInfo = playerInfo;
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

		public async initGamesSetting() {
			await this.getPlayerInfoFromStorage();
			SoundPool.volumeEffect = this.playerInfo.volumeEffect;
			SoundPool.volumeBGM = this.playerInfo.volumeBGM;
			if (this.playerInfo.isSoundBGMOn) {
				// SoundPool.playBGM("");
			}
		}
	}

	
}