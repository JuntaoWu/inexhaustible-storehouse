
namespace ies {

    export class Constants {

        public static get ResourceEndpoint(): string {
            return (platform.env == "local" || platform.env == "dev" || platform.name != "wxgame") ? Constants.Endpoints.localResource : Constants.Endpoints.remoteResource;
        }

        public static get Endpoints() {
            if (platform.env == "local") {
                return {
                    service: "http://localhost/",
                    localResource: "",
                    remoteResource: "http://localhost/miniGame/",
                };
            }
            if (platform.env == "dev") {
                return {
                    service: "http://ies.hzsdgames.com/api/",
                    localResource: "",
                    remoteResource: "http://ies.hzsdgames.com/miniGame/",
                };
            }
            if (platform.env == "prod") {
                return {
                    service: "https://ies.hzsdgames.com/api/",
                    localResource: "",
                    remoteResource: "https://ies.hzsdgames.com/miniGame/",
                };
            }
            if (platform.env == "test") {
                return {
                    service: "http://ies.hzsdgames.com/api/",
                    localResource: "",
                    remoteResource: "http://ies.hzsdgames.com/miniGame/",
                };
            }
        }

        public static authorizeButtonImageUrl = `${Constants.ResourceEndpoint}resource/assets/Button/btn-wxlogin.png`;
        public static gameTitle = `古董局中局`;
        public static shareImageUrl = `${Constants.ResourceEndpoint}resource/assets/shared/share.png`;

        public static listGap = 0;
        public static coverWidth = 234;
        public static contentWidth = 1880;
        public static contentCrowdWidth = 1600;
    }

}