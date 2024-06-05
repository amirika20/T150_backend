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
exports.TargetNotFound = exports.CommentAuthorNotMatchError = void 0;
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class CommentConcept {
    constructor() {
        this.comments = new doc_1.default("comments");
    }
    create(author, target, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.comments.createOne({ author, target, content });
            return { msg: "Comment successfully created!", comment: yield this.comments.readOne({ _id }) };
        });
    }
    getComments(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield this.comments.readMany(query);
            return comments;
        });
    }
    getByTarget(target) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getComments({ target });
        });
    }
    getByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getComments({ author: author });
        });
    }
    update(_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sanitizeUpdate(update);
            yield this.comments.updateOne({ _id }, update);
            return { msg: "Comment successfully updated!" };
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.comments.deleteOne({ _id });
            return { msg: "Comment deleted successfully!" };
        });
    }
    deleteByTarget(target) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.comments.deleteMany({ target });
            return { msg: `All the comments of '${target}' deleted successfully!` };
        });
    }
    deleteByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.comments.deleteMany({ author });
            return { msg: `All the comments of '${author}' deleted successfully!` };
        });
    }
    isAuthor(user, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.comments.readOne({ _id });
            if (!comment) {
                throw new errors_1.NotFoundError(`Comment ${_id} does not exist!`);
            }
            if (comment.author.toString() !== user.toString()) {
                throw new CommentAuthorNotMatchError(user, _id);
            }
        });
    }
    sanitizeUpdate(update) {
        // Make sure the update cannot change the author or target.
        const allowedUpdates = ["content"];
        for (const key in update) {
            if (!allowedUpdates.includes(key)) {
                throw new errors_1.NotAllowedError(`Cannot update '${key}' field!`);
            }
        }
    }
}
exports.default = CommentConcept;
class CommentAuthorNotMatchError extends errors_1.NotAllowedError {
    constructor(author, _id) {
        super("{0} is not the author of comment {1}!", author, _id);
        this.author = author;
        this._id = _id;
    }
}
exports.CommentAuthorNotMatchError = CommentAuthorNotMatchError;
class TargetNotFound extends errors_1.NotFoundError {
    constructor(target) {
        super("Target {0} does not exist!", target);
        this.target = target;
    }
}
exports.TargetNotFound = TargetNotFound;
//# sourceMappingURL=comment.js.map