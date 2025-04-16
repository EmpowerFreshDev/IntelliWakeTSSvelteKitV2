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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { invalidate, invalidateAll } from '$app/navigation';
import { CleanNumber, IsOn, ObjectFromFormData, ToArray } from '@empowerfresh/intelliwake';
import { ShowActivityOverlay, ShowMessageBox } from './Definitions';
import { tick } from 'svelte';
/**
 * FormEnhance is intended to be used with Svelte's `use:enhance` feature. It takes the place of repeated boilerplate
 * code including handling showing/hiding the overlay, displaying response messages, and providing callbacks for success
 * and failure
 * @param options Toggle activity overlay, invalidate, reset, and success message and provides callback for API
 * success and failure
 * @constructor
 */
export function FormEnhance(options) {
    var _this = this;
    var _a;
    if (((options === null || options === void 0 ? void 0 : options.validateFormData) || (options === null || options === void 0 ? void 0 : options.validateObject)) && !options.input)
        throw new Error('"input" field must be included to validate form, for example: use:enhance={(input) => FormEnhance({input, ...options})}');
    if (options === null || options === void 0 ? void 0 : options.input) {
        var validation = options.validateFormData ? options.validateFormData(options.input.formData, options.input.action) :
            options.validateObject ? options.validateObject(ObjectFromFormData(options.input.formData), options.input.action) :
                true;
        if (validation !== true && validation !== undefined) {
            if (typeof validation === 'string') {
                ShowMessageBox.show(validation);
            }
            return options.input.cancel();
        }
    }
    if ((_a = options === null || options === void 0 ? void 0 : options.showActivityOverlay) !== null && _a !== void 0 ? _a : true)
        ShowActivityOverlay.show();
    if (options === null || options === void 0 ? void 0 : options.onStart)
        options.onStart();
    return function (response) { return __awaiter(_this, void 0, void 0, function () {
        var reset, _i, _a, invalidateItem;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        return __generator(this, function (_z) {
            switch (_z.label) {
                case 0: return [4 /*yield*/, tick()];
                case 1:
                    _z.sent();
                    reset = (!((_d = (_c = (_b = response.result) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.success) !== null && _d !== void 0 ? _d : true) || !!((_e = response.result.data) === null || _e === void 0 ? void 0 : _e.errorMessage)) ? false : ((_f = options === null || options === void 0 ? void 0 : options.reset) !== null && _f !== void 0 ? _f : false);
                    if (reset) {
                        response.update({
                            reset: reset
                        });
                    }
                    if (((_g = options === null || options === void 0 ? void 0 : options.displayResult) !== null && _g !== void 0 ? _g : true) && ((_j = (_h = response.result) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.errorMessage)) {
                        ShowMessageBox.show(response.result.data.errorMessage);
                    }
                    else if (((_k = options === null || options === void 0 ? void 0 : options.displayResult) !== null && _k !== void 0 ? _k : true) && ((_m = (_l = response === null || response === void 0 ? void 0 : response.result) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.message)) {
                        ShowMessageBox.show(response.result.data.message);
                    }
                    else if (((_p = (_o = response.result) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.success) && (options === null || options === void 0 ? void 0 : options.message)) {
                        ShowMessageBox.show(options.message);
                    }
                    if (!(options === null || options === void 0 ? void 0 : options.invalidate)) return [3 /*break*/, 7];
                    if (!(options.invalidate === 'All' || options.invalidate === 'app:All')) return [3 /*break*/, 3];
                    if (options.verbose)
                        console.info('Invalidating All');
                    return [4 /*yield*/, invalidateAll()];
                case 2:
                    _z.sent();
                    return [3 /*break*/, 7];
                case 3:
                    _i = 0, _a = ToArray(options.invalidate);
                    _z.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    invalidateItem = _a[_i];
                    if (options.verbose)
                        console.info('Invalidate', invalidateItem);
                    return [4 /*yield*/, invalidate(invalidateItem)];
                case 5:
                    _z.sent();
                    _z.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    if ((_q = options === null || options === void 0 ? void 0 : options.showActivityOverlay) !== null && _q !== void 0 ? _q : true)
                        ShowActivityOverlay.hide();
                    if (!((_s = (_r = response.result) === null || _r === void 0 ? void 0 : _r.data) === null || _s === void 0 ? void 0 : _s.errorMessage) && IsOn((_v = (_u = (_t = response.result) === null || _t === void 0 ? void 0 : _t.data) === null || _u === void 0 ? void 0 : _u.success) !== null && _v !== void 0 ? _v : true) && CleanNumber((_x = (_w = response.result) === null || _w === void 0 ? void 0 : _w.status) !== null && _x !== void 0 ? _x : 200) === 200) {
                        if (options === null || options === void 0 ? void 0 : options.onSuccess)
                            options.onSuccess((_y = response.result) === null || _y === void 0 ? void 0 : _y.data, response.action.search);
                    }
                    else {
                        if (options === null || options === void 0 ? void 0 : options.onFailure)
                            options.onFailure(response.action.search, response.result.data);
                    }
                    return [4 /*yield*/, tick()];
                case 8:
                    _z.sent();
                    if (options === null || options === void 0 ? void 0 : options.onEnd)
                        options.onEnd();
                    return [2 /*return*/];
            }
        });
    }); };
}
