# Random Effect Task
You will have **1 full week** to complete this task starting when you received it. You can submit the task by uploading it on Github.

## About the task
You are asked to create a simple web application that allows users to upload a picture in various formats (e.g. jpeg, png). Once the picture is uploaded the user can select zero or multiple effects / transformations on the picture. It is finally possible to download the picture.

The application should be composed of at least three components, such as DB, backend, and frontend, using any technology stack.

Note:
- The visual effects and transformations should be applied in the backend.
- Implements at least three basic transformations (such as flip, color change, tilt, et cetera...)

## The API endpoints

Here is the list of the smallest set of necessary endpoints. There should be an accessible endpoint for the API documentation (using OpenAPI, or Redoc).

| Route | Method | Description |
| ----- | ------ | ----------- |
| `/api/login/` | POST | Accepts username and password and returns a **token**. Use this **token** to authorize use of other endpoints. |
| `/api/effects/`| GET | Returns a list of possible effects to apply |
| `/api/apply/` | POST | Accepts a picture and one effect and returns the same picture transformed by the selected effect |

## BONUS
- Use the output of a deep learning model as visual effect (such as deep dreams, or yolo)