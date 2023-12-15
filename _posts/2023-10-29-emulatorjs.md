---
title: Emulatorjs - Retro gaming in a browser
image: emulatorjs.png
img_path: /images/
date: 2023-10-29
categories: [homelabbing]
tags: [docker,gaming,emulators]
pin: false
comments: true
---

Emulators have been around as long as I can remember. In short, emulators act as virtual gaming systems which give you the ability to play old systems like NES and Sega on your home computer. Emulators are great, but what if I told you there was a better homelabber solution. One where you could play all those same games, but inside a browser? Let's explore Emulatorjs.

## What is Emulatorjs?

The gold standard of application emulators is RetroArch. [RetroArch](https://en.wikipedia.org/wiki/RetroArch) has been around a while now, and uses "cores" that it downloads which represent the various gaming systems. It's easy to use and has an interface that reminds me a bit of gaming on Playstation. Emulatorjs uses RetroArch behind the scenes compiled into WebAssembly. Emulatorjs for its front-end then uses javascript to serve you up a graphical gaming experience rendered in the browser. This works both on PC and mobile phone. Although I'll state the mobile phone built in controller is horrendous. 

There are a couple ways to setup Emulatorjs, but like most builds if I can use a docker compose file I will. Let's take a look at the compose.

## Setup and Configuration

I use a linuxserver.io Docker compose file for Emulatorjs and it looks like this. There's nothing particularly challenging about it.

```yaml
---
version: "2.1"
services:
  emulatorjs:
    image: lscr.io/linuxserver/emulatorjs:latest
    container_name: emulatorjs
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /path/to/config:/config
      - /path/to/data:/data
    ports:
      - 3000:3000
      - 80:80
      - 4001:4001 #optional
    restart: unless-stopped
```

Once you have the docker compose spun up via `docker compose -d` you can visit the file management portion of Emulatorjs by going to `hostname:3000`.

![emulatorjs file menu](emulatorjs-files.png){: w="840" h="400" }

Here you can manage your ROMs, Artwork, and overall content on your Emulatorjs server. You will need to do a couple steps to get up and running. Here would be the steps to add an NES rom and get playing.

1. First click download for the default content. This downloads all the videos and images used to show the video game systems.
2. Click File management and click NES.
3. Open the ROMS folder and right click anywhere and select upload -- upload your ROM.
4. Go back to ROM management and click SCAN for NES.
5. Now click NES which should now be listed in the column on the left hand side. 
6. Click download all available art.
7. Click Add all ROMs to config.

Your game should now be available to play. Emulatorjs uses port 80 to play games so go to `host:80` and you will find your NES system and game.

> I've seen a bug where the first time you load a game on a new system the game doesn't load. Just exit browser and it will load 2nd time.
{: .prompt-warning }

When you visit port 80 you should be able to scroll through your various gaming systems.

![emulatorjs system menu](emulatorjs-menu.png){: w="840" h="400" }

Since Emulatorjs uses RetroArch as a backend you will find the same commands and GUI exist inside your browser.

- ESC ESC will kill your session.
- F1 will open the RetroArch game menu while gaming.
- P will pause.

Your controller should work by default and should have the keys bound automatically. If you need to rebind any keys on the fly, however, use the F1 button to bring up the overall game configuration.

![emulatorjs settings](emulatorjs-settings.png){: w="840" h="400" }

Emulatorjs runs games in full screen mode by default and runs pretty smooth in my experience. 

![emulatorjs full screen](emulatorjs-fullscreen.png){: w="840" h="400" }

It's always nice to do a bit of gaming between homelabbing sessions. Now we can take a break and retro game right in our browsers!









