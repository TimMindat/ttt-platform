import React from "react";
import Program from "../../components/Program/Program";

const BoatProgram: React.FC = () => {
  const programContent = `"Boat" aligns value-based orientations with the flow of the present moment, opening spaces for understanding, interpreting truth after the flood settles.

It reorients comprehension and builds meaning through critical deconstruction and aesthetic sensibility, tracking societal questions and cultural policies from a cumulative perspective.

Through restoring societal navigation in our capacity to assess our lives and be accountable, and through reviving the commons for social and cultural dialogue, we strive to find our path along the Trace of the Tides.

The Boat program invites participants to navigate through complex societal waters, finding stability amidst uncertainty. It creates a platform where diverse perspectives can converge, allowing for meaningful dialogue and exchange.

By embracing the metaphor of the boat—a vessel that both contains and transports—we explore how communities can remain cohesive while moving forward through challenging currents of change.`;

  return (
    <Program
      title="Boat"
      description="Restoring dialogue, navigating truth."
      heroImage="/img-1.png"
      content={programContent}
      accentColor="#3b82f6" // Blue accent
      backgroundColor="#0f172a"
    />
  );
};

export default BoatProgram;