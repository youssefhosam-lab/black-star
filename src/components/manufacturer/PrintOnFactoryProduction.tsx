import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, CheckCircle, Circle, Clock, AlertTriangle } from 'lucide-react';
import Logo from '../../imports/Logo';

interface ProductionStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'error';
  timestamp?: string;
  notes?: string;
  errorDetails?: string;
}

export function PrintOnFactoryProduction() {
  const { navigate, user } = useApp();
  
  const jobInfo = {
    jobId: 'PRN-2024-0845',
    brand: 'Urban Collective',
    printType: 'DTG',
    colors: 4,
    quantity: 200,
    placement: 'Front Chest',
    deadline: '2024-12-24',
  };

  const [productionSteps, setProductionSteps] = useState<ProductionStep[]>([
    {
      id: '1',
      name: 'File Received',
      status: 'completed',
      timestamp: '2024-12-18 09:30',
      notes: 'Vector file approved - 4 colors confirmed',
    },
    {
      id: '2',
      name: 'Print Test',
      status: 'completed',
      timestamp: '2024-12-18 14:00',
      notes: 'Test print approved by client',
    },
    {
      id: '3',
      name: 'Approval',
      status: 'completed',
      timestamp: '2024-12-19 10:00',
    },
    {
      id: '4',
      name: 'Printing',
      status: 'in-progress',
      timestamp: '2024-12-20 08:00',
      notes: '120/200 units completed',
    },
    {
      id: '5',
      name: 'Fix / Reprint',
      status: 'pending',
      notes: 'Used if quality issues arise',
    },
    {
      id: '6',
      name: 'Completed',
      status: 'pending',
    },
  ]);

  const [selectedStep, setSelectedStep] = useState<string | null>('4');
  const [newNote, setNewNote] = useState('');

  const toggleStepStatus = (stepId: string) => {
    setProductionSteps((steps) =>
      steps.map((step) => {
        if (step.id === stepId) {
          let newStatus: ProductionStep['status'];
          if (step.status === 'pending') newStatus = 'in-progress';
          else if (step.status === 'in-progress') newStatus = 'completed';
          else newStatus = 'completed';
          
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

  const markAsError = (stepId: string) => {
    setProductionSteps((steps) =>
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            status: 'error' as const,
            timestamp: new Date().toISOString(),
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
      case 'error':
        return <AlertTriangle className="w-6 h-6 text-[#7A0F0F]" />;
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
            {['Orders', 'Production', 'Materials', 'Community', 'Payments'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`print-on-factory-${item.toLowerCase()}`)}
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
          onClick={() => navigate('print-on-factory-orders')}
          className="mb-8 text-sm text-[#9CA3AF] hover:text-[#0B0D10] transition-colors"
        >
          ← Back to Jobs
        </button>

        {/* Job Info */}
        <div className="border border-[#E5E7EB] p-8 mb-12">
          <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
            Print Production Timeline
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-[#9CA3AF] mb-1">Job ID</p>
              <p className="text-[#0B0D10] font-medium">{jobInfo.jobId}</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] mb-1">Brand</p>
              <p className="text-[#0B0D10] font-medium">{jobInfo.brand}</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] mb-1">Print Type</p>
              <p className="text-[#0B0D10] font-medium">{jobInfo.printType} - {jobInfo.colors} colors</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] mb-1">Deadline</p>
              <p className="text-[#0B0D10] font-medium">
                {new Date(jobInfo.deadline).toLocaleDateString('en-US', {
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
              Print Production Steps
            </h2>

            <div className="space-y-4">
              {productionSteps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setSelectedStep(step.id)}
                  className={`border p-6 cursor-pointer transition-all ${
                    step.status === 'error'
                      ? 'border-[#7A0F0F] bg-[#7A0F0F]/5'
                      : selectedStep === step.id
                      ? 'border-[#0B0D10] bg-[#FAFAFA]'
                      : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 flex-1">
                      {getStepIcon(step.status)}
                      <div className="flex-1">
                        <h3 className="font-medium text-[#0B0D10]">
                          {index + 1}. {step.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {step.id !== '5' && step.status !== 'error' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsError(step.id);
                          }}
                          className="px-3 py-1 text-xs text-[#7A0F0F] hover:bg-[#7A0F0F]/10 transition-colors"
                        >
                          Report Error
                        </button>
                      )}
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
                            : step.status === 'error'
                            ? 'bg-[#7A0F0F] text-white'
                            : 'bg-[#E5E7EB] text-[#9CA3AF]'
                        }`}
                      >
                        {step.status === 'completed'
                          ? 'Completed'
                          : step.status === 'in-progress'
                          ? 'In Progress'
                          : step.status === 'error'
                          ? 'Error'
                          : 'Start'}
                      </button>
                    </div>
                  </div>

                  {step.timestamp && (
                    <p className="text-xs text-[#9CA3AF] mb-2">
                      {new Date(step.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  )}

                  {step.notes && (
                    <p className="text-sm text-[#0B0D10] pt-2 border-t border-[#E5E7EB]">
                      {step.notes}
                    </p>
                  )}

                  {step.errorDetails && (
                    <div className="mt-3 p-3 bg-[#7A0F0F]/10 border-l-2 border-[#7A0F0F]">
                      <p className="text-sm text-[#7A0F0F]">{step.errorDetails}</p>
                    </div>
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

                  <div className="mb-6">
                    <p className="text-sm text-[#9CA3AF] mb-2">Status</p>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium ${
                        currentStep.status === 'completed'
                          ? 'bg-[#E6C36A]/20 text-[#0B0D10]'
                          : currentStep.status === 'in-progress'
                          ? 'bg-[#0B0D10] text-white'
                          : currentStep.status === 'error'
                          ? 'bg-[#7A0F0F] text-white'
                          : 'bg-[#E5E7EB] text-[#9CA3AF]'
                      }`}
                    >
                      {currentStep.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  {currentStep.status === 'error' && (
                    <div className="mb-6">
                      <label className="block text-sm text-[#9CA3AF] mb-2">Error Details</label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 border border-[#7A0F0F] text-[#0B0D10] placeholder-[#9CA3AF] focus:border-[#7A0F0F] focus:outline-none resize-none"
                        placeholder="Describe the error (color mismatch, misprint, etc.)"
                      />
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm text-[#9CA3AF] mb-2">Add Note</label>
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] placeholder-[#9CA3AF] focus:border-[#0B0D10] focus:outline-none resize-none"
                      placeholder="Add production notes, color adjustments, or updates..."
                    />
                  </div>

                  <button className="w-full px-4 py-3 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity mb-3">
                    Save Note
                  </button>

                  {currentStep.status === 'error' && (
                    <button
                      onClick={() => {
                        // Logic to move to Fix/Reprint step
                        setProductionSteps((steps) =>
                          steps.map((s) =>
                            s.id === '5' ? { ...s, status: 'in-progress' as const } : s
                          )
                        );
                      }}
                      className="w-full px-4 py-3 border border-[#7A0F0F] text-[#7A0F0F] font-medium hover:bg-[#7A0F0F] hover:text-white transition-colors"
                    >
                      Move to Reprint
                    </button>
                  )}
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
                      productionSteps.filter((s) => s.id !== '5').length) *
                    100
                  }%`,
                }}
              />
            </div>
            <p className="text-sm font-medium text-[#0B0D10]">
              {productionSteps.filter((s) => s.status === 'completed').length} / {productionSteps.filter((s) => s.id !== '5').length} steps
            </p>
          </div>
          {productionSteps.some((s) => s.status === 'error') && (
            <div className="mt-4 p-4 bg-[#7A0F0F]/10 border-l-2 border-[#7A0F0F]">
              <p className="text-sm text-[#7A0F0F] font-medium">
                ⚠️ Error detected in production - review and reprint if needed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
