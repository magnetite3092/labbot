import React, { forwardRef } from 'react';

interface InputImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputImage = forwardRef<HTMLInputElement, InputImageProps>(
  ({ onChange, ...props }, ref) => {
    return (
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        ref={ref}
        style={{ display: 'none' }} // 非表示にする
        {...props}
      />
    );
  }
);

export default InputImage;





