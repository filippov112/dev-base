import { App, Plugin, TFile, TFolder, Menu } from 'obsidian';

interface FileIndex {
    file: TFile;
    index: number;
    hasIndex: boolean; // Флаг, указывающий, есть ли индекс в файле
}

export default class CustomSortPlugin extends Plugin {
    async onload() {
        // Добавляем команду в контекстное меню каталогов
        this.registerEvent(
            this.app.workspace.on('file-menu', (menu, file) => {
                if (file instanceof TFolder) {
                    menu.addItem((item) => {
                        item.setTitle('Sort files by index in this folder')
                            .setIcon('sort-desc')
                            .onClick(() => this.sortFilesInFolder(file));
                    });
                }
            })
        );

        // Добавляем команду для полной индексации
        this.addCommand({
            id: 'sort-all-files-by-index',
            name: 'Sort all files by index',
            callback: () => this.sortAllFiles()
        });
    }

    // Команда для полной индексации всех файлов
    async sortAllFiles() {
        const folders = this.app.vault.getAllLoadedFiles().filter(file => file instanceof TFolder) as TFolder[];
        for (const folder of folders) {
            await this.sortFilesInFolder(folder);
        }
    }

    // Сортировка файлов в конкретной папке (рекурсивно)
    async sortFilesInFolder(folder: TFolder) {
        const files = this.getFilesRecursively(folder); // Получаем все файлы рекурсивно
        const indexedFiles: FileIndex[] = [];

        // Чтение индекса из каждого файла
        for (const file of files) {
            const content = await this.app.vault.read(file);
            const match = content.match(/^№(\d+)/);
            if (match) {
                const index = parseInt(match[1], 10);
                indexedFiles.push({ file, index, hasIndex: true });
            } else {
                indexedFiles.push({ file, index: Infinity, hasIndex: false }); // Файлы без индекса получают Infinity
            }
        }

        // Сортировка файлов по индексу
        indexedFiles.sort((a, b) => a.index - b.index);

        // Очистка префиксов у всех файлов
        for (const { file } of indexedFiles) {
            const cleanName = this.removePrefix(file.name); // Удаляем префикс
            if (file.name !== cleanName) {
                await this.renameFileWithoutBreakingLinks(file, `${file.parent?.path}/${cleanName}`);
            }
        }

        // Переименование файлов с индексом
        let counter = 1; // Счетчик для добавления порядкового номера
        for (const { file, hasIndex } of indexedFiles) {
            if (hasIndex) {
                const newName = `${counter}. ${this.removePrefix(file.name)}`; // Добавляем порядковый номер к очищенному имени
                if (file.name !== newName) {
                    await this.renameFileWithoutBreakingLinks(file, `${file.parent?.path}/${newName}`);
                }
                counter++; // Увеличиваем счетчик только для файлов с индексом
            }
            // Файлы без индекса остаются без изменений (их префиксы уже очищены)
        }
    }

    // Рекурсивно получаем все файлы в каталоге и его подкаталогах
    getFilesRecursively(folder: TFolder): TFile[] {
        let files: TFile[] = [];
        for (const child of folder.children) {
            if (child instanceof TFile) {
                files.push(child);
            } else if (child instanceof TFolder) {
                files = files.concat(this.getFilesRecursively(child)); // Рекурсивный вызов для подкаталогов
            }
        }
        return files;
    }

    // Функция для удаления префикса (символов до первой буквы)
    removePrefix(name: string): string {
        // Регулярное выражение для поиска первого символа кириллицы или латиницы
        const match = name.match(/[a-zA-Zа-яА-Я]/);
        if (match && match.index !== undefined) {
            return name.slice(match.index); // Возвращаем строку, начиная с первой буквы
        }
        return name; // Если буква не найдена, возвращаем оригинальное имя
    }

    // Безопасное переименование файла с обновлением ссылок
    async renameFileWithoutBreakingLinks(file: TFile, newPath: string) {
        // Используем встроенный метод для переименования с обновлением ссылок
        await this.app.fileManager.renameFile(file, newPath);
    }
}