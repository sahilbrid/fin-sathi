
// models/Expense.js
const ExpenseSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String },
    tags: [String]
  });
  
  export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
  