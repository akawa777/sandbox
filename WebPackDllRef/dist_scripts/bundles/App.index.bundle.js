(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Lib.dll"));
	else if(typeof define === 'function' && define.amd)
		define(["Lib.dll"], factory);
	else if(typeof exports === 'object')
		exports["App.index.bundle"] = factory(require("Lib.dll"));
	else
		root["App.index.bundle"] = factory(root["Lib.dll"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_dll_reference_Lib_dll__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Scripts/index.entry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../dist_scripts/com/Lib/lib.ts":
/*!*********************************************************************************!*\
  !*** delegated ../../../dist_scripts/com/Lib/lib.ts from dll-reference Lib.dll ***!
  \*********************************************************************************/
/*! exports provided: run */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference Lib.dll */ "dll-reference Lib.dll"))("./Scripts/lib.ts");

/***/ }),

/***/ "../../../dist_scripts/com/Lib/sub.ts":
/*!*********************************************************************************!*\
  !*** delegated ../../../dist_scripts/com/Lib/sub.ts from dll-reference Lib.dll ***!
  \*********************************************************************************/
/*! exports provided: run */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference Lib.dll */ "dll-reference Lib.dll"))("./Scripts/sub.ts");

/***/ }),

/***/ "./Scripts/index.entry.ts":
/*!********************************!*\
  !*** ./Scripts/index.entry.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var com_Lib_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! com/Lib/lib */ "../../../dist_scripts/com/Lib/lib.ts");
/* harmony import */ var com_Lib_sub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! com/Lib/sub */ "../../../dist_scripts/com/Lib/sub.ts");


/* harmony default export */ __webpack_exports__["default"] = (function (el) {
    com_Lib_lib__WEBPACK_IMPORTED_MODULE_0__["run"]();
    com_Lib_sub__WEBPACK_IMPORTED_MODULE_1__["run"]();
    console.log('run app index');
});


/***/ }),

/***/ "dll-reference Lib.dll":
/*!**************************!*\
  !*** external "Lib.dll" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_dll_reference_Lib_dll__;

/***/ })

/******/ });
});
//# sourceMappingURL=App.index.bundle.js.map