

module.exports = function TotalCost(data, type) {


    let goals = []
    let totalGoals = 0
    let totalCost = 0
    let name = ''

    if (type == 1) {
        name = 'Domestic Cost'
    } else {
        name = 'Travel Cost'
    }
    data.map((item) => {

        let itens = []
        let itensValue = 0
        totalGoals = totalGoals + item.value
        item.financesExpenses.map((finance) => {
            itens.push({
                id: finance.id,
                title: finance.title,
                value: finance.value,
                date: finance.date,
                createdAt: finance.createdAt
            });
            itensValue = itensValue + finance.value

            totalCost = totalCost + finance.value
        })

        goals.push({
            id: item.id,
            title: item.title,
            color: item.color,
            icon: item.icon,
            costGoals: item.value,
            costTotal: itensValue,
            costProfit: item.value - itensValue,
            itens: itens,
        })

    })
    return {
        name: name,
        totalGoals: totalGoals,
        totalCost: totalCost,
        totalProfit: totalGoals - totalCost,
        goals: goals
    };


}