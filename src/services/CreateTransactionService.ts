import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ id, title, value, type }: Transaction): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error("Don't enough cash! Stranger...");
    }

    return this.transactionsRepository.create({ id, title, value, type });
  }
}

export default CreateTransactionService;
