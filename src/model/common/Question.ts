
namespace ies {

    export class Question {
        public id?: number;
        public tips1?: string;
        public tips2?: string;
        public tips3?: string;
        public sentence?: string;
        public res?: string;
        public sentenceRes?: string;
        public catalogRes?: string;
        public sideRes?: string;
        public type?: string;
        public isAnswered?: boolean;
        public extra?: string;
    }
}