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
exports.NotEnoughPointError = void 0;
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class PointConcept {
    constructor() {
        this.points = new doc_1.default("points");
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.points.createOne({ user, point: 0 });
            return { msg: "Points successfully created!", points: yield this.points.readOne({ _id }) };
        });
    }
    getPoint(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const point = yield this.points.readOne({ user });
            return point;
        });
    }
    addPoint(user, pointsToAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            const point = yield this.getPoint(user);
            if (point) {
                const newPoint = point.point + Number(pointsToAdd);
                yield this.points.updateOne({ user }, { point: newPoint });
                return { msg: "Point successfully updated!" };
            }
        });
    }
    spendPoint(user, pointsToSpend) {
        return __awaiter(this, void 0, void 0, function* () {
            const point = yield this.getPoint(user);
            if (point) {
                const newPoint = point.point - Number(pointsToSpend);
                yield this.points.updateOne({ user }, { point: newPoint });
                return { msg: "Point successfully updated!" };
            }
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.points.deleteOne({ _id });
            return { msg: "Point deleted successfully!" };
        });
    }
    canComment(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const point = yield this.points.readOne({ user });
            if (point) {
                if (point.point > 0) {
                    return true;
                }
                else {
                    throw new NotEnoughPointError(point.user);
                }
            }
        });
    }
    canSendRequest(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const point = yield this.points.readOne({ user });
            if (point) {
                if (point.point > 0) {
                    return true;
                }
                else {
                    throw new NotEnoughPointError(point.user);
                }
            }
        });
    }
}
exports.default = PointConcept;
class NotEnoughPointError extends errors_1.NotAllowedError {
    constructor(user) {
        super("{0} does not have enough point!", user);
        this.user = user;
    }
}
exports.NotEnoughPointError = NotEnoughPointError;
//# sourceMappingURL=point.js.map