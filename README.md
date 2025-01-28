
# Github Candidate Search Web-App
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
- [Descriptionn](#description)
- [Installation Instructions](#installation-instructions)
- [How to Use the App](#how-to-use-the-app)
- [Contribution Guidelines](#contribution-guidelines)
- [Test Instrustions](#test-instructions)
- [Questions](#questions)
- [License](#license)

## Description
A web app that searches Github users for potential candidates for hire. The user can store the candidates they are interested in and dismiss the rest.

## Installation Instructions
Install all required packages using the "npm install" command after downloadign the repository. Create a .env in the Environment folder for the VITE_GITHUB_TOKEN. Request a token from Github (please read Github API documentation on how to request the token). Build the app via the command "npm run build", followed by "npm run preview" to run the app. 

## How to Use the App
On load, the homepage first requests a list of 30 users from Github, and then searches detailed info on each of those users. Once complete, these users/potential candidates are  displayed to the app user one by one. The app user has the option to dismiss a candidate or to save a candidate. Once the app user has gone through all available candidates, they have the option to reload a new batch (this also happens automatically when the homepage is loaded). In the saved candidates page (accessible via the top navigation menu), all the saved candidates are visible in a table. These candidates can also be dismissed.

## Contribution Guidelines
This app was developed by Jan Krajniak using starter code provided by the UNC Coding Bootcamp. Please provide appropriate credit when reusing code.

## Test Instructions
N/A

## Questions
- My GitHub username: jankrajniak
- My email address: jan.krajniak@gmail.com
- Additional instructions on how to contact me:
Please reach out to me at the above email address with any questions

## License
- This project is licensed under the MIT license: [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Link to video:
https://drive.google.com/file/d/1jKBMjpRvvtVhRBk8_7BCVdtZr2tOI3Zl/view?usp=sharing

## Screenshot
![alt text](image-1.png)