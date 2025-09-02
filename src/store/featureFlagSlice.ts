import { FeatureFlag } from '@/types/featureFlag';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeatureFlagsState {
  flags: FeatureFlag[];
}

const initialState: FeatureFlagsState = { flags: [] };

const featureFlagSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    setFeatureFlags(state, action: PayloadAction<FeatureFlagsState>) {
      state.flags = action.payload.flags;
    },
  },
});

export const { setFeatureFlags } = featureFlagSlice.actions;
export default featureFlagSlice.reducer;
