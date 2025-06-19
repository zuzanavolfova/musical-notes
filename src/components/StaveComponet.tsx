import { styled } from "styled-components";

const Stave = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  border-right: 2px solid black;
  border-left: 2px solid black;
`;

const StaveLine = styled.div`
  border-top: 1px solid black;
  height: 0;
`;

export default function StaveComponent() {
  return (
    <Stave>
      {[...Array(5)].map((_, i) => (
        <StaveLine key={i} />
      ))}
    </Stave>
  );
}
