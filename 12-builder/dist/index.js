"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var FetchMethods;
(function (FetchMethods) {
    FetchMethods["GET"] = "GET";
    FetchMethods["POST"] = "POST";
    FetchMethods["PUT"] = "PUT";
    FetchMethods["DELETE"] = "DELETE";
    FetchMethods["UPDATE"] = "UPDATE";
})(FetchMethods || (FetchMethods = {}));
class FetchBuilder {
    constructor() {
        this.head = {};
        this.body = {};
    }
    addFetchMethod(method) {
        this.method = FetchMethods[method];
        return this;
    }
    addHeadFetch(arrOrKey, value) {
        if (typeof arrOrKey == 'string') {
            if (!value || arrOrKey.trim() == '' || value.trim() == '') {
                console.log('Ключ и значение заголовка не могут быть пустыми');
                return this;
            }
            this.head[arrOrKey] = value;
        }
        if (typeof arrOrKey == 'object') {
            this.head = Object.assign(Object.assign({}, this.head), arrOrKey);
        }
        return this;
    }
    addBodyFetch(arrOrKey, value) {
        if (typeof arrOrKey == 'string') {
            if (!value || arrOrKey.trim() == '' || value.trim() == '') {
                console.log('Ключ и значение тела запроса не могут быть пустыми');
                return this;
            }
            this.body[arrOrKey] = value;
        }
        if (typeof arrOrKey == 'object') {
            this.body = Object.assign(Object.assign({}, this.body), arrOrKey);
        }
        return this;
    }
    addURL(url) {
        if (!url || url.trim() == '') {
            console.log('URL не может быть пустым. Введите URL');
            return this;
        }
        this.url = url.trim();
        return this;
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: this.method,
                headers: this.head,
            };
            if (this.method != 'GET' && Object.keys(this.body).length > 0) {
                options.body = JSON.stringify(this.body);
            }
            const responce = yield fetch(this.url, options);
            const data = yield responce.json();
            console.log(`${responce} ${data}`);
            return data;
        });
    }
}
const fetchBuilder = new FetchBuilder();
fetchBuilder
    .addFetchMethod('GET')
    .addURL('https://dummyjson.com/users')
    .addHeadFetch({ 'Content-Type': 'application/json' })
    .exec()
    .then((data) => {
    const { username, password } = data.users[0];
    fetchBuilder
        .addURL('https://dummyjson.com/auth/login')
        .addBodyFetch({ username, password })
        .addFetchMethod('POST')
        .addHeadFetch('Content-Type', 'application/json')
        .exec()
        .then(console.log);
});
