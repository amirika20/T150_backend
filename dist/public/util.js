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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const operations = [
    {
        name: "Get Session User (logged in user)",
        endpoint: "/api/session",
        method: "GET",
        fields: {},
    },
    {
        name: "Create User",
        endpoint: "/api/users",
        method: "POST",
        fields: { username: "input", password: "input" },
    },
    {
        name: "Login",
        endpoint: "/api/login",
        method: "POST",
        fields: { username: "input", password: "input" },
    },
    {
        name: "Logout",
        endpoint: "/api/logout",
        method: "POST",
        fields: {},
    },
    {
        name: "Update User",
        endpoint: "/api/users",
        method: "PATCH",
        fields: { update: { username: "input", password: "input" } },
    },
    {
        name: "Delete User",
        endpoint: "/api/users",
        method: "DELETE",
        fields: {},
    },
    {
        name: "Get Users (empty for all)",
        endpoint: "/api/users/:username",
        method: "GET",
        fields: { username: "input" },
    },
    {
        name: "Get points",
        endpoint: "/api/points",
        method: "GET",
        fields: {},
    },
    {
        name: "Add points",
        endpoint: "/api/points/add/:pointsToAdd",
        method: "PATCH",
        fields: { pointsToAdd: "input" },
    },
    {
        name: "Spend points",
        endpoint: "/api/points/spend/:pointsToSpend",
        method: "PATCH",
        fields: { pointsToSpend: "input" },
    },
    {
        name: "Get Posts (empty for all)",
        endpoint: "/api/posts",
        method: "GET",
        fields: { author: "input" },
    },
    {
        name: "Create Post",
        endpoint: "/api/posts",
        method: "POST",
        fields: { content: "input", image: "input" },
    },
    {
        name: "Update Post",
        endpoint: "/api/posts/:id",
        method: "PATCH",
        fields: { id: "input", update: { content: "input", image: "input", options: { backgroundColor: "input" } } },
    },
    {
        name: "Delete Post",
        endpoint: "/api/posts/:id",
        method: "DELETE",
        fields: { id: "input" },
    },
    {
        name: "Get Friends",
        endpoint: "/api/friends",
        method: "GET",
        fields: {},
    },
    {
        name: "Remove Friend",
        endpoint: "/api/friends/:friend",
        method: "DELETE",
        fields: { friend: "input" },
    },
    {
        name: "Get Friend Request",
        endpoint: "/api/friend/requests",
        method: "GET",
        fields: {},
    },
    {
        name: "Send Friend Request",
        endpoint: "/api/friend/requests/:to",
        method: "POST",
        fields: { to: "input" },
    },
    {
        name: "Delete Friend Request",
        endpoint: "/api/friend/requests/:to",
        method: "DELETE",
        fields: { to: "input" },
    },
    {
        name: "Accept Friend Request",
        endpoint: "/api/friend/accept/:from",
        method: "PUT",
        fields: { from: "input" },
    },
    {
        name: "Reject Friend Request",
        endpoint: "/api/friend/reject/:from",
        method: "PUT",
        fields: { from: "input" },
    },
    {
        name: "Get Comments of an author",
        endpoint: "/api/comments",
        method: "GET",
        fields: { author: "input" },
    },
    {
        name: "Get Comments of a target",
        endpoint: "/api/comments/target/:target",
        method: "GET",
        fields: { target: "input" },
    },
    {
        name: "Post Comment",
        endpoint: "/api/comments",
        method: "POST",
        fields: { target: "input", content: "input" },
    },
    {
        name: "Update Comment",
        endpoint: "/api/comments/:_id",
        method: "DELETE",
        fields: { _id: "input", content: "input" },
    },
    {
        name: "Delete Comment",
        endpoint: "/api/comments/:_id",
        method: "DELETE",
        fields: { _id: "input" },
    },
    {
        name: "Delete Comment by post",
        endpoint: "/api/comments/target/:target",
        method: "DELETE",
        fields: { target: "input" },
    },
    {
        name: "Get Tags",
        endpoint: "/api/tags",
        method: "GET",
        fields: {},
    },
    {
        name: "Get others' Tags",
        endpoint: "/api/tags/others",
        method: "GET",
        fields: {},
    },
    {
        name: "Enable Friend Suggestion",
        endpoint: "/api/friendSug",
        method: "POST",
        fields: {},
    },
    {
        name: "Disable Friend Suggestion",
        endpoint: "/api/friendSug",
        method: "DELETE",
        fields: {},
    },
    {
        name: "Generate Friend Suggestion",
        endpoint: "/api/friendSug",
        method: "PATCH",
        fields: {},
    },
    {
        name: "Get Friend Suggestion",
        endpoint: "/api/friendSug",
        method: "GET",
        fields: {},
    },
];
// Do not edit below here.
// If you are interested in how this works, feel free to ask on forum!
function updateResponse(code, response) {
    document.querySelector("#status-code").innerHTML = code;
    document.querySelector("#response-text").innerHTML = response;
}
function request(method, endpoint, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (method === "GET" && params) {
                endpoint += "?" + new URLSearchParams(params).toString();
                params = undefined;
            }
            const res = fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
                body: params ? JSON.stringify(params) : undefined,
            });
            return {
                $statusCode: (yield res).status,
                $response: yield (yield res).json(),
            };
        }
        catch (e) {
            console.log(e);
            return {
                $statusCode: "???",
                $response: { error: "Something went wrong, check your console log.", details: e },
            };
        }
    });
}
function fieldsToHtml(fields, indent = 0, prefix = "") {
    return Object.entries(fields)
        .map(([name, tag]) => {
        return `
        <div class="field" style="margin-left: ${indent}px">
          <label>${name}:
          ${typeof tag === "string" ? `<${tag} name="${prefix}${name}"></${tag}>` : fieldsToHtml(tag, indent + 10, prefix + name + ".")}
          </label>
        </div>`;
    })
        .join("");
}
function getHtmlOperations() {
    return operations.map((operation) => {
        return `<li class="operation">
      <h3>${operation.name}</h3>
      <form class="operation-form">
        <input type="hidden" name="$endpoint" value="${operation.endpoint}" />
        <input type="hidden" name="$method" value="${operation.method}" />
        ${fieldsToHtml(operation.fields)}
        <button type="submit">Submit</button>
      </form>
    </li>`;
    });
}
function prefixedRecordIntoObject(record) {
    const obj = {}; // eslint-disable-line
    for (const [key, value] of Object.entries(record)) {
        if (!value) {
            continue;
        }
        const keys = key.split(".");
        const lastKey = keys.pop();
        let currentObj = obj;
        for (const key of keys) {
            if (!currentObj[key]) {
                currentObj[key] = {};
            }
            currentObj = currentObj[key];
        }
        currentObj[lastKey] = value;
    }
    return obj;
}
function submitEventHandler(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const form = e.target;
        const _a = Object.fromEntries(new FormData(form)), { $method, $endpoint } = _a, reqData = __rest(_a, ["$method", "$endpoint"]);
        // Replace :param with the actual value.
        const endpoint = $endpoint.replace(/:(\w+)/g, (_, key) => {
            const param = reqData[key];
            delete reqData[key];
            return param;
        });
        const data = prefixedRecordIntoObject(reqData);
        updateResponse("", "Loading...");
        const response = yield request($method, endpoint, Object.keys(data).length > 0 ? data : undefined);
        updateResponse(response.$statusCode.toString(), JSON.stringify(response.$response, null, 2));
    });
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#operations-list").innerHTML = getHtmlOperations().join("");
    document.querySelectorAll(".operation-form").forEach((form) => form.addEventListener("submit", submitEventHandler));
});
//# sourceMappingURL=util.js.map