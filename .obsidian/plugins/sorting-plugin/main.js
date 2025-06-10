"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var obsidian_1 = require("obsidian");
var CustomSortPlugin = /** @class */ (function (_super) {
    __extends(CustomSortPlugin, _super);
    function CustomSortPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomSortPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // Добавляем команду в контекстное меню каталогов
                this.registerEvent(this.app.workspace.on('file-menu', function (menu, file) {
                    if (file instanceof obsidian_1.TFolder) {
                        menu.addItem(function (item) {
                            item.setTitle('Sort files by index in this folder')
                                .setIcon('sort-desc')
                                .onClick(function () { return _this.sortFilesInFolder(file); });
                        });
                    }
                }));
                // Добавляем команду для полной индексации
                this.addCommand({
                    id: 'sort-all-files-by-index',
                    name: 'Sort all files by index',
                    callback: function () { return _this.sortAllFiles(); }
                });
                return [2 /*return*/];
            });
        });
    };
    // Команда для полной индексации всех файлов
    CustomSortPlugin.prototype.sortAllFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var folders, _i, folders_1, folder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        folders = this.app.vault.getAllLoadedFiles().filter(function (file) { return file instanceof obsidian_1.TFolder; });
                        _i = 0, folders_1 = folders;
                        _a.label = 1;
                    case 1:
                        if (!(_i < folders_1.length)) return [3 /*break*/, 4];
                        folder = folders_1[_i];
                        return [4 /*yield*/, this.sortFilesInFolder(folder)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Сортировка файлов в конкретной папке (рекурсивно)
    CustomSortPlugin.prototype.sortFilesInFolder = function (folder) {
        return __awaiter(this, void 0, void 0, function () {
            var files, indexedFiles, _i, files_1, file, content, match, index, _a, indexedFiles_1, file, cleanName, counter, _b, indexedFiles_2, _c, file, hasIndex, newName;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        files = this.getFilesRecursively(folder);
                        indexedFiles = [];
                        _i = 0, files_1 = files;
                        _f.label = 1;
                    case 1:
                        if (!(_i < files_1.length)) return [3 /*break*/, 4];
                        file = files_1[_i];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 2:
                        content = _f.sent();
                        match = content.match(/^№(\d+)/);
                        if (match) {
                            index = parseInt(match[1], 10);
                            indexedFiles.push({ file: file, index: index, hasIndex: true });
                        }
                        else {
                            indexedFiles.push({ file: file, index: Infinity, hasIndex: false }); // Файлы без индекса получают Infinity
                        }
                        _f.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        // Сортировка файлов по индексу
                        indexedFiles.sort(function (a, b) { return a.index - b.index; });
                        _a = 0, indexedFiles_1 = indexedFiles;
                        _f.label = 5;
                    case 5:
                        if (!(_a < indexedFiles_1.length)) return [3 /*break*/, 8];
                        file = indexedFiles_1[_a].file;
                        cleanName = this.removePrefix(file.name);
                        if (!(file.name !== cleanName)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.renameFileWithoutBreakingLinks(file, "".concat((_d = file.parent) === null || _d === void 0 ? void 0 : _d.path, "/").concat(cleanName))];
                    case 6:
                        _f.sent();
                        _f.label = 7;
                    case 7:
                        _a++;
                        return [3 /*break*/, 5];
                    case 8:
                        counter = 1;
                        _b = 0, indexedFiles_2 = indexedFiles;
                        _f.label = 9;
                    case 9:
                        if (!(_b < indexedFiles_2.length)) return [3 /*break*/, 13];
                        _c = indexedFiles_2[_b], file = _c.file, hasIndex = _c.hasIndex;
                        if (!hasIndex) return [3 /*break*/, 12];
                        newName = "".concat(counter, ". ").concat(this.removePrefix(file.name));
                        if (!(file.name !== newName)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.renameFileWithoutBreakingLinks(file, "".concat((_e = file.parent) === null || _e === void 0 ? void 0 : _e.path, "/").concat(newName))];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11:
                        counter++; // Увеличиваем счетчик только для файлов с индексом
                        _f.label = 12;
                    case 12:
                        _b++;
                        return [3 /*break*/, 9];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    // Рекурсивно получаем все файлы в каталоге и его подкаталогах
    CustomSortPlugin.prototype.getFilesRecursively = function (folder) {
        var files = [];
        for (var _i = 0, _a = folder.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child instanceof obsidian_1.TFile) {
                files.push(child);
            }
            else if (child instanceof obsidian_1.TFolder) {
                files = files.concat(this.getFilesRecursively(child)); // Рекурсивный вызов для подкаталогов
            }
        }
        return files;
    };
    // Функция для удаления префикса (символов до первой буквы)
    CustomSortPlugin.prototype.removePrefix = function (name) {
        // Регулярное выражение для поиска первого символа кириллицы или латиницы
        var match = name.match(/[a-zA-Zа-яА-Я]/);
        if (match && match.index !== undefined) {
            return name.slice(match.index); // Возвращаем строку, начиная с первой буквы
        }
        return name; // Если буква не найдена, возвращаем оригинальное имя
    };
    // Безопасное переименование файла с обновлением ссылок
    CustomSortPlugin.prototype.renameFileWithoutBreakingLinks = function (file, newPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Используем встроенный метод для переименования с обновлением ссылок
                    return [4 /*yield*/, this.app.fileManager.renameFile(file, newPath)];
                    case 1:
                        // Используем встроенный метод для переименования с обновлением ссылок
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CustomSortPlugin;
}(obsidian_1.Plugin));
exports.default = CustomSortPlugin;
