﻿# Griffin Crane's Resume Demo
April 29th, 2024
-
Today I will be starting a Single-Page Application (SPA) based on the Angular web framework to provide a user interface for my resume. For high-level plans, this app should:

1. Display a properly formatted resume on the landing page when navigated to through direct URL or a deep link.
2. Show more detail when clicking on short descriptions of the relevant job skills. For example, clicking on the phrase .NET should open a modal dialog that displays more information about my relevant work experience and examples.
3. Provide contact information and a mailing form for quick replies. Some of this information will be stored separately from the code repository for security's sake.
4. Have a clean, readable format using standard fonts. The layout should adjust to display size changes and respond to browser window area changes if the web browser is resized. Use a standard style sheet language (CSS).
5. Retrieve data displayed from a database, ensuring timely and accurate information without requiring hard-coded values in HTML code.
6. Load quickly from a cloud-hosted web server with some resources loaded asynchronously from Content Delivery Network (CDN) server networks to enhance performance.

By following these guidelines, I can create an engaging and professional resume that showcases my skills and experience effectively.

May 6th, 2024
-
The resume app's functional components are working. I'm currently working on getting code coverage with the jasmine testing framework so that regressions can be detected during development. These unit tests will also be useful for continuous integration, where failing tests can block new releases through the deployment pipeline. For this simple app, I am manually deploying the source code to GitHub and Firebase using VS Code, git, and the Firebase CLI. There are no automated pipelines yet, but I do have some simple alerts set up in Firebase to monitor traffic for any spikes in data reads/writes. 

- Progress Report

1. The landing page loads a simple Angular Material toolbar with a custom theme and a GitHub icon. After the page is initially rendered, data for the GitHub link and work experience data is asynchronously loaded from the backend, Google Cloud Firestore. The page then sets up the URL and formats and displays the data using a combination of Angular features: text interpolation, template statements, property binding, and a custom pipe directive.
2. Instead of putting hyperlinks on short descriptions via anchor tags, I have settled on using the standard Angular Material buttons and dialogs instead. I feel this is more likely to be recognized by a user. Perhaps displaying a tooltip on specific terms could still be an enhancement for a later refinement iteration. I need to change the button text from the standard "Open dialog" to "Show more details".
3. There is no contact information currently in the app.
4. I have Angular Material's global typography styles added to the application which loads Google's own clean and readable Roboto font. The layout is responsive to mobile devices and window resizing. Although this doesn't rearrange any of the layout, it does reformat the text areas and support scrollable dialog views for details.
5. Data aside from HTML is loaded asynchronously from Google Cloud Firestore. The app supports real-time updates made in the backend. For example, if I were to change the work experience description in the Firebase console, the app subscriber would receive a published event from Firebase and swap in the new text automatically. The transition is animated with a fade between the old and new versions of the data. No page reload is required, this happens when an Rxjs Subscription receives an event stream from the Firebase API.
6. Since this is hosted on Google Cloud's Firebase service, the site should be widely available after publishing within a few minutes, all around the world. Font resources are offloaded to a different CDN, Google Fonts. Performance is very good and there is headroom for more complex data and queries from Google Firestore.

Security Notes
-
This application uses Firebase which includes a configuration object required to configure connections to the Google cloud infrastructure. While this configuration object is considered public, it is not recommended to include this information in source control systems for open source projects. I've used .gitignore to prevent committing this information to the repository, and have proactively set up a GitHub secret just in case I decide to turn on a CI/CD workflow there. This step doesn't reduce the security of the final application, but does encourage source control repository viewers to create their own Firebase projects and resources. For more information, see Google documentation: [Firebase config files and objects](https://firebase.google.com/docs/projects/learn-more?sjid=2085492700576323685-NC#config-files-objects)