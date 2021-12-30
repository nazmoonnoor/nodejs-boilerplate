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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryFetching = void 0;
const logger_1 = __importDefault(require("./logger"));
function waitFor(millSeconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, millSeconds);
    });
}
function retryFetching(fn, nthTry, delayTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fn();
        const { data } = response;
        if (data.message) {
            logger_1.default.info(new Date(Date.now()).toISOString(), nthTry, "time");
            yield waitFor(delayTime);
            return retryFetching(fn, nthTry - 1, delayTime);
        }
        return data;
    });
}
exports.retryFetching = retryFetching;
