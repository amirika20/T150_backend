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
const mongodb_1 = require("mongodb");
const app_1 = require("./app");
const comment_1 = require("./concepts/comment");
const friend_1 = require("./concepts/friend");
const post_1 = require("./concepts/post");
const router_1 = require("./framework/router");
/**
 * This class does useful conversions for the frontend.
 * For example, it converts a {@link PostDoc} into a more readable format for the frontend.
 */
class Responses {
    /**
     * Convert PostDoc into more readable format for the frontend by converting the author id into a username.
     */
    static post(post) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!post) {
                return post;
            }
            const author = yield app_1.User.getUserById(post.author);
            return Object.assign(Object.assign({}, post), { author: author.username });
        });
    }
    /**
     * Same as {@link post} but for an array of PostDoc for improved performance.
     */
    static posts(posts) {
        return __awaiter(this, void 0, void 0, function* () {
            const authors = yield app_1.User.idsToUsernames(posts.map((post) => post.author));
            return posts.map((post, i) => (Object.assign(Object.assign({}, post), { author: authors[i] })));
        });
    }
    /**
     * Convert CommentDoc into more readable format for the frontend by converting the author id into a username and a post if to a content.
     */
    static comment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!comment) {
                return comment;
            }
            const author = yield app_1.User.getUserById(comment.author);
            const target = yield app_1.Post.getPostById(comment.target);
            return Object.assign(Object.assign({}, comment), { author: author.username, target: target.content });
        });
    }
    /**
     * Same as {@link comment} but for an array of CommentDoc for improved performance.
     */
    static comments(comments) {
        return __awaiter(this, void 0, void 0, function* () {
            const authors = yield app_1.User.idsToUsernames(comments.map((comment) => comment.author));
            const targets = yield app_1.Post.idsToPost(comments.map((comment) => new mongodb_1.ObjectId(comment.target)));
            return comments.map((comment, i) => (Object.assign(Object.assign({}, comment), { author: authors[i], target: targets[i] })));
        });
    }
    /**
     * Convert FriendRequestDoc into more readable format for the frontend
     * by converting the ids into usernames.
     */
    static friendRequests(requests) {
        return __awaiter(this, void 0, void 0, function* () {
            const from = requests.map((request) => request.from);
            const to = requests.map((request) => request.to);
            const usernames = yield app_1.User.idsToUsernames(from.concat(to));
            return requests.map((request, i) => (Object.assign(Object.assign({}, request), { from: usernames[i], to: usernames[i + requests.length] })));
        });
    }
}
exports.default = Responses;
router_1.Router.registerError(post_1.PostAuthorNotMatchError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const username = (yield app_1.User.getUserById(e.author)).username;
    return e.formatWith(username, e._id);
}));
router_1.Router.registerError(comment_1.CommentAuthorNotMatchError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const username = (yield app_1.User.getUserById(e.author)).username;
    return e.formatWith(username, e._id);
}));
router_1.Router.registerError(friend_1.FriendRequestAlreadyExistsError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const [user1, user2] = yield Promise.all([app_1.User.getUserById(e.from), app_1.User.getUserById(e.to)]);
    return e.formatWith(user1.username, user2.username);
}));
router_1.Router.registerError(friend_1.FriendNotFoundError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const [user1, user2] = yield Promise.all([app_1.User.getUserById(e.user1), app_1.User.getUserById(e.user2)]);
    return e.formatWith(user1.username, user2.username);
}));
router_1.Router.registerError(friend_1.FriendRequestNotFoundError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const [user1, user2] = yield Promise.all([app_1.User.getUserById(e.from), app_1.User.getUserById(e.to)]);
    return e.formatWith(user1.username, user2.username);
}));
router_1.Router.registerError(friend_1.AlreadyFriendsError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const [user1, user2] = yield Promise.all([app_1.User.getUserById(e.user1), app_1.User.getUserById(e.user2)]);
    return e.formatWith(user1.username, user2.username);
}));
//# sourceMappingURL=responses.js.map