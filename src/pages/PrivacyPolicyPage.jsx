import LegalPage, { LegalSection } from "./LegalPage";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="26 October 2026">
      <LegalSection heading="1. Who we are">
        <p>
          Cleenzo is a laundry and dry-cleaning brand operated by Shineworks Solutions
          Private Limited (“we”, “us”). This policy explains how the Cleenzo website,
          customer app (package in.cleenzo.user), WhatsApp booking, and store counter
          collect and use personal data.
        </p>
      </LegalSection>
      <LegalSection heading="2. Data we collect">
        <p>
          We collect your name, mobile number, WhatsApp number, optional Gmail address
          (for OTP fallback), pickup addresses, order contents, payment status (not full
          card numbers — payments are processed by Cashfree), device push token, crash
          diagnostics from the app, and support chat messages. Rider GPS is collected
          from the rider app while a job is active so the customer can see live tracking;
          customers are not asked for background location.
        </p>
        <p>
          We do not sell personal data. Staff in the store ERP can see orders needed
          to fulfil pickup, processing, and delivery.
        </p>
      </LegalSection>
      <LegalSection heading="3. Why we use it">
        <p>
          To create your account, send login OTPs, schedule pickup and delivery, confirm
          prices, take payment, send order updates on WhatsApp or push notification, and
          provide customer support.
        </p>
      </LegalSection>
      <LegalSection heading="4. Account deletion">
        <p>
          In the Cleenzo app go to Profile → Delete account. We deactivate the login,
          anonymise your mobile and email so they cannot be used to sign in, and keep
          historical bills only as required for tax and accounting. You can also email
          cs.shineworks@gmail.com from the Gmail on the account and ask us to delete it.
        </p>
        <p>
          Deletion is not instant for records we must retain under Indian tax law.
          Those records stay in the store system without a live login.
        </p>
      </LegalSection>
      <LegalSection heading="5. Retention and security">
        <p>
          Access tokens live on your device. OTPs expire quickly. We store session and
          order data on our servers in India (or our hosting region). Do not share your
          OTP with anyone.
        </p>
      </LegalSection>
      <LegalSection heading="6. Contact">
        <p>
          Privacy questions: cs.shineworks@gmail.com or the store number on this
          website. Grievance officer correspondence can be sent to the same email.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
