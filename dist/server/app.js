"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendSug = exports.Tag = exports.Comment = exports.Point = exports.Friend = exports.Post = exports.User = exports.WebSession = void 0;
const comment_1 = __importDefault(require("./concepts/comment"));
const friend_1 = __importDefault(require("./concepts/friend"));
const friendSuggestion_1 = __importDefault(require("./concepts/friendSuggestion"));
const point_1 = __importDefault(require("./concepts/point"));
const post_1 = __importDefault(require("./concepts/post"));
const tag_1 = __importDefault(require("./concepts/tag"));
const user_1 = __importDefault(require("./concepts/user"));
const websession_1 = __importDefault(require("./concepts/websession"));
// App Definition using concepts
exports.WebSession = new websession_1.default();
exports.User = new user_1.default();
exports.Post = new post_1.default();
exports.Friend = new friend_1.default();
exports.Point = new point_1.default();
exports.Comment = new comment_1.default();
exports.Tag = new tag_1.default();
exports.FriendSug = new friendSuggestion_1.default();
//# sourceMappingURL=app.js.map