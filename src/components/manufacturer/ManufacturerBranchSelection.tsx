import { useState } from 'react';
import { useApp } from '../../App';
import { Factory, Printer, Scissors } from 'lucide-react';
import Logo from '../../imports/Logo';

type ManufacturerBranch = 'garment-factory' | 'print-on-factory' | 'tailor';

export function ManufacturerBranchSelection() {
  const { navigate, user, setUser } = useApp();
  const [hoveredBranch, setHoveredBranch] = useState<ManufacturerBranch | null>(null);

  const branches = [
    {
      id: 'garment-factory' as ManufacturerBranch,
      icon: Factory,
      title: 'Garment Factory',
      description: 'Full production capability',
      subtitle: 'Cut, sew, and assemble complete garments',
    },
    {
      id: 'print-on-factory' as ManufacturerBranch,
      icon: Printer,
      title: 'Print-on-Factory',
      description: 'Printing services only',
      subtitle: 'DTG, screen print, embroidery, heat press',
    },
    {
      id: 'tailor' as ManufacturerBranch,
      icon: Scissors,
      title: 'Tailor',
      description: 'Small-scale custom production',
      subtitle: 'Custom fitting and artisanal craftsmanship',
    },
  ];

  const handleBranchSelect = (branch: ManufacturerBranch) => {
    // Update user with manufacturer branch
    if (user) {
      setUser({
        ...user,
        manufacturerBranch: branch,
      });
    }
    
    // Navigate to appropriate dashboard
    navigate(`${branch}-dashboard`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 mx-auto mb-8 text-[#0B0D10]">
            <Logo showText={false} />
          </div>
          <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
            Select Your Branch
          </h1>
          <p className="text-lg text-[#9CA3AF]">
            Choose the manufacturing service you provide
          </p>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch) => {
            const Icon = branch.icon;
            const isHovered = hoveredBranch === branch.id;

            return (
              <button
                key={branch.id}
                onClick={() => handleBranchSelect(branch.id)}
                onMouseEnter={() => setHoveredBranch(branch.id)}
                onMouseLeave={() => setHoveredBranch(null)}
                className={`
                  border-2 p-12 text-center transition-all duration-300
                  ${isHovered 
                    ? 'border-[#0B0D10] scale-[1.02] shadow-lg' 
                    : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
                  }
                `}
              >
                <Icon 
                  className={`w-16 h-16 mx-auto mb-6 transition-colors ${
                    isHovered ? 'text-[#0B0D10]' : 'text-[#9CA3AF]'
                  }`} 
                />
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-3">
                  {branch.title}
                </h2>
                <p className="text-sm font-medium text-[#0B0D10] mb-2">
                  {branch.description}
                </p>
                <p className="text-sm text-[#9CA3AF]">
                  {branch.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[#9CA3AF]">
            This choice defines your capabilities and the types of orders you'll receive
          </p>
        </div>
      </div>
    </div>
  );
}
