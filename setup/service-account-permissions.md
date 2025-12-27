# Service Account Permissions Setup

Your service account needs the following IAM roles to work with VoiceDoc Agent:

## Required Roles

1. **Vertex AI User** (`roles/aiplatform.user`)
   - Needed for: Gemini API calls, embeddings generation, document classification

2. **Cloud Datastore User** (`roles/datastore.user`)
   - Needed for: Firestore database access (storing document chunks and metadata)

## How to Grant Permissions

### Using gcloud CLI:

```powershell
# Set your project ID and service account email
PROJECT_ID="voicedoc-agent"
SERVICE_ACCOUNT_EMAIL="voicedoc-agent@voicedoc-agent.iam.gserviceaccount.com"

# Grant Vertex AI User role
gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" `
  --role="roles/aiplatform.user"

# Grant Cloud Datastore User role
gcloud projects add-iam-policy-binding $PROJECT_ID `  
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" `
  --role="roles/datastore.user"
```

### Using Google Cloud Console:

1. Go to [IAM & Admin > IAM](https://console.cloud.google.com/iam-admin/iam)
2. Find your service account in the list
3. Click the pencil icon to edit
4. Click "ADD ANOTHER ROLE"
5. Add each of the roles listed above
6. Click "SAVE"

## Verify Permissions

After granting permissions, restart your Docker container:

```powershell
docker stop voicedoc-agent
docker rm voicedoc-agent

docker run -d -p 3000:3000 --name voicedoc-agent `
  --env-file .env.local `
  -v ${PWD}/service-account-voicedoc-agent.json:/app/service-account.json `
  -e GOOGLE_APPLICATION_CREDENTIALS=/app/service-account.json `
  seehiong/voicedoc-agent
```

Then try uploading a document again.
