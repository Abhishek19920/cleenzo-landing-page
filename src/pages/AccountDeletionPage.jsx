import accountDeletion from "../legal/account-deletion.json";
import LegalPage, { LegalSection } from "./LegalPage";

export default function AccountDeletionPage() {
  return (
    <LegalPage title={accountDeletion.title} updated={accountDeletion.updated}>
      <p className="text-sm leading-relaxed text-slate-600 mb-8">{accountDeletion.intro}</p>
      {accountDeletion.sections.map((section) => (
        <LegalSection key={section.heading} heading={section.heading}>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.heading}-${index}`}>{paragraph}</p>
          ))}
        </LegalSection>
      ))}
      <p className="text-sm leading-relaxed text-slate-600">
        Email{" "}
        <a className="font-semibold text-cleenzo hover:underline" href="mailto:cs.shineworks@gmail.com?subject=Delete%20my%20Cleenzo%20account">
          cs.shineworks@gmail.com
        </a>{" "}
        to start a deletion request now.
      </p>
    </LegalPage>
  );
}
