# Groop

A web-based chat application built in React.

## Current functionality

### Room creation

Set a name and custom url of the room. If no url is specified, a url is randomly generated.

![](https://dl.dropboxusercontent.com/s/xb590rkaqa92k7v/firefox_2018-03-16_00-21-53.png)

### Authentication

Users are required to login to chat and view a room's messages. Clients are authenticated with the server using JSON web tokens.

![](https://dl.dropboxusercontent.com/s/jvdyyfkqoc1vdl0/2018-03-16_00-31-21.gif)

![](https://dl.dropboxusercontent.com/s/6205f7isb8skkfw/2018-03-16_01-20-35.gif)

### Chat
Events (messages sent, users joining, etc.) are broadcast to the room using websockets. The chat room currently displays the room's name, creation time, logged in members, and messages (with live updating timestamps).

![](https://dl.dropboxusercontent.com/s/035mx4zzegl5zfy/2018-07-07_22-11-23.gif)

## Future Work

* Message quoting
* Avatar uploads
