export interface FeatureFlag {
  _id: string;
  name: string;
  isEnabled: boolean;
}
export interface GetFeatureFlagAPIResponse {
  status: string;
  message: string;
  data: FeatureFlag[];
}
