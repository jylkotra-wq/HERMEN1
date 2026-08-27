import React from 'react';
import { motion } from 'motion/react';

export const TermsPage = () => {
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
            Terms of Use
          </h1>
          <p className="text-xs text-brand-primary/50">
            Last Updated: August 2026
          </p>
        </header>

        {/* Document Body */}
        <div className="space-y-12 text-sm leading-relaxed text-brand-primary/80">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              1. Agreement to Terms
            </h2>
            <p>Welcome to HERMEN.</p>
            <p>
              These Terms of Use (&quot;Terms&quot;) govern your access to and use of the HERMEN website at <a href="https://www.hermen.co.kr" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-brand-primary font-mono text-xs">www.hermen.co.kr</a> (the &quot;Website&quot;), including its content, product information, inquiry services, and related business communications.
            </p>
            <p>
              By accessing or using the Website, you acknowledge that you have read, understood, and agree to these Terms.
            </p>
            <p>
              If you do not agree with these Terms, please do not use the Website.
            </p>
            <p>
              The Website is operated primarily as an international B2B business and product information platform and is not an online shopping mall.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              2. Purpose of the Website
            </h2>
            <p>
              HERMEN operates and exports its own cosmetic brands and provides information about its company, brands, and products to potential business partners worldwide.
            </p>
            <p>The Website is intended primarily for:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>International distributors</li>
              <li>Importers</li>
              <li>Wholesalers</li>
              <li>Retailers</li>
              <li>Business partners</li>
              <li>Other commercial customers</li>
            </ul>
            <p>
              The Website allows visitors to review HERMEN&apos;s products and submit business inquiries.
            </p>
            <p>
              Online account registration, online ordering, and online payment are not currently provided through the Website.
            </p>
            <p>
              Actual commercial transactions are handled separately through email, quotations, purchase orders, contracts, invoices, or other written business documents.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              3. Brand & Product Information
            </h2>
            <p>
              HERMEN provides information regarding its brands and cosmetic products, including where applicable:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Product descriptions</li>
              <li>Product specifications</li>
              <li>Ingredient information</li>
              <li>Product images</li>
              <li>Brand information</li>
              <li>Marketing materials</li>
              <li>Technical information</li>
              <li>Other product-related materials</li>
            </ul>
            <p>
              HERMEN makes reasonable efforts to ensure that information displayed on the Website is accurate and up to date.
            </p>
            <p>However, product information may change due to:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Product improvements</li>
              <li>Formula changes</li>
              <li>Packaging changes</li>
              <li>Regulatory requirements</li>
              <li>Supply conditions</li>
              <li>Manufacturing considerations</li>
              <li>Other business reasons</li>
            </ul>
            <p>
              Product images may also vary slightly from actual products due to photography, display devices, screen settings, or packaging updates.
            </p>
            <p>
              Accordingly, information displayed on the Website is provided primarily for general informational and business inquiry purposes and does not necessarily constitute a final contractual specification.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              4. Product Pricing
            </h2>
            <p>
              HERMEN does not generally publish wholesale or B2B product prices on the Website.
            </p>
            <p>
              Businesses interested in purchasing HERMEN products may contact HERMEN for a quotation.
            </p>
            <p>
              Pricing, MOQ, availability, lead time, payment terms, shipping conditions, Incoterms®, territory, exclusivity, and other commercial conditions may vary depending on the relevant customer, country, products, quantity, and transaction.
            </p>
            <p>
              Any final commercial terms will be separately communicated and agreed upon between HERMEN and the relevant business partner.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              5. B2B Inquiries and Partnerships
            </h2>
            <p>
              Visitors may submit inquiries through the Website or contact HERMEN by email.
            </p>
            <p>Submitting an inquiry does not constitute:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>An order</li>
              <li>A purchase</li>
              <li>Acceptance of an offer</li>
              <li>A quotation</li>
              <li>A sales contract</li>
              <li>A distribution agreement</li>
              <li>An exclusive distributorship</li>
              <li>Any other legally binding commercial agreement</li>
            </ul>
            <p>
              After receiving an inquiry, HERMEN may communicate with the prospective business partner by email or other appropriate communication methods.
            </p>
            <p>Commercial terms will be discussed separately.</p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              6. Orders and Formation of Contracts
            </h2>
            <p>No sale or supply contract shall be deemed to have been concluded solely by:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Visiting the Website</li>
              <li>Viewing product information</li>
              <li>Submitting an inquiry</li>
              <li>Receiving an automated inquiry confirmation</li>
              <li>Exchanging preliminary emails</li>
              <li>Receiving general product information</li>
              <li>Requesting a quotation</li>
            </ul>
            <p>
              A commercial transaction becomes binding only when the applicable terms have been separately agreed upon and confirmed through an appropriate written document, such as:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Quotation</li>
              <li>Purchase order</li>
              <li>Sales confirmation</li>
              <li>Supply agreement</li>
              <li>Distribution agreement</li>
              <li>Other written commercial agreement</li>
            </ul>
            <p>
              Where applicable, the terms of the individual written agreement shall prevail over these Terms with respect to that transaction.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              7. International Sales and Local Regulations
            </h2>
            <p>
              HERMEN supplies cosmetic products to business customers in different countries and regions.
            </p>
            <p>
              Cosmetic regulations vary significantly between countries and may include requirements relating to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Product registration or notification</li>
              <li>Ingredients</li>
              <li>Product labeling</li>
              <li>Packaging</li>
              <li>Claims and advertising</li>
              <li>Importation</li>
              <li>Customs</li>
              <li>Product safety</li>
              <li>Local responsible persons</li>
              <li>Market authorization</li>
              <li>Other regulatory requirements</li>
            </ul>
            <p>
              HERMEN does not represent that every product displayed on the Website is automatically approved, registered, or legally marketable in every country.
            </p>
            <p>
              The allocation of responsibility for local regulatory requirements shall be determined according to the relevant country, product, transaction, and written agreement between HERMEN and the business partner.
            </p>
            <p>
              Where applicable, HERMEN may provide regulatory or registration-related support based on separately agreed terms.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              8. No Universal Guarantee of Marketability
            </h2>
            <p>
              Unless expressly agreed otherwise in writing, HERMEN does not guarantee that any product displayed on the Website:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Can be imported into every country;</li>
              <li>Can be legally sold in every jurisdiction;</li>
              <li>Meets every local labeling requirement;</li>
              <li>Is registered or notified in every market; or</li>
              <li>Satisfies every local regulatory requirement.</li>
            </ul>
            <p>
              Business partners should verify the regulatory requirements applicable to their intended market.
            </p>
            <p>
              Where HERMEN has expressly undertaken regulatory or registration responsibilities under a separate written agreement, those responsibilities shall be governed by that agreement.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              9. Global Compliance Information
            </h2>
            <p>
              HERMEN may provide information regarding regulatory compliance, testing, certifications, registrations, or other compliance activities applicable to particular products or markets.
            </p>
            <p>
              Any reference to a regulatory framework, certification, registration, testing, or compliance standard on the Website is provided in the context applicable to the relevant product or market and should not be interpreted as a guarantee of compliance with all laws in all jurisdictions.
            </p>
            <p>
              Specific regulatory documentation and responsibilities may be confirmed separately during the B2B sales process.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              10. User Conduct & Website Use
            </h2>
            <p>You agree to use the Website only for lawful purposes.</p>
            <p>You shall not:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Engage in activities that disrupt, damage, or impair the Website or connected systems.</li>
              <li>Attempt unauthorized access to the Website, servers, administrative systems, or other protected areas.</li>
              <li>Submit false, misleading, fraudulent, or impersonated information.</li>
              <li>Introduce viruses, malware, or other harmful code.</li>
              <li>Scrape, crawl, systematically collect, or reproduce Website content without authorization.</li>
              <li>Use HERMEN&apos;s content for unauthorized commercial purposes.</li>
              <li>Infringe the intellectual property or other rights of HERMEN or third parties.</li>
              <li>Use the Website for any unlawful or fraudulent activity.</li>
            </ul>
            <p>
              HERMEN may restrict or terminate access where reasonably necessary to protect its Website, systems, rights, or legitimate business interests.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              11. Intellectual Property Rights
            </h2>
            <p>All content on the Website, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>HERMEN trademarks</li>
              <li>Brand names</li>
              <li>Logos</li>
              <li>Product names</li>
              <li>Product images</li>
              <li>Photographs</li>
              <li>Videos</li>
              <li>Text</li>
              <li>Graphics</li>
              <li>Product descriptions</li>
              <li>Catalogs</li>
              <li>Designs</li>
              <li>Software</li>
              <li>Other materials</li>
            </ul>
            <p>
              is owned by or licensed to HERMEN and is protected by applicable copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              No Website content may be copied, reproduced, modified, distributed, publicly displayed, transmitted, published, sold, licensed, or commercially exploited without HERMEN&apos;s prior written consent, except where expressly permitted by applicable law.
            </p>
            <p>
              The use of HERMEN trademarks, logos, product images, or other brand materials for commercial purposes requires prior written authorization.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              12. Business Evaluation Use
            </h2>
            <p>
              Prospective business partners may review Website content for the purpose of evaluating HERMEN products and potential business cooperation.
            </p>
            <p>
              Downloading or using product catalogs, images, specifications, marketing materials, or other documents for commercial purposes beyond ordinary business evaluation requires HERMEN&apos;s prior written permission unless otherwise expressly permitted.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              13. Third-Party Websites
            </h2>
            <p>The Website may contain links to third-party websites or services.</p>
            <p>Such links are provided for convenience or informational purposes only.</p>
            <p>
              HERMEN does not control and is not responsible for the content, availability, security, privacy practices, or policies of third-party websites.
            </p>
            <p>Your use of third-party websites is subject to the relevant third party&apos;s terms and policies.</p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              14. Disclaimer
            </h2>
            <p>
              To the maximum extent permitted by applicable law, the Website and its content are provided for general informational and business inquiry purposes.
            </p>
            <p>HERMEN does not warrant that:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>The Website will always be available or uninterrupted;</li>
              <li>All Website information will always be complete, accurate, or current;</li>
              <li>The Website will be free from errors or security vulnerabilities;</li>
              <li>A particular product will remain available;</li>
              <li>A particular product will be suitable for every user or market; or</li>
              <li>A product will be approved, registered, or marketable in every jurisdiction.</li>
            </ul>
            <p>
              Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited under applicable law.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              15. Product Use and Individual Results
            </h2>
            <p>
              Cosmetic products may produce different results depending on individual skin condition, usage, environment, and other factors.
            </p>
            <p>
              Product information provided on the Website is not intended to constitute medical diagnosis, medical treatment, or professional medical advice.
            </p>
            <p>
              Where appropriate, users should follow the product&apos;s instructions and applicable warnings.
            </p>
            <p>
              Users with known sensitivities or concerns should review the relevant product information before use.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              16. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, HERMEN shall not be liable for indirect, incidental, special, consequential, or business-related losses arising solely from the use of the Website or reliance on information provided through the Website.
            </p>
            <p>
              Any liability arising from an actual sale, supply, distribution, or other commercial transaction shall be governed primarily by the applicable written agreement between HERMEN and the relevant business partner.
            </p>
            <p>
              Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited under applicable law.
            </p>
          </section>

          {/* Section 17 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              17. Privacy
            </h2>
            <p>
              HERMEN may collect and process personal information submitted through the Website, including information provided through inquiry forms, AI consultation services, or email communications.
            </p>
            <p>
              The collection, use, storage, and protection of personal information are governed by HERMEN&apos;s Privacy Policy.
            </p>
          </section>

          {/* Section 18 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              18. Electronic Communications
            </h2>
            <p>
              When you contact HERMEN through the Website or by email, HERMEN may communicate with you electronically regarding:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Your inquiry</li>
              <li>Products</li>
              <li>Quotations</li>
              <li>Samples</li>
              <li>Potential business cooperation</li>
              <li>Transactions</li>
              <li>Contracts</li>
              <li>Other business matters</li>
            </ul>
            <p>
              Where permitted by applicable law and based on the appropriate legal basis or consent, HERMEN may also send marketing communications such as product announcements, promotions, newsletters, and trade show information.
            </p>
          </section>

          {/* Section 19 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              19. Changes to the Website
            </h2>
            <p>
              HERMEN may modify, suspend, discontinue, or update any part of the Website or its content at any time.
            </p>
            <p>This may include:</p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Product information</li>
              <li>Product availability</li>
              <li>Website functions</li>
              <li>Images</li>
              <li>Content</li>
              <li>Business information</li>
              <li>Contact methods</li>
            </ul>
            <p>
              HERMEN does not guarantee that any particular product, content, feature, or service will remain available for a specific period.
            </p>
          </section>

          {/* Section 20 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              20. Changes to These Terms
            </h2>
            <p>
              HERMEN may amend these Terms from time to time to reflect changes in:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-primary/80">
              <li>Website operations</li>
              <li>Business activities</li>
              <li>Applicable laws</li>
              <li>Products or services</li>
              <li>Other relevant circumstances</li>
            </ul>
            <p>Updated Terms will be posted on the Website with the revised effective date.</p>
          </section>

          {/* Section 21 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              21. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea, without regard to its conflict-of-law principles, unless otherwise required by applicable mandatory law.
            </p>
            <p>
              Any dispute arising out of or relating to these Terms or the use of the Website shall, where reasonably possible, first be resolved through good-faith consultation.
            </p>
            <p>
              If the dispute cannot be resolved through consultation, the competent courts of the Republic of Korea shall have jurisdiction, subject to applicable mandatory laws and any separate written agreement between HERMEN and a business partner.
            </p>
          </section>

          {/* Section 22 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              22. Severability
            </h2>
            <p>
              If any provision of these Terms is determined to be invalid or unenforceable, that provision shall be enforced to the maximum extent permitted by law, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          {/* Section 23 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              23. Relationship to Commercial Agreements
            </h2>
            <p>These Terms govern the general use of the Website.</p>
            <p>
              They do not replace or supersede any separate written agreement entered into between HERMEN and a business partner concerning the sale, supply, distribution, or other commercial transaction of products.
            </p>
            <p>
              In the event of a conflict between these Terms and a separate written commercial agreement, the applicable written commercial agreement shall prevail with respect to that transaction.
            </p>
          </section>

          {/* Section 24 */}
          <section className="pt-6 border-t border-black/10 space-y-3">
            <h2 className="text-base font-semibold text-brand-primary tracking-tight">
              24. Contact Information
            </h2>
            <div className="text-sm space-y-1.5 text-brand-primary/80">
              <p className="font-medium text-brand-primary">HERMEN Corp.</p>
              <p>Website: <a href="https://www.hermen.co.kr" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-brand-primary">www.hermen.co.kr</a></p>
              <p>Email: <a href="mailto:hermen@hermen.co.kr" className="underline underline-offset-2 hover:text-brand-primary">hermen@hermen.co.kr</a></p>
              <p>Telephone: <a href="tel:+8250714385539" className="hover:text-brand-primary">+82-507-1438-5539</a></p>
            </div>
          </section>
        </div>
      </motion.article>
    </div>
  );
};
