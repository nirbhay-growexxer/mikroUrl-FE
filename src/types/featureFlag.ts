export interface FeatureFlag {
  _id: string;
  name: string;
  enabledEnvs: {
    dev: boolean;
    stage: boolean;
    prod: boolean;
  };
}
export interface GetFeatureFlagAPIResponse {
  status: string;
  message: string;
  data: FeatureFlag[];
}
