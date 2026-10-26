import LegalPage, { LegalSection } from "./LegalPage";

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" updated="26 October 2026">
      <LegalSection heading="1. Service">
        <p>
          Cleenzo provides laundry, dry cleaning, and related doorstep pickup and
          delivery in our published service areas. Booking online or in the app is a
          request. The store may confirm, reschedule, or decline a pickup if the area
          or slot cannot be served.
        </p>
      </LegalSection>
      <LegalSection heading="2. Prices">
        <p>
          App and website totals before inspection are estimates. The payable amount
          is confirmed after pickup and garment inspection. You pay only after that
          amount is shown as confirmed, unless you choose to pay at the counter.
        </p>
      </LegalSection>
      <LegalSection heading="3. Payment">
        <p>
          Online payments are processed by Cashfree. A browser return from checkout
          is not proof of payment. The bill updates when Cashfree confirms the
          payment. Wallet (Smiles) payments debit your Cleenzo balance.
        </p>
      </LegalSection>
      <LegalSection heading="4. Account">
        <p>
          You must use a mobile number you control and a Gmail address to receive
          OTPs. You may delete your account from the app Profile screen. Offers are
          governed by the separate Offer terms page.
        </p>
      </LegalSection>
      <LegalSection heading="5. Liability">
        <p>
          Report damaged or missing items promptly after delivery. Claims are assessed
          against the declared garment and our store process. We do not accept
          unlimited liability for undeclared valuables left in pockets.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
