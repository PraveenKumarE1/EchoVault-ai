# EchoVault Architecture

React client → Express API → storage/services.
The optional Python FastAPI engine performs lightweight NLP classification and relationship extraction.

### Data flow
1. Capture memory.
2. Validate and classify.
3. Store memory.
4. Extract topics/entities.
5. Build relationships.
6. Present timeline, graph and analytics.

The design leaves clean extension points for MongoDB, embeddings, OCR and local models.