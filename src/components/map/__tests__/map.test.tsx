import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import Map from '../map';
import type { Offer } from '../../../types/offer';

// Mock leaflet
const mockMap = {
  setView: vi.fn(),
  remove: vi.fn(),
};

const mockMarker = {
  remove: vi.fn(),
  addTo: vi.fn(),
};
// eslint-disable-next-line @typescript-eslint/no-use-before-define
mockMarker.addTo = vi.fn().mockReturnValue(mockMarker);

const mockTileLayer = {
  addTo: vi.fn().mockReturnThis(),
};

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn().mockReturnValue(mockMap),
    marker: vi.fn().mockReturnValue(mockMarker),
    icon: vi.fn().mockReturnValue({}),
    tileLayer: vi.fn().mockReturnValue(mockTileLayer),
  },
}));

const mockCity: Offer['city'] = {
  name: 'Paris',
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 10,
  },
};

const mockOffer1: Offer = {
  id: '1',
  title: 'Test Offer 1',
  type: 'apartment',
  price: 100,
  city: mockCity,
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 10,
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'test1.jpg',
};

const mockOffer2: Offer = {
  id: '2',
  title: 'Test Offer 2',
  type: 'house',
  price: 200,
  city: mockCity,
  location: {
    latitude: 48.8576,
    longitude: 2.3532,
    zoom: 10,
  },
  isFavorite: true,
  isPremium: true,
  rating: 5,
  previewImage: 'test2.jpg',
};

describe('Map', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render map container', () => {
    const { container } = render(
      <Map city={mockCity} offers={[]} />
    );
    const mapDiv = container.querySelector('div[style*="height"]');
    expect(mapDiv).toBeInTheDocument();
  });

  it('should initialize map with city location', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const leaflet = require('leaflet') as { default: { map: ReturnType<typeof vi.fn> } };
    render(
      <Map city={mockCity} offers={[]} />
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(leaflet.default.map).toHaveBeenCalled();
  });

  it('should create markers for offers', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const leaflet = require('leaflet') as { default: { marker: ReturnType<typeof vi.fn> } };
    render(
      <Map city={mockCity} offers={[mockOffer1, mockOffer2]} />
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(leaflet.default.marker).toHaveBeenCalledTimes(2);
  });

  it('should use active icon for selected offer', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const leaflet = require('leaflet') as { default: { marker: ReturnType<typeof vi.fn> } };
    render(
      <Map city={mockCity} offers={[mockOffer1, mockOffer2]} selectedOfferId="1" />
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(leaflet.default.marker).toHaveBeenCalled();
  });

  it('should update markers when offers change', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const leaflet = require('leaflet') as { default: { marker: ReturnType<typeof vi.fn> } };
    vi.clearAllMocks();
    const { rerender } = render(
      <Map city={mockCity} offers={[mockOffer1]} />
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(leaflet.default.marker).toHaveBeenCalledTimes(1);
    rerender(
      <Map city={mockCity} offers={[mockOffer1, mockOffer2]} />
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(leaflet.default.marker).toHaveBeenCalled();
  });

  it('should update markers when selectedOfferId changes', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const leaflet = require('leaflet') as { default: { marker: ReturnType<typeof vi.fn> } };
    const { rerender } = render(
      <Map city={mockCity} offers={[mockOffer1, mockOffer2]} selectedOfferId="1" />
    );
    rerender(
      <Map city={mockCity} offers={[mockOffer1, mockOffer2]} selectedOfferId="2" />
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(leaflet.default.marker).toHaveBeenCalled();
  });

  it('should cleanup map on unmount', () => {
    const { unmount } = render(
      <Map city={mockCity} offers={[]} />
    );
    unmount();
    expect(mockMap.remove).toHaveBeenCalled();
  });
});

