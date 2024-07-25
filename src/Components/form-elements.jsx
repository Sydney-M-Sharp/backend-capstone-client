import React, { forwardRef } from 'react';

const Input = forwardRef(({ id, type, label }, ref) => (
  <div className="field">
    <label className="label" htmlFor={id}>{label}</label>
    <div className="control">
      <input
        className="input"
        id={id}
        type={type}
        ref={ref}
      />
    </div>
  </div>
));

export { Input };