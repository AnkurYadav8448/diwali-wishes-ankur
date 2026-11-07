export const diwaliQuotes = [
  {
    shloka: "ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥",
    meaning: "Lead us from falsehood to truth, from darkness unto light, from mortality to immortality.",
    source: "Brihadaranyaka Upanishad"
  },
  {
    shloka: "दीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः । दीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तु ते ॥",
    meaning: "The light of the lamp is the Supreme Consciousness. May this sacred flame dispel darkness and bring auspiciousness.",
    source: "Traditional Diya Stotram"
  }
];

export const getPersonalizedWish = (name = "Friend") => {
  const cleanName = name.trim() || "Dear Friend";
  return {
    recipient: cleanName,
    title: `Happy & Prosperous Diwali, ${cleanName}! 🪔✨`,
    message: `May the auspicious luminescence of Diwali fill your life with boundless joy, robust health, flourishing prosperity, and serene peace. As each diya flickers with warmth and radiance, may it illuminate your path toward your highest dreams and ambitions.`,
    from: "Ankur",
    edition: "Diwali Wishes — Ankur Edition 1.0",
    highlights: [
      "✨ May your home echo with joyful laughter and sweetness.",
      "🪔 May the light of knowledge banish all shadows of doubt.",
      "💰 May Goddess Lakshmi bestow health, fortune, and wisdom.",
      "🎆 May peace and contentment abide in your heart throughout the coming year."
    ]
  };
};
