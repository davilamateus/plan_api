

module.exports = function TotalEntraces(data) {


    let totalEntraces = 0
    let totalCosts = 0
    let itens = []
    data.map((item) => {
        if (item.type == 1) {
            totalEntraces = totalEntraces + item.value;
            itens.push({
                id: item.id,
                title: item.title,
                value: item.value,
                date: item.date,
                createdAt: item.createdAt
            });
        }
        if (item.type == 2) {
            totalCosts = totalCosts + item.value;
        }


    })
    return {
        name: 'Entraces',
        totalEntraces: totalEntraces,
        totalCosts: totalCosts,
        totalProfit: totalEntraces - totalCosts,
        itens: itens
    };


}