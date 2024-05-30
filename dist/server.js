"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const handlers_1 = require("./handlers");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_BASE_URL || ""
    }
});
const PORT = process.env.PORT || 6500;
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on("userLoggedIn", (payload) => (0, handlers_1.onUserLoggedIn)(payload, socket));
    socket.on("checkout", (payload) => (0, handlers_1.onUserCheckout)(payload, socket));
    socket.on("readNotification", (payload) => (0, handlers_1.onNotificationRead)(payload, socket));
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
