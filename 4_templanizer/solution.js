function removeXMake(node) {
    const [, value] = node.getAttribute("x-make").split(":");
    node.removeAttribute("x-make");
    return +value;
}

function filterByOp(op) {
    return (node) => node.getAttribute("x-make")?.includes(op) ?? false;
}

function copy(node) {
    const times = removeXMake(node);
    for (let i = 0; i < times; i++)
        node.after(node.cloneNode(true));
}

function remove(node) {
    const times = removeXMake(node);
    for (let i = 0; i < times; i++)
        node.nextElementSibling?.remove();
}

function removeChildren(node) {
    const times = removeXMake(node);
    for (let i = 0; i < times; i++)
        node.children[0]?.remove();
}

function swap(node) {
    const parentNode = node.parentNode;
    const children = [...parentNode.children];

    const value = (removeXMake(node) + children.findIndex(elem => elem === node)) % children.length;
    const replacedNode = children[value];

    if (node === replacedNode) return;

    const nodeCopy = node.cloneNode(true);

    parentNode.replaceChild(nodeCopy, replacedNode);
    parentNode.replaceChild(replacedNode, node);
}

function solution(entry) {
    let children = [...entry.children];
    children.filter(filterByOp("copy:")).forEach(child => copy(child));
    
    children = [...entry.children];
    children.filter(filterByOp("remove:")).forEach(child => remove(child));

    children = [...entry.children];
    children.filter(filterByOp("removeChildren:")).forEach(child => removeChildren(child));

    children = [...entry.children];
    const switchesLen = children.filter(filterByOp("switch:")).length;
    for (let i = 0; i < switchesLen; i++) {
        children = [...entry.children];
        swap(children.filter(filterByOp("switch:"))[0]);
    }

    [...entry.children].forEach(child => solution(child));
}

module.exports = solution;