import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://reqmxuzyeytffavzrhnv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcW14dXp5ZXl0ZmZhdnpyaG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzAyMjcsImV4cCI6MjA5MTA0NjIyN30.fMZg9qIh5lL-ver5XQiwSMxJ2m_jpzuhQHPXWblf_1Q'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ================== AUTH FUNCTIONS ==================

// تسجيل مستخدم جديد بإيميل وباسورد
export async function signUp(email: string, password: string, name: string, role: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role },
      // ✅ بدون emailRedirectTo عشان متحولش على localhost
    }
  })
  if (error) throw error

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(
        { id: data.user.id, name, email, role },
        { onConflict: 'id' }
      )
    if (profileError) console.error('Profile upsert error:', profileError)
  }
  return data
}

// تسجيل الدخول بإيميل وباسورد
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// ✅ تسجيل الدخول بـ Google
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin, // يرجع للموقع بعد Google
    }
  })
  if (error) throw error
  return data
}

// تسجيل الخروج
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// جلب بيانات المستخدم الحالي من جدول profiles
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

// جلب كل المستخدمين (للأدمن بس)
export async function getAllUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// ================== ORDERS ==================

export async function createOrder(orderData: any) {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getAllOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}