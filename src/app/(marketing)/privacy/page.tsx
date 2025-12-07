import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for TennisPro - How we collect, use, and protect your data',
};

export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: January 1, 2025</p>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
              <p className="mb-4 text-muted-foreground">
                TennisPro (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you use our tennis coaching platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">2. Information We Collect</h2>

              <h3 className="mb-3 text-xl font-medium">Personal Information</h3>
              <p className="mb-4 text-muted-foreground">
                We collect information you provide directly to us, including:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Payment information (processed securely by our payment provider)</li>
                <li>Profile information and preferences</li>
                <li>Communications you send to us</li>
              </ul>

              <h3 className="mb-3 text-xl font-medium">Student Information</h3>
              <p className="mb-4 text-muted-foreground">
                Coaches may upload information about their students, including:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Student names and contact information</li>
                <li>Training videos and images</li>
                <li>Performance data and progress notes</li>
                <li>Lesson history and scheduling information</li>
              </ul>

              <h3 className="mb-3 text-xl font-medium">Automatically Collected Information</h3>
              <p className="mb-4 text-muted-foreground">
                When you use our Service, we automatically collect:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Device information (browser type, operating system)</li>
                <li>Log data (IP address, access times, pages viewed)</li>
                <li>Usage information (features used, interactions)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Information</h2>
              <p className="mb-4 text-muted-foreground">We use the information we collect to:</p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process video analysis using AI/ML technology</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Process payments and prevent fraud</li>
                <li>Analyze usage patterns to improve the platform</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">4. Video and Image Processing</h2>
              <p className="mb-4 text-muted-foreground">
                When you upload videos for analysis, we process them using AI-powered pose estimation
                technology. This involves:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Extracting skeletal/pose data from video frames</li>
                <li>Analyzing movement patterns and biomechanics</li>
                <li>Generating performance metrics and recommendations</li>
              </ul>
              <p className="mb-4 text-muted-foreground">
                Video data is stored securely and is only accessible to you and authorized users
                (such as students you&apos;ve shared access with). We do not use your videos to train
                AI models without your explicit consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">5. Information Sharing</h2>
              <p className="mb-4 text-muted-foreground">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Service providers who assist in operating our platform</li>
                <li>Payment processors for transaction handling</li>
                <li>Cloud storage providers for secure data storage</li>
                <li>Analytics providers to help us understand usage</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">6. Data Security</h2>
              <p className="mb-4 text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your
                information, including:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">7. Data Retention</h2>
              <p className="mb-4 text-muted-foreground">
                We retain your information for as long as your account is active or as needed to
                provide you services. You can request deletion of your account and associated data
                at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">8. Your Rights</h2>
              <p className="mb-4 text-muted-foreground">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="mb-4 list-disc pl-6 text-muted-foreground">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your information</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="mb-4 text-muted-foreground">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@tennispro.com" className="text-primary hover:underline">
                  privacy@tennispro.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">9. Children&apos;s Privacy</h2>
              <p className="mb-4 text-muted-foreground">
                Our Service is not directed to children under 13. Coaches who work with minors are
                responsible for obtaining appropriate parental consent before uploading videos or
                information about minor students.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">10. International Data Transfers</h2>
              <p className="mb-4 text-muted-foreground">
                Your information may be transferred to and processed in countries other than your
                own. We ensure appropriate safeguards are in place for such transfers in compliance
                with applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">11. Changes to This Policy</h2>
              <p className="mb-4 text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of material
                changes by email or through a notice on our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">12. Contact Us</h2>
              <p className="mb-4 text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-4 text-muted-foreground">
                Email:{' '}
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
