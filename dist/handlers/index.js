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
exports.onNotificationRead = exports.onUserCheckout = exports.onUserLoggedIn = void 0;
const axios_1 = __importDefault(require("../lib/axios"));
function onUserLoggedIn(payload, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(payload,"=====");
        const { user, accesToken } = payload;
        if (!user || !accesToken)
            return;
        console.log(user, accesToken);
        try {
            const response = yield axios_1.default.get("/auth/user/notification", {
                headers: {
                    Authorization: "Bearer " + accesToken,
                },
            });
            if (response.status >= 200) {
                socket.emit("notification", response.data);
            }
            else {
                console.log(2);
                throw new Error(response.data);
            }
        }
        catch (err) {
            console.log(err);
            console.log(3);
        }
    });
}
exports.onUserLoggedIn = onUserLoggedIn;
function onUserCheckout(payload, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(payload,"=====");
        const { message, user, accesToken } = payload;
        if (!message || !accesToken || !user)
            return;
        console.log(message, accesToken);
        try {
            const response = yield axios_1.default.post("/auth/user/notification", { userId: user.id, message }, {
                headers: {
                    Authorization: "Bearer " + accesToken,
                },
            });
            if (response.status >= 200) {
                socket.emit("notification", response.data.notifications);
            }
            else {
                console.log(2);
                throw new Error(response.data);
            }
        }
        catch (err) {
            console.log(err);
            console.log(3);
        }
    });
}
exports.onUserCheckout = onUserCheckout;
function onNotificationRead(payload, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(payload, "=====");
        const { notificationid, user, accesToken } = payload;
        if (!notificationid || !accesToken || !user)
            return;
        try {
            const response = yield axios_1.default.patch("/auth/user/notification", {
                notificationid,
            }, {
                headers: {
                    Authorization: "Bearer " + accesToken,
                },
            });
            if (response.status >= 200) {
                socket.emit("notification", response.data.notifications);
            }
            else {
                console.log(2);
                throw new Error(response.data);
            }
        }
        catch (err) {
            console.log(err);
            console.log(3);
        }
    });
}
exports.onNotificationRead = onNotificationRead;
