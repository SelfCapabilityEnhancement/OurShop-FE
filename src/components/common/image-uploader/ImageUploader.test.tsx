import { render, screen } from '@testing-library/react';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ImageUploader from '@/components/common/image-uploader/ImageUploader';

describe('Image Uploader', () => {
  let container: Container;

  beforeEach(() => {
    container = render(
      <ImageUploader
        images={[]}
        handleNewImage={jest.fn}
        handleRemoveImage={jest.fn}
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
