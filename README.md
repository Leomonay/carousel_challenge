# Carousel_challenge
Single screen App that contains a Carousel in React Native without using libraries or plugins.

## Requirements:
- **Build a carousel.**
- **By default display 3 blocks at once.**

- *Navigation is made with next and previous buttons.*
- *Next button should be disabled, if the user is at the very end of the carousel.*
- *Previous button should be disabled, if the user is at the very beginning of the carousel.*
- *Clicking on next/previous buttons shows next/prev 3 carousel blocks accordingly.*
- *The source of carousel block is endpoint on server that return following JSON:*

**[{
title: "First Block",
image: [url1]
},
{
title: "Second Block",
image: [url2]
}
,...]**


## Getting Started

#### Server
In order to send a JSON as the challenge asked, I made a server.

For this challenge, I uploaded the **.env** file, in order to let the reviewer see my variable values. In this file, the server, port and images urls can be set without needing to edit the code. In **index.js** the object is assembled and sent when requested.

When environment variables are set, start the server it with **npm start** in /server

#### Application
In Application folder, there is a **config.js** file, where HOST, PORT and endpoint can be set, if you changed the environment variables or if you want to try it in another server.

In /Application, start the app with **npm start** or **expo start**.

#### Expo Client
In your device scan the QR code, or in a Android Emulator, copy link from Expo web.

Here is a video of the app working:

[![Watch the video](https://i.imgur.com/vKb2F1B.png)](https://youtu.be/t0oW90is2qg)
