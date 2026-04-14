import { useApp } from '../../App';
import { ManufacturerBranchSelection } from '../manufacturer/ManufacturerBranchSelection';

export function ManufacturerDashboard() {
  const { user } = useApp();
  
  // If user already has a manufacturer branch selected, redirect to their dashboard
  if (user?.manufacturerBranch === 'garment-factory') {
    return <div>Redirecting to Garment Factory...</div>;
  }
  if (user?.manufacturerBranch === 'print-on-factory') {
    return <div>Redirecting to Print-on-Factory...</div>;
  }
  if (user?.manufacturerBranch === 'tailor') {
    return <div>Redirecting to Tailor...</div>;
  }
  
  // If no branch selected, show branch selection
  return <ManufacturerBranchSelection />;
}
