const db = require('../../database/index');

module.exports.ridesAndEarnings = async (req, res, next) => {
    var total_income = 0;
    var ridesCounter = 0;
    var topTransactions = [];
    var months = {};
    var monthsArray = [];
    var deliveries = [];
    var incomes = [];
    var monthLetter = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    try {
        const {
            id
        } = req.params;
        const transactions = await db.transaction.findAll({
            where: {
                driverId: id
            },
            include: [
                db.user
            ]
        });

        for (var i = 0; i < transactions.length; i++) {
            total_income = total_income + transactions[i]["price"];
            var currentMonth = transactions[i]["request_date"].getMonth();
            if (!months[currentMonth]) {
                months[currentMonth] = {
                    deliveries: 1,
                    incomes: transactions[i]["price"]
                };
            } else {
                months[currentMonth]["deliveries"]++
                months[currentMonth]["incomes"] = months[currentMonth]["incomes"] + transactions[i]["price"]
            }
            ridesCounter++;
        }
        // this.monthsArray = Object.keys[months];

        for (var i = 0; i < monthLetter.length; i++) {
            if (i.toString() in months) {
                monthsArray.push(monthLetter[i]);
                deliveries.push(months[i.toString()]["deliveries"])
                incomes.push(months[i.toString()]["incomes"])
            } else {
                monthsArray.push(0);
                deliveries.push(0);
                incomes.push(0)

            }

        }

        //top 5 transactions
        if (transactions.length > 6) {
            for (var i = 0; i < 5; i++) {
                topTransactions.push(transactions[i])
            }
        } else {
            topTransactions = transactions;
        }
        //
        res.status(200).json({

            total_income,
            ridesCounter,
            topTransactions,
            months,
            monthLetter,
            monthsArray,
            deliveries,
            incomes
        })
        console.log("total_income", monthsArray)
    } catch (e) {
        res.status(e.status).json({
            error: e.message
        });
    }
}