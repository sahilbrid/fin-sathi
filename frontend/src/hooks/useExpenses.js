import { useState, useCallback, useEffect } from 'react';
import { REFRESH_INTERVAL } from '../utils/constants';
// hooks/useExpenses.js
export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchExpenses = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('/api/expenses/get');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      // Ensure data is an array
      setExpenses(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Failed to load expenses. Please try again later.');
      setExpenses([]);  // Set to empty array on error
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);


  const addExpense = async (expenseData) => {
    try {
      const response = await fetch('/api/expenses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) throw new Error('Failed to add expense');

      setNotifications(prev => [...prev, { type: 'success', message: 'Expense added successfully!' }]);
      await fetchExpenses();
    } catch (error) {
      setNotifications(prev => [...prev, { type: 'error', message: 'Failed to add expense. Please try again.' }]);
      throw error;
    }
  };

  const deleteExpense = async (expenseId) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      const response = await fetch(`/api/expenses/delete/${expenseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete expense');

      setNotifications(prev => [...prev, { type: 'success', message: 'Expense deleted successfully!' }]);
      await fetchExpenses();
    } catch (error) {
      setNotifications(prev => [...prev, { type: 'error', message: 'Failed to delete expense. Please try again.' }]);
    }
  };

  useEffect(() => {
    fetchExpenses();
    const intervalId = setInterval(fetchExpenses, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    isRefreshing,
    notifications,
    fetchExpenses,
    addExpense,
    deleteExpense,
    setNotifications
  };
};