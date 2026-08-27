import React from 'react';
import { motion } from 'motion/react';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-32 px-6 text-brand-primary">
      <motion.article 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        {/* Document Header */}
        <header className="mb-14 pb-8 border-b border-black/10">
          <p className="text-xs font-semibold tracking-[0.25em] text-brand-primary/50 uppercase mb-3">
            HERMEN Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-brand-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-brand-primary/50">
            Effective Date: August 2026
          </p>
        </header>

        {/* Document Body */}
        <div className="space-y-12 text-sm leading-relaxed text-brand-primary/80">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              1. Overview & Commitment
            </h2>
            <p>
              HERMEN Corp. (&quot;HERMEN&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) values your privacy and is committed to protecting your personal information.
            </p>
            <p>
              This Privacy Policy explains how HERMEN collects, uses, stores, and protects personal information when you visit <a href="https://www.hermen.co.kr" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-brand-primary font-mono text-xs">www.hermen.co.kr</a>, submit an inquiry, communicate with our B2B wholesale team, use our skin consultation services, or otherwise communicate with HERMEN regarding our products and business opportunities.
            </p>
            <p>
              HERMEN primarily operates this website as a B2B business and product information platform for international customers and business partners. The website does not provide online account registration, online ordering, or online payment services.
            </p>
            <p>
              HERMEN processes personal information in accordance with applicable privacy and data protection laws.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              2. Information We Collect
            </h2>
            <p>
              We may collect the following categories of information depending on how you interact with our website and services.
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-brand-primary">
                2.1 Information Provided by You
              </h3>
              <p>
                When you contact HERMEN through an inquiry form, AI skin consultation, email, or other communication channels, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
                <li>Name</li>
                <li>Company or brand name</li>
                <li>Business email address</li>
                <li>Telephone number</li>
                <li>Country or region</li>
                <li>Business type or company information</li>
                <li>Product interests</li>
                <li>Wholesale/B2B inquiry details</li>
                <li>Order or purchasing requirements</li>
                <li>Skin type and primary skin concerns, where voluntarily submitted through a skin consultation service</li>
                <li>Consultation messages</li>
                <li>Sample-related inquiries</li>
                <li>Partnership or distribution proposals</li>
                <li>Other information voluntarily provided by you</li>
              </ul>
              <p className="pt-2 text-brand-primary/70">
                HERMEN does not currently request business registration certificates or other business verification documents through the website inquiry form.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-semibold text-brand-primary">
                2.2 Automatically Collected Information
              </h3>
              <p>
                When you visit our website, certain technical information may be automatically collected, depending on the website&apos;s technical configuration and services used by HERMEN.
              </p>
              <p>This may include:</p>
              <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
                <li>IP address</li>
                <li>Device type</li>
                <li>Browser type and configuration</li>
                <li>Operating system</li>
                <li>Access date and time</li>
                <li>Pages visited</li>
                <li>Session duration</li>
                <li>Referral sources</li>
                <li>General website usage patterns</li>
                <li>Cookies and similar technologies</li>
              </ul>
              <p className="pt-2 text-brand-primary/70">
                The actual information collected may vary depending on the analytics, hosting, security, and other technical services implemented on the website.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              3. Purpose of Data Processing
            </h2>
            <p>
              HERMEN processes personal information only for purposes reasonably related to its business activities and the services requested by users.
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-brand-primary">
                3.1 Personalized Skin Guidance
              </h3>
              <p>
                Where HERMEN provides an AI-based or other skin consultation service, information voluntarily submitted by users may be used to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
                <li>Analyze the user&apos;s stated skin profile or concerns</li>
                <li>Provide personalized skincare guidance</li>
                <li>Recommend potentially relevant HERMEN products</li>
                <li>Improve the quality and relevance of the consultation experience</li>
              </ul>
              <p className="pt-2 text-brand-primary/70">
                Any skin-related information submitted through such services is used only for the purposes disclosed to the user and in accordance with applicable law.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-semibold text-brand-primary">
                3.2 Customer Support & Business Inquiries
              </h3>
              <p>We may use personal information to:</p>
              <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
                <li>Respond to product inquiries</li>
                <li>Respond to B2B partnership proposals</li>
                <li>Communicate with prospective distributors, importers, and other business partners</li>
                <li>Provide product information</li>
                <li>Respond to sample-related inquiries</li>
                <li>Arrange business discussions or meetings</li>
                <li>Follow up on submitted inquiries</li>
              </ul>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-semibold text-brand-primary">
                3.3 B2B Sales & Business Facilitation
              </h3>
              <p>
                We may process information necessary to facilitate potential or existing business relationships, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
                <li>Quotation requests</li>
                <li>Product and catalog inquiries</li>
                <li>Wholesale inquiries</li>
                <li>Distribution discussions</li>
                <li>Technical or product information requests</li>
                <li>Order requirements</li>
                <li>Export-related communications</li>
                <li>Contract-related communications</li>
              </ul>
              <p className="pt-2 text-brand-primary/70">
                Submitting an inquiry through the website does not itself constitute an order or commercial contract.
              </p>
              <p className="text-brand-primary/70">
                Actual sales, orders, payment terms, shipping conditions, and other commercial terms are separately discussed and agreed upon through email, quotations, purchase orders, contracts, or other written business documents.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-semibold text-brand-primary">
                3.4 Service Enhancement & Security
              </h3>
              <p>We may use technical and usage information to:</p>
              <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
                <li>Monitor website traffic</li>
                <li>Improve website functionality</li>
                <li>Analyze user experience</li>
                <li>Detect and prevent security threats</li>
                <li>Prevent fraudulent or unauthorized activities</li>
                <li>Maintain and improve website performance</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              4. Marketing and Promotional Communications
            </h2>
            <p>
              Where permitted by applicable law and based on the appropriate legal basis or consent, HERMEN may contact business contacts regarding:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>New product launches</li>
              <li>Product updates</li>
              <li>Promotions</li>
              <li>Newsletters</li>
              <li>Trade shows and exhibitions</li>
              <li>Business events</li>
              <li>Distributor or wholesale opportunities</li>
              <li>Samples and related follow-up communications</li>
            </ul>
            <p>
              Marketing communications may be sent by email or other legally permitted communication methods.
            </p>
            <p>
              Recipients may opt out of marketing communications at any time by using the unsubscribe method provided in the relevant communication or by contacting: <a href="mailto:hermen@hermen.co.kr" className="underline underline-offset-2 hover:text-brand-primary">hermen@hermen.co.kr</a>
            </p>
            <p>
              Opting out of marketing communications does not prevent HERMEN from sending necessary non-marketing communications relating to an existing inquiry, transaction, contract, or business relationship.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              5. Legal Basis for Processing
            </h2>
            <p>
              Depending on the circumstances and applicable law, HERMEN may process personal information based on:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Your consent</li>
              <li>Your request for information or business communication</li>
              <li>Steps taken at your request prior to entering into a contract</li>
              <li>Performance or management of a contract</li>
              <li>Compliance with applicable legal obligations</li>
              <li>Legitimate business interests where permitted by applicable law</li>
            </ul>
            <p>
              For marketing communications, HERMEN will obtain consent or rely on another legally permissible basis where required by applicable law.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              6. Third-Party Sharing & Service Providers
            </h2>
            <p>
              HERMEN does not sell, rent, or trade your personal information.
            </p>
            <p>
              We may disclose or provide personal information where reasonably necessary and legally permitted, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Where you have provided consent</li>
              <li>Where necessary to respond to your inquiry</li>
              <li>Where necessary to perform or manage a business relationship</li>
              <li>Where required by applicable law</li>
              <li>Where necessary to protect HERMEN&apos;s legal rights or security</li>
            </ul>
            <p>
              HERMEN may also use trusted third-party service providers for purposes such as:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Website hosting</li>
              <li>Website security</li>
              <li>Email services</li>
              <li>Business inquiry management</li>
              <li>Cloud services</li>
              <li>Analytics</li>
              <li>Marketing communications</li>
              <li>Customer relationship management</li>
            </ul>
            <p>
              Such service providers may process personal information only to the extent reasonably necessary to provide their services.
            </p>
            <p>
              Specific service providers and processing arrangements will be identified and updated as applicable.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              7. International Transfer of Personal Information
            </h2>
            <p>
              Because HERMEN conducts business with customers and business partners worldwide, personal information may be transferred to, stored in, or accessed from countries outside the Republic of Korea.
            </p>
            <p>
              Where applicable, HERMEN will take measures required under relevant data protection laws when transferring personal information internationally.
            </p>
            <p>
              Depending on the circumstances, such measures may include obtaining consent where required, entering into appropriate contractual arrangements, using legally recognized transfer mechanisms, or implementing other safeguards required by applicable law.
            </p>
            <p>
              The specific countries, recipients, purposes, and transfer mechanisms may depend on the services and systems actually used by HERMEN.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              8. Data Retention & Erasure
            </h2>
            <p>
              HERMEN retains personal information only for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy or to comply with applicable legal, accounting, contractual, or regulatory obligations.
            </p>
            <p>Information may be retained as necessary for:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Responding to and managing business inquiries</li>
              <li>Maintaining records of business communications</li>
              <li>Managing business relationships</li>
              <li>Performing contracts</li>
              <li>Resolving disputes</li>
              <li>Complying with legal obligations</li>
              <li>Preventing fraud or unauthorized activities</li>
            </ul>
            <p>
              When personal information is no longer required and there is no legal basis for further retention, HERMEN will securely delete or otherwise dispose of the information in accordance with applicable law.
            </p>
            <p className="text-xs text-brand-primary/60 italic">
              Specific retention periods: [TO BE COMPLETED]
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              9. Security
            </h2>
            <p>
              HERMEN employs reasonable technical, administrative, and organizational measures to protect personal information against unauthorized access, loss, alteration, disclosure, destruction, or other unlawful processing.
            </p>
            <p>These measures may include:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Access controls</li>
              <li>Restricted access to personal information</li>
              <li>Account and password security</li>
              <li>Security monitoring</li>
              <li>Malware and security protection</li>
              <li>Confidentiality obligations</li>
              <li>Secure communication methods</li>
              <li>Other appropriate security measures</li>
            </ul>
            <p>
              However, no internet-based transmission or electronic storage system can be guaranteed to be completely secure.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              10. Cookies and Similar Technologies
            </h2>
            <p>HERMEN may use cookies and similar technologies to support:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Website functionality</li>
              <li>Security</li>
              <li>Performance</li>
              <li>Analytics</li>
              <li>User experience improvement</li>
              <li>Other legitimate website operations</li>
            </ul>
            <p>
              Depending on the services implemented on the website, third-party analytics or advertising technologies may also be used.
            </p>
            <p className="text-xs text-brand-primary/60 italic">
              Current analytics and cookie services: [TO BE CONFIRMED]
            </p>
            <p>
              Where required by applicable law, HERMEN will provide appropriate notice and obtain consent for the use of cookies or similar technologies.
            </p>
            <p>
              Users may control or disable cookies through their browser settings. Disabling certain cookies may affect website functionality.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              11. Your Rights & Choices
            </h2>
            <p>Subject to applicable law, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of personal information</li>
              <li>Request restriction of certain processing</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Object to certain processing activities</li>
              <li>Exercise other rights provided by applicable law</li>
            </ul>
            <p>
              To exercise these rights, please contact HERMEN using the contact information below.
            </p>
            <p>
              HERMEN may take reasonable steps to verify the identity of the requester before processing certain requests.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              12. Children&apos;s Privacy
            </h2>
            <p>The HERMEN website is primarily intended for business and commercial users.</p>
            <p>
              HERMEN does not knowingly seek to collect personal information from children for B2B marketing or business purposes.
            </p>
            <p>
              If HERMEN becomes aware that personal information has been collected from a child in circumstances where such collection is not permitted by applicable law, HERMEN will take appropriate measures.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              13. Third-Party Websites
            </h2>
            <p>The HERMEN website may contain links to third-party websites or services.</p>
            <p>
              HERMEN does not control and is not responsible for the privacy practices, security, content, or policies of third-party websites.
            </p>
            <p>
              Users should review the privacy policies of third-party websites before providing personal information to them.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              14. Changes to This Privacy Policy
            </h2>
            <p>HERMEN may update this Privacy Policy from time to time to reflect changes in:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Applicable laws</li>
              <li>HERMEN&apos;s business activities</li>
              <li>Website functionality</li>
              <li>Personal information processing practices</li>
              <li>Third-party services</li>
            </ul>
            <p>The updated Privacy Policy will be posted on the website with the revised effective date.</p>
          </section>

          {/* Section 15 */}
          <section className="pt-6 border-t border-black/10 space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              15. Privacy Officer Contact
            </h2>
            <p>
              For questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact:
            </p>
            <div className="text-sm space-y-1.5 text-brand-primary/80">
              <p className="font-medium text-brand-primary">HERMEN Corp.</p>
              <p>Email: <a href="mailto:hermen@hermen.co.kr" className="underline underline-offset-2 hover:text-brand-primary">hermen@hermen.co.kr</a></p>
              <p>Department: Customer Privacy & Global Compliance</p>
              <p>Brand: HERMEN</p>
              <p>Telephone: <a href="tel:+8250714385539" className="hover:text-brand-primary">+82-507-1438-5539</a></p>
            </div>
          </section>
        </div>
      </motion.article>
    </div>
  );
};
