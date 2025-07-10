import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { getStatistics } from "../scripts/services/statistics";

import type { Statistics } from "../types/interfaces";

const StatisticsStyled = styled.section``;

export default function Statistics() {
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      const data = await getStatistics();
      setStatistics(data);
    }

    fetchStatistics();
  }, []);

  return <StatisticsStyled>{JSON.stringify(statistics)}</StatisticsStyled>;
}
