const main = require('../scrape-function/scrape');

exports.getRouterController = async (req, res, next) => {
    try {
        const skill = req.body.skill;
        let scrp = await main(skill);
        // console.log(scrp);
        return res.status(200).json({
            status: "ok",
            list: scrp.list
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};