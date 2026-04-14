import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useApp } from '../App';
import {
  Shield, LogOut, Users, Search, ArrowLeft,
  UserCheck, Package, ShoppingBag, DollarSign,
  Star, Clock, BarChart2, TrendingUp
} from 'lucide-react';

const ADMIN_EMAIL = 'youssef.hosam132004@gmail.com'; // ← غيّر لإيميلك

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface Order {
  id: string;
  user_name: string;
  user_email: string;
  product_name: string;
  quantity: number;
  total: number;
  status: string;
  manufacturer: string;
  created_at: string;
}

type Tab = 'overview' | 'users' | 'orders';

export function AdminPanel() {
  const { user: appUser, navigate } = useApp();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [users, setUsers] = useState<Profile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  const fetchData = async () => {
    setDataLoading(true);
    const [{ data: profilesData }, { data: ordersData }] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
    ]);
    if (profilesData) setUsers(profilesData);
    if (ordersData) setOrders(ordersData);
    setDataLoading(false);
  };

  useEffect(() => {
    // لو الأدمن دخل من اللوجن العادي
    if (appUser?.role === 'admin') {
      setIsLoggedIn(true);
      fetchData();
      return;
    }
    // لو دخل من Admin Access
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email === ADMIN_EMAIL) {
        setIsLoggedIn(true);
        fetchData();
      }
    });
  }, [appUser?.role]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      if (data.user?.email !== ADMIN_EMAIL) {
        await supabase.auth.signOut();
        throw new Error('غير مسموح — هذه الصفحة للأدمن فقط');
      }
      setIsLoggedIn(true);
      await fetchData();
    } catch (err: any) {
      setError(err.message?.includes('Invalid login') ? 'البريد أو كلمة المرور غير صحيحة' : err.message);
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    if (!appUser) await supabase.auth.signOut();
    navigate('welcome');
  };

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter(o => ['In Production', 'Shipped', 'Designing'].includes(o.status)).length;

  const mainStats = [
    { label: 'إجمالي المستخدمين', value: users.length, icon: Users, color: 'text-[#E6C36A]', bg: 'bg-[#E6C36A]/10' },
    { label: 'إجمالي الطلبات', value: orders.length, icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'الإيرادات (EGP)', value: totalRevenue.toLocaleString('en'), icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'طلبات نشطة', value: activeOrdersCount, icon: Clock, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  const roleStats = [
    { label: 'عملاء', value: users.filter(u => u.role === 'customer').length, icon: UserCheck },
    { label: 'مصنّعين', value: users.filter(u => u.role === 'manufacturer').length, icon: Package },
    { label: 'موديلز', value: users.filter(u => u.role === 'model').length, icon: Star },
    { label: 'براندات', value: users.filter(u => u.role === 'brand').length, icon: BarChart2 },
  ];

  const roleBadge: Record<string, string> = {
    customer: 'bg-blue-500/10 text-blue-400',
    manufacturer: 'bg-green-500/10 text-green-400',
    model: 'bg-purple-500/10 text-purple-400',
    brand: 'bg-orange-500/10 text-orange-400',
    admin: 'bg-[#E6C36A]/10 text-[#E6C36A]',
  };
  const roleLabel: Record<string, string> = {
    customer: 'عميل', manufacturer: 'مصنّع',
    model: 'موديل', brand: 'براند', admin: 'أدمن',
  };

  const statusBadge: Record<string, string> = {
    'Designing': 'bg-purple-500/10 text-purple-400',
    'In Production': 'bg-blue-500/10 text-blue-400',
    'Shipped': 'bg-yellow-500/10 text-yellow-400',
    'Delivered': 'bg-green-500/10 text-green-400',
    'Cancelled': 'bg-red-500/10 text-red-400',
  };

  const filteredUsers = users.filter(u =>
    (userRoleFilter === 'all' || u.role === userRoleFilter) &&
    (u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase()))
  );

  const filteredOrders = orders.filter(o =>
    o.user_name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.user_email?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.product_name?.toLowerCase().includes(orderSearch.toLowerCase())
  );

  // ━━━━━━━━━━━━━━ LOGIN SCREEN ━━━━━━━━━━━━━━
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('login')}
            className="flex items-center gap-2 text-[#8A8F98] hover:text-[#E6C36A] transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="size-4" />
            العودة لتسجيل الدخول
          </button>

          <div className="bg-[#141720] border border-[#1E2230] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#E6C36A]/10 rounded-xl flex items-center justify-center">
                <Shield className="size-5 text-[#E6C36A]" />
              </div>
              <div>
                <h1 className="text-[#F5F6F8] font-bold text-lg">لوحة الأدمن</h1>
                <p className="text-[#8A8F98] text-xs">BLACK STAR Admin Panel</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-6">
                <p className="text-red-400 text-sm text-right">{error}</p>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div>
                <label className="block text-[#8A8F98] text-xs mb-2 text-right">البريد الإلكتروني</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#1B1F2A] border border-[#1E2230] text-[#F5F6F8] rounded-xl px-4 py-3 text-right focus:outline-none focus:border-[#E6C36A] transition-colors placeholder-[#4A4F5A]"
                  placeholder="admin@example.com" required disabled={loginLoading}
                />
              </div>
              <div>
                <label className="block text-[#8A8F98] text-xs mb-2 text-right">كلمة المرور</label>
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#1B1F2A] border border-[#1E2230] text-[#F5F6F8] rounded-xl px-4 py-3 text-right focus:outline-none focus:border-[#E6C36A] transition-colors placeholder-[#4A4F5A]"
                  placeholder="••••••••" required disabled={loginLoading}
                />
              </div>
              <button
                type="submit" disabled={loginLoading}
                className="w-full bg-[#E6C36A] text-[#0B0D10] font-bold py-3 rounded-xl hover:bg-[#d4b05a] transition-colors disabled:opacity-60 mt-2"
              >
                {loginLoading ? 'جاري التحقق...' : 'دخول لوحة الأدمن'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━ ADMIN DASHBOARD ━━━━━━━━━━━━━━
  return (
    <div className="min-h-screen bg-[#0B0D10]" dir="rtl">

      {/* Top Bar */}
      <div className="bg-[#141720] border-b border-[#1E2230] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E6C36A]/10 rounded-lg flex items-center justify-center">
              <Shield className="size-4 text-[#E6C36A]" />
            </div>
            <span className="text-[#F5F6F8] font-bold text-sm">BLACK STAR — لوحة التحكم</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="text-[#8A8F98] hover:text-[#E6C36A] text-xs transition-colors px-3 py-1.5 rounded-lg hover:bg-[#1B1F2A]"
            >
              🔄 تحديث
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#8A8F98] hover:text-red-400 transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-red-500/10"
            >
              <LogOut className="size-4" />
              خروج
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 pb-3">
          {([
            { id: 'overview' as Tab, label: '📊 نظرة عامة' },
            { id: 'users' as Tab, label: '👥 المستخدمون' },
            { id: 'orders' as Tab, label: '📦 الطلبات' },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#E6C36A] text-[#0B0D10]'
                  : 'text-[#8A8F98] hover:text-[#F5F6F8] hover:bg-[#1B1F2A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ━━━━ TAB: OVERVIEW ━━━━ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Main Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mainStats.map((stat, i) => (
                <div key={i} className="bg-[#141720] border border-[#1E2230] rounded-xl p-5">
                  <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                    <stat.icon className={`size-4 ${stat.color}`} />
                  </div>
                  <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                  <p className="text-[#8A8F98] text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Role Breakdown */}
            <div className="bg-[#141720] border border-[#1E2230] rounded-xl p-6">
              <h3 className="text-[#F5F6F8] font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="size-4 text-[#E6C36A]" />
                توزيع المستخدمين
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {roleStats.map((r, i) => (
                  <div key={i} className="bg-[#1B1F2A] rounded-lg p-4 text-center">
                    <r.icon className="size-5 text-[#8A8F98] mx-auto mb-2" />
                    <p className="text-[#F5F6F8] text-xl font-bold">{r.value}</p>
                    <p className="text-[#8A8F98] text-xs mt-1">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-[#141720] border border-[#1E2230] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#F5F6F8] font-bold flex items-center gap-2">
                  <ShoppingBag className="size-4 text-[#E6C36A]" />
                  آخر الطلبات
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-[#E6C36A] text-xs hover:underline"
                >
                  عرض الكل
                </button>
              </div>

              {dataLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-[#1B1F2A] rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingBag className="size-10 text-[#1E2230] mx-auto mb-2" />
                  <p className="text-[#8A8F98] text-sm">لا يوجد طلبات بعد</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between bg-[#1B1F2A] rounded-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#E6C36A]/10 rounded-full flex items-center justify-center">
                          <Package className="size-3 text-[#E6C36A]" />
                        </div>
                        <div>
                          <p className="text-[#F5F6F8] text-sm">{order.product_name}</p>
                          <p className="text-[#8A8F98] text-xs">{order.user_name || order.user_email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusBadge[order.status] || 'bg-[#1B1F2A] text-[#8A8F98]'}`}>
                          {order.status}
                        </span>
                        <span className="text-[#E6C36A] text-sm font-bold">
                          EGP {(order.total || 0).toLocaleString('en')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Users */}
            <div className="bg-[#141720] border border-[#1E2230] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#F5F6F8] font-bold flex items-center gap-2">
                  <Users className="size-4 text-[#E6C36A]" />
                  آخر المسجّلين
                </h3>
                <button
                  onClick={() => setActiveTab('users')}
                  className="text-[#E6C36A] text-xs hover:underline"
                >
                  عرض الكل
                </button>
              </div>

              {dataLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-[#1B1F2A] rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : users.length === 0 ? (
                <div className="py-8 text-center">
                  <Users className="size-10 text-[#1E2230] mx-auto mb-2" />
                  <p className="text-[#8A8F98] text-sm">لا يوجد مستخدمين بعد</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {users.slice(0, 5).map(u => (
                    <div key={u.id} className="flex items-center justify-between bg-[#1B1F2A] rounded-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#E6C36A]/10 rounded-full flex items-center justify-center">
                          <span className="text-[#E6C36A] text-xs font-bold">
                            {u.name?.charAt(0)?.toUpperCase() || '?'}
                          </span>
                        </div>
                        <div>
                          <p className="text-[#F5F6F8] text-sm">{u.name || '—'}</p>
                          <p className="text-[#8A8F98] text-xs">{u.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${roleBadge[u.role] || 'bg-[#1B1F2A] text-[#8A8F98]'}`}>
                          {roleLabel[u.role] || u.role}
                        </span>
                        <span className="text-[#8A8F98] text-xs">
                          {new Date(u.created_at).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ━━━━ TAB: USERS ━━━━ */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="bg-[#141720] border border-[#1E2230] rounded-xl p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#8A8F98]" />
                  <input
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    placeholder="ابحث بالاسم أو الإيميل..."
                    className="w-full bg-[#1B1F2A] border border-[#1E2230] text-[#F5F6F8] rounded-lg pr-10 pl-4 py-2.5 text-sm text-right focus:outline-none focus:border-[#E6C36A] transition-colors placeholder-[#4A4F5A]"
                  />
                </div>
                <div className="flex items-center gap-1 bg-[#1B1F2A] rounded-lg p-1">
                  {(['all', 'customer', 'manufacturer', 'model', 'brand'] as const).map(role => (
                    <button
                      key={role}
                      onClick={() => setUserRoleFilter(role)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        userRoleFilter === role
                          ? 'bg-[#E6C36A] text-[#0B0D10]'
                          : 'text-[#8A8F98] hover:text-[#F5F6F8]'
                      }`}
                    >
                      {role === 'all' ? 'الكل' : role === 'customer' ? 'عملاء' :
                        role === 'manufacturer' ? 'مصنّعين' : role === 'model' ? 'موديلز' : 'براندات'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#141720] border border-[#1E2230] rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-[#1E2230] bg-[#1B1F2A]">
                <span className="text-[#8A8F98] text-xs font-medium">الاسم</span>
                <span className="text-[#8A8F98] text-xs font-medium">البريد الإلكتروني</span>
                <span className="text-[#8A8F98] text-xs font-medium">الدور</span>
                <span className="text-[#8A8F98] text-xs font-medium">تاريخ التسجيل</span>
              </div>

              {dataLoading ? (
                <div className="space-y-px">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="grid grid-cols-4 gap-4 px-6 py-4 animate-pulse">
                      {[1, 2, 3, 4].map(j => (
                        <div key={j} className="h-4 bg-[#1B1F2A] rounded" />
                      ))}
                    </div>
                  ))}
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="py-16 text-center">
                  <Users className="size-10 text-[#1E2230] mx-auto mb-3" />
                  <p className="text-[#8A8F98] text-sm">لا يوجد مستخدمين</p>
                </div>
              ) : (
                filteredUsers.map((u, i) => (
                  <div
                    key={u.id}
                    className={`grid grid-cols-4 gap-4 px-6 py-4 hover:bg-[#1B1F2A] transition-colors ${
                      i !== filteredUsers.length - 1 ? 'border-b border-[#1E2230]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#E6C36A]/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[#E6C36A] text-xs font-bold">
                          {u.name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      </div>
                      <span className="text-[#F5F6F8] text-sm truncate">{u.name || '—'}</span>
                    </div>
                    <span className="text-[#8A8F98] text-sm self-center truncate">{u.email}</span>
                    <div className="self-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${roleBadge[u.role] || 'bg-[#1B1F2A] text-[#8A8F98]'}`}>
                        {roleLabel[u.role] || u.role}
                      </span>
                    </div>
                    <span className="text-[#8A8F98] text-xs self-center">
                      {new Date(u.created_at).toLocaleDateString('ar-EG', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </span>
                  </div>
                ))
              )}
            </div>

            <p className="text-center text-[#4A4F5A] text-xs">
              يتم عرض {filteredUsers.length} من أصل {users.length} مستخدم
            </p>
          </div>
        )}

        {/* ━━━━ TAB: ORDERS ━━━━ */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="bg-[#141720] border border-[#1E2230] rounded-xl p-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#8A8F98]" />
                <input
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="ابحث بالاسم أو الإيميل أو المنتج..."
                  className="w-full bg-[#1B1F2A] border border-[#1E2230] text-[#F5F6F8] rounded-lg pr-10 pl-4 py-2.5 text-sm text-right focus:outline-none focus:border-[#E6C36A] transition-colors placeholder-[#4A4F5A]"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#141720] border border-[#1E2230] rounded-xl overflow-hidden">
              <div className="grid grid-cols-5 gap-4 px-6 py-3 border-b border-[#1E2230] bg-[#1B1F2A]">
                <span className="text-[#8A8F98] text-xs font-medium">العميل</span>
                <span className="text-[#8A8F98] text-xs font-medium">المنتج</span>
                <span className="text-[#8A8F98] text-xs font-medium">الكمية</span>
                <span className="text-[#8A8F98] text-xs font-medium">الحالة</span>
                <span className="text-[#8A8F98] text-xs font-medium">الإجمالي</span>
              </div>

              {dataLoading ? (
                <div className="space-y-px">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="grid grid-cols-5 gap-4 px-6 py-4 animate-pulse">
                      {[1, 2, 3, 4, 5].map(j => (
                        <div key={j} className="h-4 bg-[#1B1F2A] rounded" />
                      ))}
                    </div>
                  ))}
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="size-10 text-[#1E2230] mx-auto mb-3" />
                  <p className="text-[#8A8F98] text-sm">لا يوجد طلبات</p>
                </div>
              ) : (
                filteredOrders.map((order, i) => (
                  <div
                    key={order.id}
                    className={`grid grid-cols-5 gap-4 px-6 py-4 hover:bg-[#1B1F2A] transition-colors ${
                      i !== filteredOrders.length - 1 ? 'border-b border-[#1E2230]' : ''
                    }`}
                  >
                    <div>
                      <p className="text-[#F5F6F8] text-sm">{order.user_name || '—'}</p>
                      <p className="text-[#8A8F98] text-xs truncate">{order.user_email}</p>
                    </div>
                    <div>
                      <p className="text-[#F5F6F8] text-sm">{order.product_name}</p>
                      <p className="text-[#8A8F98] text-xs">{order.manufacturer}</p>
                    </div>
                    <span className="text-[#8A8F98] text-sm self-center">{order.quantity} unit</span>
                    <div className="self-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[order.status] || 'bg-[#1B1F2A] text-[#8A8F98]'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="self-center">
                      <p className="text-[#E6C36A] font-bold text-sm">
                        EGP {(order.total || 0).toLocaleString('en')}
                      </p>
                      <p className="text-[#8A8F98] text-xs">
                        {new Date(order.created_at).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <p className="text-center text-[#4A4F5A] text-xs">
              يتم عرض {filteredOrders.length} من أصل {orders.length} طلب
            </p>
          </div>
        )}

      </div>
    </div>
  );
}