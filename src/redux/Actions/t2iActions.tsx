import axios from 'axios';
import { AI_API, DEFAULT_NEGATIVE_PROMPT, headers } from './constants';

export const t2iActionTypes = {
  SET_PROMPT_T2I: 'SET_PROMPT_T2I',
  SET_SELECTED_STYLES_T2I: 'SET_SELECTED_STYLES_T2I',
  SET_LOADING_T2I: 'SET_LOADING_T2I',
  SET_RESULTS_T2I: 'SET_RESULTS_T2I',
  SET_ERROR_T2I: 'SET_ERROR_T2I',
};

export const setT2iPrompt = (prompt: string) => async (dispatch: any) => {
  dispatch({
    type: t2iActionTypes.SET_PROMPT_T2I,
    data: prompt,
  });
};

export const setSelectedStylesT2i =
  (style: { title: string; thumbnail: string; prompt: string }) =>
  async (dispatch: any) => {
    dispatch({
      type: t2iActionTypes.SET_SELECTED_STYLES_T2I,
      data: style,
    });
  };

export const genT2img = (caption: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: t2iActionTypes.SET_ERROR_T2I,
      data: false,
    });
    dispatch({
      type: t2iActionTypes.SET_RESULTS_T2I,
      data: [],
    });
    dispatch({
      type: t2iActionTypes.SET_LOADING_T2I,
      data: true,
    });
    const res = await axios.post(
      `${AI_API}/textToImage/v1/task_sync`,
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
        type: t2iActionTypes.SET_RESULTS_T2I,
        data: res.data.data,
      });
    } else {
      dispatch({
        type: t2iActionTypes.SET_ERROR_T2I,
        data: true,
      });
    }

    dispatch({
      type: t2iActionTypes.SET_LOADING_T2I,
      data: false,
    });
  } catch (e) {
    dispatch({
      type: t2iActionTypes.SET_ERROR_T2I,
      data: true,
    });
    dispatch({
      type: t2iActionTypes.SET_LOADING_T2I,
      data: false,
    });
  }
};
