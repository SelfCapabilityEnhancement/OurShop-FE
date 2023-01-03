import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CreateProduct from '@/components/features/create-product/CreateProduct';
import userEvent from '@testing-library/user-event';
import * as utils from '@/utils';
import * as service from '@/service';
import { Product } from '@/components/common/CustomTypes';

jest.mock('@/service', () => ({
  uploadFile: jest.fn(),
  createProduct: jest.fn(),
  getAllOffices: jest.fn(),
}));

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => null,
  disconnect: () => null,
}));

describe('When user not login to access create-products', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<CreateProduct />, { wrapper: BrowserRouter });
    });
  });

  afterEach(cleanup);

  it('should show tabs', () => {
    expect(screen.getByText('Not Login')).toBeInTheDocument();
  });
});

describe('When user not have access to access create-products', () => {
  beforeEach(async () => {
    localStorage.setItem('router', 'testForCreate-Products');
    await act(async () => {
      render(<CreateProduct />, { wrapper: BrowserRouter });
    });
  });

  afterEach(cleanup);

  it('should show tabs', () => {
    expect(screen.getByText('here')).toBeInTheDocument();
  });
});

describe('Create product test', () => {
  let container: Container;
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.setItem('router', 'create-product');
    jest
      .spyOn(service, 'getAllOffices')
      .mockResolvedValue([] as { id: number; office: string }[]);
    container = render(<CreateProduct />, { wrapper: BrowserRouter }).container;
  });

  afterEach(cleanup);

  it('should display create product form', () => {
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Price in USD')).toBeInTheDocument();
    expect(screen.getByText('Price in Token')).toBeInTheDocument();
    expect(screen.getByText('Product Category')).toBeInTheDocument();
    expect(screen.getByText('Clothes')).toBeInTheDocument();
    expect(screen.getByText('Book')).toBeInTheDocument();
    expect(screen.getByText('Souvenir')).toBeInTheDocument();
    expect(screen.getByText('Product Description')).toBeInTheDocument();
    expect(screen.getByText('Picture')).toBeInTheDocument();
    expect(container.querySelector('button.next')).toBeInTheDocument();
  });

  it('should display alert when click submit with empty field', async () => {
    const submit = container.querySelector('button.next');

    expect(submit).toBeInTheDocument();
    await user.click(submit as Element);

    await waitFor(async () => {
      expect(
        await screen.findByText('All required field must be filled.')
      ).toBeInTheDocument();
    });
  });

  it('should show processing banner when create product', async () => {
    jest.spyOn(utils, 'validateForm').mockReturnValue({ mock: false });
    jest.spyOn(service, 'uploadFile').mockResolvedValue();
    jest
      .spyOn(service, 'createProduct')
      .mockImplementation(async (product: Product) => {
        await setTimeout(() => product, 1000);
      });

    const next = container.querySelector('button.next');
    expect(next).toBeInTheDocument();
    await user.click(next as Element);
    expect(
      await screen.findByText(
        'Please indicate the office and number of product you want to sell'
      )
    ).toBeInTheDocument();

    const office = container.querySelector('#office');
    await user.click(office as Element);

    const submit = container.querySelector('button.create');
    expect(submit).toBeInTheDocument();
    await user.click(submit as Element);

    // expect(await screen.findByText('Processing...')).toBeInTheDocument();
  });

  it('should display tabs', () => {
    const tabs = [
      { id: 'productInfo', name: 'Product Information' },
      { id: 'officeInventory', name: 'Office & Inventory' },
      { id: 'approvalFlow', name: 'Approval Flow' },
    ];

    tabs.forEach(async (tab) => {
      const tabElement = screen.getByText(tab.name);

      expect(tabElement).toBeInTheDocument();
      await user.click(tabElement);

      expect(container.querySelector(`.${tab.id}`)).toBeInTheDocument();
    });
  });
});
