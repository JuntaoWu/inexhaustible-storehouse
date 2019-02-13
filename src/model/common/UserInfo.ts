
namespace ies {

    export class UserInfo {
        public userId?: string;
        public wxgameOpenId?: string;
        public nativeOpenId?: string;
        public unionId?: string;
        public session_key?: string;

        public avatarUrl?: string;
        public city?: string;
        public country?: string;
        public gender?: number;
        public language?: string;
        public nickName?: string;
        public province?: string;

        public encryptedData?: string;
        public iv?: string;

        public token?: string;  // jwt-token here
        public anonymous?: boolean;

        public imAccId?: string;
        public imToken?: string;
    }
}