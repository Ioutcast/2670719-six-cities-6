import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PropertyNotLoggedPage from '../property-not-logged-page';

describe('PropertyNotLoggedPage', () => {
  it('should render correctly', () => {
    render(<PropertyNotLoggedPage />);
    expect(screen.getByText(/Beautiful &amp; luxurious studio at great location/i)).toBeInTheDocument();
  });

  it('should render premium badge', () => {
    render(<PropertyNotLoggedPage />);
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render property features', () => {
    render(<PropertyNotLoggedPage />);
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('3 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 4 adults')).toBeInTheDocument();
  });

  it('should render property amenities', () => {
    render(<PropertyNotLoggedPage />);
    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Washing machine')).toBeInTheDocument();
  });

  it('should render host information', () => {
    render(<PropertyNotLoggedPage />);
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('Angelina')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should render reviews section', () => {
    render(<PropertyNotLoggedPage />);
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});

