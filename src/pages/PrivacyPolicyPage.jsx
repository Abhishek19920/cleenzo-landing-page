import privacyPolicy from "../legal/privacy-policy.json";
import LegalPage, { LegalSection } from "./LegalPage";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title={privacyPolicy.title} updated={privacyPolicy.updated}>
      <p className="text-sm leading-relaxed text-slate-600 mb-8">{privacyPolicy.intro}</p>
      {privacyPolicy.sections.map((section) => (
        <LegalSection key={section.heading} heading={section.heading}>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.heading}-${index}`}>{paragraph}</p>
          ))}
        </LegalSection>
      ))}
    </LegalPage>
  );
}
