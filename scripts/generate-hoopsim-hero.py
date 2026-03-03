#!/usr/bin/env python3
"""Generate HoopSim devlog hero image via Gemini API."""
import os
import sys
from io import BytesIO

from google import genai
from PIL import Image

OUTPUT_DIR = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "content",
    "blog",
    "hoopsim-devlog-1",
)
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "hero.jpg")

PROMPT = """Hero image for a blog post about HoopSim, a simulated fantasy basketball platform.
Stylized illustration combining basketball and digital/simulation elements: a basketball hoop
with subtle data visualization or circuit patterns in the background, modern tech aesthetic,
warm orange and blue basketball court colors, clean minimal style, 16:9 wide landscape format
suitable for blog header."""


def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable is required", file=sys.stderr)
        sys.exit(1)

    client = genai.Client(api_key=api_key)
    config = genai.types.GenerateContentConfig(response_modalities=["TEXT", "IMAGE"])

    response = client.models.generate_content(
        model="gemini-2.0-flash-exp",
        contents=PROMPT,
        config=config,
    )

    for part in response.candidates[0].content.parts:
        if part.inline_data:
            img = Image.open(BytesIO(part.inline_data.data))
            img.save(OUTPUT_PATH, format="JPEG", quality=90)
            print(f"Saved: {OUTPUT_PATH}")
            return

    print("Error: No image in response", file=sys.stderr)
    sys.exit(1)


if __name__ == "__main__":
    main()
