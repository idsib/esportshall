import type { Metadata } from 'next';
import CommunityPage from './page';

interface Props {
  params: {
    id: string;
  };
}

export default async function CommunityPageServer({ params }: Props) {
  return <CommunityPage communityId={params.id} />;
} 