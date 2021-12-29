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
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryPromise = void 0;
/**
 * Util function to return a promise which is resolved in provided milliseconds
 */
function waitFor(millSeconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, millSeconds);
    });
}
function retryPromise(promise, conditionFn, nthTry, delayTime) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield promise;
            if (conditionFn(res.data.status)) {
                if (nthTry === 1) {
                    return yield Promise.reject();
                }
                console.log("retrying", nthTry, "time");
                // wait for delayTime amount of time before calling this method again
                yield waitFor(delayTime);
                return yield retryPromise(promise, conditionFn, nthTry - 1, delayTime);
            }
            return yield promise;
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.retryPromise = retryPromise;
