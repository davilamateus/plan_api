module.exports = function getTimestampInfomartions(timestamp) {
    const date = new Date(timestamp);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const firstDayTimestamp = firstDay.getTime();
    const lastDayTimestamp = lastDay.getTime();

    return {
        firstDay: firstDayTimestamp,
        lastDay: lastDayTimestamp
    };
};
