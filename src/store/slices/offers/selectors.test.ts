import { describe, expect } from 'vitest';
import { FetchStatus, NameSpace } from '../../../const';
import { OffersSlice } from './type';
import { getActiveOffer, getActiveOfferId, getActiveOfferLocation, getFavoriteOffers, getOffers, getOffersNearby, getOffersStateFetchStatusOf, isOfferFavorite } from './offers.selectors';
import { createFakeOffers } from '../../../utils/mocks';

describe('Offers Slice selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      activeOffer: null,
      offers: createFakeOffers(3),
      nearbyOffers: createFakeOffers(3),
      favoriteOffers: createFakeOffers(3),
      offersFetchStatus: FetchStatus.Idle,
      favoriteOffersFetchStatus: FetchStatus.Idle,
    } as OffersSlice
  };

  it('should return offers', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffers(state);
    expect(result).toBe(offers);
  });

  it('should return active offer', () => {
    const { activeOffer } = state[NameSpace.Offers];
    const result = getActiveOffer(state);
    expect(result).toBe(activeOffer);
  });

  it('should return active offer id', () => {
    const { activeOffer } = state[NameSpace.Offers];
    const result = getActiveOfferId(state);
    expect(result).toBe(activeOffer?.id);
  });

  it('should return active offer location', () => {
    const { activeOffer } = state[NameSpace.Offers];
    const result = getActiveOfferLocation(state);
    expect(result).toBe(activeOffer?.location);
  });

  it('should return nearby offers', () => {
    const { nearbyOffers } = state[NameSpace.Offers];
    const result = getOffersNearby(state);
    expect(result).toBe(nearbyOffers);
  });

  it('should return favorite offers', () => {
    const { favoriteOffers } = state[NameSpace.Offers];
    const result = getFavoriteOffers(state);
    expect(result).toBe(favoriteOffers);
  });

  it('should return offers fetch status', () => {
    const { offersFetchStatus, offers: offers } = state[NameSpace.Offers];
    const result = getOffersStateFetchStatusOf('offers')(state);
    expect(result).toStrictEqual({
      isLoading: offersFetchStatus === FetchStatus.Idle || offersFetchStatus === FetchStatus.Pending,
      isRejected: offersFetchStatus === FetchStatus.Rejected,
      isEmpty: offersFetchStatus === FetchStatus.Fullfilled && offers.length === 0
    });
  });

  it('should return offer is favorite', () => {
    const { id } = state[NameSpace.Offers].offers[0];
    const favoriteOffers = state[NameSpace.Offers].favoriteOffers;
    const result = isOfferFavorite(id)(state);
    expect(result).toBe(!!favoriteOffers.find(({ id: favId }) => favId === id));
  });
});
