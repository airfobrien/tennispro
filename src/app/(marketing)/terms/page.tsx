import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for TennisPro - Professional Tennis Coaching Platform',
};

export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: January 1, 2025</p>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
              <p className="mb-4 text-muted-foreground">
                By accessing or using TennisPro (&quot;the Service&quot;), you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">2. Description of Service</h2>
              <p className="mb-4 text-muted-foreground">
                TennisPro is a professional tennis coaching platform that provides AI-powered video
                analysis, student management tools, and coaching resources. The Service is designed
                for tennis coaches and their students.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">3. User Accounts</h2>
              <p className="mb-4 text-muted-foreground">
                To access certain features of the Service, you must create an account. You are
                responsible for maintaining the confidentiality of your account credentials and for
                all activities that occur under your account.
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You must be at least 18 years old to create a coach account</li>
                <li>You are responsible for all content uploaded under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">4. Subscription and Payments</h2>
              <p className="mb-4 text-muted-foreground">
                TennisPro offers various subscription tiers. By subscribing to a paid plan, you agree
                to pay the applicable fees. Subscriptions automatically renew unless cancelled before
                the renewal date.
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Prices are subject to change with 30 days&apos; notice</li>
                <li>Refunds are handled on a case-by-case basis</li>
                <li>You may cancel your subscription at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">5. User Content</h2>
              <p className="mb-4 text-muted-foreground">
                You retain ownership of all content you upload to the Service, including videos,
                images, and student information. By uploading content, you grant TennisPro a limited
                license to process, store, and display this content as necessary to provide the Service.
              </p>
              <p className="mb-4 text-muted-foreground">
                You are responsible for ensuring you have the necessary rights and permissions to
                upload any content, including obtaining consent from individuals appearing in videos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">6. Prohibited Conduct</h2>
              <p className="mb-4 text-muted-foreground">You agree not to:</p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Use the Service for any unlawful purpose</li>
                <li>Upload content that violates the rights of others</li>
                <li>Attempt to gain unauthorized access to the Service or its systems</li>
                <li>Interfere with the proper functioning of the Service</li>
                <li>Share your account credentials with others</li>
                <li>Use the Service to transmit malware or other harmful code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">7. Intellectual Property</h2>
              <p className="mb-4 text-muted-foreground">
                The Service and its original content, features, and functionality are owned by
                TennisPro and are protected by international copyright, trademark, and other
                intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">8. Disclaimer of Warranties</h2>
              <p className="mb-4 text-muted-foreground">
                The Service is provided &quot;as is&quot; without warranties of any kind. TennisPro does not
                warrant that the Service will be uninterrupted, secure, or error-free. The video
                analysis provided is for informational purposes only and should not replace
                professional coaching judgment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">9. Limitation of Liability</h2>
              <p className="mb-4 text-muted-foreground">
                To the maximum extent permitted by law, TennisPro shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your
                use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">10. Changes to Terms</h2>
              <p className="mb-4 text-muted-foreground">
                We may modify these Terms at any time. We will notify users of material changes via
                email or through the Service. Continued use of the Service after changes constitutes
                acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">11. Contact Us</h2>
              <p className="mb-4 text-muted-foreground">
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@tennispro.com" className="text-primary hover:underline">
                  legal@tennispro.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
