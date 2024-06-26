export const baseUrl = '/api/v1';

export const AI_AUTH = process.env.REACT_APP_API_AUTH;
export const AI_API = process.env.REACT_APP_AI_URL;
export const AI_E2E_API = process.env.REACT_APP_E2E_AI_URL;

export const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + AI_AUTH,
  platform: 'website',
  aiTouchPoint: 'aiportal',
};

export const DEFAULT_NEGATIVE_PROMPT =
  'bad anatomy, bad proportions, blurry, cloned face, cropped, deformed, dehydrated, disfigured, duplicate, error, extra arms, extra fingers, extra legs, extra limbs, fused fingers, gross proportions, jpeg artifacts, long neck, low quality, lowres, malformed limbs, missing arms, missing legs, morbid, mutated hands, mutation, mutilated, out of frame, poorly drawn face, poorly drawn hands, signature, text, too many fingers, ugly, username, watermark, worst quality';
