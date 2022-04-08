# HelloChatbot
A Node.JS API backend for supporting the frontend to recommend a suitable restaurant to a user by using basic AI techniques.  

- 2.1 Problem Statement
- Even there are many resources online about different restaurants. People are still struggle to decide which restaurant to go to in a timely manner.
- 2.2 Solution Overview
- This chat bot solution is aimed to help people to spend less time in selecting a right restaurant by recommending ones for them, and the solution is built and combined with user-based collaborative filter, sentimental analysis, restaurant data and ratings from Google Place API.
- 2.3 Application Flow<img width="224" alt="image" src="https://user-images.githubusercontent.com/5713772/162547415-7cd54931-e69b-4d49-99e5-f4162be0d209.png">



3.	Used Resources
3.1 APIs
3.1.1 Noun chunks extraction API
https://textanalysis.p.rapidapi.com/spacy-noun-chunks-extraction
3.1.2 Sentiment Analysis API
https://textanalysis.p.rapidapi.com/textblob-sentiment-analysis
3.1.3 Place API
https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters
3.1.4 Geolocation API
3.1.5 Web Speech API
3.1.6 Window.localStorage
3.2 Libraries
3.2.1 Collaborative Filter
Description: This is a Node.js library in which provides collaborative filtering, and it can create recommendations with Jaccard similarity based on inputs.
https://github.com/TSonono/collaborative-filtering#readme
![image](https://user-images.githubusercontent.com/5713772/162547099-af24dc6b-295d-43b6-ab8c-36d38d8de4a3.png)


