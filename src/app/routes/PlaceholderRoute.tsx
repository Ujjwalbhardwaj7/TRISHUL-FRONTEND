import { EmptyState, PageHeader } from '../../design-system/components';

export interface PlaceholderRouteProps { title: string; description: string; }

export function PlaceholderRoute({ title, description }: PlaceholderRouteProps) {
  return <><PageHeader title={title} description={description} eyebrow="Module" /><EmptyState title="Module pending" description="This route is ready for its owning feature branch. No backend data or feature behaviour has been added here." /></>;
}
