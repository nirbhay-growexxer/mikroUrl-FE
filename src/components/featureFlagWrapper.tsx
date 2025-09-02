import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { EnvType } from '@/types/common';

const FeatureFlagWrapper = ({
  children,
  flagName,
  fallback = null,
}: {
  children: React.ReactNode;
  flagName: string;
  fallback: React.ReactNode | null;
}) => {
  const currentEnv: EnvType =
    (import.meta.env.VITE_APP_ENV as EnvType) || EnvType.DEV; // 'dev', 'stage', or 'prod'
  const flags = useSelector((state: RootState) => state.featureFlags.flags);
  if (!flags) {
    return fallback;
  }
  const currentFlag = flags.findIndex((flag) => flag.name === flagName);
  if (currentFlag === -1) {
    return fallback;
  }
  const isEnabled = flags[currentFlag].enabledEnvs[currentEnv];

  if (!isEnabled) {
    return fallback;
  }
  return <>{children}</>;
};

export default FeatureFlagWrapper;
