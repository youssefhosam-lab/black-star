import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, CheckCircle, Circle, Clock } from 'lucide-react';
import Logo from '../../imports/Logo';

interface ProductionStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  timestamp?: string;
  assignedWorker?: string;
  notes?: string;
}

export function GarmentFactoryProduction() {
  const { navigate, user, routeParams } = useApp();
  
  // Mock order data - in real app, fetch based on routeParams.orderId
  const orderInfo = {
    orderId: 'ORD-2024-1245',
    brand: 'Urban Collective',
    garment: 'Black Hoodies',
    quantity: 500,
    fabric: 'Cotton Fleece',
    deadline: '2024-12-28',
  };

  const [productionSteps, setProductionSteps] = useState<ProductionStep[]>([
    {
      id: '1',
      name: 'Pattern Received',
      status: 'completed',
      timestamp: '2024-12-15 09:00',
      assignedWorker: 'Maria Santos',
    },
    {
      id: '2',
      name: 'Cutting',
      status: 'completed',
      timestamp: '2024-12-16 14:30',
      assignedWorker: 'John Kim',
    },
    {
      id: '3',
      name: 'Sewing',
      status: 'in-progress',
      timestamp: '2024-12-18 08:00',
      assignedWorker: 'Ana Rodriguez',
      notes: '250/500 units completed',
    },
    {
      id: '4',
      name: 'Assembly',
      status: 'pending',
    },
    {
      id: '5',
      name: 'Quality Control',
      status: 'pending',
    },
    {
      id: '6',
      name: 'Ready for Delivery',
      status: 'pending',
    },
  ]);

  const [selectedStep, setSelectedStep] = useState<string | null>('3');
  const [newNote, setNewNote] = useState('');

  const toggleStepStatus = (stepId: string) => {
    setProductionSteps((steps) =>
      steps.map((step) => {
        if (step.id === stepId) {
          const newStatus =
            step.status === 'pending'
              ? 'in-progress'
              : step.status === 'in-progress'
              ? 'completed'
              : 'completed';
          return {
            ...step,
            status: newStatus,
            timestamp: newStatus !== 'pending' ? new Date().toISOString() : step.timestamp,
          };
        }
        return step;
      })
    );
  };

  const getStepIcon = (status: ProductionStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-[#E6C36A]" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-[#0B0D10]" />;
      case 'pending':
        return <Circle className="w-6 h-6 text-[#9CA3AF]" />;
    }
  };

  const currentStep = productionSteps.find((s) => s.id === selectedStep);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('home')}>
            <Logo showText={false} />
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {['Orders', 'Analytics', 'Materials', 'Community', 'Payments'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`garment-factory-${item.toLowerCase()}`)}
                className={`text-sm font-medium transition-colors tracking-wide ${
                  item === 'Production' ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Production Content */}
      <div className="container mx-auto px-6 py-16">
        <button
          onClick={() => navigate('garment-factory-orders')}
          className="mb-8 text-sm text-[#9CA3AF] hover:text-[#0B0D10] transition-colors"
        >
          ← Back to Orders
        </button>

        {/* Order Info */}
        <div className="border border-[#E5E7EB] p-8 mb-12">
          <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
            Production Timeline
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-[#9CA3AF] mb-1">Order ID</p>
              <p className="text-[#0B0D10] font-medium">{orderInfo.orderId}</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] mb-1">Brand</p>
              <p className="text-[#0B0D10] font-medium">{orderInfo.brand}</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] mb-1">Garment</p>
              <p className="text-[#0B0D10] font-medium">{orderInfo.garment}</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] mb-1">Deadline</p>
              <p className="text-[#0B0D10] font-medium">
                {new Date(orderInfo.deadline).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Production Steps */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
              Production Steps
            </h2>

            <div className="space-y-4">
              {productionSteps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setSelectedStep(step.id)}
                  className={`border p-6 cursor-pointer transition-all ${
                    selectedStep === step.id
                      ? 'border-[#0B0D10] bg-[#FAFAFA]'
                      : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      {getStepIcon(step.status)}
                      <div>
                        <h3 className="font-medium text-[#0B0D10]">
                          {index + 1}. {step.name}
                        </h3>
                        {step.assignedWorker && (
                          <p className="text-xs text-[#9CA3AF] mt-1">
                            Assigned: {step.assignedWorker}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStepStatus(step.id);
                      }}
                      className={`px-4 py-2 text-xs font-medium transition-colors ${
                        step.status === 'completed'
                          ? 'bg-[#E6C36A]/20 text-[#0B0D10]'
                          : step.status === 'in-progress'
                          ? 'bg-[#0B0D10] text-white'
                          : 'bg-[#E5E7EB] text-[#9CA3AF]'
                      }`}
                    >
                      {step.status === 'completed'
                        ? 'Completed'
                        : step.status === 'in-progress'
                        ? 'In Progress'
                        : 'Start'}
                    </button>
                  </div>

                  {step.timestamp && (
                    <p className="text-xs text-[#9CA3AF]">
                      {new Date(step.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  )}

                  {step.notes && (
                    <p className="text-sm text-[#0B0D10] mt-2 pt-2 border-t border-[#E5E7EB]">
                      {step.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Details & Notes */}
          <div className="lg:col-span-1">
            <div className="border border-[#E5E7EB] p-6 sticky top-24">
              <h2 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                Step Details
              </h2>

              {currentStep ? (
                <div>
                  <div className="mb-6">
                    <p className="text-sm text-[#9CA3AF] mb-2">Current Step</p>
                    <p className="text-lg font-medium text-[#0B0D10]">{currentStep.name}</p>
                  </div>

                  {currentStep.assignedWorker && (
                    <div className="mb-6">
                      <p className="text-sm text-[#9CA3AF] mb-2">Assigned Worker</p>
                      <p className="text-[#0B0D10]">{currentStep.assignedWorker}</p>
                    </div>
                  )}

                  <div className="mb-6">
                    <p className="text-sm text-[#9CA3AF] mb-2">Status</p>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium ${
                        currentStep.status === 'completed'
                          ? 'bg-[#E6C36A]/20 text-[#0B0D10]'
                          : currentStep.status === 'in-progress'
                          ? 'bg-[#0B0D10] text-white'
                          : 'bg-[#E5E7EB] text-[#9CA3AF]'
                      }`}
                    >
                      {currentStep.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-[#9CA3AF] mb-2">Add Note</label>
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] placeholder-[#9CA3AF] focus:border-[#0B0D10] focus:outline-none resize-none"
                      placeholder="Add production notes, issues, or updates..."
                    />
                  </div>

                  <button className="w-full px-4 py-3 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity">
                    Save Note
                  </button>
                </div>
              ) : (
                <p className="text-sm text-[#9CA3AF]">Select a step to view details</p>
              )}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mt-12 border border-[#E5E7EB] p-8">
          <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
            Overall Progress
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 bg-[#E5E7EB] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#E6C36A] h-full transition-all duration-500"
                style={{
                  width: `${
                    (productionSteps.filter((s) => s.status === 'completed').length /
                      productionSteps.length) *
                    100
                  }%`,
                }}
              />
            </div>
            <p className="text-sm font-medium text-[#0B0D10]">
              {productionSteps.filter((s) => s.status === 'completed').length} / {productionSteps.length} steps
            </p>
          </div>
          <p className="text-sm text-[#9CA3AF]">
            Last updated: {new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}