'use client';
import { useState } from 'react';
import clsx from 'clsx';

/** Floating-label field. The label lifts on focus or when there's a value. */
export default function Field({ as = 'input', id, label, error, ...rest }) {
  const [filled, setFilled] = useState(false);
  const Tag = as;
  return (
    <div className={clsx('field', filled && 'filled')}>
      <Tag id={id} name={id} placeholder=" "
        aria-invalid={error || undefined}
        onChange={e => setFilled(!!e.target.value)}
        onBlur={e => setFilled(!!e.target.value)}
        style={error ? { borderBottomColor: 'var(--pulse)' } : undefined}
        {...rest} />
      <label htmlFor={id}>{label}</label>
      <span className="bar" />
    </div>
  );
}
