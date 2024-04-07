import axios from 'axios';
import { DEFAULT_NEGATIVE_PROMPT, headers, AI_API } from './constants';

export const i2iActionTypes = {
  SET_PROMPT_I2I: 'SET_PROMPT_I2I',
  SET_UPLOADED_IMAGE_I2I: 'SET_UPLOADED_IMAGE_I2I',
  SET_SELECTED_STYLES_I2I: 'SET_SELECTED_STYLES_I2I',
  SET_LOADING_I2I: 'SET_LOADING_I2I',
  SET_RESULTS_I2I: 'SET_RESULTS_I2I',
  SET_ERROR_I2I: 'SET_ERROR_I2I',
};

export const uploaderI2I = (data: FormData) => async (dispatch: any) => {
  try {
    const res = await axios.post(
      `${AI_API}/photos/${parseInt((Math.random() * 999999999999) as any)}`,
      data,
      {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );
    debugger;
    dispatch({
      type: i2iActionTypes.SET_UPLOADED_IMAGE_I2I,
      data: res.data.data.url,
    });
  } catch (e) {
    debugger;
    dispatch({
      type: i2iActionTypes.SET_UPLOADED_IMAGE_I2I,
      data: null,
    });
  }
};

export const setI2iPrompt = (prompt: string) => async (dispatch: any) => {
  dispatch({
    type: i2iActionTypes.SET_PROMPT_I2I,
    data: prompt,
  });
};

export const setSelectedStylesI2i =
  (style: { title: string; thumbnail: string; prompt: string }) =>
  async (dispatch: any) => {
    dispatch({
      type: i2iActionTypes.SET_SELECTED_STYLES_I2I,
      data: style,
    });
  };

export const genI2img = (caption: string, url: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: i2iActionTypes.SET_ERROR_I2I,
      data: false,
    });
    dispatch({
      type: i2iActionTypes.SET_RESULTS_I2I,
      data: [],
    });
    dispatch({
      type: i2iActionTypes.SET_LOADING_I2I,
      data: true,
    });
    const res = await axios.post(
      `${AI_API}/image-to-image/v1/task`,
      {
        caption: caption,
        image_url: url,
        negative_prompt: DEFAULT_NEGATIVE_PROMPT,
        strength: 0.7,
        guidance_scale: 7.5,
        output_shape: '1024x1024',
        sampling_method: 'Euler A',
        resize_mode: 'Just resize',
        count: 4,
        model_version: 'PHOTOREALISTIC',
        num_inference_steps: 100,
      },
      {
        headers,
      }
    );

    if (res.data.status === 'DONE') {
      dispatch({
        type: i2iActionTypes.SET_RESULTS_I2I,
        data: res.data.data,
      });
    } else {
      dispatch({
        type: i2iActionTypes.SET_ERROR_I2I,
        data: true,
      });
    }

    dispatch({
      type: i2iActionTypes.SET_LOADING_I2I,
      data: false,
    });
  } catch (e) {
    dispatch({
      type: i2iActionTypes.SET_ERROR_I2I,
      data: true,
    });
    dispatch({
      type: i2iActionTypes.SET_LOADING_I2I,
      data: false,
    });
  }
};
