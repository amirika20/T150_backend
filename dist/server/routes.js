"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
const router_1 = require("./framework/router");
const app_1 = require("./app");
const responses_1 = __importDefault(require("./responses"));
let Routes = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _getSessionUser_decorators;
    let _getUsers_decorators;
    let _getUser_decorators;
    let _createUser_decorators;
    let _updateUser_decorators;
    let _deleteUser_decorators;
    let _logIn_decorators;
    let _logOut_decorators;
    let _getPosts_decorators;
    let _createPost_decorators;
    let _updatePost_decorators;
    let _deletePost_decorators;
    let _getCommentsByTarget_decorators;
    let _getCommentsByAuthor_decorators;
    let _deleteCommentsByTarget_decorators;
    let _createComment_decorators;
    let _updateComment_decorators;
    let _deleteComment_decorators;
    let _getFriends_decorators;
    let _removeFriend_decorators;
    let _getRequests_decorators;
    let _sendFriendRequest_decorators;
    let _removeFriendRequest_decorators;
    let _acceptFriendRequest_decorators;
    let _rejectFriendRequest_decorators;
    let _getPoints_decorators;
    let _addPoints_decorators;
    let _spendPoints_decorators;
    let _getTags_decorators;
    let _getOtherTags_decorators;
    let _enable_decorators;
    let _disable_decorators;
    let _generateFriendSug_decorators;
    let _getFriendSuggestion_decorators;
    return _a = class Routes {
            getSessionUser(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.User.getUserById(user);
                });
            }
            getUsers() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield app_1.User.getUsers();
                });
            }
            getUser(username) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield app_1.User.getUserByUsername(username);
                });
            }
            createUser(session, username, password) {
                var _b, _c, _d;
                return __awaiter(this, void 0, void 0, function* () {
                    app_1.WebSession.isLoggedOut(session);
                    const user = yield app_1.User.create(username, password);
                    if ((_b = user.user) === null || _b === void 0 ? void 0 : _b._id) {
                        yield app_1.Point.create((_c = user.user) === null || _c === void 0 ? void 0 : _c._id);
                        yield app_1.Tag.create((_d = user.user) === null || _d === void 0 ? void 0 : _d._id);
                    }
                    return user;
                });
            }
            updateUser(session, update) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.User.update(user, update);
                });
            }
            deleteUser(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    app_1.WebSession.end(session);
                    yield app_1.Comment.deleteByAuthor(user);
                    yield app_1.Post.deleteByUser(user);
                    yield app_1.Tag.delete(user);
                    yield app_1.FriendSug.delete(user);
                    return yield app_1.User.delete(user);
                });
            }
            logIn(session, username, password) {
                return __awaiter(this, void 0, void 0, function* () {
                    const u = yield app_1.User.authenticate(username, password);
                    app_1.WebSession.start(session, u._id);
                    return { msg: "Logged in!" };
                });
            }
            logOut(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    app_1.WebSession.end(session);
                    return { msg: "Logged out!" };
                });
            }
            getPosts(author) {
                return __awaiter(this, void 0, void 0, function* () {
                    let posts;
                    if (author) {
                        const id = (yield app_1.User.getUserByUsername(author))._id;
                        posts = yield app_1.Post.getByAuthor(id);
                    }
                    else {
                        posts = yield app_1.Post.getPosts({});
                    }
                    return responses_1.default.posts(posts);
                });
            }
            createPost(session, content, image, options) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const created = yield app_1.Post.create(user, content, image, options);
                    const pointsToAdd = String(content.trim().split(/\s+/).length);
                    yield app_1.Point.addPoint(user, pointsToAdd);
                    yield app_1.Tag.update(user, content);
                    return { msg: created.msg, post: yield responses_1.default.post(created.post) };
                });
            }
            updatePost(session, _id, update) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Post.isAuthor(user, _id);
                    return yield app_1.Post.update(_id, update);
                });
            }
            deletePost(session, _id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Post.isAuthor(user, _id);
                    yield app_1.Comment.deleteByTarget(_id);
                    return app_1.Post.delete(_id);
                });
            }
            getCommentsByTarget(target) {
                return __awaiter(this, void 0, void 0, function* () {
                    const comments = yield app_1.Comment.getByTarget(target);
                    return responses_1.default.comments(comments);
                });
            }
            getCommentsByAuthor(author) {
                return __awaiter(this, void 0, void 0, function* () {
                    let comments;
                    if (author) {
                        const id = (yield app_1.User.getUserByUsername(author))._id;
                        comments = yield app_1.Comment.getByAuthor(id);
                    }
                    else {
                        comments = yield app_1.Comment.getComments({});
                    }
                    return responses_1.default.comments(comments);
                });
            }
            deleteCommentsByTarget(target) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield app_1.Comment.deleteByTarget(target);
                });
            }
            createComment(session, content, target) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    if (yield app_1.Point.canComment(user)) {
                        const created = yield app_1.Comment.create(user, target, content);
                        yield app_1.Point.spendPoint(user, "2");
                        return { msg: created.msg, comment: yield responses_1.default.comment(created.comment) };
                    }
                    else {
                        return { msg: "user does not have enough point to comment" };
                    }
                });
            }
            updateComment(session, _id, update) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Comment.isAuthor(user, _id);
                    return yield app_1.Comment.update(_id, update);
                });
            }
            deleteComment(session, _id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.Comment.isAuthor(user, _id);
                    yield app_1.Comment.deleteByTarget(_id);
                    return app_1.Comment.delete(_id);
                });
            }
            getFriends(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.User.idsToUsernames(yield app_1.Friend.getFriends(user));
                });
            }
            removeFriend(session, friend) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const friendId = (yield app_1.User.getUserByUsername(friend))._id;
                    return yield app_1.Friend.removeFriend(user, friendId);
                });
            }
            getRequests(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield responses_1.default.friendRequests(yield app_1.Friend.getRequests(user));
                });
            }
            sendFriendRequest(session, to) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    if (yield app_1.Point.canSendRequest(user)) {
                        const toId = (yield app_1.User.getUserByUsername(to))._id;
                        return yield app_1.Friend.sendRequest(user, toId);
                    }
                    else {
                        return { msg: "Not enough point to send a friend request" };
                    }
                });
            }
            removeFriendRequest(session, to) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const toId = (yield app_1.User.getUserByUsername(to))._id;
                    return yield app_1.Friend.removeRequest(user, toId);
                });
            }
            acceptFriendRequest(session, from) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const fromId = (yield app_1.User.getUserByUsername(from))._id;
                    return yield app_1.Friend.acceptRequest(fromId, user);
                });
            }
            rejectFriendRequest(session, from) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const fromId = (yield app_1.User.getUserByUsername(from))._id;
                    return yield app_1.Friend.rejectRequest(fromId, user);
                });
            }
            getPoints(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.Point.getPoint(user);
                });
            }
            addPoints(session, pointsToAdd) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.Point.addPoint(user, pointsToAdd);
                });
            }
            spendPoints(session, pointsToSpend) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.Point.spendPoint(user, pointsToSpend);
                });
            }
            getTags(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.Tag.getByUser(user);
                });
            }
            getOtherTags(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.Tag.getOtherTags(user);
                });
            }
            enable(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    yield app_1.FriendSug.isEnabled(user);
                    return yield app_1.FriendSug.enable(user);
                });
            }
            disable(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.FriendSug.disable(user);
                });
            }
            generateFriendSug(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    const userTags = (yield app_1.Tag.getByUser(user)).userTags;
                    const otherTagsDoc = yield app_1.Tag.getOtherTags(user);
                    const otherTags = new Map();
                    for (const TagDoc of otherTagsDoc) {
                        otherTags.set((yield app_1.User.getUserById(TagDoc.user)).username, TagDoc.userTags);
                    }
                    const suggestion = yield app_1.FriendSug.generateFriendSug(user, userTags, otherTags);
                    return suggestion;
                });
            }
            getFriendSuggestion(session) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = app_1.WebSession.getUser(session);
                    return yield app_1.FriendSug.getFriendSug(user);
                });
            }
            constructor() {
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getSessionUser_decorators = [router_1.Router.get("/session")];
            _getUsers_decorators = [router_1.Router.get("/users")];
            _getUser_decorators = [router_1.Router.get("/users/:username")];
            _createUser_decorators = [router_1.Router.post("/users")];
            _updateUser_decorators = [router_1.Router.patch("/users")];
            _deleteUser_decorators = [router_1.Router.delete("/users")];
            _logIn_decorators = [router_1.Router.post("/login")];
            _logOut_decorators = [router_1.Router.post("/logout")];
            _getPosts_decorators = [router_1.Router.get("/posts")];
            _createPost_decorators = [router_1.Router.post("/posts")];
            _updatePost_decorators = [router_1.Router.patch("/posts/:_id")];
            _deletePost_decorators = [router_1.Router.delete("/posts/:_id")];
            _getCommentsByTarget_decorators = [router_1.Router.get("/comments/target/:target")];
            _getCommentsByAuthor_decorators = [router_1.Router.get("/comments")];
            _deleteCommentsByTarget_decorators = [router_1.Router.delete("/comments/target/:target")];
            _createComment_decorators = [router_1.Router.post("/comments")];
            _updateComment_decorators = [router_1.Router.patch("/comments/:_id")];
            _deleteComment_decorators = [router_1.Router.delete("/comments/:_id")];
            _getFriends_decorators = [router_1.Router.get("/friends")];
            _removeFriend_decorators = [router_1.Router.delete("/friends/:friend")];
            _getRequests_decorators = [router_1.Router.get("/friend/requests")];
            _sendFriendRequest_decorators = [router_1.Router.post("/friend/requests/:to")];
            _removeFriendRequest_decorators = [router_1.Router.delete("/friend/requests/:to")];
            _acceptFriendRequest_decorators = [router_1.Router.put("/friend/accept/:from")];
            _rejectFriendRequest_decorators = [router_1.Router.put("/friend/reject/:from")];
            _getPoints_decorators = [router_1.Router.get("/points")];
            _addPoints_decorators = [router_1.Router.patch("/points/add/:pointsToAdd")];
            _spendPoints_decorators = [router_1.Router.patch("/points/spend/:pointsToSpend")];
            _getTags_decorators = [router_1.Router.get("/tags")];
            _getOtherTags_decorators = [router_1.Router.get("/tags/others")];
            _enable_decorators = [router_1.Router.post("/friendSug")];
            _disable_decorators = [router_1.Router.delete("/friendSug")];
            _generateFriendSug_decorators = [router_1.Router.patch("/friendSug")];
            _getFriendSuggestion_decorators = [router_1.Router.get("/friendSug")];
            __esDecorate(_a, null, _getSessionUser_decorators, { kind: "method", name: "getSessionUser", static: false, private: false, access: { has: obj => "getSessionUser" in obj, get: obj => obj.getSessionUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getUsers_decorators, { kind: "method", name: "getUsers", static: false, private: false, access: { has: obj => "getUsers" in obj, get: obj => obj.getUsers }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getUser_decorators, { kind: "method", name: "getUser", static: false, private: false, access: { has: obj => "getUser" in obj, get: obj => obj.getUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _createUser_decorators, { kind: "method", name: "createUser", static: false, private: false, access: { has: obj => "createUser" in obj, get: obj => obj.createUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateUser_decorators, { kind: "method", name: "updateUser", static: false, private: false, access: { has: obj => "updateUser" in obj, get: obj => obj.updateUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteUser_decorators, { kind: "method", name: "deleteUser", static: false, private: false, access: { has: obj => "deleteUser" in obj, get: obj => obj.deleteUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _logIn_decorators, { kind: "method", name: "logIn", static: false, private: false, access: { has: obj => "logIn" in obj, get: obj => obj.logIn }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _logOut_decorators, { kind: "method", name: "logOut", static: false, private: false, access: { has: obj => "logOut" in obj, get: obj => obj.logOut }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getPosts_decorators, { kind: "method", name: "getPosts", static: false, private: false, access: { has: obj => "getPosts" in obj, get: obj => obj.getPosts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _createPost_decorators, { kind: "method", name: "createPost", static: false, private: false, access: { has: obj => "createPost" in obj, get: obj => obj.createPost }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updatePost_decorators, { kind: "method", name: "updatePost", static: false, private: false, access: { has: obj => "updatePost" in obj, get: obj => obj.updatePost }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deletePost_decorators, { kind: "method", name: "deletePost", static: false, private: false, access: { has: obj => "deletePost" in obj, get: obj => obj.deletePost }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getCommentsByTarget_decorators, { kind: "method", name: "getCommentsByTarget", static: false, private: false, access: { has: obj => "getCommentsByTarget" in obj, get: obj => obj.getCommentsByTarget }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getCommentsByAuthor_decorators, { kind: "method", name: "getCommentsByAuthor", static: false, private: false, access: { has: obj => "getCommentsByAuthor" in obj, get: obj => obj.getCommentsByAuthor }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteCommentsByTarget_decorators, { kind: "method", name: "deleteCommentsByTarget", static: false, private: false, access: { has: obj => "deleteCommentsByTarget" in obj, get: obj => obj.deleteCommentsByTarget }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _createComment_decorators, { kind: "method", name: "createComment", static: false, private: false, access: { has: obj => "createComment" in obj, get: obj => obj.createComment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateComment_decorators, { kind: "method", name: "updateComment", static: false, private: false, access: { has: obj => "updateComment" in obj, get: obj => obj.updateComment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteComment_decorators, { kind: "method", name: "deleteComment", static: false, private: false, access: { has: obj => "deleteComment" in obj, get: obj => obj.deleteComment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getFriends_decorators, { kind: "method", name: "getFriends", static: false, private: false, access: { has: obj => "getFriends" in obj, get: obj => obj.getFriends }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _removeFriend_decorators, { kind: "method", name: "removeFriend", static: false, private: false, access: { has: obj => "removeFriend" in obj, get: obj => obj.removeFriend }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getRequests_decorators, { kind: "method", name: "getRequests", static: false, private: false, access: { has: obj => "getRequests" in obj, get: obj => obj.getRequests }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _sendFriendRequest_decorators, { kind: "method", name: "sendFriendRequest", static: false, private: false, access: { has: obj => "sendFriendRequest" in obj, get: obj => obj.sendFriendRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _removeFriendRequest_decorators, { kind: "method", name: "removeFriendRequest", static: false, private: false, access: { has: obj => "removeFriendRequest" in obj, get: obj => obj.removeFriendRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _acceptFriendRequest_decorators, { kind: "method", name: "acceptFriendRequest", static: false, private: false, access: { has: obj => "acceptFriendRequest" in obj, get: obj => obj.acceptFriendRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _rejectFriendRequest_decorators, { kind: "method", name: "rejectFriendRequest", static: false, private: false, access: { has: obj => "rejectFriendRequest" in obj, get: obj => obj.rejectFriendRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getPoints_decorators, { kind: "method", name: "getPoints", static: false, private: false, access: { has: obj => "getPoints" in obj, get: obj => obj.getPoints }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _addPoints_decorators, { kind: "method", name: "addPoints", static: false, private: false, access: { has: obj => "addPoints" in obj, get: obj => obj.addPoints }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _spendPoints_decorators, { kind: "method", name: "spendPoints", static: false, private: false, access: { has: obj => "spendPoints" in obj, get: obj => obj.spendPoints }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getTags_decorators, { kind: "method", name: "getTags", static: false, private: false, access: { has: obj => "getTags" in obj, get: obj => obj.getTags }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getOtherTags_decorators, { kind: "method", name: "getOtherTags", static: false, private: false, access: { has: obj => "getOtherTags" in obj, get: obj => obj.getOtherTags }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _enable_decorators, { kind: "method", name: "enable", static: false, private: false, access: { has: obj => "enable" in obj, get: obj => obj.enable }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _disable_decorators, { kind: "method", name: "disable", static: false, private: false, access: { has: obj => "disable" in obj, get: obj => obj.disable }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _generateFriendSug_decorators, { kind: "method", name: "generateFriendSug", static: false, private: false, access: { has: obj => "generateFriendSug" in obj, get: obj => obj.generateFriendSug }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getFriendSuggestion_decorators, { kind: "method", name: "getFriendSuggestion", static: false, private: false, access: { has: obj => "getFriendSuggestion" in obj, get: obj => obj.getFriendSuggestion }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = (0, router_1.getExpressRouter)(new Routes());
//# sourceMappingURL=routes.js.map