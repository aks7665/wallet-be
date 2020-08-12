const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true
        },
        operation: {
            type: String,
            enum: ['debit', 'credit']
        },
        amount: {
            type: Number
        },
        balance: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

transactionSchema.index({ createdAt: 1 });

const Transaction = mongoose.model(
    "transaction",
    transactionSchema
);

module.exports = Transaction;
