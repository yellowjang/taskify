import React, { useState } from 'react';
import styles from './index.module.scss';
import { IconCrown, IconSetting, IconAddBox } from '@/assets/icongroup';
import instance from '@/services/axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useInviteModalStore } from '@/stores/modalStore';
import MemberList from './MemberList';
import { useUserStore } from '@/store/useUserStore';
import InviteModal from '@/containers/myDashboard/InviteModal';
import ThemeSwitch from '@/components/ThemeSwitch';
import { useTheme } from '@/hooks/useThemeContext';
import DropdownProfile from '@/components/DropdownProfile';

const fetchDashboards = async (dashboardId: string) => {
  const response = await instance.get(`/dashboards/${dashboardId}`);
  return response.data;
};

export default function HeaderDashboard({ dashboardId }: HeaderDashboardProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const currentId = dashboardId || String(id);

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { isLoading, error, data } = useQuery({
    queryKey: ['dashboard', currentId],
    queryFn: () => fetchDashboards(currentId),
    enabled: currentId != 'undefined',
  });

  const { isModalOpen, setOpenModal } = useInviteModalStore();

  const handleManageClick = () => {
    router.push(`/dashboard/${currentId}/edit`);
  };

  if (!data) {
    return (
      <header className={`${styles['header-dashboard']} ${styles[theme]}`}>
        <div
          className={`${styles['header-dashboard-container']} ${styles['flex-end-force']}`}
        >
          {user && <DropdownProfile />}
          <ThemeSwitch />
        </div>
      </header>
    );
  }

  return (
    <header className={`${styles['header-dashboard']} ${styles[theme]}`}>
      <div className={`${styles['header-dashboard-container']}`}>
        <div className={`${styles['dashboard-title-container']}`}>
          <p className={`${styles[theme]}`}>{data.title}</p>
          {data.createdByMe && (
            <div className={`${styles['crown-size']}`}>
              <IconCrown
                style={{ width: '20px', height: '16px' }}
                aria-label={`owner icon`}
              />
            </div>
          )}
        </div>
        <div className={`${styles['dashboard-info-container']}`}>
          <div className={`${styles['dashboard-manage-button-area']}`}>
            {data.createdByMe && (
              <button
                className={`${styles['dashboard-manage-button']} ${styles[theme]}`}
                onClick={handleManageClick}
              >
                <div className={`${styles[theme]}`}>
                  <IconSetting
                    style={{ width: '20px', height: '20px' }}
                    aria-label={`setting icon`}
                  ></IconSetting>
                  관리
                </div>
              </button>
            )}
            <button
              className={`${styles['dashboard-manage-button']} ${styles[theme]}`}
              onClick={setOpenModal}
            >
              <div className={`${styles[theme]}`}>
                <IconAddBox
                  style={{ width: '20px', height: '20px' }}
                  aria-label={`add box icon`}
                ></IconAddBox>
                초대하기
              </div>
            </button>
          </div>
          <div className={`${styles['dashboard-member-area']}`}>
            <MemberList dashboardId={currentId} />
            <div className={`${styles['dashboard-half-line']}`}></div>
            {user && <DropdownProfile />}
            <ThemeSwitch />
          </div>
        </div>
      </div>
      {isModalOpen && <InviteModal id={currentId} />}
    </header>
  );
}
