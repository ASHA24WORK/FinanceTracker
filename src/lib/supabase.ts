import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface UserProfile {
  id: string;
  name: string;
  user_type: 'freelancer' | 'e-commerce';
  created_at: string;
  updated_at: string;
}

export interface Income {
  id: string;
  user_id: string;
  amount: number;
  source: string;
  date: string;
  category: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  vendor: string;
  date: string;
  category: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Investment {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  date: string;
  platform: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  goal_name: string;
  target_amount: number;
  deadline: string | null;
  current_amount: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category: string;
  budget_limit: number;
  start_date: string;
  created_at: string;
  updated_at: string;
}

// Authentication Functions
export const signUp = async (email: string, password: string, name: string, userType: 'freelancer' | 'e-commerce') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        user_type: userType,
      },
      emailRedirectTo: `${window.location.origin}/dashboard`
    }
  });
  
  return { data, error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// User Profile Functions
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  return { data, error };
};

// Income Functions
export const getIncome = async (userId: string) => {
  const { data, error } = await supabase
    .from('income')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  
  return { data, error };
};

export const addIncome = async (income: Omit<Income, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('income')
    .insert([income])
    .select()
    .single();
  
  return { data, error };
};

export const updateIncome = async (id: string, updates: Partial<Income>) => {
  const { data, error } = await supabase
    .from('income')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deleteIncome = async (id: string) => {
  const { error } = await supabase
    .from('income')
    .delete()
    .eq('id', id);
  
  return { error };
};

// Expense Functions
export const getExpenses = async (userId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  
  return { data, error };
};

export const addExpense = async (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([expense])
    .select()
    .single();
  
  return { data, error };
};

export const updateExpense = async (id: string, updates: Partial<Expense>) => {
  const { data, error } = await supabase
    .from('expenses')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deleteExpense = async (id: string) => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);
  
  return { error };
};

// Investment Functions
export const getInvestments = async (userId: string) => {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  
  return { data, error };
};

export const addInvestment = async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('investments')
    .insert([investment])
    .select()
    .single();
  
  return { data, error };
};

export const updateInvestment = async (id: string, updates: Partial<Investment>) => {
  const { data, error } = await supabase
    .from('investments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deleteInvestment = async (id: string) => {
  const { error } = await supabase
    .from('investments')
    .delete()
    .eq('id', id);
  
  return { error };
};

// Savings Functions
export const getSavingsGoals = async (userId: string) => {
  const { data, error } = await supabase
    .from('savings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const addSavingsGoal = async (goal: Omit<SavingsGoal, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('savings')
    .insert([goal])
    .select()
    .single();
  
  return { data, error };
};

export const updateSavingsGoal = async (id: string, updates: Partial<SavingsGoal>) => {
  const { data, error } = await supabase
    .from('savings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deleteSavingsGoal = async (id: string) => {
  const { error } = await supabase
    .from('savings')
    .delete()
    .eq('id', id);
  
  return { error };
};

// Budget Functions
export const getBudgets = async (userId: string) => {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const addBudget = async (budget: Omit<Budget, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('budgets')
    .insert([budget])
    .select()
    .single();
  
  return { data, error };
};

export const updateBudget = async (id: string, updates: Partial<Budget>) => {
  const { data, error } = await supabase
    .from('budgets')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deleteBudget = async (id: string) => {
  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', id);
  
  return { error };
};

// Analytics Functions
export const getMonthlyData = async (userId: string) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const { data: incomeData, error: incomeError } = await supabase
    .from('income')
    .select('amount, date')
    .eq('user_id', userId)
    .gte('date', sixMonthsAgo.toISOString().split('T')[0]);
  
  const { data: expenseData, error: expenseError } = await supabase
    .from('expenses')
    .select('amount, date')
    .eq('user_id', userId)
    .gte('date', sixMonthsAgo.toISOString().split('T')[0]);
  
  return { incomeData, expenseData, incomeError, expenseError };
};

export const getExpensesByCategory = async (userId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('category, amount')
    .eq('user_id', userId);
  
  return { data, error };
};

// Utility Functions
export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    }).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};