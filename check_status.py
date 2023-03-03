import os
import requests

# Set your OpenAI API key
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer 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",
}

# Specify the ID of the training task to cancel
task_id = "ft-yOMYABHyvCbKIscUpIfg0URR"

# Send a DELETE request to the training task endpoint to cancel the task
response = requests.delete(
    f"https://api.openai.com/v1/tasks/{task_id}", headers=headers
)

# Check the status of the cancellation
if response.status_code == 204:
    print("Training task was successfully cancelled.")
else:
    print("Failed to cancel training task.")
