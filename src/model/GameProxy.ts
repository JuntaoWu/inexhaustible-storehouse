

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

		public static PLAYER_UPDATE: string = "player_update";
		public static SEAT_UPDATE: string = "seat_update";
		public static CHOOSE_JS_END: string = "choose_js_end";
		public static FIRST_ONE: string = "first_one";
		public static NEXT_NR: string = "next_nr";
		public static TONGZHI: string = "tongzhi";
		public static BAOWU_TONGZHI: string = "baowu_tongzhi";
		public static TOUPIAO_UI: string = "toupiao_ui";
		public static ZONG_PIAOSHU: string = "zong_piaoshu";
		public static INPUT_NUMBER: string = "input_number";
		public static FINISH_INPUT: string = "finish_input";
		public static PIAO_SHU: string = "piao_shu";
		public static TOUPIAO_END: string = "toupiao_end";
		public static START_TWO: string = "start_two";
		public static ONE_YBRSKILL: string = "one_ybrskill";
		public static TWO_YBRSKILL: string = "two_ybrskill";
		public static THREE_YBRSKILL: string = "three_ybrskill";
		public static ONE_ZGQSKILL: string = "one_zgqskill";
		public static TOUREN: string = "touren";
		public static TOUREN_JIEGUO: string = "touren_jieguo";
		public static START_TOUPIAO_BUTTON: string = "start_toupiao_button";
		public static ROLEING: string = "roleing";
		public static AUTH_EDN: string = "auth_end";
		
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
			isSoundBGMOn: true,
		}

		public isAnswered(qId) {
			return !qId || this.playerInfo.answeredList.includes(qId);
		}

		public addAnswered(qId) {
			if (!this.isAnswered(qId)) {
				this.playerInfo.answeredList.push(qId);
			}
		}
	}

	
}