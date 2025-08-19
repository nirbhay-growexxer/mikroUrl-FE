import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFeatureFlags } from '../store/featureFlagSlice'; // adjust path as needed
import { api } from '@/lib/axios';
import { GetFeatureFlagAPIResponse } from '@/types/featureFlag';

const fetchFeatureFlags = async () => {
  const res = await api.get<GetFeatureFlagAPIResponse>('/flag?type=FE');
  console.log('Feature flags fetched:', res.data.data);
  return res.data.data;
};

const FeatureFlagsProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const updateFlags = async () => {
      const flags = await fetchFeatureFlags();
      if (isMounted) dispatch(setFeatureFlags({ flags }));
    };

    updateFlags();
    const interval = setInterval(updateFlags, 60000 * 2); // every 120s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default FeatureFlagsProvider;
