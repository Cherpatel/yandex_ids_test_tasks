function getDataset(header) {
    return header.dataset.header;
}

export function getObserverCallback(updateBreadcrumbs) {
    let currentHeader = null;

    const headersList = [];
    const headersData = new Map();

    const visibleHeaders = new Set();

    const getParentPath = (header) => {
        const headerData = headersData.get(header);
        for (let i = headerData.listIndex - 1; i >= 0; i--) {
            if (header.dataset.header > headersList[i].dataset.header)
                return getPath(headersList[i]);
        }

        return [];
    }

    const getPath = (header) => {
        const headerData = headersData.get(header);
        if (headerData.path !== null) return headerData.path;
        return [...getParentPath(header), header];
    }

    return (entries, observer) => {
        entries.forEach(({ target }) => {
            if (!headersData.has(target)) {
                headersList.push(target);
                headersData.set(target, {
                    listIndex: headersList.length - 1,
                    path: null
                });
            }
        });

        const addedHeaders = entries.filter((header) => header.isIntersecting);
        const removedHeaders = entries.filter((header) => !header.isIntersecting);

        for (const { target } of addedHeaders) {
            if (
                currentHeader === null ||
                !visibleHeaders.has(currentHeader) ||
                getDataset(currentHeader) < getDataset(target) ||
                (getDataset(currentHeader) === getDataset(target) &&
                    currentHeader.offsetTop > target.offsetTop)
            ) currentHeader = target;

            visibleHeaders.add(target);
        }

        for (const { target } of removedHeaders)
            visibleHeaders.delete(target);

        if (!visibleHeaders.has(currentHeader)) {
            const visibleHeadersArr = [...visibleHeaders];

            if (!visibleHeadersArr.length) {
                const firstRemoved = removedHeaders[0].target;
                const lastRemoved = removedHeaders.slice(-1)[0].target;
                if (firstRemoved.getBoundingClientRect().top > window.innerHeight) {
                    currentHeader = headersList[headersData.get(firstRemoved).listIndex - 1];
                } else {
                    currentHeader = lastRemoved;
                }
                    
            } else {
                currentHeader = visibleHeadersArr[0];
                for (const header of visibleHeadersArr) {
                    if (
                        getDataset(header) > getDataset(currentHeader) ||
                        (getDataset(header) === getDataset(currentHeader) &&
                            header.offsetTop < currentHeader.offsetTop)
                    ) currentHeader = header;
                }
            }
        }

        headersData.get(currentHeader).path = getPath(currentHeader);
        updateBreadcrumbs(headersData.get(currentHeader).path.map(header => header.id));
    };
}