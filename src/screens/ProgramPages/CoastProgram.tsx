import React from "react";
import Program from "../../components/Program/Program";

const CoastProgram: React.FC = () => {
  const programContent = `Coast: The voice of those who have never been heard, a narrative reviving the truth buried beneath the rubble, preserving humanity's essence against numbness in the face of atrocities and savagery.

The coast becomes a witness to resilience, not drowning. It stands as the boundary between land and sea, between safety and the unknown, between what was and what could be.

In this program, we explore the stories of communities living on the edge—both literally and metaphorically. We amplify voices that have been silenced by circumstance, conflict, or convention.

Through documentary, oral history, and artistic expression, Coast creates space for narratives that challenge our understanding of resilience and human dignity.

The shoreline teaches us about impermanence and persistence simultaneously—how the constant washing of waves both erodes and shapes, destroys and creates. In this tension, we find profound lessons about human experience and collective memory.`;

  return (
    <Program
      title="Coast"
      description="Unheard voices, resilience, and buried truths."
      heroImage="/img-2.png"
      content={programContent}
      accentColor="#10b981" // Green accent
      backgroundColor="#064e3b"
    />
  );
};

export default CoastProgram;