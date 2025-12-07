import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for TennisPro - How we use cookies and similar technologies',
};

export default function CookiesPage() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">Cookie Policy</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: January 1, 2025</p>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">What Are Cookies?</h2>
              <p className="mb-4 text-muted-foreground">
                Cookies are small text files that are stored on your device when you visit a website.
                They help websites remember your preferences and improve your browsing experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">How We Use Cookies</h2>
              <p className="mb-4 text-muted-foreground">
                TennisPro uses cookies and similar technologies to:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Keep you signed in to your account</li>
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our platform</li>
                <li>Improve our services based on usage patterns</li>
                <li>Ensure the security of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Types of Cookies We Use</h2>

              <div className="mb-6 rounded-lg border bg-muted/30 p-4">
                <h3 className="mb-2 text-lg font-medium">Essential Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Required for the platform to function. These cannot be disabled.
                </p>
                <ul className="mt-2 list-disc pl-6 text-sm text-muted-foreground">
                  <li>Authentication and session management</li>
                  <li>Security tokens and CSRF protection</li>
                  <li>Load balancing and performance</li>
                </ul>
              </div>

              <div className="mb-6 rounded-lg border bg-muted/30 p-4">
                <h3 className="mb-2 text-lg font-medium">Functional Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Help us remember your preferences and settings.
                </p>
                <ul className="mt-2 list-disc pl-6 text-sm text-muted-foreground">
                  <li>Theme preferences (Grand Slam theme selection)</li>
                  <li>Language and locale settings</li>
                  <li>Video player preferences</li>
                </ul>
              </div>

              <div className="mb-6 rounded-lg border bg-muted/30 p-4">
                <h3 className="mb-2 text-lg font-medium">Analytics Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Help us understand how you use the platform to improve it.
                </p>
                <ul className="mt-2 list-disc pl-6 text-sm text-muted-foreground">
                  <li>Page views and navigation patterns</li>
                  <li>Feature usage statistics</li>
                  <li>Performance metrics</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Third-Party Cookies</h2>
              <p className="mb-4 text-muted-foreground">
                We may use third-party services that set their own cookies:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>
                  <strong>Analytics providers</strong> - to understand usage patterns
                </li>
                <li>
                  <strong>Payment processors</strong> - for secure payment handling
                </li>
                <li>
                  <strong>Authentication providers</strong> - for social login features
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Managing Cookies</h2>
              <p className="mb-4 text-muted-foreground">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>View cookies stored on your device</li>
                <li>Delete all or specific cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all third-party cookies</li>
                <li>Clear all cookies when you close your browser</li>
              </ul>
              <p className="mb-4 text-muted-foreground">
                Note that disabling essential cookies may prevent you from using certain features of
                our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Local Storage</h2>
              <p className="mb-4 text-muted-foreground">
                In addition to cookies, we use browser local storage to save:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Your selected Grand Slam theme preference</li>
                <li>Draft content while composing messages</li>
                <li>Cached data for offline functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Updates to This Policy</h2>
              <p className="mb-4 text-muted-foreground">
                We may update this Cookie Policy from time to time. Any changes will be posted on
                this page with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
              <p className="mb-4 text-muted-foreground">
                If you have questions about our use of cookies, please contact us at{' '}
                <a href="mailto:privacy@tennispro.com" className="text-primary hover:underline">
                  privacy@tennispro.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
