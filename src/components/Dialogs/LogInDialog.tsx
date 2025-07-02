import { useTranslation } from "react-i18next";

export default function LogInDialog() {
  const { t } = useTranslation();

  return (
    <form>
      <div>
        <label htmlFor="username">{t("username:")}</label>
        <input id="username" type="text" name="username" required />
      </div>
      <div>
        <label htmlFor="password">{t("password:")}</label>
        <input id="password" type="password" name="password" required />
      </div>
      <button type="submit">{t("save")}</button>
    </form>
  );
}
