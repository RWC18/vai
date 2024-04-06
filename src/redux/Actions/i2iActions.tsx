import axios from 'axios';
import { DEFAULT_NEGATIVE_PROMPT, baseUrl, headers } from './constants';

export const i2iActionTypes = {
  SET_PROMPT_I2I: 'SET_PROMPT_I2I',
  SET_UPLOADED_IMAGE_I2I: 'SET_UPLOADED_IMAGE_I2I',
  SET_SELECTED_STYLES_I2I: 'SET_SELECTED_STYLES_I2I',
  SET_LOADING_I2I: 'SET_LOADING_I2I',
  SET_RESULTS_I2I: 'SET_RESULTS_I2I',
  SET_ERROR_I2I: 'SET_ERROR_I2I',
};

export const uploaderI2I =
  (data: FormData, type: string) => async (dispatch: any) => {
    try {
      const res = await axios.post(`${baseUrl}/genai/media/`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      dispatch({
        type: i2iActionTypes.SET_UPLOADED_IMAGE_I2I,
        data: res.data.url,
      });
    } catch (e) {
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

export const genI2img = (caption: string) => async (dispatch: any) => {
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
      `${baseUrl}/genai/t2i`,
      {
        caption: caption,
        negative_prompt: DEFAULT_NEGATIVE_PROMPT,
        size: '1024x1024',
        model_version: 'PHOTOREALISTIC13',
        count: 4,
        sampling_method: 'Euler A',
        sampling_steps: 30,
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
