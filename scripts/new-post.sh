#!/bin/bash
# Usage: ./scripts/new-post.sh "記事タイトル" "description" "tag1,tag2" < post_body.md
# Or: ./scripts/new-post.sh "記事タイトル" "description" "tag1,tag2" "本文テキスト"

TITLE="${1}"
DESCRIPTION="${2}"
TAGS="${3}"
BODY="${4}"

DATE=$(date +%Y-%m-%d)
SLUG=$(date +%Y-%m-%d)-$(echo "$TITLE" | tr ' 　' '-' | sed 's/[^a-zA-Z0-9ぁ-んァ-ン一-龥-]//g' | head -c 30)
FILEPATH="src/content/blog/${SLUG}.md"

# Build tags YAML
TAG_YAML="tags: ["
IFS=',' read -ra TAG_ARR <<< "$TAGS"
for tag in "${TAG_ARR[@]}"; do
  TAG_YAML+="'$(echo $tag | xargs)',"
done
TAG_YAML="${TAG_YAML%,}]"

cat > "$FILEPATH" << EOF
---
title: '${TITLE}'
description: '${DESCRIPTION}'
pubDate: '${DATE}'
${TAG_YAML}
---

${BODY}
EOF

echo "Created: $FILEPATH"

# Commit and push
git add "$FILEPATH"
git commit -m "post: ${TITLE}"
git push origin main

echo "Pushed to GitHub — Cloudflare Pages will deploy automatically"
