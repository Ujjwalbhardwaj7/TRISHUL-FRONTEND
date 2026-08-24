import { Link } from 'react-router-dom';
import { EmptyState, PageHeader } from '../../design-system/components';

export function NotFoundPage() { return <><PageHeader title="Page not found" description="This workspace route does not exist." /><EmptyState title="Route unavailable" description="Return to the command center to continue." action={<Link className="button button--primary" to="/command-center">Return to Command Center</Link>} /></>; }
