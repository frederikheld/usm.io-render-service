(function webpackUniversalModuleDefinition (root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') { module.exports = factory() } else if (typeof define === 'function' && define.amd) { define([], factory) } else if (typeof exports === 'object') { exports['usm'] = factory() } else { root['usm'] = factory() }
})(window, function () {
    return /******/ (function (modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {}
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__ (moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if (installedModules[moduleId]) {
                /******/ 			return installedModules[moduleId].exports
                /******/ 		}
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			i: moduleId,
                /******/ 			l: false,
                /******/ 			exports: {}
                /******/ 		}
            /******/
            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
            /******/
            /******/ 		// Flag the module as loaded
            /******/ 		module.l = true
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports
            /******/ 	}
        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules
        /******/
        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules
        /******/
        /******/ 	// define getter function for harmony exports
        /******/ 	__webpack_require__.d = function (exports, name, getter) {
            /******/ 		if (!__webpack_require__.o(exports, name)) {
                /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter })
                /******/ 		}
            /******/ 	}
        /******/
        /******/ 	// define __esModule on exports
        /******/ 	__webpack_require__.r = function (exports) {
            /******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
                /******/ 		}
            /******/ 		Object.defineProperty(exports, '__esModule', { value: true })
            /******/ 	}
        /******/
        /******/ 	// create a fake namespace object
        /******/ 	// mode & 1: value is a module id, require it
        /******/ 	// mode & 2: merge all properties of value into the ns
        /******/ 	// mode & 4: return value when already ns object
        /******/ 	// mode & 8|1: behave like require
        /******/ 	__webpack_require__.t = function (value, mode) {
            /******/ 		if (mode & 1) value = __webpack_require__(value)
            /******/ 		if (mode & 8) return value
            /******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value
            /******/ 		var ns = Object.create(null)
            /******/ 		__webpack_require__.r(ns)
            /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value })
            /******/ 		if (mode & 2 && typeof value !== 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key] }.bind(null, key))
            /******/ 		return ns
            /******/ 	}
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/ 	__webpack_require__.n = function (module) {
            /******/ 		var getter = module && module.__esModule
            /******/ 			? function getDefault () { return module['default'] }
            /******/ 			: function getModuleExports () { return module }
            /******/ 		__webpack_require__.d(getter, 'a', getter)
            /******/ 		return getter
            /******/ 	}
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property) }
        /******/
        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = ''
        /******/
        /******/
        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(__webpack_require__.s = './src/usm.js')
        /******/ })
    /************************************************************************/
    /******/ ({

        /***/ './src/activity.js':
        /*! *************************!*\
  !*** ./src/activity.js ***!
  \*************************/
        /*! exports provided: Activity */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
            'use strict'
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Activity", function() { return Activity; });\n/* harmony import */ var _step_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step.js */ "./src/step.js");\n/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card.js */ "./src/card.js");\n\n\n\n\n\nfunction Activity(domContext, jsonActivity, jsonRoadmap) {\n    this.domContext = domContext\n    this.jsonActivity = jsonActivity\n    this.jsonRoadmap = jsonRoadmap\n}\nActivity.prototype.render = function (domElement, offsetX = 0) {\n    var svgActivity = domElement\n        .append("g")\n        .attrs({\n            class: "activity",\n            transform: "translate(" + offsetX + ", 0)"\n        })\n\n    // render activity card:\n    var activityCard = new _card_js__WEBPACK_IMPORTED_MODULE_1__["Card"](this.domContext, this.jsonActivity)\n    activityCard.render(svgActivity)\n\n    // render activity body:\n    var offsetY = 70\n    var activityBody = new ActivityBody(this.jsonActivity.body, this.jsonRoadmap)\n    activityBody.render(svgActivity, offsetY)\n\n}\n\nvar ActivityBody = function (jsonActivityBody, jsonRoadmap) {\n    this.jsonActivityBody = jsonActivityBody\n    this.jsonRoadmap = jsonRoadmap\n}\nActivityBody.prototype.render = function (domElement, offsetY = 0) {\n    // TODO: Calculate offset according to numbers of step\n    var svgActivityBody = domElement\n        .append("g")\n        .attrs({\n            class: "activitybody",\n            transform: "translate(0, " + offsetY + ")"\n        })\n\n    this.jsonActivityBody.step.forEach(function (jsonStep, indexStep) {\n        var offsetX = indexStep * 110\n        var step = new _step_js__WEBPACK_IMPORTED_MODULE_0__["Step"](jsonStep, this.jsonRoadmap)\n        step.render(svgActivityBody, offsetX)\n    }, this)\n}\n\n//# sourceURL=webpack://usm/./src/activity.js?')
            /***/ },

        /***/ './src/backbone.js':
        /*! *************************!*\
  !*** ./src/backbone.js ***!
  \*************************/
        /*! exports provided: Backbone */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
            'use strict'
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Backbone", function() { return Backbone; });\n/* harmony import */ var _activity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activity.js */ "./src/activity.js");\n\n\n\n\nfunction Backbone(domContext, jsonBackbone, jsonRoadmap) {\n    this.domContext = domContext\n    this.jsonBackbone = jsonBackbone\n    this.jsonRoadmap = jsonRoadmap\n}\nBackbone.prototype.render = function (domElement) {\n    var svgBackbone = domElement\n        .append("g")\n        .attrs({\n            class: "backbone"\n        })\n\n\n    this.jsonBackbone.activity.forEach(function (jsonActivity, indexActivity) {\n        var offsetX = jsonActivity.numberOfCardsBefore * 110 + indexActivity * 20\n        var activity = new _activity_js__WEBPACK_IMPORTED_MODULE_0__["Activity"](this.domContext, jsonActivity, this.jsonRoadmap)\n        activity.render(svgBackbone, offsetX)\n    }, this)\n\n}\n\n//# sourceURL=webpack://usm/./src/backbone.js?')
            /***/ },

        /***/ './src/card.js':
        /*! *********************!*\
  !*** ./src/card.js ***!
  \*********************/
        /*! exports provided: Card */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
            'use strict'
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });\n\n\nfunction Card(domContext, jsonCard) {\n    this.domContext = domContext\n    this.jsonCard = jsonCard\n}\nCard.prototype.render = function (domElement, offsetX = 0, offsetY = 0) {\n\n    var width = 100\n    var height = 60\n\n    var svgCard = domElement\n        .append("g")\n        .attrs({\n            class: "card",\n            transform: "translate(" + offsetX + "," + offsetY + ")"\n        })\n\n    svgCard\n        .append("rect")\n        .attrs({\n            x: 0,\n            y: 0,\n            width: width,\n            height: height\n        })\n        .styles({\n            stroke: "black",\n            fill: "white"\n        })\n\n\n    // render title of card:\n    var textwrap = new d3.textwrap()\n    textwrap\n        .bounds({\n            width: 100,\n            height: 60\n        })\n        .padding(10)\n\n    svgCard\n        .append("text")\n        .text(this.jsonCard.title._text)\n        .attrs({\n            x: width / 2,\n            y: height / 2\n        })\n        .styles({\n            "alignment-baseline": "middle",\n            "text-anchor": "middle",\n        })\n        .call(textwrap)\n\n    svgCard.on("click", () => {\n        // alert(this.jsonCard.description._text)\n        this.domContext.details.html(this.jsonCard.description._text)\n    })\n\n}\n\n//# sourceURL=webpack://usm/./src/card.js?')
            /***/ },

        /***/ './src/release.js':
        /*! ************************!*\
  !*** ./src/release.js ***!
  \************************/
        /*! exports provided: Release */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
            'use strict'
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Release", function() { return Release; });\n/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card.js */ "./src/card.js");\n\n\n\n\nfunction Release(jsonRelease) {\n    this.jsonRelease = jsonRelease\n}\nRelease.prototype.render = function (domElement, offsetY = 0) {\n    var svgRelease = domElement\n        .append("g")\n        .attrs({\n            class: "release",\n            transform: "translate(0, " + offsetY + ")"\n        })\n\n    this.jsonRelease.card.forEach(function (jsonCard, indexCard) {\n\n        var offsetY = indexCard * 70 // TODO: Calculate card offset\n\n        var card = new _card_js__WEBPACK_IMPORTED_MODULE_0__["Card"](jsonCard)\n        card.render(svgRelease, 0, offsetY)\n    })\n}\n\n//# sourceURL=webpack://usm/./src/release.js?')
            /***/ },

        /***/ './src/roadmap.js':
        /*! ************************!*\
  !*** ./src/roadmap.js ***!
  \************************/
        /*! exports provided: Roadmap */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
            'use strict'
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Roadmap", function() { return Roadmap; });\n\n\nfunction Roadmap(jsonRoadmap) {\n    this.jsonRoadmap = jsonRoadmap\n}\nRoadmap.prototype.render = function (domElement, width, offsetY = 0) {\n\n    var svgRoadmap = domElement\n        .append("g")\n        .attrs({\n            class: "roadmap",\n            transform: "translate(0," + offsetY + ")"\n        })\n\n    this.jsonRoadmap.release.forEach(function (release, releaseIndex) {\n\n        // calculate y-offset for this release:\n        var releaseOffsetY = release.maxCardsBefore * 70 + release.releasesBefore * 20 + release.maxCards * 70\n\n        var svgRelease = svgRoadmap\n            .append("g")\n            .attrs({\n                class: "release",\n                transform: "translate(0," + releaseOffsetY + ")"\n            })\n\n        svgRelease\n            .append("rect")\n            .attrs({\n                x: 0,\n                y: 0,\n                width: width,\n                height: 1\n            })\n\n        svgRelease\n            .append("text")\n            .text(release.name._text + " (" + release.maxCards + ")")\n            .attrs({\n                x: 0,\n                y: -5,\n                width: width,\n                height: 1\n            })\n    }, this)\n\n}\n\n//# sourceURL=webpack://usm/./src/roadmap.js?')
            /***/ },

        /***/ './src/step.js':
        /*! *********************!*\
  !*** ./src/step.js ***!
  \*********************/
        /*! exports provided: Step */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
            'use strict'
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Step", function() { return Step; });\n/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card.js */ "./src/card.js");\n/* harmony import */ var _release_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./release.js */ "./src/release.js");\n\n\n\n\n\nfunction Step(jsonStep, jsonRoadmap) {\n    this.jsonStep = jsonStep\n    this.jsonRoadmap = jsonRoadmap\n}\nStep.prototype.render = function (domElement, offsetX = 0) {\n    var svgStep = domElement\n        .append("g")\n        .attrs({\n            class: "step",\n            transform: "translate(" + offsetX + ", 0)"\n        })\n\n    // render step card:\n    var stepCard = new _card_js__WEBPACK_IMPORTED_MODULE_0__["Card"](this.jsonStep)\n    stepCard.render(svgStep)\n\n\n    // render step body:\n    var offsetY = 85\n    var stepBody = new StepBody(this.jsonStep.body, this.jsonRoadmap)\n    stepBody.render(svgStep, offsetY)\n\n}\n\nvar StepBody = function (jsonStepBody, jsonRoadmap) {\n    this.jsonStepBody = jsonStepBody\n    this.jsonRoadmap = jsonRoadmap\n}\nStepBody.prototype.render = function (domElement, offsetY = 0) {\n    var svgStepBody = domElement\n        .append("g")\n        .attrs({\n            class: "stepbody",\n            transform: "translate(0, " + offsetY + ")"\n        })\n\n    this.jsonStepBody.release.forEach(function (jsonRelease, indexRelease) {\n\n        function getReleaseKey(jsonRoadmap, releaseId) {\n            var result = undefined\n            jsonRoadmap.release.forEach(function (jsRel, i) {\n                if (jsRel.id._text == releaseId) {\n                    result = i\n                }\n            })\n            return result\n        }\n\n        var releaseId = jsonRelease._attributes.id\n        var releaseKey = getReleaseKey(this.jsonRoadmap, releaseId)\n\n        var offsetY = this.jsonRoadmap.release[releaseKey].maxCardsBefore * 70\n        offsetY += this.jsonRoadmap.release[releaseKey].releasesBefore * 20\n\n        var release = new _release_js__WEBPACK_IMPORTED_MODULE_1__["Release"](jsonRelease)\n        release.render(svgStepBody, offsetY)\n    }, this)\n}\n\n//# sourceURL=webpack://usm/./src/step.js?')
            /***/ },

        /***/ './src/timeline.js':
        /*! *************************!*\
  !*** ./src/timeline.js ***!
  \*************************/
        /*! exports provided: Timeline */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
            'use strict'
            eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return Timeline; });\n\n\nfunction Timeline() {}\nTimeline.prototype.render = function (domElement, width, offsetY = 0) {\n\n    var svgTimeline = domElement\n        .append("g")\n        .attrs({\n            class: "timeline",\n            transform: "translate(0, " + offsetY + ")"\n        })\n\n    svgTimeline\n        .append("polygon")\n        .attrs({\n            points: [\n                [0, 0],\n                [width - 20, 0],\n                [width - 20, -4],\n                [width, 2],\n                [width - 20, 8],\n                [width - 20, 4],\n                [0, 4]\n            ]\n        })\n        .styles({\n            "fill": "#000"\n        })\n\n    return svgTimeline\n\n}\n\n//# sourceURL=webpack://usm/./src/timeline.js?')
            /***/ },

        /***/ './src/usm.js':
        /*! ********************!*\
  !*** ./src/usm.js ***!
  \********************/
        /*! exports provided: USM */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
            'use strict'
            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"USM\", function() { return USM; });\n/* harmony import */ var _timeline_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timeline.js */ \"./src/timeline.js\");\n/* harmony import */ var _roadmap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roadmap.js */ \"./src/roadmap.js\");\n/* harmony import */ var _backbone_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./backbone.js */ \"./src/backbone.js\");\n\n\n\n\n\n\n/*\n    A map\n        consists of the timeline (represented by an arrow)\n        and the roadmap\n            wich consists of releases (represented by dividers)\n        and a backbone\n            which consists of multiple activities\n                which consist of a card\n                and of multiple steps\n                    which consist of a card\n                    and of the body\n                        which consist of multiple releases\n                            which consist of multiple cards\n*/\n\n/*\n    Each type of element has it's own class.\n    Feed data into constructor.\n    Feed svgElement to append to in prototype.render()\n*/\n\nfunction USM(jsonUSM) {\n\n    this.jsonData = jsonUSM\n\n    this.timeline = new _timeline_js__WEBPACK_IMPORTED_MODULE_0__[\"Timeline\"]()\n    this.backbone = new _backbone_js__WEBPACK_IMPORTED_MODULE_2__[\"Backbone\"](domContext, this.jsonData.usm.backbone, this.jsonData.usm.roadmap)\n    this.roadmap = new _roadmap_js__WEBPACK_IMPORTED_MODULE_1__[\"Roadmap\"](this.jsonData.usm.roadmap)\n\n    this.optimizeDataStructure()\n    this.generateMetaData()\n\n}\nUSM.prototype.render = function (domContext, dimensions, doDebug = false) {\n\n    // create canvas as base element for all children to append their elements to:\n    console.log(dimensions)\n    var svgUSM = domContext.usmContainer\n        .append(\"svg\")\n        .attrs({\n            xmlns: \"http://www.w3.org/2000/svg\",\n            class: \"usm\",\n            x: 0,\n            y: 0\n        })\n\n    var canvas = svgUSM\n        .append(\"g\")\n        .attrs({\n            class: \"canvas\",\n            transform: \"translate(\" + dimensions.marginLeft + \",\" + dimensions.marginTop + \")\"\n        })\n\n    // render children:\n    this.backbone.render(canvas)\n\n    // get space that is occupied by rendered children:\n    dimensions.canvasWidth = canvas.node().getBoundingClientRect().width\n    dimensions.canvasHeight = canvas.node().getBoundingClientRect().height\n\n    // render content that depends on the space that the children occupy:\n    this.timeline.render(canvas, dimensions.canvasWidth, 140)\n    this.roadmap.render(canvas, dimensions.canvasWidth, 160)\n\n    // update canvas dimensions:\n    dimensions.canvasWidth = canvas.node().getBoundingClientRect().width\n    dimensions.canvasHeight = canvas.node().getBoundingClientRect().height\n\n    // render debug information:\n    this.renderDebug(canvas, dimensions, doDebug)\n\n    // calculate svg deminesions:\n    var svgViewBoxWidth = dimensions.canvasWidth + dimensions.marginRight + dimensions.marginLeft\n    var svgViewBoxHeight = dimensions.canvasHeight + dimensions.marginTop + dimensions.marginBottom\n\n    if (typeof dimensions.scaleToWidth !== 'undefined') {\n        var svgWidth = dimensions.scaleToWidth\n    } else {\n        var svgWidth = dimensions.canvasWidth\n    }\n\n    if (typeof dimensions.scaleToHeight !== 'undefined') {\n        var svgHeight = dimensions.scaleToHeight\n    } else {\n        var svgHeight = dimensions.canvasHeight\n    }\n\n    // set svg dimensions:\n    svgUSM\n        .attrs({\n            width: svgWidth + \"px\",\n            height: svgHeight + \"px\",\n            viewBox: \"0 0 \" + svgViewBoxWidth + \" \" + svgViewBoxHeight,\n            preserveAspectRatio: \"xMinYMin meet\"\n        })\n\n}\nUSM.prototype.renderDebug = function (domElement, dimensions, doRender = false) {\n    if (doRender) {\n        var svgDebug = domElement\n            .append(\"g\")\n            .attrs({\n                class: \"debug\"\n            })\n\n        renderBoundingBox(svgDebug, dimensions)\n    }\n\n    function renderBoundingBox(domElement, dimensions) {\n\n        var svgBoundingBox = domElement\n            .append(\"rect\")\n            .attrs({\n                x: 0,\n                y: 0,\n                width: dimensions.canvasWidth,\n                height: dimensions.canvasHeight,\n            })\n            .styles({\n                \"stroke\": \"#f00\",\n                \"stroke-width\": 1,\n                \"stroke-dasharray\": \"10,10\",\n                \"fill\": \"none\"\n            })\n    }\n}\nUSM.prototype.optimizeDataStructure = function () {\n\n    this.jsonData.usm.backbone.activity.forEach(function (jsonActivity, indexActivity) {\n\n        // put single steps inside a activity.body.step into an array\n        // as multiple steps already are. This makes further processing cleaner:\n        if (!Array.isArray(jsonActivity.body.step)) {\n\n            // var tempRelease = jsonStep.body.release\n            var tempStep = this.jsonData.usm.backbone.activity[indexActivity].body.step\n            this.jsonData.usm.backbone.activity[indexActivity].body.step = []\n            this.jsonData.usm.backbone.activity[indexActivity].body.step[0] = tempStep\n\n        }\n\n        jsonActivity.body.step.forEach(function (jsonStep, indexStep) {\n\n            // put single releases inside a step.body.release into an array\n            // as multiple releases already are. This makes further processing cleaner:\n            if (!Array.isArray(jsonStep.body.release)) {\n\n                // var tempRelease = jsonStep.body.release\n                var tempRelease = this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release\n                this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release = []\n                this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release[0] = tempRelease\n\n            }\n\n            jsonStep.body.release.forEach(function (jsonRelease, indexRelease) {\n\n                // put single releases inside a step.body.release.card into an array\n                // as multiple cards already are. This makes further processing cleaner:\n                if (!Array.isArray(jsonRelease.card)) {\n\n                    var tempCard = this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release[indexRelease].card\n                    this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release[indexRelease].card = []\n                    this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release[indexRelease].card[0] = tempCard\n\n                }\n            }, this)\n        }, this)\n    }, this)\n\n}\nUSM.prototype.generateMetaData = function () {\n\n    // prepare new fields:\n    this.jsonData.usm.roadmap.release.forEach(function (jsonRelease, indexRelease) {\n        this.jsonData.usm.roadmap.release[indexRelease].maxCards = 0\n        this.jsonData.usm.roadmap.release[indexRelease].maxCardsBefore = 0\n        this.jsonData.usm.roadmap.release[indexRelease].releasesBefore = 0\n    }, this)\n    this.jsonData.usm.backbone.activity.forEach(function (jsonActivity, indexActivity) {\n        this.jsonData.usm.backbone.activity[indexActivity].numberOfCards = jsonActivity.body.step.length\n        this.jsonData.usm.backbone.activity[indexActivity].numberOfCardsBefore = 0\n    }, this)\n\n    this.jsonData.usm.backbone.activity.forEach(function (jsonActivity, indexActivity) {\n\n        // update accumulated number of steps before this activity:\n        var stepsBefore = 0\n        for (var n = 0; n < indexActivity; n++) {\n            this.jsonData.usm.backbone.activity[indexActivity].numberOfCardsBefore += this.jsonData.usm.backbone.activity[n].numberOfCards\n        }\n\n        jsonActivity.body.step.forEach(function (jsonStep, indexStep) {\n\n            // count occurences in step:\n            var occurences = {}\n            jsonStep.body.release.forEach(function (jsonRelease, indexRelease) {\n\n                var releaseKey = jsonRelease._attributes.id\n\n                jsonRelease.card.forEach(function (jsonCard, indexCard) {\n\n                    if (\"_attributes\" in jsonRelease) {\n                        if (releaseKey in occurences) {\n                            occurences[releaseKey] += 1\n                        } else {\n                            occurences[releaseKey] = 1\n                        }\n                    }\n\n                })\n            })\n\n            // update maxCards in release:\n            this.jsonData.usm.roadmap.release.forEach(function (release, indexRelease) {\n\n                if (occurences[release.id._text] > this.jsonData.usm.roadmap.release[indexRelease].maxCards) {\n                    this.jsonData.usm.roadmap.release[indexRelease].maxCards = occurences[release.id._text]\n                }\n\n            }, this)\n\n        }, this)\n    }, this)\n\n    // update accumulated number of maxCards before this release:\n    this.jsonData.usm.roadmap.release.forEach(function (release, indexRelease) {\n\n        for (var n = 0; n < indexRelease; n++) {\n            this.jsonData.usm.roadmap.release[indexRelease].maxCardsBefore += this.jsonData.usm.roadmap.release[n].maxCards\n            this.jsonData.usm.roadmap.release[indexRelease].releasesBefore += 1\n        }\n\n    }, this)\n}\n\n//# sourceURL=webpack://usm/./src/usm.js?")
            /***/ }

        /******/ })
})
