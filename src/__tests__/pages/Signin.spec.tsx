import React from 'react';
import Signin from '../../pages/Signin';
import { render } from '@testing-library/react';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { debug } = render(<Signin />);
    debug();
  })
})
