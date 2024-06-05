"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const errors_1 = require("./errors");
class WebSessionConcept {
    start(session, user) {
        this.isLoggedOut(session);
        session.user = user.toString();
    }
    end(session) {
        this.isLoggedIn(session);
        session.user = undefined;
    }
    getUser(session) {
        this.isLoggedIn(session);
        return new mongodb_1.ObjectId(session.user);
    }
    isLoggedIn(session) {
        if (session.user === undefined) {
            throw new errors_1.UnauthenticatedError("Must be logged in!");
        }
    }
    isLoggedOut(session) {
        if (session.user !== undefined) {
            throw new errors_1.NotAllowedError("Must be logged out!");
        }
    }
}
exports.default = WebSessionConcept;
//# sourceMappingURL=websession.js.map