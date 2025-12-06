import { trackEvent, identifyUser, resetAnalytics, trackPageView } from '@/lib/analytics';

describe('Analytics utilities', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

  beforeEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe('trackEvent', () => {
    it('logs events in development mode', () => {
      trackEvent('video_uploaded', { video_id: '123' });

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics]',
        'video_uploaded',
        { video_id: '123' }
      );
    });

    it('handles events without properties', () => {
      trackEvent('user_logged_in');

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics]',
        'user_logged_in',
        undefined
      );
    });
  });

  describe('identifyUser', () => {
    it('logs user identification in development mode', () => {
      identifyUser('user-123', { name: 'Test User' });

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Identify:',
        'user-123',
        { name: 'Test User' }
      );
    });
  });

  describe('trackPageView', () => {
    it('logs page views in development mode', () => {
      trackPageView('/dashboard');

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Page view:',
        '/dashboard'
      );
    });

    it('uses current pathname when path not provided', () => {
      trackPageView();

      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('resetAnalytics', () => {
    it('does not throw when called', () => {
      expect(() => resetAnalytics()).not.toThrow();
    });
  });
});
