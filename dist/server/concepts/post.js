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
exports.PostAuthorNotMatchError = void 0;
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class PostConcept {
    constructor() {
        this.posts = new doc_1.default("posts");
    }
    create(author, content, image, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.posts.createOne({ author, content, image, options });
            return { msg: "Post successfully created!", post: yield this.posts.readOne({ _id }) };
        });
    }
    idsToPost(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ids);
            console.log({ _id: { $in: ids } });
            const posts = yield this.posts.readMany({ _id: { $in: ids } });
            console.log(posts);
            // Store strings in Map because ObjectId comparison by reference is wrong
            const idToPost = new Map(posts.map((post) => [post._id.toString(), post]));
            console.log(idToPost);
            return ids.map((id) => { var _a, _b; return (_b = (_a = idToPost.get(id.toString())) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : "DELETED_USER"; });
        });
    }
    getPostById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.posts.readOne({ _id });
            if (post === null) {
                throw new errors_1.NotFoundError(`Post not found!`);
            }
            return post;
        });
    }
    getPosts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.posts.readMany(query, {
                sort: { dateUpdated: -1 },
            });
            return posts;
        });
    }
    getByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getPosts({ author });
        });
    }
    update(_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sanitizeUpdate(update);
            yield this.posts.updateOne({ _id }, update);
            return { msg: "Post successfully updated!" };
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.posts.deleteOne({ _id });
            return { msg: "Post deleted successfully!" };
        });
    }
    deleteByUser(author) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.posts.deleteMany({ author: author });
            return { msg: `All '${author}''s posts deleted successfully!` };
        });
    }
    isAuthor(user, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.posts.readOne({ _id });
            if (!post) {
                throw new errors_1.NotFoundError(`Post ${_id} does not exist!`);
            }
            if (post.author.toString() !== user.toString()) {
                throw new PostAuthorNotMatchError(user, _id);
            }
        });
    }
    sanitizeUpdate(update) {
        // Make sure the update cannot change the author.
        const allowedUpdates = ["content", "options"];
        for (const key in update) {
            if (!allowedUpdates.includes(key)) {
                throw new errors_1.NotAllowedError(`Cannot update '${key}' field!`);
            }
        }
    }
}
exports.default = PostConcept;
class PostAuthorNotMatchError extends errors_1.NotAllowedError {
    constructor(author, _id) {
        super("{0} is not the author of post {1}!", author, _id);
        this.author = author;
        this._id = _id;
    }
}
exports.PostAuthorNotMatchError = PostAuthorNotMatchError;
//# sourceMappingURL=post.js.map