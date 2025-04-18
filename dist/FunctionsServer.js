var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { FormDataFromObject, ObjectFromFormData } from '@empowerfresh/intelliwake';
/**
 * This function retrieves form data from a given Request object.
 * If an error is encountered while trying to get the form data,
 * it catches this error and instead converts the Request body to JSON, then returns FormData created from this JSON object.
 *
 * @async
 * @export
 * @function RequestFormData
 * @param {Request} request - The request from which to retrieve the form data.
 * @returns {Promise<FormData>} A promise that resolves to the form data if successful, or the form data from JSON if an error is encountered.
 * @throws Will throw an error if the network request fails.
 */
export function RequestFormData(request) {
    return __awaiter(this, void 0, Promise, function () {
        var err_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 4]);
                    return [4 /*yield*/, request.formData()];
                case 1: return [2 /*return*/, _b.sent()];
                case 2:
                    err_1 = _b.sent();
                    _a = FormDataFromObject;
                    return [4 /*yield*/, request.json()];
                case 3: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * This function retrieves an object of generic type T from a given Request object.
 * If an error is encountered while trying to get the object from form data,
 * it catches this error and instead returns the object from the Request body parsed as JSON.
 *
 * @async
 * @export
 * @function RequestObject
 * @param {Request} request - The request from which to retrieve the object.
 * @returns {Promise<T>} A promise that resolves to an object of type T if successful, or the JSON parsed object from the request if an error is encountered.
 * @throws Will throw an error if the network request fails.
 * @template T - The type of object to be returned. It defaults to any.
 */
export function RequestObject(request) {
    return __awaiter(this, void 0, Promise, function () {
        var _a, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 4]);
                    _a = ObjectFromFormData;
                    return [4 /*yield*/, request.formData()];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                case 2:
                    err_2 = _b.sent();
                    return [4 /*yield*/, request.json()];
                case 3: return [2 /*return*/, _b.sent()];
                case 4: return [2 /*return*/];
            }
        });
    });
}
