exports.detectAI = async (sentences) => {
  return sentences.map((s) => ({ ...s, ai_probability: Math.random().toFixed(2) }));
};