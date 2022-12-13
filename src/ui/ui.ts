import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn } from "vscode";
import { button } from './components/button';

export class UI {

    public static currentPanel: UI | undefined;
    private readonly _panel: WebviewPanel;
    private _disposables: Disposable[] = [];

    private constructor(panel: WebviewPanel, extensionUri: Uri) {
        this._panel = panel;

        this._panel.onDidDispose(this.dispose, null, this._disposables);

        this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
    }

    /**
     * Рендерим Webview панель, если её нет, то создаем и рендерим
     * @param extensionUri 
     */
    public static render(extensionUri: Uri) {
        if (UI.currentPanel) {
            return UI.currentPanel._panel.reveal(ViewColumn.Two);
        }

        const panel = window.createWebviewPanel(
            'show',
            'UI-кит',
            ViewColumn.Two,
            {
                enableScripts: true
            }
        );

        UI.currentPanel = new UI(panel, extensionUri);
    }

    /**
     * Очищаем и удаляем webview после закрытия панели
     */
    public dispose() {
        UI.currentPanel = undefined;

        this._panel.dispose();

        while (this._disposables.length) {
            const disposable = this._disposables.pop();

            if (disposable) {
                disposable.dispose();
            }
        }
    }

    /**
     * Возвращаем HTML шаблон
     * @param webview 
     * @param extensionUri 
     */
    private _getWebviewContent(webview: Webview, extensionUri: Uri): string {
        const mainUri = webview.asWebviewUri(Uri.joinPath(extensionUri, ...["assets", "main.js"]));
        const styleUri = webview.asWebviewUri(Uri.joinPath(extensionUri, ...["assets", "main.css"]));
        const components = JSON.stringify([
            {
                title: 'Кнопки',
                data: button
            }
        ]);
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script>
                    var data = ${components};
                </script>
                <script type="module" src="${mainUri}"></script>
                <link rel="stylesheet" href="${styleUri}">
                <title>UI-kit</title>
            </head>
            <body>
                <main class="app" id="app">
                </main>
            </body>
        </html>
        `;
    }

}