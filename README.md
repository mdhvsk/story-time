# BookBuilder.AI

<img width="1440" alt="Screenshot 2024-02-23 at 2 09 16 AM" src="https://github.com/mdhvsk/story-time/assets/95248875/e771ddef-13b5-466d-a6cf-68fcbebc878b">

## Live Website!
Check out http://bookmakersai.com/ to see a live demo of the app!
## Inspiration
The product originated from an issue a friend had while tutoring children at an elementary school. Many children were several years behind in reading level. For example one child was 10 years old and read at a 2nd grade level. When given books at that grade level, the student didn't want to read it since the reading material was too "childish and boring". There was a unique problem where children were developmentally behind and didn't have materials that interested them. My friend wanted a product that can create stories that not only match their interests but reading level as well.

## What it does
The product takes a user's reading level, age, desired genre, expected read time, and specific details or interests to generate a short story with an accompanied image matching the story. Users can read through the story and click on words to get their definitions. Words can be saved in the notes section for further review. All stories can be saved with the images and notes for further use. 

## How I built it
The backend was written in Python and ran on a Flask server. All user information was stored in a MySQL database besides images which were stored in an S3 bucket. Generated materials was made using OpenAI models. For text generation, GPT-3.5 and GPT-3.5-1106 were used for long text and json responses respectively. Image generation was done using Dall-e-3. Dictionary definitions were retrieved using Webster Dictionary's API. The frontend was written in React Typescript. UI components were designed with Material UI and SCSS.

## Challenges I ran into
Prompt engineering was the main challenge of this project. Only one model, GPT-3.5-1106, responds in json but all responses get shortned. There was string parsing needed to take the responses to convert to paragraphs. A front-end challenge was taking the prompts and separating each word into different components that can be clicked and queried for definition search. A big issue is latency when it comes to generation and the current workflow is linear which prevents multi-threading for faster responses. 

## Accomplishments that I'm proud of
The product is fully functioning and matching the expected grade levels desired. All information can be saved and properly reproduced. 

## What I learned
- Prompt engineering skills
- OpenAI models
- Boto3 client for S3 insertion and retrievals
- Integrating a Flask Backend with React frontend

## What's next for BookBuilder.AI
- Story book mode with a carousel to go through paragraphs with separate images
- Reading comprehension tests based on outputted texts
- Custom fonts and art styles dependent on age range
- Deploying the application for public use
- Notes filtering by figure of speech, story, etc.


## Demo

https://github.com/mdhvsk/story-time/assets/95248875/91f599a6-efbb-4ec1-b52d-30a9040fb1d8




