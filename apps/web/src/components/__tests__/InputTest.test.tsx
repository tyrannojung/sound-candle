import { render, screen, fireEvent } from '@testing-library/react';
import InputTest from '@/components/InputTest';

describe('<InputTest />', () => {
  it('renders input and submit button', () => {
    render(<InputTest />);

    // ID를 사용하여 입력 필드와 버튼이 있는지 확인
    const inputElement = screen.getByTestId('number-input');
    const buttonElement = screen.getByTestId('submit-button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('displays formatted number on submit', () => {
    render(<InputTest />);

    // ID를 사용하여 요소 선택
    const inputElement = screen.getByTestId('number-input');
    const buttonElement = screen.getByTestId('submit-button');

    // 숫자 입력
    fireEvent.change(inputElement, { target: { value: '1234' } });
    // 제출 버튼 클릭
    fireEvent.click(buttonElement);

    // ID를 사용하여 포맷된 값 확인
    const formattedValue = screen.getByTestId('formatted-value');
    expect(formattedValue).toHaveTextContent('Value : 1,234');
  });
});
