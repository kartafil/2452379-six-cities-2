import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, ThunksExtraArgument } from '../../type';
import { generatePath } from 'react-router-dom';
import { ApiAction, ApiRoute } from '../../../const';
import { OfferId } from '../../../types/offer';
import { Review, ReviewData } from '../../../types/review';
import { AppDispatch } from '../../type';

export const getReviewsThunk =
  createAsyncThunk<
    Review[],
    OfferId,
    {
      dispatch: AppDispatch;
      state: State;
      extra: ThunksExtraArgument;
    }
  >(ApiAction.getReviews, async (offerId, { extra: { api } }) => {
    const { data } = await api.get<Review[]>(generatePath(ApiRoute.Reviews, { offerId }));
    return data;
  });

export const postReviewThunk =
  createAsyncThunk<
    Review,
    ReviewData,
    {
      dispatch: AppDispatch;
      state: State;
      extra: ThunksExtraArgument;
    }
  >(ApiAction.postReview, async ({offerId, review}, { extra: { api } }) => {
    const { data } = await api.post<Review>(generatePath(ApiRoute.Reviews, { offerId }), review);
    return data;
  });
