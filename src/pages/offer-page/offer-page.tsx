import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import Offer from '../../components/offer/offer';
import { useEffect } from 'react';
import PlacesList from '../../components/places-list/places-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNearbyOffersThunk, getOfferThunk, getReviewsThunk } from '../../store/extra/offers-actions';
import { getActiveOffer, getNearbyOffers } from '../../store/offers-process/offers-process.selectors';
import { getReviews } from '../../store/reviews-process/reviews-process.selectors';
import { isOfferFull } from '../../types/offer';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getActiveOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const offerId = useParams().id;

  useEffect(() => {
    if (offerId) {
      dispatch(getOfferThunk(offerId));
      dispatch(getNearbyOffersThunk(offerId));
      dispatch(getReviewsThunk(offerId));
    }
  }, [offerId, dispatch]);

  return (
    <Layout>
      <main className="page__main page__main--offer">
        {isOfferFull(offer) && <Offer offer={offer} nearOffers={nearbyOffers} reviews={reviews} />}
        <div className="container">
          {nearbyOffers && <PlacesList offers={nearbyOffers} displayType='offer' />}
        </div>
      </main>
    </Layout>
  );
}

export default OfferPage;
