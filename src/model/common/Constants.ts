
namespace ies {

    export class Constants {

        public static get ResourceEndpoint(): string {
            return (platform.env == "local" || platform.env == "dev" || platform.name != "wxgame") ? Constants.Endpoints.localResource : Constants.Endpoints.remoteResource;
        }

        public static get Endpoints() {
            if (platform.env == "local") {
                return {
                    service: "http://localhost:8090/",
                    localResource: "",
                    remoteResource: "http://localhost:8090/miniGame/",
                    ws: "ws://192.168.2.117:9090",
                    wss: "wss://192.168.2.117:19090",
                };
            }
            if (platform.env == "dev") {
                return {
                    service: "http://gdjzj.hzsdgames.com:8090/",
                    localResource: "",
                    remoteResource: "http://gdjzj.hzsdgames.com:8090/miniGame/",
                    ws: "ws://192.168.2.202:9092",
                    wss: "wss://192.168.2.202:19092",
                };
            }
            if (platform.env == "prod") {
                return {
                    service: "https://gdjzj.hzsdgames.com:8100/",
                    localResource: "",
                    remoteResource: "https://gdjzj.hzsdgames.com:8100/miniGame/",
                    ws: "ws://photon.hzsdgames.com:9092",
                    wss: "wss://photon.hzsdgames.com:19092",
                };
            }
            if (platform.env == "test") {
                return {
                    service: "http://gdjzj.hzsdgames.com:8090/",
                    localResource: "",
                    remoteResource: "http://gdjzj.hzsdgames.com:8090/miniGame/",
                    ws: "ws://photon.hzsdgames.com:9092",
                    wss: "wss://photon.hzsdgames.com:19092",
                };
            }
        }

        public static authorizeButtonImageUrl = `${Constants.ResourceEndpoint}resource/assets/Button/btn-wxlogin.png`;
        public static gameTitle = `古董局中局`;
        public static shareImageUrl = `${Constants.ResourceEndpoint}resource/assets/shared/share.png`;
    }

}