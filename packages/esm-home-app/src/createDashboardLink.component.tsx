import React, { useMemo } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import LafiaHomeIcon from '../public/lafia-home-icon';
import styles from './createDashboardLink.scss';

export interface DashboardLinkConfig {
  name: string;
  title: string;
}

const DashboardLink = ({ dashboardLinkConfig }: { dashboardLinkConfig: DashboardLinkConfig }) => {
  const { t } = useTranslation();
  const { name } = dashboardLinkConfig;
  const location = useLocation();
  const spaBasePath = `${window.spaBase}/home`;

  const navLink = useMemo(() => {
    const pathArray = location.pathname.split('/');
    const lastElement = pathArray[pathArray.length - 1];
    return decodeURIComponent(lastElement);
  }, [location.pathname]);

  return (
    <ConfigurableLink
      to={spaBasePath}
      className={`cds--side-nav__link ${navLink === 'home' ? styles.activeLeftNavLink : ''}`}
    >
      <div className={navLink === 'home' ? styles.activeHomeIcon : styles.inactiveHomeIcon}><LafiaHomeIcon /></div>
      <span className={navLink === 'home' ? styles.activeTitle : styles.inactiveTitle}>{t(name)}</span>
    </ConfigurableLink>
  );
};

export const createDashboardLink = (dashboardLinkConfig: DashboardLinkConfig) => {
  return () => (
    <BrowserRouter>
      <DashboardLink dashboardLinkConfig={dashboardLinkConfig} />
    </BrowserRouter>
  );
};
