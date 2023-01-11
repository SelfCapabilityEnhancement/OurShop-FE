import { useLoginStore } from '@/hooks/useLoginStore';

describe('useLoginStore test', () => {
  it('should clear store when call clear method', () => {
    useLoginStore.setState({ jwt: 'jwt1', accessiblePaths: ['path1'] });
    expect(useLoginStore.getState().jwt).toBe('jwt1');
    expect(useLoginStore.getState().accessiblePaths).toHaveLength(1);
    expect(useLoginStore.getState().accessiblePaths[0]).toBe('path1');
    useLoginStore.getState().clear();
    expect(useLoginStore.getState().jwt).toBe('');
    expect(useLoginStore.getState().accessiblePaths).toHaveLength(0);
  });
});
