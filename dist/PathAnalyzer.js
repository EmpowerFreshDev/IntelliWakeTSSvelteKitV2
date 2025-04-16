var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { BuildPath, GreaterNumber, ToArray } from '@empowerfresh/intelliwake';
var PathAnalyzer = /** @class */ (function () {
    function PathAnalyzer(page, base) {
        this.page = page;
        this.base = base;
    }
    Object.defineProperty(PathAnalyzer.prototype, "crumbs", {
        // /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = Test1/Page/~/Sub1/Test2
        get: function () {
            return !this.page.params.crumbs ? null : this.page.params.crumbs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "crumbsComponents", {
        // Only reported crumbs, not all predecessors necessarily if a base component is specified
        get: function () {
            var _a;
            return ((_a = this.crumbs) !== null && _a !== void 0 ? _a : '').split('/').filter(function (item) { return !!item; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "pathName", {
        // Full path as received
        get: function () {
            return this.page.url.pathname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "pathNameComponents", {
        get: function () {
            var _a;
            return ((_a = this.pathName) !== null && _a !== void 0 ? _a : '').split('/').filter(function (item) { return !!item; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "activePageComponents", {
        get: function () {
            var returnComponents = this.pathNameComponents;
            var crumbsComponentsLength = this.crumbsComponents.length;
            if (crumbsComponentsLength) {
                for (var i = 0; i < crumbsComponentsLength; i++) {
                    returnComponents.shift();
                }
            }
            if (this.base) {
                while (returnComponents.length && __spreadArray([], returnComponents, true).slice(1).includes(this.base)) {
                    returnComponents.shift();
                }
            }
            return returnComponents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "baseComponents", {
        // All components up to and including the current page
        get: function () {
            if (this.base === '')
                return this.crumbsComponents;
            if (this.activePageComponents.length === 1)
                return this.pathNameComponents;
            return this.pathNameComponents.slice(0, (this.activePageComponents.length - 1) * -1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "preComponents", {
        // All components before the current page
        get: function () {
            return this.pathNameComponents.slice(0, this.activePageComponents.length * -1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "predecessorComponents", {
        // All predecessor components
        get: function () {
            var components = this.preComponents;
            while (components.length && components.includes('~')) {
                components.pop();
            }
            return components;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "successorComponents", {
        // All successor components
        get: function () {
            var components = this.preComponents;
            while (components.length && components.includes('~')) {
                components.shift();
            }
            return components;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "activePageFull", {
        // /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = Page/Sub1
        get: function () {
            return BuildPath.apply(void 0, this.activePageComponents);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "activePage", {
        // /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = Page
        get: function () {
            var _a;
            return (_a = this.activePageComponents[0]) !== null && _a !== void 0 ? _a : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "activePageSlug", {
        // /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = Sub1
        get: function () {
            var _a, _b;
            if (this.base === '')
                return (_a = this.activePageComponents[0]) !== null && _a !== void 0 ? _a : null;
            return (_b = this.activePageComponents[1]) !== null && _b !== void 0 ? _b : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "activePageSlugs", {
        get: function () {
            var _a, _b, _c;
            if (this.base === '')
                return BuildPath.apply(void 0, (_a = this.activePageComponents) !== null && _a !== void 0 ? _a : null);
            var slugs = BuildPath.apply(void 0, (_c = (_b = this.activePageComponents) === null || _b === void 0 ? void 0 : _b.slice(1)) !== null && _c !== void 0 ? _c : null);
            return !slugs ? null : slugs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "basePath", {
        // /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = /Test1/Page/~/Sub1/Test2/Page
        get: function () {
            return BuildPath.apply(void 0, __spreadArray(['/'], this.baseComponents, false));
        },
        enumerable: false,
        configurable: true
    });
    PathAnalyzer.prototype.basePathReplaced = function (newBaseComponent, slug) {
        var newBaseComponents = __spreadArray([], this.baseComponents, true);
        newBaseComponents.pop();
        return BuildPath.apply(void 0, __spreadArray(__spreadArray(__spreadArray(['/'], newBaseComponents, false), [newBaseComponent], false), ToArray(slug !== null && slug !== void 0 ? slug : ''), false));
    };
    PathAnalyzer.prototype.apiPath = function (action) {
        return BuildPath(this.pathName, action);
    };
    Object.defineProperty(PathAnalyzer.prototype, "backPath", {
        get: function () {
            var _a, _b;
            if (this.activePageComponents.length <= 1)
                return BuildPath.apply(void 0, __spreadArray(['/'], this.predecessorComponents, false));
            var components = __spreadArray(__spreadArray([], this.preComponents, true), this.activePageComponents, true);
            if (!((_a = components[components.length - 1]) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith('tab'))) {
                return BuildPath.apply(void 0, __spreadArray(['/'], components.slice(0, components.length - 1), false));
            }
            while ((_b = components[components.length - 1]) === null || _b === void 0 ? void 0 : _b.toLowerCase().startsWith('tab')) {
                components = components.slice(0, components.length - 2);
            }
            return BuildPath.apply(void 0, __spreadArray(['/'], components, false));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathAnalyzer.prototype, "navComponents", {
        get: function () {
            var navs = [];
            var activePage = this.activePage;
            var pathNameComponents = this.pathNameComponents;
            var activePageIndex = this.pathNameComponents.lastIndexOf(activePage);
            var tildeIndex = this.pathNameComponents.indexOf('~');
            // console.info(this.pathname)
            for (var idx = 0; idx < pathNameComponents.length; idx++) {
                var component = pathNameComponents[idx];
                if (component !== '~') {
                    var selectedIndex = this.pathNameComponents.lastIndexOf(component);
                    var link = '';
                    // console.info(component)
                    if (selectedIndex >= activePageIndex) {
                        var predecessors = tildeIndex <= 0 ? [] : pathNameComponents.slice(0, tildeIndex).filter(function (item) { return item !== '~'; });
                        var successors = tildeIndex <= 0 ? this.pathNameComponents.slice(selectedIndex + 1).filter(function (item) { return item !== '~'; }) :
                            __spreadArray(__spreadArray([], this.preComponents.slice(GreaterNumber(tildeIndex, 0), activePageIndex - 1), true), this.pathNameComponents.slice(selectedIndex + 1), true).filter(function (item) { return item !== '~'; });
                        var actives = this.pathNameComponents.slice(GreaterNumber(activePageIndex - 1, 0), selectedIndex + 1).filter(function (item) { return item !== '~'; });
                        // console.info('v1', predecessors, successors, actives)
                        if (successors.length) {
                            link = BuildPath.apply(void 0, __spreadArray(__spreadArray(__spreadArray(__spreadArray(['/'], predecessors, false), ['~'], false), successors, false), actives, false));
                        }
                        else {
                            link = BuildPath.apply(void 0, __spreadArray(__spreadArray(['/'], predecessors, false), actives, false));
                        }
                    }
                    else {
                        var successors = pathNameComponents.slice(idx + 1).filter(function (item) { return item !== '~'; });
                        link = activePageIndex > 0 && activePageIndex <= idx && component === activePage ?
                            this.pathName : BuildPath.apply(void 0, __spreadArray(__spreadArray(__spreadArray(__spreadArray(['/'], pathNameComponents.slice(0, idx).filter(function (item) { return item !== '~'; }), false), [successors.length ? '~' : ''], false), successors, false), [component], false));
                        if (link.startsWith('/~/') && idx > 0) {
                            link = link.slice(2);
                        }
                        // console.info('v2', pathNameComponents.slice(0, idx).filter(item => item !== '~'), successors, component)
                    }
                    // console.info(component, idx, activePageIndex)
                    navs.push({
                        component: component,
                        title: component,
                        link: link,
                        current: idx >= activePageIndex
                    });
                }
            }
            return navs;
        },
        enumerable: false,
        configurable: true
    });
    PathAnalyzer.prototype.isOpen = function (path) {
        var _a, _b, _c, _d, _e, _f;
        return (path !== null && path !== void 0 ? path : '') === ((_a = this.activePageSlugs) !== null && _a !== void 0 ? _a : '') || (!!path && (((_b = this.activePageSlugs) !== null && _b !== void 0 ? _b : '').startsWith(path + '/') || ((_c = this.activePageSlugs) !== null && _c !== void 0 ? _c : '').endsWith(path))) ||
            (this.page.url.search && (path !== null && path !== void 0 ? path : '') === (((_d = this.activePageSlugs) !== null && _d !== void 0 ? _d : '') + this.page.url.search) || (!!path && ((((_e = this.activePageSlugs) !== null && _e !== void 0 ? _e : '') + this.page.url.search).startsWith(path + '/') || (((_f = this.activePageSlugs) !== null && _f !== void 0 ? _f : '') + this.page.url.search).endsWith(path))));
    };
    PathAnalyzer.prototype.open = function (path, closeIfOpen) {
        if (closeIfOpen === void 0) { closeIfOpen = true; }
        if (closeIfOpen) {
            // const pathNoDigits = path.replace(/[0-9]/g, '')
            if (this.isOpen(path)) {
                if (path.includes('/')) {
                    return BuildPath(this.basePath, path.substring(0, path.indexOf('/')));
                }
                else {
                    // if (path === pathNoDigits) {
                    return this.basePath;
                    // } else {
                    // 	return BuildPath(this.basePath, pathNoDigits)
                    // }
                }
                // } else if (pathNoDigits !== path && path === this.activePageSlug) {
                // 	return BuildPath(this.basePath, pathNoDigits)
                // } else if (pathNoDigits === path && path === (this.activePageSlug ?? '').replace(/[0-9]/g, '') && pathNoDigits !== this.activePage) {
                // 	return BuildPath(this.basePath)
            }
        }
        return BuildPath(this.basePath, path);
    };
    return PathAnalyzer;
}());
export { PathAnalyzer };
