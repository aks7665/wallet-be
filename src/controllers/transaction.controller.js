const Transaction = require("../models/transaction.model");

exports.add_transaction = async (req, res) => {
    try {
        const body = req.body;

        let lastBalanceAmount = 0;
        const lastBalance = await Transaction.find({}).sort({ createdAt: -1 }).limit(1);

        if (lastBalance.length > 0) {
            lastBalanceAmount = lastBalance[0].balance;
        }

        if (body.operation === 'debit') {
            body.balance = lastBalanceAmount - Number(body.amount);
        } else {
            body.balance = lastBalanceAmount + Number(body.amount);
        }
        
        const transaction = new Transaction(body);
        let result = await transaction.save();

        return res.status(200).send({
            status: true,
            status_code: 201,
            result,
            message: "New model club added."
        });
    } catch (error) {
        return res.status(200).send({
            status: false,
            status_code: 400,
            error,
            message: error.message || 'Error while adding transation.'
        });
    }
};

exports.fetch_all_transactions = async (req, res) => {
    try {

        const result = await Transaction.find({}).sort({ createdAt: -1 });

        if (!result) {
            throw new Error('Error while fetching records.');
        }

        return res.status(200).send({
            status: true,
            status_code: 200,
            result
        });
    } catch (error) {
        return res.status(200).send({
            status: false,
            status_code: 400,
            error,
            message: error.message || 'Error while adding transation.'
        });
    }
};
