import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { WelcomePage } from './components/WelcomePage';
import { AboutUsPage } from './components/AboutUsPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { HomePage } from './components/HomePage';
import { DesignStudio } from './components/DesignStudio';
import { Marketplace } from './components/Marketplace';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';
import { MyOrders } from './components/MyOrders';
import { OrderDetails } from './components/OrderDetails';
import { ManufacturerDirectory } from './components/ManufacturerDirectory';
import { ProductionDashboard } from './components/ProductionDashboard';
import { Community } from './components/Community';
import { Analytics } from './components/Analytics';
import { Rankings } from './components/Rankings';
import { AIRecommendations } from './components/AIRecommendations';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { ManufacturerSelection } from './components/ManufacturerSelection';
import { Checkout } from './components/Checkout';
import { AdminPanel } from './components/AdminPanel';
import { DesignerDashboard } from './components/dashboards/DesignerDashboard';
import { BrandDashboard } from './components/dashboards/BrandDashboard';
import { ManufacturerDashboard } from './components/dashboards/ManufacturerDashboard';
import { ModelDashboard } from './components/dashboards/ModelDashboard';
import { ModelJobsPage } from './components/dashboards/ModelJobsPage';
import { ModelAnalyticsPage } from './components/dashboards/ModelAnalyticsPage';
import { ModelPortfolio } from './components/dashboards/ModelPortfolio';
import { ModelOrders } from './components/dashboards/ModelOrders';
import { ModelOrderDetails } from './components/dashboards/ModelOrderDetails';
import { ModelAnalytics } from './components/dashboards/ModelAnalytics';
import { ModelRanking } from './components/dashboards/ModelRanking';
import { BrandCommunityPage } from './components/dashboards/BrandCommunityPage';
import { BrandProductionPage } from './components/dashboards/BrandProductionPage';
import { ModelProfilePage } from './components/dashboards/ModelProfilePage';
import { ModelsDirectoryPage } from './components/dashboards/ModelsDirectoryPage';
import { StudioEntryPage } from './components/studio/StudioEntryPage';
import { StudioDesignPage } from './components/studio/StudioDesignPage';
import { StudioFabricSelectionPage } from './components/studio/StudioFabricSelectionPage';
import { StudioManufacturerMatchingPage } from './components/studio/StudioManufacturerMatchingPage';
import { StudioManufacturerProfilePage } from './components/studio/StudioManufacturerProfilePage';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { CustomerOrders } from './components/customer/CustomerOrders';
import { CustomerCommunity } from './components/customer/CustomerCommunity';
import { CustomerStudio } from './components/customer/CustomerStudio';
import { CustomerShop } from './components/customer/CustomerShop';
import { CustomerSettings } from './components/customer/CustomerSettings';
import { CustomerProductDetails } from './components/customer/CustomerProductDetails';
import { CustomerCart } from './components/customer/CustomerCart';
import { CustomerCheckout } from './components/customer/CustomerCheckout';
import { CustomerProfilePage } from './components/customer/CustomerProfilePage';
import { CustomerSelectManufacturer } from './components/customer/CustomerSelectManufacturer';
import { ManufacturerBranchSelection } from './components/manufacturer/ManufacturerBranchSelection';
import { UnifiedManufacturerDashboard } from './components/manufacturer/UnifiedManufacturerDashboard';
import { ManufacturerOrders } from './components/manufacturer/ManufacturerOrders';
import { ManufacturerInventory } from './components/manufacturer/ManufacturerInventory';
import { ManufacturerPlanning } from './components/manufacturer/ManufacturerPlanning';
import { ManufacturerAnalytics } from './components/manufacturer/ManufacturerAnalytics';
import { ManufacturerCommunityPage } from './components/manufacturer/ManufacturerCommunityPage';
import { ManufacturerSettings } from './components/manufacturer/ManufacturerSettings';
import { GarmentFactoryDashboard } from './components/manufacturer/GarmentFactoryDashboard';
import { PrintOnFactoryDashboard } from './components/manufacturer/PrintOnFactoryDashboard';
import { TailorDashboard } from './components/manufacturer/TailorDashboard';
import { ManufacturerCommunity } from './components/manufacturer/ManufacturerCommunity';
import { ManufacturerMaterials } from './components/manufacturer/ManufacturerMaterials';
import { ManufacturerPayments } from './components/manufacturer/ManufacturerPayments';
import { GarmentFactoryOrders } from './components/manufacturer/GarmentFactoryOrders';
import { GarmentFactoryProduction } from './components/manufacturer/GarmentFactoryProduction';
import { GarmentFactoryAnalytics } from './components/manufacturer/GarmentFactoryAnalytics';
import { GarmentFactoryCommunity } from './components/manufacturer/GarmentFactoryCommunity';
import { GarmentFactoryMaterials } from './components/manufacturer/GarmentFactoryMaterials';
import { PrintOnFactoryOrders } from './components/manufacturer/PrintOnFactoryOrders';
import { PrintOnFactoryProduction } from './components/manufacturer/PrintOnFactoryProduction';
import { PrintOnFactoryAnalytics } from './components/manufacturer/PrintOnFactoryAnalytics';
import { PrintOnFactoryCommunity } from './components/manufacturer/PrintOnFactoryCommunity';
import { PrintOnFactoryMaterials } from './components/manufacturer/PrintOnFactoryMaterials';
import { TailorOrders } from './components/manufacturer/TailorOrders';
import { TailorProduction } from './components/manufacturer/TailorProduction';
import { TailorAnalytics } from './components/manufacturer/TailorAnalytics';
import { TailorCommunity } from './components/manufacturer/TailorCommunity';
import { TailorMaterials } from './components/manufacturer/TailorMaterials';
import { LocalBrandDashboard } from './components/localbrand/LocalBrandDashboard';
import { LocalBrandManufacturers } from './components/localbrand/LocalBrandManufacturers';
import { LocalBrandProcess } from './components/localbrand/LocalBrandProcess';
import { LocalBrandModels } from './components/localbrand/LocalBrandModels';
import { LocalBrandOrders } from './components/localbrand/LocalBrandOrders';
import { LocalBrandAnalytics } from './components/localbrand/LocalBrandAnalytics';
import { LocalBrandStudio } from './components/localbrand/LocalBrandStudio';
import { LocalBrandSelectManufacturer } from './components/localbrand/LocalBrandSelectManufacturer';
import { LocalBrandSettings } from './components/localbrand/LocalBrandSettings';
import { LocalBrandCheckout } from './components/localbrand/LocalBrandCheckout';
import { LocalBrandUnifiedDashboard } from './components/localbrand/LocalBrandUnifiedDashboard';
import { StudioSelectGarment } from './components/localbrand/studio/StudioSelectGarment';
import { StudioDesignGarment } from './components/localbrand/studio/StudioDesignGarment';
import { StudioSelectManufacturer } from './components/localbrand/studio/StudioSelectManufacturer';

type UserRole = 'customer' | 'brand' | 'manufacturer' | 'model' | 'admin' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  manufacturerBranch?: 'garment-factory' | 'print-on-factory' | 'tailor';
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentPage: string;
  navigate: (page: string, params?: any) => void;
  routeParams?: any;
  cart: any[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// ✅ Helper: بناء الـ user object من profile
function buildUser(profile: any): User {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    role: profile.role,
    avatar: profile.avatar ?? undefined,
  };
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [routeParams, setRouteParams] = useState<any>(undefined);
  const [cart, setCart] = useState<any[]>([]);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // ✅ تحقق من الجلسة عند فتح التطبيق
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser(buildUser(profile));
          setCurrentPage('home');
        }
      }
      setAuthLoading(false);
    });

    // ✅ الاستماع لأي تغيير في الجلسة (يشمل Google OAuth)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const authUser = session.user;

          // ✅ تحقق هل عنده profile موجود
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (existingProfile) {
            // مستخدم موجود — حمّل بياناته
            setUser(buildUser(existingProfile));
            setCurrentPage('home');
          } else {
            // ✅ مستخدم جديد من Google — أنشئ له profile تلقائياً
            const newProfile = {
              id: authUser.id,
              name: authUser.user_metadata?.full_name
                || authUser.user_metadata?.name
                || authUser.email?.split('@')[0]
                || 'User',
              email: authUser.email || '',
              role: 'customer', // default role للـ Google users
              avatar: authUser.user_metadata?.avatar_url || null,
            };

            const { error: insertError } = await supabase
              .from('profiles')
              .upsert(newProfile, { onConflict: 'id' });

            if (!insertError) {
              setUser(buildUser(newProfile));
              setCurrentPage('home');
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setCurrentPage('welcome');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const navigate = (page: string, params?: any) => {
    setCurrentPage(page);
    setRouteParams(params || undefined);
  };

  const addToCart = (item: any) => {
    setCart(prev => [...prev, { ...item, cartId: Date.now().toString() }]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.cartId !== id));
  };

  const contextValue: AppContextType = {
    user, setUser, currentPage, navigate,
    routeParams, cart, addToCart, removeFromCart,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#E6C36A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8A8F98] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    if (currentPage === 'admin') return <AdminPanel />;

    if (!user) {
      switch (currentPage) {
        case 'welcome': return <WelcomePage />;
        case 'about':
        case 'about-us': return <AboutUsPage />;
        case 'login': return <LoginPage />;
        case 'register': return <RegisterPage />;
        default: return <WelcomePage />;
      }
    }

    if (currentPage === 'home') {
      switch (user.role) {
        case 'customer': return <CustomerDashboard />;
        case 'brand': return <BrandDashboard />;
        case 'manufacturer': return <ManufacturerDashboard />;
        case 'model': return <ModelDashboard />;
        default: return <HomePage />;
      }
    }

    if (currentPage === 'customer-orders') return <CustomerOrders />;
    if (currentPage === 'customer-community') return <CustomerCommunity />;
    if (currentPage === 'customer-studio') return <CustomerStudio />;
    if (currentPage === 'customer-shop') return <CustomerShop />;
    if (currentPage === 'customer-settings') return <CustomerSettings />;
    if (currentPage === 'customer-product-details') return <CustomerProductDetails />;
    if (currentPage === 'customer-cart') return <CustomerCart />;
    if (currentPage === 'customer-checkout') return <CustomerCheckout />;
    if (currentPage === 'customer-profile') return <CustomerProfilePage />;
    if (currentPage === 'customer-dashboard') return <CustomerDashboard />;
    if (currentPage === 'customer-select-manufacturer') return <CustomerSelectManufacturer />;
    if (currentPage === 'model-dashboard') return <ModelDashboard />;
    if (currentPage === 'model-jobs') return <ModelJobsPage />;
    if (currentPage === 'model-profile') return <ModelProfilePage />;
    if (currentPage === 'models-directory') return <ModelsDirectoryPage />;
    if (currentPage === 'model-portfolio') return <ModelPortfolio />;
    if (currentPage === 'model-orders') return <ModelOrders />;
    if (currentPage === 'model-order-details') return <ModelOrderDetails />;
    if (currentPage === 'model-analytics') return <ModelAnalytics />;
    if (currentPage === 'model-ranking') return <ModelRanking />;
    if (currentPage === 'brand-dashboard') return <BrandDashboard />;
    if (currentPage === 'brand-community') return <BrandCommunityPage />;
    if (currentPage === 'brand-production') return <BrandProductionPage />;
    if (currentPage === 'manufacturer-branch-selection') return <ManufacturerBranchSelection />;
    if (currentPage === 'manufacturer-dashboard') return <UnifiedManufacturerDashboard />;
    if (currentPage === 'manufacturer-orders') return <ManufacturerOrders />;
    if (currentPage === 'manufacturer-inventory') return <ManufacturerInventory />;
    if (currentPage === 'manufacturer-planning') return <ManufacturerPlanning />;
    if (currentPage === 'manufacturer-analytics') return <ManufacturerAnalytics />;
    if (currentPage === 'manufacturer-settings') return <ManufacturerSettings />;
    if (currentPage === 'garment-factory-dashboard') return <GarmentFactoryDashboard />;
    if (currentPage === 'garment-factory-orders') return <GarmentFactoryOrders />;
    if (currentPage === 'garment-factory-production') return <GarmentFactoryProduction />;
    if (currentPage === 'garment-factory-analytics') return <GarmentFactoryAnalytics />;
    if (currentPage === 'garment-factory-materials') return <GarmentFactoryMaterials />;
    if (currentPage === 'garment-factory-community') return <GarmentFactoryCommunity />;
    if (currentPage === 'garment-factory-payments') return <ManufacturerPayments />;
    if (currentPage === 'print-on-factory-dashboard') return <PrintOnFactoryDashboard />;
    if (currentPage === 'print-on-factory-orders') return <PrintOnFactoryOrders />;
    if (currentPage === 'print-on-factory-production') return <PrintOnFactoryProduction />;
    if (currentPage === 'print-on-factory-analytics') return <PrintOnFactoryAnalytics />;
    if (currentPage === 'print-on-factory-materials') return <PrintOnFactoryMaterials />;
    if (currentPage === 'print-on-factory-community') return <PrintOnFactoryCommunity />;
    if (currentPage === 'print-on-factory-payments') return <ManufacturerPayments />;
    if (currentPage === 'tailor-dashboard') return <TailorDashboard />;
    if (currentPage === 'tailor-orders') return <TailorOrders />;
    if (currentPage === 'tailor-production') return <TailorProduction />;
    if (currentPage === 'tailor-analytics') return <TailorAnalytics />;
    if (currentPage === 'tailor-materials') return <TailorMaterials />;
    if (currentPage === 'tailor-community') return <TailorCommunity />;
    if (currentPage === 'tailor-payments') return <ManufacturerPayments />;
    if (currentPage === 'studio-entry') return <StudioEntryPage />;
    if (currentPage === 'studio-design') return <StudioDesignPage />;
    if (currentPage === 'studio-fabric-selection') return <StudioFabricSelectionPage />;
    if (currentPage === 'studio-manufacturer-matching') return <StudioManufacturerMatchingPage />;
    if (currentPage === 'studio-manufacturer-profile') return <StudioManufacturerProfilePage />;
    if (
      currentPage === 'localbrand-dashboard' ||
      currentPage === 'localbrand-models' ||
      currentPage === 'localbrand-process' ||
      currentPage === 'localbrand-orders' ||
      currentPage === 'localbrand-analytics'
    ) return <LocalBrandUnifiedDashboard />;
    if (currentPage === 'localbrand-manufacturers') return <LocalBrandManufacturers />;
    if (currentPage === 'localbrand-studio') return <LocalBrandStudio />;
    if (currentPage === 'localbrand-select-manufacturer') return <LocalBrandSelectManufacturer />;
    if (currentPage === 'localbrand-settings') return <LocalBrandSettings />;
    if (currentPage === 'localbrand-checkout') return <LocalBrandCheckout />;
    if (currentPage === 'studio-select-garment') return <StudioSelectGarment />;
    if (currentPage === 'studio-design-garment') return <StudioDesignGarment />;
    if (currentPage === 'studio-select-manufacturer') return <StudioSelectManufacturer />;

    switch (currentPage) {
      case 'design-studio': return <DesignStudio />;
      case 'marketplace': return <Marketplace />;
      case 'product-details': return <ProductDetails />;
      case 'manufacturer-selection': return <ManufacturerSelection />;
      case 'checkout': return <Checkout />;
      case 'cart': return <Cart />;
      case 'orders': return <MyOrders />;
      case 'order-details': return <OrderDetails />;
      case 'manufacturer-directory': return <ManufacturerDirectory />;
      case 'production-dashboard': return <ProductionDashboard />;
      case 'community': return <Community />;
      case 'analytics': return <Analytics />;
      case 'rankings': return <Rankings />;
      case 'ai-recommendations': return <AIRecommendations />;
      case 'profile': return <Profile />;
      case 'settings': return <Settings />;
      default: return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#4a5565] via-50% via-[#e5e7eb]">
        {renderPage()}
      </div>
    </AppContext.Provider>
  );
}