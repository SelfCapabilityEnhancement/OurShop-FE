import { render } from '@testing-library/react';
import { TextSubmission } from '@/components/common/TextSubmission/TextSubmission';
import { Container } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('TextSubmission', () => {
  let container: Container;
  beforeEach(() => {
    container = render(
      <TextSubmission
        value=""
        handleCancel={() => {}}
        handleEdit={() => {}}
        handleSave={() => {}}
      />,
      { wrapper: BrowserRouter }
    ).container;
  });
  test('should show textArea, save button and cancel button', () => {
    const confirm = container.querySelector('.confirm.button');
    const cancel = container.querySelector('.cancel.button');
    const addressInput = container.querySelector('.address-input');
    expect(confirm).toBeTruthy();
    expect(cancel).toBeTruthy();
    expect(addressInput).toBeTruthy();
  });
});
