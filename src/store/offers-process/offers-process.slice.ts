import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersProcess } from '../../types/state';
import { getNearbyOffersThunk, getOffersThunk, getOfferThunk } from '../extra/offers-actions';
import { Offer } from '../../types/offer';

const initialState: OffersProcess = {
  offers: [],
  activeOffer: null,
  nearbyOffers: [],

  isLoading: false
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveOffer: (state, action: PayloadAction<Offer | null>) => {
      state.activeOffer = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOffersThunk.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(getOfferThunk.fulfilled, (state, action) => {
        state.activeOffer = action.payload;
      })
      .addCase(getNearbyOffersThunk.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});

export const { setActiveOffer } = offersProcess.actions;
