function asyncRender(renderItems, queueSize) {
    const result = [];

    function render() {
        renderItems.sort((a, b) => b.priority - a.priority);
        const queue = renderItems.splice(0, queueSize);

        return Promise.all(queue.map(task => {
            return task.render().then(children => {
                result.push(task.id);
                return children;
            });
        })).then((childrens) => {
            renderItems.push(...childrens.filter(child => child !== null).flat());
            if (renderItems.length) return render();
        });
    }
    
    return render().then(() => result);
}

module.exports = asyncRender;