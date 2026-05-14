"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = exports.AdminController = exports.ProductController = void 0;
var productController_1 = require("./productController");
Object.defineProperty(exports, "ProductController", { enumerable: true, get: function () { return __importDefault(productController_1).default; } });
var adminController_1 = require("./adminController");
Object.defineProperty(exports, "AdminController", { enumerable: true, get: function () { return __importDefault(adminController_1).default; } });
var homeController_1 = require("./homeController");
Object.defineProperty(exports, "HomeController", { enumerable: true, get: function () { return homeController_1.HomeController; } });
//# sourceMappingURL=index.js.map