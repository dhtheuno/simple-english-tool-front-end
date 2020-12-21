import http from "../http-common";

class ParaphraseService { 
    paraphrase(data) {
        return http.post("generate", data);
    }
}

export default new ParaphraseService();