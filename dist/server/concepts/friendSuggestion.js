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
exports.IsNotEnabledError = exports.AlreadyDisabledError = exports.AlreadyEnabledError = void 0;
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class FriendSugConcept {
    constructor() {
        this.friendSug = new doc_1.default("friends");
    }
    enable(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.friendSug.createOne({ user, suggestion: [] });
            return { msg: "FriendSuggestion created successfully!", user: yield this.friendSug.readOne({ _id }) };
        });
    }
    disable(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isDisabled(user);
            yield this.friendSug.deleteMany({ user: user });
            return { msg: "Disabled successfully!" };
        });
    }
    isDisabled(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const suggestion = yield this.friendSug.readOne({ user: user });
            console.log(suggestion);
            if (!suggestion) {
                throw new IsNotEnabledError(user);
            }
            else {
                return;
            }
        });
    }
    isEnabled(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const suggestion = yield this.friendSug.readOne({ user: user });
            console.log(suggestion);
            if (suggestion) {
                throw new AlreadyEnabledError(user);
            }
            else {
                return;
            }
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.friendSug.deleteOne({ user });
        });
    }
    getFriendSug(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.friendSug.readOne({ user });
        });
    }
    generateFriendSug(user, userTags, otherTags) {
        return __awaiter(this, void 0, void 0, function* () {
            // const _id = await this.friendSug.readOne({ user });
            yield this.isDisabled(user);
            const suggestion = [];
            for (const [username, tags] of otherTags) {
                for (const tag of tags) {
                    if (userTags.includes(tag)) {
                        suggestion.push(username);
                        break;
                    }
                }
            }
            console.log(suggestion);
            yield this.friendSug.updateOne({ user }, { suggestion });
            return { msg: "Generated some Friend Suggestion" };
        });
    }
}
exports.default = FriendSugConcept;
class AlreadyEnabledError extends errors_1.NotAllowedError {
    constructor(user) {
        super("{0} already enabled friend suggestion!", user);
        this.user = user;
    }
}
exports.AlreadyEnabledError = AlreadyEnabledError;
class AlreadyDisabledError extends errors_1.NotAllowedError {
    constructor(user) {
        super("{0} already disabled friend suggestion!", user);
        this.user = user;
    }
}
exports.AlreadyDisabledError = AlreadyDisabledError;
class IsNotEnabledError extends errors_1.NotAllowedError {
    constructor(user) {
        super("{0} has not enabled friend suggestion!", user);
        this.user = user;
    }
}
exports.IsNotEnabledError = IsNotEnabledError;
//# sourceMappingURL=friendSuggestion.js.map