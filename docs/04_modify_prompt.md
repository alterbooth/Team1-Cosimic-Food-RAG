任意のプロンプトに変更する場合は以下の手順を行う

# プロンプトの編集

1. `Cosmic-Food-RAG-app\src\quartapp\approaches\rag.py` を開く
1. `CONTEXT_PROMPT`の内容を変更し保存
1. アプリケーションをデプロイ

## 変更する場合のプロンプトイメージ
プロンプトを作成する際には以下の点を注意して作成してください。

* 文脈情報は簡潔か？
* 指示は明確か？
* 回答のスタイルが指定されているか？
* フォールバックメカニズムは実装されているか？
* [Azure OpenAIのコンテンツ管理ポリシー](https://learn.microsoft.com/ja-jp/azure/ai-services/openai/concepts/default-safety-policies)にのっとっているか？

### プロンプト例

```python
prompt_template = """
与えられた文脈と質問に対して、以下のガイドラインに従って回答してください：

文脈情報:
{context}

質問:
{input}

回答ガイドライン:
- 与えられた文脈から直接的に情報を引用すること
- 不明な点は「情報が不十分です」と明示すること
- 簡潔かつ明確な回答を心がけること

詳細な回答:
"""
```
