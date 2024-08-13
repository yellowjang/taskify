import React from 'react';
import styles from './index.module.scss';
import instance from '@/services/axios';
import { useQuery } from '@tanstack/react-query';
import { ProfileIcon } from '@/components/ProfileIcon/ProfileIcon';

const fetchDashboardMembers = async (dashboardId: string) => {
  const response = await instance.get(
    `/members?page=1&size=5&dashboardId=${dashboardId}`,
  );
  return response.data;
};

export default function MemberList({
  dashboardId,
}: Omit<HeaderDashboardProps, 'userData'>) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['memberList', dashboardId],
    queryFn: () => fetchDashboardMembers(dashboardId),
    staleTime: 0, // Always consider the data stale
    refetchOnMount: true, // Always refetch data when the component mounts
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading members</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div
      className={`${styles['member-list']} ${
        styles[`count${data.totalCount}`]
      }`}
    >
      {data.members.map((member: IMember) => (
        <ProfileIcon
          key={member.id}
          nickname={member.nickname}
          imageUrl={member.profileImageUrl}
        />
      ))}
      {data.totalCount > 2 && (
        <ProfileIcon
          nickname={`+${data.totalCount - 2}`}
          imageUrl={null}
          compressRemain={true}
        />
      )}
    </div>
  );
}
