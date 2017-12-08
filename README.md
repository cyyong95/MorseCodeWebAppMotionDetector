# README

The project that has been created is the Morse Code Interpreter using an Arduino Microcontroller and a PIR motion sensor.

Main Files:
- main.js (morse code detector program - server)
- index.html (client webpage)
- style.css (client webpage design)
- function.js (communication functions for client-server)
- test.js (unit test 1)
- unit-test1.js
- test.js (unit test 2)
- unit-test2.js
- package.json (install dependencies)

# Arduino
Required components:
  - Arduino Uno Board
  - Micro USB cable
  - PIR Motion Sensor
  - 3 Jumper Wires

# Putting the components together
To start off, we have to first attach the components to the Arduino Uno. 

1. Take the PIR Motion Sensor and identify that there are 3 pins (GND, OUTPUT, VCC). Connect GND on the PIR Motion Sensor to the GND (power section) on the Arduino Uno Board.
2. Now, connect the OUTPUT on the PIR Motion Sensor to digital pin 7 on Arduino Uno board and power the  VCC on the PIR Motion Sensor by connecting it to 5V Power on the Arduino Uno Board.
3. Now connect the Arduino Uno with your local machine with the USB cable.

# Installation
In order to start, we need to install all dependencies in a folder.

1. Create a new folder
2. Put package.json into the folder
3. Type the following:
```sh
$ npm install
```

Dependencies Installed:
- johnny-five
- express
- socket.io
- mocha
- chai

#### Getting Started
To start the morse code decoded program, type:
```sh
$ node main.js
```
#### Program Flow
1. User will be able to switch the PIR Motion Sensor on and off using the button on the client webpage. 
2. First, the user must switch the motion sensor on. Then, the PIR motion sensor will detect inputs and based on the duration, the input signal will either be Long('L') or Short('S'). Then the signal will be added to a empty string variable 'motionString'.
3. After the PIR motion sensor detects that motion has ended, a time counter (TC) to get the motion sensor idle time will be started until motion has been detected again. 
4. If the idle time is between 4 (inclusive) and 8 seconds, then motionString will be decoded. It is decoded by comparing each entry in the morse code table. If a match is found, the value for the key in morse code table is returned, else nothing is returned.
5. If idle time is between 8 (inclusive) and 12 seconds, the motionString will be decoded and a space will be added to the end of the letter. If there is no match with the entry in the morse code table, then nothing is returned.
6. If idle time is more than 11 seconds, the output string is printed out on the client webpage and motion sensor switches itself off.
7. If the PIR Motion Sensor decodes the signal "SSSLSL", it means the END OF TRANSMISSION, the application will switch itself off.
8. If the user decides to swtich the motion sensor using the button, all of the previous string or signals that were decoded and received would be reset.

#### Known Bugs/Limitations
- The motion sensor sensitivity will mess with the reading of the current input signal.
- After every idle time, motion will be detected but user has to give one last input for that to happen.
- Any motion detected when the motion sensor is interpreting a motion is not recognized because it takes time for the motion sensor to interpret the current motion

#### Authors
- Yong Chun Yu - https://github.com/cyyong95
- Daniel Deepak David

License
----

ISC

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md
