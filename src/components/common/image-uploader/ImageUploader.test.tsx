import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ImageUploader from '@/components/common/image-uploader/ImageUploader';

jest.mock('@/service', () => ({
  isDev: jest.fn(),
  http: {
    post: jest.fn(),
  },
}));

describe('Image Uploader', () => {
  let container: Container;

  beforeEach(() => {
    const mockHandleNewImage = jest.fn(() => {});
    container = render(
      <ImageUploader
        images={[]}
        handleNewImage={mockHandleNewImage}
        validation={false}
      />,
      { wrapper: BrowserRouter }
    ).container;
  });

  it('should display image uploader', () => {
    expect(screen.getByText('Picture')).toBeInTheDocument();
    expect(container.querySelector('.new-image')).toBeInTheDocument();
  });
});
