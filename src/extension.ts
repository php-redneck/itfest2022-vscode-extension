import * as vscode from 'vscode';
import { UI } from './ui/ui';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('uikit.show', () => {
		UI.render(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
