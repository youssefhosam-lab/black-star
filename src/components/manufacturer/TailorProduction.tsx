import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, CheckSquare, Square, Upload } from 'lucide-react';
import Logo from '../../imports/Logo';

interface ProductionTask {
  id: string;
  name: string;
  completed: boolean;
  notes?: string;
}

export function TailorProduction() {
  const { navigate, user } = useApp();
  
  const orderInfo = {
    orderId: 'TLR-2024-0156',
    client: 'Marcus Johnson',
    garment: 'Custom Suit',
    fitNotes: 'Slim fit, narrow lapels, double-breasted',
    deadline: '2024-12-30',
  };

  const [tasks, setTasks] = useState<ProductionTask[]>([
    { id: '1', name: 'Initial measurements taken', completed: true, notes: 'Chest: 38", Waist: 32", Sleeve: 25"' },
    { id: '2', name: 'Fabric selected and ordered', completed: true },
    { id: '3', name: 'Pattern drafted', completed: true },
    { id: '4', name: 'First fitting completed', completed: true, notes: 'Minor adjustments to shoulder width needed' },
    { id: '5', name: 'Jacket construction', completed: false },
    { id: '6', name: 'Trousers construction', completed: false },
    { id: '7', name: 'Second fitting scheduled', completed: false },
    { id: '8', name: 'Final adjustments', completed: false },
    { id: '9', name: 'Final pressing and packaging', completed: false },
  ]);

  const [generalNotes, setGeneralNotes] = useState('');
  const [referenceImages, setReferenceImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400',
    'https://images.unsplash.com/photo-1593030668808-7c1e6d60a2e1?w=400',
  ]);

  const toggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

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
                onClick={() => navigate(`tailor-${item.toLowerCase()}`)}
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
          onClick={() => navigate('tailor-orders')}
          className="mb-8 text-sm text-[#9CA3AF] hover:text-[#0B0D10] transition-colors"
        >
          ← Back to Orders
        </button>

        {/* Order Info */}
        <div className="border border-[#E5E7EB] p-8 mb-12">
          <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
            Custom Production Tracker
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-[#9CA3AF] mb-1">Order ID</p>
              <p className="text-[#0B0D10] font-medium">{orderInfo.orderId}</p>
            </div>
            <div>
              <p className="text-[#9CA3AF] mb-1">Client</p>
              <p className="text-[#0B0D10] font-medium">{orderInfo.client}</p>
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
          <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
            <p className="text-sm text-[#9CA3AF] mb-2">Fit Notes</p>
            <p className="text-[#0B0D10] italic">{orderInfo.fitNotes}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Production Checklist */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
              Production Checklist
            </h2>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`border p-4 transition-colors ${
                    task.completed ? 'border-[#E6C36A] bg-[#E6C36A]/5' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="mt-0.5 flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-[#E6C36A]" />
                      ) : (
                        <Square className="w-5 h-5 text-[#9CA3AF]" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          task.completed ? 'text-[#9CA3AF] line-through' : 'text-[#0B0D10]'
                        }`}
                      >
                        {task.name}
                      </p>
                      {task.notes && (
                        <p className="text-sm text-[#9CA3AF] mt-2">{task.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 px-6 py-3 border border-[#E5E7EB] text-[#0B0D10] hover:border-[#0B0D10] transition-colors w-full">
              + Add Custom Task
            </button>
          </div>

          {/* Notes & References */}
          <div className="lg:col-span-1">
            <div className="border border-[#E5E7EB] p-6 sticky top-24">
              <h2 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                Notes & References
              </h2>

              {/* Progress */}
              <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                <p className="text-sm text-[#9CA3AF] mb-3">Overall Progress</p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#E6C36A] h-full transition-all duration-500"
                      style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-[#0B0D10]">
                    {Math.round((completedTasks / totalTasks) * 100)}%
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF]">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>

              {/* General Notes */}
              <div className="mb-6">
                <label className="block text-sm text-[#9CA3AF] mb-2">General Notes</label>
                <textarea
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] placeholder-[#9CA3AF] focus:border-[#0B0D10] focus:outline-none resize-none text-sm"
                  placeholder="Add notes about measurements, fabric choices, client preferences, fitting adjustments..."
                />
              </div>

              <button className="w-full px-4 py-3 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity mb-6">
                Save Notes
              </button>

              {/* Reference Images */}
              <div>
                <label className="block text-sm text-[#9CA3AF] mb-3">Reference Images</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {referenceImages.map((img, index) => (
                    <div key={index} className="aspect-square overflow-hidden border border-[#E5E7EB]">
                      <img src={img} alt={`Reference ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <button className="w-full border border-dashed border-[#E5E7EB] p-4 hover:border-[#0B0D10] transition-colors flex flex-col items-center gap-2">
                  <Upload className="w-5 h-5 text-[#9CA3AF]" />
                  <span className="text-xs text-[#9CA3AF]">Upload Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Measurements Table */}
        <div className="mt-12 border border-[#E5E7EB] p-8">
          <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
            Client Measurements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {[
              { label: 'Chest', value: '38"' },
              { label: 'Waist', value: '32"' },
              { label: 'Sleeve Length', value: '25"' },
              { label: 'Shoulder Width', value: '18"' },
              { label: 'Back Length', value: '30"' },
              { label: 'Inseam', value: '32"' },
              { label: 'Neck', value: '15.5"' },
              { label: 'Hip', value: '38"' },
            ].map((measurement) => (
              <div key={measurement.label}>
                <p className="text-[#9CA3AF] mb-1">{measurement.label}</p>
                <p className="text-[#0B0D10] font-medium text-lg">{measurement.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
