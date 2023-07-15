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
const arr = ['a', 1];
const arrRest = [
    'a',
    1,
    true,
    false,
];
const skill = [1, 'Dev'];
// const skills: readonly string[] = ['DevOps', 'Dev'];
// or
const skills = ['DevOps', 'Dev'];
var StatusCode;
(function (StatusCode) {
    StatusCode["draft"] = "draft";
    StatusCode["published"] = "published";
    StatusCode["deleted"] = "deleted";
})(StatusCode || (StatusCode = {}));
const user = "user" /* USER */;
function getFaqs(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('/faqs', {
            method: 'POST',
            body: JSON.stringify(req),
        });
        const data = yield res.json();
        return data;
    });
}
const a = getFaqs({
    topicId: 1,
    status: StatusCode.published,
});
a.then((res) => console.log(res.status));
