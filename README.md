# Griffin Crane's Professional Resume
April 29th, 2024
---
Today I will be starting a Single-Page Application (SPA) based on the Angular web framework to provide a user interface for my resume. For high-level plans, this app should:

1. Display a properly formatted resume on the landing page when navigated to through direct URL or a deep link.
2. Show more detail when clicking on short descriptions of the relevant job skills. For example, clicking on the phrase .NET should open a modal dialog that displays more information about my relevant work experience and examples.
3. Provide contact information and a mailing form for quick replies. Some of this information will be stored separately from the code repository for security's sake.
4. Have a clean, readable format using standard fonts. The layout should adjust to display size changes and respond to browser window area changes if the web browser is resized. Use a standard style sheet language (CSS).
5. Retrieve data displayed from a database, ensuring timely and accurate information without requiring hard-coded values in HTML code.
6. Load quickly from a cloud-hosted web server with some resources loaded asynchronously from Content Delivery Network (CDN) server networks to enhance performance.

By following these guidelines, I can create an engaging and professional resume that showcases my skills and experience effectively.

Security Notes
--------------
This application uses Firebase which includes a configuration object required to configure connections to the Google cloud infrastructure. While this configuration object is considered public, it is not recommended to include this information in source control systems for open source projects. I've used .gitignore to prevent committing this information to the repository, and have proactively set up a GitHub secret just in case I decide to turn on a CI/CD workflow there. This step doesn't reduce the security of the final application, but does encourage source control repository viewers to create their own Firebase projects and resources. For more information, see Google documentation: [Firebase config files and objects](https://firebase.google.com/docs/projects/learn-more?sjid=2085492700576323685-NC#config-files-objects)