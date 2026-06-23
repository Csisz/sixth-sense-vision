# Skill: Image Analysis

Purpose

Extract useful information from images.

The analysis itself is not the product.

The image produced from the analysis is the product.

---

Possible providers

- OpenAI Vision
- Gemini Vision
- Claude Vision

---

Inputs

- Photo
- Camera image

Future

- LiDAR depth
- WiFi CSI
- Thermal camera

---

Outputs

Structured JSON

Example:

{
  "zones": [
    {
      "type": "moisture",
      "confidence": 0.78,
      "coordinates": []
    }
  ]
}

---

Rules

Never expose raw model output directly.

Always convert analysis into beautiful visuals.
