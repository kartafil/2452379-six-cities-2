import Map from '../map/map';
import CitiesEmpty from './cities-empty/cities-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Places from './places/places';
import { getSortedCityOffers } from '../../store/slices/app/app.selectors';
import { setActiveOffer } from '../../store/slices/offers/offers.slice';
import { Offer } from '../../types/offer';
import { useCallback } from 'react';

export default function Cities(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortedCityOffers = useAppSelector(getSortedCityOffers);

  const isEmpty = sortedCityOffers.length === 0;

  const handleActivePlaceChange = useCallback((activeOffer: Offer | null) => dispatch(setActiveOffer(activeOffer)), [dispatch]);

  return (
    <div className="cities" data-testid="Cities">
      {
        isEmpty
          ? <CitiesEmpty />
          : (
            <div className="cities__places-container container" data-testid="CitiesPlacesContainer">
              <Places offers={sortedCityOffers} onActivePlaceChange={handleActivePlaceChange} />
              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  offers={sortedCityOffers}
                  anchor={sortedCityOffers[0].city.location}
                  mapOptions={{ zoomControl: false }}
                />
              </div>
            </div>
          )
      }
    </div>
  );
}
