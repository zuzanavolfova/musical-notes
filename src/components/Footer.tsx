import { styled } from "styled-components";
import { useTranslation } from "react-i18next";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  color: var(--text-dark-grey);
  padding: 12px 0;
  box-shadow: 0 -2px 8px -4px var(--primary-color);
  margin: 20px 0;
  .footer__title {
    font-weight: 600;
    color: var(--primary-color);
  }
  .footer__link {
    color: var(--text-dark-grey);
    text-decoration: none;
    @media (prefers-color-scheme: dark) {
      color: var(--dark-theme-text-color);
    }
    &:hover {
      font-weight: 600;
    }
  }
`;

export default function Footer() {
  const { t } = useTranslation();

  return (
    <FooterContainer
      className="footer"
      role="contentinfo"
      aria-label="Contact information for Zuzana Volfová"
    >
      <strong className="footer__title" aria-label="Name">
        Zuzana Volfová
      </strong>
      <a
        className="footer__link"
        href="mailto:zuzka.volfova@gmail.com"
        title="Send an email to zuzka.volfova@gmail.com"
      >
        zuzka.volfova@gmail.com
      </a>
      <a
        className="footer__link"
        href="https://zuzanavolfova.github.io/zuzana-volfova-2025/#/"
        target="_blank"
        rel="noopener noreferrer"
        title="Visit Zuzana Volfová's web side"
      >
        {t("my-website")}
      </a>
      <a
        className="footer__link"
        href="https://www.linkedin.com/in/zuzana-volfová"
        target="_blank"
        rel="noopener noreferrer"
        title="Visit Zuzana Volfová's LinkedIn profile"
      >
        LinkedIn
      </a>
    </FooterContainer>
  );
}
