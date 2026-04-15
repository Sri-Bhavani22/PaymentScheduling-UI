import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SkeletonTable from '../SkeletonTable';

describe('SkeletonTable', () => {
  it('renders skeleton rows', () => {
    const { container } = render(<SkeletonTable rows={3} />);
    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    // 1 header + 3 rows = 4
    expect(skeletons.length).toBe(4);
  });
});