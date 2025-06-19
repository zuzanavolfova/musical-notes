import { styled } from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  color: var(--text-dark-grey);
  padding: 12px 0;
  border-top: 1px solid var(--light-background);

  .footer__title {
    font-weight: 600;
  }

  .footer__link {
    color: var(--text-dark-grey);
    text-decoration: none;

    &:hover {
      font-weight: 600;
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer
      className="footer"
      role="contentinfo"
      aria-label="Contact information for Zuzana Volfová"
    >
      <span className="footer__title" aria-label="Name">
        Zuzana Volfová
      </span>
      <span aria-label="Phone number">+420 728 881 941</span>
      <a
        className="footer__link"
        href="mailto:zuzka.volfova@gmail.com"
        aria-label="Send an email to zuzka.volfova@gmail.com"
      >
        zuzka.volfova@gmail.com
      </a>
      <a
        className="footer__link"
        href="https://zuzanavolfova.github.io/zuzana-volfova-2025/#/"
        target="_blank"
        aria-label="Visit Zuzana Volfová's web side"
      >
        My website
      </a>
      <a
        className="footer__link"
        href="https://www.linkedin.com/in/zuzana-volfová"
        target="_blank"
        aria-label="Visit Zuzana Volfová's LinkedIn profile"
      >
        LinkedIn
      </a>
    </FooterContainer>
  );
}
