import http from "../http-common";

class FindvocabService { 
    find(data) {
        return http.post("/generate", data);
    }
}

export default new FindvocabService();