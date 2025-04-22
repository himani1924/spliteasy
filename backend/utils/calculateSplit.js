// [
    //  {
    //    amount: Number,
    //    paidBy: String (userId),
    //    participants: [String] (userIds)
    //  },
    //  ...
    //]

export const calculateSettlement = (expenses)=>{
    const netBalances = {}
    for(const expense of expenses){
        const {amount, paidBy, participants} = expense;
        const share = amount / participants.length;
        for (const user of participants){
            if(!netBalances[user]){
                netBalances[user] = 0;
            }
            if(user === paidBy){
                netBalances[user] += (amount - share);
            } else {
                netBalances[user] -= share;
            }
            console.log(netBalances);
        }
    }
    console.log('netBalances', netBalances);

    const creditors = [], debtors = [];

    for(const [user, balance] of Object.entries(netBalances)){
        if(balance >0){
            creditors.push({user, balance});
        }
        else if(balance < 0){
            debtors.push({user, balance: -balance});
        }
    }

    console.log('creditors', creditors);
    console.log('debtors', debtors);

    const settlements = [];
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];
    
        const amount = Math.min(debtor.balance, creditor.balance);
    
        settlements.push({
          from: debtor.user,
          to: creditor.user,
          amount: Number(amount.toFixed(2))
        });
    
        debtor.balance -= amount;
        creditor.balance -= amount;
    
        if (debtor.balance === 0) i++;
        if (creditor.balance === 0) j++;
      }
    console.log('settlements', settlements);
      return settlements;

}

// const expenses = [
//     {
//       amount: 1200,
//       paidBy: 'user1',
//       participants: ['user1', 'user2', 'user3']
//     },
//     {
//       amount: 600,
//       paidBy: 'user2',
//       participants: ['user1', 'user2']
//     }
//   ];
// console.log(calculateSettlement(expenses));  