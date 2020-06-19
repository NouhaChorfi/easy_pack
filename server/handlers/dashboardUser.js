const db = require('../../database/index');

module.exports.detailDashboardUser = async (req, res, next) => {

    try {
        const {
            id
        } = req.params;
        const transactions = await db.transaction.findAll({
            where: {
                userId: id
            }
        });

        res.status(200).json({
            message: 'sucess'
        })

    } catch (e) {
        res.status(e.status).json({
            error: e.message
        });
    }
}