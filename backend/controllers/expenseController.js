import pool from '../db/index.js'
import { calculateSettlement } from '../utils/calculateSplit';

export const addExpense = async (req, res)=>{
    try {
        const {amount, paidBy, participants, groupId} = req.body;
        if (!amount || !paidBy || !participants || !groupId) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const result = await pool.query(`insert into expenses (amount, paid_by, group_id, created_at) values ($1, $2, $3, NOW()) returning id`, [amount, paidBy, groupId]);
        const expenseId = result.rows[0].id;

        const insertQuery = `insert into expense_participants (expense_id, user_id) values ${participants.map((_, index) => `($1, $${index + 2})`).join(', ')}`;
        await pool.query(insertQuery, [expenseId, ...participants]);
        res.status(201).json({ message: 'Expense added successfully', expenseId });
        
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

export const getGroupExpenses = async (req, res) =>{
    const { groupId } = req.params;
    try {
        const expenseResult = await pool.query(`select e.id, e.amount, e.paid_by, ep.user_id as participant from expenses e join expense_participants ep on e.id = ep.expense_id where e.group_id = $1`, [groupId]);

        const expenses = {}
        expenseResult.rows.forEach(row =>{
            const {id, amount, paid_by, participant} = row;
            if(!expenses[id]){
                expenses[id] = {
                    id,
                    amount,
                    paidBy: paid_by,
                    participants: []
                }
            }
            expenses[id].participants.push(participant);
        })
        const expensesArray = Object.values(expenses);
        res.json({ expenses: expensesArray });
    } catch (error) {
        console.error('Error fetching group expenses:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

export const getGroupSettlements = async (req, res) => {
    const { groupId } = req.params;
    try {
        const expenseResult = await pool.query(`select e.id, e.amount, e.paid_by, ep.user_id as participant from expenses e join expense_participants ep on e.id = ep.expense_id where e.group_id = $1`, [groupId]);

        const expenses = {}
        expenseResult.rows.forEach(row =>{
            const {id, amount, paid_by, participant} = row;
            if(!expenses[id]){
                expenses[id] = {
                    id,
                    amount,
                    paidBy: paid_by,
                    participants: []
                }
            }
            expenses[id].participants.push(participant);
        })
        const expensesArray = Object.values(expenses);
        console.log('expensesArray', expensesArray);
        const settlements = calculateSettlement(expensesArray)

        res.json({ settlements});
    } catch (error) {
        console.error('Error fetching group settlements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}