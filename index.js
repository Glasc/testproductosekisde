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
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();
var myMiddlware = (req, res, next) => {
    console.log('A middleware just got executed');
    next();
};
app.use(myMiddlware);
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listOfProducts = yield prisma.productos.findMany();
    if (listOfProducts.length) {
        return res.send(listOfProducts);
    }
    return res.send("List of products wasn't found");
}));
app.listen(port, () => console.log(`Listening to port ${port}`));
