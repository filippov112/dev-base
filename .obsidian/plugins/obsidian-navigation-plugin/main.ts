import { App, Plugin, TFile, TFolder } from 'obsidian';

export default class NavigationPlugin extends Plugin {
    async onload() {
        console.log('Loading Navigation Plugin');

        // Добавляем команду для перехода на следующую заметку
        this.addCommand({
            id: 'next-note',
            name: 'Next Note',
            callback: () => this.navigateToNote(true),
        });

        // Добавляем команду для перехода на предыдущую заметку
        this.addCommand({
            id: 'previous-note',
            name: 'Previous Note',
            callback: () => this.navigateToNote(false),
        });
    }

    async navigateToNote(next: boolean) {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) return;

        const folder = this.app.vault.getAbstractFileByPath(activeFile.parent.path);
        if (!(folder instanceof TFolder)) return;

        // Получаем все файлы в текущей папке
        const files = folder.children.filter((file) => file instanceof TFile) as TFile[];

        // Сортируем файлы по имени
        files.sort((a, b) => a.name.localeCompare(b.name));

        // Находим индекс текущего файла
        const currentIndex = files.findIndex((file) => file.path === activeFile.path);

        if (currentIndex === -1) return;

        // Определяем индекс целевого файла
        const targetIndex = next ? currentIndex + 1 : currentIndex - 1;

        // Проверяем, чтобы индекс был в пределах массива
        if (targetIndex < 0 || targetIndex >= files.length) return;

        // Открываем целевой файл
        const targetFile = files[targetIndex];
        this.app.workspace.getLeaf().openFile(targetFile);
    }

    onunload() {
        console.log('Unloading Navigation Plugin');
    }
}