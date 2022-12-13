const vscode = acquireVsCodeApi();

window.addEventListener("load", main);

function main() {
    if (data === undefined) {
        return;
    }

    let app = document.getElementById('app');

    let style = document.createElement('style');

    for (let i = 0, length = data.length; i < length; ++i) {
        let component = data[i];

        let row = addRow();

        for (let j = 0, elementsLength = component.data.length; j < elementsLength; ++j) {
            row.append(addElement(component.data[j]));

            style.innerText = style.innerText + component.data[j].style;
        }

        app.append(addTitle(component.title), row);
    }

    app.append(style);
}

function addTitle(title) {
    let element = document.createElement('p');

    element.className = 'row-title';

    element.innerText = title;

    return element;
}

function addRow() {
    let element = document.createElement('div');

    element.className = 'row';

    return element;
}

function addElementTitle(title) {
    let element = document.createElement('p');

    element.innerText = title;

    element.className = 'element-title';

    return element;
}

function addCopyButton(text) {
    let element = document.createElement('button');

    element.className = 'copy';

    element.innerText = 'Копировать';

    element.addEventListener('click', function(text) {
        navigator.clipboard.writeText(text);
    }.bind(null, text));

    return element;
}

function addElement(element) {
    let elementContainer = document.createElement('div');

    elementContainer.className = 'element';

    let componentDiv = document.createElement('div');

    componentDiv.className = 'element-component-row';

    componentDiv.innerHTML = element.html;

    componentDiv.append(addCopyButton(element.html));

    elementContainer.append(addElementTitle(element.title), componentDiv);

    return elementContainer;
}