const main = require('../scrape-function/scrape');

exports.getRouterController = async (req, res, next) => {
    try {
        const { skill } = req.body;
        let scrp = await main(skill);
        return res.status(200).json({
            status: "ok",
            list: scrp?.list || {}
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};