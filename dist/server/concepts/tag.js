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
const openai_1 = __importDefault(require("openai"));
const doc_1 = __importDefault(require("../framework/doc"));
const openai = new openai_1.default({
    apiKey: process.env["OPENAI_API_KEY"],
});
class TagConcept {
    constructor() {
        this.tags = new doc_1.default("tags");
        this.defaultTags = ["food", "school", "work", "trip", "friend", "family", "music", "workout", "weather", "book", "art", "finance"];
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.tags.createOne({ user, userTags: [] });
            return { msg: "Tag successfully created!", tag: yield this.tags.readOne({ _id }) };
        });
    }
    getTags(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield this.tags.readMany(query);
            return tags;
        });
    }
    getOtherTags(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const allTags = yield this.getTags({});
            const thisTags = yield this.getByUser(user);
            const otherTags = [];
            for (const tag of allTags) {
                if (tag.user.toString() !== thisTags.user.toString()) {
                    otherTags.push(tag);
                }
            }
            return otherTags;
        });
    }
    getByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getTags({ user }))[0];
        });
    }
    update(user, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield this.generateTags(content);
            yield this.tags.updateOne({ user }, { userTags: tags });
            return { msg: "Tags successfully updated!" };
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tags.deleteOne({ user: user });
            return { msg: "Tag deleted successfully!" };
        });
    }
    generateTags(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // prompt to be fed into the chat-gpt-api
            const userPrompt = "Assign multiple topics as an array from the topic list given below to the following quote:\nQuote - " +
                data +
                "\n\ntopics = [" +
                this.defaultTags.join(", ") +
                "]\n\n Output should be in the format `topics = ['']`";
            const response = yield openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0.8,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.6,
            });
            const message = response.choices[0];
            const content = message.message.content;
            const topicsArr = content === null || content === void 0 ? void 0 : content.match(/\[([^[\]]*)\]/);
            let topicsArr_;
            if (topicsArr) {
                topicsArr_ = (_a = topicsArr[0].match(/'[^']*'/g)) === null || _a === void 0 ? void 0 : _a.map((topic) => topic.slice(1, -1));
            }
            const generatedTopics = topicsArr_ === null || topicsArr_ === void 0 ? void 0 : topicsArr_.map((str) => str.toLowerCase());
            // Match generated topics with default tags and create result object
            const result = generatedTopics === null || generatedTopics === void 0 ? void 0 : generatedTopics.filter((tag) => this.defaultTags.includes(tag));
            return result;
        });
    }
}
exports.default = TagConcept;
//# sourceMappingURL=tag.js.map