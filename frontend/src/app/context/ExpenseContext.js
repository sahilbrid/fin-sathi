'use client'
// context/ExpenseContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  // Load data from localStorage on initial render
  const loadInitialData = () => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedMonthlyExpense = localStorage.getItem('monthlyExpense');
    const savedCurrentSavings = localStorage.getItem('currentSavings');
    const savedFinancialGoal = localStorage.getItem('financialGoal');
    
    return {
      expenses: savedExpenses ? JSON.parse(savedExpenses) : [
        {
          id: 1,
          amount: 2500,
          category: 'food',
          description: 'Monthly groceries',
          date: '2024-10-20'
        },
        // ... other initial expenses
      ],
      monthlyExpense: savedMonthlyExpense || '20000',
      currentSavings: savedCurrentSavings || '80000',
      financialGoal: savedFinancialGoal ? JSON.parse(savedFinancialGoal) : {
        description: '',
        amount: '20000'
      }
    };
  };

  const initialData = loadInitialData();
  const [expenses, setExpenses] = useState(initialData.expenses);
  const [monthlyExpense, setMonthlyExpense] = useState(initialData.monthlyExpense);
  const [currentSavings, setCurrentSavings] = useState(initialData.currentSavings);
  const [financialGoal, setFinancialGoal] = useState(initialData.financialGoal);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('monthlyExpense', monthlyExpense);
    localStorage.setItem('currentSavings', currentSavings);
    localStorage.setItem('financialGoal', JSON.stringify(financialGoal));
  }, [expenses, monthlyExpense, currentSavings, financialGoal]);

  // Calculate statistics
  const calculateStats = () => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
      return acc;
    }, {});

    // Calculate weekly data
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weeklyExpenses = expenses.filter(exp => new Date(exp.date) >= oneWeekAgo);
    
    const dailyTotals = weeklyExpenses.reduce((acc, exp) => {
      const day = new Date(exp.date).toLocaleDateString('en-US', { weekday: 'short' });
      acc[day] = (acc[day] || 0) + parseFloat(exp.amount);
      return acc;
    }, {});

    const weeklyCategoryTotals = weeklyExpenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
      return acc;
    }, {});

    return {
      totalExpenses,
      categoryTotals,
      dailyTotals,
      weeklyCategoryTotals,
      weeklyTotal: weeklyExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
    };
  };

  const addExpense = (newExpense) => {
    setExpenses(prev => [...prev, { ...newExpense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    ));
  };

  const updateFinancialGoal = (newGoal) => {
    setFinancialGoal(newGoal);
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      monthlyExpense,
      currentSavings,
      financialGoal,
      stats: calculateStats(),
      addExpense,
      deleteExpense,
      updateExpense,
      setMonthlyExpense,
      setCurrentSavings,
      updateFinancialGoal
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};