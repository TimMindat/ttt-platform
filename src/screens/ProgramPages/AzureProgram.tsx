import React from "react";
import Program from "../../components/Program/Program";

const AzureProgram: React.FC = () => {
  const programContent = `Azure: Blue is not merely a color; it is an open space, an infinite horizon—a hue bridging sky and sea, soul and the unknown, constancy and change, contemplation and motion.

It is where thought becomes like still water, perceiving the depth of things undisturbed by surface noise. Blue is a language written in water, a rhythm shaped by light, a voice echoed in silence, and a line extended through movement.

In this space, vision transforms into melody, sound becomes painting, and the body becomes an endless tide. Azure invites us to explore the liminal spaces between disciplines, between cultures, between ways of knowing.

The program encourages participants to dive deep into contemplative practice while simultaneously expanding horizons of understanding. Through artistic exploration, philosophical inquiry, and embodied knowledge, we discover new ways of relating to ourselves and our world.

Azure reminds us that boundaries are often illusions—that the sky meets the sea in a horizon that exists only from our limited perspective. When we change how we see, we change what becomes possible.`;

  return (
    <Program
      title="Azure"
      description="A bridge between sky, sea, and soul."
      heroImage="/img-3.png"
      content={programContent}
      accentColor="#6366f1" // Indigo accent
      backgroundColor="#1e1b4b"
    />
  );
};

export default AzureProgram;