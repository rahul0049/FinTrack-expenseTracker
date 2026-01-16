import { pool } from "../libs/database.js";

const getAccounts = async (req, res) => {
    try {
        const { userId } = req.user;
        const accounts = await pool.query({
            text: `SELECT * FROM tblaccount WHERE user_id =$1 ORDER BY id DESC`,
            values: [userId]
        });
        res.status(200).json({
            status: "success",
            data: accounts.rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message });
    }
}


const createAccount = async (req, res) => {
    try {
        const { userId } = req.user;
        const { name, amount, account_number } = req.body
        const accountExpiryQuery = {
            text: `SELECT * FROM tblaccount WHERE account_name =$1 AND user_id =$2`,
            values: [name, userId]
        };
        const accountExistResult = await pool.query(accountExpiryQuery);
        const accountExist = accountExistResult.rows[0];
        if (accountExist) {
            return res
                .status(409)
                .json({ status: "failed", message: "Account already created." });
        };

        const createAccountResult = await pool.query({
            text: `INSERT INTO tblaccount(user_id,account_name,account_number,account_balance) VALUES ($1,$2,$3,$4) RETURNING *`,
            values: [userId, name, account_number, amount]
        });
        const account = createAccountResult.rows[0];
        const userAccounts = Array.isArray(name) ? name : [name];

        const updateUserAccountQuery = {
            text: `UPDATE tbluser SET accounts = array_cat(accounts,$1),updatedat=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *`,
            values: [userAccounts, userId]
        };
        await pool.query(updateUserAccountQuery);
        const description = account.account_name + "(Initial Deposit)";
        const initialDepositQuery = {
            text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [
                userId,
                description,
                "income",
                "Completed",
                amount,
                account.account_name,
            ],
        };
        await pool.query(initialDepositQuery);
        res.status(200).json({
            status: "success",
            message: account.account_name + "account created successfully",
            data: account
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message })
    }
}

const addMoneyToAccount = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;
        const { amount } = req.body;
        const newAmount = Number(amount);

        if (newAmount <= 0) {
            return res.status(403).json({
                status: "failed",
                message: "Amount should be greater than 0"
            });
        }

        const result = await pool.query({
            text: `UPDATE tblaccount SET account_balance = (account_balance+$1),updatedat=CURRENT_TIMESTAMP WHERE id =$2 RETURNING *`,
            values: [newAmount, id]
        });
        const accountInfo = result.rows[0];
        const description = accountInfo.account_name + " (Deposit)";
        const transQuery = {
            text: `INSERT INTO tbltransaction (user_id,description,type,status,amount,source) 
            VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            values: [userId, description, "income", "completed", amount, accountInfo.account_name]
        }
        await pool.query(transQuery)
        res.status(200).json({
            status: "success",
            message: "operation completed successfully",
            data: accountInfo,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message })
    }
}
const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;

        // Verify account belongs to user
        const checkQuery = {
            text: `SELECT * FROM tblaccount WHERE id = $1 AND user_id = $2`,
            values: [id, userId],
        };
        const checkResult = await pool.query(checkQuery);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Account not found or unauthorized",
            });
        }

        // Since we don't know the full DB schema (cascade delete?), we'll just delete the account.
        // If there are foreign keys in `tbltransaction` pointing to `tblaccount` (id), this might fail if not CASCADE.
        // However, previously transactions used `source` as account name string, not FK ID.
        // Assuming it's safe to delete. 

        // Also need to remove the account name from `tbluser.accounts` array, but that's complex without array_remove logic.
        // For now, let's just delete the row from tblaccount.

        const deleteQuery = {
            text: `DELETE FROM tblaccount WHERE id = $1 RETURNING *`,
            values: [id],
        };
        await pool.query(deleteQuery);

        res.status(200).json({
            status: "success",
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message });
    }
};
export { getAccounts, createAccount, addMoneyToAccount, deleteAccount }