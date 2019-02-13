

namespace ies {

    export class AccountProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = "AccountProxy";

        public constructor() {
            super(AccountProxy.NAME);
        }

    }
}