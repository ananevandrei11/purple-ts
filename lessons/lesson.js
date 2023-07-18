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
const user = "user" /* Roles.USER */;
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
a.then((res) => console.log(res[0].status));
// UNION
function logError(err) {
    let errors = '';
    if (Array.isArray(err)) {
        err.forEach((e) => (errors += e));
        return errors;
    }
    else {
        return err;
    }
}
function logObject(obj) {
    if ('a' in obj) {
        console.log(obj.a);
    }
    else {
        console.log(obj.b);
    }
}
function logMultipleIds(a, b) {
    if (typeof a === typeof b) {
        console.log('as string');
    }
    else {
        console.log('as other');
    }
}
function fetchWithAuth(url, method) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url, {
                method,
            });
            return res.json();
        }
        catch (e) {
            return String(e);
        }
    });
}
/*
let methodError = 'POST';
fetchWithAuth('', methodError); // with error types
*/
const methodSuccess = 'POST';
fetchWithAuth('', methodSuccess); // without error types
let someUser = {
    name: 'name',
    age: 33,
    skills: ['DevOps', 'Dev'],
};
let someUserWithId = {
    name: 'name',
    age: 33,
    skills: ['DevOps', 'Dev'],
    id: 1,
};
function multiply(f, s) {
    if (!s) {
        return f * f;
    }
    return f * s;
}
