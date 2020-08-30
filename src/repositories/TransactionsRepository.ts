import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    const reducer = (
      prevTransaction: Transaction,
      currentTransaction: Transaction,
    ): Transaction => {
      const transaction: Transaction = {
        id: prevTransaction.id,
        title: prevTransaction.title,
        type: prevTransaction.type,
        value: prevTransaction.value + currentTransaction.value,
      };

      return transaction;
    };

    const transactionIncome = this.all().filter(t => t.type === 'income');

    if (transactionIncome.length > 0) {
      income = transactionIncome.reduce(reducer).value;
    }

    const transactionOutcome = this.all().filter(t => t.type === 'outcome');
    if (transactionOutcome.length > 0) {
      outcome = transactionOutcome.reduce(reducer).value;
    }

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
