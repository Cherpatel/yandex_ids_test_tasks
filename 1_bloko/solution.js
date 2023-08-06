function makePermutations(blocks) {
    const permuts = [];

    (function makePermut(permut = []) {
        if (permut.length === blocks.length) {
            permuts.push(permut);
            return;
        }

        for (const block of blocks) {
            if (!permut.includes(block)) {
                makePermut([...permut, block]);
            }
        }
    })();

    return permuts;
}

function makeRotatePatterns(length) {
    const patterns = [];

    (function makePattern(pattern = []) {
        if (pattern.length === length) {
            patterns.push(pattern);
            return;
        }

        makePattern([...pattern, false]);
        makePattern([...pattern, true]);
    })();

    return patterns;
}

function rotateForm(form) {
    return form.map(row => [...row].reverse()).reverse();
}

function getPart(arr) {
    const part = [];
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].includes(0)) break;
        part.push([...arr[i]]);
    }

    return part;
}

function isMergeable(top, bottom) {
    const topPart = getPart([...top].reverse()).reverse();
    const bottomPart = getPart(bottom);

    if (topPart.length !== bottomPart.length) return false;

    for (let row = 0; row < topPart.length; row++) {
        for (let col = 0; col < topPart[0].length; col++) {
            if (topPart[row][col] + bottomPart[row][col] !== 1) return false;
        }
    }

    return true;
}

function checkLayout(layout, pattern) {
    if (layout.length === 1) return true;

    for (let i = 0; i < layout.length; i++) {
        const currentForm = pattern[i] ? rotateForm(layout[i].form) : layout[i].form;

        if (i === 0) {
            if (!isMergeable(currentForm, [])) return false;
            continue;
        }

        if (i === layout.length - 1) {
            if (!isMergeable([], currentForm)) return false;
            continue;
        }

        const prevForm = pattern[i - 1] ? rotateForm(layout[i - 1].form) : layout[i - 1].form;
        if (!isMergeable(currentForm, prevForm)) return false;
    }

    return true;
}

function layout(blocks) {
    if (!blocks.length) return [];

    const permuts = makePermutations(blocks);
    const patterns = makeRotatePatterns(permuts[0].length);

    let resPermut, resPattern;
    loop:
    for (const permut of permuts) {
        for (const pattern of patterns) {
            if (checkLayout(permut, pattern)) {
                resPermut = permut;
                resPattern = pattern;
                break loop;
            }
        }
    }

    for (let pos = 0; pos < resPermut.length; pos++) {
        const block = resPermut[pos];
        block.blockId = block.id;
        block.position = pos + 1;
        block.isRotated = resPattern[pos];

        delete block.id;
        delete block.form;
    }

    return resPermut;
}

module.exports = layout;