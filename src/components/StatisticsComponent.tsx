import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { getStatistics } from "../scripts/services/statistics";

import type { Statistics } from "../types/interfaces";

const StatisticsStyled = styled.section``;
interface StatisticsProps {
  userName: string | null;
}

export default function StatisticsComponent({ userName }: StatisticsProps) {
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      const data = await getStatistics();
      setStatistics(data);
    }

    fetchStatistics();
  }, []);

  return (
    <StatisticsStyled>
      <h2>{userName}</h2>
      {JSON.stringify(statistics)}
    </StatisticsStyled>
  );
}
