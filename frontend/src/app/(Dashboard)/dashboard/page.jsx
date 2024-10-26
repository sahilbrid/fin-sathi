'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, PieChart, Plus, Ban } from 'lucide-react';
import { useExpense } from '@/app/context/ExpenseContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Dashboard = () => {
  const { expenses = [], stats = {}, addExpense } = useExpense();
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'food',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['food', 'transport', 'utilities', 'entertainment', 'shopping'];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Handle adding new expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.category) return;

    addExpense({
      ...newExpense,
      amount: parseFloat(newExpense.amount)
    });

    setNewExpense({
      amount: '',
      category: 'food',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Prepare weekly chart data with safety checks
  const weeklyData = Object.entries(stats.dailyTotals || {}).map(([day, amount]) => ({
    day,
    amount: amount || 0
  }));

  // Prepare category pie chart data with safety checks
  const pieChartData = Object.entries(stats.weeklyCategoryTotals || {}).map(([name, value]) => ({
    name,
    value: value || 0
  }));

  // Empty state component
  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
      <Ban className="h-12 w-12 mb-4" />
      <p>{message}</p>
    </div>
  );

  // Chart wrapper component with empty state handling
  const ChartWrapper = ({ children, data, height = "300px" }) => {
    if (!data || data.length === 0) {
      return <EmptyState message="No data available" />;
    }
    return (
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    );
  };

  // Get highest spending category safely
  const getHighestCategory = () => {
    const categoryTotals = stats.categoryTotals || {};
    const entries = Object.entries(categoryTotals);
    return entries.length > 0 
      ? entries.sort(([,a], [,b]) => b - a)[0][0]
      : 'No data';
  };

  // Simulate monthly trends with the last 6 months of data
  const getMonthlyTrends = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(today.getMonth() - i);
      return {
        month: monthNames[d.getMonth()],
        amount: expenses.length ? Math.floor(Math.random() * 5000) + 10000 : 0
      };
    }).reverse();
    return last6Months;
  };

  const trendData = getMonthlyTrends();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Add Expense Form Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add New Expense</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddExpense} className="space-y-4">
                  <div>
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Description"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                      className="mb-2"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Add Expense
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Total Expenses Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(stats.totalExpenses || 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {expenses.length} total transactions
                </p>
                <p className="text-sm mt-2 text-muted-foreground">
                  Highest category: {getHighestCategory()}
                </p>
              </CardContent>
            </Card>

            {/* Category Totals Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Category Breakdown</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {Object.keys(stats.categoryTotals || {}).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(stats.categoryTotals || {}).map(([category, amount]) => (
                      <div key={category} className="flex justify-between">
                        <span className="capitalize">{category}</span>
                        <span>₹{amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState message="No category data available" />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend Chart */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartWrapper data={trendData}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartWrapper>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weekly Analysis Tab */}
        <TabsContent value="weekly" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Weekly Total Card */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(stats.weeklyTotal || 0).toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  {Object.keys(stats.dailyTotals || {}).length} days with transactions
                </p>
              </CardContent>
            </Card>

            {/* Weekly Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartWrapper data={weeklyData}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#82ca9d" />
                  </BarChart>
                </ChartWrapper>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expenses List</CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length > 0 ? (
                <div className="space-y-4">
                  {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map((expense) => (
                    <div key={expense.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{expense.description || 'No description'}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {expense.category} - {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="font-semibold">₹{expense.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No expenses recorded yet" />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartWrapper data={pieChartData}>
                <RePieChart>
                  <Pie 
                    data={pieChartData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RePieChart>
              </ChartWrapper>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;